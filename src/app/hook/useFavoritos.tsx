"use client";

import { useState, useEffect } from "react";
import { Book } from "@/app/lib/books";

const API_URL = "http://localhost:4000/api/favorites";

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>([]);

  // Carrega os favoritos do backend ao iniciar
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const res = await fetch(API_URL);
        const data: Book[] = await res.json();
        setFavoritos(data.map((book) => book.id));
      } catch (err) {
        console.error("Erro ao buscar favoritos:", err);
      }
    };
    fetchFavoritos();
  }, []);

  // Adiciona ou remove favorito
  const toggleFavorito = async (book: Book) => {
    try {
      let updated: string[];

      if (favoritos.includes(book.id)) {
        // Remove do backend
        await fetch(`${API_URL}/${book.id}`, { method: "DELETE" });
        updated = favoritos.filter((f) => f !== book.id);
      } else {
        // Adiciona no backend
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        });
        updated = [...favoritos, book.id];
      }

      setFavoritos(updated);
    } catch (err) {
      console.error("Erro ao atualizar favoritos:", err);
    }
  };

  return { favoritos, toggleFavorito };
}
