import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conversor de Timestamp Unix Grátis | Online",
  description:
    "Converta timestamp Unix em data legível e data em timestamp, em segundos ou milissegundos. Direto no navegador.",
  alternates: { canonical: "/conversor-timestamp" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
