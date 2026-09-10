import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora de Salário Líquido para Bruto 2024",
  description:
    "Informe o salário líquido desejado e descubra o salário bruto necessário, com INSS e IRRF calculados.",
  alternates: { canonical: "/salario-liquido-para-bruto" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
