# Roadmap de funcionalidades — Ferramentas PDF

Estado atual (MVP, em produção): **Juntar PDF**, **Dividir PDF**, **Comprimir PDF** — todas 100% client-side (`pdf-lib` + `pdfjs-dist`), sem upload de arquivo a servidor. Esse princípio de arquitetura deve ser mantido em toda nova ferramenta, a não ser que uma funcionalidade específica seja tecnicamente inviável no navegador (ver seção "Fora do client-side" no fim).

## Fase 2 — ferramentas de organização de páginas

Reaproveitam o componente `PdfPageGrid` já existente (usado em Dividir PDF), estendendo-o para suportar reordenar e girar, não só selecionar.

| Ferramenta | Rota sugerida | Descrição |
|---|---|---|
| Organizar/Reordenar páginas | `/organizar-pdf` | Arrastar para reordenar, duplicar ou excluir páginas dentro do mesmo PDF |
| Girar páginas | `/girar-pdf` | Girar páginas específicas ou o documento inteiro em 90°/180°/270° (`pdf-lib` já suporta `page.setRotation`) |
| Remover páginas | `/remover-paginas-pdf` | Variante de "Dividir" focada em excluir páginas específicas em vez de extrair — pode ser absorvida por "Organizar" em vez de rota própria |

## Fase 3 — conversão de arquivo

| Ferramenta | Rota sugerida | Descrição | Observação técnica |
|---|---|---|---|
| PDF para imagens (JPG/PNG) | `/pdf-para-imagem` | Exporta cada página como imagem, com escolha de formato e resolução | Renderiza cada página em `<canvas>` via `pdfjs-dist` (já usado para thumbnails) e baixa como imagens individuais ou `.zip` |
| Imagens para PDF | `/imagem-para-pdf` | Combina uma ou mais imagens (JPG/PNG) em um único PDF | `pdf-lib` já suporta `embedJpg`/`embedPng` — baixo esforço |
| PDF para Word/Excel | — | Alta demanda de busca, mas exige parsing de layout complexo | Ver seção "Fora do client-side" |

## Fase 4 — edição e proteção

| Ferramenta | Rota sugerida | Descrição | Observação técnica |
|---|---|---|---|
| Adicionar numeração de páginas | `/numerar-paginas-pdf` | Insere número da página em posição configurável | `pdf-lib` (`drawText` por página) |
| Adicionar marca d'água | `/marca-dagua-pdf` | Texto ou imagem sobreposta em todas as páginas, com opacidade ajustável | `pdf-lib` |
| Proteger PDF com senha | `/proteger-pdf` | Define senha de abertura/permissões | `pdf-lib` não suporta criptografia nativamente — avaliar `pdf-lib` + `qpdf`-wasm ou biblioteca alternativa que rode em WebAssembly no navegador |
| Remover senha de PDF | `/remover-senha-pdf` | Remove a proteção de um PDF, dada a senha correta | Mesma dependência acima |
| Assinar PDF (desenho/imagem) | `/assinar-pdf` | Usuário desenha ou envia uma assinatura e a posiciona no documento | Canvas de desenho + `pdf-lib embedPng` |

## Fase 5 — compressão avançada

| Ferramenta | Descrição | Observação técnica |
|---|---|---|
| Compressão real de imagens internas | Reduzir de fato o tamanho de PDFs escaneados/com muitas imagens, recomprimindo cada imagem | Requer rasterizar cada página via `pdfjs-dist` → canvas, recomprimir com qualidade ajustável e reconstruir o PDF com `pdf-lib`/`jsPDF`. Troca fidelidade de texto selecionável por tamanho de arquivo — por isso foi deixado fora do MVP (ver nota em `lib/pdf-compress.ts`). Oferecer como um modo "compressão agressiva" opcional, não padrão. |

## Fora do client-side (avaliar caso a caso antes de implementar)

Funcionalidades que dificilmente rodam bem só no navegador — implicariam abrir mão do princípio "arquivo nunca sai do dispositivo" e adicionar backend/custo de servidor:

- **PDF para Word/Excel editável**: requer reconstrução de layout complexa, normalmente feita com bibliotecas server-side (ex.: LibreOffice headless, Aspose) ou serviços pagos de terceiros.
- **OCR (tornar PDF escaneado pesquisável)**: viável com `tesseract.js` no navegador, mas é pesado (WASM grande) e lento para documentos longos — validar performance antes de prometer ao usuário.

Caso alguma dessas seja priorizada, decidir explicitamente se vale abrir mão do modelo 100% client-side (e atualizar a política de privacidade) ou se compensa investir em uma lib WASM client-side mesmo que mais lenta.

## Critério de priorização

Ordem sugerida dentro de cada fase: funcionalidades que reaproveitam componentes/libs já no projeto (`pdf-lib`, `pdfjs-dist`, `PdfPageGrid`, `FileDropzone`) e que já aparecem como filtros/sugestões nas keywords de busca do nicho ("juntar pdf", "comprimir pdf", "pdf para jpg", "organizar pdf") vêm primeiro. Ferramentas que exigem nova dependência pesada (WASM de criptografia, OCR) ficam por último e devem ser validadas quanto a tamanho de bundle e tempo de carregamento antes de entrar em produção.
