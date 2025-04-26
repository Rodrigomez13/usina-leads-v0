"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  CalendarIcon,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  CalendarPlus2Icon as CalendarIcon2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { format, differenceInDays } from "date-fns";

// Tipos para nuestros datos
interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  restDay: string;
  active: boolean;
  startDate: string;
  vacationDays: number;
  usedVacationDays: number;
}

interface VacationRequest {
  id: string;
  staffId: string;
  staffName: string;
  startDate: string;
  endDate: string;
  days: number;
  status: "pending" | "approved" | "rejected";
  notes: string;
  createdAt: string;
}

// Datos iniciales simplificados
const initialStaff: StaffMember[] = [
  {
    id: "1",
    name: "Emanuel Scarsi",
    role: "Encargado de Turno",
    shift: "Noche",
    restDay: "Domingo",
    active: true,
    startDate: "2024-01-15",
    vacationDays: 14,
    usedVacationDays: 5,
  },
  {
    id: "2",
    name: "Lisandro Velazquez",
    role: "Operario",
    shift: "Noche",
    restDay: "Sábado",
    active: true,
    startDate: "2024-02-01",
    vacationDays: 14,
    usedVacationDays: 0,
  },
];

// Datos iniciales de solicitudes de vacaciones
const initialVacationRequests: VacationRequest[] = [
  {
    id: "1",
    staffId: "1",
    staffName: "Emanuel Scarsi",
    startDate: "2025-05-10",
    endDate: "2025-05-15",
    days: 5,
    status: "approved",
    notes: "Vacaciones anuales",
    createdAt: "2025-04-15",
  },
  {
    id: "2",
    staffId: "2",
    staffName: "Lisandro Velazquez",
    startDate: "2025-06-01",
    endDate: "2025-06-07",
    days: 7,
    status: "pending",
    notes: "Solicitud de vacaciones",
    createdAt: "2025-04-20",
  },
];

