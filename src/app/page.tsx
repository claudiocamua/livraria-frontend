"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";



export default function PerfilPage() {
   
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  
  const router = useRouter();

  const [cadastroNome, setCadastroNome] = useState("");
  const [cadastroEmail, setCadastroEmail] = useState("");
  const [cadastroSenha, setCadastroSenha] = useState("");
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [fotoPreview, setFotoPreview] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!apiUrl) return setError("URL da API não configurada.");

  setIsLoading(true);
  setError(""); // reset
  setSuccess("");

  try {
    const res = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginSenha }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Falha no login");

    // ✅ Login bem-sucedido
    localStorage.setItem("authToken", data.token);
    setSuccess("Login realizado!");

    // 🔹 Redirecionamento
    router.push("/livros"); // não precisa envolver try/catch
  } catch (err: any) {
    // Captura apenas erros do login
    console.error("Erro no login:", err);
    setError(err.message || "Ocorreu um erro no login.");
  } finally {
    setIsLoading(false);
  }
};

  const handleCadastro = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (!apiUrl) return setError("URL da API não configurada.");

    try {
      //  Cadastro JSON
      const res = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cadastroNome,
          email: cadastroEmail,
          password: cadastroSenha,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Falha no cadastro");

      setSuccess("Cadastro realizado com sucesso! Agora podemos enviar a foto, se houver.");

      //  Upload da foto, se existir
      if (fotoFile) {
        const formData = new FormData();
        formData.append("foto", fotoFile);

        const uploadRes = await fetch(`${apiUrl}/uploadProfilePic`, {
          method: "POST",
          headers: { Authorization: `Bearer ${data.token}` },
          body: formData,
        });

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadData.error || "Falha no upload da foto");

        setFotoPreview(uploadData.path); // mostra a imagem enviada
      }
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro no cadastro.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFotoFile(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4">
      <div className="relative w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Login */}
         
          <div className="p-8 md:p-10 border-r border-gray-300 bg-gradient-to-b from-gray-50 to-gray-100">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Acessar Perfil</h1>
            {error && !success && <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-md">{error}</div>}
            {success && <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-400 rounded-md">{success}</div>}
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="email" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-3 py-2 bg-blue-500 border border-gray-300 rounded-md"  />
              <input type="password" placeholder="Senha" required value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)} className="w-full px-3 py-2 bg-blue-500 border border-gray-300 rounded-md"/>
              <button type="submit" disabled={isLoading} className="w-full py-3 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400">{isLoading ? "Entrando..." : "Entrar"}</button>
            </form>
          </div>

          {/* Cadastro */}
       <div className="p-8 md:p-10 flex flex-col justify-center bg-gradient-to-b from-white to-gray-50">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Criar Conta</h2>
            <form onSubmit={handleCadastro} className="space-y-5">
              <input type="text" placeholder="Nome de Usuário" required value={cadastroNome} onChange={(e) => setCadastroNome(e.target.value)} className="w-full px-3 py-2 bg-blue-500 border border-gray-300 rounded-md" />
              <input type="email" placeholder="Email" required value={cadastroEmail} onChange={(e) => setCadastroEmail(e.target.value)} className="w-full px-3 py-2 bg-blue-500 border border-gray-300 rounded-md"  />
              <input type="password" placeholder="Senha" required value={cadastroSenha} onChange={(e) => setCadastroSenha(e.target.value)} className="w-full px-3 py-2 bg-blue-500 border border-gray-300 rounded-md" />
              <input type="file" accept="image/*" onChange={handleFotoChange} className="w-full px-3 py-2 bg-blue-500 border border-gray-300 rounded-md" />
              {fotoPreview && <img src={fotoPreview} alt="Prévia da foto" className="mx-auto h-24 w-24 rounded-full object-cover mt-2 border-2 border-green-500" />}
              <button type="submit" disabled={isLoading} className="w-full py-3 rounded-md font-medium text-white bg-blue-500 hover:bg-green-700 disabled:bg-green-400">{isLoading ? "Cadastrando..." : "Cadastrar"}</button>
            </form>
          </div>
        </div>
        <div className="hidden md:block absolute top-0 left-1/2 w-[2px] h-full bg-gray-300"></div>
      </div>
    </div>
  );
} 
