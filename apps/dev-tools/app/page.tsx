import Link from "next/link";

const ferramentas = [
  {
    href: "/formatador-json",
    titulo: "Formatador e Validador de JSON",
    descricao:
      "Cole um JSON, formate com indentação legível ou minifique, e veja erros de sintaxe na hora — tudo no navegador.",
  },
  {
    href: "/gerador-uuid",
    titulo: "Gerador de UUID",
    descricao:
      "Gere UUIDs v4 aleatórios em lote, com opção de maiúsculas e sem hífens, e copie com um clique.",
  },
  {
    href: "/decodificador-jwt",
    titulo: "Decodificador de JWT",
    descricao:
      "Cole um token JWT e veja o header e o payload decodificados, além da data de expiração.",
  },
  {
    href: "/comparador-diff",
    titulo: "Comparador de Texto e JSON (Diff)",
    descricao:
      "Compare dois textos ou JSONs e veja as linhas adicionadas e removidas destacadas.",
  },
  {
    href: "/conversor-timestamp",
    titulo: "Conversor de Timestamp Unix",
    descricao:
      "Converta timestamp Unix em data legível e data em timestamp, em segundos ou milissegundos.",
  },
  {
    href: "/gerador-hash",
    titulo: "Gerador de Hash SHA",
    descricao:
      "Gere hashes SHA-1, SHA-256, SHA-384 e SHA-512 de qualquer texto, com um clique para copiar.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ferramentas Dev",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    description:
      "Ferramentas gratuitas para desenvolvedores: JSON, UUID, JWT, diff, timestamp e hash direto no navegador.",
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
      <h1 className="text-3xl font-bold text-slate-900">Ferramentas para Desenvolvedores</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Utilitários gratuitos para o dia a dia de quem programa. Todo o processamento acontece
        diretamente no seu navegador — nenhum dado é enviado para nenhum servidor.
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
