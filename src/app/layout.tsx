import "./globals.css";
import { AuthProvider } from "@/contexts/AuthCotext";
import { BooksProvider } from "@/contexts/BooksContext";
import MenuLateral from "../app/components/MenuLatral";

export const metadata = {
  title: "Biblioteca",
  description: "Gerenciamento de livros online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="flex bg-gray-100 min-h-screen">
        <AuthProvider>
          <BooksProvider>
            <MenuLateral />
            <main className="flex-1 p-6">{children}</main>
          </BooksProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
