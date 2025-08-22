"use client";
import { useState, useEffect } from "react";
import { useBooks } from "@/contexts/BooksContext";

export default function LivrosPage() {
  const { books, fetchBooks, addFavorite, favorites } = useBooks();
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchBooks(); // busca livros padrão ao carregar a página
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Buscar Livros</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchBooks(query);
        }}
        className="flex gap-2 mb-6"
      >
        <input
          className="border rounded p-2 flex-1"
          placeholder="Digite o nome do livro"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book) => {
          const isFav = favorites.some((b) => b.id === book.id);
          return (
            <div key={book.id} className="p-4 border rounded shadow">
              {book.cover && <img src={book.cover} alt={book.title} className="mb-2" />}
              <h2 className="font-bold">{book.title}</h2>
              <p className="text-sm">{book.author}</p>
              <button
                className={`w-full p-2 mt-2 rounded ${isFav ? "bg-gray-500" : "bg-green-600"} text-white`}
                onClick={() => addFavorite(book)}
                disabled={isFav}
              >
                {isFav ? "Favorito" : "Favoritar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
