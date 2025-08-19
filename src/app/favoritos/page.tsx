"use client";

import { useEffect, useState } from "react";
import { getFrontendBooks, Book } from "@/app/lib/books";
import BookList from "@/app/components/BookList";
import { useFavoritos } from "@/app/hooks/useFavoritos";

export default function FavoritosPage() {
  const { favoritos } = useFavoritos();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      const allBooks = await getFrontendBooks();
      const favBooks = allBooks.filter((b) => favoritos.includes(b.id));
      setBooks(favBooks);
      setLoading(false);
    }
    fetchBooks();
  }, [favoritos]);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-white text-center">Meus Favoritos</h1>

      {loading ? (
        <p className="text-center text-gray-400">Carregando...</p>
      ) : books.length === 0 ? (
        <p className="text-center mt-20 text-white">Nenhum livro favoritado ainda.</p>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
}
