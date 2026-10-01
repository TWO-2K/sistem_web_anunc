import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de UUID v4 Grátis | Online",
  description:
    "Gere UUIDs v4 aleatórios em lote, com opção de maiúsculas e sem hífens, e copie com um clique. Direto no navegador.",
  alternates: { canonical: "/gerador-uuid" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
