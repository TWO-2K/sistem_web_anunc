import Link from "next/link";

const ferramentas = [
  {
    href: "/juntar-pdf",
    titulo: "Juntar PDF",
    descricao: "Combine vários arquivos PDF em um único documento, na ordem que você escolher.",
  },
  {
    href: "/dividir-pdf",
    titulo: "Dividir PDF",
    descricao: "Extraia páginas específicas ou separe um PDF em múltiplos arquivos.",
  },
  {
    href: "/comprimir-pdf",
    titulo: "Comprimir PDF",
    descricao: "Reduza o tamanho do arquivo PDF sem enviar seus dados a nenhum servidor.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ferramentas PDF",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    description:
      "Ferramentas gratuitas para PDF: junte, divida e comprima arquivos PDF direto no navegador.",
    hasPart: ferramentas.map((f) => ({
      "@type": "WebPage",
      name: f.titulo,
      description: f.descricao,
      url: f.href,
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold text-slate-900">Ferramentas para PDF</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Junte, divida e comprima arquivos PDF gratuitamente. Todo o processamento acontece
        diretamente no seu navegador — seus arquivos nunca são enviados para nenhum servidor.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ferramentas.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-md transition hover:border-brand-blue hover:shadow-lg"
          >
            <h2 className="font-semibold text-slate-900">{f.titulo}</h2>
            <p className="mt-1 text-sm text-slate-600">{f.descricao}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
