"use server"

import { createServerSideClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Acciones del servidor para interactuar con Supabase

export async function createUser(formData: FormData) {
  const supabase = createServerSideClient()

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string

  try {
    // Crear usuario en Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name, role },
    })

    if (authError) throw authError

    // Crear registro en la tabla users
    const { error: dbError } = await supabase.from("users").insert({
      id: authData.user.id,
      name,
      email,
      role,
      status: "active",
      password_hash: "managed-by-auth", // No almacenamos la contraseña real
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (dbError) throw dbError

    revalidatePath("/dashboard/settings/users")
    return { success: true }
  } catch (error) {
    console.error("Error al crear usuario:", error)
    return { success: false, error }
  }
}

export async function updateUserProfile(userId: string, userData: any) {
  const supabase = createServerSideClient()

  try {
    const { error } = await supabase
      .from("users")
      .update({
        ...userData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)

    if (error) throw error

    revalidatePath("/dashboard/settings/profile")
    return { success: true }
  } catch (error) {
    console.error("Error al actualizar perfil:", error)
    return { success: false, error }
  }
}

export async function createServer(formData: FormData) {
  const supabase = createServerSideClient()

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const ipAddress = formData.get("ip_address") as string
  const active = formData.get("active") === "true"

  try {
    const { error } = await supabase.from("servers").insert({
      name,
      description,
      ip_address: ipAddress,
      active,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (error) throw error

    revalidatePath("/dashboard/servers")
    return { success: true }
  } catch (error) {
    console.error("Error al crear servidor:", error)
    return { success: false, error }
  }
}

// Puedes añadir más acciones del servidor según sea necesario
