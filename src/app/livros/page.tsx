"use client";

import { useEffect, useState } from "react";
import { getFrontendBooks, Book } from "@/app/lib/books";
import BookCard from "@/app/components/BookCard";
import MenuLateral from "@/app/components/MenuLatral"; // importa o menu

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loginMsg, setLoginMsg] = useState("");

  const [registerMsg, setRegisterMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    getFrontendBooks().then(setBooks);
  }, []);

  return (
    <div className="min-h-screen bg-blue-950 flex">
      {/* Menu lateral */}
      

      {/* Conteúdo principal */}
      <main className="flex-1 p-6">
        {/* Mensagem login */}
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
      </main>
    </div>
  );
}
