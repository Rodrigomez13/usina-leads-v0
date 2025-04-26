"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { toast } from "@/components/ui/use-toast"
import { Plus, Search, Settings, Trash2, Edit, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

// Tipos para nuestros datos
interface Server {
  id: string
  name: string
  coefficient: number
  active: boolean
  [key: string]: any
}

interface Ad {
  id: string
  name: string
  portfolio: string
  adAccount: string
  bm: string
  campaign: string
  adSet: string
  budget: number
  api: string
  active: boolean
  [key: string]: any
}

interface ServersClientProps {
  initialServers: Server[]
  initialAds: Ad[]
}

export function ServersClient({ initialServers, initialAds }: ServersClientProps) {
  const router = useRouter()

  // Estados para los datos
  const [servers, setServers] = useState<Server[]>(initialServers)
  const [ads, setAds] = useState<Ad[]>(initialAds)
  const [activeTab, setActiveTab] = useState(initialServers[0]?.id ? `server${initialServers[0].id}` : "")
  const [showServerSettings, setShowServerSettings] = useState(false)
  const [showAddAd, setShowAddAd] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Estados para edición
  const [editingServer, setEditingServer] = useState<Server | null>(null)
  const [editingAd, setEditingAd] = useState<Ad | null>(null)
  const [showEditServer, setShowEditServer] = useState(false)
  const [showEditAd, setShowEditAd] = useState(false)

  // Estados para eliminación
  const [serverToDelete, setServerToDelete] = useState<string | null>(null)
  const [adToDelete, setAdToDelete] = useState<string | null>(null)

  // Estados para nuevo servidor
  const [newServer, setNewServer] = useState<Partial<Server>>({
    name: "",
    coefficient: 10,
    active: true,
  })

  // Estados para nuevo anuncio
  const [newAd, setNewAd] = useState<Partial<Ad>>({
    name: "",
    budget: 200,
    api: "",
    active: true,
  })

  // Funciones para manejar servidores
  const handleToggleServer = async (serverId: string) => {
    try {
      setIsLoading(true)
      const server = servers.find((s) => s.id === serverId)
      if (!server) return

      const { error } = await supabase
        .from("servers")
        .update({
          active: !server.active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", serverId)

      if (error) throw error

      setServers(servers.map((s) => (s.id === serverId ? { ...s, active: !s.active } : s)))

      toast({
        title: "Estado actualizado",
        description: `El servidor ha sido ${server.active ? "desactivado" : "activado"}.`,
        duration: 3000,
      })
    } catch (err) {
      console.error("Error al actualizar servidor:", err)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del servidor.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditServer = (server: Server) => {
    setEditingServer({ ...server })
    setShowEditServer(true)
  }

  const handleSaveServerEdit = async () => {
    if (!editingServer) return

    try {
      setIsLoading(true)

      const { error } = await supabase
        .from("servers")
        .update({
          name: editingServer.name,
          coefficient: editingServer.coefficient,
          active: editingServer.active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingServer.id)

      if (error) throw error

      setServers(servers.map((server) => (server.id === editingServer.id ? editingServer : server)))
      setShowEditServer(false)

      toast({
        title: "Servidor actualizado",
        description: `Los cambios en ${editingServer.name} han sido guardados.`,
        duration: 3000,
      })

      router.refresh()
    } catch (err) {
      console.error("Error al actualizar servidor:", err)
      toast({
        title: "Error",
        description: "No se pudo actualizar el servidor.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddServer = async () => {
    try {
      setIsLoading(true)

      const { data, error } = await supabase
        .from("servers")
        .insert({
          name: newServer.name,
          coefficient: newServer.coefficient,
          active: newServer.active,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error

      setServers([...servers, data])
      setNewServer({
        name: "",
        coefficient: 10,
        active: true,
      })
      setShowEditServer(false)

      toast({
        title: "Servidor añadido",
        description: `${data.name} ha sido añadido correctamente.`,
        duration: 3000,
      })

      router.refresh()
    } catch (err) {
      console.error("Error al crear servidor:", err)
      toast({
        title: "Error",
        description: "No se pudo crear el servidor.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteServer = (serverId: string) => {
    setServerToDelete(serverId)
  }

  const confirmDeleteServer = async () => {
    if (!serverToDelete) return

    try {
      setIsLoading(true)

      const serverName = servers.find((s) => s.id === serverToDelete)?.name

      const { error } = await supabase.from("servers").delete().eq("id", serverToDelete)

      if (error) throw error

      setServers(servers.filter((server) => server.id !== serverToDelete))
      setServerToDelete(null)

      toast({
        title: "Servidor eliminado",
        description: `${serverName} ha sido eliminado correctamente.`,
        duration: 3000,
      })

      router.refresh()
    } catch (err) {
      console.error("Error al eliminar servidor:", err)
      toast({
        title: "Error",
        description: "No se pudo eliminar el servidor.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Funciones para manejar anuncios
  const handleToggleAd = async (adId: string) => {
    try {
      setIsLoading(true)
      const ad = ads.find((a) => a.id === adId)
      if (!ad) return

      const { error } = await supabase
        .from("ads")
        .update({
          active: !ad.active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", adId)

      if (error) throw error

      setAds(ads.map((ad) => (ad.id === adId ? { ...ad, active: !ad.active } : ad)))

      toast({
        title: "Estado actualizado",
        description: `El anuncio ha sido ${ad.active ? "desactivado" : "activado"}.`,
        duration: 3000,
      })

      router.refresh()
    } catch (err) {
      console.error("Error al actualizar anuncio:", err)
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del anuncio.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditAd = (ad: Ad) => {
    setEditingAd({ ...ad })
    setShowEditAd(true)
  }

  const handleSaveAdEdit = async () => {
    if (!editingAd) return

    try {
      setIsLoading(true)

      const { error } = await supabase
        .from("ads")
        .update({
          name: editingAd.name,
          portfolio: editingAd.portfolio,
          adAccount: editingAd.adAccount,
          bm: editingAd.bm,
          campaign: editingAd.campaign,
          adSet: editingAd.adSet,
          budget: editingAd.budget,
          api: editingAd.api,
          active: editingAd.active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingAd.id)

      if (error) throw error

      setAds(ads.map((ad) => (ad.id === editingAd.id ? editingAd : ad)))
      setShowEditAd(false)

      toast({
        title: "Anuncio actualizado",
        description: `Los cambios en ${editingAd.name} han sido guardados.`,
        duration: 3000,
      })

      router.refresh()
    } catch (err) {
      console.error("Error al actualizar anuncio:", err)
      toast({
        title: "Error",
        description: "No se pudo actualizar el anuncio.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddAd = async () => {
    try {
      setIsLoading(true)

      const { data, error } = await supabase
        .from("ads")
        .insert({
          name: newAd.name,
          portfolio: "Portfolio Principal",
          adAccount: "Cuenta 1",
          bm: "BM Principal",
          campaign: "Nueva Campaña",
          adSet: "Conjunto 1",
          budget: newAd.budget,
          api: newAd.api,
          active: newAd.active,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error

      setAds([...ads, data])
      setShowAddAd(false)
      setNewAd({
        name: "",
        budget: 200,
        api: "",
        active: true,
      })

      toast({
        title: "Anuncio añadido",
        description: `${data.name} ha sido añadido correctamente.`,
        duration: 3000,
      })

      router.refresh()
    } catch (err) {
      console.error("Error al crear anuncio:", err)
      toast({
        title: "Error",
        description: "No se pudo crear el anuncio.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAd = (adId: string) => {
    setAdToDelete(adId)
  }

  const confirmDeleteAd = async () => {
    if (!adToDelete) return

    try {
      setIsLoading(true)

      const adName = ads.find((a) => a.id === adToDelete)?.name

      const { error } = await supabase.from("ads").delete().eq("id", adToDelete)

      if (error) throw error

      setAds(ads.filter((ad) => ad.id !== adToDelete))
      setAdToDelete(null)

      toast({
        title: "Anuncio eliminado",
        description: `${adName} ha sido eliminado correctamente.`,
        duration: 3000,
      })

      router.refresh()
    } catch (err) {
      console.error("Error al eliminar anuncio:", err)
      toast({
        title: "Error",
        description: "No se pudo eliminar el anuncio.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleDetails = (adId: string) => {
    if (expandedDetails === adId) {
      setExpandedDetails(null)
    } else {
      setExpandedDetails(adId)
    }
  }

  const filteredAds = ads.filter(
    (ad) =>
      ad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.campaign.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Servidores</h1>
        <p className="text-muted-foreground">Gestiona los servidores y sus anuncios activos.</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Dialog open={showServerSettings} onOpenChange={setShowServerSettings}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configuración de Servidores
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Configuración de Servidores</DialogTitle>
                <DialogDescription>Administra los servidores y sus coeficientes.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {servers.map((server) => (
                  <div key={server.id} className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{server.name}</p>
                      <p className="text-sm text-muted-foreground">Coeficiente: {server.coefficient}%</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditServer(server)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteServer(server.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Switch checked={server.active} onCheckedChange={() => handleToggleServer(server.id)} />
                    </div>
                  </div>
                ))}
                <Button
                  className="w-full mt-2 bg-[#148f77] hover:bg-[#0e6251]"
                  onClick={() => {
                    setNewServer({
                      name: `Server ${servers.length + 1}`,
                      coefficient: 10,
                      active: true,
                    })
                    setShowEditServer(true)
                    setEditingServer(null)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar Servidor
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            {servers.map((server) => (
              <TabsTrigger key={server.id} value={`server${server.id}`}>
                {server.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {servers.map((server) => (
          <TabsContent key={server.id} value={`server${server.id}`} className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>{server.name}</CardTitle>
                  <CardDescription>Coeficiente: {server.coefficient}%</CardDescription>
                </div>
                <Switch checked={server.active} onCheckedChange={() => handleToggleServer(server.id)} />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar anuncios..."
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Dialog open={showAddAd} onOpenChange={setShowAddAd}>
                    <DialogTrigger asChild>
                      <Button className="ml-4 bg-[#148f77] hover:bg-[#0e6251]">
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar Anuncio
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar Anuncio al Servidor</DialogTitle>
                        <DialogDescription>Selecciona un anuncio para activar en este servidor.</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="ad-name">Nombre del Anuncio</Label>
                          <Input
                            id="ad-name"
                            value={newAd.name || ""}
                            onChange={(e) => setNewAd({ ...newAd, name: e.target.value })}
                            placeholder="Nombre del anuncio"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">Presupuesto Diario ($)</Label>
                          <Input
                            id="budget"
                            type="number"
                            value={newAd.budget || 200}
                            onChange={(e) => setNewAd({ ...newAd, budget: Number(e.target.value) })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="api">API WhatsApp</Label>
                          <Select value={newAd.api || ""} onValueChange={(value) => setNewAd({ ...newAd, api: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar API" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="API WhatsApp 1">API WhatsApp 1</SelectItem>
                              <SelectItem value="API WhatsApp 2">API WhatsApp 2</SelectItem>
                              <SelectItem value="API WhatsApp 3">API WhatsApp 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddAd(false)}>
                          Cancelar
                        </Button>
                        <Button
                          className="bg-[#148f77] hover:bg-[#0e6251]"
                          onClick={handleAddAd}
                          disabled={!newAd.name || !newAd.api || isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Agregando...
                            </>
                          ) : (
                            "Agregar"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Anuncio</TableHead>
                        <TableHead>Presupuesto</TableHead>
                        <TableHead>API</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAds.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            No se encontraron anuncios.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredAds.map((ad) => (
                          <>
                            <TableRow key={ad.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center">
                                  <Button variant="ghost" size="icon" onClick={() => toggleDetails(ad.id)}>
                                    {expandedDetails === ad.id ? (
                                      <ChevronUp className="h-4 w-4" />
                                    ) : (
                                      <ChevronDown className="h-4 w-4" />
                                    )}
                                  </Button>
                                  <div>
                                    {ad.name}
                                    <p className="text-xs text-muted-foreground">{ad.campaign}</p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>${ad.budget}</TableCell>
                              <TableCell>{ad.api}</TableCell>
                              <TableCell>
                                <Switch checked={ad.active} onCheckedChange={() => handleToggleAd(ad.id)} />
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="icon" onClick={() => handleEditAd(ad)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="icon" onClick={() => handleDeleteAd(ad.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                            {expandedDetails === ad.id && (
                              <TableRow>
                                <TableCell colSpan={5}>
                                  <div className="p-2 bg-muted/50 rounded-md">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <p className="text-sm font-medium">Portfolio:</p>
                                        <p className="text-sm text-muted-foreground">{ad.portfolio}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Cuenta Publicitaria:</p>
                                        <p className="text-sm text-muted-foreground">{ad.adAccount}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Business Manager:</p>
                                        <p className="text-sm text-muted-foreground">{ad.bm}</p>
                                      </div>
                                      <div>
                                        <p className="text-sm font-medium">Conjunto de Anuncios:</p>
                                        <p className="text-sm text-muted-foreground">{ad.adSet}</p>
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registro Diario</CardTitle>
                <CardDescription>Métricas del día actual para {server.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Leads Generados</p>
                    <p className="text-2xl font-bold">{server.stats?.daily_leads || 0}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Conversiones</p>
                    <p className="text-2xl font-bold">{server.stats?.daily_conversions || 0}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Tasa de Conversión</p>
                    <p className="text-2xl font-bold">{server.stats?.daily_conversion_rate || 0}%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Gasto Total</p>
                    <p className="text-2xl font-bold">${server.stats?.daily_expense?.toFixed(2) || "0.00"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Modal para editar servidor */}
      <Dialog open={showEditServer} onOpenChange={setShowEditServer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingServer ? `Editar ${editingServer.name}` : "Agregar Servidor"}</DialogTitle>
            <DialogDescription>
              {editingServer ? "Modifica los detalles del servidor." : "Ingresa los detalles del nuevo servidor."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="server-name">Nombre del Servidor</Label>
              <Input
                id="server-name"
                value={editingServer ? editingServer.name : newServer.name || ""}
                onChange={(e) => {
                  if (editingServer) {
                    setEditingServer({ ...editingServer, name: e.target.value })
                  } else {
                    setNewServer({ ...newServer, name: e.target.value })
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coefficient">Coeficiente (%)</Label>
              <Input
                id="coefficient"
                type="number"
                value={editingServer ? editingServer.coefficient : newServer.coefficient || 10}
                onChange={(e) => {
                  if (editingServer) {
                    setEditingServer({ ...editingServer, coefficient: Number(e.target.value) })
                  } else {
                    setNewServer({ ...newServer, coefficient: Number(e.target.value) })
                  }
                }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={editingServer ? editingServer.active : newServer.active || true}
                onCheckedChange={(checked) => {
                  if (editingServer) {
                    setEditingServer({ ...editingServer, active: checked })
                  } else {
                    setNewServer({ ...newServer, active: checked })
                  }
                }}
              />
              <Label htmlFor="active">Activo</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditServer(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={editingServer ? handleSaveServerEdit : handleAddServer}
              disabled={(editingServer ? !editingServer.name : !newServer.name) || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editingServer ? "Guardando..." : "Agregando..."}
                </>
              ) : editingServer ? (
                "Guardar Cambios"
              ) : (
                "Agregar Servidor"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para editar anuncio */}
      <Dialog open={showEditAd} onOpenChange={setShowEditAd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Anuncio</DialogTitle>
            <DialogDescription>Modifica los detalles del anuncio.</DialogDescription>
          </DialogHeader>
          {editingAd && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-ad-name">Nombre del Anuncio</Label>
                <Input
                  id="edit-ad-name"
                  value={editingAd.name}
                  onChange={(e) => setEditingAd({ ...editingAd, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-budget">Presupuesto Diario ($)</Label>
                <Input
                  id="edit-budget"
                  type="number"
                  value={editingAd.budget}
                  onChange={(e) => setEditingAd({ ...editingAd, budget: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-api">API WhatsApp</Label>
                <Select value={editingAd.api} onValueChange={(value) => setEditingAd({ ...editingAd, api: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar API" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="API WhatsApp 1">API WhatsApp 1</SelectItem>
                    <SelectItem value="API WhatsApp 2">API WhatsApp 2</SelectItem>
                    <SelectItem value="API WhatsApp 3">API WhatsApp 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-campaign">Campaña</Label>
                <Input
                  id="edit-campaign"
                  value={editingAd.campaign}
                  onChange={(e) => setEditingAd({ ...editingAd, campaign: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-portfolio">Portfolio</Label>
                  <Input
                    id="edit-portfolio"
                    value={editingAd.portfolio}
                    onChange={(e) => setEditingAd({ ...editingAd, portfolio: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-adAccount">Cuenta Publicitaria</Label>
                  <Input
                    id="edit-adAccount"
                    value={editingAd.adAccount}
                    onChange={(e) => setEditingAd({ ...editingAd, adAccount: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-bm">Business Manager</Label>
                  <Input
                    id="edit-bm"
                    value={editingAd.bm}
                    onChange={(e) => setEditingAd({ ...editingAd, bm: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-adSet">Conjunto de Anuncios</Label>
                  <Input
                    id="edit-adSet"
                    value={editingAd.adSet}
                    onChange={(e) => setEditingAd({ ...editingAd, adSet: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={editingAd.active}
                  onCheckedChange={(checked) => setEditingAd({ ...editingAd, active: checked })}
                />
                <Label htmlFor="edit-active">Activo</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditAd(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleSaveAdEdit}
              disabled={!editingAd?.name || isLoading}
            >
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

      {/* Diálogo de confirmación para eliminar servidor */}
      <AlertDialog open={!!serverToDelete} onOpenChange={() => setServerToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el servidor permanentemente y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteServer}
              className="bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
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

      {/* Diálogo de confirmación para eliminar anuncio */}
      <AlertDialog open={!!adToDelete} onOpenChange={() => setAdToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el anuncio permanentemente y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteAd} className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
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
    </div>
  )
}
