"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Download,
  Calendar,
  FileText,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Simulated data for transactions
const transactions = [
  {
    id: "1",
    date: "2023-04-22",
    client: "ATENEA",
    type: "income",
    amount: 5000.0,
    description: "Pago adelantado publicidad",
    status: "completed",
  },
  {
    id: "2",
    date: "2023-04-20",
    client: "ATENEA",
    type: "expense",
    amount: 1250.75,
    description: "Gasto publicidad Server 4",
    status: "completed",
  },
  {
    id: "3",
    date: "2023-04-18",
    client: "EROS",
    type: "expense",
    amount: 980.5,
    description: "Gasto publicidad Server 5",
    status: "completed",
  },
  {
    id: "4",
    date: "2023-04-15",
    client: "FENIX",
    type: "income",
    amount: 4500.0,
    description: "Pago adelantado publicidad",
    status: "completed",
  },
  {
    id: "5",
    date: "2023-04-12",
    client: "GANA24",
    type: "income",
    amount: 3000.0,
    description: "Pago adelantado publicidad",
    status: "completed",
  },
  {
    id: "6",
    date: "2023-04-10",
    client: "FORTUNA",
    type: "expense",
    amount: 1100.25,
    description: "Gasto publicidad Server 6",
    status: "completed",
  },
  {
    id: "7",
    date: "2023-04-08",
    client: "FLASHBET",
    type: "income",
    amount: 2500.0,
    description: "Pago adelantado publicidad",
    status: "completed",
  },
  {
    id: "8",
    date: "2023-04-05",
    client: "ATENEA",
    type: "expense",
    amount: 850.5,
    description: "Gasto publicidad Server 4",
    status: "completed",
  },
];

// Simulated data for invoices
const invoices = [
  {
    id: "INV-001",
    date: "2023-04-01",
    dueDate: "2023-04-15",
    client: "ATENEA",
    amount: 5000.0,
    status: "paid",
  },
  {
    id: "INV-002",
    date: "2023-04-01",
    dueDate: "2023-04-15",
    client: "EROS",
    amount: 4500.0,
    status: "paid",
  },
  {
    id: "INV-003",
    date: "2023-04-01",
    dueDate: "2023-04-15",
    client: "FENIX",
    amount: 6000.0,
    status: "paid",
  },
  {
    id: "INV-004",
    date: "2023-04-01",
    dueDate: "2023-04-15",
    client: "GANA24",
    amount: 3000.0,
    status: "paid",
  },
  {
    id: "INV-005",
    date: "2023-04-01",
    dueDate: "2023-04-15",
    client: "FORTUNA",
    amount: 4000.0,
    status: "pending",
  },
  {
    id: "INV-006",
    date: "2023-04-01",
    dueDate: "2023-04-15",
    client: "FLASHBET",
    amount: 3500.0,
    status: "pending",
  },
  {
    id: "INV-007",
    date: "2023-05-01",
    dueDate: "2023-05-15",
    client: "ATENEA",
    amount: 5500.0,
    status: "draft",
  },
  {
    id: "INV-008",
    date: "2023-05-01",
    dueDate: "2023-05-15",
    client: "EROS",
    amount: 4800.0,
    status: "draft",
  },
];

// Simulated data for expenses
const expenses = [
  {
    id: "1",
    date: "2023-04-22",
    category: "Publicidad",
    amount: 1250.75,
    description: "Gasto publicidad Server 4",
    paymentMethod: "Tarjeta Corporativa",
  },
  {
    id: "2",
    date: "2023-04-20",
    category: "Publicidad",
    amount: 980.5,
    description: "Gasto publicidad Server 5",
    paymentMethod: "Tarjeta Corporativa",
  },
  {
    id: "3",
    date: "2023-04-18",
    category: "Salarios",
    amount: 8500.0,
    description: "Pago quincenal personal",
    paymentMethod: "Transferencia Bancaria",
  },
  {
    id: "4",
    date: "2023-04-15",
    category: "Servicios",
    amount: 350.0,
    description: "Pago internet oficina",
    paymentMethod: "Débito Automático",
  },
  {
    id: "5",
    date: "2023-04-12",
    category: "Publicidad",
    amount: 1100.25,
    description: "Gasto publicidad Server 6",
    paymentMethod: "Tarjeta Corporativa",
  },
  {
    id: "6",
    date: "2023-04-10",
    category: "Equipamiento",
    amount: 2500.0,
    description: "Compra de equipos informáticos",
    paymentMethod: "Transferencia Bancaria",
  },
  {
    id: "7",
    date: "2023-04-05",
    category: "Publicidad",
    amount: 850.5,
    description: "Gasto publicidad Server 4",
    paymentMethod: "Tarjeta Corporativa",
  },
  {
    id: "8",
    date: "2023-04-03",
    category: "Alquiler",
    amount: 1200.0,
    description: "Alquiler oficina",
    paymentMethod: "Débito Automático",
  },
];

