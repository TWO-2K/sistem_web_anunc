# Roadmap de funcionalidades — Ferramentas Dev

Estado atual (MVP): **Formatador e Validador de JSON** (`/formatador-json`) — 100% client-side, sem backend. Esse princípio de arquitetura deve ser mantido em toda nova ferramenta, a não ser que uma funcionalidade específica exija, de fato, um serviço externo (ver seção "Fora do client-side" no fim).

## Fase 2 — utilitários de texto e codificação

Ferramentas de baixo esforço, sem dependência externa, que ampliam o público (qualquer um que precise converter/codificar algo, não só quem mexe com JSON).

| Ferramenta | Rota sugerida | Descrição |
|---|---|---|
| ✅ Gerador de UUID | `/gerador-uuid` | Gera UUIDs v4 em lote (`crypto.randomUUID()`), com botão de copiar individual ou em lista |
| Base64 Encode/Decode | `/base64-encode-decode` | Codifica/decodifica texto em Base64 (`btoa`/`atob` com suporte a UTF-8) direto no navegador |
| Codificador/decodificador de URL | `/codificador-url` | Aplica `encodeURIComponent`/`decodeURIComponent` a um texto colado |
| Conversor de case (texto) | `/conversor-case` | Converte texto entre camelCase, snake_case, kebab-case, PascalCase e UPPER_CASE |

## Fase 3 — inspeção e depuração

| Ferramenta | Rota sugerida | Descrição | Observação técnica |
|---|---|---|---|
| ✅ Decodificador de JWT | `/decodificador-jwt` | Cola um token JWT e mostra header/payload decodificados (sem verificar assinatura) | Apenas `atob` + `JSON.parse` nas partes do token; deixar claro na UI que a assinatura não é validada |
| ✅ Comparador de texto/JSON (diff) | `/comparador-diff` | Compara dois textos/JSONs colados e destaca as diferenças linha a linha | Algoritmo de diff simples (tipo Myers) implementado em JS puro, sem lib pesada |
| ✅ Conversor de timestamp | `/conversor-timestamp` | Converte Unix timestamp ↔ data legível, com fuso horário local do navegador | `Date` nativo do JS |
| ✅ Gerador de hash (MD5/SHA) | `/gerador-hash` | Gera hash de um texto usando `SubtleCrypto` (SHA-1/256/512 nativos do navegador); MD5 exigiria lib própria, avaliar se vale a pena | Web Crypto API é nativa para SHA-*; MD5 não tem suporte nativo no navegador |

## Fase 4 — geração e validação avançada

| Ferramenta | Rota sugerida | Descrição | Observação técnica |
|---|---|---|---|
| Testador de regex | `/testador-regex` | Testa uma expressão regular contra um texto, destacando os matches | `RegExp` nativo; cuidado com regex catastrófica — considerar timeout/limite de tamanho de entrada |
| Gerador de Lorem Ipsum | `/gerador-lorem-ipsum` | Gera parágrafos/palavras de texto placeholder, com opção de tamanho | Lista de palavras fixa embutida no código, sem dependência externa |
| Conversor de cores (HEX/RGB/HSL) | `/conversor-cores` | Converte um valor de cor entre HEX, RGB e HSL, com preview visual | Fórmulas de conversão puras, sem lib |

## Fora do client-side (avaliar caso a caso antes de implementar)

- **Encurtador de URL**: exige backend para guardar o mapeamento entre link curto e original — não dá para fazer isso apenas no navegador.
- **Verificação de assinatura de JWT com segredo/chave privada**: validar a assinatura de forma seria exigiria manter o segredo em algum lugar seguro; o decodificador da Fase 3 deve deixar claro que só decodifica, não valida.
- **Testador de webhook/requisição HTTP real**: exigiria um proxy server-side para contornar CORS — foge do escopo client-side.

Caso alguma dessas seja priorizada no futuro, avaliar se compensa abrir mão do princípio "nada sai do navegador" e adicionar backend antes de implementar.

## Critério de priorização

Ordem sugerida: primeiro os utilitários de texto/codificação (Fase 2), por serem baixíssimo esforço e atraírem um público mais amplo que o do formatador de JSON. Em seguida as ferramentas de inspeção/depuração (Fase 3), voltadas a um público mais técnico mas ainda de alto volume de busca (JWT, diff, timestamp). Geração e validação avançada (Fase 4) fica por último por ter nicho mais específico e concorrência de ferramentas já bem estabelecidas. Nenhuma ferramenta que dependa de backend deve entrar sem decisão explícita sobre custo/infraestrutura.
