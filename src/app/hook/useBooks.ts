"use client";

import { useState } from "react";
import axios from "axios";

interface Book {
  id: string;
  title: string;
  author?: string;
  cover?: string;
  infoLink?: string;
  downloadLink?: string;
}

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  async function fetchBooks(query: string) {
    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );

      const data = res.data.docs.map((item: any) => ({
        id: item.key, // ex: "/works/OL12345W"
        title: item.title || "Título desconhecido",
        author: item.author_name?.[0] || "Autor desconhecido",
        cover: item.cover_i
          ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
          : "https://via.placeholder.com/150x220?text=Sem+Capa",
        infoLink: `https://openlibrary.org${item.key}`,
        downloadLink: item.ia
          ? `https://archive.org/download/${item.ia[0]}/${item.ia[0]}.pdf`
          : undefined,
      }));

      setBooks(data);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
    }
  }

  function addFavorite(book: Book) {
    let favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    favs.push(book);
    localStorage.setItem("favorites", JSON.stringify(favs));
    alert(`Livro "${book.title}" adicionado aos favoritos!`);
  }

  return { books, fetchBooks, addFavorite };
}
