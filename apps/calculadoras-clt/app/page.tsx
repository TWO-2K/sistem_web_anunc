import Link from "next/link";

const calculadoras = [
  {
    href: "/salario-liquido",
    titulo: "Salário Bruto → Líquido",
    descricao: "Calcule o salário líquido a partir do bruto, com descontos de INSS e IRRF.",
  },
  {
    href: "/rescisao",
    titulo: "Rescisão Trabalhista",
    descricao: "Simule os valores de uma dispensa sem justa causa: aviso prévio, 13º, férias e multa do FGTS.",
  },
  {
    href: "/ferias",
    titulo: "Férias",
    descricao: "Calcule o valor das férias com 1/3 constitucional e simule o abono pecuniário.",
  },
  {
    href: "/decimo-terceiro",
    titulo: "13º Salário",
    descricao: "Calcule o 13º integral ou proporcional, com a 1ª e 2ª parcelas.",
  },
  {
    href: "/horas-extras",
    titulo: "Horas Extras",
    descricao: "Calcule o valor das horas extras com adicional de 50% ou 100% e o DSR.",
  },
  {
    href: "/fgts",
    titulo: "FGTS",
    descricao: "Calcule o depósito mensal do FGTS e projete o saldo acumulado ao longo dos meses.",
  },
  {
    href: "/inss",
    titulo: "INSS",
    descricao: "Calcule o desconto de INSS faixa a faixa, de acordo com a tabela progressiva.",
  },
  {
    href: "/irrf",
    titulo: "IRRF",
    descricao: "Calcule o Imposto de Renda Retido na Fonte, com a faixa e alíquota efetiva aplicadas.",
  },
  {
    href: "/adicional-noturno",
    titulo: "Adicional Noturno",
    descricao: "Calcule o adicional noturno (mínimo 20%) já com a hora noturna reduzida.",
  },
  {
    href: "/aviso-previo",
    titulo: "Aviso Prévio",
    descricao: "Calcule os dias e o valor do aviso prévio proporcional ao tempo de empresa.",
  },
  {
    href: "/salario-liquido-para-bruto",
    titulo: "Salário Líquido → Bruto",
    descricao: "Informe o líquido desejado e descubra o salário bruto necessário.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculadoras CLT",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    description:
      "Calculadoras financeiras trabalhistas gratuitas: salário líquido, rescisão, férias, 13º salário e horas extras.",
    hasPart: calculadoras.map((c) => ({
      "@type": "WebPage",
      name: c.titulo,
      description: c.descricao,
      url: c.href,
    })),
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h1 className="text-3xl font-bold text-slate-900">Calculadoras financeiras/CLT</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        Ferramentas gratuitas para calcular os principais valores trabalhistas de acordo com as
        regras da CLT: salário líquido, rescisão, férias, 13º salário, horas extras, FGTS, INSS
        e IRRF. Todos os cálculos usam as tabelas oficiais vigentes em 2024 e são feitos
        diretamente no seu navegador, sem envio de dados para nenhum servidor.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {calculadoras.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-md transition hover:border-brand-red hover:shadow-lg"
          >
            <h2 className="font-semibold text-slate-900">{c.titulo}</h2>
            <p className="mt-1 text-sm text-slate-600">{c.descricao}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
