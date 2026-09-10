import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Calculadoras CLT",
  description:
    "Política de privacidade do Calculadoras CLT: como os dados são tratados, uso de cookies e publicidade.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
