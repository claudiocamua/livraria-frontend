"use client";

import { Book } from "@/app/lib/books";
import Link from "next/link";
import { Star } from "lucide-react";

interface BookCardProps extends Book {
  isFavorito: boolean;
  onToggleFavorito: (book: Book) => void;
}

export default function BookCard({
  id,
  title,
  author,
  cover,
  isFavorito,
  onToggleFavorito,
}: BookCardProps) {
  const handleFavorito = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorito({ id, title, author, cover });
  };

  return (
    <Link href={`/livro/${id}`} className="relative block">
      <div className="bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg p-4 rounded-lg text-center transform transition hover:scale-105 hover:shadow-2xl cursor-pointer relative">
        {/* Botão de Favoritar */}
        <button
          onClick={handleFavorito}
          aria-label={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={`absolute top-2 right-2 transition-colors ${
            isFavorito ? "text-yellow-400" : "text-white hover:text-yellow-200"
          }`}
        >
          <Star size={20} fill={isFavorito ? "currentColor" : "none"} />
        </button>

        {/* Imagem do Livro */}
        <img
          src={cover || "https://via.placeholder.com/150x220.png?text=Sem+Capa"}
          alt={title || "Livro sem título"}
          className="mx-auto h-40 w-32 object-cover rounded-md border border-blue-700 bg-blue-200"
        />

        {/* Informações */}
        <h3 className="mt-3 font-semibold text-white line-clamp-2">
          {title || "Título desconhecido"}
        </h3>
        <p className="text-sm text-blue-100">{author || "Autor desconhecido"}</p>
      </div>
    </Link>
  );
}
