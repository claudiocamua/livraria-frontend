"use client";

import { useEffect, useState, FormEvent } from "react";
import { useBooks } from "../app/hook/useBooks";
import ProtectedRoute from "../app/components/ProtectedRoute";
import BookCard from "@/app/components/BookCard";

export default function HomePage() {
  const { books, fetchBooks } = useBooks();
  const [query, setQuery] = useState("frontend development");

  useEffect(() => {
    fetchBooks(query); // busca inicial
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      fetchBooks(query);
    }
  };

  return (
    <ProtectedRoute>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">📚 Biblioteca Online</h1>

        {/* 🔎 Formulário de busca */}
        <form onSubmit={handleSearch} className="mb-6 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar livros..."
            className="flex-1 border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </form>

        {/* 📖 Lista de livros */}
        {books.length === 0 ? (
          <p className="text-gray-500">Nenhum livro encontrado.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <li key={book.id}>
                <BookCard book={book} />
              </li>
            ))}
          </ul>
        )}
      </main>
    </ProtectedRoute>
  );
}
