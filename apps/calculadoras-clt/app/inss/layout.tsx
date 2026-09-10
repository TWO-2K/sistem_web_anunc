import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de INSS 2024 | Desconto por Faixa (Tabela Progressiva)",
  description:
    "Calcule o desconto de INSS sobre o salário, faixa a faixa, de acordo com a tabela progressiva vigente em 2024.",
  alternates: { canonical: "/inss" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
