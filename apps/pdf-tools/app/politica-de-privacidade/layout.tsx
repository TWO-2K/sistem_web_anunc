import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Ferramentas PDF",
  description: "Política de privacidade do Ferramentas PDF.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
