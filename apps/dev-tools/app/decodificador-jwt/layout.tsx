import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Decodificador de JWT Grátis | Online",
  description:
    "Cole um token JWT e veja o header e o payload decodificados, além da data de expiração. Direto no navegador.",
  alternates: { canonical: "/decodificador-jwt" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
