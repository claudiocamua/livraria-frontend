export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
}

export async function getFrontendBooks(): Promise<Book[]> {
  const res = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=frontend+development&printType=books&langRestrict=en&maxResults=20"
  );

  const data = await res.json();

  if (!data.items) return [];

  return data.items.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title || "Título desconhecido",
    author: item.volumeInfo.authors ? item.volumeInfo.authors.join(", ") : "Autor desconhecido",
    cover: item.volumeInfo.imageLinks?.thumbnail || "",
  }));
}