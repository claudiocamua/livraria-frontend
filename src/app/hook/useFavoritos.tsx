"use client";

import { useState, useEffect } from "react";
import { Book } from "@/app/lib/books";

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favoritos");
    if (saved) setFavoritos(JSON.parse(saved));
  }, []);

  const toggleFavorito = async (book: Book) => {
    let updated: string[];

    if (favoritos.includes(book.id)) {
      updated = favoritos.filter((f) => f !== book.id);
      // Em breve: rota DELETE no backend
    } else {
      updated = [...favoritos, book.id];
      await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
      });
    }

    setFavoritos(updated);
    localStorage.setItem("favoritos", JSON.stringify(updated));
  };

  return { favoritos, toggleFavorito };
}
