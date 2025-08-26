"use client";

import { Book, useBooks } from "@/contexts/BooksContext";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  const { favorites, addFavorite, removeFavorite } = useBooks();
const isFavorite = favorites.some((f) => f.id === book.id);

const toggleFavorite = () => {
  if (isFavorite) {
    removeFavorite(book.id); // sempre book.id (googleId)
  } else {
    addFavorite(book);
  }
};


  return (
    <div className="p-4 border rounded shadow flex flex-col">
      {book.cover && (
        <img
          src={book.cover}
          alt={book.title}
          className="mb-2 w-full h-48 object-cover rounded"
        />
      )}

      <h2 className="font-bold text-lg">{book.title}</h2>
      <p className="text-sm text-gray-600">{book.author}</p>

      <div className="mt-3 flex flex-col gap-2">
        {book.infoLink && (
          <a
            href={book.infoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-3 py-1 rounded text-center hover:bg-blue-700"
          >
            Ler Online
          </a>
        )}

        {book.downloadLink && (
          <a
            href={book.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-3 py-1 rounded text-center hover:bg-green-700"
          >
            Baixar PDF
          </a>
        )}

        <button
          onClick={toggleFavorite}
          className={`px-3 py-1 rounded text-center ${
            isFavorite ? "bg-red-600 text-white hover:bg-red-700" : "bg-yellow-500 text-black hover:bg-yellow-600"
          }`}
        >
          {isFavorite ? "Remover dos Favoritos" : "⭐ Adicionar aos Favoritos"}
        </button>
      </div>
    </div>
  );
}
