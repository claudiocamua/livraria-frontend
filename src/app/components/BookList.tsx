import BookCard from "./BookCard";
import { Book } from "@/app/lib/books";

interface BookListProps {
  books?: Book[];
  favoritos: string[]; // IDs dos livros favoritos
  onToggleFavorito: (book: Book) => void;
}

export default function BookList({ books, favoritos, onToggleFavorito }: BookListProps) {
  if (!books || books.length === 0) {
    return (
      <p className="text-center text-blue-100 mt-10">
        Nenhum livro disponível.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {books.map((book) => (
        <BookCard
          key={book.id} // ✅ melhor usar o ID como key
          {...book}
          isFavorito={favoritos.includes(book.id)} // ✅ marca se é favorito
          onToggleFavorito={onToggleFavorito}      // ✅ função para alternar
        />
      ))}
    </div>
  );
}
