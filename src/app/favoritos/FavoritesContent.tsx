"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/AuthCotext";

export default function FavoritesContent() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFavorites() {
      const res = await axios.get("/api/favorites", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFavorites(res.data);
    }
    fetchFavorites();
  }, []);

  const openBook = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Meus Favoritos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favorites.map((book) => (
          <div key={book._id} className="p-4 border rounded shadow">
            {book.cover && <img src={book.cover} alt={book.title} className="mb-2" />}
            <h2 className="font-bold">{book.title}</h2>
            <p className="text-sm">{book.author}</p>
            {book.infoLink && (
              <button
                onClick={() => openBook(book.infoLink)}
                className="bg-blue-600 text-white px-3 py-1 mt-2 rounded"
              >
                Abrir / Baixar PDF
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
