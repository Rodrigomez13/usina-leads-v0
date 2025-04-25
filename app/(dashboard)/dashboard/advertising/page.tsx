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
import { Switch } from "@/components/ui/switch";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Facebook,
  Instagram,
  ChevronDown,
  ChevronUp,
  BarChart3,
  DollarSign,
  Settings,
} from "lucide-react";

// Simulated data for campaigns
const campaigns = [
  {
    id: "1",
    name: "Casino Verano",
    platform: "Facebook",
    status: "active",
    budget: 500,
    spent: 325.75,
    leads: 850,
    conversions: 212,
    cpl: 0.38,
    cpc: 1.54,
    roi: 3.2,
  },
  {
    id: "2",
    name: "Ruleta Promoción",
    platform: "Instagram",
    status: "active",
    budget: 350,
    spent: 280.5,
    leads: 620,
    conversions: 155,
    cpl: 0.45,
    cpc: 1.81,
    roi: 2.8,
  },
  {
    id: "3",
    name: "Bono Bienvenida",
    platform: "Facebook",
    status: "paused",
    budget: 400,
    spent: 180.25,
    leads: 420,
    conversions: 105,
    cpl: 0.43,
    cpc: 1.72,
    roi: 2.9,
  },
  {
    id: "4",
    name: "Slots Gratis",
    platform: "Instagram",
    status: "active",
    budget: 300,
    spent: 225.8,
    leads: 580,
    conversions: 145,
    cpl: 0.39,
    cpc: 1.56,
    roi: 3.1,
  },
  {
    id: "5",
    name: "Poker Night",
    platform: "Facebook",
    status: "scheduled",
    budget: 450,
    spent: 0,
    leads: 0,
    conversions: 0,
    cpl: 0,
    cpc: 0,
    roi: 0,
  },
];

// Simulated data for ad accounts
const adAccounts = [
  {
    id: "1",
    name: "Cuenta Principal",
    platform: "Facebook",
    status: "active",
    spendLimit: 1000,
    spent: 650.25,
    remaining: 349.75,
  },
  {
    id: "2",
    name: "Cuenta Secundaria",
    platform: "Facebook",
    status: "active",
    spendLimit: 800,
    spent: 420.5,
    remaining: 379.5,
  },
  {
    id: "3",
    name: "Cuenta Instagram",
    platform: "Instagram",
    status: "active",
    spendLimit: 600,
    spent: 380.75,
    remaining: 219.25,
  },
  {
    id: "4",
    name: "Cuenta Respaldo",
    platform: "Facebook",
    status: "paused",
    spendLimit: 500,
    spent: 0,
    remaining: 500,
  },
];

// Simulated data for ads
const ads = [
  {
    id: "1",
    name: "Casino Bonus 25%",
    campaign: "Casino Verano",
    platform: "Facebook",
    status: "active",
    budget: 100,
    spent: 78.5,
    leads: 210,
    conversions: 52,
    cpl: 0.37,
    cpc: 1.51,
  },
  {
    id: "2",
    name: "Ruleta Gratis",
    campaign: "Ruleta Promoción",
    platform: "Instagram",
    status: "active",
    budget: 80,
    spent: 65.25,
    leads: 150,
    conversions: 37,
    cpl: 0.44,
    cpc: 1.76,
  },
  {
    id: "3",
    name: "Bono Bienvenida 50%",
    campaign: "Bono Bienvenida",
    platform: "Facebook",
    status: "paused",
    budget: 90,
    spent: 45.75,
    leads: 105,
    conversions: 26,
    cpl: 0.44,
    cpc: 1.76,
  },
  {
    id: "4",
    name: "50 Giros Gratis",
    campaign: "Slots Gratis",
    platform: "Instagram",
    status: "active",
    budget: 70,
    spent: 58.2,
    leads: 140,
    conversions: 35,
    cpl: 0.42,
    cpc: 1.66,
  },
  {
    id: "5",
    name: "Torneo Poker $1000",
    campaign: "Poker Night",
    platform: "Facebook",
    status: "scheduled",
    budget: 110,
    spent: 0,
    leads: 0,
    conversions: 0,
    cpl: 0,
    cpc: 0,
  },
];

