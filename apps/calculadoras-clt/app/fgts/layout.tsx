import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de FGTS 2024 | Depósito Mensal e Projeção de Saldo",
  description:
    "Calcule o depósito mensal do FGTS (8% do salário) e projete o saldo acumulado ao longo dos meses.",
  alternates: { canonical: "/fgts" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
