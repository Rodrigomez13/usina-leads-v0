import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "./database.types"

export function createServerSideClient() {
  const cookieStore = cookies()

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )

  return supabase
}

// Función para obtener el usuario actual en componentes del servidor
export async function getCurrentUser() {
  const supabase = createServerSideClient()

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      console.error("Error al obtener el usuario:", error)
      return null
    }

    return user
  } catch (error) {
    console.error("Error inesperado al obtener el usuario:", error)
    return null
  }
}
