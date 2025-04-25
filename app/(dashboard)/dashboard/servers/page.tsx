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
import { Plus, Search, Settings, Trash2, Edit, ChevronDown, ChevronUp } from "lucide-react"

// Simulated data
const servers = [
  { id: "4", name: "Server 4", coefficient: 12, active: true },
  { id: "5", name: "Server 5", coefficient: 3, active: true },
  { id: "6", name: "Server 6", coefficient: 19, active: true },
]

const ads = [
  {
    id: "1",
    name: "Casino Bonus 25%",
    portfolio: "Portfolio Principal",
    adAccount: "Cuenta 1",
    bm: "BM Principal",
    campaign: "Casino Verano",
    adSet: "Conjunto 1",
    budget: 250,
    api: "API WhatsApp 1",
    active: true,
  },
  {
    id: "2",
    name: "Ruleta Gratis",
    portfolio: "Portfolio Principal",
    adAccount: "Cuenta 2",
    bm: "BM Secundario",
    campaign: "Casino Promociones",
    adSet: "Conjunto 3",
    budget: 180,
    api: "API WhatsApp 2",
    active: true,
  },
  {
    id: "3",
    name: "Bono Bienvenida",
    portfolio: "Portfolio Secundario",
    adAccount: "Cuenta 3",
    bm: "BM Principal",
    campaign: "Nuevos Usuarios",
    adSet: "Conjunto 2",
    budget: 300,
    api: "API WhatsApp 1",
    active: false,
  },
]

export default function ServersPage() {
  const [activeTab, setActiveTab] = useState("server4")
  const [showServerSettings, setShowServerSettings] = useState(false)
  const [showAddAd, setShowAddAd] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null)

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
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Switch checked={server.active} />
                    </div>
                  </div>
                ))}
                <Button className="w-full mt-2 bg-[#148f77] hover:bg-[#0e6251]">
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
            <TabsTrigger value="server4">Server 4</TabsTrigger>
            <TabsTrigger value="server5">Server 5</TabsTrigger>
            <TabsTrigger value="server6">Server 6</TabsTrigger>
          </TabsList>
        </div>

        {["server4", "server5", "server6"].map((serverId) => (
          <TabsContent key={serverId} value={serverId} className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle>Server {serverId.slice(-1)}</CardTitle>
                  <CardDescription>
                    Coeficiente: {servers.find((s) => s.id === serverId.slice(-1))?.coefficient}%
                  </CardDescription>
                </div>
                <Switch checked={servers.find((s) => s.id === serverId.slice(-1))?.active} onCheckedChange={() => {}} />
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
                          <Label htmlFor="ad">Anuncio</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar anuncio" />
                            </SelectTrigger>
                            <SelectContent>
                              {ads.map((ad) => (
                                <SelectItem key={ad.id} value={ad.id}>
                                  {ad.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="budget">Presupuesto Diario ($)</Label>
                          <Input id="budget" type="number" defaultValue="200" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="api">API WhatsApp</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar API" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="api1">API WhatsApp 1</SelectItem>
                              <SelectItem value="api2">API WhatsApp 2</SelectItem>
                              <SelectItem value="api3">API WhatsApp 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowAddAd(false)}>
                          Cancelar
                        </Button>
                        <Button className="bg-[#148f77] hover:bg-[#0e6251]" onClick={() => setShowAddAd(false)}>
                          Agregar
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
                      {filteredAds.map((ad) => (
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
                              <Switch checked={ad.active} />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
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
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registro Diario</CardTitle>
                <CardDescription>Métricas del día actual para Server {serverId.slice(-1)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Leads Generados</p>
                    <p className="text-2xl font-bold">1,245</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Conversiones</p>
                    <p className="text-2xl font-bold">312</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Tasa de Conversión</p>
                    <p className="text-2xl font-bold">25.1%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Gasto Total</p>
                    <p className="text-2xl font-bold">$1,845.75</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
