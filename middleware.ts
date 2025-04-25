import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Este middleware se ejecuta en todas las rutas
export function middleware(request: NextRequest) {
  // Obtener la ruta actual
  const path = request.nextUrl.pathname

  // Si estamos en la ruta raíz, redirigir al dashboard
  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Para todas las demás rutas, continuar normalmente
  return NextResponse.next()
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: ["/", "/dashboard/:path*"],
}
