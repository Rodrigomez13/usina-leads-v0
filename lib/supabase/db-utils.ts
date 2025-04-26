import { createServerSideClient } from "./server"

// Función genérica para obtener todos los registros de una tabla
export async function getAll(table: string) {
  const supabase = createServerSideClient()

  const { data, error } = await supabase.from(table).select("*").order("created_at", { ascending: false })

  if (error) {
    console.error(`Error al obtener datos de ${table}:`, error)
    throw error
  }

  return data || []
}

// Función genérica para obtener un registro por ID
export async function getById(table: string, id: string) {
  const supabase = createServerSideClient()

  const { data, error } = await supabase.from(table).select("*").eq("id", id).single()

  if (error) {
    console.error(`Error al obtener ${table} con ID ${id}:`, error)
    throw error
  }

  return data
}

// Función genérica para crear un registro
export async function create(table: string, data: any) {
  const supabase = createServerSideClient()

  const { data: result, error } = await supabase
    .from(table)
    .insert({
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error(`Error al crear registro en ${table}:`, error)
    throw error
  }

  return result
}

// Función genérica para actualizar un registro
export async function update(table: string, id: string, data: any) {
  const supabase = createServerSideClient()

  const { data: result, error } = await supabase
    .from(table)
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(`Error al actualizar ${table} con ID ${id}:`, error)
    throw error
  }

  return result
}

// Función genérica para eliminar un registro
export async function remove(table: string, id: string) {
  const supabase = createServerSideClient()

  const { error } = await supabase.from(table).delete().eq("id", id)

  if (error) {
    console.error(`Error al eliminar ${table} con ID ${id}:`, error)
    throw error
  }

  return true
}

// Función para obtener estadísticas del dashboard
export async function getDashboardStats() {
  const supabase = createServerSideClient()

  try {
    // Obtener servidores
    const { data: servers } = await supabase.from("servers").select("*").eq("active", true)

    // Obtener clientes
    const { data: clients } = await supabase.from("clients").select("*").eq("status", "active")

    // Obtener leads (últimos 30 días)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const { data: leads } = await supabase.from("leads").select("*").gte("created_at", thirtyDaysAgo.toISOString())

    // Obtener conversiones (últimos 30 días)
    const { data: conversions } = await supabase
      .from("conversions")
      .select("*")
      .gte("created_at", thirtyDaysAgo.toISOString())

    // Calcular estadísticas
    const totalLeads = leads?.length || 0
    const totalConversions = conversions?.length || 0
    const conversionRate = totalLeads > 0 ? (totalConversions / totalLeads) * 100 : 0

    return {
      servers: servers?.length || 0,
      clients: clients?.length || 0,
      leads: totalLeads,
      conversions: totalConversions,
      conversionRate: conversionRate.toFixed(2),
      income: totalConversions * 100, // Ejemplo: cada conversión genera $100
    }
  } catch (error) {
    console.error("Error al obtener estadísticas del dashboard:", error)
    throw error
  }
}
