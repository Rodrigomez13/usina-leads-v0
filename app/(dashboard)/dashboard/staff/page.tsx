"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Edit, Plus, Search, Trash2, User } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { es } from "date-fns/locale"

// Simulated staff data
const staff = [
  {
    id: "1",
    name: "Juan Pérez",
    role: "Encargado de Turno",
    shift: "Mañana",
    restDay: "Domingo",
    salary: 180000,
    hourlyRate: 750,
    overtimeRate: 1125,
    email: "juan@usina.com",
    phone: "+54 9 11 1234-5678",
    bankAccount: "CBU: 0000000000000000000000",
    alias: "juan.perez.mp",
  },
  {
    id: "2",
    name: "María López",
    role: "Operario",
    shift: "Mañana",
    restDay: "Sábado",
    salary: 150000,
    hourlyRate: 625,
    overtimeRate: 937.5,
    email: "maria@usina.com",
    phone: "+54 9 11 2345-6789",
    bankAccount: "CBU: 1111111111111111111111",
    alias: "maria.lopez.mp",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    role: "Encargado de Turno",
    shift: "Tarde",
    restDay: "Lunes",
    salary: 180000,
    hourlyRate: 750,
    overtimeRate: 1125,
    email: "carlos@usina.com",
    phone: "+54 9 11 3456-7890",
    bankAccount: "CBU: 2222222222222222222222",
    alias: "carlos.rodriguez.mp",
  },
  {
    id: "4",
    name: "Ana Martínez",
    role: "Operario",
    shift: "Tarde",
    restDay: "Miércoles",
    salary: 150000,
    hourlyRate: 625,
    overtimeRate: 937.5,
    email: "ana@usina.com",
    phone: "+54 9 11 4567-8901",
    bankAccount: "CBU: 3333333333333333333333",
    alias: "ana.martinez.mp",
  },
  {
    id: "5",
    name: "Roberto Gómez",
    role: "Encargado de Turno",
    shift: "Noche",
    restDay: "Jueves",
    salary: 200000,
    hourlyRate: 833.33,
    overtimeRate: 1250,
    email: "roberto@usina.com",
    phone: "+54 9 11 5678-9012",
    bankAccount: "CBU: 4444444444444444444444",
    alias: "roberto.gomez.mp",
  },
  {
    id: "6",
    name: "Laura Sánchez",
    role: "Operario",
    shift: "Noche",
    restDay: "Viernes",
    salary: 170000,
    hourlyRate: 708.33,
    overtimeRate: 1062.5,
    email: "laura@usina.com",
    phone: "+54 9 11 6789-0123",
    bankAccount: "CBU: 5555555555555555555555",
    alias: "laura.sanchez.mp",
  },
  {
    id: "7",
    name: "Diego Fernández",
    role: "Operario",
    shift: "Pico Mañana",
    restDay: "Martes",
    salary: 150000,
    hourlyRate: 625,
    overtimeRate: 937.5,
    email: "diego@usina.com",
    phone: "+54 9 11 7890-1234",
    bankAccount: "CBU: 6666666666666666666666",
    alias: "diego.fernandez.mp",
  },
  {
    id: "8",
    name: "Sofía Torres",
    role: "Operario",
    shift: "Pico Tarde",
    restDay: "Domingo",
    salary: 150000,
    hourlyRate: 625,
    overtimeRate: 937.5,
    email: "sofia@usina.com",
    phone: "+54 9 11 8901-2345",
    bankAccount: "CBU: 7777777777777777777777",
    alias: "sofia.torres.mp",
  },
]

