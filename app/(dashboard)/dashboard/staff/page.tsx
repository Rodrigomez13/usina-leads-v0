"use client";

import { TableFooter } from "@/components/ui/table";
import React from "react";

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
  CalendarIcon,
  Clock,
  Edit,
  Plus,
  Search,
  Trash2,
  User,
  ChevronDown,
  ChevronUp,
  Wallet,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

// Tipos para nuestros datos
interface StaffMember {
  id: string;
  name: string;
  role: string;
  shift: string;
  restDay: string;
  salary: number;
  hourlyRate: number;
  overtimeRate: number;
  email: string;
  phone: string;
  active: boolean;
  bankInfo: {
    cbu: string;
    alias: string;
    holder: string;
    crypto?: {
      type: string;
      address: string;
    };
  };
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

interface Payment {
  id: string;
  staffId: string;
  staffName: string;
  date: string;
  amount: number;
  type: "salary" | "advance" | "bonus";
  description: string;
}

interface MonthlyPaymentItem {
  staffId: string;
  staffName: string;
  regularHours: number;
  overtimeHours: number;
  restDaysWorked: number;
  regularPay: number;
  overtimePay: number;
  restDayPay: number;
  totalPay: number;
  selected: boolean;
}

interface Server {
  id: string;
  name: string;
  coefficient: number;
  active: boolean;
}

interface Ad {
  id: string;
  name: string;
  budget: number;
  api: string;
  campaign: string;
  portfolio: string;
  adAccount: string;
  bm: string;
  adSet: string;
  active: boolean;
}

// Datos iniciales simplificados (solo 2 empleados)
const initialStaff: StaffMember[] = [
  {
    id: "1",
    name: "Emanuel Scarsi",
    role: "Encargado de Turno",
    shift: "Noche",
    restDay: "Domingo",
    salary: 200000,
    hourlyRate: 750,
    overtimeRate: 1125,
    email: "emanuelscarsigragnolati@gmail.com",
    phone: "+54 9 11 3343-7837",
    active: true,
    bankInfo: {
      cbu: "0000003100017402453132",
      alias: "emanuelscarsigragnolati.mp",
      holder: "Emanuel Scarsi",
    },
  },
  {
    id: "2",
    name: "Lisandro Velazquez",
    role: "Operario",
    shift: "Noche",
    restDay: "Sábado",
    salary: 100000,
    hourlyRate: 625,
    overtimeRate: 937.5,
    email: "martin.vlqz11@gmail.com",
    phone: "+54 9 11 2345-6789",
    active: true,
    bankInfo: {
      cbu: "0000003100002309287148",
      alias: "lisandro.vlqz",
      holder: "Lisandro Velazquez",
      crypto: {
        type: "Binance",
        address: "-----------",
      },
    },
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
];

// Datos iniciales de pagos
const initialPayments: Payment[] = [
  {
    id: "1",
    staffId: "1",
    staffName: "Emanuel Scarsi",
    date: "2025-04-15",
    amount: 90000,
    type: "salary",
    description: "Pago quincenal",
  },
  {
    id: "2",
    staffId: "2",
    staffName: "Lisandro Velazquez",
    date: "2025-04-15",
    amount: 75000,
    type: "salary",
    description: "Pago quincenal",
  },
];

const initialServers: Server[] = [
  {
    id: "1",
    name: "Server 1",
    coefficient: 10,
    active: true,
  },
  {
    id: "2",
    name: "Server 2",
    coefficient: 15,
    active: false,
  },
];

const initialAds: Ad[] = [
  {
    id: "1",
    name: "Ad 1",
    budget: 100,
    api: "API WhatsApp 1",
    campaign: "Campaign 1",
    portfolio: "Portfolio 1",
    adAccount: "Ad Account 1",
    bm: "BM 1",
    adSet: "Ad Set 1",
    active: true,
  },
  {
    id: "2",
    name: "Ad 2",
    budget: 150,
    api: "API WhatsApp 2",
    campaign: "Campaign 2",
    portfolio: "Portfolio 2",
    adAccount: "Ad Account 2",
    bm: "BM 2",
    adSet: "Ad Set 2",
    active: false,
  },
];

// Roles disponibles
const roles = ["Encargado de Turno", "Operario", "Administrativo", "Gerente"];

// Turnos disponibles
const shifts = ["Mañana", "Tarde", "Noche", "Pico Mañana", "Pico Tarde"];

// Días de la semana
const weekDays = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export default function StaffPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("staff");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [shiftFilter, setShiftFilter] = useState("all");
  const [staffFilter, setStaffFilter] = useState("all");
  const [expandedStaffId, setExpandedStaffId] = useState<string | null>(null);

  // Estados para los datos
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [attendance, setAttendance] = useState<Attendance[]>(initialAttendance);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [monthlyPaymentItems, setMonthlyPaymentItems] = useState<
    MonthlyPaymentItem[]
  >([]);
  const [servers, setServers] = useState<Server[]>(initialServers);
  const [ads, setAds] = useState<Ad[]>(initialAds);

  // Estados para diálogos
  const [isNewStaffDialogOpen, setIsNewStaffDialogOpen] = useState(false);
  const [isEditStaffDialogOpen, setIsEditStaffDialogOpen] = useState(false);
  const [isNewAttendanceDialogOpen, setIsNewAttendanceDialogOpen] =
    useState(false);
  const [isEditAttendanceDialogOpen, setIsEditAttendanceDialogOpen] =
    useState(false);
  const [isNewPaymentDialogOpen, setIsNewPaymentDialogOpen] = useState(false);
  const [isEditPaymentDialogOpen, setIsEditPaymentDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditBankInfoDialogOpen, setIsEditBankInfoDialogOpen] =
    useState(false);
  const [isMonthlyPaymentDialogOpen, setIsMonthlyPaymentDialogOpen] =
    useState(false);
  const [showEditServer, setShowEditServer] = useState(false);
  const [showEditAd, setShowEditAd] = useState(false);

  // Estados para formularios
  const [newStaff, setNewStaff] = useState<Partial<StaffMember>>({
    role: "Operario",
    shift: "Mañana",
    restDay: "Domingo",
    active: true,
    bankInfo: {
      cbu: "",
      alias: "",
      holder: "",
    },
  });
  const [editStaff, setEditStaff] = useState<StaffMember | null>(null);

  const [newAttendance, setNewAttendance] = useState<Partial<Attendance>>({
    date: new Date().toISOString().split("T")[0],
    hoursWorked: 8,
    overtime: 0,
    restDayWorked: false,
  });
  const [editAttendance, setEditAttendance] = useState<Attendance | null>(null);

  const [newPayment, setNewPayment] = useState<Partial<Payment>>({
    date: new Date().toISOString().split("T")[0],
    type: "salary",
  });
  const [editPayment, setEditPayment] = useState<Payment | null>(null);
  const [editBankInfo, setEditBankInfo] = useState<{
    staffId: string;
    staffName: string;
    bankInfo: StaffMember["bankInfo"];
  } | null>(null);
  const [newServer, setNewServer] = useState<Partial<Server>>({
    coefficient: 10,
    active: true,
  });
  const [editingServer, setEditingServer] = useState<Server | null>(null);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  // Estado para eliminación
  const [deleteItem, setDeleteItem] = useState<{
    id: string;
    type: string;
  } | null>(null);
  const [serverToDelete, setServerToDelete] = useState<string | null>(null);
  const [adToDelete, setAdToDelete] = useState<string | null>(null);

  // Filtrar personal
  const filteredStaff = staff.filter(
    (person) =>
      (person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (shiftFilter === "all" || person.shift === shiftFilter)
  );

  // Filtrar asistencia por fecha y empleado
  const filteredAttendance = attendance.filter((record) => {
    // Filtrar por fecha única si se está usando el selector de fecha simple
    if (date && !dateRange.from) {
      if (record.date !== format(date, "yyyy-MM-dd")) {
        return false;
      }
    }

    // Filtrar por rango de fechas si se está usando el selector de rango
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

    return true;
  });

  // Filtrar pagos
  const filteredPayments = payments.filter(
    (payment) =>
      payment.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para expandir/colapsar detalles del personal
  const toggleStaffDetails = (staffId: string) => {
    if (expandedStaffId === staffId) {
      setExpandedStaffId(null);
    } else {
      setExpandedStaffId(staffId);
    }
  };

  // Funciones para personal
  const handleAddStaff = () => {
    if (!newStaff.name || !newStaff.role || !newStaff.salary) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const id = (
      Math.max(...staff.map((s) => Number.parseInt(s.id)), 0) + 1
    ).toString();
    const hourlyRate = (newStaff.salary || 0) / 240; // Asumiendo 30 días x 8 horas
    const overtimeRate = hourlyRate * 1.5;

    const staffMember: StaffMember = {
      id,
      name: newStaff.name || "",
      role: newStaff.role || "Operario",
      shift: newStaff.shift || "Mañana",
      restDay: newStaff.restDay || "Domingo",
      salary: newStaff.salary || 0,
      hourlyRate,
      overtimeRate,
      email: newStaff.email || "",
      phone: newStaff.phone || "",
      active: newStaff.active !== undefined ? newStaff.active : true,
      bankInfo: {
        cbu: newStaff.bankInfo?.cbu || "",
        alias: newStaff.bankInfo?.alias || "",
        holder: newStaff.bankInfo?.holder || newStaff.name || "",
        crypto: newStaff.bankInfo?.crypto,
      },
    };

    setStaff([...staff, staffMember]);
    setIsNewStaffDialogOpen(false);
    setNewStaff({
      role: "Operario",
      shift: "Mañana",
      restDay: "Domingo",
      active: true,
      bankInfo: {
        cbu: "",
        alias: "",
        holder: "",
      },
    });

    toast({
      title: "Personal añadido",
      description: `${staffMember.name} ha sido añadido exitosamente.`,
    });
  };

  const handleEditStaff = () => {
    if (!editStaff) return;

    // Recalcular tarifas horarias
    const hourlyRate = editStaff.salary / 240;
    const overtimeRate = hourlyRate * 1.5;

    const updatedStaff = {
      ...editStaff,
      hourlyRate,
      overtimeRate,
    };

    const updatedStaffList = staff.map((person) =>
      person.id === updatedStaff.id ? updatedStaff : person
    );

    setStaff(updatedStaffList);
    setIsEditStaffDialogOpen(false);
    setEditStaff(null);

    toast({
      title: "Personal actualizado",
      description: `Los datos de ${updatedStaff.name} han sido actualizados exitosamente.`,
    });
  };

  const openEditStaffDialog = (staffMember: StaffMember) => {
    setEditStaff({ ...staffMember });
    setIsEditStaffDialogOpen(true);
  };

  const toggleStaffActive = (staffId: string) => {
    const updatedStaff = staff.map((person) =>
      person.id === staffId ? { ...person, active: !person.active } : person
    );

    setStaff(updatedStaff);

    const person = staff.find((p) => p.id === staffId);
    const newStatus = person?.active ? "desactivado" : "activado";

    toast({
      title: "Estado actualizado",
      description: `${person?.name} ha sido ${newStatus}.`,
    });
  };

  // Funciones para asistencia
  const handleAddAttendance = () => {
    if (!newAttendance.staffId || !newAttendance.hoursWorked) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const id = (
      Math.max(...attendance.map((a) => Number.parseInt(a.id)), 0) + 1
    ).toString();
    const staffMember = staff.find((s) => s.id === newAttendance.staffId);

    const attendanceRecord: Attendance = {
      id,
      date: newAttendance.date || new Date().toISOString().split("T")[0],
      staffId: newAttendance.staffId || "",
      staffName: staffMember?.name || "",
      hoursWorked: newAttendance.hoursWorked || 0,
      overtime: newAttendance.overtime || 0,
      restDayWorked: newAttendance.restDayWorked || false,
    };

    setAttendance([...attendance, attendanceRecord]);
    setIsNewAttendanceDialogOpen(false);
    setNewAttendance({
      date: new Date().toISOString().split("T")[0],
      hoursWorked: 8,
      overtime: 0,
      restDayWorked: false,
    });

    toast({
      title: "Asistencia registrada",
      description: `La asistencia de ${attendanceRecord.staffName} ha sido registrada exitosamente.`,
    });
  };

  const handleEditAttendance = () => {
    if (!editAttendance) return;

    const updatedAttendance = attendance.map((record) =>
      record.id === editAttendance.id ? editAttendance : record
    );

    setAttendance(updatedAttendance);
    setIsEditAttendanceDialogOpen(false);
    setEditAttendance(null);

    toast({
      title: "Asistencia actualizada",
      description: `La asistencia de ${editAttendance.staffName} ha sido actualizada exitosamente.`,
    });
  };

  const openEditAttendanceDialog = (attendanceRecord: Attendance) => {
    setEditAttendance({ ...attendanceRecord });
    setIsEditAttendanceDialogOpen(true);
  };

  // Funciones para pagos
  const handleAddPayment = () => {
    if (!newPayment.staffId || !newPayment.amount || !newPayment.description) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const id = (
      Math.max(...payments.map((p) => Number.parseInt(p.id)), 0) + 1
    ).toString();
    const staffMember = staff.find((s) => s.id === newPayment.staffId);

    const payment: Payment = {
      id,
      staffId: newPayment.staffId || "",
      staffName: staffMember?.name || "",
      date: newPayment.date || new Date().toISOString().split("T")[0],
      amount: newPayment.amount || 0,
      type: newPayment.type || "salary",
      description: newPayment.description || "",
    };

    setPayments([...payments, payment]);
    setIsNewPaymentDialogOpen(false);
    setNewPayment({
      date: new Date().toISOString().split("T")[0],
      type: "salary",
    });

    toast({
      title: "Pago registrado",
      description: `El pago a ${payment.staffName} ha sido registrado exitosamente.`,
    });
  };

  const handleEditPayment = () => {
    if (!editPayment) return;

    const updatedPayments = payments.map((payment) =>
      payment.id === editPayment.id ? editPayment : payment
    );

    setPayments(updatedPayments);
    setIsEditPaymentDialogOpen(false);
    setEditPayment(null);

    toast({
      title: "Pago actualizado",
      description: `El pago a ${editPayment.staffName} ha sido actualizado exitosamente.`,
    });
  };

  const openEditPaymentDialog = (payment: Payment) => {
    setEditPayment({ ...payment });
    setIsEditPaymentDialogOpen(true);
  };

  // Funciones para datos bancarios
  const handleEditBankInfo = (staffMember: StaffMember) => {
    setEditBankInfo({
      staffId: staffMember.id,
      staffName: staffMember.name,
      bankInfo: { ...staffMember.bankInfo },
    });
    setIsEditBankInfoDialogOpen(true);
  };

  const handleSaveBankInfo = () => {
    if (!editBankInfo) return;

    const updatedStaff = staff.map((person) =>
      person.id === editBankInfo.staffId
        ? { ...person, bankInfo: editBankInfo.bankInfo }
        : person
    );

    setStaff(updatedStaff);
    setIsEditBankInfoDialogOpen(false);
    setEditBankInfo(null);

    toast({
      title: "Datos bancarios actualizados",
      description: `Los datos bancarios de ${editBankInfo.staffName} han sido actualizados exitosamente.`,
    });
  };

  // Funciones para eliminar
  const openDeleteDialog = (id: string, type: string) => {
    setDeleteItem({ id, type });
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (!deleteItem) return;

    if (deleteItem.type === "staff") {
      const personName = staff.find((s) => s.id === deleteItem.id)?.name;
      setStaff(staff.filter((person) => person.id !== deleteItem.id));
      toast({
        title: "Personal eliminado",
        description: `${personName} ha sido eliminado exitosamente.`,
      });
    } else if (deleteItem.type === "attendance") {
      const record = attendance.find((a) => a.id === deleteItem.id);
      setAttendance(attendance.filter((a) => a.id !== deleteItem.id));
      toast({
        title: "Asistencia eliminada",
        description: `La asistencia de ${record?.staffName} ha sido eliminada exitosamente.`,
      });
    } else if (deleteItem.type === "payment") {
      const payment = payments.find((p) => p.id === deleteItem.id);
      setPayments(payments.filter((p) => p.id !== deleteItem.id));
      toast({
        title: "Pago eliminado",
        description: `El pago a ${payment?.staffName} ha sido eliminado exitosamente.`,
      });
    }

    setIsDeleteDialogOpen(false);
    setDeleteItem(null);
  };

  // Calcular el total a pagar para un registro de asistencia
  const calculatePayment = (record: Attendance) => {
    const person = staff.find((p) => p.id === record.staffId);
    if (!person) return 0;

    const regularPay = record.hoursWorked * person.hourlyRate;
    const overtimePay = record.overtime * person.overtimeRate;
    const restDayPay = record.restDayWorked ? 8 * person.hourlyRate : 0;
    return regularPay + overtimePay + restDayPay;
  };

  // Calcular totales para el resumen mensual
  const totalHoursWorked = attendance.reduce(
    (sum, record) => sum + record.hoursWorked,
    0
  );
  const totalOvertime = attendance.reduce(
    (sum, record) => sum + record.overtime,
    0
  );
  const totalRestDaysWorked = attendance.filter(
    (record) => record.restDayWorked
  ).length;
  const totalPayroll = attendance.reduce(
    (sum, record) => sum + calculatePayment(record),
    0
  );

  // Función para manejar el cambio de tipo de pago y autocompletar el monto si es salario
  const handlePaymentTypeChange = (value: string) => {
    const newType = value as "salary" | "advance" | "bonus";
    setNewPayment({ ...newPayment, type: newType });

    // Si el tipo es salario y hay un empleado seleccionado, autocompletar con su salario
    if (newType === "salary" && newPayment.staffId) {
      const selectedStaff = staff.find((s) => s.id === newPayment.staffId);
      if (selectedStaff) {
        setNewPayment({
          ...newPayment,
          type: newType,
          amount: selectedStaff.salary,
        });
      }
    }
  };

  // Función para manejar el cambio de empleado en el formulario de pago
  const handlePaymentStaffChange = (value: string) => {
    setNewPayment({ ...newPayment, staffId: value });

    // Si el tipo es salario, autocompletar con el salario del empleado seleccionado
    if (newPayment.type === "salary") {
      const selectedStaff = staff.find((s) => s.id === value);
      if (selectedStaff) {
        setNewPayment({
          ...newPayment,
          staffId: value,
          amount: selectedStaff.salary,
        });
      }
    }
  };

  // Función para abrir el diálogo de pago mensual
  const openMonthlyPaymentDialog = () => {
    // Calcular los pagos mensuales para cada empleado activo
    const monthlyItems: MonthlyPaymentItem[] = staff
      .filter((person) => person.active)
      .map((person) => {
        // Filtrar los registros de asistencia para este empleado
        const staffAttendance = attendance.filter(
          (record) => record.staffId === person.id
        );

        // Calcular horas regulares, extras y días de descanso trabajados
        const regularHours = staffAttendance.reduce(
          (sum, record) => sum + record.hoursWorked,
          0
        );
        const overtimeHours = staffAttendance.reduce(
          (sum, record) => sum + record.overtime,
          0
        );
        const restDaysWorked = staffAttendance.filter(
          (record) => record.restDayWorked
        ).length;

        // Calcular pagos
        const regularPay = regularHours * person.hourlyRate;
        const overtimePay = overtimeHours * person.overtimeRate;
        const restDayPay = restDaysWorked * 8 * person.hourlyRate;
        const totalPay = regularPay + overtimePay + restDayPay;

        return {
          staffId: person.id,
          staffName: person.name,
          regularHours,
          overtimeHours,
          restDaysWorked,
          regularPay,
          overtimePay,
          restDayPay,
          totalPay,
          selected: true,
        };
      });

    setMonthlyPaymentItems(monthlyItems);
    setIsMonthlyPaymentDialogOpen(true);
  };

  // Función para procesar los pagos mensuales
  const processMonthlyPayments = () => {
    // Filtrar solo los empleados seleccionados
    const selectedItems = monthlyPaymentItems.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "No hay empleados seleccionados para procesar pagos.",
        variant: "destructive",
      });
      return;
    }

    // Crear un nuevo pago para cada empleado seleccionado
    const newPayments: Payment[] = selectedItems.map((item) => {
      const id = (
        Math.max(...payments.map((p) => Number.parseInt(p.id)), 0) +
        payments.length +
        1
      ).toString();

      return {
        id,
        staffId: item.staffId,
        staffName: item.staffName,
        date: new Date().toISOString().split("T")[0],
        amount: item.totalPay,
        type: "salary",
        description: "Pago mensual procesado",
      };
    });

    // Añadir los nuevos pagos
    setPayments([...payments, ...newPayments]);

    // Cerrar el diálogo
    setIsMonthlyPaymentDialogOpen(false);

    toast({
      title: "Pagos procesados",
      description: `Se han procesado ${newPayments.length} pagos exitosamente.`,
    });
  };

