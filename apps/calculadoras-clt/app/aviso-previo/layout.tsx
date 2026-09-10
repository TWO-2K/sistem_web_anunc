import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Aviso Prévio 2024 | Proporcional ao Tempo de Empresa",
  description:
    "Calcule os dias e o valor do aviso prévio proporcional ao tempo de empresa, conforme a Lei 12.506/2011.",
  alternates: { canonical: "/aviso-previo" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
