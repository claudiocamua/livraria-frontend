"use client";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/contexts/AuthCotext";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // opcional
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  // Carregar dados do usuário
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await axios.get(`${API}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(data.name);
        setEmail(data.email);
      } catch {
        localStorage.removeItem("token");
        logout();
      }
    };
    loadUser();
  }, [logout]);

  // Atualizar perfil
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const payload: any = { name, email };
      if (password) payload.password = password;

      await axios.put(`${API}/api/users/me`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMsg("Perfil atualizado com sucesso!");
    } catch (err: any) {
      setMsg(err?.response?.data?.error || "Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  // Apagar conta
  const onDelete = async () => {
    if (!confirm("Tem certeza que deseja apagar sua conta?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      await axios.delete(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      logout();
      router.push("/cadastro");
    } catch (err: any) {
      setMsg(err?.response?.data?.error || "Erro ao apagar conta");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Configurações</h1>
      {msg && <p className="mb-3 text-sm text-red-600">{msg}</p>}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col">
          <span>Nome</span>
          <input
            className="border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col">
          <span>E-mail</span>
          <input
            className="border p-2 rounded"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col">
          <span>Nova senha (opcional)</span>
          <input
            className="border p-2 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded p-2"
        >
          Salvar
        </button>
      </form>

      <hr className="my-6" />

      <button
        type="button"
        onClick={onDelete}
        disabled={loading}
        className="bg-red-600 text-white rounded p-2"
      >
        Apagar minha conta
      </button>
    </div>
  );
}