export default function VacationControlPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("requests");
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>(
    initialVacationRequests
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Estados para diálogos
  const [isNewRequestDialogOpen, setIsNewRequestDialogOpen] = useState(false);
  const [isEditRequestDialogOpen, setIsEditRequestDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Estados para formularios
  const [newRequest, setNewRequest] = useState<Partial<VacationRequest>>({
    status: "pending",
    notes: "",
  });
  const [editRequest, setEditRequest] = useState<VacationRequest | null>(null);
  const [deleteRequestId, setDeleteRequestId] = useState<string | null>(null);

  // Estado para el rango de fechas de vacaciones
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // Filtrar solicitudes de vacaciones
  const filteredRequests = vacationRequests.filter((request) => {
    // Filtrar por búsqueda
    if (
      searchQuery &&
      !request.staffName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !request.notes.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filtrar por estado
    if (statusFilter !== "all" && request.status !== statusFilter) {
      return false;
    }

    return true;
  });

  // Función para abrir el diálogo de nueva solicitud
  const openNewRequestDialog = () => {
    setNewRequest({
      status: "pending",
      notes: "",
    });
    setDateRange({
      from: undefined,
      to: undefined,
    });
    setIsNewRequestDialogOpen(true);
  };

  // Función para abrir el diálogo de edición
  const openEditRequestDialog = (request: VacationRequest) => {
    setEditRequest(request);
    setDateRange({
      from: new Date(request.startDate),
      to: new Date(request.endDate),
    });
    setIsEditRequestDialogOpen(true);
  };

  // Función para abrir el diálogo de eliminación
  const openDeleteDialog = (id: string) => {
    setDeleteRequestId(id);
    setIsDeleteDialogOpen(true);
  };

  // Función para agregar una nueva solicitud
  const handleAddRequest = () => {
    if (!newRequest.staffId || !dateRange.from || !dateRange.to) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const staffMember = staff.find((s) => s.id === newRequest.staffId);
    if (!staffMember) {
      toast({
        title: "Error",
        description: "Empleado no encontrado.",
        variant: "destructive",
      });
      return;
    }

    const days = differenceInDays(dateRange.to!, dateRange.from!) + 1;

    // Verificar si hay suficientes días de vacaciones disponibles
    const availableDays =
      staffMember.vacationDays - staffMember.usedVacationDays;
    if (days > availableDays) {
      toast({
        title: "Error",
        description: `El empleado solo tiene ${availableDays} días de vacaciones disponibles.`,
        variant: "destructive",
      });
      return;
    }

    const id = (
      Math.max(...vacationRequests.map((r) => Number.parseInt(r.id)), 0) + 1
    ).toString();

    const request: VacationRequest = {
      id,
      staffId: newRequest.staffId,
      staffName: staffMember.name,
      startDate: format(dateRange.from, "yyyy-MM-dd"),
      endDate: format(dateRange.to, "yyyy-MM-dd"),
      days,
      status: "pending",
      notes: newRequest.notes || "",
      createdAt: format(new Date(), "yyyy-MM-dd"),
    };

    setVacationRequests([...vacationRequests, request]);
    setIsNewRequestDialogOpen(false);

    toast({
      title: "Solicitud creada",
      description: "La solicitud de vacaciones ha sido creada exitosamente.",
    });
  };

  // Función para editar una solicitud
  const handleEditRequest = () => {
    if (!editRequest || !dateRange.from || !dateRange.to) {
      return;
    }

    const days = differenceInDays(dateRange.to, dateRange.from) + 1;

    const updatedRequest = {
      ...editRequest,
      startDate: format(dateRange.from, "yyyy-MM-dd"),
      endDate: format(dateRange.to, "yyyy-MM-dd"),
      days,
      notes: editRequest.notes,
    };

    const updatedRequests = vacationRequests.map((request) =>
      request.id === updatedRequest.id ? updatedRequest : request
    );

    setVacationRequests(updatedRequests);
    setIsEditRequestDialogOpen(false);
    setEditRequest(null);

    toast({
      title: "Solicitud actualizada",
      description:
        "La solicitud de vacaciones ha sido actualizada exitosamente.",
    });
  };

  // Función para eliminar una solicitud
  const handleDeleteRequest = () => {
    if (!deleteRequestId) return;

    setVacationRequests(
      vacationRequests.filter((request) => request.id !== deleteRequestId)
    );
    setIsDeleteDialogOpen(false);
    setDeleteRequestId(null);

    toast({
      title: "Solicitud eliminada",
      description: "La solicitud de vacaciones ha sido eliminada exitosamente.",
    });
  };

  // Función para aprobar una solicitud
  const handleApproveRequest = (id: string) => {
    const request = vacationRequests.find((r) => r.id === id);
    if (!request) return;

    // Actualizar el estado de la solicitud
    const updatedRequests = vacationRequests.map((r) =>
      r.id === id ? { ...r, status: "approved" as const } : r
    );

    // Actualizar los días de vacaciones utilizados por el empleado
    const updatedStaff = staff.map((s) =>
      s.id === request.staffId
        ? { ...s, usedVacationDays: s.usedVacationDays + request.days }
        : s
    );

    setVacationRequests(updatedRequests);
    setStaff(updatedStaff);

    toast({
      title: "Solicitud aprobada",
      description: `La solicitud de vacaciones de ${request.staffName} ha sido aprobada.`,
    });
  };

  // Función para rechazar una solicitud
  const handleRejectRequest = (id: string) => {
    const updatedRequests = vacationRequests.map((r) =>
      r.id === id ? { ...r, status: "rejected" as const } : r
    );

    setVacationRequests(updatedRequests);

    const request = vacationRequests.find((r) => r.id === id);
    if (request) {
      toast({
        title: "Solicitud rechazada",
        description: `La solicitud de vacaciones de ${request.staffName} ha sido rechazada.`,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Control de Vacaciones
        </h1>
        <p className="text-muted-foreground">
          Gestiona las solicitudes de vacaciones del personal.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Buscar solicitudes..."
            className="w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
              <SelectItem value="approved">Aprobadas</SelectItem>
              <SelectItem value="rejected">Rechazadas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="bg-[#148f77] hover:bg-[#0e6251]"
          onClick={openNewRequestDialog}
        >
          <Plus className="mr-2 h-4 w-4" />
          Nueva Solicitud
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="requests">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Solicitudes
          </TabsTrigger>
          <TabsTrigger value="calendar">
            <CalendarIcon2 className="mr-2 h-4 w-4" />
            Calendario
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes de Vacaciones</CardTitle>
              <CardDescription>
                Gestiona las solicitudes de vacaciones del personal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Fecha Inicio</TableHead>
                    <TableHead>Fecha Fin</TableHead>
                    <TableHead>Días</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Notas</TableHead>
                    <TableHead>Fecha Solicitud</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No se encontraron solicitudes de vacaciones.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.staffName}
                        </TableCell>
                        <TableCell>
                          {format(new Date(request.startDate), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                          {format(new Date(request.endDate), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>{request.days}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              request.status === "approved"
                                ? "bg-green-500 hover:bg-green-600"
                                : request.status === "rejected"
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-yellow-500 hover:bg-yellow-600"
                            }
                          >
                            {request.status === "approved"
                              ? "Aprobada"
                              : request.status === "rejected"
                              ? "Rechazada"
                              : "Pendiente"}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.notes}</TableCell>
                        <TableCell>
                          {format(new Date(request.createdAt), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {request.status === "pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-green-500 hover:text-green-600"
                                  onClick={() =>
                                    handleApproveRequest(request.id)
                                  }
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600"
                                  onClick={() =>
                                    handleRejectRequest(request.id)
                                  }
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditRequestDialog(request)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openDeleteDialog(request.id)}
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

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendario de Vacaciones</CardTitle>
              <CardDescription>
                Vista de calendario de las vacaciones programadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <CalendarIcon2 className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">
                  Calendario de Vacaciones
                </h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  Aquí se mostrará un calendario con las vacaciones programadas.
                </p>
                <p className="text-xs text-muted-foreground">
                  Funcionalidad en desarrollo.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Días de Vacaciones por Empleado</CardTitle>
              <CardDescription>
                Resumen de días de vacaciones disponibles y utilizados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Fecha de Ingreso</TableHead>
                    <TableHead>Días Disponibles</TableHead>
                    <TableHead>Días Utilizados</TableHead>
                    <TableHead>Días Restantes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">
                        {person.name}
                      </TableCell>
                      <TableCell>
                        {format(new Date(person.startDate), "dd/MM/yyyy")}
                      </TableCell>
                      <TableCell>{person.vacationDays}</TableCell>
                      <TableCell>{person.usedVacationDays}</TableCell>
                      <TableCell>
                        {person.vacationDays - person.usedVacationDays}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo para nueva solicitud */}
      <Dialog
        open={isNewRequestDialogOpen}
        onOpenChange={setIsNewRequestDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Solicitud de Vacaciones</DialogTitle>
            <DialogDescription>
              Completa los detalles para la solicitud de vacaciones.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="staff-select">Empleado</Label>
              <Select
                value={newRequest.staffId}
                onValueChange={(value) =>
                  setNewRequest({ ...newRequest, staffId: value })
                }
              >
                <SelectTrigger id="staff-select">
                  <SelectValue placeholder="Seleccionar empleado" />
                </SelectTrigger>
                <SelectContent>
                  {staff
                    .filter((s) => s.active)
                    .map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name} -{" "}
                        {person.vacationDays - person.usedVacationDays} días
                        disponibles
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Rango de fechas</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from && dateRange.to
                      ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                          dateRange.to,
                          "dd/MM/yyyy"
                        )}`
                      : "Seleccionar fechas"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) =>
                      setDateRange({
                        from: range?.from,
                        to: range?.to ?? undefined,
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {dateRange.from && dateRange.to && (
                <p className="text-sm text-muted-foreground">
                  {differenceInDays(dateRange.to, dateRange.from) + 1} días
                  seleccionados
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Input
                id="notes"
                value={newRequest.notes || ""}
                onChange={(e) =>
                  setNewRequest({ ...newRequest, notes: e.target.value })
                }
                placeholder="Detalles adicionales sobre la solicitud"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewRequestDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleAddRequest}
            >
              Crear Solicitud
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar solicitud */}
      <Dialog
        open={isEditRequestDialogOpen}
        onOpenChange={setIsEditRequestDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Solicitud de Vacaciones</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la solicitud de vacaciones.
            </DialogDescription>
          </DialogHeader>
          {editRequest && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-staff">Empleado</Label>
                <Input id="edit-staff" value={editRequest.staffName} disabled />
              </div>
              <div className="space-y-2">
                <Label>Rango de fechas</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from && dateRange.to
                        ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                            dateRange.to,
                            "dd/MM/yyyy"
                          )}`
                        : "Seleccionar fechas"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range) =>
                        setDateRange({
                          from: range?.from,
                          to: range?.to ?? undefined,
                        })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {dateRange.from && dateRange.to && (
                  <p className="text-sm text-muted-foreground">
                    {differenceInDays(dateRange.to, dateRange.from) + 1} días
                    seleccionados
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select
                  value={editRequest.status}
                  onValueChange={(value) =>
                    setEditRequest({
                      ...editRequest,
                      status: value as "pending" | "approved" | "rejected",
                    })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="approved">Aprobada</SelectItem>
                    <SelectItem value="rejected">Rechazada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notas</Label>
                <Input
                  id="edit-notes"
                  value={editRequest.notes}
                  onChange={(e) =>
                    setEditRequest({ ...editRequest, notes: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditRequestDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleEditRequest}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la solicitud de vacaciones permanentemente y
              no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRequest}
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
