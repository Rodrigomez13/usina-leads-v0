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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  CalendarIcon,
  FileSpreadsheet,
  Users,
  Clock,
  Wallet,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, startOfMonth, endOfMonth } from "date-fns";

export default function ExportToExcelPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("staff");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });
  const [fileName, setFileName] = useState("export");
  const [selectedColumns, setSelectedColumns] = useState<{
    [key: string]: boolean;
  }>({
    // Staff columns
    name: true,
    role: true,
    shift: true,
    restDay: true,
    salary: true,
    email: true,
    phone: true,
    bankInfo: true,

    // Attendance columns
    date: true,
    staffName: true,
    hoursWorked: true,
    overtime: true,
    restDayWorked: true,

    // Payment columns
    paymentDate: true,
    paymentType: true,
    amount: true,
    description: true,
  });
  const [includeInactive, setIncludeInactive] = useState(false);
  const [exportFormat, setExportFormat] = useState("xlsx");

  // Función para exportar a Excel
  const handleExport = () => {
    toast({
      title: "Exportando datos",
      description: `Exportando ${activeTab} a formato ${exportFormat.toUpperCase()}...`,
    });

    // Aquí iría la lógica real de exportación
    setTimeout(() => {
      toast({
        title: "Exportación completada",
        description: `Los datos de ${activeTab} han sido exportados exitosamente como ${fileName}.${exportFormat}`,
      });
    }, 1500);
  };

  // Función para seleccionar/deseleccionar todas las columnas
  const toggleAllColumns = (checked: boolean) => {
    const newSelectedColumns = { ...selectedColumns };

    // Determinar qué columnas actualizar según la pestaña activa
    if (activeTab === "staff") {
      newSelectedColumns.name = checked;
      newSelectedColumns.role = checked;
      newSelectedColumns.shift = checked;
      newSelectedColumns.restDay = checked;
      newSelectedColumns.salary = checked;
      newSelectedColumns.email = checked;
      newSelectedColumns.phone = checked;
      newSelectedColumns.bankInfo = checked;
    } else if (activeTab === "attendance") {
      newSelectedColumns.date = checked;
      newSelectedColumns.staffName = checked;
      newSelectedColumns.hoursWorked = checked;
      newSelectedColumns.overtime = checked;
      newSelectedColumns.restDayWorked = checked;
    } else if (activeTab === "payments") {
      newSelectedColumns.paymentDate = checked;
      newSelectedColumns.staffName = checked;
      newSelectedColumns.paymentType = checked;
      newSelectedColumns.amount = checked;
      newSelectedColumns.description = checked;
    }

    setSelectedColumns(newSelectedColumns);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Exportar a Excel</h1>
        <p className="text-muted-foreground">
          Configura y exporta datos del sistema a formato Excel.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Exportación</CardTitle>
          <CardDescription>
            Selecciona los datos que deseas exportar y configura las opciones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="staff">
                <Users className="mr-2 h-4 w-4" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="attendance">
                <Clock className="mr-2 h-4 w-4" />
                Asistencia
              </TabsTrigger>
              <TabsTrigger value="payments">
                <Wallet className="mr-2 h-4 w-4" />
                Pagos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="staff" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="include-inactive"
                    checked={includeInactive}
                    onCheckedChange={(checked) => setIncludeInactive(!!checked)}
                  />
                  <Label htmlFor="include-inactive">
                    Incluir personal inactivo
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Columnas a exportar</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all-staff"
                      checked={
                        selectedColumns.name &&
                        selectedColumns.role &&
                        selectedColumns.shift &&
                        selectedColumns.restDay &&
                        selectedColumns.salary &&
                        selectedColumns.email &&
                        selectedColumns.phone &&
                        selectedColumns.bankInfo
                      }
                      onCheckedChange={(checked) => toggleAllColumns(!!checked)}
                    />
                    <Label htmlFor="select-all-staff">
                      <strong>Seleccionar todo</strong>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-name"
                      checked={selectedColumns.name}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          name: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-name">Nombre</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-role"
                      checked={selectedColumns.role}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          role: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-role">Cargo</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-shift"
                      checked={selectedColumns.shift}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          shift: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-shift">Turno</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-restDay"
                      checked={selectedColumns.restDay}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          restDay: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-restDay">Día de Franco</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-salary"
                      checked={selectedColumns.salary}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          salary: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-salary">Salario</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-email"
                      checked={selectedColumns.email}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          email: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-email">Email</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-phone"
                      checked={selectedColumns.phone}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          phone: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-phone">Teléfono</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-bankInfo"
                      checked={selectedColumns.bankInfo}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          bankInfo: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-bankInfo">Información Bancaria</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
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
              </div>

              <div className="space-y-2">
                <Label>Columnas a exportar</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all-attendance"
                      checked={
                        selectedColumns.date &&
                        selectedColumns.staffName &&
                        selectedColumns.hoursWorked &&
                        selectedColumns.overtime &&
                        selectedColumns.restDayWorked
                      }
                      onCheckedChange={(checked) => toggleAllColumns(!!checked)}
                    />
                    <Label htmlFor="select-all-attendance">
                      <strong>Seleccionar todo</strong>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-date"
                      checked={selectedColumns.date}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          date: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-date">Fecha</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-staffName-att"
                      checked={selectedColumns.staffName}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          staffName: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-staffName-att">Nombre</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-hoursWorked"
                      checked={selectedColumns.hoursWorked}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          hoursWorked: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-hoursWorked">Horas Trabajadas</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-overtime"
                      checked={selectedColumns.overtime}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          overtime: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-overtime">Horas Extra</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-restDayWorked"
                      checked={selectedColumns.restDayWorked}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          restDayWorked: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-restDayWorked">Franco Trabajado</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
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
              </div>

              <div className="space-y-2">
                <Label>Columnas a exportar</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all-payments"
                      checked={
                        selectedColumns.paymentDate &&
                        selectedColumns.staffName &&
                        selectedColumns.paymentType &&
                        selectedColumns.amount &&
                        selectedColumns.description
                      }
                      onCheckedChange={(checked) => toggleAllColumns(!!checked)}
                    />
                    <Label htmlFor="select-all-payments">
                      <strong>Seleccionar todo</strong>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-paymentDate"
                      checked={selectedColumns.paymentDate}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          paymentDate: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-paymentDate">Fecha</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-staffName-pay"
                      checked={selectedColumns.staffName}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          staffName: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-staffName-pay">Nombre</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-paymentType"
                      checked={selectedColumns.paymentType}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          paymentType: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-paymentType">Tipo de Pago</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-amount"
                      checked={selectedColumns.amount}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          amount: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-amount">Monto</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="col-description"
                      checked={selectedColumns.description}
                      onCheckedChange={(checked) =>
                        setSelectedColumns({
                          ...selectedColumns,
                          description: !!checked,
                        })
                      }
                    />
                    <Label htmlFor="col-description">Descripción</Label>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4 mt-6 border-t pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="file-name">Nombre del archivo</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="file-name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="export"
                  />
                  <span className="text-sm text-muted-foreground">
                    .{exportFormat}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="export-format">Formato</Label>
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger id="export-format">
                    <SelectValue placeholder="Seleccionar formato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleExport}
              className="w-full bg-[#148f77] hover:bg-[#0e6251]"
            >
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Exportar{" "}
              {activeTab === "staff"
                ? "Personal"
                : activeTab === "attendance"
                ? "Asistencia"
                : "Pagos"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
