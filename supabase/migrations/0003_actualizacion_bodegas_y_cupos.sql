-- ODA al Vino 2026 — Actualización de grilla de bodegas + cupos puntuales por bodega.
-- Corré este archivo en el SQL Editor de Supabase (después del 0001 y 0002).
--
-- Contexto:
-- 1) La grilla de bodegas se actualizó (ver BODEGAS_CONFIRMADAS_OAV_2026 / schedule.ts).
--    Cuyo ahora tiene cata en más horarios que antes (Maison Pouget se extendió a
--    16:30 viernes/sábado y 19:30 sábado) — hay que sembrar catas_cupos para esos
--    combos nuevos, si no existen todavía.
-- 2) El organizador definió un cupo más chico que el de la sala para algunas
--    bodegas puntuales (probablemente por reserva anticipada de espacio en esa
--    sala/horario). Estos UPDATE aplican esos cupos específicos, día+horario+sala
--    por día+horario+sala — no tocan el resto de las catas de esa sala.

-- ── 1) Sembrar cupos para los combos de Cuyo que antes no existían ─────────

insert into public.catas_cupos (day, slot, sala_id, cupo_max) values
  ('viernes', '16:30–17:15', 'cuyo', 16),
  ('sabado', '16:30–17:15', 'cuyo', 16),
  ('sabado', '19:30–20:15', 'cuyo', 16)
on conflict (day, slot, sala_id) do nothing;

-- ── 2) Cupos específicos por bodega ─────────────────────────────────────────

-- Bemberg (Argentina · 15:30) — viernes y sábado — 14
update public.catas_cupos set cupo_max = 14
 where sala_id = 'argentina' and slot = '15:30–16:15' and day in ('viernes', 'sabado');

-- Domingo Molina (Patagonia · viernes 16:30) — 14
update public.catas_cupos set cupo_max = 14
 where day = 'viernes' and slot = '16:30–17:15' and sala_id = 'patagonia';

-- Maison Pouget (Cuyo) — presente en varios horarios, mismo cupo en todos — 10
update public.catas_cupos set cupo_max = 10
 where sala_id = 'cuyo'
   and (day, slot) in (
     ('viernes', '16:30–17:15'),
     ('viernes', '17:30–18:15'),
     ('sabado', '16:30–17:15'),
     ('sabado', '17:30–18:15'),
     ('sabado', '19:30–20:15')
   );

-- Catena Zapata (Patagonia · viernes 17:30) — 8
update public.catas_cupos set cupo_max = 8
 where day = 'viernes' and slot = '17:30–18:15' and sala_id = 'patagonia';

-- Caro (Norte · viernes 19:30) — 10
update public.catas_cupos set cupo_max = 10
 where day = 'viernes' and slot = '19:30–20:15' and sala_id = 'norte';

-- Rutini Wines (Argentina · viernes 19:30) — 12
update public.catas_cupos set cupo_max = 12
 where day = 'viernes' and slot = '19:30–20:15' and sala_id = 'argentina';

-- Bianchi (Atlántica · sábado 15:30) — 12
update public.catas_cupos set cupo_max = 12
 where day = 'sabado' and slot = '15:30–16:15' and sala_id = 'atlantica';

-- Lauri Viana (Norte · sábado 17:30) — 10
update public.catas_cupos set cupo_max = 10
 where day = 'sabado' and slot = '17:30–18:15' and sala_id = 'norte';

-- López (Patagonia · sábado 17:30) — 12
update public.catas_cupos set cupo_max = 12
 where day = 'sabado' and slot = '17:30–18:15' and sala_id = 'patagonia';

-- Isasmendi (Atlántica · sábado 17:30) — 12
update public.catas_cupos set cupo_max = 12
 where day = 'sabado' and slot = '17:30–18:15' and sala_id = 'atlantica';

-- Diamandes (Norte · sábado 19:30) — 10
update public.catas_cupos set cupo_max = 10
 where day = 'sabado' and slot = '19:30–20:15' and sala_id = 'norte';

-- Familia Altieri (Atlántica · sábado 19:30) — 12
update public.catas_cupos set cupo_max = 12
 where day = 'sabado' and slot = '19:30–20:15' and sala_id = 'atlantica';