export default function AdvertisingPage() {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);

  const toggleCampaignDetails = (campaignId: string) => {
    if (expandedCampaign === campaignId) {
      setExpandedCampaign(null);
    } else {
      setExpandedCampaign(campaignId);
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAds = ads.filter(
    (ad) =>
      ad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Publicidad</h1>
        <p className="text-muted-foreground">
          Gestiona tus campañas publicitarias y anuncios.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gasto Total</CardTitle>
            <DollarSign className="h-4 w-4 text-[#148f77]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,012.30</div>
            <p className="text-xs text-muted-foreground">
              +8.2% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leads Generados
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-[#148f77]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,470</div>
            <p className="text-xs text-muted-foreground">
              +15.3% respecto al mes anterior
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversiones</CardTitle>
            <BarChart3 className="h-4 w-4 text-[#148f77]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">617</div>
            <p className="text-xs text-muted-foreground">
              Tasa de conversión: 25.0%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Promedio</CardTitle>
            <BarChart3 className="h-4 w-4 text-[#148f77]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.0x</div>
            <p className="text-xs text-muted-foreground">
              +0.2x respecto al mes anterior
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
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="ads">Anuncios</TabsTrigger>
          <TabsTrigger value="accounts">Cuentas Publicitarias</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar campañas..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="ml-4 bg-[#148f77] hover:bg-[#0e6251]">
              <Plus className="mr-2 h-4 w-4" />
              Nueva Campaña
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Campañas Publicitarias</CardTitle>
              <CardDescription>
                Gestiona tus campañas activas y programadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Plataforma</TableHead>
                    <TableHead>Presupuesto</TableHead>
                    <TableHead>Gastado</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <>
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleCampaignDetails(campaign.id)}
                            >
                              {expandedCampaign === campaign.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                            {campaign.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {campaign.platform === "Facebook" ? (
                              <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                            ) : (
                              <Instagram className="mr-2 h-4 w-4 text-pink-600" />
                            )}
                            {campaign.platform}
                          </div>
                        </TableCell>
                        <TableCell>${campaign.budget.toFixed(2)}</TableCell>
                        <TableCell>${campaign.spent.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              campaign.status === "active"
                                ? "default"
                                : "outline"
                            }
                            className={
                              campaign.status === "active"
                                ? "bg-green-500 hover:bg-green-600"
                                : campaign.status === "paused"
                                ? "text-yellow-500 border-yellow-500"
                                : "text-blue-500 border-blue-500"
                            }
                          >
                            {campaign.status === "active"
                              ? "Activa"
                              : campaign.status === "paused"
                              ? "Pausada"
                              : "Programada"}
                          </Badge>
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
                      {expandedCampaign === campaign.id && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <div className="p-4 bg-muted/50 rounded-md">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Leads</p>
                                  <p className="text-lg">{campaign.leads}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    Conversiones
                                  </p>
                                  <p className="text-lg">
                                    {campaign.conversions}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    Costo por Lead
                                  </p>
                                  <p className="text-lg">
                                    ${campaign.cpl.toFixed(2)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    Costo por Conversión
                                  </p>
                                  <p className="text-lg">
                                    ${campaign.cpc.toFixed(2)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">ROI</p>
                                  <p className="text-lg">
                                    {campaign.roi.toFixed(1)}x
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">
                                    Tasa de Conversión
                                  </p>
                                  <p className="text-lg">
                                    {campaign.leads > 0
                                      ? (
                                          (campaign.conversions /
                                            campaign.leads) *
                                          100
                                        ).toFixed(1)
                                      : "0.0"}
                                    %
                                  </p>
                                </div>
                              </div>
                              <div className="mt-4">
                                <Button variant="outline" size="sm">
                                  Ver Anuncios
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="space-y-4">
          <div className="flex items-center justify-between">
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
            <Button className="ml-4 bg-[#148f77] hover:bg-[#0e6251]">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Anuncio
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Anuncios</CardTitle>
              <CardDescription>
                Gestiona tus anuncios individuales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Campaña</TableHead>
                    <TableHead>Plataforma</TableHead>
                    <TableHead>Presupuesto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAds.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell className="font-medium">{ad.name}</TableCell>
                      <TableCell>{ad.campaign}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {ad.platform === "Facebook" ? (
                            <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                          ) : (
                            <Instagram className="mr-2 h-4 w-4 text-pink-600" />
                          )}
                          {ad.platform}
                        </div>
                      </TableCell>
                      <TableCell>${ad.budget.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            ad.status === "active" ? "default" : "outline"
                          }
                          className={
                            ad.status === "active"
                              ? "bg-green-500 hover:bg-green-600"
                              : ad.status === "paused"
                              ? "text-yellow-500 border-yellow-500"
                              : "text-blue-500 border-blue-500"
                          }
                        >
                          {ad.status === "active"
                            ? "Activo"
                            : ad.status === "paused"
                            ? "Pausado"
                            : "Programado"}
                        </Badge>
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
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Configurar API
              </Button>
            </div>
            <Button className="bg-[#148f77] hover:bg-[#0e6251]">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Cuenta
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cuentas Publicitarias</CardTitle>
              <CardDescription>
                Gestiona tus cuentas de Facebook e Instagram Ads.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Plataforma</TableHead>
                    <TableHead>Límite de Gasto</TableHead>
                    <TableHead>Gastado</TableHead>
                    <TableHead>Restante</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adAccounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">
                        {account.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {account.platform === "Facebook" ? (
                            <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                          ) : (
                            <Instagram className="mr-2 h-4 w-4 text-pink-600" />
                          )}
                          {account.platform}
                        </div>
                      </TableCell>
                      <TableCell>${account.spendLimit.toFixed(2)}</TableCell>
                      <TableCell>${account.spent.toFixed(2)}</TableCell>
                      <TableCell>${account.remaining.toFixed(2)}</TableCell>
                      <TableCell>
                        <Switch checked={account.status === "active"} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rendimiento por Plataforma</CardTitle>
              <CardDescription>
                Comparación de rendimiento entre plataformas publicitarias.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Gráfico de rendimiento por plataforma
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento por Campaña</CardTitle>
                <CardDescription>
                  Comparación de rendimiento entre campañas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Gráfico de rendimiento por campaña
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tendencia de Conversiones</CardTitle>
                <CardDescription>
                  Evolución de conversiones en el tiempo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Gráfico de tendencia de conversiones
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Gasto</CardTitle>
              <CardDescription>
                Distribución del gasto publicitario por campaña.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  Gráfico de distribución de gasto
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
