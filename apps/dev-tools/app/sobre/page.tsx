import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm font-medium text-brand-blue hover:underline">
        ← Voltar para as ferramentas
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Sobre o Ferramentas Dev</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <p>
            O Ferramentas Dev reúne utilitários gratuitos para o dia a dia de quem programa,
            começando pelo formatador e validador de JSON.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Como funciona</h2>
          <p className="mt-2">
            Todo o processamento acontece diretamente no seu navegador — o conteúdo que você cola
            ou digita não é enviado nem armazenado em nenhum servidor. Fechar ou atualizar a
            página descarta tudo.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Contato</h2>
          <p className="mt-2">
            Dúvidas, sugestões ou correções podem ser enviadas para{" "}
            <a href="mailto:contato@utilzap.com.br" className="text-brand-blue hover:underline">
              contato@utilzap.com.br
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
