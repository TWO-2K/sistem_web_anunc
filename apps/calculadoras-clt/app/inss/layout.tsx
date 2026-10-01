import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de INSS 2026 | Desconto por Faixa (Tabela Progressiva)",
  description:
    "Calcule o desconto de INSS sobre o salário, faixa a faixa, de acordo com a tabela progressiva vigente em 2026.",
  alternates: { canonical: "/inss" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
