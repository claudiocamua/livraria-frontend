"use client";
import { Book } from "@/app/lib/books";
import { useBooks } from "@/contexts/BooksContext";

export function useFavoritos() {
  const { favorites, addFavorite, removeFavorite } = useBooks();

  const toggleFavorito = async (book: Book) => {
    try {
      // Verifica se já está nos favoritos (pelo id do livro)
      const fav = favorites.find((f) => f.id === book.id);

      if (fav) {
        await removeFavorite(book.id); // remove pelo id do livro
      } else {
        await addFavorite(book); // adiciona o próprio objeto do livro
      }
    } catch (err) {
      console.error("Erro ao atualizar favoritos:", err);
    }
  };

  return { favoritos: favorites, toggleFavorito };
}
