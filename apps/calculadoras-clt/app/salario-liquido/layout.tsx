import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Salário Líquido 2024 | Bruto para Líquido",
  description:
    "Calcule o salário líquido a partir do bruto, com descontos de INSS e IRRF atualizados, dependentes e outros descontos.",
  alternates: { canonical: "/salario-liquido" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
