import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre | Calculadoras CLT",
  description:
    "Conheça o Calculadoras CLT: ferramentas gratuitas de cálculo trabalhista que rodam inteiramente no seu navegador.",
  alternates: { canonical: "/sobre" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
