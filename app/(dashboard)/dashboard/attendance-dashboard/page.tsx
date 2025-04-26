"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CalendarIcon,
  FileSpreadsheet,
  Users,
  Clock,
  CalendarPlus2Icon as CalendarIcon2,
  ArrowUpDown,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addDays, startOfMonth, endOfMonth, subMonths } from "date-fns";
import { es } from "date-fns/locale";

// Tipos para nuestros datos
interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  restDay: string;
  active: boolean;
}

interface Attendance {
  id: string;
  date: string;
  staffId: string;
  staffName: string;
  hoursWorked: number;
  overtime: number;
  restDayWorked: boolean;
}

// Datos iniciales simplificados
const initialStaff: StaffMember[] = [
  {
    id: "1",
    name: "Emanuel Scarsi",
    role: "Encargado de Turno",
    shift: "Noche",
    restDay: "Domingo",
    active: true,
  },
  {
    id: "2",
    name: "Lisandro Velazquez",
    role: "Operario",
    shift: "Noche",
    restDay: "Sábado",
    active: true,
  },
];

// Datos iniciales de asistencia
const initialAttendance: Attendance[] = [
  {
    id: "1",
    date: "2025-04-22",
    staffId: "1",
    staffName: "Emanuel Scarsi",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
  {
    id: "2",
    date: "2025-04-22",
    staffId: "2",
    staffName: "Lisandro Velazquez",
    hoursWorked: 8,
    overtime: 1,
    restDayWorked: false,
  },
  {
    id: "3",
    date: "2025-04-23",
    staffId: "1",
    staffName: "Emanuel Scarsi",
    hoursWorked: 8,
    overtime: 2,
    restDayWorked: false,
  },
  {
    id: "4",
    date: "2025-04-23",
    staffId: "2",
    staffName: "Lisandro Velazquez",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
  {
    id: "5",
    date: "2025-04-24",
    staffId: "1",
    staffName: "Emanuel Scarsi",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
  {
    id: "6",
    date: "2025-04-24",
    staffId: "2",
    staffName: "Lisandro Velazquez",
    hoursWorked: 8,
    overtime: 1,
    restDayWorked: false,
  },
  {
    id: "7",
    date: "2025-04-25",
    staffId: "1",
    staffName: "Emanuel Scarsi",
    hoursWorked: 8,
    overtime: 1,
    restDayWorked: false,
  },
  {
    id: "8",
    date: "2025-04-25",
    staffId: "2",
    staffName: "Lisandro Velazquez",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
  {
    id: "9",
    date: "2025-04-26",
    staffId: "1",
    staffName: "Emanuel Scarsi",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
  {
    id: "10",
    date: "2025-04-26",
    staffId: "2",
    staffName: "Lisandro Velazquez",
    hoursWorked: 0,
    overtime: 0,
    restDayWorked: true,
  },
  {
    id: "11",
    date: "2025-04-27",
    staffId: "1",
    staffName: "Emanuel Scarsi",
    hoursWorked: 0,
    overtime: 0,
    restDayWorked: true,
  },
  {
    id: "12",
    date: "2025-04-27",
    staffId: "2",
    staffName: "Lisandro Velazquez",
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  },
];

// Turnos disponibles
const shifts = ["Mañana", "Tarde", "Noche", "Pico Mañana", "Pico Tarde"];

// Colores para los gráficos
const COLORS = ["#148f77", "#3498db", "#9b59b6", "#e67e22", "#e74c3c"];

export default function AttendanceDashboardPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [staff] = useState<StaffMember[]>(initialStaff);
  const [attendance] = useState<Attendance[]>(initialAttendance);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [staffFilter, setStaffFilter] = useState("all");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  }>({ key: "date", direction: "ascending" });

  // Función para filtrar asistencia por fecha y empleado
  const filteredAttendance = attendance.filter((record) => {
    // Filtrar por rango de fechas
    if (dateRange.from && dateRange.to) {
      const recordDate = new Date(record.date);
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);

      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(23, 59, 59, 999);

      if (recordDate < fromDate || recordDate > toDate) {
        return false;
      }
    }

    // Filtrar por empleado si se ha seleccionado uno específico
    if (staffFilter !== "all" && record.staffId !== staffFilter) {
      return false;
    }

    // Filtrar por turno
    if (shiftFilter !== "all") {
      const staffMember = staff.find((s) => s.id === record.staffId);
      if (staffMember && staffMember.shift !== shiftFilter) {
        return false;
      }
    }

    return true;
  });

  // Función para ordenar los registros
  const sortedAttendance = [...filteredAttendance].sort((a, b) => {
    if (sortConfig.key === "date") {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortConfig.direction === "ascending"
        ? dateA - dateB
        : dateB - dateA;
    } else if (sortConfig.key === "staffName") {
      return sortConfig.direction === "ascending"
        ? a.staffName.localeCompare(b.staffName)
        : b.staffName.localeCompare(a.staffName);
    } else if (sortConfig.key === "hoursWorked") {
      return sortConfig.direction === "ascending"
        ? a.hoursWorked - b.hoursWorked
        : b.hoursWorked - a.hoursWorked;
    } else if (sortConfig.key === "overtime") {
      return sortConfig.direction === "ascending"
        ? a.overtime - b.overtime
        : b.overtime - a.overtime;
    }
    return 0;
  });

  // Función para cambiar el criterio de ordenación
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Función para actualizar el rango de fechas al cambiar el mes
  const handleMonthChange = (month: Date) => {
    setSelectedMonth(month);
    setDateRange({
      from: startOfMonth(month),
      to: endOfMonth(month),
    });
  };

  // Función para exportar a Excel
  const handleExportToExcel = () => {
    toast({
      title: "Exportando datos",
      description: "Los datos se están exportando a Excel...",
    });

    // Aquí iría la lógica real de exportación
    setTimeout(() => {
      toast({
        title: "Exportación completada",
        description: "Los datos han sido exportados exitosamente.",
      });
    }, 1500);
  };

  // Calcular estadísticas
  const totalHoursWorked = filteredAttendance.reduce(
    (sum, record) => sum + record.hoursWorked,
    0
  );
  const totalOvertime = filteredAttendance.reduce(
    (sum, record) => sum + record.overtime,
    0
  );
  const totalRestDaysWorked = filteredAttendance.filter(
    (record) => record.restDayWorked
  ).length;
  const attendanceRate =
    (filteredAttendance.filter((record) => record.hoursWorked > 0).length /
      filteredAttendance.length) *
    100;

  // Datos para el gráfico de horas por empleado
  const hoursPerStaffData = staff.map((person) => {
    const staffRecords = filteredAttendance.filter(
      (record) => record.staffId === person.id
    );
    const regularHours = staffRecords.reduce(
      (sum, record) => sum + record.hoursWorked,
      0
    );
    const overtimeHours = staffRecords.reduce(
      (sum, record) => sum + record.overtime,
      0
    );
    return {
      name: person.name,
      regularHours,
      overtimeHours,
    };
  });

  // Datos para el gráfico de distribución por turno
  const shiftDistributionData = shifts
    .map((shift) => {
      const shiftStaff = staff.filter((person) => person.shift === shift);
      return {
        name: shift,
        value: shiftStaff.length,
      };
    })
    .filter((item) => item.value > 0);

  // Datos para el gráfico de asistencia diaria
  const dailyAttendanceData: {
    date: string;
    present: number;
    absent: number;
  }[] = [];

  if (dateRange.from && dateRange.to) {
    const currentDate = new Date(dateRange.from);
    while (currentDate <= dateRange.to) {
      const dateStr = format(currentDate, "yyyy-MM-dd");
      const dayRecords = attendance.filter((record) => record.date === dateStr);

      const present = dayRecords.filter(
        (record) => record.hoursWorked > 0
      ).length;
      const absent = staff.length - present;

      dailyAttendanceData.push({
        date: format(currentDate, "dd/MM"),
        present,
        absent,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard de Asistencia
        </h1>
        <p className="text-muted-foreground">
          Visualiza y analiza los datos de asistencia del personal.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
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
              <div className="p-3 border-b">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleMonthChange(subMonths(selectedMonth, 1))
                    }
                  >
                    Mes anterior
                  </Button>
                  <div className="font-medium">
                    {format(selectedMonth, "MMMM yyyy", { locale: es })}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleMonthChange(addDays(selectedMonth, 31))
                    }
                  >
                    Mes siguiente
                  </Button>
                </div>
              </div>
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

          <Select value={staffFilter} onValueChange={setStaffFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrar por empleado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los empleados</SelectItem>
              {staff.map((person) => (
                <SelectItem key={person.id} value={person.id}>
                  {person.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={shiftFilter} onValueChange={setShiftFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por turno" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los turnos</SelectItem>
              {shifts.map((shift) => (
                <SelectItem key={shift} value={shift}>
                  {shift}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleExportToExcel}
          className="bg-[#148f77] hover:bg-[#0e6251]"
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Exportar a Excel
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="overview">
            <Users className="mr-2 h-4 w-4" />
            Resumen
          </TabsTrigger>
          <TabsTrigger value="details">
            <Clock className="mr-2 h-4 w-4" />
            Detalles
          </TabsTrigger>
          <TabsTrigger value="charts">
            <BarChart className="mr-2 h-4 w-4" />
            Gráficos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Horas Trabajadas
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalHoursWorked}</div>
                <p className="text-xs text-muted-foreground">
                  +{totalOvertime} horas extra
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tasa de Asistencia
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {attendanceRate.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {
                    filteredAttendance.filter(
                      (record) => record.hoursWorked > 0
                    ).length
                  }{" "}
                  de {filteredAttendance.length} días
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Francos Trabajados
                </CardTitle>
                <CalendarIcon2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalRestDaysWorked}</div>
                <p className="text-xs text-muted-foreground">
                  En el período seleccionado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Promedio Horas/Día
                </CardTitle>
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {filteredAttendance.length > 0
                    ? (
                        totalHoursWorked /
                        filteredAttendance.filter((r) => r.hoursWorked > 0)
                          .length
                      ).toFixed(1)
                    : "0"}
                </div>
                <p className="text-xs text-muted-foreground">
                  Por empleado activo
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Asistencia Diaria</CardTitle>
              <CardDescription>
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                      dateRange.to,
                      "dd/MM/yyyy"
                    )}`
                  : "Período actual"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dailyAttendanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" name="Presentes" fill="#148f77" />
                    <Bar dataKey="absent" name="Ausentes" fill="#e74c3c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Registro Detallado de Asistencia</CardTitle>
              <CardDescription>
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                      dateRange.to,
                      "dd/MM/yyyy"
                    )}`
                  : "Período actual"}
                {staffFilter !== "all" &&
                  ` - ${staff.find((p) => p.id === staffFilter)?.name}`}
                {shiftFilter !== "all" && ` - Turno ${shiftFilter}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => requestSort("date")}
                    >
                      Fecha{" "}
                      {sortConfig.key === "date" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => requestSort("staffName")}
                    >
                      Nombre{" "}
                      {sortConfig.key === "staffName" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Turno</TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => requestSort("hoursWorked")}
                    >
                      Horas Trabajadas{" "}
                      {sortConfig.key === "hoursWorked" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer"
                      onClick={() => requestSort("overtime")}
                    >
                      Horas Extra{" "}
                      {sortConfig.key === "overtime" &&
                        (sortConfig.direction === "ascending" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Franco Trabajado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAttendance.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No hay registros de asistencia para este período.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedAttendance.map((record) => {
                      const staffMember = staff.find(
                        (s) => s.id === record.staffId
                      );
                      return (
                        <TableRow key={record.id}>
                          <TableCell>
                            {format(new Date(record.date), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell className="font-medium">
                            {record.staffName}
                          </TableCell>
                          <TableCell>{staffMember?.shift}</TableCell>
                          <TableCell>{record.hoursWorked}</TableCell>
                          <TableCell>{record.overtime}</TableCell>
                          <TableCell>
                            {record.restDayWorked ? (
                              <Badge className="bg-green-500 hover:bg-green-600">
                                Sí
                              </Badge>
                            ) : (
                              <Badge variant="outline">No</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Horas por Empleado</CardTitle>
                <CardDescription>
                  Distribución de horas regulares y extras por empleado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={hoursPerStaffData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="regularHours"
                        name="Horas Regulares"
                        fill="#148f77"
                      />
                      <Bar
                        dataKey="overtimeHours"
                        name="Horas Extra"
                        fill="#3498db"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Turno</CardTitle>
                <CardDescription>
                  Personal asignado a cada turno
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={shiftDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {shiftDistributionData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
