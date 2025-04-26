"use server"

import { createServerSideClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Acción para crear un servidor
export async function createServerAction(formData: FormData) {
  const supabase = createServerSideClient()

  const name = formData.get("name") as string
  const coefficient = Number(formData.get("coefficient"))
  const active = formData.get("active") === "true"

  try {
    const { data, error } = await supabase
      .from("servers")
      .insert({
        name,
        coefficient,
        active,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath("/dashboard/servers")
    return { success: true, data }
  } catch (error) {
    console.error("Error al crear servidor:", error)
    return { success: false, error }
  }
}

// Acción para actualizar un servidor
export async function updateServerAction(id: string, formData: FormData) {
  const supabase = createServerSideClient()

  const name = formData.get("name") as string
  const coefficient = Number(formData.get("coefficient"))
  const active = formData.get("active") === "true"

  try {
    const { data, error } = await supabase
      .from("servers")
      .update({
        name,
        coefficient,
        active,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    revalidatePath("/dashboard/servers")
    return { success: true, data }
  } catch (error) {
    console.error(`Error al actualizar servidor con ID ${id}:`, error)
    return { success: false, error }
  }
}

// Acción para eliminar un servidor
export async function deleteServerAction(id: string) {
  const supabase = createServerSideClient()

  try {
    const { error } = await supabase.from("servers").delete().eq("id", id)

    if (error) throw error

    revalidatePath("/dashboard/servers")
    return { success: true }
  } catch (error) {
    console.error(`Error al eliminar servidor con ID ${id}:`, error)
    return { success: false, error }
  }
}

// Acción para crear un cliente
export async function createClientAction(formData: FormData) {
  const supabase = createServerSideClient()

  const name = formData.get("name") as string
  const phones = Number(formData.get("phones"))
  const balance = Number(formData.get("balance"))
  const status = formData.get("status") as string
  const dailyGoal = Number(formData.get("dailyGoal"))

  try {
    const { data, error } = await supabase
      .from("clients")
      .insert({
        name,
        phones,
        balance,
        status,
        dailyGoal,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    revalidatePath("/dashboard/clients")
    return { success: true, data }
  } catch (error) {
    console.error("Error al crear cliente:", error)
    return { success: false, error }
  }
}

// Acción para actualizar un cliente
export async function updateClientAction(id: string, formData: FormData) {
  const supabase = createServerSideClient()

  const name = formData.get("name") as string
  const phones = Number(formData.get("phones"))
  const balance = Number(formData.get("balance"))
  const status = formData.get("status") as string
  const dailyGoal = Number(formData.get("dailyGoal"))

  try {
    const { data, error } = await supabase
      .from("clients")
      .update({
        name,
        phones,
        balance,
        status,
        dailyGoal,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    revalidatePath("/dashboard/clients")
    return { success: true, data }
  } catch (error) {
    console.error(`Error al actualizar cliente con ID ${id}:`, error)
    return { success: false, error }
  }
}
