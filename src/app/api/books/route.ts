import { NextResponse } from "next/server";

export async function GET() {
  // Query de teste
  const query = "frontend OR HTML OR CSS OR JavaScript OR React";

  // API do Google Books sem usar chave
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    query
  )}&maxResults=20`;

  try {
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
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao buscar livros" });
  }
}
