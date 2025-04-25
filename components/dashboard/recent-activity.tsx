import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      id: "1",
      user: "Juan Pérez",
      action: "activó el anuncio",
      target: "Casino Bonus 25%",
      server: "Server 4",
      time: "hace 10 minutos",
    },
    {
      id: "2",
      user: "María López",
      action: "registró",
      target: "25 conversiones para ATENEA",
      server: "",
      time: "hace 25 minutos",
    },
    {
      id: "3",
      user: "Carlos Rodríguez",
      action: "actualizó el presupuesto de",
      target: "Ruleta Gratis",
      server: "Server 5",
      time: "hace 1 hora",
    },
    {
      id: "4",
      user: "Ana Martínez",
      action: "registró",
      target: "18 conversiones para FENIX",
      server: "",
      time: "hace 1 hora",
    },
    {
      id: "5",
      user: "Roberto Gómez",
      action: "desactivó el anuncio",
      target: "Bono Bienvenida",
      server: "Server 6",
      time: "hace 2 horas",
    },
    {
      id: "6",
      user: "Sistema",
      action: "registró un pago de",
      target: "$5,000.00 de ATENEA",
      server: "",
      time: "hace 3 horas",
    },
  ]

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" alt={activity.user} />
            <AvatarFallback className="bg-[#148f77] text-white">
              {activity.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
              <span className="font-semibold">{activity.target}</span>
              {activity.server && <span className="text-muted-foreground"> en {activity.server}</span>}
            </p>
            <p className="text-sm text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
