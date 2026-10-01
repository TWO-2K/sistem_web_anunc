import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code do WhatsApp Grátis | Gere e Baixe em PNG ou SVG",
  description:
    "Gere um QR Code que abre uma conversa no seu WhatsApp, com mensagem pronta. Baixe em PNG ou SVG para cartão de visita, vitrine ou cardápio.",
  alternates: { canonical: "/qrcode-whatsapp" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
