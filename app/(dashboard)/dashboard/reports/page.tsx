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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, addWeeks, addMonths } from "date-fns";
import { es } from "date-fns/locale";
import {
  Search,
  Download,
  FileText,
  BarChart3,
  CalendarIcon,
  PieChart,
  LineChart,
  Share2,
  Plus,
  Clock,
  Server,
  Wallet,
  Zap,
  Edit,
  Trash2,
  Mail,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";

// Simulated data for saved reports
const savedReportsData = [
  {
    id: "1",
    name: "Reporte Mensual de Conversiones",
    type: "conversion",
    lastRun: "2023-04-20",
    schedule: "monthly",
    format: "pdf",
    recipients: ["admin@usina.com"],
    status: "active",
  },
  {
    id: "2",
    name: "Rendimiento de Servidores",
    type: "server",
    lastRun: "2023-04-22",
    schedule: "weekly",
    format: "excel",
    recipients: ["admin@usina.com", "tech@usina.com"],
    status: "active",
  },
  {
    id: "3",
    name: "Balance de Clientes",
    type: "client",
    lastRun: "2023-04-21",
    schedule: "weekly",
    format: "pdf",
    recipients: ["admin@usina.com", "sales@usina.com"],
    status: "active",
  },
  {
    id: "4",
    name: "Gastos Publicitarios",
    type: "advertising",
    lastRun: "2023-04-19",
    schedule: "daily",
    format: "excel",
    recipients: ["admin@usina.com", "marketing@usina.com"],
    status: "active",
  },
  {
    id: "5",
    name: "Reporte Financiero",
    type: "finance",
    lastRun: "2023-04-15",
    schedule: "monthly",
    format: "pdf",
    recipients: ["admin@usina.com", "finance@usina.com"],
    status: "active",
  },
];

// Simulated data for report templates
const reportTemplates = [
  {
    id: "template-1",
    name: "Rendimiento General",
    description: "Visión general del rendimiento de todos los servidores",
    category: "general",
    icon: <BarChart3 className="h-8 w-8 text-[#148f77]" />,
  },
  {
    id: "template-2",
    name: "Análisis de Conversiones",
    description: "Análisis detallado de conversiones por cliente y servidor",
    category: "conversion",
    icon: <LineChart className="h-8 w-8 text-[#148f77]" />,
  },
  {
    id: "template-3",
    name: "Distribución de Clientes",
    description: "Distribución de conversiones entre clientes",
    category: "client",
    icon: <PieChart className="h-8 w-8 text-[#148f77]" />,
  },
  {
    id: "template-4",
    name: "Análisis Financiero",
    description: "Análisis de ingresos, gastos y balance",
    category: "finance",
    icon: <Wallet className="h-8 w-8 text-[#148f77]" />,
  },
  {
    id: "template-5",
    name: "Rendimiento Publicitario",
    description: "Análisis de campañas publicitarias y ROI",
    category: "advertising",
    icon: <Zap className="h-8 w-8 text-[#148f77]" />,
  },
  {
    id: "template-6",
    name: "Rendimiento de Servidores",
    description: "Análisis detallado del rendimiento de servidores",
    category: "server",
    icon: <Server className="h-8 w-8 text-[#148f77]" />,
  },
];

// Simulated data for recent reports
const recentReportsData = [
  {
    id: "recent-1",
    name: "Reporte Diario - 22/04/2023",
    type: "daily",
    generatedAt: "2023-04-22T08:00:00",
    size: "1.2 MB",
    format: "pdf",
    url: "#",
  },
  {
    id: "recent-2",
    name: "Rendimiento Server 4 - Abril 2023",
    type: "server",
    generatedAt: "2023-04-21T14:30:00",
    size: "3.5 MB",
    format: "excel",
    url: "#",
  },
  {
    id: "recent-3",
    name: "Análisis Financiero - Q1 2023",
    type: "finance",
    generatedAt: "2023-04-15T10:15:00",
    size: "2.8 MB",
    format: "pdf",
    url: "#",
  },
  {
    id: "recent-4",
    name: "Conversiones ATENEA - Abril 2023",
    type: "client",
    generatedAt: "2023-04-20T16:45:00",
    size: "1.7 MB",
    format: "excel",
    url: "#",
  },
  {
    id: "recent-5",
    name: "Análisis Publicitario - Semana 16",
    type: "advertising",
    generatedAt: "2023-04-19T09:30:00",
    size: "2.1 MB",
    format: "pdf",
    url: "#",
  },
];

// Simulated data for servers and clients
const servers = ["Server 4", "Server 5", "Server 6", "Server 7", "Server 8"];
const clients = ["ATENEA", "EROS", "FENIX", "GANA24", "FORTUNA", "FLASHBET"];

export default function ReportsPage() {
  // State for tabs
  const [activeTab, setActiveTab] = useState("dashboard");

  // State for date ranges
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // State for report data
  const [savedReports, setSavedReports] = useState(savedReportsData);
  const [recentReports, setRecentReports] = useState(recentReportsData);

  // State for report creation form
  const [newReport, setNewReport] = useState({
    name: "",
    type: "general",
    format: "pdf",
    servers: "all",
    clients: "all",
    schedule: "none",
    saveAsTemplate: false,
    sections: {
      summary: true,
      metrics: true,
      charts: true,
      tables: true,
      comparison: false,
      recommendations: false,
    },
    recipients: ["admin@usina.com"],
  });

  // State for dialogs
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const [reportToEdit, setReportToEdit] = useState<string | null>(null);
  const [reportToView, setReportToView] = useState<string | null>(null);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [emailToShare, setEmailToShare] = useState("");

  // State for report generation progress
  const [generationProgress, setGenerationProgress] = useState(0);

  // Filter saved reports based on search query and type filter
  const filteredReports = savedReports.filter((report) => {
    const matchesSearch = report.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Handle report form change
  const handleReportFormChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setNewReport({
        ...newReport,
        [parent]: {
          ...(typeof newReport[parent as keyof typeof newReport] === "object" &&
          newReport[parent as keyof typeof newReport] !== null
            ? (newReport[parent as keyof typeof newReport] as Record<
                string,
                unknown
              >)
            : {}),
          [child]: value,
        },
      });
    } else {
      setNewReport({
        ...newReport,
        [field]: value,
      });
    }
  };

  // Handle report generation
  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setGenerationProgress(0);

    // Simulate report generation progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGeneratingReport(false);
          setShowReportPreview(true);

          // Add to recent reports
          const newRecentReport = {
            id: `recent-${Date.now()}`,
            name:
              newReport.name ||
              `Reporte ${newReport.type} - ${format(new Date(), "dd/MM/yyyy")}`,
            type: newReport.type,
            generatedAt: new Date().toISOString(),
            size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
            format: newReport.format,
            url: "#",
          };

          setRecentReports((prev) => [newRecentReport, ...prev]);

          // Show success toast
          toast({
            title: "Reporte generado con éxito",
            description: `El reporte "${newRecentReport.name}" ha sido generado y está listo para descargar.`,
          });

          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  };

  // Handle save report
  const handleSaveReport = () => {
    const newSavedReport = {
      id: `${Date.now()}`,
      name:
        newReport.name ||
        `Reporte ${newReport.type} - ${format(new Date(), "dd/MM/yyyy")}`,
      type: newReport.type,
      lastRun: format(new Date(), "yyyy-MM-dd"),
      schedule: newReport.schedule,
      format: newReport.format,
      recipients: newReport.recipients,
      status: "active",
    };

    setSavedReports((prev) => [newSavedReport, ...prev]);

    toast({
      title: "Reporte guardado",
      description: `El reporte "${newSavedReport.name}" ha sido guardado correctamente.`,
    });

    // Reset form
    setNewReport({
      name: "",
      type: "general",
      format: "pdf",
      servers: "all",
      clients: "all",
      schedule: "none",
      saveAsTemplate: false,
      sections: {
        summary: true,
        metrics: true,
        charts: true,
        tables: true,
        comparison: false,
        recommendations: false,
      },
      recipients: ["admin@usina.com"],
    });

    // Switch to saved reports tab
    setActiveTab("saved");
  };

  // Handle delete report
  const handleDeleteReport = (id: string) => {
    setSavedReports((prev) => prev.filter((report) => report.id !== id));
    setReportToDelete(null);

    toast({
      title: "Reporte eliminado",
      description: "El reporte ha sido eliminado correctamente.",
    });
  };

  // Handle edit report
  const handleEditReport = (id: string) => {
    const reportToEdit = savedReports.find((report) => report.id === id);
    if (!reportToEdit) return;

    setNewReport({
      name: reportToEdit.name,
      type: reportToEdit.type,
      format: reportToEdit.format,
      servers: "all",
      clients: "all",
      schedule: reportToEdit.schedule,
      saveAsTemplate: false,
      sections: {
        summary: true,
        metrics: true,
        charts: true,
        tables: true,
        comparison: false,
        recommendations: false,
      },
      recipients: reportToEdit.recipients,
    });

    // Remove the old report
    setSavedReports((prev) => prev.filter((report) => report.id !== id));

    // Switch to create tab
    setActiveTab("create");

    toast({
      title: "Editando reporte",
      description: `Ahora puede editar el reporte "${reportToEdit.name}".`,
    });
  };

  // Handle share report
  const handleShareReport = () => {
    if (!emailToShare) {
      toast({
        title: "Error",
        description: "Por favor, ingrese un correo electrónico válido.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reporte compartido",
      description: `El reporte ha sido compartido con ${emailToShare}.`,
    });

    setEmailToShare("");
    setShowShareDialog(false);
  };

  // Handle download report
  const handleDownloadReport = (format: string) => {
    toast({
      title: "Descargando reporte",
      description: `El reporte se está descargando en formato ${format.toUpperCase()}.`,
    });
  };

  // Handle use template
  const handleUseTemplate = (template: any) => {
    setNewReport({
      ...newReport,
      name: `${template.name} - ${format(new Date(), "dd/MM/yyyy")}`,
      type: template.category,
    });

    setActiveTab("create");

    toast({
      title: "Plantilla seleccionada",
      description: `La plantilla "${template.name}" ha sido cargada. Complete los detalles adicionales.`,
    });
  };

  // Calculate next run date based on schedule and last run
  const getNextRunDate = (lastRun: string, schedule: string) => {
    const lastRunDate = new Date(lastRun);
    const nextRunDate = new Date(lastRunDate);

    if (schedule === "daily") {
      return addDays(nextRunDate, 1);
    } else if (schedule === "weekly") {
      return addWeeks(nextRunDate, 1);
    } else if (schedule === "monthly") {
      return addMonths(nextRunDate, 1);
    }

    return nextRunDate;
  };

  // Handle generate now for scheduled reports
  const handleGenerateNow = (report: any) => {
    setIsGeneratingReport(true);
    setGenerationProgress(0);

    // Simulate report generation progress
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGeneratingReport(false);

          // Update last run date
          setSavedReports((prev) =>
            prev.map((r) =>
              r.id === report.id
                ? { ...r, lastRun: format(new Date(), "yyyy-MM-dd") }
                : r
            )
          );

          // Add to recent reports
          const newRecentReport = {
            id: `recent-${Date.now()}`,
            name: `${report.name} - ${format(new Date(), "dd/MM/yyyy")}`,
            type: report.type,
            generatedAt: new Date().toISOString(),
            size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
            format: report.format,
            url: "#",
          };

          setRecentReports((prev) => [newRecentReport, ...prev]);

          // Show success toast
          toast({
            title: "Reporte generado con éxito",
            description: `El reporte "${newRecentReport.name}" ha sido generado y está listo para descargar.`,
          });

          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Reportes</h1>
        <p className="text-muted-foreground">
          Genera y gestiona reportes personalizados.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="dashboard">Panel</TabsTrigger>
          <TabsTrigger value="create">Crear Reporte</TabsTrigger>
          <TabsTrigger value="saved">Reportes Guardados</TabsTrigger>
          <TabsTrigger value="scheduled">Reportes Programados</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reportes Generados
                </CardTitle>
                <FileText className="h-4 w-4 text-[#148f77]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{recentReports.length}</div>
                <p className="text-xs text-muted-foreground">
                  +{recentReports.length > 5 ? recentReports.length - 5 : 0} en
                  los últimos 30 días
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reportes Programados
                </CardTitle>
                <Clock className="h-4 w-4 text-[#148f77]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {savedReports.filter((r) => r.schedule !== "none").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {savedReports.filter((r) => r.schedule === "weekly").length}{" "}
                  semanales,{" "}
                  {savedReports.filter((r) => r.schedule === "monthly").length}{" "}
                  mensuales
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Reportes Compartidos
                </CardTitle>
                <Share2 className="h-4 w-4 text-[#148f77]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  Con 6 usuarios diferentes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Plantillas Disponibles
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-[#148f77]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {reportTemplates.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  6 personalizadas
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Reportes Recientes</CardTitle>
                <CardDescription>Últimos reportes generados</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Generado</TableHead>
                      <TableHead>Tamaño</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentReports.slice(0, 5).map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          {report.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              report.type === "daily"
                                ? "text-blue-500 border-blue-500"
                                : report.type === "server"
                                ? "text-green-500 border-green-500"
                                : report.type === "finance"
                                ? "text-purple-500 border-purple-500"
                                : report.type === "client"
                                ? "text-orange-500 border-orange-500"
                                : "text-pink-500 border-pink-500"
                            }
                          >
                            {report.type.charAt(0).toUpperCase() +
                              report.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(report.generatedAt).toLocaleDateString(
                            "es-ES",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </TableCell>
                        <TableCell>{report.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setReportToView(report.id);
                                      setShowReportPreview(true);
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Ver reporte</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setShowShareDialog(true);
                                    }}
                                  >
                                    <Share2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Compartir</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDownloadReport(report.format)
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              {report.format.toUpperCase()}
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
                <CardTitle>Reportes Populares</CardTitle>
                <CardDescription>Reportes más utilizados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedReports.slice(0, 3).map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Última ejecución:{" "}
                          {new Date(report.lastRun).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateNow(report)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Generar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Plantillas de Reportes</CardTitle>
              <CardDescription>
                Plantillas predefinidas para generar reportes rápidamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reportTemplates.map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-3">
                        {template.icon}
                        <div>
                          <CardTitle className="text-base">
                            {template.name}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {template.category}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                      <Button
                        className="mt-4 w-full bg-[#148f77] hover:bg-[#0e6251]"
                        onClick={() => handleUseTemplate(template)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Usar Plantilla
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crear Reporte Personalizado</CardTitle>
              <CardDescription>
                Configura los parámetros para generar un reporte personalizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="report-name">Nombre del Reporte</Label>
                  <Input
                    id="report-name"
                    placeholder="Ingrese un nombre para el reporte"
                    value={newReport.name}
                    onChange={(e) =>
                      handleReportFormChange("name", e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Tipo de Reporte</Label>
                    <Select
                      value={newReport.type}
                      onValueChange={(value) =>
                        handleReportFormChange("type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="server">Servidores</SelectItem>
                        <SelectItem value="client">Clientes</SelectItem>
                        <SelectItem value="advertising">Publicidad</SelectItem>
                        <SelectItem value="finance">Finanzas</SelectItem>
                        <SelectItem value="conversion">Conversiones</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Formato</Label>
                    <Select
                      value={newReport.format}
                      onValueChange={(value) =>
                        handleReportFormChange("format", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Rango de Fechas</Label>
                  <div className="flex items-center gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="from">Desde</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="from"
                            variant="outline"
                            className="w-[200px] justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate
                              ? format(startDate, "PPP", { locale: es })
                              : "Seleccionar fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="to">Hasta</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="to"
                            variant="outline"
                            className="w-[200px] justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate
                              ? format(endDate, "PPP", { locale: es })
                              : "Seleccionar fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Filtros</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Servidores</Label>
                      <Select
                        value={newReport.servers}
                        onValueChange={(value) =>
                          handleReportFormChange("servers", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar servidores" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          {servers.map((server) => (
                            <SelectItem
                              key={server}
                              value={server.toLowerCase().replace(/\s+/g, "")}
                            >
                              {server}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Clientes</Label>
                      <Select
                        value={newReport.clients}
                        onValueChange={(value) =>
                          handleReportFormChange("clients", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar clientes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          {clients.map((client) => (
                            <SelectItem
                              key={client}
                              value={client.toLowerCase()}
                            >
                              {client}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Secciones a incluir</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="section-summary"
                        checked={newReport.sections.summary}
                        onCheckedChange={(checked) =>
                          handleReportFormChange(
                            "sections.summary",
                            checked === true
                          )
                        }
                      />
                      <Label htmlFor="section-summary">Resumen Ejecutivo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="section-metrics"
                        checked={newReport.sections.metrics}
                        onCheckedChange={(checked) =>
                          handleReportFormChange(
                            "sections.metrics",
                            checked === true
                          )
                        }
                      />
                      <Label htmlFor="section-metrics">
                        Métricas Principales
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="section-charts"
                        checked={newReport.sections.charts}
                        onCheckedChange={(checked) =>
                          handleReportFormChange(
                            "sections.charts",
                            checked === true
                          )
                        }
                      />
                      <Label htmlFor="section-charts">Gráficos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="section-tables"
                        checked={newReport.sections.tables}
                        onCheckedChange={(checked) =>
                          handleReportFormChange(
                            "sections.tables",
                            checked === true
                          )
                        }
                      />
                      <Label htmlFor="section-tables">Tablas de Datos</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="section-comparison"
                        checked={newReport.sections.comparison}
                        onCheckedChange={(checked) =>
                          handleReportFormChange(
                            "sections.comparison",
                            checked === true
                          )
                        }
                      />
                      <Label htmlFor="section-comparison">
                        Comparativa con Período Anterior
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="section-recommendations"
                        checked={newReport.sections.recommendations}
                        onCheckedChange={(checked) =>
                          handleReportFormChange(
                            "sections.recommendations",
                            checked === true
                          )
                        }
                      />
                      <Label htmlFor="section-recommendations">
                        Recomendaciones
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Programación (opcional)</Label>
                  <Select
                    value={newReport.schedule}
                    onValueChange={(value) =>
                      handleReportFormChange("schedule", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="No programar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No programar</SelectItem>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="save-template"
                    checked={newReport.saveAsTemplate}
                    onCheckedChange={(checked) =>
                      handleReportFormChange("saveAsTemplate", checked === true)
                    }
                  />
                  <Label htmlFor="save-template">Guardar como plantilla</Label>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNewReport({
                        name: "",
                        type: "general",
                        format: "pdf",
                        servers: "all",
                        clients: "all",
                        schedule: "none",
                        saveAsTemplate: false,
                        sections: {
                          summary: true,
                          metrics: true,
                          charts: true,
                          tables: true,
                          comparison: false,
                          recommendations: false,
                        },
                        recipients: ["admin@usina.com"],
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-[#148f77] hover:bg-[#0e6251]"
                    onClick={handleGenerateReport}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Generar Reporte
                  </Button>
                  {newReport.name && (
                    <Button variant="outline" onClick={handleSaveReport}>
                      Guardar Reporte
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar reportes..."
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
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="server">Servidores</SelectItem>
                  <SelectItem value="client">Clientes</SelectItem>
                  <SelectItem value="advertising">Publicidad</SelectItem>
                  <SelectItem value="finance">Finanzas</SelectItem>
                  <SelectItem value="conversion">Conversiones</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="ml-auto bg-[#148f77] hover:bg-[#0e6251]"
              onClick={() => setActiveTab("create")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Reporte
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reportes Guardados</CardTitle>
              <CardDescription>
                Reportes personalizados guardados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Última Ejecución</TableHead>
                    <TableHead>Programación</TableHead>
                    <TableHead>Formato</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No se encontraron reportes que coincidan con la búsqueda
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          {report.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              report.type === "conversion"
                                ? "text-blue-500 border-blue-500"
                                : report.type === "server"
                                ? "text-green-500 border-green-500"
                                : report.type === "client"
                                ? "text-orange-500 border-orange-500"
                                : report.type === "advertising"
                                ? "text-pink-500 border-pink-500"
                                : "text-purple-500 border-purple-500"
                            }
                          >
                            {report.type.charAt(0).toUpperCase() +
                              report.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(report.lastRun).toLocaleDateString("es-ES")}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              report.schedule === "daily"
                                ? "text-blue-500 border-blue-500"
                                : report.schedule === "weekly"
                                ? "text-green-500 border-green-500"
                                : report.schedule === "monthly"
                                ? "text-purple-500 border-purple-500"
                                : "text-gray-500 border-gray-500"
                            }
                          >
                            {report.schedule === "daily"
                              ? "Diario"
                              : report.schedule === "weekly"
                              ? "Semanal"
                              : report.schedule === "monthly"
                              ? "Mensual"
                              : "No programado"}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.format.toUpperCase()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleGenerateNow(report)}
                                  >
                                    <FileText className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Generar ahora</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditReport(report.id)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Editar</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setReportToDelete(report.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Eliminar</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
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

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reportes Programados</CardTitle>
              <CardDescription>
                Reportes configurados para generarse automáticamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Frecuencia</TableHead>
                    <TableHead>Próxima Ejecución</TableHead>
                    <TableHead>Destinatarios</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {savedReports
                    .filter((report) => report.schedule !== "none")
                    .map((report) => {
                      // Calculate next run date based on schedule and last run
                      const nextRunDate = getNextRunDate(
                        report.lastRun,
                        report.schedule
                      );

                      return (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            {report.name}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                report.schedule === "daily"
                                  ? "text-blue-500 border-blue-500"
                                  : report.schedule === "weekly"
                                  ? "text-green-500 border-green-500"
                                  : "text-purple-500 border-purple-500"
                              }
                            >
                              {report.schedule === "daily"
                                ? "Diario"
                                : report.schedule === "weekly"
                                ? "Semanal"
                                : "Mensual"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {nextRunDate.toLocaleDateString("es-ES")}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <span>{report.recipients[0]}</span>
                              {report.recipients.length > 1 && (
                                <Badge variant="outline" className="ml-1">
                                  +{report.recipients.length - 1}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={report.status === "active"}
                                onCheckedChange={(checked) => {
                                  setSavedReports((prev) =>
                                    prev.map((r) =>
                                      r.id === report.id
                                        ? {
                                            ...r,
                                            status: checked
                                              ? "active"
                                              : "inactive",
                                          }
                                        : r
                                    )
                                  );
                                }}
                              />
                              <Badge
                                className={
                                  report.status === "active"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-gray-500 hover:bg-gray-600"
                                }
                              >
                                {report.status === "active"
                                  ? "Activo"
                                  : "Inactivo"}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleGenerateNow(report)}
                              >
                                <FileText className="mr-2 h-4 w-4" />
                                Generar Ahora
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditReport(report.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Generation Dialog */}
      <Dialog open={isGeneratingReport} onOpenChange={setIsGeneratingReport}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generando Reporte</DialogTitle>
            <DialogDescription>
              Por favor espere mientras se genera su reporte...
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <Progress value={generationProgress} className="h-2" />
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {generationProgress < 100
                ? `${generationProgress}% completado`
                : "¡Reporte generado!"}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Preview Dialog */}
      <Dialog open={showReportPreview} onOpenChange={setShowReportPreview}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Vista Previa del Reporte</DialogTitle>
            <DialogDescription>
              Reporte generado el{" "}
              {format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] rounded-md border p-4">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#148f77]">
                  {newReport.name || "Reporte sin título"}
                </h2>
                <p className="text-muted-foreground">
                  Generado el {format(new Date(), "PPP", { locale: es })} a las{" "}
                  {format(new Date(), "HH:mm", { locale: es })}
                </p>
              </div>

              {newReport.sections.summary && (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Resumen Ejecutivo</h3>
                  <p>
                    Este reporte presenta un análisis detallado del rendimiento
                    de{" "}
                    {newReport.servers === "all"
                      ? "todos los servidores"
                      : `servidor ${newReport.servers}`}
                    para{" "}
                    {newReport.clients === "all"
                      ? "todos los clientes"
                      : `cliente ${newReport.clients}`}{" "}
                    durante el período del{" "}
                    {startDate && format(startDate, "PPP", { locale: es })}
                    al {endDate && format(endDate, "PPP", { locale: es })}.
                  </p>
                  <p>
                    Los principales indicadores muestran un rendimiento{" "}
                    {Math.random() > 0.5 ? "positivo" : "estable"} con
                    oportunidades de mejora en áreas específicas.
                  </p>
                </div>
              )}

              {newReport.sections.metrics && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    Métricas Principales
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Conversiones Totales
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {Math.floor(Math.random() * 10000)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {Math.random() > 0.5 ? "+" : "-"}
                          {Math.floor(Math.random() * 15)}% vs período anterior
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Tasa de Conversión
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {(Math.random() * 10).toFixed(2)}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {Math.random() > 0.5 ? "+" : "-"}
                          {(Math.random() * 2).toFixed(2)}% vs período anterior
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Tiempo de Respuesta
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {(Math.random() * 500).toFixed(0)} ms
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {Math.random() > 0.5 ? "+" : "-"}
                          {(Math.random() * 50).toFixed(0)} ms vs período
                          anterior
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {newReport.sections.charts && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Gráficos</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Conversiones por Día
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="h-[200px] bg-slate-100 flex items-center justify-center">
                        <p className="text-muted-foreground">
                          Gráfico de líneas de conversiones diarias
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">
                          Distribución por Cliente
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="h-[200px] bg-slate-100 flex items-center justify-center">
                        <p className="text-muted-foreground">
                          Gráfico circular de distribución por cliente
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {newReport.sections.tables && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Tablas de Datos</h3>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        Rendimiento por Servidor
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Servidor</TableHead>
                            <TableHead>Conversiones</TableHead>
                            <TableHead>Tasa</TableHead>
                            <TableHead>Tiempo Resp.</TableHead>
                            <TableHead>Uptime</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {servers.slice(0, 3).map((server) => (
                            <TableRow key={server}>
                              <TableCell className="font-medium">
                                {server}
                              </TableCell>
                              <TableCell>
                                {Math.floor(Math.random() * 5000)}
                              </TableCell>
                              <TableCell>
                                {(Math.random() * 10).toFixed(2)}%
                              </TableCell>
                              <TableCell>
                                {(Math.random() * 500).toFixed(0)} ms
                              </TableCell>
                              <TableCell>
                                {(99 + Math.random()).toFixed(2)}%
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}

              {newReport.sections.comparison && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    Comparativa con Período Anterior
                  </h3>
                  <Card>
                    <CardContent className="pt-6">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Métrica</TableHead>
                            <TableHead>Período Actual</TableHead>
                            <TableHead>Período Anterior</TableHead>
                            <TableHead>Variación</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              Conversiones Totales
                            </TableCell>
                            <TableCell>
                              {Math.floor(Math.random() * 10000)}
                            </TableCell>
                            <TableCell>
                              {Math.floor(Math.random() * 10000)}
                            </TableCell>
                            <TableCell
                              className={
                                Math.random() > 0.5
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {Math.random() > 0.5 ? "+" : "-"}
                              {Math.floor(Math.random() * 15)}%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Tasa de Conversión
                            </TableCell>
                            <TableCell>
                              {(Math.random() * 10).toFixed(2)}%
                            </TableCell>
                            <TableCell>
                              {(Math.random() * 10).toFixed(2)}%
                            </TableCell>
                            <TableCell
                              className={
                                Math.random() > 0.5
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {Math.random() > 0.5 ? "+" : "-"}
                              {(Math.random() * 2).toFixed(2)}%
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Tiempo de Respuesta
                            </TableCell>
                            <TableCell>
                              {(Math.random() * 500).toFixed(0)} ms
                            </TableCell>
                            <TableCell>
                              {(Math.random() * 500).toFixed(0)} ms
                            </TableCell>
                            <TableCell
                              className={
                                Math.random() > 0.5
                                  ? "text-green-600"
                                  : "text-red-600"
                              }
                            >
                              {Math.random() > 0.5 ? "+" : "-"}
                              {(Math.random() * 50).toFixed(0)} ms
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
              )}

              {newReport.sections.recommendations && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Recomendaciones</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <ul className="space-y-2 list-disc pl-5">
                        <li>
                          Optimizar la configuración del servidor para mejorar
                          los tiempos de respuesta.
                        </li>
                        <li>
                          Revisar la distribución de carga entre servidores para
                          equilibrar el rendimiento.
                        </li>
                        <li>
                          Implementar mejoras en el seguimiento de conversiones
                          para identificar patrones y tendencias.
                        </li>
                        <li>
                          Considerar la ampliación de capacidad en los
                          servidores con mayor demanda.
                        </li>
                        <li>
                          Evaluar la posibilidad de implementar balanceo de
                          carga dinámico para optimizar recursos.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowReportPreview(false)}
            >
              Cerrar
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setShowShareDialog(true);
                setShowReportPreview(false);
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Compartir
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={() => handleDownloadReport(newReport.format)}
            >
              <Download className="mr-2 h-4 w-4" />
              Descargar {newReport.format.toUpperCase()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!reportToDelete}
        onOpenChange={() => setReportToDelete(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea eliminar este reporte? Esta acción no se
              puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setReportToDelete(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                reportToDelete && handleDeleteReport(reportToDelete)
              }
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Report Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartir Reporte</DialogTitle>
            <DialogDescription>
              Ingrese las direcciones de correo electrónico de las personas con
              las que desea compartir este reporte.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  placeholder="ejemplo@correo.com"
                  type="email"
                  value={emailToShare}
                  onChange={(e) => setEmailToShare(e.target.value)}
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (emailToShare) {
                      setEmailToShare("");
                      toast({
                        title: "Correo agregado",
                        description: `${emailToShare} ha sido agregado a la lista de destinatarios.`,
                      });
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mensaje (opcional)</Label>
              <Textarea
                placeholder="Escriba un mensaje para acompañar el reporte..."
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="include-copy" />
              <Label htmlFor="include-copy">Enviarme una copia</Label>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleShareReport}
            >
              <Mail className="mr-2 h-4 w-4" />
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
