"use client";

import { useEffect, useState } from "react";
import { getFrontendBooks, Book } from "@/app/lib/books";
import BookCard from "../components/BookCard";





export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loginMsg, setLoginMsg] = useState("");

  useEffect(() => {
    getFrontendBooks().then(setBooks);
  }, []);

  
  return (
    <div className="min-h-screen bg-blue-950 p-6">
      {/* Botão de login */}
      {loginMsg && <p className="text-white mb-4">{loginMsg}</p>}
   
      {/* Exibir livros */}
      {books.length === 0 ? (
        <p className="text-blue-200">Carregando livros...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      )}
    </div>
  );
}
