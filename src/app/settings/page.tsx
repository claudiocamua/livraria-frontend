"use client";

import { useState, ChangeEvent } from "react";

export default function ConfiguracoesPage() {
  const [notificacoes, setNotificacoes] = useState(true);
  const [tema, setTema] = useState("claro");
  const [fotoPerfil, setFotoPerfil] = useState<File | null>(null);
  const [previewFoto, setPreviewFoto] = useState<string | null>(null);
  const [fotoUrlAtual, setFotoUrlAtual] = useState<string | null>(""); // Simula a URL da foto vinda do usuário
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFotoPerfil(file);
      setPreviewFoto(URL.createObjectURL(file));
    }
  };

  const handleSalvar = async () => {
    setIsLoading(true);
    setMessage("");
    let finalFotoUrl = fotoUrlAtual;

    // 1. Se uma nova foto foi selecionada, faz o upload primeiro
    if (fotoPerfil) {
      const formData = new FormData();
      formData.append("foto", fotoPerfil);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      try {
        if (!apiUrl) throw new Error("URL da API não configurada.");

        const res = await fetch(`${apiUrl}/api/uploadProfilePic`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Erro ao enviar a foto");
        }

        const data = await res.json();
        finalFotoUrl = data.path; // URL da nova imagem
      } catch (err: any) {
        setMessage(`Erro no upload: ${err.message}`);
        setIsLoading(false);
        return;
      }
    }

    // 2. Envia todas as configurações para o backend
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) throw new Error("URL da API não configurada.");

      // Assumindo que o token de autenticação está no localStorage
      const token = localStorage.getItem("authToken");
      if (!token) {
        setMessage("Usuário não autenticado. Faça o login novamente.");
        setIsLoading(false);
        return;
      }

      const settingsData = {
        theme: tema,
        notifications: notificacoes,
        profilePicUrl: finalFotoUrl,
      };

      const res = await fetch(`${apiUrl}/api/user/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settingsData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao salvar configurações");
      }

      const updatedData = await res.json();
      setFotoUrlAtual(updatedData.user.profilePicUrl); // Atualiza a URL da foto
      setMessage("Configurações salvas com sucesso!");
    } catch (err: any) {
      setMessage(`Falha ao salvar: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApagarConta = () => {
    if (confirm("Tem certeza que deseja apagar sua conta? Esta ação é irreversível.")) {
      alert("Conta apagada!");
      // Chamada para a API de deletar a conta
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 rounded-2xl shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

      {message && (
        <div className={`p-3 mb-4 rounded-lg ${message.includes('Erro') || message.includes('Falha') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        {/* Notificações */}
        <div className="flex items-center justify-between">
          <span>Notificações</span>
          <input
            type="checkbox"
            checked={notificacoes}
            onChange={(e) => setNotificacoes(e.target.checked)}
            className="w-5 h-5"
          />
        </div>

        {/* Tema */}
        <div>
          <label className="block mb-1 font-medium">Tema</label>
          <select
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="claro">Claro</option>
            <option value="escuro">Escuro</option>
          </select>
        </div>

        {/* Foto de perfil */}
        <div>
          <label className="block mb-1 font-medium">Foto do Perfil</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="w-full p-2 border rounded-lg"
          />
          {(previewFoto || fotoUrlAtual) && (
            <img
              src={previewFoto || fotoUrlAtual || ''}
              alt="Prévia da foto do perfil"
              className="mt-2 w-32 h-32 object-cover rounded-full border"
            />
          )}
        </div>

        {/* Botão salvar */}
        <button
          onClick={handleSalvar}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Salvar Alterações
        </button>

        {/* Botão apagar conta */}
        <button
          onClick={handleApagarConta}
          className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Apagar Conta
        </button>
      </div>
    </div>
  );
}
