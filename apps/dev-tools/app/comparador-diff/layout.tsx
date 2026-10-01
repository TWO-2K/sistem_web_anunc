import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comparador de Texto e JSON (Diff) Grátis | Online",
  description:
    "Compare dois textos ou JSONs e veja as linhas adicionadas e removidas destacadas. Direto no navegador.",
  alternates: { canonical: "/comparador-diff" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
