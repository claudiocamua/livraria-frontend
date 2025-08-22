"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthCotext";

type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
};

export default function HomePage() {
  const { user, logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  // Busca livros da API local (Next.js)
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
    } finally {
      setLoading(false);
    }
  };

const addFavorite = async (book: Book) => {
  if (!user) return alert("Faça login para favoritar!");
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:4000/api/favorites/${book.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        cover: book.cover,
      }),
    });
    if (res.ok) alert("Livro adicionado aos favoritos!");
    else alert("Erro ao adicionar favorito.");
  } catch (err) {
    console.error(err);
    alert("Erro ao adicionar favorito.");
  }
};
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Livros em destaque</h1>
        {user && (
          <div>
            <span className="mr-4">Olá, {user.name}</span>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded"
              onClick={logout}
            >
              Sair
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <p>Carregando livros...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="p-4 border rounded shadow">
              <img src={book.cover} alt={book.title} className="mb-2" />
              <h2 className="font-bold">{book.title}</h2>
              <p className="text-sm">{book.author}</p>
              <button
                className="bg-green-600 text-white px-3 py-1 mt-2 rounded"
                onClick={() => addFavorite(book)}
              >
                Favoritar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
