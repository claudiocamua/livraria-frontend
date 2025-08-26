import { NextResponse } from "next/server";

export async function GET() {
  // Query de teste
  const query = "frontend OR HTML OR CSS OR JavaScript OR React";

  // API da Open Library
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
    query
  )}&fields=title,author_name,cover_i,public_scan_b,ia&limit=20`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.docs) return NextResponse.json([]);

    const books = data.docs.map((doc: any) => ({
      id: doc.key, // ex: "/works/OL12345W"
      title: doc.title || "Título desconhecido",
      author: Array.isArray(doc.author_name)
        ? doc.author_name[0]
        : "Autor desconhecido",
      cover: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : "https://via.placeholder.com/150x220?text=Sem+Capa",
      hasFullText: doc.public_scan_b === true, // se tem leitura online
      iaId: Array.isArray(doc.ia) ? doc.ia[0] : undefined, // ID do Internet Archive
    }));

    return NextResponse.json(books);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao buscar livros" });
  }
}
