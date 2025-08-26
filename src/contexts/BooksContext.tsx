"use client";

import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface Book {
  _id?: string;
  id: string; // ID do livro (OpenLibrary)
  title: string;
  author: string;
  cover?: string;
  infoLink?: string;
  downloadLink?: string;
}

export interface BooksContextType {
  books: Book[];
  favorites: Book[];
  fetchBooks: (query: string) => Promise<void>;
  fetchFavorites: () => Promise<void>;
  addFavorite: (book: Book) => Promise<void>;
  removeFavorite: (bookId: string) => Promise<void>;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>([]);

  const normalizeFavorite = (fav: any): Book => ({
    _id: fav._id,
    id: fav.bookId,
    title: fav.title,
    author: fav.author,
    cover: fav.cover || "https://via.placeholder.com/150x220?text=Sem+Capa",
    infoLink: fav.infoLink,
    downloadLink: fav.downloadLink,
  });

  const fetchBooks = async (query: string) => {
    try {
      const res = await axios.get<Book[]>(`/api/books?q=${encodeURIComponent(query)}`);
      const normalized = res.data.map((b) => ({
        ...b,
        id: b.id.replace(/^\/works\//, ""),
        cover: b.cover || "https://via.placeholder.com/150x220?text=Sem+Capa",
      }));
      setBooks(normalized);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
      setBooks([]);
    }
  };

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.get(`${API}/api/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavorites(res.data.map(normalizeFavorite));
    } catch (err) {
      console.error("Erro ao carregar favoritos:", err);
      setFavorites([]);
    }
  };

  // ✅ Adicionar favorito usando URL
  const addFavorite = async (book: Book) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const bookId = book.id.replace(/^\/works\//, "");

      const res = await axios.post(
        `${API}/api/favorites/${bookId}`, // ⬅️ passa o ID na URL
        {
          title: book.title,
          author: book.author,
          cover: book.cover,
          infoLink: book.infoLink,
          downloadLink: book.downloadLink,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const newFav = normalizeFavorite(res.data);
      setFavorites((prev) => [...prev, newFav]);
    } catch (err) {
      console.error("Não foi possível favoritar o livro:", err);
    }
  };

  // ✅ Remover favorito usando URL
  const removeFavorite = async (bookId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");

      const idToDelete = bookId.replace(/^\/works\//, "");

      await axios.delete(`${API}/api/favorites/${idToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavorites((prev) => prev.filter((f) => f._id !== idToDelete && f.id !== idToDelete));
    } catch (err) {
      console.error("Não foi possível remover o favorito:", err);
    }
  };

  return (
    <BooksContext.Provider
      value={{ books, favorites, fetchBooks, fetchFavorites, addFavorite, removeFavorite }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = (): BooksContextType => {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks precisa estar dentro de BooksProvider");
  return ctx;
};
