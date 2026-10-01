import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contador de Caracteres para WhatsApp | Status, Legenda e Recado",
  description:
    "Conte caracteres em tempo real e veja se seu texto cabe no limite do Status, da legenda de foto ou do recado do perfil do WhatsApp.",
  alternates: { canonical: "/contador-caracteres-whatsapp" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