export default function FinancesPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Finanzas</h1>
        <p className="text-muted-foreground">
          Gestiona los ingresos, gastos y facturación.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <Wallet className="h-4 w-4 text-[#148f77]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Actualizado al {format(new Date(), "dd/MM/yyyy")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              ${totalIncome.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12.5% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              ${totalExpenses.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +5.2% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Facturas Pendientes
            </CardTitle>
            <FileText className="h-4 w-4 text-[#148f77]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {invoices
                .filter((i) => i.status === "pending")
                .reduce((sum, i) => sum + i.amount, 0)
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {invoices.filter((i) => i.status === "pending").length} facturas
              por cobrar
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="transactions">Transacciones</TabsTrigger>
          <TabsTrigger value="invoices">Facturación</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flujo de Caja</CardTitle>
              <CardDescription>
                Ingresos y gastos del mes actual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Gráfico de flujo de caja
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Últimas Transacciones</CardTitle>
                <CardDescription>
                  Movimientos financieros recientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.slice(0, 5).map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {format(new Date(transaction.date), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>{transaction.client}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              transaction.type === "income"
                                ? "text-green-500 border-green-500"
                                : "text-red-500 border-red-500"
                            }
                          >
                            {transaction.type === "income"
                              ? "Ingreso"
                              : "Gasto"}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={
                            transaction.type === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {transaction.type === "income" ? "+" : "-"}$
                          {transaction.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" size="sm">
                    Ver Todas
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Distribución de Gastos</CardTitle>
                <CardDescription>Gastos por categoría</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Gráfico de distribución de gastos
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Proyección Financiera</CardTitle>
              <CardDescription>
                Proyección de ingresos y gastos para los próximos 3 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Gráfico de proyección financiera
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {date
                      ? format(date, "PPP", { locale: es })
                      : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de transacción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="income">Ingresos</SelectItem>
                  <SelectItem value="expense">Gastos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar transacciones..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-[#148f77] hover:bg-[#0e6251]">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Transacción
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transacciones</CardTitle>
              <CardDescription>
                Historial completo de transacciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {format(new Date(transaction.date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{transaction.client}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            transaction.type === "income"
                              ? "text-green-500 border-green-500"
                              : "text-red-500 border-red-500"
                          }
                        >
                          {transaction.type === "income" ? "Ingreso" : "Gasto"}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={
                          transaction.type === "income"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : "outline"
                          }
                          className={
                            transaction.status === "completed"
                              ? "bg-green-500 hover:bg-green-600"
                              : "text-yellow-500 border-yellow-500"
                          }
                        >
                          {transaction.status === "completed"
                            ? "Completada"
                            : "Pendiente"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="paid">Pagadas</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="draft">Borradores</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar facturas..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-[#148f77] hover:bg-[#0e6251]">
                <Plus className="mr-2 h-4 w-4" />
                Nueva Factura
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Facturas</CardTitle>
              <CardDescription>Gestiona tus facturas y cobros</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Número</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Fecha Emisión</TableHead>
                    <TableHead>Fecha Vencimiento</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                      </TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>
                        {format(new Date(invoice.date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(invoice.dueDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === "paid" ? "default" : "outline"
                          }
                          className={
                            invoice.status === "paid"
                              ? "bg-green-500 hover:bg-green-600"
                              : invoice.status === "pending"
                              ? "text-yellow-500 border-yellow-500"
                              : "text-blue-500 border-blue-500"
                          }
                        >
                          {invoice.status === "paid"
                            ? "Pagada"
                            : invoice.status === "pending"
                            ? "Pendiente"
                            : "Borrador"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="advertising">Publicidad</SelectItem>
                  <SelectItem value="salaries">Salarios</SelectItem>
                  <SelectItem value="services">Servicios</SelectItem>
                  <SelectItem value="equipment">Equipamiento</SelectItem>
                  <SelectItem value="rent">Alquiler</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]">
              <Plus className="mr-2 h-4 w-4" />
              Registrar Gasto
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gastos</CardTitle>
              <CardDescription>
                Registro de gastos por categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Método de Pago</TableHead>
                    <TableHead>Monto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        {format(new Date(expense.date), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>{expense.paymentMethod}</TableCell>
                      <TableCell className="text-red-500">
                        -${expense.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Gastos</CardTitle>
              <CardDescription>Gastos por categoría</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Gráfico de distribución de gastos
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
