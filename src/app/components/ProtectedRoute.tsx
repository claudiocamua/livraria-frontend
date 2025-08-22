"use client";
import { useAuth } from "@/contexts/AuthCotext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login"); // redireciona para login se não estiver logado
    }
  }, [user, router]);

  if (!user) return null; // enquanto verifica, não renderiza nada

  return <>{children}</>;
}
