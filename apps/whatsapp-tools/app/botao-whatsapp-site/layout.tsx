import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Botão Flutuante do WhatsApp para Site | Gerador de Código Grátis",
  description:
    "Gere o código HTML de um botão flutuante do WhatsApp para colar no seu site. Escolha cor, posição e texto, sem plugin e sem cadastro.",
  alternates: { canonical: "/botao-whatsapp-site" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
