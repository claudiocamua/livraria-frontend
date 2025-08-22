"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthCotext";
import { useRouter } from "next/navigation"; // 🔹

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter(); // 🔹
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push("/"); // 🔹 redireciona para a página inicial
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro ao fazer login.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-lg font-bold mb-4">Entrar</h1>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <input
          className="w-full border p-2 mb-2 rounded"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 mb-2 rounded"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>
    </div>
  );
}
