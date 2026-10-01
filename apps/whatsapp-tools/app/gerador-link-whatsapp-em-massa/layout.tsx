import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de Links do WhatsApp em Massa | Exporte em CSV",
  description:
    "Cole uma lista de números e gere todos os links wa.me de uma vez, com mensagem pronta. Exporte em CSV ou TXT, direto no navegador.",
  alternates: { canonical: "/gerador-link-whatsapp-em-massa" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
