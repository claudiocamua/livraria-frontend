export interface Book {
  _id: any;
  id: string;
  title: string;
  author: string;
  cover?: string;
  infoLink?: string;     // link para ler/ver online
  downloadLink?: string; // link para baixar PDF (quando disponível)
}

export async function getFrontendBooks(): Promise<Book[]> {
  try {
    const res = await fetch(
      "https://openlibrary.org/search.json?q=frontend+development&limit=20"
    );
    const data = await res.json();

    if (!data.docs) return [];

    return data.docs.map((item: any) => ({
      id: item.key,
      title: item.title || "Título desconhecido",
      author: item.author_name ? item.author_name.join(", ") : "Autor desconhecido",
      cover: item.cover_i ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : undefined,
      infoLink: `https://openlibrary.org${item.key}`,
      downloadLink: item.isbn ? `https://openlibrary.org/download/${item.isbn[0]}` : undefined,
    }));
  } catch (err) {
    console.error("Erro ao buscar livros na Open Library:", err);
    return [];
  }
}
