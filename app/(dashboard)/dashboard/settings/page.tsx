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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Settings,
  User,
  Bell,
  Shield,
  Globe,
  Database,
  Key,
  Lock,
  Mail,
  Smartphone,
  Trash2,
  Edit,
  Plus,
  Save,
  LogOut,
  Facebook,
  Instagram,
  Zap,
  AlertTriangle,
  Download,
} from "lucide-react";

// Simulated data for users
const users = [
  {
    id: "1",
    name: "Admin Usuario",
    email: "admin@usina.com",
    role: "admin",
    status: "active",
    lastLogin: "2023-04-22T10:30:00",
  },
  {
    id: "2",
    name: "Juan Pérez",
    email: "juan@usina.com",
    role: "manager",
    status: "active",
    lastLogin: "2023-04-21T14:45:00",
  },
  {
    id: "3",
    name: "María López",
    email: "maria@usina.com",
    role: "operator",
    status: "active",
    lastLogin: "2023-04-22T08:15:00",
  },
  {
    id: "4",
    name: "Carlos Rodríguez",
    email: "carlos@usina.com",
    role: "manager",
    status: "active",
    lastLogin: "2023-04-20T16:30:00",
  },
  {
    id: "5",
    name: "Ana Martínez",
    email: "ana@usina.com",
    role: "operator",
    status: "inactive",
    lastLogin: "2023-04-15T09:20:00",
  },
];

// Simulated data for integrations
const integrations = [
  {
    id: "1",
    name: "Facebook Ads",
    status: "connected",
    lastSync: "2023-04-22T10:00:00",
    icon: <Facebook className="h-6 w-6 text-blue-600" />,
  },
  {
    id: "2",
    name: "Instagram Ads",
    status: "connected",
    lastSync: "2023-04-22T10:00:00",
    icon: <Instagram className="h-6 w-6 text-pink-600" />,
  },
  {
    id: "3",
    name: "WhatsApp API",
    status: "connected",
    lastSync: "2023-04-22T09:30:00",
    icon: <Smartphone className="h-6 w-6 text-green-600" />,
  },
  {
    id: "4",
    name: "Email Marketing",
    status: "disconnected",
    lastSync: null,
    icon: <Mail className="h-6 w-6 text-gray-600" />,
  },
  {
    id: "5",
    name: "Payment Gateway",
    status: "connected",
    lastSync: "2023-04-21T15:45:00",
    icon: <Zap className="h-6 w-6 text-yellow-600" />,
  },
];

