import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de 13º Salário 2024 | Integral e Proporcional",
  description:
    "Calcule o 13º salário integral ou proporcional, com o valor da 1ª e da 2ª parcela detalhado.",
  alternates: { canonical: "/decimo-terceiro" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
