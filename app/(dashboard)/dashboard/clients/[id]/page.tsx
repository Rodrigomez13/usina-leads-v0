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
  ArrowLeft,
  Edit,
  Plus,
  Trash2,
  Wallet,
  Phone,
  BarChart3,
  History,
} from "lucide-react";
import Link from "next/link";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
interface Agency {
  id: string;
  name: string;
  phones: number;
  balance: number;
  status: "active" | "warning" | "inactive";
  dailyGoal: number;
  currentMonth: {
    leads: number;
    conversions: number;
    expense: number;
  };
}

interface PhoneData {
  id: string;
  number: string;
  dailyGoal: number;
  active: boolean;
}

interface Transaction {
  id: string;
  date: string;
  type: "deposit" | "expense";
  amount: number;
  description: string;
}

// Datos iniciales
const initialAgency: Agency = {
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
};

// Datos iniciales de teléfonos
const initialPhones: PhoneData[] = [
  { id: "1", number: "+54 9 11 1234-5678", dailyGoal: 5, active: true },
  { id: "2", number: "+54 9 11 2345-6789", dailyGoal: 4, active: true },
  { id: "3", number: "+54 9 11 3456-7890", dailyGoal: 5, active: true },
  { id: "4", number: "+54 9 11 4567-8901", dailyGoal: 4, active: true },
  { id: "5", number: "+54 9 11 5678-9012", dailyGoal: 3, active: false },
];

// Datos iniciales de transacciones
const initialTransactions: Transaction[] = [
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
];

