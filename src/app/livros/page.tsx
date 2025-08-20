"use client";

import { useEffect, useState } from "react";
import { getFrontendBooks, Book } from "@/app/lib/books";
import BookCard from "../components/BookCard";
import { useFavoritos } from "@/app/hook/useFavoritos"; // <-- Import do hook

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loginMsg, setLoginMsg] = useState("");
  const { favoritos, toggleFavorito } = useFavoritos(); // <-- hook de favoritos

  useEffect(() => {
    getFrontendBooks().then(setBooks);
  }, []);

  return (
    <div className="min-h-screen bg-blue-950 p-6">
      {loginMsg && <p className="text-white mb-4">{loginMsg}</p>}

      {books.length === 0 ? (
        <p className="text-blue-200">Carregando livros...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              {...book}
              isFavorito={favoritos.includes(book.id)}
              onToggleFavorito={toggleFavorito}
            />
          ))}
        </div>
      )}
    </div>
  );
}
