import { NextResponse } from "next/server";

export async function GET() {
  const query = "frontend OR HTML OR CSS OR JavaScript OR React OR Vue OR Angular";
  const apiKey = process.env.GOOGLE_BOOKS_KEY; // coloque no .env.local

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=20&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!data.items) return NextResponse.json([]);

  const books = data.items.map((item: any) => ({
    id: item.id,
    title: item.volumeInfo.title || "Título desconhecido",
    author: item.volumeInfo.authors?.[0] || "Autor desconhecido",
    cover:
      item.volumeInfo.imageLinks?.thumbnail ||
      "https://via.placeholder.com/150x220?text=Sem+Capa",
  }));

  return NextResponse.json(books);
}
