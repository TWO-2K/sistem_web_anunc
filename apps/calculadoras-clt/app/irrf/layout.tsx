import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de IRRF 2024 | Imposto de Renda Retido na Fonte",
  description:
    "Calcule o Imposto de Renda Retido na Fonte sobre o salário, com a faixa e a alíquota efetiva aplicadas.",
  alternates: { canonical: "/irrf" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
