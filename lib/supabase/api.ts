import { supabase } from "@/lib/supabase/client"
import { createServerSideClient } from "@/lib/supabase/server"

// Funciones para interactuar con la API de Supabase

// Usuarios
export async function getUsers() {
  const { data, error } = await supabase.from("users").select("*").order("name")

  if (error) {
    console.error("Error al obtener usuarios:", error)
    throw error
  }

  return data
}

export async function getUserById(id: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error)
    throw error
  }

  return data
}

export async function updateUser(id: string, userData: any) {
  const { data, error } = await supabase.from("users").update(userData).eq("id", id).select().single()

  if (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error)
    throw error
  }

  return data
}

// Servidores
export async function getServers() {
  const { data, error } = await supabase.from("servers").select("*").order("name")

  if (error) {
    console.error("Error al obtener servidores:", error)
    throw error
  }

  return data
}

export async function getServerById(id: string) {
  const { data, error } = await supabase.from("servers").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error al obtener servidor con ID ${id}:`, error)
    throw error
  }

  return data
}

// Dashboard
export async function getDashboardStats(days = 30) {
  // Usando la función RPC que definimos en SQL
  const { data, error } = await supabase.rpc("get_dashboard_stats", { days })

  if (error) {
    console.error("Error al obtener estadísticas del dashboard:", error)
    throw error
  }

  return data
}

// Función para usar en el servidor (Server Components)
export async function getServerSideData(table: string) {
  const supabaseServer = createServerSideClient()

  const { data, error } = await supabaseServer.from(table).select("*")

  if (error) {
    console.error(`Error al obtener datos de ${table}:`, error)
    throw error
  }

  return data
}
