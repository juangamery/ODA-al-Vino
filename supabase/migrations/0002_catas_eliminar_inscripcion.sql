-- ODA al Vino 2026 — Eliminar una inscripción desde el panel de administración.
-- Corré este archivo en el SQL Editor de Supabase (después del 0001).
--
-- Borrar directamente la fila de catas_registrations en el Table Editor NO
-- alcanza: el cupo ocupado vive aparte, en catas_cupos, y no se actualiza
-- solo. Esta función borra la inscripción completa (todas sus salas elegidas)
-- Y libera el cupo de cada una, en una sola transacción.

create or replace function public.catas_eliminar_inscripcion(p_registration_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_sel record;
begin
  for v_sel in
    select day, slot, sala_id from public.catas_selections where registration_id = p_registration_id
  loop
    update public.catas_cupos
       set ocupados = greatest(ocupados - 1, 0)
     where day = v_sel.day and slot = v_sel.slot and sala_id = v_sel.sala_id;
  end loop;

  -- catas_selections se borra en cascada (FK on delete cascade).
  delete from public.catas_registrations where id = p_registration_id;
end;
$$;

revoke all on function public.catas_eliminar_inscripcion(uuid) from public;
grant execute on function public.catas_eliminar_inscripcion(uuid) to service_role;