export default function AgencyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Estados para los datos
  const [agency, setAgency] = useState<Agency>(initialAgency);
  const [phones, setPhones] = useState<PhoneData[]>(initialPhones);
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [activeTab, setActiveTab] = useState("overview");

  // Estados para edición
  const [showEditAgency, setShowEditAgency] = useState(false);
  const [editingAgency, setEditingAgency] = useState<Agency>({
    ...initialAgency,
  });

  // Estados para teléfonos
  const [showAddPhone, setShowAddPhone] = useState(false);
  const [showEditPhone, setShowEditPhone] = useState(false);
  const [newPhone, setNewPhone] = useState<Partial<PhoneData>>({
    number: "",
    dailyGoal: 5,
    active: true,
  });
  const [editingPhone, setEditingPhone] = useState<PhoneData | null>(null);
  const [phoneToDelete, setPhoneToDelete] = useState<string | null>(null);

  // Estados para pagos
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [newPayment, setNewPayment] = useState<Partial<Transaction>>({
    type: "deposit",
    amount: 0,
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Funciones para manejar la agencia
  const handleEditAgency = () => {
    setEditingAgency({ ...agency });
    setShowEditAgency(true);
  };

  const handleSaveAgencyEdit = () => {
    setAgency(editingAgency);
    setShowEditAgency(false);

    toast({
      title: "Agencia actualizada",
      description: `Los cambios en ${editingAgency.name} han sido guardados.`,
    });
  };

  // Funciones para manejar teléfonos
  const handleAddPhone = () => {
    if (!newPhone.number) {
      toast({
        title: "Error",
        description: "El número de teléfono es obligatorio",
        variant: "destructive",
      });
      return;
    }

    const id = (Math.max(...phones.map((p) => Number(p.id)), 0) + 1).toString();
    const phoneWithId: PhoneData = {
      id,
      number: newPhone.number,
      dailyGoal: newPhone.dailyGoal || 5,
      active: newPhone.active || true,
    };

    setPhones([...phones, phoneWithId]);
    setAgency({
      ...agency,
      phones: agency.phones + 1,
    });
    setShowAddPhone(false);
    setNewPhone({
      number: "",
      dailyGoal: 5,
      active: true,
    });

    toast({
      title: "Teléfono añadido",
      description: `El teléfono ${phoneWithId.number} ha sido añadido correctamente.`,
    });
  };

  const handleEditPhone = (phone: PhoneData) => {
    setEditingPhone({ ...phone });
    setShowEditPhone(true);
  };

  const handleSavePhoneEdit = () => {
    if (editingPhone) {
      setPhones(
        phones.map((phone) =>
          phone.id === editingPhone.id ? editingPhone : phone
        )
      );
      setShowEditPhone(false);

      toast({
        title: "Teléfono actualizado",
        description: `Los cambios en el teléfono ${editingPhone.number} han sido guardados.`,
      });
    }
  };

  const handleTogglePhone = (phoneId: string) => {
    setPhones(
      phones.map((phone) =>
        phone.id === phoneId ? { ...phone, active: !phone.active } : phone
      )
    );

    toast({
      title: "Estado actualizado",
      description: `El teléfono ha sido ${
        phones.find((p) => p.id === phoneId)?.active
          ? "desactivado"
          : "activado"
      }.`,
    });
  };

  const handleDeletePhone = (phoneId: string) => {
    setPhoneToDelete(phoneId);
  };

  const confirmDeletePhone = () => {
    if (phoneToDelete) {
      const phoneNumber = phones.find((p) => p.id === phoneToDelete)?.number;
      setPhones(phones.filter((phone) => phone.id !== phoneToDelete));
      setAgency({
        ...agency,
        phones: agency.phones - 1,
      });
      setPhoneToDelete(null);

      toast({
        title: "Teléfono eliminado",
        description: `El teléfono ${phoneNumber} ha sido eliminado correctamente.`,
      });
    }
  };

  // Funciones para manejar pagos
  const handleAddPayment = () => {
    if (!newPayment.amount || newPayment.amount <= 0) {
      toast({
        title: "Error",
        description: "El monto debe ser mayor que cero",
        variant: "destructive",
      });
      return;
    }

    if (!newPayment.description) {
      toast({
        title: "Error",
        description: "La descripción es obligatoria",
        variant: "destructive",
      });
      return;
    }

    const id = (
      Math.max(...transactions.map((t) => Number(t.id)), 0) + 1
    ).toString();
    const paymentWithId: Transaction = {
      id,
      date: newPayment.date || new Date().toISOString().split("T")[0],
      type: newPayment.type || "deposit",
      amount: newPayment.amount,
      description: newPayment.description,
    };

    setTransactions([paymentWithId, ...transactions]);

    // Actualizar el saldo de la agencia
    const newBalance =
      paymentWithId.type === "deposit"
        ? agency.balance + paymentWithId.amount
        : agency.balance - paymentWithId.amount;

    setAgency({
      ...agency,
      balance: newBalance,
    });

    setShowAddPayment(false);
    setNewPayment({
      type: "deposit",
      amount: 0,
      description: "",
      date: new Date().toISOString().split("T")[0],
    });

    toast({
      title: "Pago registrado",
      description: `Se ha registrado un ${
        paymentWithId.type === "deposit" ? "ingreso" : "gasto"
      } de $${paymentWithId.amount.toFixed(2)}.`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/clients">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{agency.name}</h1>
          <p className="text-muted-foreground">
            ID: {params.id} • {agency.phones} teléfonos
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" onClick={handleEditAgency}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
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
                <CardTitle className="text-sm font-medium">
                  Saldo Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${
                    agency.balance < 10000
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  ${agency.balance.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Último pago: 22 de abril, 2023
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Leads Mensuales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {agency.currentMonth.leads}
                </div>
                <p className="text-xs text-muted-foreground">
                  +12.5% respecto al mes anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversiones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {agency.currentMonth.conversions}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tasa de conversión: 25%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Gasto Mensual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${agency.currentMonth.expense.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Promedio diario: $119.35
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Conversiones</CardTitle>
              <CardDescription>
                Distribución de conversiones por servidor
              </CardDescription>
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
                        <TableCell className="font-medium">
                          {phone.number}
                        </TableCell>
                        <TableCell>{phone.dailyGoal}</TableCell>
                        <TableCell>
                          <Badge
                            variant={phone.active ? "default" : "outline"}
                            className={
                              phone.active
                                ? "bg-green-500 hover:bg-green-600"
                                : "text-yellow-500 border-yellow-500"
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
                <CardDescription>
                  Movimientos financieros recientes
                </CardDescription>
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
                        <TableCell className="font-medium">
                          {transaction.date}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              transaction.type === "deposit"
                                ? "text-green-500 border-green-500"
                                : "text-red-500 border-red-500"
                            }
                          >
                            {transaction.type === "deposit"
                              ? "Ingreso"
                              : "Gasto"}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={
                            transaction.type === "deposit"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {transaction.type === "deposit" ? "+" : "-"}$
                          {transaction.amount.toFixed(2)}
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
                <CardDescription>
                  Gestiona los teléfonos de {agency.name}
                </CardDescription>
              </div>
              <Button
                className="bg-[#148f77] hover:bg-[#0e6251]"
                onClick={() => setShowAddPhone(true)}
              >
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
                  {phones.length > 0 ? (
                    phones.map((phone) => (
                      <TableRow key={phone.id}>
                        <TableCell className="font-medium">
                          {phone.number}
                        </TableCell>
                        <TableCell>{phone.dailyGoal}</TableCell>
                        <TableCell>
                          <Switch
                            checked={phone.active}
                            onCheckedChange={() => handleTogglePhone(phone.id)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditPhone(phone)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDeletePhone(phone.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No hay teléfonos registrados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finances" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Saldo Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`text-2xl font-bold ${
                    agency.balance < 10000
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  ${agency.balance.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Gasto Mensual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${agency.currentMonth.expense.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Último Pago
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,000.00</div>
                <p className="text-xs text-muted-foreground">
                  22 de abril, 2023
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Proyección
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5 días</div>
                <p className="text-xs text-muted-foreground">
                  Hasta próximo pago recomendado
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Transacciones</CardTitle>
                <CardDescription>
                  Historial de movimientos financieros
                </CardDescription>
              </div>
              <Button
                className="bg-[#148f77] hover:bg-[#0e6251]"
                onClick={() => setShowAddPayment(true)}
              >
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
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.date}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              transaction.type === "deposit"
                                ? "text-green-500 border-green-500"
                                : "text-red-500 border-red-500"
                            }
                          >
                            {transaction.type === "deposit"
                              ? "Ingreso"
                              : "Gasto"}
                          </Badge>
                        </TableCell>
                        <TableCell
                          className={
                            transaction.type === "deposit"
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {transaction.type === "deposit" ? "+" : "-"}$
                          {transaction.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No hay transacciones registradas.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Actividad</CardTitle>
              <CardDescription>
                Registro histórico de actividades para {agency.name}
              </CardDescription>
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
                        <p className="text-sm font-medium">
                          Pago recibido: $5,000.00
                        </p>
                        <p className="text-xs text-muted-foreground">
                          22 de abril, 2023 - 14:35
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-muted p-2">
                        <BarChart3 className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          Objetivo diario actualizado: 80 conversiones
                        </p>
                        <p className="text-xs text-muted-foreground">
                          20 de abril, 2023 - 10:15
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-muted p-2">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          Teléfono agregado: +54 9 11 1234-5678
                        </p>
                        <p className="text-xs text-muted-foreground">
                          18 de abril, 2023 - 09:22
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-[#148f77] p-2">
                        <Wallet className="h-4 w-4 text-white" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          Pago recibido: $4,500.00
                        </p>
                        <p className="text-xs text-muted-foreground">
                          15 de abril, 2023 - 16:40
                        </p>
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
                        <p className="text-sm font-medium">
                          Pago recibido: $6,000.00
                        </p>
                        <p className="text-xs text-muted-foreground">
                          30 de marzo, 2023 - 11:20
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-muted p-2">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          Teléfono desactivado: +54 9 11 5678-9012
                        </p>
                        <p className="text-xs text-muted-foreground">
                          25 de marzo, 2023 - 15:45
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal para editar agencia */}
      <Dialog open={showEditAgency} onOpenChange={setShowEditAgency}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Agencia</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la agencia.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-agency-name">Nombre de la Agencia</Label>
              <Input
                id="edit-agency-name"
                value={editingAgency.name}
                onChange={(e) =>
                  setEditingAgency({ ...editingAgency, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-daily-goal">Objetivo Diario</Label>
              <Input
                id="edit-daily-goal"
                type="number"
                value={editingAgency.dailyGoal}
                onChange={(e) =>
                  setEditingAgency({
                    ...editingAgency,
                    dailyGoal: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-active"
                checked={editingAgency.status === "active"}
                onCheckedChange={(checked) =>
                  setEditingAgency({
                    ...editingAgency,
                    status: checked ? "active" : "warning",
                  })
                }
              />
              <Label htmlFor="edit-active">Activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditAgency(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleSaveAgencyEdit}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para agregar teléfono */}
      <Dialog open={showAddPhone} onOpenChange={setShowAddPhone}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Teléfono</DialogTitle>
            <DialogDescription>
              Ingresa los detalles del nuevo teléfono.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone-number">Número de Teléfono</Label>
              <Input
                id="phone-number"
                value={newPhone.number || ""}
                onChange={(e) =>
                  setNewPhone({ ...newPhone, number: e.target.value })
                }
                placeholder="+54 9 11 XXXX-XXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone-goal">Objetivo Diario</Label>
              <Input
                id="phone-goal"
                type="number"
                value={newPhone.dailyGoal || 5}
                onChange={(e) =>
                  setNewPhone({
                    ...newPhone,
                    dailyGoal: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="phone-active"
                checked={newPhone.active || true}
                onCheckedChange={(checked) =>
                  setNewPhone({ ...newPhone, active: checked })
                }
              />
              <Label htmlFor="phone-active">Activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPhone(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleAddPhone}
              disabled={!newPhone.number}
            >
              Agregar Teléfono
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para editar teléfono */}
      <Dialog open={showEditPhone} onOpenChange={setShowEditPhone}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Teléfono</DialogTitle>
            <DialogDescription>
              Modifica los detalles del teléfono.
            </DialogDescription>
          </DialogHeader>
          {editingPhone && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-phone-number">Número de Teléfono</Label>
                <Input
                  id="edit-phone-number"
                  value={editingPhone.number}
                  onChange={(e) =>
                    setEditingPhone({ ...editingPhone, number: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone-goal">Objetivo Diario</Label>
                <Input
                  id="edit-phone-goal"
                  type="number"
                  value={editingPhone.dailyGoal}
                  onChange={(e) =>
                    setEditingPhone({
                      ...editingPhone,
                      dailyGoal: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-phone-active"
                  checked={editingPhone.active}
                  onCheckedChange={(checked) =>
                    setEditingPhone({ ...editingPhone, active: checked })
                  }
                />
                <Label htmlFor="edit-phone-active">Activo</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditPhone(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleSavePhoneEdit}
              disabled={!editingPhone?.number}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para registrar pago */}
      <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Pago</DialogTitle>
            <DialogDescription>
              Ingresa los detalles del pago.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="payment-type">Tipo de Transacción</Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="deposit"
                    name="payment-type"
                    value="deposit"
                    checked={newPayment.type === "deposit"}
                    onChange={() =>
                      setNewPayment({ ...newPayment, type: "deposit" })
                    }
                  />
                  <Label htmlFor="deposit">Ingreso</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="expense"
                    name="payment-type"
                    value="expense"
                    checked={newPayment.type === "expense"}
                    onChange={() =>
                      setNewPayment({ ...newPayment, type: "expense" })
                    }
                  />
                  <Label htmlFor="expense">Gasto</Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-amount">Monto ($)</Label>
              <Input
                id="payment-amount"
                type="number"
                value={newPayment.amount || ""}
                onChange={(e) =>
                  setNewPayment({
                    ...newPayment,
                    amount: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-date">Fecha</Label>
              <Input
                id="payment-date"
                type="date"
                value={
                  newPayment.date || new Date().toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setNewPayment({ ...newPayment, date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-description">Descripción</Label>
              <Input
                id="payment-description"
                value={newPayment.description || ""}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, description: e.target.value })
                }
                placeholder="Ej: Pago adelantado publicidad"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddPayment(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleAddPayment}
              disabled={!newPayment.amount || !newPayment.description}
            >
              Registrar Pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar teléfono */}
      <AlertDialog
        open={!!phoneToDelete}
        onOpenChange={() => setPhoneToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el teléfono permanentemente y no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeletePhone}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
