import BookCard from "./BookCard";
import { Book } from "@/app/lib/books";

interface BookListProps {
  books?: Book[];
}

export default function BookList({ books }: BookListProps) {
  if (!books || books.length === 0) {
    return (
      <p className="text-center text-blue-100 mt-10">
        Nenhum livro disponível.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {books.map((book, index) => (
        <BookCard key={book.cover || index} {...book} />
      ))}
    </div>
  );
};
