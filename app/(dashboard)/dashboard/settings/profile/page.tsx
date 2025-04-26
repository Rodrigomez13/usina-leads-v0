import { createServerSideClient } from "@/lib/supabase/server"
import { ProfileForm } from "@/components/auth/profile-form"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const supabase = createServerSideClient()

  // Obtener la sesión actual
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/sign-in")
  }

  // Obtener los datos del usuario
  const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single()

  if (error) {
    console.error("Error al obtener datos del usuario:", error)
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Configuración de perfil</h1>
      <ProfileForm userData={userData} />
    </div>
  )
}
