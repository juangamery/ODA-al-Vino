import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase con la service role key — sólo se usa server-side
 * (rutas /api/catas/*). Nunca importar esto desde un componente cliente.
 */
export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
