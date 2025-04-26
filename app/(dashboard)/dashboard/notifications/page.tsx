"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Bell,
  Send,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  Search,
  Plus,
  Trash2,
  Copy,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { format } from "date-fns";

// Tipos para nuestros datos
interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  email: string;
  active: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  recipients: string[];
  recipientNames: string[];
  sentAt: string;
  read: boolean[];
}

// Datos iniciales simplificados
const initialStaff: StaffMember[] = [
  {
    id: "1",
    name: "Emanuel Scarsi",
    role: "Encargado de Turno",
    shift: "Noche",
    email: "emanuelscarsigragnolati@gmail.com",
    active: true,
  },
  {
    id: "2",
    name: "Lisandro Velazquez",
    role: "Operario",
    shift: "Noche",
    email: "martin.vlqz11@gmail.com",
    active: true,
  },
];

// Datos iniciales de notificaciones
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Cambio de horario",
    message:
      "Se ha modificado el horario del turno noche para la próxima semana.",
    type: "info",
    recipients: ["1", "2"],
    recipientNames: ["Emanuel Scarsi", "Lisandro Velazquez"],
    sentAt: "2025-04-22T10:30:00",
    read: [true, false],
  },
  {
    id: "2",
    title: "Recordatorio de pago",
    message: "Los pagos quincenales serán procesados mañana.",
    type: "success",
    recipients: ["1"],
    recipientNames: ["Emanuel Scarsi"],
    sentAt: "2025-04-23T15:45:00",
    read: [true],
  },
];

// Plantillas de notificaciones
const notificationTemplates = [
  {
    id: "template1",
    title: "Cambio de horario",
    message:
      "Se ha modificado el horario del turno [TURNO] para la próxima semana.",
    type: "info",
  },
  {
    id: "template2",
    title: "Recordatorio de pago",
    message: "Los pagos quincenales serán procesados mañana.",
    type: "success",
  },
  {
    id: "template3",
    title: "Alerta de asistencia",
    message: "Se ha registrado una ausencia sin justificación.",
    type: "warning",
  },
  {
    id: "template4",
    title: "Error en el sistema",
    message:
      "Se ha detectado un error en el sistema. Por favor contacte al administrador.",
    type: "error",
  },
];

