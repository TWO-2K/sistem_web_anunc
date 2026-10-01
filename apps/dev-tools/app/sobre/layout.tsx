import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | Ferramentas Dev",
  description:
    "Conheça o Ferramentas Dev: utilitários gratuitos para desenvolvedores que rodam inteiramente no seu navegador.",
  alternates: { canonical: "/sobre" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
