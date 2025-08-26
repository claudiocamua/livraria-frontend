"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Recupera usuário ao carregar a página
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Token inválido, removendo...");
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password });

      if (!res.data.token || !res.data.user)
        throw new Error("Resposta inválida do servidor");

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err: any) {
      console.error("Erro ao fazer login:", err.response?.data?.message || err.message);
      throw new Error(err.response?.data?.message || "Erro ao fazer login");
    }
  };

  // Register
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post(`${API}/api/auth/register`, { name, email, password });

      if (!res.data.token || !res.data.user)
        throw new Error("Resposta inválida do servidor");

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err: any) {
      console.error("Erro ao registrar:", err.response?.data?.message || err.message);
      throw new Error(err.response?.data?.message || "Erro ao registrar");
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Delete account
  const deleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuário não autenticado");

    try {
      await axios.delete(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
    } catch (err: any) {
      console.error("Erro ao deletar conta:", err.response?.data?.message || err.message);
      throw new Error(err.response?.data?.message || "Erro ao deletar conta");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, deleteAccount, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de AuthProvider");
  return ctx;
};
