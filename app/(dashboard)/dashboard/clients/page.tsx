import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, ArrowUpRight } from "lucide-react"
import Link from "next/link"

// Simulated data
const clients = [
  {
    id: "1",
    name: "ATENEA",
    phones: 20,
    balance: 12500.75,
    status: "active",
    dailyGoal: 80,
    currentMonth: {
      leads: 2450,
      conversions: 612,
      expense: 3580.5,
    },
  },
  {
    id: "2",
    name: "EROS",
    phones: 18,
    balance: 8750.5,
    status: "active",
    dailyGoal: 65,
    currentMonth: {
      leads: 1980,
      conversions: 495,
      expense: 2890.25,
    },
  },
  {
    id: "3",
    name: "FENIX",
    phones: 22,
    balance: 15200.25,
    status: "active",
    dailyGoal: 90,
    currentMonth: {
      leads: 2780,
      conversions: 695,
      expense: 4050.75,
    },
  },
  {
    id: "4",
    name: "GANA24",
    phones: 15,
    balance: 9800.0,
    status: "active",
    dailyGoal: 60,
    currentMonth: {
      leads: 1850,
      conversions: 462,
      expense: 2700.5,
    },
  },
  {
    id: "5",
    name: "FORTUNA",
    phones: 19,
    balance: 11250.75,
    status: "active",
    dailyGoal: 75,
    currentMonth: {
      leads: 2250,
      conversions: 562,
      expense: 3280.25,
    },
  },
  {
    id: "6",
    name: "FLASHBET",
    phones: 14,
    balance: 7500.5,
    status: "warning",
    dailyGoal: 55,
    currentMonth: {
      leads: 1650,
      conversions: 412,
      expense: 2400.75,
    },
  },
]

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground">Gestiona los clientes y franquicias.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar clientes..." className="w-full pl-8" />
        </div>
        <Button className="ml-4 bg-[#148f77] hover:bg-[#0e6251]">
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Cliente
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clientes y Franquicias</CardTitle>
          <CardDescription>Lista de todos los clientes y sus métricas actuales.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Teléfonos</TableHead>
                <TableHead>Saldo</TableHead>
                <TableHead>Objetivo Diario</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.phones}</TableCell>
                  <TableCell className={client.balance < 10000 ? "text-yellow-500" : "text-green-500"}>
                    ${client.balance.toFixed(2)}
                  </TableCell>
                  <TableCell>{client.dailyGoal}</TableCell>
                  <TableCell>
                    <Badge
                      variant={client.status === "active" ? "default" : "outline"}
                      className={
                        client.status === "active"
                          ? "bg-green-500 hover:bg-green-600"
                          : "text-yellow-500 border-yellow-500"
                      }
                    >
                      {client.status === "active" ? "Activo" : "Advertencia"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/clients/${client.id}`}>
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        Detalles
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumen Mensual</CardTitle>
          <CardDescription>Métricas del mes actual por cliente</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="leads" className="space-y-4">
            <TabsList>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="conversions">Conversiones</TabsTrigger>
              <TabsTrigger value="expense">Gasto</TabsTrigger>
            </TabsList>
            <TabsContent value="leads" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clients.map((client) => (
                  <Card key={client.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{client.currentMonth.leads}</div>
                      <p className="text-xs text-muted-foreground">Leads generados este mes</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="conversions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clients.map((client) => (
                  <Card key={client.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{client.currentMonth.conversions}</div>
                      <p className="text-xs text-muted-foreground">Conversiones este mes</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="expense" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {clients.map((client) => (
                  <Card key={client.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{client.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">${client.currentMonth.expense.toFixed(2)}</div>
                      <p className="text-xs text-muted-foreground">Gasto total este mes</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
