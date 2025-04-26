"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const isDev = process.env.NEXT_PUBLIC_DEV_MODE === "true";

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error getting user:", error);
      } finally {
        setLoading(false);
      }
    };

    // Auto-login for development mode
    const autoLoginDev = async () => {
      if (isDev) {
        console.log("🔧 Development mode: Auto-login enabled");
        try {
          // Check if we're already logged in
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!user) {
            // Auto-login with dev credentials
            const { data, error } = await supabase.auth.signInWithPassword({
              email: "admin@usina.com",
              password: "admin123",
            });

            if (error) throw error;
            setUser(data.user);
          } else {
            setUser(user);
          }

          // Redirect to dashboard if on login page
          if (window.location.pathname === "/sign-in") {
            router.push("/dashboard");
          }
        } catch (error) {
          console.error("Dev auto-login failed:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Normal auth flow
        getUser();
      }
    };

    autoLoginDev();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router, isDev]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    router.push("/dashboard");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
