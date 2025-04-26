"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("userEmail");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email === "admin@usina.com" && password === "admin123") {
        try {
          if (rememberMe) {
            localStorage.setItem("userEmail", email);
          } else {
            localStorage.removeItem("userEmail");
          }
          localStorage.setItem("isAuthenticated", "true");
        } catch (error) {
          console.error("Error accessing localStorage:", error);
        }

        document.cookie = "isAuthenticated=true; path=/; max-age=86400";

        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido de nuevo a Usina Leads.",
        });

        router.push("/dashboard");
      } else {
        setError("Credenciales incorrectas. Por favor, intenta de nuevo.");
        setIsLoading(false);
      }
    } catch (error) {
      setError(
        "Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Columna izquierda: Formulario */}
      <div className="flex flex-1 flex-col justify-center items-center bg-gradient-to-br from-[#0b504b] to-[#002423]/80 p-8">
        <div className="w-full max-w-md px-4 animate-fadeInUp">
          <Card className="border-0 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Iniciar Sesión
              </CardTitle>
              <CardDescription className="text-center">
                Ingresa tus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nombre@usina.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
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
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none"
                  >
                    Recordarme
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#148f77] hover:bg-[#0e6251]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cargando...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                ¿No tienes una cuenta?{" "}
                <Link
                  href="/sign-up"
                  className="text-[#148f77] hover:underline"
                >
                  Contacta al administrador
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Columna derecha: Imagen fija */}
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
