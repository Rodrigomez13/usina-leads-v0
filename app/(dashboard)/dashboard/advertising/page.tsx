"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { BarChart3, Plus, Edit, Trash2, Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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

// Tipos para nuestros datos
interface Campaign {
  id: string
  name: string
  client: string
  platform: string
  status: "active" | "paused" | "completed"
  budget: number
  spent: number
  startDate: string
  endDate: string
  performance: number
}

// Datos iniciales de campañas
const initialCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Campaña Verano 2025",
    client: "Golden Outback",
    platform: "Facebook",
    status: "active",
    budget: 5000,
    spent: 2500,
    startDate: "2025-01-15",
    endDate: "2025-03-15",
    performance: 87,
  },
  {
    id: "2",
    name: "Promoción Otoño",
    client: "Sunset Hotels",
    platform: "Instagram",
    status: "active",
    budget: 3000,
    spent: 1200,
    startDate: "2025-02-01",
    endDate: "2025-04-30",
    performance: 92,
  },
  {
    id: "3",
    name: "Lanzamiento Producto",
    client: "Tech Solutions",
    platform: "Google Ads",
    status: "completed",
    budget: 8000,
    spent: 8000,
    startDate: "2024-11-01",
    endDate: "2025-01-31",
    performance: 78,
  },
  {
    id: "4",
    name: "Evento Corporativo",
    client: "Business Corp",
    platform: "LinkedIn",
    status: "paused",
    budget: 4500,
    spent: 2200,
    startDate: "2025-01-10",
    endDate: "2025-02-28",
    performance: 65,
  },
]

