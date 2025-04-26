import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Verificar la firma del webhook (en producción deberías validar la firma)
    const payload = await request.json()

    // Procesar el evento
    const { type, record } = payload

    console.log(`Webhook recibido: ${type}`, record)

    // Aquí puedes manejar diferentes tipos de eventos
    // Por ejemplo, actualizar caché, enviar notificaciones, etc.

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error en webhook de Supabase:", error)
    return NextResponse.json({ error: "Error procesando webhook" }, { status: 400 })
  }
}
