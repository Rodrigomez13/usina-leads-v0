"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Users,
  Server,
  Wallet,
  Calendar,
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { isAuthenticated } from "@/lib/auth";
import { UserNav } from "@/components/dashboard/user-nav";
import { useToast } from "@/components/ui/use-toast";

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
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated()) {
      router.push("/sign-in");
    }
  }, [router]);

  if (!isMounted) return null;

  return (
    <div className="flex min-h-screen bg-[#011D1C]">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-40 h-full flex flex-col border-r border-border bg-[#002423] transition-all",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo + toggle button */}
        <div className="flex items-center justify-between p-4">
          <Link href="/dashboard" className="flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                isCollapsed ? "justify-center" : "gap-3"
              )}
            >
              {item.icon}
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "flex flex-col flex-1 min-h-screen",
          isCollapsed ? "ml-20" : "ml-64"
        )}
      >
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-[#002423] px-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <span className="text-lg font-semibold hidden md:inline">
              Usina Leads
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#148f77]" />
            </Button>
            <UserNav />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
