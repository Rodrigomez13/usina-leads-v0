"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirigir según el estado de autenticación
    try {
      if (isAuthenticated()) {
        router.push("/dashboard");
      } else {
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error al verificar autenticación:", error);
      router.push("/sign-in");
    }
  }, [router]);

  // Mostrar un estado de carga mientras se redirige
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0e6251]">
      <div className="text-center">
        <img
          src="/logo.svg"
          alt="Usina Leads"
          className="mx-auto h-12 w-auto"
        />
        <h1 className="mt-6 text-2xl font-bold text-white">Cargando...</h1>
      </div>
    </div>
  );
}
