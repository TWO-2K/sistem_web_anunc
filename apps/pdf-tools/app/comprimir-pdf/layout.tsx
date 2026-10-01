import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comprimir PDF Grátis Online | Reduzir Tamanho de Arquivo PDF",
  description:
    "Reduza o tamanho do seu arquivo PDF direto no navegador, sem enviar o documento para nenhum servidor.",
  alternates: { canonical: "/comprimir-pdf" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
