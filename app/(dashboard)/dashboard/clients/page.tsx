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
import { Search, Plus, ArrowUpRight } from "lucide-react";
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

// Datos iniciales
const initialAgencies: Agency[] = [
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
];

export default function AgenciesPage() {
  // Estados para los datos
  const [agencies, setAgencies] = useState<Agency[]>(initialAgencies);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("leads");

  // Estados para el modal de nueva agencia
  const [showNewAgencyDialog, setShowNewAgencyDialog] = useState(false);
  const [newAgency, setNewAgency] = useState<Partial<Agency>>({
    name: "",
    phones: 0,
    balance: 0,
    status: "active",
    dailyGoal: 50,
  });

  // Estado para el diálogo de confirmación de eliminación
  const [agencyToDelete, setAgencyToDelete] = useState<string | null>(null);

  // Filtrar agencias según la búsqueda
  const filteredAgencies = agencies.filter((agency) =>
    agency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para agregar una nueva agencia
  const handleAddAgency = () => {
    if (!newAgency.name) {
      toast({
        title: "Error",
        description: "El nombre de la agencia es obligatorio",
        variant: "destructive",
      });
      return;
    }

    const id = (
      Math.max(...agencies.map((a) => Number(a.id)), 0) + 1
    ).toString();
    const agencyWithId: Agency = {
      id,
      name: newAgency.name,
      phones: newAgency.phones || 0,
      balance: newAgency.balance || 0,
      status: newAgency.status || "active",
      dailyGoal: newAgency.dailyGoal || 50,
      currentMonth: {
        leads: 0,
        conversions: 0,
        expense: 0,
      },
    };

    setAgencies([...agencies, agencyWithId]);
    setShowNewAgencyDialog(false);
    setNewAgency({
      name: "",
      phones: 0,
      balance: 0,
      status: "active",
      dailyGoal: 50,
    });

    toast({
      title: "Agencia creada",
      description: `La agencia ${agencyWithId.name} ha sido creada correctamente.`,
    });
  };

  // Función para eliminar una agencia
  const handleDeleteAgency = (id: string) => {
    setAgencyToDelete(id);
  };

  const confirmDeleteAgency = () => {
    if (agencyToDelete) {
      const agencyName = agencies.find((a) => a.id === agencyToDelete)?.name;
      setAgencies(agencies.filter((agency) => agency.id !== agencyToDelete));
      setAgencyToDelete(null);

      toast({
        title: "Agencia eliminada",
        description: `La agencia ${agencyName} ha sido eliminada correctamente.`,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Agencias</h1>
        <p className="text-muted-foreground">
          Gestiona las agencias y franquicias.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar agencias..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          className="ml-4 bg-[#148f77] hover:bg-[#0e6251]"
          onClick={() => setShowNewAgencyDialog(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Agencia
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agencias y Franquicias</CardTitle>
          <CardDescription>
            Lista de todas las agencias y sus métricas actuales.
          </CardDescription>
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
              {filteredAgencies.length > 0 ? (
                filteredAgencies.map((agency) => (
                  <TableRow key={agency.id}>
                    <TableCell className="font-medium">{agency.name}</TableCell>
                    <TableCell>{agency.phones}</TableCell>
                    <TableCell
                      className={
                        agency.balance < 10000
                          ? "text-yellow-500"
                          : "text-green-500"
                      }
                    >
                      ${agency.balance.toFixed(2)}
                    </TableCell>
                    <TableCell>{agency.dailyGoal}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          agency.status === "active" ? "default" : "outline"
                        }
                        className={
                          agency.status === "active"
                            ? "bg-green-500 hover:bg-green-600"
                            : "text-yellow-500 border-yellow-500"
                        }
                      >
                        {agency.status === "active" ? "Activo" : "Advertencia"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/clients/${agency.id}`}>
                          <Button variant="outline" size="sm">
                            <ArrowUpRight className="mr-2 h-4 w-4" />
                            Detalles
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 border-red-500 hover:bg-[#C8534F]"
                          onClick={() => handleDeleteAgency(agency.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron agencias.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumen Mensual</CardTitle>
          <CardDescription>Métricas del mes actual por agencia</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="leads">Leads</TabsTrigger>
              <TabsTrigger value="conversions">Conversiones</TabsTrigger>
              <TabsTrigger value="expense">Gasto</TabsTrigger>
            </TabsList>
            <TabsContent value="leads" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {agencies.map((agency) => (
                  <Card key={agency.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{agency.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {agency.currentMonth.leads}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Leads generados este mes
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="conversions" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {agencies.map((agency) => (
                  <Card key={agency.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{agency.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        {agency.currentMonth.conversions}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Conversiones este mes
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="expense" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {agencies.map((agency) => (
                  <Card key={agency.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{agency.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">
                        ${agency.currentMonth.expense.toFixed(2)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Gasto total este mes
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Modal para agregar nueva agencia */}
      <Dialog open={showNewAgencyDialog} onOpenChange={setShowNewAgencyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Nueva Agencia</DialogTitle>
            <DialogDescription>
              Completa los detalles para crear una nueva agencia.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="agency-name">Nombre de la Agencia</Label>
              <Input
                id="agency-name"
                value={newAgency.name || ""}
                onChange={(e) =>
                  setNewAgency({ ...newAgency, name: e.target.value })
                }
                placeholder="Nombre de la agencia"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phones">Número de Teléfonos</Label>
                <Input
                  id="phones"
                  type="number"
                  value={newAgency.phones || 0}
                  onChange={(e) =>
                    setNewAgency({
                      ...newAgency,
                      phones: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="daily-goal">Objetivo Diario</Label>
                <Input
                  id="daily-goal"
                  type="number"
                  value={newAgency.dailyGoal || 50}
                  onChange={(e) =>
                    setNewAgency({
                      ...newAgency,
                      dailyGoal: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="balance">Saldo Inicial ($)</Label>
              <Input
                id="balance"
                type="number"
                value={newAgency.balance || 0}
                onChange={(e) =>
                  setNewAgency({
                    ...newAgency,
                    balance: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={newAgency.status === "active"}
                onCheckedChange={(checked) =>
                  setNewAgency({
                    ...newAgency,
                    status: checked ? "active" : "warning",
                  })
                }
              />
              <Label htmlFor="active">Activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewAgencyDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleAddAgency}
              disabled={!newAgency.name}
            >
              Crear Agencia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar agencia */}
      <AlertDialog
        open={!!agencyToDelete}
        onOpenChange={() => setAgencyToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la agencia permanentemente y no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteAgency}
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
