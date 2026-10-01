import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Remover Formatação e Emojis do WhatsApp | Limpar Texto Grátis",
  description:
    "Cole um texto do WhatsApp e remova asteriscos, sublinhados, tils e emojis para reaproveitar em e-mail, site ou outra rede social.",
  alternates: { canonical: "/remover-formatacao-whatsapp" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
