import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Seguro-Desemprego 2026 | Valor e Número de Parcelas",
  description:
    "Calcule o valor de cada parcela e quantas parcelas do seguro-desemprego você recebe, pela tabela oficial e a Lei 13.134/2015.",
  alternates: { canonical: "/seguro-desemprego" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
