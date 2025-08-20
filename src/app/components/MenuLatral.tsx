"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut } from "lucide-react";
import { useFavoritos } from "@/app/hook/useFavoritos";
import { getMenuLinks } from "@/config/MenuConfigs"; 
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthCotext"; 

export default function MenuLateral() {
  const [aberto, setAberto] = useState(false);
  const { favoritos } = useFavoritos();
  const { logout } = useAuth();
  const router = useRouter();

  const links = getMenuLinks(favoritos.length);

  function handleLogout() {
    logout();         
    router.push("/"); // redireciona para Home (page.tsx principal)
  }

  return (
    <>
      {/* Botão de abrir no mobile */}
      <button
        onClick={() => setAberto(true)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-900 text-white rounded"
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>

      {/* Fundo escuro no mobile */}
      {aberto && (
        <div
          className="fixed inset-0 bg-blue-950 bg-opacity-50 z-40 md:hidden"
          onClick={() => setAberto(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 h-screen bg-gray-900 text-white flex flex-col
          w-70 p-9 z-50 transform transition-transform duration-300
          ${aberto ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0 md:static md:flex md:order-2`}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-xl font-bold">Library</h2>
          <button
            onClick={() => setAberto(false)}
            className="md:hidden p-1 hover:bg-gray-800 rounded"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-2">
          {links.map(({ href, label, icon: Icon, badge }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setAberto(false)}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-800 justify-between"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                <span>{label}</span>
              </div>
              {badge && badge > 0 && (
                <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </Link>
          ))}

          {/* Botão de sair */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-2 rounded hover:bg-red-600 mt-4"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </nav>

        {/* Rodapé */}
        <div className="border-t border-gray-700 pt-4 text-sm">
          © 2025 Frontend Library <br />
          Claudio Sousa
        </div>
      </aside>
    </>
  );
}
