"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  Check,
  X,
  Loader2,
  RefreshCw,
} from "lucide-react"

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
]

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
]

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
]

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [usersList, setUsersList] = useState(users)
  const [integrationsList, setIntegrationsList] = useState(integrations)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showTestConnectionDialog, setShowTestConnectionDialog] = useState(false)
  const [showBackupDialog, setShowBackupDialog] = useState(false)
  const [isBackupInProgress, setIsBackupInProgress] = useState(false)
  const [isRestoreInProgress, setIsRestoreInProgress] = useState(false)
  const [showRestoreDialog, setShowRestoreDialog] = useState(false)
  const [isConnectionTesting, setIsConnectionTesting] = useState(false)
  const [connectionTestResult, setConnectionTestResult] = useState<null | boolean>(null)
  const [isSyncing, setIsSyncing] = useState<string | null>(null)

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: "Admin Usuario",
    email: "admin@usina.com",
    phone: "+54 9 11 1234-5678",
    bio: "Administrador del sistema Usina Leads",
  })

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    serverAlerts: true,
    conversionAlerts: true,
    budgetAlerts: true,
    scheduledReports: true,
    platformNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    startTime: "08:00",
    endTime: "20:00",
  })

  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    companyName: "Usina Leads",
    timezone: "America/Argentina/Buenos_Aires",
    language: "es",
    dateFormat: "dd/MM/yyyy",
    darkTheme: true,
  })

  // Database settings state
  const [dbSettings, setDbSettings] = useState({
    host: "localhost",
    port: "5432",
    name: "usina_leads",
    user: "admin",
    password: "••••••••••••",
  })

  // Backup settings state
  const [backupSettings, setBackupSettings] = useState({
    automatic: true,
    frequency: "daily",
    retention: "30",
  })

  // New user form state
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    role: "operator",
    password: "",
    confirmPassword: "",
  })

  // Edit user form state
  const [editUserForm, setEditUserForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    status: "",
  })

  // Handle profile form change
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.id]: e.target.value,
    })
  }

  // Handle password form change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.id]: e.target.value,
    })
  }

  // Handle notification settings change
  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting as keyof typeof notificationSettings],
    })
  }

  // Handle system settings change
  const handleSystemChange = (setting: string, value: string | boolean) => {
    setSystemSettings({
      ...systemSettings,
      [setting]: value,
    })
  }

  // Handle database settings change
  const handleDbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDbSettings({
      ...dbSettings,
      [e.target.id.replace("db-", "")]: e.target.value,
    })
  }

  // Handle backup settings change
  const handleBackupChange = (setting: string, value: string | boolean) => {
    setBackupSettings({
      ...backupSettings,
      [setting]: value,
    })
  }

  // Handle new user form change
  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserForm({
      ...newUserForm,
      [e.target.id]: e.target.value,
    })
  }

  // Handle edit user form change
  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserForm({
      ...editUserForm,
      [e.target.id]: e.target.value,
    })
  }

  // Save profile
  const saveProfile = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Perfil actualizado",
        description: "Tu información de perfil ha sido actualizada correctamente.",
      })
    }, 1000)
  }

  // Update password
  const updatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 8 caracteres.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setShowPasswordDialog(false)
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente.",
      })
    }, 1000)
  }

  // Save notification settings
  const saveNotificationSettings = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Preferencias guardadas",
        description: "Tus preferencias de notificaciones han sido actualizadas.",
      })
    }, 1000)
  }

  // Save system settings
  const saveSystemSettings = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configuración guardada",
        description: "La configuración general ha sido actualizada.",
      })
    }, 1000)
  }

  // Test database connection
  const testDbConnection = () => {
    setIsConnectionTesting(true)
    setConnectionTestResult(null)

    setTimeout(() => {
      setIsConnectionTesting(false)
      // Simulate successful connection 80% of the time
      const isSuccessful = Math.random() > 0.2
      setConnectionTestResult(isSuccessful)

      if (isSuccessful) {
        toast({
          title: "Conexión exitosa",
          description: "La conexión a la base de datos se ha establecido correctamente.",
        })
      } else {
        toast({
          title: "Error de conexión",
          description: "No se pudo conectar a la base de datos. Verifica los datos ingresados.",
          variant: "destructive",
        })
      }
    }, 2000)
  }

  // Save database settings
  const saveDbSettings = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Configuración guardada",
        description: "La configuración de la base de datos ha sido actualizada.",
      })
    }, 1000)
  }

  // Create backup
  const createBackup = () => {
    setIsBackupInProgress(true)
    setTimeout(() => {
      setIsBackupInProgress(false)
      setShowBackupDialog(false)
      toast({
        title: "Respaldo creado",
        description: "El respaldo ha sido creado correctamente.",
      })
    }, 3000)
  }

  // Restore from backup
  const restoreFromBackup = () => {
    setIsRestoreInProgress(true)
    setTimeout(() => {
      setIsRestoreInProgress(false)
      setShowRestoreDialog(false)
      toast({
        title: "Restauración completada",
        description: "El sistema ha sido restaurado desde el respaldo seleccionado.",
      })
    }, 5000)
  }

  // Add new user
  const addNewUser = () => {
    if (newUserForm.password !== newUserForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const newUser = {
        id: (usersList.length + 1).toString(),
        name: newUserForm.name,
        email: newUserForm.email,
        role: newUserForm.role,
        status: "active",
        lastLogin: "-",
      }

      setUsersList([...usersList, newUser])
      setIsLoading(false)
      setShowAddUserDialog(false)
      setNewUserForm({
        name: "",
        email: "",
        role: "operator",
        password: "",
        confirmPassword: "",
      })

      toast({
        title: "Usuario creado",
        description: `El usuario ${newUser.name} ha sido creado correctamente.`,
      })
    }, 1000)
  }

  // Edit user
  const editUser = () => {
    setIsLoading(true)
    setTimeout(() => {
      const updatedUsers = usersList.map((user) => (user.id === editUserForm.id ? { ...user, ...editUserForm } : user))

      setUsersList(updatedUsers)
      setIsLoading(false)
      setShowEditDialog(false)

      toast({
        title: "Usuario actualizado",
        description: `El usuario ${editUserForm.name} ha sido actualizado correctamente.`,
      })
    }, 1000)
  }

  // Delete user
  const deleteUser = () => {
    if (!selectedUser) return

    setIsLoading(true)
    setTimeout(() => {
      const updatedUsers = usersList.filter((user) => user.id !== selectedUser.id)
      setUsersList(updatedUsers)
      setIsLoading(false)
      setShowDeleteDialog(false)
      setSelectedUser(null)

      toast({
        title: "Usuario eliminado",
        description: `El usuario ${selectedUser.name} ha sido eliminado correctamente.`,
      })
    }, 1000)
  }

  // Toggle user status
  const toggleUserStatus = (userId: string) => {
    const updatedUsers = usersList.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          status: user.status === "active" ? "inactive" : "active",
        }
      }
      return user
    })

    setUsersList(updatedUsers)

    const user = updatedUsers.find((u) => u.id === userId)
    toast({
      title: `Usuario ${user?.status === "active" ? "activado" : "desactivado"}`,
      description: `El usuario ${user?.name} ha sido ${user?.status === "active" ? "activado" : "desactivado"} correctamente.`,
    })
  }

  // Connect/disconnect integration
  const toggleIntegration = (integrationId: string) => {
    const updatedIntegrations = integrationsList.map((integration) => {
      if (integration.id === integrationId) {
        return {
          ...integration,
          status: integration.status === "connected" ? "disconnected" : "connected",
          lastSync: integration.status === "disconnected" ? new Date().toISOString() : integration.lastSync,
        }
      }
      return integration
    })

    setIntegrationsList(updatedIntegrations)

    const integration = updatedIntegrations.find((i) => i.id === integrationId)
    toast({
      title: integration?.status === "connected" ? "Integración conectada" : "Integración desconectada",
      description: `La integración ${integration?.name} ha sido ${integration?.status === "connected" ? "conectada" : "desconectada"} correctamente.`,
    })
  }

  // Sync integration
  const syncIntegration = (integrationId: string) => {
    setIsSyncing(integrationId)

    setTimeout(() => {
      const updatedIntegrations = integrationsList.map((integration) => {
        if (integration.id === integrationId) {
          return {
            ...integration,
            lastSync: new Date().toISOString(),
          }
        }
        return integration
      })

      setIntegrationsList(updatedIntegrations)
      setIsSyncing(null)

      const integration = updatedIntegrations.find((i) => i.id === integrationId)
      toast({
        title: "Sincronización completada",
        description: `La integración ${integration?.name} ha sido sincronizada correctamente.`,
      })
    }, 2000)
  }

  // Handle opening edit dialog
  const handleEditClick = (user: any) => {
    setEditUserForm({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    })
    setShowEditDialog(true)
  }

  // Handle opening delete dialog
  const handleDeleteClick = (user: any) => {
    setSelectedUser(user)
    setShowDeleteDialog(true)
  }

  // Log out from session
  const logoutSession = () => {
    toast({
      title: "Sesión cerrada",
      description: "La sesión ha sido cerrada correctamente.",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Administra la configuración de tu cuenta y del sistema.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
              <CardDescription>Actualiza tu información personal y de contacto.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/golden-outback.png" alt="Avatar" />
                    <AvatarFallback className="bg-[#148f77] text-white text-xl">AU</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline">Cambiar Foto</Button>
                    <p className="text-xs text-muted-foreground">JPG, GIF o PNG. Tamaño máximo de 2MB.</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" value={profileForm.name} onChange={handleProfileChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" value={profileForm.email} onChange={handleProfileChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" value={profileForm.phone} onChange={handleProfileChange} />
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
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={saveProfile} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seguridad de la Cuenta</CardTitle>
              <CardDescription>Actualiza tu contraseña y configura la autenticación de dos factores.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Cambiar Contraseña</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Contraseña Actual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div></div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nueva Contraseña</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" onClick={() => setShowPasswordDialog(true)}>
                      <Key className="mr-2 h-4 w-4" />
                      Actualizar Contraseña
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Autenticación de Dos Factores</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Autenticación de Dos Factores</h4>
                      <p className="text-sm text-muted-foreground">
                        Añade una capa adicional de seguridad a tu cuenta.
                      </p>
                    </div>
                    <Switch
                      checked={false}
                      onCheckedChange={() => {
                        toast({
                          title: "Función no disponible",
                          description: "La autenticación de dos factores estará disponible próximamente.",
                        })
                      }}
                    />
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
                      <Button variant="outline" size="sm" onClick={logoutSession}>
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
              <CardDescription>Configura cómo y cuándo quieres recibir notificaciones.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notificaciones del Sistema</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Alertas de Servidores</h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones cuando haya problemas con los servidores.
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.serverAlerts}
                        onCheckedChange={() => handleNotificationToggle("serverAlerts")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Alertas de Conversiones</h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones sobre cambios en las tasas de conversión.
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.conversionAlerts}
                        onCheckedChange={() => handleNotificationToggle("conversionAlerts")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Alertas de Presupuesto</h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones cuando el gasto se acerque al límite del presupuesto.
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.budgetAlerts}
                        onCheckedChange={() => handleNotificationToggle("budgetAlerts")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Reportes Programados</h4>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones cuando se generen reportes programados.
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.scheduledReports}
                        onCheckedChange={() => handleNotificationToggle("scheduledReports")}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Canales de Notificación</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Notificaciones en la Plataforma</h4>
                        <p className="text-sm text-muted-foreground">Recibe notificaciones dentro de la plataforma.</p>
                      </div>
                      <Switch
                        checked={notificationSettings.platformNotifications}
                        onCheckedChange={() => handleNotificationToggle("platformNotifications")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Notificaciones por Correo Electrónico</h4>
                        <p className="text-sm text-muted-foreground">Recibe notificaciones por correo electrónico.</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="font-medium">Notificaciones por SMS</h4>
                        <p className="text-sm text-muted-foreground">Recibe notificaciones por SMS.</p>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={() => handleNotificationToggle("smsNotifications")}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Horarios de Notificación</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Hora de Inicio</Label>
                      <Select
                        value={notificationSettings.startTime}
                        onValueChange={(value) =>
                          setNotificationSettings({ ...notificationSettings, startTime: value })
                        }
                      >
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
                      <Select
                        value={notificationSettings.endTime}
                        onValueChange={(value) => setNotificationSettings({ ...notificationSettings, endTime: value })}
                      >
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
                  <Button
                    className="bg-[#148f77] hover:bg-[#0e6251]"
                    onClick={saveNotificationSettings}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Preferencias
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">Gestión de Usuarios</h2>
              <p className="text-sm text-muted-foreground">Administra los usuarios y sus permisos en el sistema.</p>
            </div>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={() => setShowAddUserDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Usuario
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usuarios</CardTitle>
              <CardDescription>Lista de usuarios con acceso al sistema.</CardDescription>
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
                  {usersList.map((user) => (
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
                          {user.role === "admin" ? "Administrador" : user.role === "manager" ? "Gerente" : "Operador"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "active" ? "default" : "outline"}
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
                        {user.lastLogin === "-"
                          ? "-"
                          : new Date(user.lastLogin).toLocaleDateString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditClick(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => toggleUserStatus(user.id)}>
                            <Lock className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteClick(user)}>
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
              <CardDescription>Configura los roles y permisos del sistema.</CardDescription>
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
                  <Button
                    className="bg-[#148f77] hover:bg-[#0e6251]"
                    onClick={() => {
                      toast({
                        title: "Cambios guardados",
                        description: "Los roles y permisos han sido actualizados correctamente.",
                      })
                    }}
                  >
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
              <CardDescription>Historial de actividades de los usuarios en el sistema.</CardDescription>
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
              <CardDescription>Conecta Usina Leads con otras plataformas y servicios.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {integrationsList.map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {integration.icon}
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {integration.status === "connected"
                            ? `Última sincronización: ${new Date(integration.lastSync as string).toLocaleDateString(
                                "es-ES",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}`
                            : "No conectado"}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {integration.status === "connected" && (
                        <Button
                          variant="outline"
                          onClick={() => syncIntegration(integration.id)}
                          disabled={isSyncing === integration.id}
                        >
                          {isSyncing === integration.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      <Button
                        variant={integration.status === "connected" ? "outline" : "default"}
                        className={integration.status === "connected" ? "" : "bg-[#148f77] hover:bg-[#0e6251]"}
                        onClick={() => toggleIntegration(integration.id)}
                      >
                        {integration.status === "connected" ? "Desconectar" : "Conectar"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API de Meta Ads</CardTitle>
              <CardDescription>Configura la integración con la API de Facebook e Instagram Ads.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" defaultValue="••••••••••••••••••••••••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret</Label>
                  <Input id="api-secret" defaultValue="••••••••••••••••••••••••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-id">Business ID</Label>
                  <Input id="business-id" defaultValue="123456789012345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ad-account-id">Ad Account ID</Label>
                  <Input id="ad-account-id" defaultValue="act_123456789012345" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Sincronización Automática</h4>
                    <p className="text-sm text-muted-foreground">
                      Sincroniza automáticamente los datos de campañas cada hora.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-end">
                  <Button
                    className="bg-[#148f77] hover:bg-[#0e6251]"
                    onClick={() => {
                      toast({
                        title: "Configuración guardada",
                        description: "La configuración de Meta Ads ha sido actualizada correctamente.",
                      })
                    }}
                  >
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
              <CardDescription>Configura la integración con la API de WhatsApp Business.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-token">Token de Acceso</Label>
                  <Input id="whatsapp-token" defaultValue="••••••••••••••••••••••••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-phone">ID de Número de Teléfono</Label>
                  <Input id="whatsapp-phone" defaultValue="123456789012345" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-business">ID de Cuenta Business</Label>
                  <Input id="whatsapp-business" defaultValue="123456789012345" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Mensajes Automáticos</h4>
                    <p className="text-sm text-muted-foreground">Envía mensajes automáticos a los leads generados.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-end">
                  <Button
                    className="bg-[#148f77] hover:bg-[#0e6251]"
                    onClick={() => {
                      toast({
                        title: "Configuración guardada",
                        description: "La configuración de WhatsApp ha sido actualizada correctamente.",
                      })
                    }}
                  >
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
              <CardDescription>Configura los ajustes generales del sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nombre de la Empresa</Label>
                  <Input
                    id="company-name"
                    value={systemSettings.companyName}
                    onChange={(e) => handleSystemChange("companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Zona Horaria</Label>
                  <Select
                    value={systemSettings.timezone}
                    onValueChange={(value) => handleSystemChange("timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar zona horaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Argentina/Buenos_Aires">
                        América/Argentina/Buenos Aires (GMT-3)
                      </SelectItem>
                      <SelectItem value="America/Santiago">América/Santiago (GMT-4)</SelectItem>
                      <SelectItem value="America/Sao_Paulo">América/Sao Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/Mexico_City">América/Ciudad de México (GMT-6)</SelectItem>
                      <SelectItem value="America/Bogota">América/Bogotá (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select
                    value={systemSettings.language}
                    onValueChange={(value) => handleSystemChange("language", value)}
                  >
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
                  <Select
                    value={systemSettings.dateFormat}
                    onValueChange={(value) => handleSystemChange("dateFormat", value)}
                  >
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
                    <p className="text-sm text-muted-foreground">Activa el tema oscuro para la interfaz de usuario.</p>
                  </div>
                  <Switch
                    checked={systemSettings.darkTheme}
                    onCheckedChange={(checked) => handleSystemChange("darkTheme", checked)}
                  />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={saveSystemSettings} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Guardar Cambios
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuración de Base de Datos</CardTitle>
              <CardDescription>Configura la conexión a la base de datos.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="db-host">Host</Label>
                  <Input id="db-host" value={dbSettings.host} onChange={handleDbChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-port">Puerto</Label>
                  <Input id="db-port" value={dbSettings.port} onChange={handleDbChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-name">Nombre de la Base de Datos</Label>
                  <Input id="db-name" value={dbSettings.name} onChange={handleDbChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-user">Usuario</Label>
                  <Input id="db-user" value={dbSettings.user} onChange={handleDbChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="db-password">Contraseña</Label>
                  <Input id="db-password" type="password" value={dbSettings.password} onChange={handleDbChange} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowTestConnectionDialog(true)}>
                    Probar Conexión
                  </Button>
                  <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={saveDbSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar Configuración
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Respaldo y Restauración</CardTitle>
              <CardDescription>Configura los respaldos automáticos y restaura desde un respaldo.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Respaldos Automáticos</h4>
                    <p className="text-sm text-muted-foreground">Realiza respaldos automáticos de la base de datos.</p>
                  </div>
                  <Switch
                    checked={backupSettings.automatic}
                    onCheckedChange={(checked) => handleBackupChange("automatic", checked)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backup-frequency">Frecuencia de Respaldo</Label>
                  <Select
                    value={backupSettings.frequency}
                    onValueChange={(value) => handleBackupChange("frequency", value)}
                  >
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
                  <Label htmlFor="backup-retention">Retención de Respaldos</Label>
                  <Select
                    value={backupSettings.retention}
                    onValueChange={(value) => handleBackupChange("retention", value)}
                  >
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
                  <Button variant="outline" onClick={() => setShowBackupDialog(true)}>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Último Respaldo
                  </Button>
                  <Button variant="outline" onClick={() => setShowRestoreDialog(true)}>
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
              <CardDescription>Información sobre la versión y el estado del sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Versión</p>
                    <p className="font-medium">1.5.2</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Última Actualización</p>
                    <p className="font-medium">15/04/2023</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Estado del Servidor</p>
                    <div className="flex items-center">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                      <p className="font-medium">En línea</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Uso de CPU</p>
                    <p className="font-medium">23%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Uso de Memoria</p>
                    <p className="font-medium">1.2 GB / 4 GB</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Uso de Disco</p>
                    <p className="font-medium">45.3 GB / 100 GB</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Registros del sistema",
                        description: "Visualizando registros del sistema...",
                      })
                    }}
                  >
                    <Database className="mr-2 h-4 w-4" />
                    Ver Registros del Sistema
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar Contraseña</DialogTitle>
            <DialogDescription>
              Ingresa tu contraseña actual y la nueva contraseña para actualizar tus credenciales.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="current-password-dialog">Contraseña Actual</Label>
              <Input
                id="current-password-dialog"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password-dialog">Nueva Contraseña</Label>
              <Input
                id="new-password-dialog"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password-dialog">Confirmar Contraseña</Label>
              <Input
                id="confirm-password-dialog"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={updatePassword} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Actualizando...
                </>
              ) : (
                "Actualizar Contraseña"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
            <DialogDescription>Completa el formulario para crear un nuevo usuario en el sistema.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" value={newUserForm.name} onChange={handleNewUserChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" value={newUserForm.email} onChange={handleNewUserChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select
                value={newUserForm.role}
                onValueChange={(value) => setNewUserForm({ ...newUserForm, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="operator">Operador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" value={newUserForm.password} onChange={handleNewUserChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={newUserForm.confirmPassword}
                onChange={handleNewUserChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={addNewUser} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creando...
                </>
              ) : (
                "Crear Usuario"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
            <DialogDescription>Modifica la información del usuario seleccionado.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input id="name" value={editUserForm.name} onChange={handleEditUserChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" value={editUserForm.email} onChange={handleEditUserChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select
                value={editUserForm.role}
                onValueChange={(value) => setEditUserForm({ ...editUserForm, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="operator">Operador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select
                value={editUserForm.status}
                onValueChange={(value) => setEditUserForm({ ...editUserForm, status: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={editUser} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente al usuario {selectedUser?.name} y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={deleteUser} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Test Connection Dialog */}
      <Dialog open={showTestConnectionDialog} onOpenChange={setShowTestConnectionDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Probar Conexión a la Base de Datos</DialogTitle>
            <DialogDescription>Verifica la conexión con los parámetros configurados.</DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center justify-center">
            {isConnectionTesting ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#148f77]" />
                <p>Probando conexión...</p>
              </div>
            ) : connectionTestResult === null ? (
              <div className="text-center">
                <p>Haz clic en el botón para probar la conexión a la base de datos.</p>
              </div>
            ) : connectionTestResult ? (
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-green-100 p-3">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <p className="font-medium text-green-600">Conexión exitosa</p>
                <p className="text-sm text-muted-foreground text-center">
                  La conexión a la base de datos se ha establecido correctamente.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-red-100 p-3">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <p className="font-medium text-red-600">Error de conexión</p>
                <p className="text-sm text-muted-foreground text-center">
                  No se pudo conectar a la base de datos. Verifica los datos ingresados.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTestConnectionDialog(false)}>
              Cerrar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={testDbConnection}
              disabled={isConnectionTesting}
            >
              {isConnectionTesting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Probando...
                </>
              ) : (
                "Probar Conexión"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Backup Dialog */}
      <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Respaldo</DialogTitle>
            <DialogDescription>Crea un respaldo completo de la base de datos.</DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center justify-center">
            {isBackupInProgress ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#148f77]" />
                <p>Creando respaldo...</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#148f77] h-2.5 rounded-full" style={{ width: "70%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground">No cierres esta ventana hasta que el proceso termine.</p>
              </div>
            ) : (
              <div className="text-center">
                <p>¿Estás seguro de que deseas crear un respaldo completo de la base de datos?</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Este proceso puede tardar varios minutos dependiendo del tamaño de la base de datos.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBackupDialog(false)} disabled={isBackupInProgress}>
              Cancelar
            </Button>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={createBackup} disabled={isBackupInProgress}>
              {isBackupInProgress ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Crear Respaldo"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restore Dialog */}
      <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Restaurar desde Respaldo</DialogTitle>
            <DialogDescription>Selecciona un respaldo para restaurar el sistema.</DialogDescription>
          </DialogHeader>
          <div className="py-2">
            {isRestoreInProgress ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#148f77]" />
                <p>Restaurando sistema...</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-[#148f77] h-2.5 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <p className="text-sm text-muted-foreground">No cierres esta ventana hasta que el proceso termine.</p>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  <Label htmlFor="backup-file">Seleccionar Respaldo</Label>
                  <Select defaultValue="backup-1">
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar respaldo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="backup-1">Respaldo - 22/04/2023 10:30</SelectItem>
                      <SelectItem value="backup-2">Respaldo - 21/04/2023 09:15</SelectItem>
                      <SelectItem value="backup-3">Respaldo - 20/04/2023 14:45</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-md bg-yellow-50 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Advertencia</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Restaurar el sistema desde un respaldo sobrescribirá todos los datos actuales. Esta acción no
                          se puede deshacer.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="confirm-restore" className="rounded border-gray-300" />
                    <Label htmlFor="confirm-restore">Entiendo que esta acción sobrescribirá los datos actuales</Label>
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRestoreDialog(false)} disabled={isRestoreInProgress}>
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={restoreFromBackup}
              disabled={isRestoreInProgress}
            >
              {isRestoreInProgress ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Restaurando...
                </>
              ) : (
                "Restaurar Sistema"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
