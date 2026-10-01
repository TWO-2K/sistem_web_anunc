import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | Ferramentas WhatsApp",
  description:
    "Conheça o Ferramentas WhatsApp: utilitários gratuitos para WhatsApp que rodam inteiramente no seu navegador.",
  alternates: { canonical: "/sobre" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
