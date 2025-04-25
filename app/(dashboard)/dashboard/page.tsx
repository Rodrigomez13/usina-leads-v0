import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { ServerOverview } from "@/components/dashboard/server-overview"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { ClientDistribution } from "@/components/dashboard/client-distribution"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Bienvenido al panel de control de Usina Leads.</p>
      </div>

      <DashboardStats />

      <Tabs defaultValue="server4" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="server4">Server 4</TabsTrigger>
            <TabsTrigger value="server5">Server 5</TabsTrigger>
            <TabsTrigger value="server6">Server 6</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="server4" className="space-y-4">
          <ServerOverview
            serverId="4"
            coefficient={12}
            stats={{
              leads: 1250,
              conversions: 320,
              conversionRate: 25.6,
              expense: 1850.75,
              leadCost: 1.48,
              conversionCost: 5.78,
            }}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Progreso Diario</CardTitle>
                <CardDescription>Evolución de leads y conversiones durante el día</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ServerProgressChart serverId="4" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribución por Franquicia</CardTitle>
                <CardDescription>Conversiones distribuidas por franquicia</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientDistribution serverId="4" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="server5" className="space-y-4">
          <ServerOverview
            serverId="5"
            coefficient={3}
            stats={{
              leads: 980,
              conversions: 245,
              conversionRate: 25.0,
              expense: 1450.5,
              leadCost: 1.48,
              conversionCost: 5.92,
            }}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Progreso Diario</CardTitle>
                <CardDescription>Evolución de leads y conversiones durante el día</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ServerProgressChart serverId="5" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribución por Franquicia</CardTitle>
                <CardDescription>Conversiones distribuidas por franquicia</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientDistribution serverId="5" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="server6" className="space-y-4">
          <ServerOverview
            serverId="6"
            coefficient={19}
            stats={{
              leads: 1540,
              conversions: 385,
              conversionRate: 25.0,
              expense: 2250.25,
              leadCost: 1.46,
              conversionCost: 5.84,
            }}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Progreso Diario</CardTitle>
                <CardDescription>Evolución de leads y conversiones durante el día</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ServerProgressChart serverId="6" />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribución por Franquicia</CardTitle>
                <CardDescription>Conversiones distribuidas por franquicia</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientDistribution serverId="6" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas actividades registradas en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Balance de Franquicias</CardTitle>
            <CardDescription>Saldo actual de cada franquicia</CardDescription>
          </CardHeader>
          <CardContent>
            <FranchiseBalance />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ServerProgressChart({ serverId }: { serverId: string }) {
  // Simulated data for the chart
  return (
    <div className="h-[300px] w-full">
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Gráfico de progreso del servidor {serverId}
      </div>
    </div>
  )
}

function FranchiseBalance() {
  const franchises = [
    { name: "ATENEA", balance: 12500.75 },
    { name: "EROS", balance: 8750.5 },
    { name: "FENIX", balance: 15200.25 },
    { name: "GANA24", balance: 9800.0 },
    { name: "FORTUNA", balance: 11250.75 },
    { name: "FLASHBET", balance: 7500.5 },
  ]

  return (
    <div className="space-y-4">
      {franchises.map((franchise) => (
        <div key={franchise.name} className="flex items-center justify-between">
          <div className="font-medium">{franchise.name}</div>
          <div className={franchise.balance > 10000 ? "text-green-500" : "text-yellow-500"}>
            ${franchise.balance.toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  )
}
