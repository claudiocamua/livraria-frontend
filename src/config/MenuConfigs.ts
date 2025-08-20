import { Book, Star, User, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Definindo uma interface para os links para garantir a tipagem e consistência.
export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

/**
 * Gera a configuração dos links do menu lateral.
 * @param favoritosCount - O número de livros favoritos para exibir no badge.
 * @returns Uma array de objetos NavLink.
 */
export const getMenuLinks = (favoritosCount: number = 0): NavLink[] => [
  {
    href: "/livros",
    label: "Livros",
    icon: Book,
  },
  {
    href: "/favoritos",
    label: "Favoritos",
    icon: Star,
    badge: favoritosCount > 0 ? favoritosCount : undefined, // Mostra o badge apenas se houver favoritos
  },
 
  {
    href: "/settings",
    label: "Configurações",
    icon: Settings,
  },
];

