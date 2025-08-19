"use client";

import { useParams } from "next/navigation";
import { getFrontendBooks, Book } from "@/app/lib/books";
import { useEffect, useState } from "react";

export default function LivroDetalhesPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    getFrontendBooks().then((books) => {
      setBook(books.find((b) => b.id === id) || null);
    });
  }, [id]);

  if (!book) return <p className="text-center mt-20 text-white">Livro não encontrado.</p>;

  return (
    <div className="p-6 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
      <p className="text-xl mb-2">Autor: {book.author}</p>
      <img
        src={book.cover || "https://via.placeholder.com/200x300?text=Sem+Capa"}
        alt={book.title}
        className="my-4 mx-auto h-60 object-cover rounded"
      />
      <p className="text-lg mt-2">Descrição do livro...</p>
    </div>
  );
}
