import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://utilzap.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Calculadoras CLT | Salário, Rescisão, Férias, 13º e Horas Extras",
    template: "%s",
  },
  description:
    "Calculadoras financeiras trabalhistas gratuitas: salário líquido, rescisão, férias, 13º salário e horas extras.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Calculadoras CLT",
    title: "Calculadoras CLT | Salário, Rescisão, Férias, 13º e Horas Extras",
    description:
      "Calculadoras financeiras trabalhistas gratuitas: salário líquido, rescisão, férias, 13º salário e horas extras.",
  },
  robots: { index: true, follow: true },
  verification: {
    google: "yI5Hay5bta-z9IddUYL34YJL-GZBeEFBchV46jICJOo",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-100">
        <header className="border-b-4 border-brand-red bg-brand-black">
          <div className="mx-auto flex max-w-5xl items-center px-4 py-4">
            <Link href="/" className="font-bold uppercase tracking-wide text-white">
              Calculadoras <span className="text-brand-red-light">CLT</span>
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t-4 border-brand-red bg-brand-black py-6 text-center text-xs text-slate-400">
          <p>
            Ferramenta gratuita para fins informativos. Não substitui aconselhamento contábil ou
            jurídico.
          </p>
          <Link href="/politica-de-privacidade" className="mt-2 inline-block hover:underline">
            Política de Privacidade
          </Link>
        </footer>
      </body>
    </html>
  );
}
