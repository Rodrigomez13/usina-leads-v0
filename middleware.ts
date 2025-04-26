import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Rutas públicas (accesibles sin autenticación)
  const isPublicPath = path === "/sign-in" || path === "/forgot-password"

  // Verificar si el usuario está autenticado mediante cookies
  const isAuthenticated = request.cookies.has("isAuthenticated")

  // Redirigir a la página de inicio de sesión si no está autenticado y la ruta no es pública
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  // Redirigir al dashboard si está autenticado y trata de acceder a una ruta pública
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Si la ruta es la raíz, redirigir según el estado de autenticación
  if (path === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } else {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }
  }

  return NextResponse.next()
}

// Configurar las rutas que deben ser procesadas por el middleware
export const config = {
  matcher: ["/", "/sign-in", "/forgot-password", "/dashboard/:path*"],
}
