import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de Hash SHA-1, SHA-256 e SHA-512 Grátis | Online",
  description:
    "Gere hashes SHA-1, SHA-256, SHA-384 e SHA-512 de qualquer texto, com um clique para copiar. Direto no navegador.",
  alternates: { canonical: "/gerador-hash" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