  // Función para manejar el cambio de selección en los pagos mensuales
  const handleMonthlyPaymentSelection = (
    staffId: string,
    selected: boolean
  ) => {
    setMonthlyPaymentItems(
      monthlyPaymentItems.map((item) =>
        item.staffId === staffId ? { ...item, selected } : item
      )
    );
  };

  // Función para manejar el cambio de monto en los pagos mensuales
  const handleMonthlyPaymentAmountChange = (
    staffId: string,
    amount: number
  ) => {
    setMonthlyPaymentItems(
      monthlyPaymentItems.map((item) =>
        item.staffId === staffId ? { ...item, totalPay: amount } : item
      )
    );
  };

  const handleAddServer = () => {
    if (!newServer.name) {
      toast({
        title: "Error",
        description: "Por favor, ingrese el nombre del servidor.",
        variant: "destructive",
      });
      return;
    }

    const id = (
      Math.max(...servers.map((s) => Number.parseInt(s.id)), 0) + 1
    ).toString();
    const server: Server = {
      id,
      name: newServer.name || "",
      coefficient: newServer.coefficient || 10,
      active: newServer.active !== undefined ? newServer.active : true,
    };

    setServers([...servers, server]);
    setShowEditServer(false);
    setNewServer({
      coefficient: 10,
      active: true,
    });

    toast({
      title: "Servidor añadido",
      description: `${server.name} ha sido añadido exitosamente.`,
    });
  };

