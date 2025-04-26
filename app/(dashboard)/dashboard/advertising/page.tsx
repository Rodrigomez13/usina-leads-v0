"use client";

import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
import { useToast } from "@/components/ui/use-toast";

// Simulated data for campaigns
const initialCampaigns = [
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
const initialAdAccounts = [
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
const initialAds = [
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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("campaigns");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCampaign, setExpandedCampaign] = useState<string | null>(null);

  // State for data
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [adAccounts, setAdAccounts] = useState(initialAdAccounts);
  const [ads, setAds] = useState(initialAds);

  // State for dialogs
  const [isNewCampaignDialogOpen, setIsNewCampaignDialogOpen] = useState(false);
  const [isNewAdDialogOpen, setIsNewAdDialogOpen] = useState(false);
  const [isNewAccountDialogOpen, setIsNewAccountDialogOpen] = useState(false);
  const [isEditCampaignDialogOpen, setIsEditCampaignDialogOpen] =
    useState(false);
  const [isEditAdDialogOpen, setIsEditAdDialogOpen] = useState(false);
  const [isEditAccountDialogOpen, setIsEditAccountDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isApiConfigDialogOpen, setIsApiConfigDialogOpen] = useState(false);

  // State for form data
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    platform: "Facebook",
    budget: 0,
    status: "active",
  });
  const [newAd, setNewAd] = useState({
    name: "",
    campaign: "",
    platform: "Facebook",
    budget: 0,
    status: "active",
  });
  const [newAccount, setNewAccount] = useState({
    name: "",
    platform: "Facebook",
    spendLimit: 0,
    status: "active",
  });
  const [editItem, setEditItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<{
    id: string;
    type: string;
  } | null>(null);
  const [apiConfig, setApiConfig] = useState({
    apiKey: "",
    apiSecret: "",
    accessToken: "",
  });

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

  const filteredAdAccounts = adAccounts.filter((account) =>
    account.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Campaign functions
  const handleAddCampaign = () => {
    if (!newCampaign.name || newCampaign.budget <= 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const newId = (campaigns.length + 1).toString();
    const campaign = {
      id: newId,
      name: newCampaign.name,
      platform: newCampaign.platform,
      status: newCampaign.status,
      budget: newCampaign.budget,
      spent: 0,
      leads: 0,
      conversions: 0,
      cpl: 0,
      cpc: 0,
      roi: 0,
    };

    setCampaigns([...campaigns, campaign]);
    setIsNewCampaignDialogOpen(false);
    setNewCampaign({
      name: "",
      platform: "Facebook",
      budget: 0,
      status: "active",
    });

    toast({
      title: "Campaña creada",
      description: `La campaña "${campaign.name}" ha sido creada exitosamente.`,
    });
  };

  const handleEditCampaign = () => {
    if (!editItem) return;

    const updatedCampaigns = campaigns.map((campaign) =>
      campaign.id === editItem.id ? { ...campaign, ...editItem } : campaign
    );

    setCampaigns(updatedCampaigns);
    setIsEditCampaignDialogOpen(false);
    setEditItem(null);

    toast({
      title: "Campaña actualizada",
      description: `La campaña ha sido actualizada exitosamente.`,
    });
  };

  const openEditCampaignDialog = (campaign: any) => {
    setEditItem({ ...campaign });
    setIsEditCampaignDialogOpen(true);
  };

  const toggleCampaignStatus = (id: string) => {
    const updatedCampaigns = campaigns.map((campaign) => {
      if (campaign.id === id) {
        const newStatus = campaign.status === "active" ? "paused" : "active";
        return { ...campaign, status: newStatus };
      }
      return campaign;
    });

    setCampaigns(updatedCampaigns);

    const campaign = campaigns.find((c) => c.id === id);
    const newStatus = campaign?.status === "active" ? "pausada" : "activada";

    toast({
      title: "Estado actualizado",
      description: `La campaña ha sido ${newStatus}.`,
    });
  };

  // Ad functions
  const handleAddAd = () => {
    if (!newAd.name || !newAd.campaign || newAd.budget <= 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const newId = (ads.length + 1).toString();
    const ad = {
      id: newId,
      name: newAd.name,
      campaign: newAd.campaign,
      platform: newAd.platform,
      status: newAd.status,
      budget: newAd.budget,
      spent: 0,
      leads: 0,
      conversions: 0,
      cpl: 0,
      cpc: 0,
    };

    setAds([...ads, ad]);
    setIsNewAdDialogOpen(false);
    setNewAd({
      name: "",
      campaign: "",
      platform: "Facebook",
      budget: 0,
      status: "active",
    });

    toast({
      title: "Anuncio creado",
      description: `El anuncio "${ad.name}" ha sido creado exitosamente.`,
    });
  };

  const handleEditAd = () => {
    if (!editItem) return;

    const updatedAds = ads.map((ad) =>
      ad.id === editItem.id ? { ...ad, ...editItem } : ad
    );

    setAds(updatedAds);
    setIsEditAdDialogOpen(false);
    setEditItem(null);

    toast({
      title: "Anuncio actualizado",
      description: `El anuncio ha sido actualizado exitosamente.`,
    });
  };

  const openEditAdDialog = (ad: any) => {
    setEditItem({ ...ad });
    setIsEditAdDialogOpen(true);
  };

  const toggleAdStatus = (id: string) => {
    const updatedAds = ads.map((ad) => {
      if (ad.id === id) {
        const newStatus = ad.status === "active" ? "paused" : "active";
        return { ...ad, status: newStatus };
      }
      return ad;
    });

    setAds(updatedAds);

    const ad = ads.find((a) => a.id === id);
    const newStatus = ad?.status === "active" ? "pausado" : "activado";

    toast({
      title: "Estado actualizado",
      description: `El anuncio ha sido ${newStatus}.`,
    });
  };

  // Account functions
  const handleAddAccount = () => {
    if (!newAccount.name || newAccount.spendLimit <= 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const newId = (adAccounts.length + 1).toString();
    const account = {
      id: newId,
      name: newAccount.name,
      platform: newAccount.platform,
      status: newAccount.status,
      spendLimit: newAccount.spendLimit,
      spent: 0,
      remaining: newAccount.spendLimit,
    };

    setAdAccounts([...adAccounts, account]);
    setIsNewAccountDialogOpen(false);
    setNewAccount({
      name: "",
      platform: "Facebook",
      spendLimit: 0,
      status: "active",
    });

    toast({
      title: "Cuenta creada",
      description: `La cuenta "${account.name}" ha sido creada exitosamente.`,
    });
  };

  const handleEditAccount = () => {
    if (!editItem) return;

    const updatedAccounts = adAccounts.map((account) =>
      account.id === editItem.id
        ? {
            ...account,
            ...editItem,
            remaining: editItem.spendLimit - account.spent,
          }
        : account
    );

    setAdAccounts(updatedAccounts);
    setIsEditAccountDialogOpen(false);
    setEditItem(null);

    toast({
      title: "Cuenta actualizada",
      description: `La cuenta ha sido actualizada exitosamente.`,
    });
  };

  const openEditAccountDialog = (account: any) => {
    setEditItem({ ...account });
    setIsEditAccountDialogOpen(true);
  };

  const toggleAccountStatus = (id: string) => {
    const updatedAccounts = adAccounts.map((account) => {
      if (account.id === id) {
        const newStatus = account.status === "active" ? "paused" : "active";
        return { ...account, status: newStatus };
      }
      return account;
    });

    setAdAccounts(updatedAccounts);

    const account = adAccounts.find((a) => a.id === id);
    const newStatus = account?.status === "active" ? "pausada" : "activada";

    toast({
      title: "Estado actualizado",
      description: `La cuenta ha sido ${newStatus}.`,
    });
  };

  // Delete functions
  const openDeleteDialog = (id: string, type: string) => {
    setDeleteItem({ id, type });
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!deleteItem) return;

    if (deleteItem.type === "campaign") {
      setCampaigns(
        campaigns.filter((campaign) => campaign.id !== deleteItem.id)
      );
      toast({
        title: "Campaña eliminada",
        description: "La campaña ha sido eliminada exitosamente.",
      });
    } else if (deleteItem.type === "ad") {
      setAds(ads.filter((ad) => ad.id !== deleteItem.id));
      toast({
        title: "Anuncio eliminado",
        description: "El anuncio ha sido eliminado exitosamente.",
      });
    } else if (deleteItem.type === "account") {
      setAdAccounts(
        adAccounts.filter((account) => account.id !== deleteItem.id)
      );
      toast({
        title: "Cuenta eliminada",
        description: "La cuenta ha sido eliminada exitosamente.",
      });
    }

    setIsDeleteDialogOpen(false);
    setDeleteItem(null);
  };

  // API Config function
  const handleSaveApiConfig = () => {
    if (!apiConfig.apiKey || !apiConfig.apiSecret) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    setIsApiConfigDialogOpen(false);

    toast({
      title: "Configuración guardada",
      description: "La configuración de la API ha sido guardada exitosamente.",
    });
  };

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
            <Button
              className="ml-4 bg-[#148f77] hover:bg-[#0e6251]"
              onClick={() => setIsNewCampaignDialogOpen(true)}
            >
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
                  {filteredCampaigns.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No se encontraron campañas que coincidan con tu
                        búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCampaigns.map((campaign) => (
                      <React.Fragment key={campaign.id}>
                        <TableRow>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  toggleCampaignDetails(campaign.id)
                                }
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
                                  ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                                  : campaign.status === "paused"
                                  ? "text-yellow-500 border-yellow-500 cursor-pointer"
                                  : "text-blue-500 border-blue-500 cursor-pointer"
                              }
                              onClick={() =>
                                campaign.status !== "scheduled" &&
                                toggleCampaignStatus(campaign.id)
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
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openEditCampaignDialog(campaign)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  openDeleteDialog(campaign.id, "campaign")
                                }
                              >
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
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setActiveTab("ads");
                                      setSearchQuery(campaign.name);
                                    }}
                                  >
                                    Ver Anuncios
                                  </Button>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))
                  )}
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
            <Button
              className="ml-4 bg-[#148f77] hover:bg-[#0e6251]"
              onClick={() => setIsNewAdDialogOpen(true)}
            >
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
                  {filteredAds.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No se encontraron anuncios que coincidan con tu
                        búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAds.map((ad) => (
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
                                ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                                : ad.status === "paused"
                                ? "text-yellow-500 border-yellow-500 cursor-pointer"
                                : "text-blue-500 border-blue-500 cursor-pointer"
                            }
                            onClick={() =>
                              ad.status !== "scheduled" && toggleAdStatus(ad.id)
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
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditAdDialog(ad)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openDeleteDialog(ad.id, "ad")}
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

        <TabsContent value="accounts" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setIsApiConfigDialogOpen(true)}
              >
                <Settings className="mr-2 h-4 w-4" />
                Configurar API
              </Button>
            </div>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={() => setIsNewAccountDialogOpen(true)}
            >
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
                  {filteredAdAccounts.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No se encontraron cuentas que coincidan con tu búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    adAccounts.map((account) => (
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
                          <Switch
                            checked={account.status === "active"}
                            onCheckedChange={() =>
                              toggleAccountStatus(account.id)
                            }
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditAccountDialog(account)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                openDeleteDialog(account.id, "account")
                              }
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

      {/* Nueva Campaña Dialog */}
      <Dialog
        open={isNewCampaignDialogOpen}
        onOpenChange={setIsNewCampaignDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Nueva Campaña</DialogTitle>
            <DialogDescription>
              Completa los detalles para crear una nueva campaña publicitaria.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre de la Campaña</Label>
              <Input
                id="name"
                value={newCampaign.name}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, name: e.target.value })
                }
                placeholder="Ej: Promoción de Verano"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="platform">Plataforma</Label>
              <Select
                value={newCampaign.platform}
                onValueChange={(value) =>
                  setNewCampaign({ ...newCampaign, platform: value })
                }
              >
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Selecciona una plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="budget">Presupuesto ($)</Label>
              <Input
                id="budget"
                type="number"
                value={newCampaign.budget || ""}
                onChange={(e) =>
                  setNewCampaign({
                    ...newCampaign,
                    budget: Number.parseFloat(e.target.value),
                  })
                }
                placeholder="Ej: 500"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Estado</Label>
              <Select
                value={newCampaign.status}
                onValueChange={(value) =>
                  setNewCampaign({ ...newCampaign, status: value })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="paused">Pausada</SelectItem>
                  <SelectItem value="scheduled">Programada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewCampaignDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddCampaign}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Crear Campaña
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Editar Campaña Dialog */}
      <Dialog
        open={isEditCampaignDialogOpen}
        onOpenChange={setIsEditCampaignDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Campaña</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la campaña.
            </DialogDescription>
          </DialogHeader>
          {editItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nombre de la Campaña</Label>
                <Input
                  id="edit-name"
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-platform">Plataforma</Label>
                <Select
                  value={editItem.platform}
                  onValueChange={(value) =>
                    setEditItem({ ...editItem, platform: value })
                  }
                >
                  <SelectTrigger id="edit-platform">
                    <SelectValue placeholder="Selecciona una plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-budget">Presupuesto ($)</Label>
                <Input
                  id="edit-budget"
                  type="number"
                  value={editItem.budget || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      budget: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Estado</Label>
                <Select
                  value={editItem.status}
                  onValueChange={(value) =>
                    setEditItem({ ...editItem, status: value })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activa</SelectItem>
                    <SelectItem value="paused">Pausada</SelectItem>
                    <SelectItem value="scheduled">Programada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditCampaignDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEditCampaign}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nuevo Anuncio Dialog */}
      <Dialog open={isNewAdDialogOpen} onOpenChange={setIsNewAdDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Anuncio</DialogTitle>
            <DialogDescription>
              Completa los detalles para crear un nuevo anuncio.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="ad-name">Nombre del Anuncio</Label>
              <Input
                id="ad-name"
                value={newAd.name}
                onChange={(e) => setNewAd({ ...newAd, name: e.target.value })}
                placeholder="Ej: Bono de Bienvenida 50%"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ad-campaign">Campaña</Label>
              <Select
                value={newAd.campaign}
                onValueChange={(value) =>
                  setNewAd({ ...newAd, campaign: value })
                }
              >
                <SelectTrigger id="ad-campaign">
                  <SelectValue placeholder="Selecciona una campaña" />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map((campaign) => (
                    <SelectItem key={campaign.id} value={campaign.name}>
                      {campaign.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ad-platform">Plataforma</Label>
              <Select
                value={newAd.platform}
                onValueChange={(value) =>
                  setNewAd({ ...newAd, platform: value })
                }
              >
                <SelectTrigger id="ad-platform">
                  <SelectValue placeholder="Selecciona una plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ad-budget">Presupuesto ($)</Label>
              <Input
                id="ad-budget"
                type="number"
                value={newAd.budget || ""}
                onChange={(e) =>
                  setNewAd({
                    ...newAd,
                    budget: Number.parseFloat(e.target.value),
                  })
                }
                placeholder="Ej: 100"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ad-status">Estado</Label>
              <Select
                value={newAd.status}
                onValueChange={(value) => setNewAd({ ...newAd, status: value })}
              >
                <SelectTrigger id="ad-status">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="paused">Pausado</SelectItem>
                  <SelectItem value="scheduled">Programado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewAdDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddAd}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Crear Anuncio
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Editar Anuncio Dialog */}
      <Dialog open={isEditAdDialogOpen} onOpenChange={setIsEditAdDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Anuncio</DialogTitle>
            <DialogDescription>
              Modifica los detalles del anuncio.
            </DialogDescription>
          </DialogHeader>
          {editItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-ad-name">Nombre del Anuncio</Label>
                <Input
                  id="edit-ad-name"
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-ad-campaign">Campaña</Label>
                <Select
                  value={editItem.campaign}
                  onValueChange={(value) =>
                    setEditItem({ ...editItem, campaign: value })
                  }
                >
                  <SelectTrigger id="edit-ad-campaign">
                    <SelectValue placeholder="Selecciona una campaña" />
                  </SelectTrigger>
                  <SelectContent>
                    {campaigns.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.name}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-ad-platform">Plataforma</Label>
                <Select
                  value={editItem.platform}
                  onValueChange={(value) =>
                    setEditItem({ ...editItem, platform: value })
                  }
                >
                  <SelectTrigger id="edit-ad-platform">
                    <SelectValue placeholder="Selecciona una plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-ad-budget">Presupuesto ($)</Label>
                <Input
                  id="edit-ad-budget"
                  type="number"
                  value={editItem.budget || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      budget: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-ad-status">Estado</Label>
                <Select
                  value={editItem.status}
                  onValueChange={(value) =>
                    setEditItem({ ...editItem, status: value })
                  }
                >
                  <SelectTrigger id="edit-ad-status">
                    <SelectValue placeholder="Selecciona un estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="paused">Pausado</SelectItem>
                    <SelectItem value="scheduled">Programado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditAdDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEditAd}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Nueva Cuenta Dialog */}
      <Dialog
        open={isNewAccountDialogOpen}
        onOpenChange={setIsNewAccountDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Cuenta</DialogTitle>
            <DialogDescription>
              Completa los detalles para agregar una nueva cuenta publicitaria.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="account-name">Nombre de la Cuenta</Label>
              <Input
                id="account-name"
                value={newAccount.name}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, name: e.target.value })
                }
                placeholder="Ej: Cuenta Principal"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="account-platform">Plataforma</Label>
              <Select
                value={newAccount.platform}
                onValueChange={(value) =>
                  setNewAccount({ ...newAccount, platform: value })
                }
              >
                <SelectTrigger id="account-platform">
                  <SelectValue placeholder="Selecciona una plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="account-limit">Límite de Gasto ($)</Label>
              <Input
                id="account-limit"
                type="number"
                value={newAccount.spendLimit || ""}
                onChange={(e) =>
                  setNewAccount({
                    ...newAccount,
                    spendLimit: Number.parseFloat(e.target.value),
                  })
                }
                placeholder="Ej: 1000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewAccountDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddAccount}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Agregar Cuenta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Editar Cuenta Dialog */}
      <Dialog
        open={isEditAccountDialogOpen}
        onOpenChange={setIsEditAccountDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Cuenta</DialogTitle>
            <DialogDescription>
              Modifica los detalles de la cuenta publicitaria.
            </DialogDescription>
          </DialogHeader>
          {editItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-account-name">Nombre de la Cuenta</Label>
                <Input
                  id="edit-account-name"
                  value={editItem.name}
                  onChange={(e) =>
                    setEditItem({ ...editItem, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-account-platform">Plataforma</Label>
                <Select
                  value={editItem.platform}
                  onValueChange={(value) =>
                    setEditItem({ ...editItem, platform: value })
                  }
                >
                  <SelectTrigger id="edit-account-platform">
                    <SelectValue placeholder="Selecciona una plataforma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-account-limit">Límite de Gasto ($)</Label>
                <Input
                  id="edit-account-limit"
                  type="number"
                  value={editItem.spendLimit || ""}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      spendLimit: Number.parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditAccountDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleEditAccount}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* API Config Dialog */}
      <Dialog
        open={isApiConfigDialogOpen}
        onOpenChange={setIsApiConfigDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Configurar API</DialogTitle>
            <DialogDescription>
              Configura las credenciales de la API de Facebook/Instagram Ads.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                value={apiConfig.apiKey}
                onChange={(e) =>
                  setApiConfig({ ...apiConfig, apiKey: e.target.value })
                }
                placeholder="Ingresa tu API Key"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="api-secret">API Secret</Label>
              <Input
                id="api-secret"
                type="password"
                value={apiConfig.apiSecret}
                onChange={(e) =>
                  setApiConfig({ ...apiConfig, apiSecret: e.target.value })
                }
                placeholder="Ingresa tu API Secret"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="access-token">Access Token</Label>
              <Input
                id="access-token"
                value={apiConfig.accessToken}
                onChange={(e) =>
                  setApiConfig({ ...apiConfig, accessToken: e.target.value })
                }
                placeholder="Ingresa tu Access Token (opcional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsApiConfigDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveApiConfig}
              className="bg-[#148f77] hover:bg-[#0e6251]"
            >
              Guardar Configuración
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteItem?.type === "campaign" &&
                "Esta acción eliminará la campaña y no se puede deshacer."}
              {deleteItem?.type === "ad" &&
                "Esta acción eliminará el anuncio y no se puede deshacer."}
              {deleteItem?.type === "account" &&
                "Esta acción eliminará la cuenta publicitaria y no se puede deshacer."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
