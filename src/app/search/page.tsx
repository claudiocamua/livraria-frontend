"use client";

import React, { useState } from "react";
import { useBooks } from "@/contexts/BooksContext";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function SearchPage() {
  const { books, fetchBooks, favorites, addFavorite, removeFavorite } = useBooks();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetchBooks(query);
    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Pesquisar Livros</h1>

        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite um título ou autor..."
            className="border rounded px-2 py-1 flex-1"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
            Buscar
          </button>
        </form>

        {loading && <p>Carregando...</p>}
        {!loading && books.length === 0 && <p>Nenhum livro encontrado.</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book._id || book.id} className="p-4 border rounded shadow">
              <h2 className="font-bold">{book.title}</h2>
              <p className="text-sm">{book.author}</p>
              {/* Aqui você pode adicionar botões de favoritos como no LivrosPage */}
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
