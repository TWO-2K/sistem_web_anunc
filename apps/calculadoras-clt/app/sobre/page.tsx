import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm font-medium text-brand-red hover:underline">
        ← Voltar para as calculadoras
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Sobre o Calculadoras CLT</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <p>
            O Calculadoras CLT reúne ferramentas gratuitas para simular os principais valores
            trabalhistas do dia a dia de quem trabalha com carteira assinada no Brasil: salário
            líquido, rescisão, férias, 13º salário, horas extras, FGTS, INSS, IRRF, aviso prévio
            e adicional noturno.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Como funciona</h2>
          <p className="mt-2">
            Cada calculadora aplica as regras e tabelas trabalhistas vigentes para chegar a um
            valor de referência detalhado, mostrando o passo a passo do cálculo (não apenas o
            resultado final). Todo o processamento acontece no seu navegador — nenhum dado
            digitado é enviado ou armazenado em servidor.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Limitações</h2>
          <p className="mt-2">
            As tabelas de INSS, IRRF e demais parâmetros são atualizadas periodicamente, mas
            podem não refletir mudanças legislativas muito recentes. Os resultados são valores de
            referência e não substituem o cálculo oficial de um contador, departamento pessoal ou
            sindicato da categoria.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Contato</h2>
          <p className="mt-2">
            Dúvidas, sugestões ou correções podem ser enviadas para{" "}
            <a href="mailto:contato@utilzap.com.br" className="text-brand-red hover:underline">
              contato@utilzap.com.br
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