export default function AdvertisingPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("campaigns")
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")

  // Estados para diálogos
  const [isNewCampaignDialogOpen, setIsNewCampaignDialogOpen] = useState(false)
  const [isEditCampaignDialogOpen, setIsEditCampaignDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Estados para formularios
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    status: "active",
  })
  const [editCampaign, setEditCampaign] = useState<Campaign | null>(null)
  const [deleteCampaignId, setDeleteCampaignId] = useState<string | null>(null)

  // Filtrar campañas
  const filteredCampaigns = campaigns.filter((campaign) => {
    // Filtrar por búsqueda
    if (
      searchQuery &&
      !campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !campaign.client.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filtrar por estado
    if (statusFilter !== "all" && campaign.status !== statusFilter) {
      return false
    }

    // Filtrar por plataforma
    if (platformFilter !== "all" && campaign.platform !== platformFilter) {
      return false
    }

    return true
  })

  // Función para abrir el diálogo de nueva campaña
  const openNewCampaignDialog = () => {
    setNewCampaign({
      status: "active",
    })
    setIsNewCampaignDialogOpen(true)
  }

  // Función para abrir el diálogo de edición
  const openEditCampaignDialog = (campaign: Campaign) => {
    setEditCampaign(campaign)
    setIsEditCampaignDialogOpen(true)
  }

  // Función para abrir el diálogo de eliminación
  const openDeleteDialog = (id: string) => {
    setDeleteCampaignId(id)
    setIsDeleteDialogOpen(true)
  }

  // Función para agregar una nueva campaña
  const handleAddCampaign = () => {
    if (!newCampaign.name || !newCampaign.client || !newCampaign.platform) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      })
      return
    }

    const id = (Math.max(...campaigns.map((c) => Number.parseInt(c.id)), 0) + 1).toString()

    const campaign: Campaign = {
      id,
      name: newCampaign.name || "",
      client: newCampaign.client || "",
      platform: newCampaign.platform || "",
      status: newCampaign.status as "active" | "paused" | "completed",
      budget: newCampaign.budget || 0,
      spent: newCampaign.spent || 0,
      startDate: newCampaign.startDate || new Date().toISOString().split("T")[0],
      endDate: newCampaign.endDate || "",
      performance: newCampaign.performance || 0,
    }

    setCampaigns([...campaigns, campaign])
    setIsNewCampaignDialogOpen(false)

    toast({
      title: "Campaña creada",
      description: "La campaña ha sido creada exitosamente.",
    })
  }

  // Función para editar una campaña
  const handleEditCampaign = () => {
    if (!editCampaign) {
      return
    }

    const updatedCampaigns = campaigns.map((campaign) => (campaign.id === editCampaign.id ? editCampaign : campaign))

    setCampaigns(updatedCampaigns)
    setIsEditCampaignDialogOpen(false)
    setEditCampaign(null)

    toast({
      title: "Campaña actualizada",
      description: "La campaña ha sido actualizada exitosamente.",
    })
  }

  // Función para eliminar una campaña
  const handleDeleteCampaign = () => {
    if (!deleteCampaignId) return

    setCampaigns(campaigns.filter((campaign) => campaign.id !== deleteCampaignId))
    setIsDeleteDialogOpen(false)
    setDeleteCampaignId(null)

    toast({
      title: "Campaña eliminada",
      description: "La campaña ha sido eliminada exitosamente.",
    })
  }

  // Función para obtener el color de la insignia según el estado
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 hover:bg-green-600"
      case "paused":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "completed":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return ""
    }
  }

  // Función para obtener el texto del estado en español
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activa"
      case "paused":
        return "Pausada"
      case "completed":
        return "Completada"
      default:
        return status
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Publicidad</h1>
        <p className="text-muted-foreground">Administra las campañas publicitarias de tus clientes.</p>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar campañas..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="active">Activas</SelectItem>
              <SelectItem value="paused">Pausadas</SelectItem>
              <SelectItem value="completed">Completadas</SelectItem>
            </SelectContent>
          </Select>
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por plataforma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las plataformas</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Google Ads">Google Ads</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Twitter">Twitter</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-[#148f77] hover:bg-[#0e6251] w-full md:w-auto" onClick={openNewCampaignDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Campaña
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">
            <Filter className="mr-2 h-4 w-4" />
            Campañas
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="mr-2 h-4 w-4" />
            Analíticas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Campañas Publicitarias</CardTitle>
              <CardDescription>Gestiona las campañas publicitarias de tus clientes.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Plataforma</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Presupuesto</TableHead>
                    <TableHead>Gastado</TableHead>
                    <TableHead>Rendimiento</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                        No se encontraron campañas publicitarias.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.name}</TableCell>
                        <TableCell>{campaign.client}</TableCell>
                        <TableCell>{campaign.platform}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeClass(campaign.status)}>
                            {getStatusText(campaign.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                        <TableCell>${campaign.spent.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-green-500"
                                style={{
                                  width: `${campaign.performance}%`,
                                }}
                              />
                            </div>
                            <span>{campaign.performance}%</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => openEditCampaignDialog(campaign)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => openDeleteDialog(campaign.id)}>
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

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analíticas de Campañas</CardTitle>
              <CardDescription>Visualiza el rendimiento de tus campañas publicitarias.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Analíticas de Campañas</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  Aquí se mostrarán gráficos y estadísticas sobre el rendimiento de tus campañas.
                </p>
                <p className="text-xs text-muted-foreground">Funcionalidad en desarrollo.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo para nueva campaña */}
      <Dialog open={isNewCampaignDialogOpen} onOpenChange={setIsNewCampaignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Campaña Publicitaria</DialogTitle>
            <DialogDescription>Completa los detalles para crear una nueva campaña.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de la Campaña</Label>
              <Input
                id="name"
                value={newCampaign.name || ""}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                placeholder="Ej. Campaña Verano 2025"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                value={newCampaign.client || ""}
                onChange={(e) => setNewCampaign({ ...newCampaign, client: e.target.value })}
                placeholder="Ej. Golden Outback"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform">Plataforma</Label>
              <Select
                value={newCampaign.platform}
                onValueChange={(value) => setNewCampaign({ ...newCampaign, platform: value })}
              >
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Seleccionar plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Presupuesto ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newCampaign.budget || ""}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      budget: Number(e.target.value),
                    })
                  }
                  placeholder="Ej. 5000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={newCampaign.status}
                  onValueChange={(value) =>
                    setNewCampaign({
                      ...newCampaign,
                      status: value as "active" | "paused" | "completed",
                    })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activa</SelectItem>
                    <SelectItem value="paused">Pausada</SelectItem>
                    <SelectItem value="completed">Completada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Fecha de Inicio</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newCampaign.startDate || ""}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      startDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Fecha de Fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newCampaign.endDate || ""}
                  onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewCampaignDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={handleAddCampaign}>
              Crear Campaña
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar campaña */}
      <Dialog open={isEditCampaignDialogOpen} onOpenChange={setIsEditCampaignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Campaña Publicitaria</DialogTitle>
            <DialogDescription>Modifica los detalles de la campaña.</DialogDescription>
          </DialogHeader>
          {editCampaign && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nombre de la Campaña</Label>
                <Input
                  id="edit-name"
                  value={editCampaign.name}
                  onChange={(e) => setEditCampaign({ ...editCampaign, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-client">Cliente</Label>
                <Input
                  id="edit-client"
                  value={editCampaign.client}
                  onChange={(e) => setEditCampaign({ ...editCampaign, client: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-platform">Plataforma</Label>
                <Select
                  value={editCampaign.platform}
                  onValueChange={(value) => setEditCampaign({ ...editCampaign, platform: value })}
                >
                  <SelectTrigger id="edit-platform">
                    <SelectValue placeholder="Seleccionar plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Google Ads">Google Ads</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-budget">Presupuesto ($)</Label>
                  <Input
                    id="edit-budget"
                    type="number"
                    value={editCampaign.budget}
                    onChange={(e) =>
                      setEditCampaign({
                        ...editCampaign,
                        budget: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-spent">Gastado ($)</Label>
                  <Input
                    id="edit-spent"
                    type="number"
                    value={editCampaign.spent}
                    onChange={(e) =>
                      setEditCampaign({
                        ...editCampaign,
                        spent: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select
                  value={editCampaign.status}
                  onValueChange={(value) =>
                    setEditCampaign({
                      ...editCampaign,
                      status: value as "active" | "paused" | "completed",
                    })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activa</SelectItem>
                    <SelectItem value="paused">Pausada</SelectItem>
                    <SelectItem value="completed">Completada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-startDate">Fecha de Inicio</Label>
                  <Input
                    id="edit-startDate"
                    type="date"
                    value={editCampaign.startDate}
                    onChange={(e) =>
                      setEditCampaign({
                        ...editCampaign,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-endDate">Fecha de Fin</Label>
                  <Input
                    id="edit-endDate"
                    type="date"
                    value={editCampaign.endDate}
                    onChange={(e) =>
                      setEditCampaign({
                        ...editCampaign,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-performance">Rendimiento (%)</Label>
                <Input
                  id="edit-performance"
                  type="number"
                  min="0"
                  max="100"
                  value={editCampaign.performance}
                  onChange={(e) =>
                    setEditCampaign({
                      ...editCampaign,
                      performance: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCampaignDialogOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={handleEditCampaign}>
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará la campaña permanentemente y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCampaign} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
