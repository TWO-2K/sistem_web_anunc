import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formatador e Validador de JSON Grátis | Online",
  description:
    "Cole um JSON, formate com indentação legível ou minifique, e veja erros de sintaxe na hora. Direto no navegador.",
  alternates: { canonical: "/formatador-json" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
