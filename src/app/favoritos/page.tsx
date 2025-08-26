"use client";

import React from "react";
import { useBooks } from "@/contexts/BooksContext";
import BookCard from "@/app/components/BookCard";

export default function FavoritesPage() {
  const { favorites } = useBooks();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">⭐ Meus Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-500">Nenhum favorito adicionado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
