import Link from "next/link";

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm font-medium text-brand-blue hover:underline">
        ← Voltar para as ferramentas
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Sobre o Ferramentas PDF</h1>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <p>
            O Ferramentas PDF reúne utilitários gratuitos para trabalhar com arquivos PDF no dia
            a dia: juntar vários documentos em um só, dividir um PDF extraindo páginas
            específicas e comprimir o tamanho de um arquivo.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Como funciona</h2>
          <p className="mt-2">
            Todo o processamento acontece diretamente no seu navegador, usando as bibliotecas
            pdf-lib e pdf.js — nenhum arquivo que você envia é transmitido ou armazenado em
            servidor. Fechar ou atualizar a página descarta tudo.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">Limitações</h2>
          <p className="mt-2">
            A ferramenta de compressão reduz metadados e otimiza a estrutura do arquivo, mas não
            recomprime imagens internas — o ganho de tamanho varia conforme o PDF original.
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
