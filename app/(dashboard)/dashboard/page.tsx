"use client";

import { AvatarFallback } from "@/components/ui/avatar";

import { AvatarImage } from "@/components/ui/avatar";

import { Avatar } from "@/components/ui/avatar";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("server4");

  // Datos para las estadísticas principales
  const overviewStats = [
    {
      title: "Total Leads",
      value: "3,770",
      change: "+12.5% respecto a ayer",
      changeType: "increase",
      icon: <ArrowUpRight className="h-4 w-4 text-foreground" />,
    },
    {
      title: "Conversiones",
      value: "950",
      change: "Tasa de conversión: 25.2%",
      changeType: "neutral",
      icon: <TrendingUp className="h-4 w-4 text-foreground" />,
    },
    {
      title: "Gasto Total",
      value: "$5,551.50",
      change: "+5.2% respecto a ayer",
      changeType: "increase",
      icon: <ArrowUpRight className="h-4 w-4 text-foreground" />,
    },
    {
      title: "Costo por Conversión",
      value: "$5.84",
      change: "-2.1% respecto a ayer",
      changeType: "decrease",
      icon: <TrendingDown className="h-4 w-4 text-foreground" />,
    },
  ];

  // Datos para los servidores
  const serverData = {
    server4: {
      stats: {
        leads: 1250,
        conversiones: 320,
        tasaConversion: "25.6%",
        gasto: "$1850.75",
        costoPorLead: "$1.48",
        costoPorConversion: "$5.78",
      },
    },
    server5: {
      stats: {
        leads: 980,
        conversiones: 245,
        tasaConversion: "25.0%",
        gasto: "$1450.50",
        costoPorLead: "$1.48",
        costoPorConversion: "$5.92",
      },
    },
    server6: {
      stats: {
        leads: 1540,
        conversiones: 385,
        tasaConversion: "25.0%",
        gasto: "$2250.25",
        costoPorLead: "$1.46",
        costoPorConversion: "$5.84",
      },
    },
  };

  // Datos para la distribución por franquicia
  const franchiseDistribution = [
    { name: "ATENEA", percentage: 26 },
    { name: "EROS", percentage: 33 },
    { name: "FENIX", percentage: 21 },
    { name: "GANA24", percentage: 8 },
    { name: "FORTUNA", percentage: 7 },
    { name: "FLASHBET", percentage: 5 },
  ];

  // Datos para el balance de franquicias
  const franchiseBalance = [
    { name: "ATENEA", balance: 12500.75 },
    { name: "EROS", balance: 8750.5 },
    { name: "FENIX", balance: 15200.25 },
    { name: "GANA24", balance: 9800.0 },
    { name: "FORTUNA", balance: 11250.75 },
    { name: "FLASHBET", balance: 7500.5 },
  ];

  // Datos para la actividad reciente
  const recentActivity = [
    {
      user: "Juan Pérez",
      action: "activó el anuncio Casino Bonus 25%",
      target: "en Server 4",
      time: "hace 10 minutos",
      avatar: "/avatars/avatar-1.png",
    },
    {
      user: "María López",
      action: "registró 25 conversiones para",
      target: "ATENEA",
      time: "hace 25 minutos",
      avatar: "/avatars/avatar-2.png",
    },
    {
      user: "Carlos Rodríguez",
      action: "actualizó el presupuesto de Ruleta Gratis",
      target: "en Server 5",
      time: "hace 1 hora",
      avatar: "/avatars/avatar-3.png",
    },
    {
      user: "Ana Martínez",
      action: "registró 18 conversiones para",
      target: "FENIX",
      time: "hace 1 hora",
      avatar: "/avatars/avatar-4.png",
    },
    {
      user: "Roberto Gómez",
      action: "desactivó el anuncio Bono Bienvenida",
      target: "en Server 6",
      time: "hace 2 horas",
      avatar: "/avatars/avatar-5.png",
    },
    {
      user: "Sistema",
      action: "registró un pago de $5,000.00 de",
      target: "ATENEA",
      time: "hace 3 horas",
      avatar: "/avatars/avatar-6.png",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-foreground">
          Bienvenido al panel de control de Usina Leads.
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="bg-[#022A29] border-border text-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-1 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-foreground/80">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs de servidores */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="bg-[#0B514C] border-border">
          <TabsTrigger
            value="server4"
            className="data-[state=active]:bg-border data-[state=active]:text-white text-gray-400"
          >
            Server 4
          </TabsTrigger>
          <TabsTrigger
            value="server5"
            className="data-[state=active]:bg-border data-[state=active]:text-white text-gray-400"
          >
            Server 5
          </TabsTrigger>
          <TabsTrigger
            value="server6"
            className="data-[state=active]:bg-border data-[state=active]:text-white text-gray-400"
          >
            Server 6
          </TabsTrigger>
        </TabsList>

        {Object.keys(serverData).map((serverId) => (
          <TabsContent key={serverId} value={serverId} className="space-y-4">
            {/* Estadísticas del servidor */}
            <div className="grid grid-cols-6 gap-4">
              <Card className="bg-[#022A29] border-border text-white">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Leads
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold">
                    {
                      serverData[serverId as keyof typeof serverData].stats
                        .leads
                    }
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#022A29] border-border text-white">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Conversiones
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold">
                    {
                      serverData[serverId as keyof typeof serverData].stats
                        .conversiones
                    }
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#022A29] border-border text-white">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Tasa de Conversión
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold">
                    {
                      serverData[serverId as keyof typeof serverData].stats
                        .tasaConversion
                    }
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#022A29] border-border text-white">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Gasto
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold">
                    {
                      serverData[serverId as keyof typeof serverData].stats
                        .gasto
                    }
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#022A29] border-border text-white">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Costo por Lead
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold">
                    {
                      serverData[serverId as keyof typeof serverData].stats
                        .costoPorLead
                    }
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-[#022A29] border-border text-white">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Costo por Conversión
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-2xl font-bold">
                    {
                      serverData[serverId as keyof typeof serverData].stats
                        .costoPorConversion
                    }
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos y distribución */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4 bg-[#022A29] border-border text-white">
                <CardHeader>
                  <CardTitle>Progreso Diario</CardTitle>
                  <CardDescription className="text-gray-400">
                    Evolución de leads y conversiones durante el día
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="text-gray-400">
                    Gráfico de progreso del servidor{" "}
                    {serverId.replace("server", "")}
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 bg-[#022A29] border-border text-white">
                <CardHeader>
                  <CardTitle>Distribución por Franquicia</CardTitle>
                  <CardDescription className="text-gray-400">
                    Conversiones distribuidas por franquicia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {franchiseDistribution.map((franchise) => (
                      <div key={franchise.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {franchise.name}
                          </span>
                          <span className="text-sm font-medium">
                            {franchise.percentage}%
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-border">
                          <div
                            className="h-2 rounded-full bg-[#148f77]"
                            style={{ width: `${franchise.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Actividad reciente y balance de franquicias */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 bg-[#022A29] border-border text-white">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription className="text-gray-400">
              Últimas actividades registradas en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={activity.avatar || "/placeholder.svg"}
                      alt={activity.user}
                    />
                    <AvatarFallback className="bg-[#148f77]">
                      {activity.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      <span className="font-semibold">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-semibold">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#022A29] border-border text-white">
          <CardHeader>
            <CardTitle>Balance de Franquicias</CardTitle>
            <CardDescription className="text-gray-400">
              Saldo actual de cada franquicia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {franchiseBalance.map((franchise) => (
                <div
                  key={franchise.name}
                  className="flex items-center justify-between"
                >
                  <div className="font-medium">{franchise.name}</div>
                  <div
                    className={
                      franchise.balance > 10000
                        ? "text-green-500"
                        : "text-yellow-500"
                    }
                  >
                    ${franchise.balance.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
