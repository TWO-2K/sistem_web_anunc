import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | Ferramentas PDF",
  description:
    "Conheça o Ferramentas PDF: ferramentas gratuitas de PDF que rodam inteiramente no seu navegador.",
  alternates: { canonical: "/sobre" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
