-- ODA al Vino 2026 — Blindar el tope de 2 catas/día contra documento
-- inconsistente o inscripciones viejas sin documento cargado.
-- Corré este archivo en el SQL Editor de Supabase (después del 0004).
--
-- La migración 0004 ya suma el total de catas por documento antes de
-- aceptar un nuevo envío, pero compara el documento con IGUALDAD EXACTA de
-- texto. Eso dejó pasar a varias personas por encima del límite en
-- producción, por dos motivos:
--   a) el documento se tipeó con puntuación distinta entre un envío y otro
--      ("207.339.410 87" vs "207.339.410-87") — no matchean como el mismo
--      documento.
--   b) inscripciones anteriores a la 0004 quedaron con documento null (la
--      columna se agregó recién ahí) — un envío nuevo con documento real
--      nunca "ve" esas filas viejas, porque null nunca es igual a nada.
--
-- Esta versión cuenta como "la misma persona" si matchea CUALQUIERA de dos
-- criterios (documento normalizado, o nombre+contacto normalizados — mismo
-- criterio que ya usa el reenvío masivo de mails de confirmación), para no
-- dejar ninguna rendija por la que se cuele un tercer envío el mismo día.

create extension if not exists unaccent;

create or replace function public.catas_inscribir(
  p_nombre text,
  p_contacto text,
  p_documento text,
  p_selections jsonb
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_registration_id uuid;
  v_item jsonb;
  v_updated int;
  v_day text;
  v_existentes int;
  v_nuevas int;
  v_doc_norm text;
  v_nombre_norm text;
  v_contacto_norm text;
begin
  if p_nombre is null or btrim(p_nombre) = '' then
    raise exception 'Nombre requerido' using errcode = '22023';
  end if;
  if p_contacto is null or btrim(p_contacto) = '' then
    raise exception 'Contacto requerido' using errcode = '22023';
  end if;
  if p_documento is null or btrim(p_documento) = '' then
    raise exception 'Documento requerido' using errcode = '22023';
  end if;
  if jsonb_array_length(p_selections) = 0 then
    raise exception 'Elegí al menos una sala' using errcode = '22023';
  end if;

  v_doc_norm := upper(regexp_replace(p_documento, '[^A-Za-z0-9]', '', 'g'));
  v_nombre_norm := lower(unaccent(btrim(p_nombre)));
  v_contacto_norm := lower(btrim(p_contacto));

  -- Tope de 2 catas por día, contando TODAS las inscripciones previas que
  -- matcheen por documento normalizado O por nombre+contacto normalizados.
  for v_day in
    select distinct elem->>'day' from jsonb_array_elements(p_selections) as elem
  loop
    select count(*) into v_existentes
      from public.catas_selections s
      join public.catas_registrations r on r.id = s.registration_id
     where s.day = v_day
       and (
         upper(regexp_replace(r.documento, '[^A-Za-z0-9]', '', 'g')) = v_doc_norm
         or (
           lower(unaccent(btrim(r.nombre))) = v_nombre_norm
           and lower(btrim(r.contacto)) = v_contacto_norm
         )
       );

    select count(*) into v_nuevas
      from jsonb_array_elements(p_selections) as elem
     where elem->>'day' = v_day;

    if v_existentes + v_nuevas > 2 then
      raise exception 'LIMITE_DIA:%', v_day using errcode = 'P0001';
    end if;
  end loop;

  insert into public.catas_registrations (nombre, contacto, documento)
  values (btrim(p_nombre), btrim(p_contacto), btrim(p_documento))
  returning id into v_registration_id;

  for v_item in select * from jsonb_array_elements(p_selections)
  loop
    -- Incremento atómico y con tope: si ya está lleno, no matchea ninguna fila.
    update public.catas_cupos
       set ocupados = ocupados + 1
     where day = (v_item->>'day')
       and slot = (v_item->>'slot')
       and sala_id = (v_item->>'salaId')
       and ocupados < cupo_max
     returning ocupados into v_updated;

    if not found then
      raise exception 'CUPO_LLENO:%:%:%', (v_item->>'day'), (v_item->>'slot'), (v_item->>'salaId')
        using errcode = 'P0001';
    end if;

    insert into public.catas_selections (registration_id, day, slot, sala_id, bodega)
    values (v_registration_id, v_item->>'day', v_item->>'slot', v_item->>'salaId', v_item->>'bodega');
  end loop;

  return v_registration_id;
end;
$$;