  const handleSaveServerEdit = () => {
    if (!editingServer) return;

    const updatedServers = servers.map((server) =>
      server.id === editingServer.id ? editingServer : server
    );

    setServers(updatedServers);
    setShowEditServer(false);
    setEditingServer(null);

    toast({
      title: "Servidor actualizado",
      description: `Los datos de ${editingServer.name} han sido actualizados exitosamente.`,
    });
  };

  const handleAddAd = () => {
    // Implementar la lógica para agregar un anuncio
  };

  const handleSaveAdEdit = () => {
    if (!editingAd) return;

    const updatedAds = ads.map((ad) =>
      ad.id === editingAd.id ? editingAd : ad
    );

    setAds(updatedAds);
    setShowEditAd(false);
    setEditingAd(null);

    toast({
      title: "Anuncio actualizado",
      description: `Los datos de ${editingAd.name} han sido actualizados exitosamente.`,
    });
  };

  const confirmDeleteServer = () => {
    if (!serverToDelete) return;

    const serverName = servers.find((s) => s.id === serverToDelete)?.name;
    setServers(servers.filter((server) => server.id !== serverToDelete));
    toast({
      title: "Servidor eliminado",
      description: `${serverName} ha sido eliminado exitosamente.`,
    });

    setServerToDelete(null);
  };

