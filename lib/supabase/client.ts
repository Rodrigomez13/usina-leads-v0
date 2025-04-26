import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/supabase/database.types"

// Creamos un cliente de Supabase para el lado del cliente
export const createClientSideClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Cliente de Supabase para uso en componentes del cliente
export const supabase = createClientSideClient()
