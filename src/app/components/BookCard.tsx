"use client";

import { Book } from "@/app/lib/books";
import Link from "next/link";
import { Star } from "lucide-react";
import { useFavoritos } from "@/app/hook/useFavoritos";

export default function BookCard({ id, title, author, cover }: Book) {
  const { favoritos, toggleFavorito } = useFavoritos();
  const favorito = favoritos.includes(id);

  const handleFavorito = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorito({ id, title, author, cover });
  };

  return (
    <Link href={`/livro/${id}`} className="relative">
      <div className="bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg p-4 rounded-lg text-center transform transition hover:scale-105 hover:shadow-2xl cursor-pointer relative">
        <button
          onClick={handleFavorito}
          className={`absolute top-2 right-2 ${favorito ? "text-yellow-400" : "text-white"}`}
        >
          <Star size={20} />
        </button>

        <img
          src={cover || "https://via.placeholder.com/150x220?text=Sem+Capa"}
          alt={title || "Livro sem título"}
          className="mx-auto h-40 w-32 object-cover rounded-md border border-blue-300"
        />
        <h3 className="mt-3 font-semibold text-white">{title || "Título desconhecido"}</h3>
        <p className="text-sm text-blue-100">{author || "Autor desconhecido"}</p>
      </div>
    </Link>
  );
}
