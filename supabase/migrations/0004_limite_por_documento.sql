-- ODA al Vino 2026 — Tope de 2 catas por día por documento (no por envío).
-- Corré este archivo en el SQL Editor de Supabase (después del 0001, 0002 y 0003).
--
-- Contexto: la regla de "máximo 2 catas por día" sólo se validaba dentro de
-- un único envío del formulario (validateSelections en el cliente/servidor).
-- Nada impedía que la misma persona llenara el formulario varias veces y
-- acumulara más de 2 catas por día entre distintas inscripciones — pasó en
-- producción (una persona terminó con 6 inscripciones separadas). Para
-- blindarlo hace falta guardar el documento y chequear, de forma atómica,
-- el total de catas ya anotadas para ese documento en ese día — mismo lugar
-- donde ya se controla el cupo, para que no haya ventana de carrera.

alter table public.catas_registrations add column if not exists documento text;

create index if not exists catas_registrations_documento_idx
  on public.catas_registrations (documento);

-- La firma cambia (se agrega p_documento) — hay que sacar la versión vieja
-- de 3 parámetros para no dejar dos funciones catas_inscribir superpuestas.
drop function if exists public.catas_inscribir(text, text, jsonb);

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

  -- Tope de 2 catas por día por documento, contando TODAS las inscripciones
  -- previas de ese documento (no sólo las de este envío) — debe coincidir
  -- con MAX_PER_DAY en src/lib/catas/schedule.ts.
  for v_day in
    select distinct elem->>'day' from jsonb_array_elements(p_selections) as elem
  loop
    select count(*) into v_existentes
      from public.catas_selections s
      join public.catas_registrations r on r.id = s.registration_id
     where r.documento = btrim(p_documento)
       and s.day = v_day;

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

revoke all on function public.catas_inscribir(text, text, text, jsonb) from public;
grant execute on function public.catas_inscribir(text, text, text, jsonb) to service_role;
