import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Horas Extras 2024 | Adicional de 50% e 100%",
  description:
    "Calcule o valor das horas extras com adicional de 50% ou 100% e o DSR (descanso semanal remunerado).",
  alternates: { canonical: "/horas-extras" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
