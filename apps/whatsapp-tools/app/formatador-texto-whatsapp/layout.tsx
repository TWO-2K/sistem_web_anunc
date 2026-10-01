import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formatador de Texto para WhatsApp | Negrito, Itálico e Tachado",
  description:
    "Formate mensagens do WhatsApp com negrito, itálico, tachado e monoespaçado em um clique, com pré-visualização. Grátis e direto no navegador.",
  alternates: { canonical: "/formatador-texto-whatsapp" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
