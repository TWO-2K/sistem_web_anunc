import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de Link do WhatsApp Grátis | wa.me sem Salvar Contato",
  description:
    "Crie um link para iniciar uma conversa no WhatsApp com número e mensagem prontos, sem precisar salvar o contato. Direto no navegador.",
  alternates: { canonical: "/gerador-link-whatsapp" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
