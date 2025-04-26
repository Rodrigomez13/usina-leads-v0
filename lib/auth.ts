"use client"

// Función para iniciar sesión
export function login(email: string) {
  try {
    // Guardar información de autenticación
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userEmail", email)

    // Establecer cookie de autenticación
    document.cookie = "isAuthenticated=true; path=/; max-age=86400" // 24 horas
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
  }
}

// Función para cerrar sesión
export function logout() {
  try {
    // Eliminar información de autenticación
    localStorage.removeItem("isAuthenticated")

    // Mantener el email si "recordarme" estaba activo

    // Eliminar cookie de autenticación
    document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
  } catch (error) {
    console.error("Error al cerrar sesión:", error)
  }
}

// Función para verificar si el usuario está autenticado
export function isAuthenticated(): boolean {
  try {
    // Verificar en localStorage
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      return true
    }

    // Verificar en cookies
    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith("isAuthenticated=true")) {
        return true
      }
    }

    return false
  } catch (error) {
    console.error("Error al verificar autenticación:", error)
    return false
  }
}

// Función para obtener el email del usuario actual
export function getCurrentUserEmail(): string | null {
  try {
    return localStorage.getItem("userEmail")
  } catch (error) {
    console.error("Error al obtener email del usuario:", error)
    return null
  }
}
