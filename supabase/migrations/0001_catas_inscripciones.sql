-- ODA al Vino 2026 — Inscripción a salas de degustación
-- Corre este archivo en el SQL Editor de Supabase (o vía `supabase db push`).
--
-- Diseño:
--   catas_cupos          → un contador por cada cata puntual (día+horario+sala),
--                           con cupo_max y ocupados. Es la fuente de verdad del cupo.
--   catas_registrations  → una fila por persona inscripta (nombre + contacto).
--   catas_selections     → las catas elegidas por cada inscripto (FK a registrations).
--   catas_inscribir(...) → función que hace TODO en una sola transacción:
--                           valida cupo, lo incrementa de forma atómica (evita overbooking
--                           por inscripciones simultáneas) e inserta el registro.
--
-- Seguridad: RLS habilitado sin policies para anon/authenticated → sólo la
-- service_role key (usada desde las API routes del servidor) puede leer/escribir.

create extension if not exists "pgcrypto";

-- ── Tablas ──────────────────────────────────────────────────────────────

create table if not exists public.catas_cupos (
  day text not null,
  slot text not null,
  sala_id text not null,
  cupo_max int not null,
  ocupados int not null default 0,
  primary key (day, slot, sala_id)
);

create table if not exists public.catas_registrations (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  contacto text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.catas_selections (
  id uuid primary key default gen_random_uuid(),
  registration_id uuid not null references public.catas_registrations(id) on delete cascade,
  day text not null,
  slot text not null,
  sala_id text not null,
  bodega text not null,
  created_at timestamptz not null default now()
);

create index if not exists catas_selections_registration_id_idx
  on public.catas_selections (registration_id);

create index if not exists catas_selections_cata_idx
  on public.catas_selections (day, slot, sala_id);

alter table public.catas_cupos enable row level security;
alter table public.catas_registrations enable row level security;
alter table public.catas_selections enable row level security;
-- Sin policies: anon/authenticated no tienen acceso. Sólo service_role (bypassa RLS).

-- ── Semilla de cupos (a partir de src/lib/catas/schedule.ts) ───────────
-- Si cambia la grilla, actualizá este INSERT junto con schedule.ts.

insert into public.catas_cupos (day, slot, sala_id, cupo_max) values
  ('viernes', '15:30–16:15', 'norte', 16),
  ('viernes', '15:30–16:15', 'patagonia', 18),
  ('viernes', '15:30–16:15', 'iguazu', 25),
  ('viernes', '15:30–16:15', 'argentina', 18),
  ('viernes', '15:30–16:15', 'atlantica', 16),
  ('viernes', '16:30–17:15', 'norte', 16),
  ('viernes', '16:30–17:15', 'patagonia', 18),
  ('viernes', '16:30–17:15', 'iguazu', 25),
  ('viernes', '16:30–17:15', 'argentina', 18),
  ('viernes', '16:30–17:15', 'atlantica', 16),
  ('viernes', '17:30–18:15', 'norte', 16),
  ('viernes', '17:30–18:15', 'patagonia', 18),
  ('viernes', '17:30–18:15', 'cuyo', 16),
  ('viernes', '17:30–18:15', 'iguazu', 25),
  ('viernes', '17:30–18:15', 'argentina', 18),
  ('viernes', '17:30–18:15', 'atlantica', 16),
  ('viernes', '18:30–19:15', 'norte', 16),
  ('viernes', '18:30–19:15', 'patagonia', 18),
  ('viernes', '18:30–19:15', 'iguazu', 25),
  ('viernes', '18:30–19:15', 'argentina', 18),
  ('viernes', '18:30–19:15', 'atlantica', 16),
  ('viernes', '19:30–20:15', 'norte', 16),
  ('viernes', '19:30–20:15', 'patagonia', 18),
  ('viernes', '19:30–20:15', 'iguazu', 25),
  ('viernes', '19:30–20:15', 'argentina', 18),
  ('viernes', '19:30–20:15', 'atlantica', 16),
  ('sabado', '15:30–16:15', 'norte', 16),
  ('sabado', '15:30–16:15', 'patagonia', 18),
  ('sabado', '15:30–16:15', 'iguazu', 25),
  ('sabado', '15:30–16:15', 'argentina', 18),
  ('sabado', '15:30–16:15', 'atlantica', 16),
  ('sabado', '16:30–17:15', 'norte', 16),
  ('sabado', '16:30–17:15', 'patagonia', 18),
  ('sabado', '16:30–17:15', 'iguazu', 25),
  ('sabado', '16:30–17:15', 'argentina', 18),
  ('sabado', '16:30–17:15', 'atlantica', 16),
  ('sabado', '17:30–18:15', 'norte', 16),
  ('sabado', '17:30–18:15', 'patagonia', 18),
  ('sabado', '17:30–18:15', 'cuyo', 16),
  ('sabado', '17:30–18:15', 'iguazu', 25),
  ('sabado', '17:30–18:15', 'argentina', 18),
  ('sabado', '17:30–18:15', 'atlantica', 16),
  ('sabado', '18:30–19:15', 'norte', 16),
  ('sabado', '18:30–19:15', 'patagonia', 18),
  ('sabado', '18:30–19:15', 'iguazu', 25),
  ('sabado', '18:30–19:15', 'argentina', 18),
  ('sabado', '18:30–19:15', 'atlantica', 16),
  ('sabado', '19:30–20:15', 'norte', 16),
  ('sabado', '19:30–20:15', 'patagonia', 18),
  ('sabado', '19:30–20:15', 'iguazu', 25),
  ('sabado', '19:30–20:15', 'argentina', 18),
  ('sabado', '19:30–20:15', 'atlantica', 16)
on conflict (day, slot, sala_id) do nothing;

-- ── Función de inscripción atómica ──────────────────────────────────────
-- p_selections: jsonb array de objetos {day, slot, salaId, bodega}
-- Devuelve el id del registro creado. Si algún cupo ya está lleno, hace
-- ROLLBACK de todo (nadie queda a medio inscribir) y lanza una excepción
-- con código 'CUPO_LLENO' que la API traduce a un mensaje claro.

create or replace function public.catas_inscribir(
  p_nombre text,
  p_contacto text,
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
begin
  if p_nombre is null or btrim(p_nombre) = '' then
    raise exception 'Nombre requerido' using errcode = '22023';
  end if;
  if p_contacto is null or btrim(p_contacto) = '' then
    raise exception 'Contacto requerido' using errcode = '22023';
  end if;
  if jsonb_array_length(p_selections) = 0 then
    raise exception 'Elegí al menos una sala' using errcode = '22023';
  end if;

  insert into public.catas_registrations (nombre, contacto)
  values (btrim(p_nombre), btrim(p_contacto))
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

revoke all on function public.catas_inscribir(text, text, jsonb) from public;
grant execute on function public.catas_inscribir(text, text, jsonb) to service_role;
