import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Juntar PDF Grátis Online | Combinar Vários PDFs em Um",
  description:
    "Junte vários arquivos PDF em um único documento, na ordem que você escolher, direto no navegador.",
  alternates: { canonical: "/juntar-pdf" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
