import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Rescisão Trabalhista 2024 | Dispensa sem Justa Causa",
  description:
    "Simule os valores de uma rescisão por dispensa sem justa causa: aviso prévio, 13º, férias e multa de 40% do FGTS.",
  alternates: { canonical: "/rescisao" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
