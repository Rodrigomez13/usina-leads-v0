"use client";

import { useState, useRef } from "react";
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
  Edit,
  Trash2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Tipos para nuestros datos
interface Transaction {
  id: string;
  date: string;
  client: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  status: "completed" | "pending";
}

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  client: string;
  amount: number;
  status: "paid" | "pending" | "draft";
}

interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  paymentMethod: string;
}

// Datos iniciales
const initialTransactions: Transaction[] = [
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

const initialInvoices: Invoice[] = [
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

const initialExpenses: Expense[] = [
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

// Lista de clientes para seleccionar
const clients = ["ATENEA", "EROS", "FENIX", "GANA24", "FORTUNA", "FLASHBET"];

// Categorías de gastos
const expenseCategories = [
  "Publicidad",
  "Salarios",
  "Servicios",
  "Equipamiento",
  "Alquiler",
  "Otros",
];

// Métodos de pago
const paymentMethods = [
  "Tarjeta Corporativa",
  "Transferencia Bancaria",
  "Débito Automático",
  "Efectivo",
];

export default function FinancesPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [transactionTypeFilter, setTransactionTypeFilter] = useState("all");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("all");
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState("all");

  // Estados para los datos
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  // Estados para diálogos
  const [isNewTransactionDialogOpen, setIsNewTransactionDialogOpen] =
    useState(false);
  const [isEditTransactionDialogOpen, setIsEditTransactionDialogOpen] =
    useState(false);
  const [isNewInvoiceDialogOpen, setIsNewInvoiceDialogOpen] = useState(false);
  const [isEditInvoiceDialogOpen, setIsEditInvoiceDialogOpen] = useState(false);
  const [isNewExpenseDialogOpen, setIsNewExpenseDialogOpen] = useState(false);
  const [isEditExpenseDialogOpen, setIsEditExpenseDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Estados para formularios
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    date: new Date().toISOString().split("T")[0],
    type: "income",
    status: "completed",
  });
  const [editTransaction, setEditTransaction] = useState<Transaction | null>(
    null
  );

  const [newInvoice, setNewInvoice] = useState<Partial<Invoice>>({
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "draft",
  });
  const [editInvoice, setEditInvoice] = useState<Invoice | null>(null);

  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    date: new Date().toISOString().split("T")[0],
    category: "Publicidad",
    paymentMethod: "Tarjeta Corporativa",
  });
  const [editExpense, setEditExpense] = useState<Expense | null>(null);

  // Estado para eliminación
  const [deleteItem, setDeleteItem] = useState<{
    id: string;
    type: string;
  } | null>(null);

  // Referencia para simular descarga de PDF
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  // Calcular totales
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const pendingInvoicesTotal = invoices
    .filter((i) => i.status === "pending")
    .reduce((sum, i) => sum + i.amount, 0);
  const pendingInvoicesCount = invoices.filter(
    (i) => i.status === "pending"
  ).length;

  // Filtrar transacciones
  const filteredTransactions = transactions.filter(
    (transaction) =>
      (transaction.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (transactionTypeFilter === "all" ||
        transaction.type === transactionTypeFilter)
  );

  // Filtrar facturas
  const filteredInvoices = invoices.filter(
    (invoice) =>
      (invoice.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (invoiceStatusFilter === "all" || invoice.status === invoiceStatusFilter)
  );

  // Filtrar gastos
  const filteredExpenses = expenses.filter(
    (expense) =>
      (expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (expenseCategoryFilter === "all" ||
        expense.category === expenseCategoryFilter)
  );

  // Funciones para transacciones
  const handleAddTransaction = () => {
    if (
      !newTransaction.client ||
      !newTransaction.amount ||
      !newTransaction.description
    ) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const id = (
      Math.max(...transactions.map((t) => Number.parseInt(t.id)), 0) + 1
    ).toString();
    const transaction: Transaction = {
      id,
      date: newTransaction.date || new Date().toISOString().split("T")[0],
      client: newTransaction.client || "",
      type: newTransaction.type || "income",
      amount: newTransaction.amount || 0,
      description: newTransaction.description || "",
      status: newTransaction.status || "completed",
    };

    setTransactions([transaction, ...transactions]);
    setIsNewTransactionDialogOpen(false);
    setNewTransaction({
      date: new Date().toISOString().split("T")[0],
      type: "income",
      status: "completed",
    });

    toast({
      title: "Transacción creada",
      description: `La transacción ha sido registrada exitosamente.`,
    });
  };

  const handleEditTransaction = () => {
    if (!editTransaction) return;

    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === editTransaction.id ? editTransaction : transaction
    );

    setTransactions(updatedTransactions);
    setIsEditTransactionDialogOpen(false);
    setEditTransaction(null);

    toast({
      title: "Transacción actualizada",
      description: `La transacción ha sido actualizada exitosamente.`,
    });
  };

  const openEditTransactionDialog = (transaction: Transaction) => {
    setEditTransaction({ ...transaction });
    setIsEditTransactionDialogOpen(true);
  };

  // Funciones para facturas
  const handleAddInvoice = () => {
    if (!newInvoice.client || !newInvoice.amount) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    // Generar ID de factura
    const lastInvoiceNumber = Math.max(
      ...invoices.map((i) => Number.parseInt(i.id.replace("INV-", ""))),
      0
    );
    const newInvoiceNumber = (lastInvoiceNumber + 1)
      .toString()
      .padStart(3, "0");
    const id = `INV-${newInvoiceNumber}`;

    const invoice: Invoice = {
      id,
      date: newInvoice.date || new Date().toISOString().split("T")[0],
      dueDate:
        newInvoice.dueDate ||
        new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      client: newInvoice.client || "",
      amount: newInvoice.amount || 0,
      status: newInvoice.status || "draft",
    };

    setInvoices([invoice, ...invoices]);
    setIsNewInvoiceDialogOpen(false);
    setNewInvoice({
      date: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      status: "draft",
    });

    toast({
      title: "Factura creada",
      description: `La factura ${id} ha sido creada exitosamente.`,
    });
  };

  const handleEditInvoice = () => {
    if (!editInvoice) return;

    const updatedInvoices = invoices.map((invoice) =>
      invoice.id === editInvoice.id ? editInvoice : invoice
    );

    setInvoices(updatedInvoices);
    setIsEditInvoiceDialogOpen(false);
    setEditInvoice(null);

    toast({
      title: "Factura actualizada",
      description: `La factura ${editInvoice.id} ha sido actualizada exitosamente.`,
    });
  };

  const openEditInvoiceDialog = (invoice: Invoice) => {
    setEditInvoice({ ...invoice });
    setIsEditInvoiceDialogOpen(true);
  };

  // Funciones para gastos
  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.amount || !newExpense.description) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const id = (
      Math.max(...expenses.map((e) => Number.parseInt(e.id)), 0) + 1
    ).toString();
    const expense: Expense = {
      id,
      date: newExpense.date || new Date().toISOString().split("T")[0],
      category: newExpense.category || "Otros",
      amount: newExpense.amount || 0,
      description: newExpense.description || "",
      paymentMethod: newExpense.paymentMethod || "Tarjeta Corporativa",
    };

    setExpenses([expense, ...expenses]);
    setIsNewExpenseDialogOpen(false);
    setNewExpense({
      date: new Date().toISOString().split("T")[0],
      category: "Publicidad",
      paymentMethod: "Tarjeta Corporativa",
    });

    // También registrar como transacción de tipo gasto
    const transaction: Transaction = {
      id: (
        Math.max(...transactions.map((t) => Number.parseInt(t.id)), 0) + 1
      ).toString(),
      date: expense.date,
      client: "Interno",
      type: "expense",
      amount: expense.amount,
      description: `${expense.category}: ${expense.description}`,
      status: "completed",
    };

    setTransactions([transaction, ...transactions]);

    toast({
      title: "Gasto registrado",
      description: `El gasto ha sido registrado exitosamente.`,
    });
  };

  const handleEditExpense = () => {
    if (!editExpense) return;

    const updatedExpenses = expenses.map((expense) =>
      expense.id === editExpense.id ? editExpense : expense
    );

    setExpenses(updatedExpenses);
    setIsEditExpenseDialogOpen(false);
    setEditExpense(null);

    toast({
      title: "Gasto actualizado",
      description: `El gasto ha sido actualizado exitosamente.`,
    });
  };

  const openEditExpenseDialog = (expense: Expense) => {
    setEditExpense({ ...expense });
    setIsEditExpenseDialogOpen(true);
  };

  // Funciones para eliminar
  const openDeleteDialog = (id: string, type: string) => {
    setDeleteItem({ id, type });
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!deleteItem) return;

    if (deleteItem.type === "transaction") {
      setTransactions(transactions.filter((t) => t.id !== deleteItem.id));
      toast({
        title: "Transacción eliminada",
        description: "La transacción ha sido eliminada exitosamente.",
      });
    } else if (deleteItem.type === "invoice") {
      setInvoices(invoices.filter((i) => i.id !== deleteItem.id));
      toast({
        title: "Factura eliminada",
        description: "La factura ha sido eliminada exitosamente.",
      });
    } else if (deleteItem.type === "expense") {
      setExpenses(expenses.filter((e) => e.id !== deleteItem.id));
      toast({
        title: "Gasto eliminado",
        description: "El gasto ha sido eliminado exitosamente.",
      });
    }

    setIsDeleteDialogOpen(false);
    setDeleteItem(null);
  };

  // Función para descargar factura como PDF
  const handleDownloadInvoice = (invoice: Invoice) => {
    // Crear un objeto Blob con el contenido del PDF (simulado)
    const invoiceContent = `
      FACTURA: ${invoice.id}
      FECHA: ${format(new Date(invoice.date), "dd/MM/yyyy")}
      VENCIMIENTO: ${format(new Date(invoice.dueDate), "dd/MM/yyyy")}
      CLIENTE: ${invoice.client}
      MONTO: $${invoice.amount.toFixed(2)}
      ESTADO: ${
        invoice.status === "paid"
          ? "PAGADA"
          : invoice.status === "pending"
          ? "PENDIENTE"
          : "BORRADOR"
      }
    `;
    const blob = new Blob([invoiceContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    // Crear un enlace temporal y hacer clic en él para descargar
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `${invoice.id}_${invoice.client}.pdf`;
      downloadLinkRef.current.click();
    }

    // Liberar la URL del objeto
    setTimeout(() => URL.revokeObjectURL(url), 100);

    toast({
      title: "Descarga iniciada",
      description: `La factura ${invoice.id} se está descargando.`,
    });
  };

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
              ${pendingInvoicesTotal.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {pendingInvoicesCount} facturas por cobrar
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("transactions")}
                  >
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
              <Select
                defaultValue={transactionTypeFilter}
                onValueChange={setTransactionTypeFilter}
              >
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
              <Button
                className="bg-[#148f77] hover:bg-[#0e6251]"
                onClick={() => setIsNewTransactionDialogOpen(true)}
              >
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
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No se encontraron transacciones que coincidan con tu
                        búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((transaction) => (
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
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                openEditTransactionDialog(transaction)
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                openDeleteDialog(transaction.id, "transaction")
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select
                defaultValue={invoiceStatusFilter}
                onValueChange={setInvoiceStatusFilter}
              >
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
              <Button
                className="bg-[#148f77] hover:bg-[#0e6251]"
                onClick={() => setIsNewInvoiceDialogOpen(true)}
              >
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
                  {filteredInvoices.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No se encontraron facturas que coincidan con tu
                        búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInvoices.map((invoice) => (
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
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadInvoice(invoice)}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              PDF
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditInvoiceDialog(invoice)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                openDeleteDialog(invoice.id, "invoice")
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Select
                defaultValue={expenseCategoryFilter}
                onValueChange={setExpenseCategoryFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={() => setIsNewExpenseDialogOpen(true)}
            >
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
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExpenses.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No se encontraron gastos que coincidan con tu búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredExpenses.map((expense) => (
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
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditExpenseDialog(expense)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                openDeleteDialog(expense.id, "expense")
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
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

      {/* Nueva Transacción Dialog */}
      <Dialog
        open={isNewTransactionDialogOpen}
        onOpenChange={setIsNewTransactionDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nueva Transacción</DialogTitle>
            <DialogDescription>
              Registra una nueva transacción financiera.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="transaction-type">Tipo de Transacción</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="income"
                    name="transaction-type"
                    value="income"
                    checked={newTransaction.type === "income"}
                    onChange={() =>
                      setNewTransaction({ ...newTransaction, type: "income" })
                    }
                  />
                  <Label htmlFor="income">Ingreso</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="expense"
                    name="transaction-type"
                    value="expense"
                    checked={newTransaction.type === "expense"}
                    onChange={() =>
                      setNewTransaction({ ...newTransaction, type: "expense" })
                    }
                  />
                  <Label htmlFor="expense">Gasto</Label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transaction-date">Fecha</Label>
              <Input
                id="transaction-date"
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transaction-client">Cliente</Label>
              <Select
                value={newTransaction.client}
                onValueChange={(value) =>
                  setNewTransaction({ ...newTransaction, client: value })
                }
              >
                <SelectTrigger id="transaction-client">
                  <SelectValue placeholder="Selecciona un cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                  <SelectItem value="Interno">Interno</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transaction-amount">Monto ($)</Label>
              <Input
                id="transaction-amount"
                type="number"
                step="0.01"
                value={newTransaction.amount || ""}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: Number.parseFloat(e.target.value),
                  })
                }
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transaction-description">Descripción</Label>
              <Input
                id="transaction-description"
                value={newTransaction.description || ""}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    description: e.target.value,
                  })
                }
                placeholder="Descripción de la transacción"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="transaction-status">Estado</Label>
              <Select
                value={newTransaction.status}
                onValueChange={(value) =>
                  setNewTransaction({
                    ...newTransaction,
                    status: value as "completed" | "pending",
                  })
                }
              >
                <SelectTrigger id="transaction-status">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completada</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewTransactionDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddTransaction}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Registrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Editar Transacción Dialog */}
      <Dialog
        open={isEditTransactionDialogOpen}
        onOpenChange={setIsEditTransactionDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Transacción</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la transacción.
            </DialogDescription>
          </DialogHeader>
          {editTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-transaction-type">
                  Tipo de Transacción
                </Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="edit-income"
                      name="edit-transaction-type"
                      value="income"
                      checked={editTransaction.type === "income"}
                      onChange={() =>
                        setEditTransaction({
                          ...editTransaction,
                          type: "income",
                        })
                      }
                    />
                    <Label htmlFor="edit-income">Ingreso</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="edit-expense"
                      name="edit-transaction-type"
                      value="expense"
                      checked={editTransaction.type === "expense"}
                      onChange={() =>
                        setEditTransaction({
                          ...editTransaction,
                          type: "expense",
                        })
                      }
                    />
                    <Label htmlFor="edit-expense">Gasto</Label>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-transaction-date">Fecha</Label>
                <Input
                  id="edit-transaction-date"
                  type="date"
                  value={editTransaction.date}
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      date: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-transaction-client">Cliente</Label>
                <Select
                  value={editTransaction.client}
                  onValueChange={(value) =>
                    setEditTransaction({ ...editTransaction, client: value })
                  }
                >
                  <SelectTrigger id="edit-transaction-client">
                    <SelectValue placeholder="Selecciona un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client} value={client}>
                        {client}
                      </SelectItem>
                    ))}
                    <SelectItem value="Interno">Interno</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-transaction-amount">Monto ($)</Label>
                <Input
                  id="edit-transaction-amount"
                  type="number"
                  step="0.01"
                  value={editTransaction.amount}
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      amount: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-transaction-description">
                  Descripción
                </Label>
                <Input
                  id="edit-transaction-description"
                  value={editTransaction.description}
                  onChange={(e) =>
                    setEditTransaction({
                      ...editTransaction,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-transaction-status">Estado</Label>
                <Select
                  value={editTransaction.status}
                  onValueChange={(value) =>
                    setEditTransaction({
                      ...editTransaction,
                      status: value as "completed" | "pending",
                    })
                  }
                >
                  <SelectTrigger id="edit-transaction-status">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="completed">Completada</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditTransactionDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEditTransaction}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nueva Factura Dialog */}
      <Dialog
        open={isNewInvoiceDialogOpen}
        onOpenChange={setIsNewInvoiceDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nueva Factura</DialogTitle>
            <DialogDescription>
              Crea una nueva factura para un cliente.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="invoice-client">Cliente</Label>
              <Select
                value={newInvoice.client}
                onValueChange={(value) =>
                  setNewInvoice({ ...newInvoice, client: value })
                }
              >
                <SelectTrigger id="invoice-client">
                  <SelectValue placeholder="Selecciona un cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client} value={client}>
                      {client}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invoice-date">Fecha de Emisión</Label>
              <Input
                id="invoice-date"
                type="date"
                value={newInvoice.date}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, date: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invoice-due-date">Fecha de Vencimiento</Label>
              <Input
                id="invoice-due-date"
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, dueDate: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invoice-amount">Monto ($)</Label>
              <Input
                id="invoice-amount"
                type="number"
                step="0.01"
                value={newInvoice.amount || ""}
                onChange={(e) =>
                  setNewInvoice({
                    ...newInvoice,
                    amount: Number.parseFloat(e.target.value),
                  })
                }
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invoice-status">Estado</Label>
              <Select
                value={newInvoice.status}
                onValueChange={(value) =>
                  setNewInvoice({
                    ...newInvoice,
                    status: value as "paid" | "pending" | "draft",
                  })
                }
              >
                <SelectTrigger id="invoice-status">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="paid">Pagada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewInvoiceDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddInvoice}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Crear Factura
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Editar Factura Dialog */}
      <Dialog
        open={isEditInvoiceDialogOpen}
        onOpenChange={setIsEditInvoiceDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Factura</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la factura.
            </DialogDescription>
          </DialogHeader>
          {editInvoice && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-invoice-client">Cliente</Label>
                <Select
                  value={editInvoice.client}
                  onValueChange={(value) =>
                    setEditInvoice({ ...editInvoice, client: value })
                  }
                >
                  <SelectTrigger id="edit-invoice-client">
                    <SelectValue placeholder="Selecciona un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map((client) => (
                      <SelectItem key={client} value={client}>
                        {client}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-invoice-date">Fecha de Emisión</Label>
                <Input
                  id="edit-invoice-date"
                  type="date"
                  value={editInvoice.date}
                  onChange={(e) =>
                    setEditInvoice({ ...editInvoice, date: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-invoice-due-date">
                  Fecha de Vencimiento
                </Label>
                <Input
                  id="edit-invoice-due-date"
                  type="date"
                  value={editInvoice.dueDate}
                  onChange={(e) =>
                    setEditInvoice({ ...editInvoice, dueDate: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-invoice-amount">Monto ($)</Label>
                <Input
                  id="edit-invoice-amount"
                  type="number"
                  step="0.01"
                  value={editInvoice.amount}
                  onChange={(e) =>
                    setEditInvoice({
                      ...editInvoice,
                      amount: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-invoice-status">Estado</Label>
                <Select
                  value={editInvoice.status}
                  onValueChange={(value) =>
                    setEditInvoice({
                      ...editInvoice,
                      status: value as "paid" | "pending" | "draft",
                    })
                  }
                >
                  <SelectTrigger id="edit-invoice-status">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="paid">Pagada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditInvoiceDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEditInvoice}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nuevo Gasto Dialog */}
      <Dialog
        open={isNewExpenseDialogOpen}
        onOpenChange={setIsNewExpenseDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registrar Gasto</DialogTitle>
            <DialogDescription>
              Registra un nuevo gasto en el sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="expense-date">Fecha</Label>
              <Input
                id="expense-date"
                type="date"
                value={newExpense.date}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, date: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expense-category">Categoría</Label>
              <Select
                value={newExpense.category}
                onValueChange={(value) =>
                  setNewExpense({ ...newExpense, category: value })
                }
              >
                <SelectTrigger id="expense-category">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expense-amount">Monto ($)</Label>
              <Input
                id="expense-amount"
                type="number"
                step="0.01"
                value={newExpense.amount || ""}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    amount: Number.parseFloat(e.target.value),
                  })
                }
                placeholder="0.00"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expense-description">Descripción</Label>
              <Input
                id="expense-description"
                value={newExpense.description || ""}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
                placeholder="Descripción del gasto"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expense-payment-method">Método de Pago</Label>
              <Select
                value={newExpense.paymentMethod}
                onValueChange={(value) =>
                  setNewExpense({ ...newExpense, paymentMethod: value })
                }
              >
                <SelectTrigger id="expense-payment-method">
                  <SelectValue placeholder="Selecciona un método de pago" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewExpenseDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddExpense}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Registrar Gasto
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Editar Gasto Dialog */}
      <Dialog
        open={isEditExpenseDialogOpen}
        onOpenChange={setIsEditExpenseDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Gasto</DialogTitle>
            <DialogDescription>
              Modifica los detalles del gasto.
            </DialogDescription>
          </DialogHeader>
          {editExpense && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-expense-date">Fecha</Label>
                <Input
                  id="edit-expense-date"
                  type="date"
                  value={editExpense.date}
                  onChange={(e) =>
                    setEditExpense({ ...editExpense, date: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-expense-category">Categoría</Label>
                <Select
                  value={editExpense.category}
                  onValueChange={(value) =>
                    setEditExpense({ ...editExpense, category: value })
                  }
                >
                  <SelectTrigger id="edit-expense-category">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-expense-amount">Monto ($)</Label>
                <Input
                  id="edit-expense-amount"
                  type="number"
                  step="0.01"
                  value={editExpense.amount}
                  onChange={(e) =>
                    setEditExpense({
                      ...editExpense,
                      amount: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-expense-description">Descripción</Label>
                <Input
                  id="edit-expense-description"
                  value={editExpense.description}
                  onChange={(e) =>
                    setEditExpense({
                      ...editExpense,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-expense-payment-method">
                  Método de Pago
                </Label>
                <Select
                  value={editExpense.paymentMethod}
                  onValueChange={(value) =>
                    setEditExpense({ ...editExpense, paymentMethod: value })
                  }
                >
                  <SelectTrigger id="edit-expense-payment-method">
                    <SelectValue placeholder="Selecciona un método de pago" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>
                        {method}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditExpenseDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEditExpense}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteItem?.type === "transaction" &&
                "Esta acción eliminará la transacción y no se puede deshacer."}
              {deleteItem?.type === "invoice" &&
                "Esta acción eliminará la factura y no se puede deshacer."}
              {deleteItem?.type === "expense" &&
                "Esta acción eliminará el gasto y no se puede deshacer."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Hidden download link for PDF */}
      <a ref={downloadLinkRef} style={{ display: "none" }} />
    </div>
  );
}
