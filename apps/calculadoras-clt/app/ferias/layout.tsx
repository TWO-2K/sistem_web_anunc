import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Férias CLT 2024 | Com 1/3 Constitucional",
  description:
    "Calcule o valor das férias com 1/3 constitucional e simule o abono pecuniário (venda de 1/3 das férias).",
  alternates: { canonical: "/ferias" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
