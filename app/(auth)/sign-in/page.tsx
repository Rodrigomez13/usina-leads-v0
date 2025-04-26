"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { DevLoginHelper } from "@/components/auth/dev-login-helper";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí iría la lógica de autenticación real
      // Por ahora, simulamos un inicio de sesión exitoso
      setTimeout(() => {
        localStorage.setItem("authenticated", "true");
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Credenciales inválidas. Intente nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#002423]">
      <div className="flex flex-1 flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <img
              src="/logo.svg"
              alt="Usina Leads"
              className="h-12 w-auto mx-auto"
            />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
              Iniciar Sesión
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Ingresa tus credenciales para acceder al sistema
            </p>
          </div>
          <Card className="bg-[#011D1C] border-[#003633] text-white">
            <CardHeader>
              <CardTitle className="text-xl">Bienvenido</CardTitle>
              <CardDescription className="text-gray-400">
                Ingresa tus credenciales para continuar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nombre@usina.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#002423] border-[#003633] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-200">
                      Contraseña
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-[#148f77] hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-[#002423] border-[#003633] text-white"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm text-gray-400">
                    Recordarme
                  </Label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#148f77] hover:bg-[#0e6251]"
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-[#003633] text-sm text-gray-400">
              ¿No tienes una cuenta?{" "}
              <span className="ml-1 text-[#148f77] hover:underline">
                Contacta al administrador
              </span>
            </CardFooter>
          </Card>
        </div>
        <DevLoginHelper />
      </div>
      <div className="hidden lg:flex w-1/2 bg-[#002423] justify-center items-center">
        <img
          src="/usina-login.png"
          alt="Usina Leads"
          className="w-2/3 h-auto object-contain animate-fadeIn delay-300"
        />
      </div>
    </div>
  );
}
