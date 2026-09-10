import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Adicional Noturno 2024 | Mínimo 20%",
  description:
    "Calcule o adicional noturno (mínimo 20%) já considerando a hora noturna reduzida.",
  alternates: { canonical: "/adicional-noturno" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
