import Link from "next/link";

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm font-medium text-brand-green hover:underline">
        ← Voltar para as ferramentas
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Política de Privacidade</h1>
      <p className="mt-1 text-sm text-slate-500">Última atualização: 14 de setembro de 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-base font-semibold text-slate-900">1. Sobre este site</h2>
          <p className="mt-2">
            O Ferramentas WhatsApp é um site de utilitários gratuitos para WhatsApp (a começar
            pelo gerador de link de conversa). Esta política explica como tratamos as
            informações de quem visita o site.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">2. Dados digitados</h2>
          <p className="mt-2">
            O número de telefone e a mensagem que você digita são processados inteiramente no
            seu navegador (client-side). Nada disso é enviado, armazenado ou registrado em
            nenhum servidor. Ao fechar ou atualizar a página, esses dados são descartados.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">
            3. Cookies e dados de navegação
          </h2>
          <p className="mt-2">
            O site pode utilizar cookies e tecnologias semelhantes para fins de análise de
            audiência (por exemplo, Google Analytics) e para exibição de anúncios (por exemplo,
            Google AdSense). Esses serviços podem coletar informações como endereço IP, tipo de
            navegador e páginas visitadas, de acordo com suas próprias políticas de privacidade.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">4. Publicidade</h2>
          <p className="mt-2">
            Este site pode exibir anúncios de terceiros, incluindo o Google AdSense. O Google e
            seus parceiros podem usar cookies para veicular anúncios com base em visitas
            anteriores a este ou a outros sites. Você pode desativar a publicidade
            personalizada acessando as{" "}
            <a
              href="https://adssettings.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green hover:underline"
            >
              configurações de anúncios do Google
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">5. Compartilhamento de dados</h2>
          <p className="mt-2">
            Não vendemos nem compartilhamos dados pessoais com terceiros para fins comerciais
            próprios. Eventuais dados de navegação coletados por serviços de terceiros (análise
            de audiência e publicidade) seguem as políticas de privacidade desses respectivos
            serviços.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-slate-900">6. Contato</h2>
          <p className="mt-2">
            Dúvidas sobre esta política podem ser enviadas para{" "}
            <a
              href="mailto:contato@utilzap.com.br"
              className="text-brand-green hover:underline"
            >
              contato@utilzap.com.br
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
