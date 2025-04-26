"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  Server,
  Wallet,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Servidores",
    href: "/dashboard/servers",
    icon: <Server className="h-5 w-5" />,
  },
  {
    title: "Agencias",
    href: "/dashboard/clients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Publicidad",
    href: "/dashboard/advertising",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: "Finanzas",
    href: "/dashboard/finances",
    icon: <Wallet className="h-5 w-5" />,
  },
  {
    title: "Personal",
    href: "/dashboard/staff",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Reportes",
    href: "/dashboard/reports",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Configuración",
    href: "/dashboard/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-[#002423]">
      {/* SIDEBAR */}
      <aside
        className={cn(
          "hidden md:flex fixed top-0 left-0 h-screen border-r bg-[#011D1C] z-20 flex-col justify-between",
          collapsed ? "w-20" : "w-64",
          "transition-all duration-300"
        )}
      >
        <div className="px-4 py-6 flex justify-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Usina Leads"
              className={cn(
                "transition-all",
                collapsed ? "h-8 w-8" : "h-8 w-auto"
              )}
            />
            {!collapsed && (
              <span className="text-lg font-semibold text-white transition-opacity duration-200">
                Usina Leads
              </span>
            )}
          </Link>
        </div>

        <nav className="flex-1 px-2 pb-4 overflow-y-auto">
          <TooltipProvider delayDuration={0}>
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => {
                const link = (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.title}</span>}
                  </Link>
                );
                return collapsed ? (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>{link}</TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                ) : (
                  <React.Fragment key={index}>{link}</React.Fragment>
                );
              })}
            </div>
          </TooltipProvider>
        </nav>

        <div className="p-4">
          <Button
            variant="ghost"
            size="icon"
            className="w-full"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
      </aside>

      {/* CONTENIDO */}
      <div
        className={cn(
          "flex flex-col flex-1 h-screen overflow-hidden",
          collapsed ? "md:ml-20" : "md:ml-64",
          "transition-all duration-300"
        )}
      >
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-[#011D1C] px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex items-center gap-2 pb-4 pt-2">
                <Link href="/dashboard" className="flex items-center gap-2">
                  <img
                    src="/logo.svg"
                    alt="Usina Leads"
                    className="h-8 w-auto"
                  />
                  <span className="text-lg font-semibold">Usina Leads</span>
                </Link>
                <X className="ml-auto h-5 w-5" />
              </div>
              <nav className="grid gap-2 text-lg font-medium">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#148f77]" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="Avatar" />
                    <AvatarFallback className="bg-[#148f77] text-white">
                      AU
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Perfil</DropdownMenuItem>
                <DropdownMenuItem>Configuración</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
