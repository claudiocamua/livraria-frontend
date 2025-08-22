"use client";

import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export type Book = {
  id: string;
  title: string;
  author: string;
  cover?: string;
  infoLink?: string;
};

type BooksContextType = {
  books: Book[];
  favorites: Book[];
  fetchBooks: (query: string) => Promise<void>;
  fetchFavorites: () => Promise<void>;
  addFavorite: (book: Book) => Promise<void>;
  removeFavorite: (bookId: string) => Promise<void>;
};

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<Book[]>([]);

  // Buscar livros da API do Google (backend Next.js)
  const fetchBooks = async (query: string) => {
    try {
      const res = await axios.get(`/api/books?q=${encodeURIComponent(query)}`);
      setBooks(res.data);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
      setBooks([]);
    }
  };

  // Buscar favoritos do usuário
  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${API}/api/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data);
    } catch (err) {
      console.error("Não foi possível carregar favoritos.", err);
      setFavorites([]);
    }
  };

  // Adicionar favorito
  const addFavorite = async (book: Book) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");
      await axios.post(`${API}/api/favorites/${book.id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchFavorites(); // Atualiza a lista
    } catch (err) {
      console.error("Não foi possível favoritar o livro.", err);
    }
  };

  // Remover favorito
  const removeFavorite = async (bookId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Usuário não autenticado");
      await axios.delete(`${API}/api/favorites/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchFavorites(); // Atualiza a lista
    } catch (err) {
      console.error("Não foi possível remover o favorito.", err);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        books,
        favorites,
        fetchBooks,
        fetchFavorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const ctx = useContext(BooksContext);
  if (!ctx) throw new Error("useBooks precisa estar dentro de BooksProvider");
  return ctx;
};
