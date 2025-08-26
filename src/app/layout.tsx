import "./globals.css";
import { AuthProvider } from "@/contexts/AuthCotext"; // cuidado: "Cotext" parece erro de digitação
import { BooksProvider } from "@/contexts/BooksContext";
import MenuLateral from "./components/MenuLatral";

export const metadata = {
  title: "Biblioteca",
  description: "Gerenciamento de livros online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="flex bg-gray-100 min-h-screen pt-14 lg:pt-0">
        <BooksProvider>
          <AuthProvider>
            <MenuLateral />
            <main className="flex-1 p-6">{children}</main>
          </AuthProvider>
        </BooksProvider>
      </body>
    </html>
  );
}
