import type { Metadata } from "next";
import Link from "next/link";
import { CookieConsent } from "@/components/CookieConsent";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dev-tools.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ferramentas para Desenvolvedores Grátis | Formatador de JSON",
    template: "%s",
  },
  description:
    "Ferramentas gratuitas para desenvolvedores: formate e valide JSON direto no navegador, sem enviar dados para nenhum servidor.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Ferramentas Dev",
    title: "Ferramentas para Desenvolvedores Grátis | Formatador de JSON",
    description:
      "Ferramentas gratuitas para desenvolvedores: formate e valide JSON direto no navegador, sem enviar dados para nenhum servidor.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-100">
        <header className="border-b-4 border-brand-blue bg-brand-navy">
          <div className="mx-auto flex max-w-5xl items-center px-4 py-4">
            <Link href="/" className="font-bold uppercase tracking-wide text-white">
              Ferramentas <span className="text-brand-blue-light">Dev</span>
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t-4 border-brand-blue bg-brand-navy py-6 text-center text-xs text-slate-400">
          <p>
            Ferramenta gratuita. Nenhum dado que você digita é enviado ou armazenado em servidor.
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/sobre" className="hover:underline">
              Sobre
            </Link>
            <Link href="/politica-de-privacidade" className="hover:underline">
              Política de Privacidade
            </Link>
            <a href="mailto:contato@utilzap.com.br" className="hover:underline">
              Contato
            </a>
          </div>
        </footer>
        <CookieConsent />
      </body>
    </html>
  );
}