export default function NotificationsPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("send");
  const [staff] = useState<StaffMember[]>(initialStaff);
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Estados para diálogos
  const [isNewNotificationDialogOpen, setIsNewNotificationDialogOpen] =
    useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isNewTemplateDialogOpen, setIsNewTemplateDialogOpen] = useState(false);
  const [isEditTemplateDialogOpen, setIsEditTemplateDialogOpen] =
    useState(false);
  const [isDeleteTemplateDialogOpen, setIsDeleteTemplateDialogOpen] =
    useState(false);

  // Estados para formularios
  const [newNotification, setNewNotification] = useState<{
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
    recipients: string[];
    sendEmail: boolean;
    sendPush: boolean;
  }>({
    title: "",
    message: "",
    type: "info",
    recipients: [],
    sendEmail: true,
    sendPush: true,
  });
  const [deleteNotificationId, setDeleteNotificationId] = useState<
    string | null
  >(null);
  const [previewNotification, setPreviewNotification] =
    useState<Notification | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    title: "",
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });
  const [editTemplate, setEditTemplate] = useState<{
    id: string;
    title: string;
    message: string;
    type: "info" | "success" | "warning" | "error";
  } | null>(null);
  const [deleteTemplateId, setDeleteTemplateId] = useState<string | null>(null);
  const [templates, setTemplates] = useState(notificationTemplates);

  // Filtrar notificaciones
  const filteredNotifications = notifications.filter((notification) => {
    // Filtrar por búsqueda
    if (
      searchQuery &&
      !notification.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filtrar por tipo
    if (typeFilter !== "all" && notification.type !== typeFilter) {
      return false;
    }

    return true;
  });

  // Función para abrir el diálogo de nueva notificación
  const openNewNotificationDialog = () => {
    setNewNotification({
      title: "",
      message: "",
      type: "info",
      recipients: [],
      sendEmail: true,
      sendPush: true,
    });
    setIsNewNotificationDialogOpen(true);
  };

  // Función para abrir el diálogo de eliminación
  const openDeleteDialog = (id: string) => {
    setDeleteNotificationId(id);
    setIsDeleteDialogOpen(true);
  };

  // Función para abrir el diálogo de vista previa
  const openPreviewDialog = (notification: Notification) => {
    setPreviewNotification(notification);
    setIsPreviewDialogOpen(true);
  };

  // Función para enviar una nueva notificación
  const handleSendNotification = () => {
    if (
      !newNotification.title ||
      !newNotification.message ||
      newNotification.recipients.length === 0
    ) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const id = (
      Math.max(...notifications.map((n) => Number.parseInt(n.id)), 0) + 1
    ).toString();

    const recipientNames = newNotification.recipients.map(
      (id) => staff.find((s) => s.id === id)?.name || ""
    );

    const notification: Notification = {
      id,
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type,
      recipients: newNotification.recipients,
      recipientNames,
      sentAt: new Date().toISOString(),
      read: new Array(newNotification.recipients.length).fill(false),
    };

    setNotifications([...notifications, notification]);
    setIsNewNotificationDialogOpen(false);

    toast({
      title: "Notificación enviada",
      description: `La notificación ha sido enviada a ${recipientNames.join(
        ", "
      )}.`,
    });
  };

  // Función para eliminar una notificación
  const handleDeleteNotification = () => {
    if (!deleteNotificationId) return;

    setNotifications(
      notifications.filter(
        (notification) => notification.id !== deleteNotificationId
      )
    );
    setIsDeleteDialogOpen(false);
    setDeleteNotificationId(null);

    toast({
      title: "Notificación eliminada",
      description: "La notificación ha sido eliminada exitosamente.",
    });
  };

  // Función para marcar una notificación como leída
  const handleMarkAsRead = (notificationId: string, recipientIndex: number) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === notificationId) {
        const updatedRead = [...notification.read];
        updatedRead[recipientIndex] = true;
        return { ...notification, read: updatedRead };
      }
      return notification;
    });

    setNotifications(updatedNotifications);

    toast({
      title: "Notificación marcada como leída",
      description: "La notificación ha sido marcada como leída.",
    });
  };

  // Función para usar una plantilla
  const handleUseTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setNewNotification({
        ...newNotification,
        title: template.title,
        message: template.message,
        type: template.type as "info" | "success" | "warning" | "error",
      });
    }
  };

  // Función para seleccionar todos los destinatarios
  const handleSelectAllRecipients = (checked: boolean) => {
    if (checked) {
      setNewNotification({
        ...newNotification,
        recipients: staff.filter((s) => s.active).map((s) => s.id),
      });
    } else {
      setNewNotification({
        ...newNotification,
        recipients: [],
      });
    }
  };

  // Función para obtener el ícono según el tipo de notificación
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4" />;
      case "success":
        return <CheckCircle className="h-4 w-4" />;
      case "warning":
        return <AlertCircle className="h-4 w-4" />;
      case "error":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  // Función para obtener el color de la insignia según el tipo de notificación
  const getNotificationBadgeClass = (type: string) => {
    switch (type) {
      case "info":
        return "bg-blue-500 hover:bg-blue-600";
      case "success":
        return "bg-green-500 hover:bg-green-600";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600";
      case "error":
        return "bg-red-500 hover:bg-red-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  // Función para agregar una nueva plantilla
  const handleAddTemplate = () => {
    if (!newTemplate.title || !newTemplate.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const id = `template${templates.length + 1}`;
    const template = {
      id,
      title: newTemplate.title,
      message: newTemplate.message,
      type: newTemplate.type,
    };

    setTemplates([...templates, template]);
    setIsNewTemplateDialogOpen(false);
    setNewTemplate({
      title: "",
      message: "",
      type: "info",
    });

    toast({
      title: "Plantilla creada",
      description: "La plantilla ha sido creada exitosamente.",
    });
  };

  // Función para editar una plantilla
  const handleEditTemplate = () => {
    if (!editTemplate) return;

    const updatedTemplates = templates.map((template) =>
      template.id === editTemplate.id ? editTemplate : template
    );

    setTemplates(updatedTemplates);
    setIsEditTemplateDialogOpen(false);
    setEditTemplate(null);

    toast({
      title: "Plantilla actualizada",
      description: "La plantilla ha sido actualizada exitosamente.",
    });
  };

  // Función para eliminar una plantilla
  const handleDeleteTemplate = () => {
    if (!deleteTemplateId) return;

    setTemplates(
      templates.filter((template) => template.id !== deleteTemplateId)
    );
    setIsDeleteTemplateDialogOpen(false);
    setDeleteTemplateId(null);

    toast({
      title: "Plantilla eliminada",
      description: "La plantilla ha sido eliminada exitosamente.",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Notificaciones</h1>
        <p className="text-muted-foreground">
          Envía y gestiona notificaciones para el personal.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="send">
            <Send className="mr-2 h-4 w-4" />
            Enviar
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="mr-2 h-4 w-4" />
            Historial
          </TabsTrigger>
          <TabsTrigger value="templates">
            <Calendar className="mr-2 h-4 w-4" />
            Plantillas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enviar Notificación</CardTitle>
              <CardDescription>
                Crea y envía una nueva notificación al personal.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notification-title">Título</Label>
                  <Input
                    id="notification-title"
                    placeholder="Título de la notificación"
                    value={newNotification.title}
                    onChange={(e) =>
                      setNewNotification({
                        ...newNotification,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-message">Mensaje</Label>
                  <Textarea
                    id="notification-message"
                    placeholder="Escribe el mensaje de la notificación"
                    className="min-h-[100px]"
                    value={newNotification.message}
                    onChange={(e) =>
                      setNewNotification({
                        ...newNotification,
                        message: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-type">Tipo</Label>
                  <Select
                    value={newNotification.type}
                    onValueChange={(value) =>
                      setNewNotification({
                        ...newNotification,
                        type: value as "info" | "success" | "warning" | "error",
                      })
                    }
                  >
                    <SelectTrigger id="notification-type">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info">
                        <div className="flex items-center">
                          <Info className="mr-2 h-4 w-4 text-blue-500" />
                          Información
                        </div>
                      </SelectItem>
                      <SelectItem value="success">
                        <div className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Éxito
                        </div>
                      </SelectItem>
                      <SelectItem value="warning">
                        <div className="flex items-center">
                          <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                          Advertencia
                        </div>
                      </SelectItem>
                      <SelectItem value="error">
                        <div className="flex items-center">
                          <XCircle className="mr-2 h-4 w-4 text-red-500" />
                          Error
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notification-recipients">
                      Destinatarios
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        checked={
                          newNotification.recipients.length ===
                          staff.filter((s) => s.active).length
                        }
                        onCheckedChange={handleSelectAllRecipients}
                      />
                      <Label htmlFor="select-all" className="text-sm">
                        Seleccionar todos
                      </Label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-md">
                    {staff
                      .filter((person) => person.active)
                      .map((person) => (
                        <div
                          key={person.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`recipient-${person.id}`}
                            checked={newNotification.recipients.includes(
                              person.id
                            )}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewNotification({
                                  ...newNotification,
                                  recipients: [
                                    ...newNotification.recipients,
                                    person.id,
                                  ],
                                });
                              } else {
                                setNewNotification({
                                  ...newNotification,
                                  recipients: newNotification.recipients.filter(
                                    (id) => id !== person.id
                                  ),
                                });
                              }
                            }}
                          />
                          <Label
                            htmlFor={`recipient-${person.id}`}
                            className="text-sm"
                          >
                            {person.name} ({person.role})
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Opciones de envío</Label>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="send-email"
                        checked={newNotification.sendEmail}
                        onCheckedChange={(checked) =>
                          setNewNotification({
                            ...newNotification,
                            sendEmail: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="send-email">
                        Enviar por correo electrónico
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="send-push"
                        checked={newNotification.sendPush}
                        onCheckedChange={(checked) =>
                          setNewNotification({
                            ...newNotification,
                            sendPush: !!checked,
                          })
                        }
                      />
                      <Label htmlFor="send-push">
                        Enviar notificación push
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Usar plantilla</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {templates.map((template) => (
                      <Button
                        key={template.id}
                        variant="outline"
                        className="justify-start"
                        onClick={() => handleUseTemplate(template.id)}
                      >
                        {getNotificationIcon(template.type)}
                        <span className="ml-2 truncate">{template.title}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    className="bg-[#148f77] hover:bg-[#0e6251]"
                    onClick={handleSendNotification}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Notificación
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar notificaciones..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  <SelectItem value="info">Información</SelectItem>
                  <SelectItem value="success">Éxito</SelectItem>
                  <SelectItem value="warning">Advertencia</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Historial de Notificaciones</CardTitle>
              <CardDescription>
                Lista de todas las notificaciones enviadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Destinatarios</TableHead>
                    <TableHead>Fecha de Envío</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No se encontraron notificaciones.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <TableRow key={notification.id}>
                        <TableCell>
                          <Badge
                            className={getNotificationBadgeClass(
                              notification.type
                            )}
                          >
                            {getNotificationIcon(notification.type)}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {notification.title}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {notification.recipientNames.map((name, index) => (
                              <Badge
                                key={index}
                                variant={
                                  notification.read[index]
                                    ? "outline"
                                    : "default"
                                }
                                className={
                                  notification.read[index]
                                    ? "bg-gray-100 text-gray-800"
                                    : "bg-[#148f77]"
                                }
                              >
                                {name}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(notification.sentAt),
                            "dd/MM/yyyy HH:mm"
                          )}
                        </TableCell>
                        <TableCell>
                          {notification.read.every((r) => r) ? (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800"
                            >
                              Leída
                            </Badge>
                          ) : notification.read.some((r) => r) ? (
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              Parcialmente leída
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800"
                            >
                              No leída
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openPreviewDialog(notification)}
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openDeleteDialog(notification.id)}
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

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-end">
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={() => setIsNewTemplateDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nueva Plantilla
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Notificaciones</CardTitle>
              <CardDescription>
                Gestiona las plantillas para enviar notificaciones rápidamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-0">
                      <div className="flex items-center justify-between">
                        <Badge
                          className={getNotificationBadgeClass(template.type)}
                        >
                          {getNotificationIcon(template.type)}
                          <span className="ml-1">
                            {template.type === "info" && "Información"}
                            {template.type === "success" && "Éxito"}
                            {template.type === "warning" && "Advertencia"}
                            {template.type === "error" && "Error"}
                          </span>
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditTemplate({
                                id: template.id,
                                title: template.title,
                                message: template.message,
                                type: template.type as
                                  | "info"
                                  | "success"
                                  | "warning"
                                  | "error",
                              });
                              setIsEditTemplateDialogOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setDeleteTemplateId(template.id);
                              setIsDeleteTemplateDialogOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-base mt-2">
                        {template.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {template.message}
                      </p>
                    </CardContent>
                    <div className="border-t p-4">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          handleUseTemplate(template.id);
                          setActiveTab("send");
                        }}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Usar Plantilla
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo para vista previa de notificación */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vista Previa de Notificación</DialogTitle>
            <DialogDescription>
              Detalles de la notificación enviada.
            </DialogDescription>
          </DialogHeader>
          {previewNotification && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-2">
                <Badge
                  className={getNotificationBadgeClass(
                    previewNotification.type
                  )}
                >
                  {getNotificationIcon(previewNotification.type)}
                </Badge>
                <h3 className="text-lg font-medium">
                  {previewNotification.title}
                </h3>
              </div>
              <p className="text-sm">{previewNotification.message}</p>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Destinatarios:</h4>
                <div className="flex flex-wrap gap-1">
                  {previewNotification.recipientNames.map((name, index) => (
                    <Badge
                      key={index}
                      variant={
                        previewNotification.read[index] ? "outline" : "default"
                      }
                      className={
                        previewNotification.read[index]
                          ? "bg-gray-100 text-gray-800"
                          : "bg-[#148f77]"
                      }
                    >
                      {name}
                      {!previewNotification.read[index] && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-1 h-4 w-4 p-0"
                          onClick={() =>
                            handleMarkAsRead(previewNotification.id, index)
                          }
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      )}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Enviado el{" "}
                {format(
                  new Date(previewNotification.sentAt),
                  "dd/MM/yyyy 'a las' HH:mm"
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo para eliminar notificación */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la notificación permanentemente y no se
              puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteNotification}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo para nueva plantilla */}
      <Dialog
        open={isNewTemplateDialogOpen}
        onOpenChange={setIsNewTemplateDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Plantilla</DialogTitle>
            <DialogDescription>
              Crea una nueva plantilla de notificación.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-title">Título</Label>
              <Input
                id="template-title"
                placeholder="Título de la plantilla"
                value={newTemplate.title}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-message">Mensaje</Label>
              <Textarea
                id="template-message"
                placeholder="Escribe el mensaje de la plantilla"
                className="min-h-[100px]"
                value={newTemplate.message}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, message: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="template-type">Tipo</Label>
              <Select
                value={newTemplate.type}
                onValueChange={(value) =>
                  setNewTemplate({
                    ...newTemplate,
                    type: value as "info" | "success" | "warning" | "error",
                  })
                }
              >
                <SelectTrigger id="template-type">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">
                    <div className="flex items-center">
                      <Info className="mr-2 h-4 w-4 text-blue-500" />
                      Información
                    </div>
                  </SelectItem>
                  <SelectItem value="success">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                      Éxito
                    </div>
                  </SelectItem>
                  <SelectItem value="warning">
                    <div className="flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                      Advertencia
                    </div>
                  </SelectItem>
                  <SelectItem value="error">
                    <div className="flex items-center">
                      <XCircle className="mr-2 h-4 w-4 text-red-500" />
                      Error
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewTemplateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleAddTemplate}
            >
              Crear Plantilla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar plantilla */}
      <Dialog
        open={isEditTemplateDialogOpen}
        onOpenChange={setIsEditTemplateDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Plantilla</DialogTitle>
            <DialogDescription>
              Modifica la plantilla de notificación.
            </DialogDescription>
          </DialogHeader>
          {editTemplate && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-template-title">Título</Label>
                <Input
                  id="edit-template-title"
                  placeholder="Título de la plantilla"
                  value={editTemplate.title}
                  onChange={(e) =>
                    setEditTemplate({ ...editTemplate, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-template-message">Mensaje</Label>
                <Textarea
                  id="edit-template-message"
                  placeholder="Escribe el mensaje de la plantilla"
                  className="min-h-[100px]"
                  value={editTemplate.message}
                  onChange={(e) =>
                    setEditTemplate({
                      ...editTemplate,
                      message: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-template-type">Tipo</Label>
                <Select
                  value={editTemplate.type}
                  onValueChange={(value) =>
                    setEditTemplate({
                      ...editTemplate,
                      type: value as "info" | "success" | "warning" | "error",
                    })
                  }
                >
                  <SelectTrigger id="edit-template-type">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">
                      <div className="flex items-center">
                        <Info className="mr-2 h-4 w-4 text-blue-500" />
                        Información
                      </div>
                    </SelectItem>
                    <SelectItem value="success">
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Éxito
                      </div>
                    </SelectItem>
                    <SelectItem value="warning">
                      <div className="flex items-center">
                        <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                        Advertencia
                      </div>
                    </SelectItem>
                    <SelectItem value="error">
                      <div className="flex items-center">
                        <XCircle className="mr-2 h-4 w-4 text-red-500" />
                        Error
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditTemplateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleEditTemplate}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para eliminar plantilla */}
      <AlertDialog
        open={isDeleteTemplateDialogOpen}
        onOpenChange={setIsDeleteTemplateDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la plantilla permanentemente y no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTemplate}
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
