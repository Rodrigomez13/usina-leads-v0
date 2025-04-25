"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Plus, Trash2, Wallet, Phone, BarChart3, History } from "lucide-react"
import Link from "next/link"

// Simulated client data
const client = {
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
}

// Simulated phone data
const phones = [
  { id: "1", number: "+54 9 11 1234-5678", dailyGoal: 5, active: true },
  { id: "2", number: "+54 9 11 2345-6789", dailyGoal: 4, active: true },
  { id: "3", number: "+54 9 11 3456-7890", dailyGoal: 5, active: true },
  { id: "4", number: "+54 9 11 4567-8901", dailyGoal: 4, active: true },
  { id: "5", number: "+54 9 11 5678-9012", dailyGoal: 3, active: false },
]

// Simulated transaction data
const transactions = [
  {
    id: "1",
    date: "2023-04-22",
    type: "deposit",
    amount: 5000.0,
    description: "Pago adelantado publicidad",
  },
  {
    id: "2",
    date: "2023-04-20",
    type: "expense",
    amount: 1250.75,
    description: "Gasto publicidad Server 4",
  },
  {
    id: "3",
    date: "2023-04-18",
    type: "expense",
    amount: 980.5,
    description: "Gasto publicidad Server 5",
  },
  {
    id: "4",
    date: "2023-04-15",
    type: "deposit",
    amount: 4500.0,
    description: "Pago adelantado publicidad",
  },
]

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/clients">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
          <p className="text-muted-foreground">
            ID: {params.id} • {client.phones} teléfonos
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">
            <BarChart3 className="mr-2 h-4 w-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="phones">
            <Phone className="mr-2 h-4 w-4" />
            Teléfonos
          </TabsTrigger>
          <TabsTrigger value="finances">
            <Wallet className="mr-2 h-4 w-4" />
            Finanzas
          </TabsTrigger>
          <TabsTrigger value="history">
            <History className="mr-2 h-4 w-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Saldo Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${client.balance < 10000 ? "text-yellow-500" : "text-green-500"}`}>
                  ${client.balance.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">Último pago: 22 de abril, 2023</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Leads Mensuales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{client.currentMonth.leads}</div>
                <p className="text-xs text-muted-foreground">+12.5% respecto al mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Conversiones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{client.currentMonth.conversions}</div>
                <p className="text-xs text-muted-foreground">Tasa de conversión: 25%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Gasto Mensual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${client.currentMonth.expense.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Promedio diario: $119.35</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Conversiones</CardTitle>
              <CardDescription>Distribución de conversiones por servidor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Gráfico de distribución de conversiones
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Teléfonos Activos</CardTitle>
                <CardDescription>Teléfonos con mayor actividad</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Número</TableHead>
                      <TableHead>Objetivo</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {phones.slice(0, 5).map((phone) => (
                      <TableRow key={phone.id}>
                        <TableCell className="font-medium">{phone.number}</TableCell>
                        <TableCell>{phone.dailyGoal}</TableCell>
                        <TableCell>
                          <Badge
                            variant={phone.active ? "default" : "outline"}
                            className={
                              phone.active ? "bg-green-500 hover:bg-green-600" : "text-yellow-500 border-yellow-500"
                            }
                          >
                            {phone.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Últimas Transacciones</CardTitle>
                <CardDescription>Movimientos financieros recientes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.slice(0, 5).map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              transaction.type === "deposit"
                                ? "text-green-500 border-green-500"
                                : "text-red-500 border-red-500"
                            }
                          >
                            {transaction.type === "deposit" ? "Ingreso" : "Gasto"}
                          </Badge>
                        </TableCell>
                        <TableCell className={transaction.type === "deposit" ? "text-green-500" : "text-red-500"}>
                          {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="phones" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Teléfonos</CardTitle>
                <CardDescription>Gestiona los teléfonos de {client.name}</CardDescription>
              </div>
              <Button className="bg-[#148f77] hover:bg-[#0e6251]">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Teléfono
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Objetivo Diario</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {phones.map((phone) => (
                    <TableRow key={phone.id}>
                      <TableCell className="font-medium">{phone.number}</TableCell>
                      <TableCell>{phone.dailyGoal}</TableCell>
                      <TableCell>
                        <Badge
                          variant={phone.active ? "default" : "outline"}
                          className={
                            phone.active ? "bg-green-500 hover:bg-green-600" : "text-yellow-500 border-yellow-500"
                          }
                        >
                          {phone.active ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finances" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Saldo Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${client.balance < 10000 ? "text-yellow-500" : "text-green-500"}`}>
                  ${client.balance.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Gasto Mensual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${client.currentMonth.expense.toFixed(2)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Último Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,000.00</div>
                <p className="text-xs text-muted-foreground">22 de abril, 2023</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Proyección</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5 días</div>
                <p className="text-xs text-muted-foreground">Hasta próximo pago recomendado</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Transacciones</CardTitle>
                <CardDescription>Historial de movimientos financieros</CardDescription>
              </div>
              <Button className="bg-[#148f77] hover:bg-[#0e6251]">
                <Plus className="mr-2 h-4 w-4" />
                Registrar Pago
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Descripción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            transaction.type === "deposit"
                              ? "text-green-500 border-green-500"
                              : "text-red-500 border-red-500"
                          }
                        >
                          {transaction.type === "deposit" ? "Ingreso" : "Gasto"}
                        </Badge>
                      </TableCell>
                      <TableCell className={transaction.type === "deposit" ? "text-green-500" : "text-red-500"}>
                        {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Actividad</CardTitle>
              <CardDescription>Registro histórico de actividades para {client.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-semibold">Abril 2023</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#148f77] p-2">
                        <Wallet className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Pago recibido: $5,000.00</p>
                        <p className="text-xs text-muted-foreground">22 de abril, 2023 - 14:35</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-muted p-2">
                        <BarChart3 className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Objetivo diario actualizado: 80 conversiones</p>
                        <p className="text-xs text-muted-foreground">20 de abril, 2023 - 10:15</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-muted p-2">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Teléfono agregado: +54 9 11 1234-5678</p>
                        <p className="text-xs text-muted-foreground">18 de abril, 2023 - 09:22</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#148f77] p-2">
                        <Wallet className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Pago recibido: $4,500.00</p>
                        <p className="text-xs text-muted-foreground">15 de abril, 2023 - 16:40</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Marzo 2023</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#148f77] p-2">
                        <Wallet className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Pago recibido: $6,000.00</p>
                        <p className="text-xs text-muted-foreground">30 de marzo, 2023 - 11:20</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-muted p-2">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Teléfono desactivado: +54 9 11 5678-9012</p>
                        <p className="text-xs text-muted-foreground">25 de marzo, 2023 - 15:45</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