// Simulated data for audit logs
const auditLogs = [
  {
    id: "1",
    user: "Admin Usuario",
    action: "login",
    resource: "sistema",
    timestamp: "2023-04-22T10:30:00",
    ip: "192.168.1.1",
  },
  {
    id: "2",
    user: "Admin Usuario",
    action: "update",
    resource: "configuración",
    timestamp: "2023-04-22T10:35:00",
    ip: "192.168.1.1",
  },
  {
    id: "3",
    user: "Juan Pérez",
    action: "login",
    resource: "sistema",
    timestamp: "2023-04-21T14:45:00",
    ip: "192.168.1.2",
  },
  {
    id: "4",
    user: "María López",
    action: "create",
    resource: "reporte",
    timestamp: "2023-04-22T08:20:00",
    ip: "192.168.1.3",
  },
  {
    id: "5",
    user: "Carlos Rodríguez",
    action: "update",
    resource: "cliente",
    timestamp: "2023-04-20T16:35:00",
    ip: "192.168.1.4",
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Administra la configuración de tu cuenta y del sistema.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="users">
            <Shield className="mr-2 h-4 w-4" />
            Usuarios
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Globe className="mr-2 h-4 w-4" />
            Integraciones
          </TabsTrigger>
          <TabsTrigger value="system">
            <Settings className="mr-2 h-4 w-4" />
            Sistema
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Información de Perfil</CardTitle>
              <CardDescription>
                Actualiza tu información personal y de contacto.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback className="bg-[#148f77] text-white text-xl">
                      AU
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline">Cambiar Foto</Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, GIF o PNG. Tamaño máximo de 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" defaultValue="Admin Usuario" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" defaultValue="admin@usina.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" defaultValue="+54 9 11 1234-5678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <Input id="role" defaultValue="Administrador" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea
                    id="bio"
                    placeholder="Escribe una breve biografía..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#148f77] hover:bg-[#0e6251]">
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>
                Actualiza tu contraseña y configura la autenticación de dos
                factores.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cambiar Contraseña</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">
                        Contraseña Actual
                      </Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva Contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">
                        Confirmar Contraseña
                      </Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline">
                      <Key className="mr-2 h-4 w-4" />
                      Actualizar Contraseña
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Autenticación de Dos Factores
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">
                        Autenticación de Dos Factores
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Añade una capa adicional de seguridad a tu cuenta.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sesiones Activas</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Navegador Web - Chrome</p>
                        <p className="text-sm text-muted-foreground">
                          Buenos Aires, Argentina • 192.168.1.1 • Activa ahora
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar Sesión
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificaciones</CardTitle>
              <CardDescription>
                Configura cómo y cuándo quieres recibir notificaciones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Notificaciones del Sistema
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Alertas de Servidores</h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones cuando haya problemas con los
                          servidores.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Alertas de Conversiones</h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones sobre cambios en las tasas de
                          conversión.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Alertas de Presupuesto</h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones cuando el gasto se acerque al
                          límite del presupuesto.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Reportes Programados</h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones cuando se generen reportes
                          programados.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Canales de Notificación
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">
                          Notificaciones en la Plataforma
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones dentro de la plataforma.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">
                          Notificaciones por Correo Electrónico
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones por correo electrónico.
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Notificaciones por SMS</h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones por SMS.
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Horarios de Notificación
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Hora de Inicio</Label>
                      <Select defaultValue="08:00">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar hora" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="00:00">00:00</SelectItem>
                          <SelectItem value="06:00">06:00</SelectItem>
                          <SelectItem value="08:00">08:00</SelectItem>
                          <SelectItem value="09:00">09:00</SelectItem>
                          <SelectItem value="10:00">10:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">Hora de Fin</Label>
                      <Select defaultValue="20:00">
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar hora" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="18:00">18:00</SelectItem>
                          <SelectItem value="20:00">20:00</SelectItem>
                          <SelectItem value="22:00">22:00</SelectItem>
                          <SelectItem value="00:00">00:00</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#148f77] hover:bg-[#0e6251]">
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Preferencias
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Gestión de Usuarios
              </h2>
              <p className="text-sm text-muted-foreground">
                Administra los usuarios y sus permisos en el sistema.
              </p>
            </div>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usuarios</CardTitle>
              <CardDescription>
                Lista de usuarios con acceso al sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Correo Electrónico</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Último Acceso</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            user.role === "admin"
                              ? "text-purple-500 border-purple-500"
                              : user.role === "manager"
                              ? "text-blue-500 border-blue-500"
                              : "text-green-500 border-green-500"
                          }
                        >
                          {user.role === "admin"
                            ? "Administrador"
                            : user.role === "manager"
                            ? "Gerente"
                            : "Operador"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.status === "active" ? "default" : "outline"
                          }
                          className={
                            user.status === "active"
                              ? "bg-green-500 hover:bg-green-600"
                              : "text-yellow-500 border-yellow-500"
                          }
                        >
                          {user.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.lastLogin).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Lock className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
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

          <Card>
            <CardHeader>
              <CardTitle>Roles y Permisos</CardTitle>
              <CardDescription>
                Configura los roles y permisos del sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Administrador</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Acceso completo al sistema</p>
                      <Switch defaultChecked disabled />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Gestión de usuarios</p>
                      <Switch defaultChecked disabled />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Configuración del sistema</p>
                      <Switch defaultChecked disabled />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Gerente</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Acceso a dashboard</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Gestión de clientes</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Gestión de servidores</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Gestión de publicidad</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Gestión de finanzas</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Gestión de reportes</p>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Operador</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Acceso a dashboard</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Ver clientes</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Ver servidores</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Ver publicidad</p>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Ver reportes</p>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#148f77] hover:bg-[#0e6251]">
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registro de Actividad</CardTitle>
              <CardDescription>
                Historial de actividades de los usuarios en el sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acción</TableHead>
                    <TableHead>Recurso</TableHead>
                    <TableHead>Fecha y Hora</TableHead>
                    <TableHead>Dirección IP</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            log.action === "login"
                              ? "text-blue-500 border-blue-500"
                              : log.action === "update"
                              ? "text-orange-500 border-orange-500"
                              : "text-green-500 border-green-500"
                          }
                        >
                          {log.action === "login"
                            ? "Inicio de sesión"
                            : log.action === "update"
                            ? "Actualización"
                            : "Creación"}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>
                        {new Date(log.timestamp).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integraciones</CardTitle>
              <CardDescription>
                Conecta Usina Leads con otras plataformas y servicios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      {integration.icon}
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {integration.status === "connected"
                            ? `Última sincronización: ${new Date(
                                integration.lastSync as string
                              ).toLocaleDateString("es-ES", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}`
                            : "No conectado"}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={
                        integration.status === "connected"
                          ? "outline"
                          : "default"
                      }
                      className={
                        integration.status === "connected"
                          ? ""
                          : "bg-[#148f77] hover:bg-[#0e6251]"
                      }
                    >
                      {integration.status === "connected"
                        ? "Configurar"
                        : "Conectar"}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API de Meta Ads</CardTitle>
              <CardDescription>
                Configura la integración con la API de Facebook e Instagram Ads.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    defaultValue="••••••••••••••••••••••••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret</Label>
                  <Input
                    id="api-secret"
                    defaultValue="••••••••••••••••••••••••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-id">Business ID</Label>
                  <Input id="business-id" defaultValue="123456789012345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ad-account-id">Ad Account ID</Label>
                  <Input
                    id="ad-account-id"
                    defaultValue="act_123456789012345"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Sincronización Automática</h4>
                    <p className="text-sm text-muted-foreground">
                      Sincroniza automáticamente los datos de campañas cada
                      hora.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-[#148f77] hover:bg-[#0e6251]">
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Configuración
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API de WhatsApp</CardTitle>
              <CardDescription>
                Configura la integración con la API de WhatsApp Business.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-token">Token de Acceso</Label>
                  <Input
                    id="whatsapp-token"
                    defaultValue="••••••••••••••••••••••••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-phone">
                    ID de Número de Teléfono
                  </Label>
                  <Input id="whatsapp-phone" defaultValue="123456789012345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-business">
                    ID de Cuenta Business
                  </Label>
                  <Input
                    id="whatsapp-business"
                    defaultValue="123456789012345"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Mensajes Automáticos</h4>
                    <p className="text-sm text-muted-foreground">
                      Envía mensajes automáticos a los leads generados.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-[#148f77] hover:bg-[#0e6251]">
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Configuración
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>
                Configura los ajustes generales del sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nombre de la Empresa</Label>
                  <Input id="company-name" defaultValue="Usina Leads" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select defaultValue="America/Argentina/Buenos_Aires">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Argentina/Buenos_Aires">
                        América/Argentina/Buenos Aires (GMT-3)
                      </SelectItem>
                      <SelectItem value="America/Santiago">
                        América/Santiago (GMT-4)
                      </SelectItem>
                      <SelectItem value="America/Sao_Paulo">
                        América/Sao Paulo (GMT-3)
                      </SelectItem>
                      <SelectItem value="America/Mexico_City">
                        América/Ciudad de México (GMT-6)
                      </SelectItem>
                      <SelectItem value="America/Bogota">
                        América/Bogotá (GMT-5)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select defaultValue="es">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">Inglés</SelectItem>
                      <SelectItem value="pt">Portugués</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Formato de Fecha</Label>
                  <Select defaultValue="dd/MM/yyyy">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar formato de fecha" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/MM/yyyy">DD/MM/AAAA</SelectItem>
                      <SelectItem value="MM/dd/yyyy">MM/DD/AAAA</SelectItem>
                      <SelectItem value="yyyy-MM-dd">AAAA-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Tema Oscuro</h4>
                    <p className="text-sm text-muted-foreground">
                      Activa el tema oscuro para la interfaz de usuario.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Base de Datos</CardTitle>
              <CardDescription>
                Configura la conexión a la base de datos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="db-host">Host</Label>
                  <Input id="db-host" defaultValue="localhost" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-port">Puerto</Label>
                  <Input id="db-port" defaultValue="5432" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-name">Nombre de la Base de Datos</Label>
                  <Input id="db-name" defaultValue="usina_leads" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-user">Usuario</Label>
                  <Input id="db-user" defaultValue="admin" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-password">Contraseña</Label>
                  <Input
                    id="db-password"
                    type="password"
                    defaultValue="••••••••••••"
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="outline">Probar Conexión</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Respaldo y Restauración</CardTitle>
              <CardDescription>
                Configura los respaldos automáticos y restaura desde un
                respaldo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Respaldos Automáticos</h4>
                    <p className="text-sm text-muted-foreground">
                      Realiza respaldos automáticos de la base de datos.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">
                    Frecuencia de Respaldo
                  </Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-retention">
                    Retención de Respaldos
                  </Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar período de retención" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 días</SelectItem>
                      <SelectItem value="14">14 días</SelectItem>
                      <SelectItem value="30">30 días</SelectItem>
                      <SelectItem value="90">90 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Último Respaldo
                  </Button>
                  <Button variant="outline">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Restaurar desde Respaldo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Información del Sistema</CardTitle>
              <CardDescription>
                Información sobre la versión y el estado del sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Versión
                    </p>
                    <p className="font-medium">1.5.2</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Última Actualización
                    </p>
                    <p className="font-medium">15/04/2023</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Estado del Servidor
                    </p>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                      <p className="font-medium">En línea</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Uso de CPU
                    </p>
                    <p className="font-medium">23%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Uso de Memoria
                    </p>
                    <p className="font-medium">1.2 GB / 4 GB</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Uso de Disco
                    </p>
                    <p className="font-medium">45.3 GB / 100 GB</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Ver Registros del Sistema
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