// Simulated attendance data
const attendance = [
  {
    id: "1",
    date: "2023-04-22",
    staffId: "1",
    staffName: "Juan Pérez",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
  {
    id: "2",
    date: "2023-04-22",
    staffId: "2",
    staffName: "María López",
    hoursWorked: 8,
    overtime: 1,
    restDayWorked: false,
  },
  {
    id: "3",
    date: "2023-04-22",
    staffId: "3",
    staffName: "Carlos Rodríguez",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
  {
    id: "4",
    date: "2023-04-22",
    staffId: "4",
    staffName: "Ana Martínez",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
  {
    id: "5",
    date: "2023-04-22",
    staffId: "5",
    staffName: "Roberto Gómez",
    hoursWorked: 8,
    overtime: 2,
    restDayWorked: false,
  },
  {
    id: "6",
    date: "2023-04-22",
    staffId: "6",
    staffName: "Laura Sánchez",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
  {
    id: "7",
    date: "2023-04-22",
    staffId: "7",
    staffName: "Diego Fernández",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
  {
    id: "8",
    date: "2023-04-22",
    staffId: "8",
    staffName: "Sofía Torres",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: true,
  },
]

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState("staff")
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Personal</h1>
        <p className="text-muted-foreground">Gestiona el personal, turnos y asistencia.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="staff">
            <User className="mr-2 h-4 w-4" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <Clock className="mr-2 h-4 w-4" />
            Asistencia
          </TabsTrigger>
          <TabsTrigger value="shifts">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Turnos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar personal..." className="w-full pl-8" />
            </div>
            <Button className="ml-4 bg-[#148f77] hover:bg-[#0e6251]">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Personal
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal</CardTitle>
              <CardDescription>Lista de todo el personal y sus detalles.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Turno</TableHead>
                    <TableHead>Día de Franco</TableHead>
                    <TableHead>Salario</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">{person.name}</TableCell>
                      <TableCell>{person.role}</TableCell>
                      <TableCell>{person.shift}</TableCell>
                      <TableCell>{person.restDay}</TableCell>
                      <TableCell>${person.salary.toLocaleString()}</TableCell>
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Turno</CardTitle>
                <CardDescription>Personal asignado a cada turno</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#148f77]" />
                      <span>Turno Mañana (06hs - 14hs)</span>
                    </div>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#45b39d]" />
                      <span>Turno Tarde (14hs - 22hs)</span>
                    </div>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#0e6251]" />
                      <span>Turno Noche (22hs - 06hs)</span>
                    </div>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#a2d9ce]" />
                      <span>Turno Pico Mañana (10hs - 18hs)</span>
                    </div>
                    <span className="font-medium">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#7dcea0]" />
                      <span>Turno Pico Tarde (18hs - 02hs)</span>
                    </div>
                    <span className="font-medium">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Cargo</CardTitle>
                <CardDescription>Personal asignado a cada cargo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#148f77]" />
                      <span>Encargado de Turno</span>
                    </div>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-[#45b39d]" />
                      <span>Operario</span>
                    </div>
                    <span className="font-medium">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="flex items-center justify-between">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: es }) : "Seleccionar fecha"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]">
              <Plus className="mr-2 h-4 w-4" />
              Registrar Asistencia
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registro de Asistencia</CardTitle>
              <CardDescription>{date ? format(date, "PPP", { locale: es }) : "Hoy"}</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Horas Trabajadas</TableHead>
                    <TableHead>Horas Extra</TableHead>
                    <TableHead>Franco Trabajado</TableHead>
                    <TableHead>Total a Pagar</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((record) => {
                    const person = staff.find((p) => p.id === record.staffId)
                    const regularPay = record.hoursWorked * (person?.hourlyRate || 0)
                    const overtimePay = record.overtime * (person?.overtimeRate || 0)
                    const restDayPay = record.restDayWorked ? 8 * (person?.hourlyRate || 0) : 0
                    const totalPay = regularPay + overtimePay + restDayPay

                    return (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.staffName}</TableCell>
                        <TableCell>{record.hoursWorked}</TableCell>
                        <TableCell>{record.overtime}</TableCell>
                        <TableCell>
                          {record.restDayWorked ? (
                            <Badge className="bg-green-500 hover:bg-green-600">Sí</Badge>
                          ) : (
                            <Badge variant="outline">No</Badge>
                          )}
                        </TableCell>
                        <TableCell>${totalPay.toFixed(2)}</TableCell>
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
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Asistencia Mensual</CardTitle>
              <CardDescription>Abril 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Horas Trabajadas</p>
                  <p className="text-2xl font-bold">1,840</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Horas Extra</p>
                  <p className="text-2xl font-bold">78</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Francos Trabajados</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total a Pagar</p>
                  <p className="text-2xl font-bold">$1,280,000</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shifts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Turnos</CardTitle>
              <CardDescription>Configuración de turnos y horarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Turno Mañana (06hs - 14hs)</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Cargo</TableHead>
                          <TableHead>Día de Franco</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staff
                          .filter((p) => p.shift === "Mañana")
                          .map((person) => (
                            <TableRow key={person.id}>
                              <TableCell className="font-medium">{person.name}</TableCell>
                              <TableCell>{person.role}</TableCell>
                              <TableCell>{person.restDay}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Turno Tarde (14hs - 22hs)</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Cargo</TableHead>
                          <TableHead>Día de Franco</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staff
                          .filter((p) => p.shift === "Tarde")
                          .map((person) => (
                            <TableRow key={person.id}>
                              <TableCell className="font-medium">{person.name}</TableCell>
                              <TableCell>{person.role}</TableCell>
                              <TableCell>{person.restDay}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Turno Noche (22hs - 06hs)</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Cargo</TableHead>
                          <TableHead>Día de Franco</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staff
                          .filter((p) => p.shift === "Noche")
                          .map((person) => (
                            <TableRow key={person.id}>
                              <TableCell className="font-medium">{person.name}</TableCell>
                              <TableCell>{person.role}</TableCell>
                              <TableCell>{person.restDay}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Turno Pico Mañana (10hs - 18hs)</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Cargo</TableHead>
                          <TableHead>Día de Franco</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staff
                          .filter((p) => p.shift === "Pico Mañana")
                          .map((person) => (
                            <TableRow key={person.id}>
                              <TableCell className="font-medium">{person.name}</TableCell>
                              <TableCell>{person.role}</TableCell>
                              <TableCell>{person.restDay}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Turno Pico Tarde (18hs - 02hs)</h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Cargo</TableHead>
                          <TableHead>Día de Franco</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {staff
                          .filter((p) => p.shift === "Pico Tarde")
                          .map((person) => (
                            <TableRow key={person.id}>
                              <TableCell className="font-medium">{person.name}</TableCell>
                              <TableCell>{person.role}</TableCell>
                              <TableCell>{person.restDay}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
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
