import Link from "next/link";

const ferramentas = [
  {
    href: "/gerador-link-whatsapp",
    titulo: "Gerador de Link do WhatsApp",
    descricao:
      "Crie um link (wa.me) para iniciar uma conversa no WhatsApp com número e mensagem prontos, sem salvar o contato.",
  },
  {
    href: "/qrcode-whatsapp",
    titulo: "QR Code do WhatsApp",
    descricao:
      "Gere um QR Code que abre conversa no seu WhatsApp. Baixe em PNG ou SVG para cartão de visita, vitrine ou cardápio.",
  },
  {
    href: "/botao-whatsapp-site",
    titulo: "Botão Flutuante do WhatsApp para Site",
    descricao:
      "Gere o código de um botão “Fale no WhatsApp” fixo no canto da tela para colar no seu site.",
  },
  {
    href: "/gerador-link-whatsapp-em-massa",
    titulo: "Gerador de Links em Massa",
    descricao:
      "Cole uma lista de números e gere todos os links wa.me de uma vez, com exportação em CSV ou TXT.",
  },
  {
    href: "/formatador-texto-whatsapp",
    titulo: "Formatador de Texto para WhatsApp",
    descricao:
      "Aplique negrito, itálico, tachado e monoespaçado com um clique e veja como a mensagem vai ficar.",
  },
  {
    href: "/contador-caracteres-whatsapp",
    titulo: "Contador de Caracteres",
    descricao:
      "Conte caracteres em tempo real e confira o limite do Status, da legenda de foto e do recado do perfil.",
  },
  {
    href: "/remover-formatacao-whatsapp",
    titulo: "Remover Formatação e Emojis",
    descricao:
      "Limpe asteriscos, sublinhados e emojis de um texto do WhatsApp para usar em outro lugar.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Ferramentas WhatsApp",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    description:
      "Ferramentas gratuitas para WhatsApp: gerador de link wa.me, QR Code, botão flutuante para site, links em massa e formatador de texto.",
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
      <h1 className="text-3xl font-bold text-slate-900">Ferramentas para WhatsApp</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Gere links, QR Codes e botões e formate mensagens para o WhatsApp gratuitamente. Todo o processamento acontece
        diretamente no seu navegador — nenhum dado é enviado para nenhum servidor.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {ferramentas.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-md transition hover:border-brand-green hover:shadow-lg"
          >
            <h2 className="font-semibold text-slate-900">{f.titulo}</h2>
            <p className="mt-1 text-sm text-slate-600">{f.descricao}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
