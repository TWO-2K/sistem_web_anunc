# Roadmap de funcionalidades — Ferramentas WhatsApp

Estado atual (MVP, em produção): **Gerador de link wa.me** (`/gerador-link-whatsapp`) — 100% client-side, sem backend, sem API paga do WhatsApp Business. Esse princípio de arquitetura deve ser mantido em toda nova ferramenta, a não ser que uma funcionalidade específica exija, de fato, um serviço externo (ver seção "Fora do client-side" no fim).

## Fase 2 — variações do gerador de link ✅ concluída

Reaproveitam `lib/whatsapp-link.ts` (`normalizePhoneNumber`/`buildWhatsAppLink`) e o componente `WhatsAppLinkGenerator`, estendendo em vez de recriar.

| Ferramenta | Rota sugerida | Descrição |
|---|---|---|
| QR Code do link wa.me | `/qrcode-whatsapp` | Gera um QR Code do link produzido pelo gerador, para uso em cartão de visita, vitrine, cardápio impresso etc. Lib leve tipo `qrcode` (canvas/SVG, roda 100% no navegador) |
| Botão flutuante do WhatsApp (embed) | `/botao-whatsapp-site` | Gera o snippet HTML/CSS de um botão flutuante "Fale no WhatsApp" para o usuário colar no site dele, já com o link wa.me preenchido |
| Link em massa (CSV/lista) | `/gerador-link-whatsapp-em-massa` | Cola uma lista de números (um por linha) e gera todos os links de uma vez, com exportação em `.csv` ou `.txt` — útil para times comerciais |

## Fase 3 — texto e mensagens ✅ concluída

| Ferramenta | Rota sugerida | Descrição | Observação técnica |
|---|---|---|---|
| Formatador de texto WhatsApp | `/formatador-texto-whatsapp` | Aplica negrito/itálico/tachado/monoespaçado (`*texto*`, `_texto_`, `~texto~`, `` ```texto``` ``) a partir de uma seleção, sem o usuário decorar a sintaxe | Textarea + botões de formatação, manipulação de string pura, sem dependência externa |
| Contador de caracteres para status/legenda | `/contador-caracteres-whatsapp` | Mostra contagem de caracteres em tempo real com o limite do Status (700) e de legendas de mídia, alertando ao ultrapassar | Lógica simples de contagem, mesmo padrão do formatador |
| Removedor de formatação/emoji | `/remover-formatacao-whatsapp` | Limpa marcações (`*_~`) e/ou emojis de um texto colado, para reaproveitar em outro canal | Regex client-side |

## Fase 4 — grupos e catálogo

| Ferramenta | Rota sugerida | Descrição | Observação técnica |
|---|---|---|---|
| Validador de link de grupo/comunidade | `/validar-link-grupo-whatsapp` | Confere se um link `chat.whatsapp.com/...` está no formato válido e mostra preview do que será exibido | Validação de formato via regex; não há API pública para checar se o grupo ainda existe/está cheio — deixar claro essa limitação na UI |
| Gerador de link de catálogo/produto | `/link-catalogo-whatsapp` | Monta o link `wa.me/<numero>?text=` pré-preenchido perguntando sobre um produto específico, pensado para pequenos vendedores sem WhatsApp Business API | Reaproveita `buildWhatsAppLink`, só muda o texto padrão sugerido |

## Fora do client-side (avaliar caso a caso antes de implementar)

Funcionalidades que dependem de dados privados do WhatsApp ou de infraestrutura de servidor — implicariam abrir mão do princípio "nada sai do navegador" e adicionar backend/custo/API paga:

- **Envio automático/agendado de mensagens**: exige WhatsApp Business API (Meta) ou automação tipo bot, com custo por conversa e aprovação de conta comercial — foge do escopo de ferramenta gratuita e client-side.
- **Checagem se um número tem WhatsApp ativo**: não existe API pública gratuita para isso; qualquer solução exigiria automação server-side de risco (viola termos de uso do WhatsApp).
- **Disparo em massa para lista de contatos**: mesmo problema do agendamento — é o tipo de funcionalidade que costuma levar ao banimento do número e não deve ser oferecida.

Caso alguma dessas seja priorizada no futuro, decidir explicitamente se vale integrar a API oficial paga (mudando o modelo de negócio do app) — não implementar via automação não-oficial.

## Critério de priorização

Ordem sugerida: primeiro as ferramentas que reaproveitam `lib/whatsapp-link.ts` e o componente existente (QR Code, botão flutuante, link em massa — Fase 2), por serem baixo esforço e alto reaproveitamento. Em seguida as de texto (Fase 3), que não dependem de número/link e ampliam o público (quem só quer formatar mensagem). Grupos/catálogo (Fase 4) ficam por último por terem volume de busca menor e mais ressalvas de UX (não dá para validar se o link realmente funciona). Nenhuma ferramenta que dependa da API paga do WhatsApp Business deve entrar sem decisão explícita sobre monetização/custo.
