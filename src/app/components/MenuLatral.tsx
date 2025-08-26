"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthCotext";

export default function MenuLateral() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  // Fecha menu ao trocar de tamanho para desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const LinkItem = ({ href, children }: any) => (
    <Link href={href} className="block hover:bg-blue-600 p-2 rounded" onClick={() => setOpen(false)}>
      {children}
    </Link>
  );

  return (
    <>
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-blue-700 text-white flex items-center justify-between px-4 h-14 lg:hidden">
        <button aria-label="Abrir menu" onClick={() => setOpen(v=>!v)} className="p-2">☰</button>
        <h1 className="font-bold">📚 Biblioteca</h1>
        {user ? (
          <Link href="/settings" className="p-2 underline">Config.</Link>
        ) : <span className="p-2" />}
      </header>

      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-64 bg-blue-700 text-white min-h-screen p-4 flex-col sticky top-0">
        <h2 className="text-xl font-bold mb-6">📚 Biblioteca</h2>
        <nav className="flex flex-col gap-2">
          <LinkItem href="/">Início</LinkItem>
          <LinkItem href="/favoritos">Favoritos</LinkItem>
          {user ? (
            <>
              <LinkItem href="/settings">Configurações</LinkItem>
              <button onClick={logout} className="text-left mt-2 bg-blue-600 hover:bg-blue-500 p-2 rounded">Sair</button>
            </>
          ) : (
            <>
              <LinkItem href="/login">Login</LinkItem>
              <LinkItem href="/cadastro">Cadastro</LinkItem>
            </>
          )}
        </nav>
      </aside>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-blue-700 text-white p-4">
            <h2 className="text-xl font-bold mb-6">📚 Menu</h2>
            <nav className="flex flex-col gap-2">
              <LinkItem href="/">Início</LinkItem>
              <LinkItem href="/livros">Livros</LinkItem>
              <LinkItem href="/search">Buscar</LinkItem>
              <LinkItem href="/favoritos">Favoritos</LinkItem>
              {user ? (
                <>
                  <LinkItem href="/settings">Configurações</LinkItem>
                  <button onClick={() => { logout(); setOpen(false); }} className="text-left mt-2 bg-blue-600 hover:bg-blue-500 p-2 rounded">Sair</button>
                </>
              ) : (
                <>
                  <LinkItem href="/login">Login</LinkItem>
                  <LinkItem href="/cadastro">Cadastro</LinkItem>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}