  const confirmDeleteAd = () => {
    if (!adToDelete) return;

    const adName = ads.find((a) => a.id === adToDelete)?.name;
    setAds(ads.filter((ad) => ad.id !== adToDelete));
    toast({
      title: "Anuncio eliminado",
      description: `${adName} ha sido eliminado exitosamente.`,
    });

    setAdToDelete(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Personal</h1>
        <p className="text-muted-foreground">
          Gestiona el personal, turnos y asistencia.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="staff">
            <User className="mr-2 h-4 w-4" />
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
          <TabsTrigger value="shifts">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Turnos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="staff" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar personal..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
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
              className="ml-4 bg-[#148f77] hover:bg-[#0e6251]"
              onClick={() => setIsNewStaffDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Personal
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal</CardTitle>
              <CardDescription>
                Lista de todo el personal y sus detalles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Turno</TableHead>
                    <TableHead>Día de Franco</TableHead>
                    <TableHead>Salario</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStaff.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No se encontraron resultados.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStaff.map((person) => (
                      <React.Fragment key={person.id}>
                        <TableRow>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleStaffDetails(person.id)}
                              >
                                {expandedStaffId === person.id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                              {person.name}
                            </div>
                          </TableCell>
                          <TableCell>{person.role}</TableCell>
                          <TableCell>{person.shift}</TableCell>
                          <TableCell>{person.restDay}</TableCell>
                          <TableCell>
                            ${person.salary.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={person.active}
                              onCheckedChange={() =>
                                toggleStaffActive(person.id)
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openEditStaffDialog(person)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  openDeleteDialog(person.id, "staff")
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedStaffId === person.id && (
                          <TableRow>
                            <TableCell colSpan={7}>
                              <div className="p-4 bg-muted/50 rounded-md">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">
                                      Información de Contacto
                                    </h4>
                                    <div className="space-y-2">
                                      <p className="text-sm">
                                        <span className="font-medium">
                                          Email:
                                        </span>{" "}
                                        {person.email}
                                      </p>
                                      <p className="text-sm">
                                        <span className="font-medium">
                                          Teléfono:
                                        </span>{" "}
                                        {person.phone}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="font-semibold">
                                        Información Bancaria
                                      </h4>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          handleEditBankInfo(person)
                                        }
                                      >
                                        <Edit className="mr-2 h-3 w-3" />
                                        Editar
                                      </Button>
                                    </div>
                                    <div className="space-y-2">
                                      <p className="text-sm">
                                        <span className="font-medium">
                                          CBU/CVU:
                                        </span>{" "}
                                        {person.bankInfo.cbu}
                                      </p>
                                      <p className="text-sm">
                                        <span className="font-medium">
                                          Alias:
                                        </span>{" "}
                                        {person.bankInfo.alias}
                                      </p>
                                      <p className="text-sm">
                                        <span className="font-medium">
                                          Titular:
                                        </span>{" "}
                                        {person.bankInfo.holder}
                                      </p>
                                      {person.bankInfo.crypto && (
                                        <p className="text-sm">
                                          <span className="font-medium">
                                            {person.bankInfo.crypto.type}:
                                          </span>{" "}
                                          {person.bankInfo.crypto.address}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setNewPayment({
                                        ...newPayment,
                                        staffId: person.id,
                                        date: new Date()
                                          .toISOString()
                                          .split("T")[0],
                                      });
                                      setIsNewPaymentDialogOpen(true);
                                    }}
                                  >
                                    <DollarSign className="mr-2 h-4 w-4" />
                                    Registrar Pago
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setNewAttendance({
                                        ...newAttendance,
                                        staffId: person.id,
                                        date: new Date()
                                          .toISOString()
                                          .split("T")[0],
                                      });
                                      setIsNewAttendanceDialogOpen(true);
                                    }}
                                  >
                                    <Clock className="mr-2 h-4 w-4" />
                                    Registrar Asistencia
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

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Turno</CardTitle>
                <CardDescription>
                  Personal asignado a cada turno
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {shifts.map((shift) => {
                    const count = staff.filter((p) => p.shift === shift).length;
                    return (
                      <div
                        key={shift}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-[#148f77]" />
                          <span>Turno {shift}</span>
                        </div>
                        <span className="font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Cargo</CardTitle>
                <CardDescription>
                  Personal asignado a cada cargo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => {
                    const count = staff.filter((p) => p.role === role).length;
                    if (count === 0) return null;
                    return (
                      <div
                        key={role}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full bg-[#148f77]" />
                          <span>{role}</span>
                        </div>
                        <span className="font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateRange.from && dateRange.to
                      ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                          dateRange.to,
                          "dd/MM/yyyy"
                        )}`
                      : date
                      ? format(date, "PPP", { locale: es })
                      : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDate(new Date());
                          setDateRange({ from: undefined, to: undefined });
                        }}
                        className="text-xs"
                      >
                        Fecha única
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setDate(undefined);
                          setDateRange({
                            from: new Date(),
                            to: addDays(new Date(), 7),
                          });
                        }}
                        className="text-xs"
                      >
                        Rango de fechas
                      </Button>
                    </div>
                  </div>
                  {!dateRange.from && (
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  )}
                  {dateRange.from && (
                    <CalendarComponent
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
                  )}
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
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-[#148f77] hover:bg-[#0e6251]"
                onClick={() => setIsNewAttendanceDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Registrar Asistencia
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registro de Asistencia</CardTitle>
              <CardDescription>
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                      dateRange.to,
                      "dd/MM/yyyy"
                    )}`
                  : date
                  ? format(date, "PPP", { locale: es })
                  : "Hoy"}
                {staffFilter !== "all" &&
                  ` - ${staff.find((p) => p.id === staffFilter)?.name}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Horas Trabajadas</TableHead>
                    <TableHead>Horas Extra</TableHead>
                    <TableHead>Franco Trabajado</TableHead>
                    <TableHead>Total a Pagar</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No hay registros de asistencia para este período.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAttendance.map((record) => {
                      const totalPay = calculatePayment(record);

                      return (
                        <TableRow key={record.id}>
                          <TableCell>
                            {format(new Date(record.date), "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell className="font-medium">
                            {record.staffName}
                          </TableCell>
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
                          <TableCell>${totalPay.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => openEditAttendanceDialog(record)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  openDeleteDialog(record.id, "attendance")
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Asistencia</CardTitle>
              <CardDescription>
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "dd/MM/yyyy")} - ${format(
                      dateRange.to,
                      "dd/MM/yyyy"
                    )}`
                  : "Abril 2023"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Horas Trabajadas
                  </p>
                  <p className="text-2xl font-bold">{totalHoursWorked}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Horas Extra
                  </p>
                  <p className="text-2xl font-bold">{totalOvertime}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Francos Trabajados
                  </p>
                  <p className="text-2xl font-bold">{totalRestDaysWorked}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total a Pagar
                  </p>
                  <p className="text-2xl font-bold">
                    ${totalPayroll.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar pagos..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-[#148f77] hover:bg-[#0e6251]"
                onClick={openMonthlyPaymentDialog}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Procesar Pago Mensual
              </Button>
              <Button
                className="bg-[#148f77] hover:bg-[#0e6251]"
                onClick={() => setIsNewPaymentDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Registrar Pago
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Registro de Pagos</CardTitle>
              <CardDescription>
                Historial de pagos realizados al personal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-4 text-muted-foreground"
                      >
                        No se encontraron pagos que coincidan con tu búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          {format(new Date(payment.date), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell className="font-medium">
                          {payment.staffName}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              payment.type === "salary"
                                ? "text-blue-500 border-blue-500"
                                : payment.type === "advance"
                                ? "text-orange-500 border-orange-500"
                                : "text-green-500 border-green-500"
                            }
                          >
                            {payment.type === "salary"
                              ? "Salario"
                              : payment.type === "advance"
                              ? "Adelanto"
                              : "Bono"}
                          </Badge>
                        </TableCell>
                        <TableCell>${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => openEditPaymentDialog(payment)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                openDeleteDialog(payment.id, "payment")
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

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Pagos</CardTitle>
              <CardDescription>Abril 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Salarios
                  </p>
                  <p className="text-2xl font-bold">
                    $
                    {payments
                      .filter((p) => p.type === "salary")
                      .reduce((sum, p) => sum + p.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Adelantos
                  </p>
                  <p className="text-2xl font-bold">
                    $
                    {payments
                      .filter((p) => p.type === "advance")
                      .reduce((sum, p) => sum + p.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Bonos
                  </p>
                  <p className="text-2xl font-bold">
                    $
                    {payments
                      .filter((p) => p.type === "bonus")
                      .reduce((sum, p) => sum + p.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shifts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Turnos</CardTitle>
              <CardDescription>
                Configuración de turnos y horarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {shifts.map((shift) => {
                  const shiftStaff = staff.filter((p) => p.shift === shift);
                  if (shiftStaff.length === 0) return null;

                  return (
                    <div key={shift} className="space-y-2">
                      <h3 className="font-semibold">Turno {shift}</h3>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-1/3">Nombre</TableHead>
                              <TableHead className="w-1/3">Cargo</TableHead>
                              <TableHead className="w-1/6">
                                Día de Franco
                              </TableHead>
                              <TableHead className="w-1/6 text-center">
                                Estado
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {shiftStaff.map((person) => (
                              <TableRow key={person.id}>
                                <TableCell className="font-medium">
                                  {person.name}
                                </TableCell>
                                <TableCell>{person.role}</TableCell>
                                <TableCell>{person.restDay}</TableCell>
                                <TableCell className="text-center">
                                  {person.active ? (
                                    <Badge className="bg-green-500 hover:bg-green-600">
                                      Activo
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="text-yellow-500 border-yellow-500"
                                    >
                                      Inactivo
                                    </Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal para editar servidor */}
      <Dialog open={showEditServer} onOpenChange={setShowEditServer}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingServer
                ? `Editar ${editingServer.name}`
                : "Agregar Servidor"}
            </DialogTitle>
            <DialogDescription>
              {editingServer
                ? "Modifica los detalles del servidor."
                : "Ingresa los detalles del nuevo servidor."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="server-name">Nombre del Servidor</Label>
              <Input
                id="server-name"
                value={
                  editingServer ? editingServer.name : newServer.name || ""
                }
                onChange={(e) => {
                  if (editingServer) {
                    setEditingServer({
                      ...editingServer,
                      name: e.target.value,
                    });
                  } else {
                    setNewServer({ ...newServer, name: e.target.value });
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coefficient">Coeficiente (%)</Label>
              <Input
                id="coefficient"
                type="number"
                value={
                  editingServer
                    ? editingServer.coefficient
                    : newServer.coefficient || 10
                }
                onChange={(e) => {
                  if (editingServer) {
                    setEditingServer({
                      ...editingServer,
                      coefficient: Number(e.target.value),
                    });
                  } else {
                    setNewServer({
                      ...newServer,
                      coefficient: Number(e.target.value),
                    });
                  }
                }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={
                  editingServer
                    ? editingServer.active
                    : newServer.active || true
                }
                onCheckedChange={(checked) => {
                  if (editingServer) {
                    setEditingServer({ ...editingServer, active: checked });
                  } else {
                    setNewServer({ ...newServer, active: checked });
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
              disabled={editingServer ? !editingServer.name : !newServer.name}
            >
              {editingServer ? "Guardar Cambios" : "Agregar Servidor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal para editar anuncio */}
      <Dialog open={showEditAd} onOpenChange={setShowEditAd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Anuncio</DialogTitle>
            <DialogDescription>
              Modifica los detalles del anuncio.
            </DialogDescription>
          </DialogHeader>
          {editingAd && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-ad-name">Nombre del Anuncio</Label>
                <Input
                  id="edit-ad-name"
                  value={editingAd.name}
                  onChange={(e) =>
                    setEditingAd({ ...editingAd, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-budget">Presupuesto Diario ($)</Label>
                <Input
                  id="edit-budget"
                  type="number"
                  value={editingAd.budget}
                  onChange={(e) =>
                    setEditingAd({
                      ...editingAd,
                      budget: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-api">API WhatsApp</Label>
                <Select
                  value={editingAd.api}
                  onValueChange={(value) =>
                    setEditingAd({ ...editingAd, api: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar API" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="API WhatsApp 1">
                      API WhatsApp 1
                    </SelectItem>
                    <SelectItem value="API WhatsApp 2">
                      API WhatsApp 2
                    </SelectItem>
                    <SelectItem value="API WhatsApp 3">
                      API WhatsApp 3
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-campaign">Campaña</Label>
                <Input
                  id="edit-campaign"
                  value={editingAd.campaign}
                  onChange={(e) =>
                    setEditingAd({ ...editingAd, campaign: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-portfolio">Portfolio</Label>
                  <Input
                    id="edit-portfolio"
                    value={editingAd.portfolio}
                    onChange={(e) =>
                      setEditingAd({ ...editingAd, portfolio: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-adAccount">Cuenta Publicitaria</Label>
                  <Input
                    id="edit-adAccount"
                    value={editingAd.adAccount}
                    onChange={(e) =>
                      setEditingAd({ ...editingAd, adAccount: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-bm">Business Manager</Label>
                  <Input
                    id="edit-bm"
                    value={editingAd.bm}
                    onChange={(e) =>
                      setEditingAd({ ...editingAd, bm: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-adSet">Conjunto de Anuncios</Label>
                  <Input
                    id="edit-adSet"
                    value={editingAd.adSet}
                    onChange={(e) =>
                      setEditingAd({ ...editingAd, adSet: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-active"
                  checked={editingAd.active}
                  onCheckedChange={(checked) =>
                    setEditingAd({ ...editingAd, active: checked })
                  }
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
              disabled={!editingAd?.name}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar servidor */}
      <AlertDialog
        open={!!serverToDelete}
        onOpenChange={() => setServerToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el servidor permanentemente y no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteServer}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
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
              Esta acción eliminará el anuncio permanentemente y no se puede
              deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteAd}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo para agregar nuevo personal */}
      <Dialog
        open={isNewStaffDialogOpen}
        onOpenChange={setIsNewStaffDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Agregar Nuevo Personal</DialogTitle>
            <DialogDescription>
              Completa los datos del nuevo empleado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                value={newStaff.name || ""}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, name: e.target.value })
                }
                placeholder="Emanuel Scarsi"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Select
                value={newStaff.role}
                onValueChange={(value) =>
                  setNewStaff({ ...newStaff, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cargo" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shift">Turno</Label>
              <Select
                value={newStaff.shift}
                onValueChange={(value) =>
                  setNewStaff({ ...newStaff, shift: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar turno" />
                </SelectTrigger>
                <SelectContent>
                  {shifts.map((shift) => (
                    <SelectItem key={shift} value={shift}>
                      {shift}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="restDay">Día de Franco</Label>
              <Select
                value={newStaff.restDay}
                onValueChange={(value) =>
                  setNewStaff({ ...newStaff, restDay: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar día" />
                </SelectTrigger>
                <SelectContent>
                  {weekDays.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary">Salario Mensual</Label>
              <Input
                id="salary"
                type="number"
                value={newStaff.salary || ""}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, salary: Number(e.target.value) })
                }
                placeholder="150000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newStaff.email || ""}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, email: e.target.value })
                }
                placeholder="emanuelscarsigragnolati@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={newStaff.phone || ""}
                onChange={(e) =>
                  setNewStaff({ ...newStaff, phone: e.target.value })
                }
                placeholder="+54 9 11 1234-5678"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={newStaff.active || true}
                onCheckedChange={(checked) =>
                  setNewStaff({ ...newStaff, active: checked })
                }
              />
              <Label htmlFor="active">Activo</Label>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium">Información Bancaria</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cbu">CBU/CVU</Label>
                <Input
                  id="cbu"
                  value={newStaff.bankInfo?.cbu || ""}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      bankInfo: { ...newStaff.bankInfo!, cbu: e.target.value },
                    })
                  }
                  placeholder="0000000000000000000000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alias">Alias</Label>
                <Input
                  id="alias"
                  value={newStaff.bankInfo?.alias || ""}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      bankInfo: {
                        ...newStaff.bankInfo!,
                        alias: e.target.value,
                      },
                    })
                  }
                  placeholder="emanuelscarsigragnolati.mp"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="holder">Titular</Label>
                <Input
                  id="holder"
                  value={newStaff.bankInfo?.holder || newStaff.name || ""}
                  onChange={(e) =>
                    setNewStaff({
                      ...newStaff,
                      bankInfo: {
                        ...newStaff.bankInfo!,
                        holder: e.target.value,
                      },
                    })
                  }
                  placeholder="Emanuel Scarsi"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewStaffDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleAddStaff}
            >
              Agregar Personal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar personal */}
      <Dialog
        open={isEditStaffDialogOpen}
        onOpenChange={setIsEditStaffDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Personal</DialogTitle>
            <DialogDescription>
              Modifica los datos del empleado.
            </DialogDescription>
          </DialogHeader>
          {editStaff && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nombre Completo</Label>
                  <Input
                    id="edit-name"
                    value={editStaff.name}
                    onChange={(e) =>
                      setEditStaff({ ...editStaff, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Cargo</Label>
                  <Select
                    value={editStaff.role}
                    onValueChange={(value) =>
                      setEditStaff({ ...editStaff, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar cargo" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-shift">Turno</Label>
                  <Select
                    value={editStaff.shift}
                    onValueChange={(value) =>
                      setEditStaff({ ...editStaff, shift: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar turno" />
                    </SelectTrigger>
                    <SelectContent>
                      {shifts.map((shift) => (
                        <SelectItem key={shift} value={shift}>
                          {shift}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-restDay">Día de Franco</Label>
                  <Select
                    value={editStaff.restDay}
                    onValueChange={(value) =>
                      setEditStaff({ ...editStaff, restDay: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar día" />
                    </SelectTrigger>
                    <SelectContent>
                      {weekDays.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-salary">Salario Mensual</Label>
                  <Input
                    id="edit-salary"
                    type="number"
                    value={editStaff.salary}
                    onChange={(e) =>
                      setEditStaff({
                        ...editStaff,
                        salary: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editStaff.email}
                    onChange={(e) =>
                      setEditStaff({ ...editStaff, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Teléfono</Label>
                  <Input
                    id="edit-phone"
                    value={editStaff.phone}
                    onChange={(e) =>
                      setEditStaff({ ...editStaff, phone: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-active"
                    checked={editStaff.active}
                    onCheckedChange={(checked) =>
                      setEditStaff({ ...editStaff, active: checked })
                    }
                  />
                  <Label htmlFor="edit-active">Activo</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditStaffDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button
                  className="bg-[#148f77] hover:bg-[#0e6251]"
                  onClick={handleEditStaff}
                >
                  Guardar Cambios
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar información bancaria */}
      <Dialog
        open={isEditBankInfoDialogOpen}
        onOpenChange={setIsEditBankInfoDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Información Bancaria</DialogTitle>
            <DialogDescription>
              Modifica los datos bancarios de {editBankInfo?.staffName}.
            </DialogDescription>
          </DialogHeader>
          {editBankInfo && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-cbu">CBU/CVU</Label>
                <Input
                  id="edit-cbu"
                  value={editBankInfo.bankInfo.cbu}
                  onChange={(e) =>
                    setEditBankInfo({
                      ...editBankInfo,
                      bankInfo: {
                        ...editBankInfo.bankInfo,
                        cbu: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-alias">Alias</Label>
                <Input
                  id="edit-alias"
                  value={editBankInfo.bankInfo.alias}
                  onChange={(e) =>
                    setEditBankInfo({
                      ...editBankInfo,
                      bankInfo: {
                        ...editBankInfo.bankInfo,
                        alias: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-holder">Titular</Label>
                <Input
                  id="edit-holder"
                  value={editBankInfo.bankInfo.holder}
                  onChange={(e) =>
                    setEditBankInfo({
                      ...editBankInfo,
                      bankInfo: {
                        ...editBankInfo.bankInfo,
                        holder: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="edit-crypto">Información de Cripto</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (editBankInfo.bankInfo.crypto) {
                        setEditBankInfo({
                          ...editBankInfo,
                          bankInfo: {
                            ...editBankInfo.bankInfo,
                            crypto: undefined,
                          },
                        });
                      } else {
                        setEditBankInfo({
                          ...editBankInfo,
                          bankInfo: {
                            ...editBankInfo.bankInfo,
                            crypto: { type: "Binance", address: "" },
                          },
                        });
                      }
                    }}
                  >
                    {editBankInfo.bankInfo.crypto ? "Eliminar" : "Agregar"}
                  </Button>
                </div>
                {editBankInfo.bankInfo.crypto && (
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="crypto-type">Tipo</Label>
                      <Select
                        value={editBankInfo.bankInfo.crypto.type}
                        onValueChange={(value) =>
                          setEditBankInfo({
                            ...editBankInfo,
                            bankInfo: {
                              ...editBankInfo.bankInfo,
                              crypto: {
                                ...editBankInfo.bankInfo.crypto!,
                                type: value,
                              },
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Binance">Binance</SelectItem>
                          <SelectItem value="Lemon">Lemon</SelectItem>
                          <SelectItem value="Belo">Belo</SelectItem>
                          <SelectItem value="Otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="crypto-address">Dirección/Email</Label>
                      <Input
                        id="crypto-address"
                        value={editBankInfo.bankInfo.crypto.address}
                        onChange={(e) =>
                          setEditBankInfo({
                            ...editBankInfo,
                            bankInfo: {
                              ...editBankInfo.bankInfo,
                              crypto: {
                                ...editBankInfo.bankInfo.crypto!,
                                address: e.target.value,
                              },
                            },
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditBankInfoDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleSaveBankInfo}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para registrar asistencia */}
      <Dialog
        open={isNewAttendanceDialogOpen}
        onOpenChange={setIsNewAttendanceDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Asistencia</DialogTitle>
            <DialogDescription>
              Ingresa los detalles de asistencia del empleado.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="attendance-staff">Empleado</Label>
              <Select
                value={newAttendance.staffId}
                onValueChange={(value) => {
                  const staffMember = staff.find((s) => s.id === value);
                  setNewAttendance({
                    ...newAttendance,
                    staffId: value,
                    staffName: staffMember?.name || "",
                    restDayWorked: staffMember
                      ? weekDays.indexOf(staffMember.restDay) ===
                        new Date(newAttendance.date || "").getDay()
                      : false,
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar empleado" />
                </SelectTrigger>
                <SelectContent>
                  {staff
                    .filter((s) => s.active)
                    .map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name} - {person.shift}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="attendance-date">Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="attendance-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newAttendance.date
                      ? format(new Date(newAttendance.date), "PPP", {
                          locale: es,
                        })
                      : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={
                      newAttendance.date
                        ? new Date(newAttendance.date)
                        : undefined
                    }
                    onSelect={(date) => {
                      if (date) {
                        const dateStr = format(date, "yyyy-MM-dd");
                        const staffMember = staff.find(
                          (s) => s.id === newAttendance.staffId
                        );
                        setNewAttendance({
                          ...newAttendance,
                          date: dateStr,
                          restDayWorked: staffMember
                            ? weekDays.indexOf(staffMember.restDay) ===
                              date.getDay()
                            : false,
                        });
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours-worked">Horas Trabajadas</Label>
              <Input
                id="hours-worked"
                type="number"
                value={newAttendance.hoursWorked || 8}
                onChange={(e) =>
                  setNewAttendance({
                    ...newAttendance,
                    hoursWorked: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtime">Horas Extra</Label>
              <Input
                id="overtime"
                type="number"
                value={newAttendance.overtime || 0}
                onChange={(e) =>
                  setNewAttendance({
                    ...newAttendance,
                    overtime: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="rest-day-worked"
                checked={newAttendance.restDayWorked || false}
                onCheckedChange={(checked) =>
                  setNewAttendance({ ...newAttendance, restDayWorked: checked })
                }
              />
              <Label htmlFor="rest-day-worked">Franco Trabajado</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewAttendanceDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleAddAttendance}
            >
              Registrar Asistencia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar asistencia */}
      <Dialog
        open={isEditAttendanceDialogOpen}
        onOpenChange={setIsEditAttendanceDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Asistencia</DialogTitle>
            <DialogDescription>
              Modifica los detalles de asistencia.
            </DialogDescription>
          </DialogHeader>
          {editAttendance && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-attendance-staff">Empleado</Label>
                <Input
                  id="edit-attendance-staff"
                  value={editAttendance.staffName}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-attendance-date">Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="edit-attendance-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(new Date(editAttendance.date), "PPP", {
                        locale: es,
                      })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={new Date(editAttendance.date)}
                      onSelect={(date) => {
                        if (date) {
                          const dateStr = format(date, "yyyy-MM-dd");
                          const staffMember = staff.find(
                            (s) => s.id === editAttendance.staffId
                          );
                          setEditAttendance({
                            ...editAttendance,
                            date: dateStr,
                            restDayWorked: staffMember
                              ? weekDays.indexOf(staffMember.restDay) ===
                                date.getDay()
                              : false,
                          });
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-hours-worked">Horas Trabajadas</Label>
                <Input
                  id="edit-hours-worked"
                  type="number"
                  value={editAttendance.hoursWorked}
                  onChange={(e) =>
                    setEditAttendance({
                      ...editAttendance,
                      hoursWorked: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-overtime">Horas Extra</Label>
                <Input
                  id="edit-overtime"
                  type="number"
                  value={editAttendance.overtime}
                  onChange={(e) =>
                    setEditAttendance({
                      ...editAttendance,
                      overtime: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-rest-day-worked"
                  checked={editAttendance.restDayWorked}
                  onCheckedChange={(checked) =>
                    setEditAttendance({
                      ...editAttendance,
                      restDayWorked: checked,
                    })
                  }
                />
                <Label htmlFor="edit-rest-day-worked">Franco Trabajado</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditAttendanceDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleEditAttendance}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para registrar pago */}
      <Dialog
        open={isNewPaymentDialogOpen}
        onOpenChange={setIsNewPaymentDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Pago</DialogTitle>
            <DialogDescription>
              Ingresa los detalles del pago al empleado.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="payment-staff">Empleado</Label>
              <Select
                value={newPayment.staffId}
                onValueChange={handlePaymentStaffChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar empleado" />
                </SelectTrigger>
                <SelectContent>
                  {staff
                    .filter((s) => s.active)
                    .map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-date">Fecha</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="payment-date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newPayment.date
                      ? format(new Date(newPayment.date), "PPP", { locale: es })
                      : "Seleccionar fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={
                      newPayment.date ? new Date(newPayment.date) : undefined
                    }
                    onSelect={(date) => {
                      if (date) {
                        setNewPayment({
                          ...newPayment,
                          date: format(date, "yyyy-MM-dd"),
                        });
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-type">Tipo de Pago</Label>
              <Select
                value={newPayment.type}
                onValueChange={handlePaymentTypeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">Salario</SelectItem>
                  <SelectItem value="advance">Adelanto</SelectItem>
                  <SelectItem value="bonus">Bono</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-amount">Monto</Label>
              <Input
                id="payment-amount"
                type="number"
                value={newPayment.amount || ""}
                onChange={(e) =>
                  setNewPayment({
                    ...newPayment,
                    amount: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-description">Descripción</Label>
              <Input
                id="payment-description"
                value={newPayment.description || ""}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, description: e.target.value })
                }
                placeholder="Pago quincenal, bono por productividad, etc."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsNewPaymentDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleAddPayment}
            >
              Registrar Pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar pago */}
      <Dialog
        open={isEditPaymentDialogOpen}
        onOpenChange={setIsEditPaymentDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Pago</DialogTitle>
            <DialogDescription>
              Modifica los detalles del pago.
            </DialogDescription>
          </DialogHeader>
          {editPayment && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-payment-staff">Empleado</Label>
                <Input
                  id="edit-payment-staff"
                  value={editPayment.staffName}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-payment-date">Fecha</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      id="edit-payment-date"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(new Date(editPayment.date), "PPP", {
                        locale: es,
                      })}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={new Date(editPayment.date)}
                      onSelect={(date) => {
                        if (date) {
                          setEditPayment({
                            ...editPayment,
                            date: format(date, "yyyy-MM-dd"),
                          });
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-payment-type">Tipo de Pago</Label>
                <Select
                  value={editPayment.type}
                  onValueChange={(value) =>
                    setEditPayment({
                      ...editPayment,
                      type: value as "salary" | "advance" | "bonus",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Salario</SelectItem>
                    <SelectItem value="advance">Adelanto</SelectItem>
                    <SelectItem value="bonus">Bono</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-payment-amount">Monto</Label>
                <Input
                  id="edit-payment-amount"
                  type="number"
                  value={editPayment.amount}
                  onChange={(e) =>
                    setEditPayment({
                      ...editPayment,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-payment-description">Descripción</Label>
                <Input
                  id="edit-payment-description"
                  value={editPayment.description}
                  onChange={(e) =>
                    setEditPayment({
                      ...editPayment,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditPaymentDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={handleEditPayment}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para procesar pago mensual */}
      <Dialog
        open={isMonthlyPaymentDialogOpen}
        onOpenChange={setIsMonthlyPaymentDialogOpen}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Procesar Pago Mensual</DialogTitle>
            <DialogDescription>
              Revisa y confirma los pagos mensuales para los empleados.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <div className="flex items-center">
                      <Switch
                        id="select-all"
                        checked={monthlyPaymentItems.every(
                          (item) => item.selected
                        )}
                        onCheckedChange={(checked) => {
                          setMonthlyPaymentItems(
                            monthlyPaymentItems.map((item) => ({
                              ...item,
                              selected: checked,
                            }))
                          );
                        }}
                      />
                    </div>
                  </TableHead>
                  <TableHead>Empleado</TableHead>
                  <TableHead className="text-right">Horas Reg.</TableHead>
                  <TableHead className="text-right">Horas Extra</TableHead>
                  <TableHead className="text-right">Francos</TableHead>
                  <TableHead className="text-right">Pago Regular</TableHead>
                  <TableHead className="text-right">Pago Extra</TableHead>
                  <TableHead className="text-right">Pago Franco</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {monthlyPaymentItems.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center py-4 text-muted-foreground"
                    >
                      No hay empleados activos para procesar pagos.
                    </TableCell>
                  </TableRow>
                ) : (
                  monthlyPaymentItems.map((item) => (
                    <TableRow key={item.staffId}>
                      <TableCell>
                        <Switch
                          checked={item.selected}
                          onCheckedChange={(checked) =>
                            handleMonthlyPaymentSelection(item.staffId, checked)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {item.staffName}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.regularHours}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.overtimeHours}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.restDaysWorked}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.regularPay.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.overtimePay.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.restDayPay.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Input
                          type="number"
                          className="w-24 text-right"
                          value={item.totalPay}
                          onChange={(e) =>
                            handleMonthlyPaymentAmountChange(
                              item.staffId,
                              Number(e.target.value)
                            )
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={8} className="text-right font-medium">
                    Total a Pagar:
                  </TableCell>
                  <TableCell className="text-right">
                    $
                    {monthlyPaymentItems
                      .filter((item) => item.selected)
                      .reduce((sum, item) => sum + item.totalPay, 0)
                      .toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMonthlyPaymentDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-[#148f77] hover:bg-[#0e6251]"
              onClick={processMonthlyPayments}
            >
              Procesar Pagos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
              {deleteItem?.type === "staff" &&
                "Se eliminará el empleado y todos sus registros asociados."}
              {deleteItem?.type === "attendance" &&
                "Se eliminará este registro de asistencia."}
              {deleteItem?.type === "payment" &&
                "Se eliminará este registro de pago."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
