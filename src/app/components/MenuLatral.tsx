"use client";
import Link from "next/link";

export default function MenuLateral() {
  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">📚 Biblioteca</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/" className="hover:bg-blue-600 p-2 rounded">
          Início
        </Link>
        <Link href="/livros" className="hover:bg-blue-600 p-2 rounded">
          Livros
        </Link>
        <Link href="/favoritos" className="hover:bg-blue-600 p-2 rounded">
          Favoritos
        </Link>
        <Link href="/login" className="hover:bg-blue-600 p-2 rounded">
          Login
        </Link>
        <Link href="/cadastro" className="hover:bg-blue-600 p-2 rounded">
          Cadastro
        </Link>
      </nav>
    </aside>
  );
}
