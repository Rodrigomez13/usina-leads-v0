import { createServerSideClient } from "@/lib/supabase/server"

// Función para obtener todos los servidores
export async function getServers() {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("servers").select("*").order("name")

  if (error) {
    console.error("Error al obtener servidores:", error)
    throw error
  }

  return data || []
}

// Función para obtener un servidor específico
export async function getServerById(id: string) {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("servers").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error al obtener servidor con ID ${id}:`, error)
    throw error
  }

  return data
}

// Función para crear un nuevo servidor
export async function createServer(serverData: any) {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("servers").insert(serverData).select().single()

  if (error) {
    console.error("Error al crear servidor:", error)
    throw error
  }

  return data
}

// Función para actualizar un servidor
export async function updateServer(id: string, serverData: any) {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("servers").update(serverData).eq("id", id).select().single()

  if (error) {
    console.error(`Error al actualizar servidor con ID ${id}:`, error)
    throw error
  }

  return data
}

// Función para eliminar un servidor
export async function deleteServer(id: string) {
  const supabaseAdmin = createServerSideClient()
  const { error } = await supabaseAdmin.from("servers").delete().eq("id", id)

  if (error) {
    console.error(`Error al eliminar servidor con ID ${id}:`, error)
    throw error
  }

  return true
}

// Función para obtener todos los clientes
export async function getClients() {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("clients").select("*").order("name")

  if (error) {
    console.error("Error al obtener clientes:", error)
    throw error
  }

  return data || []
}

// Función para obtener un cliente específico
export async function getClientById(id: string) {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("clients").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error al obtener cliente con ID ${id}:`, error)
    throw error
  }

  return data
}

// Función para crear un nuevo cliente
export async function createClient(clientData: any) {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("clients").insert(clientData).select().single()

  if (error) {
    console.error("Error al crear cliente:", error)
    throw error
  }

  return data
}

// Función para actualizar un cliente
export async function updateClient(id: string, clientData: any) {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("clients").update(clientData).eq("id", id).select().single()

  if (error) {
    console.error(`Error al actualizar cliente con ID ${id}:`, error)
    throw error
  }

  return data
}

// Función para eliminar un cliente
export async function deleteClient(id: string) {
  const supabaseAdmin = createServerSideClient()
  const { error } = await supabaseAdmin.from("clients").delete().eq("id", id)

  if (error) {
    console.error(`Error al eliminar cliente con ID ${id}:`, error)
    throw error
  }

  return true
}

// Función para obtener estadísticas del dashboard
export async function getDashboardStats(days = 30) {
  const supabaseAdmin = createServerSideClient()
  try {
    // Intentar usar la función RPC si existe
    const { data, error } = await supabaseAdmin.rpc("get_dashboard_stats", { days_param: days })

    if (error) {
      console.error("Error al obtener estadísticas del dashboard:", error)
      // Si falla la función RPC, intentamos obtener datos directamente
      return await getFallbackDashboardStats(days)
    }

    return data
  } catch (error) {
    console.error("Error al llamar a la función RPC:", error)
    // Si la función RPC no existe, obtenemos datos directamente
    return await getFallbackDashboardStats(days)
  }
}

// Función alternativa para obtener estadísticas si la RPC falla
async function getFallbackDashboardStats(days = 30) {
  const supabaseAdmin = createServerSideClient()

  // Calcular la fecha de inicio basada en los días
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  const startDateStr = startDate.toISOString()

  // Obtener datos de conversiones
  const { data: conversions, error: convError } = await supabaseAdmin
    .from("conversions")
    .select("*")
    .gte("created_at", startDateStr)

  if (convError) {
    console.error("Error al obtener conversiones:", convError)
  }

  // Obtener datos de leads
  const { data: leads, error: leadsError } = await supabaseAdmin
    .from("leads")
    .select("*")
    .gte("created_at", startDateStr)

  if (leadsError) {
    console.error("Error al obtener leads:", leadsError)
  }

  // Obtener datos de gastos
  const { data: expenses, error: expError } = await supabaseAdmin.from("expenses").select("*").gte("date", startDateStr)

  if (expError) {
    console.error("Error al obtener gastos:", expError)
  }

  // Calcular estadísticas
  const totalLeads = leads?.length || 0
  const totalConversions = conversions?.length || 0
  const totalExpenses = expenses?.reduce((sum, exp) => sum + (exp.amount || 0), 0) || 0
  const conversionRate = totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0

  return {
    leads: totalLeads,
    conversions: totalConversions,
    conversion_rate: conversionRate.toFixed(2),
    expenses: totalExpenses,
    income: totalConversions * 100, // Ejemplo: cada conversión genera $100
  }
}

// Función para obtener datos de usuarios
export async function getUsers() {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("users").select("*").order("created_at")

  if (error) {
    console.error("Error al obtener usuarios:", error)
    throw error
  }

  return data || []
}

// Función para crear un nuevo usuario
export async function createUser(userData: any) {
  const supabaseAdmin = createServerSideClient()

  // Primero creamos el usuario en Auth
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: userData.email,
    password: userData.password || Math.random().toString(36).slice(-8),
    email_confirm: true,
    user_metadata: {
      full_name: userData.name,
      role: userData.role,
    },
  })

  if (authError) {
    console.error("Error al crear usuario en Auth:", authError)
    throw authError
  }

  // Luego creamos el registro en la tabla users
  const { data, error } = await supabaseAdmin
    .from("users")
    .insert({
      id: authData.user.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status || "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error al crear usuario en la base de datos:", error)
    throw error
  }

  return data
}

// Función para actualizar un usuario
export async function updateUser(id: string, userData: any) {
  const supabaseAdmin = createServerSideClient()

  // Actualizar en la tabla users
  const { data, error } = await supabaseAdmin
    .from("users")
    .update({
      ...userData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error)
    throw error
  }

  return data
}

// Función para eliminar un usuario
export async function deleteUser(id: string) {
  const supabaseAdmin = createServerSideClient()

  // Primero eliminamos el usuario de la tabla users
  const { error: dbError } = await supabaseAdmin.from("users").delete().eq("id", id)

  if (dbError) {
    console.error(`Error al eliminar usuario con ID ${id} de la base de datos:`, dbError)
    throw dbError
  }

  // Luego eliminamos el usuario de Auth
  const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)

  if (authError) {
    console.error(`Error al eliminar usuario con ID ${id} de Auth:`, authError)
    throw authError
  }

  return true
}

// Función para obtener datos de anuncios
export async function getAds() {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("ads").select("*").order("created_at")

  if (error) {
    console.error("Error al obtener anuncios:", error)
    throw error
  }

  return data || []
}

// Función para crear un nuevo anuncio
export async function createAd(adData: any) {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("ads").insert(adData).select().single()

  if (error) {
    console.error("Error al crear anuncio:", error)
    throw error
  }

  return data
}

// Función para actualizar un anuncio
export async function updateAd(id: string, adData: any) {
  const supabaseAdmin = createServerSideClient()
  const { data, error } = await supabaseAdmin.from("ads").update(adData).eq("id", id).select().single()

  if (error) {
    console.error(`Error al actualizar anuncio con ID ${id}:`, error)
    throw error
  }

  return data
}

// Función para eliminar un anuncio
export async function deleteAd(id: string) {
  const supabaseAdmin = createServerSideClient()
  const { error } = await supabaseAdmin.from("ads").delete().eq("id", id)

  if (error) {
    console.error(`Error al eliminar anuncio con ID ${id}:`, error)
    throw error
  }

  return true
}
