import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dividir PDF Grátis Online | Extrair Páginas de um PDF",
  description:
    "Escolha as páginas que quiser e extraia-as para um novo PDF, direto no navegador, sem enviar seus arquivos.",
  alternates: { canonical: "/dividir-pdf" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
