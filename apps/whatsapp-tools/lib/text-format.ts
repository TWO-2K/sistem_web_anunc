export type FormatStyle = "bold" | "italic" | "strike" | "mono";

export const FORMAT_MARKERS: Record<FormatStyle, string> = {
  bold: "*",
  italic: "_",
  strike: "~",
  mono: "```",
};

export interface FormatResult {
  text: string;
  selectionStart: number;
  selectionEnd: number;
}

/**
 * Envolve o trecho selecionado com o marcador do WhatsApp. Espaços nas pontas da seleção
 * ficam de fora (o WhatsApp não formata "* texto *"). Sem seleção, insere o par de
 * marcadores e posiciona o cursor no meio.
 */
export function applyFormat(text: string, start: number, end: number, style: FormatStyle): FormatResult {
  const marker = FORMAT_MARKERS[style];
  const selected = text.slice(start, end);
  const leading = selected.length - selected.trimStart().length;
  const trailing = selected.length - selected.trimEnd().length;
  const innerStart = start + leading;
  const innerEnd = Math.max(innerStart, end - trailing);
  const inner = text.slice(innerStart, innerEnd);

  return {
    text: text.slice(0, innerStart) + marker + inner + marker + text.slice(innerEnd),
    selectionStart: innerStart + marker.length,
    selectionEnd: innerEnd + marker.length,
  };
}

/** Remove a formatação do WhatsApp (*negrito*, _itálico_, ~tachado~, ```mono```), mantendo o texto. */
export function stripFormatting(text: string): string {
  return text
    .replace(/```([\s\S]*?)```/g, "$1")
    .replace(inlineMarker("\\*"), "$1")
    .replace(inlineMarker("_"), "$1")
    .replace(inlineMarker("~"), "$1");
}

/**
 * Converte o texto com marcações do WhatsApp em HTML para pré-visualização.
 * Escapa o HTML antes de aplicar as tags, então é seguro com qualquer entrada.
 */
export function toPreviewHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/```([\s\S]*?)```/g, "<code>$1</code>")
    .replace(inlineMarker("\\*"), "<strong>$1</strong>")
    .replace(inlineMarker("_"), "<em>$1</em>")
    .replace(inlineMarker("~"), "<s>$1</s>");
}

/** Marcador só vale fora de palavras (como no WhatsApp): "nome_do_arquivo" não vira itálico. */
function inlineMarker(m: string): RegExp {
  return new RegExp(`(?<![\\p{L}\\p{N}])${m}(\\S(?:[^${m}\\n]*?\\S)?)${m}(?![\\p{L}\\p{N}])`, "gu");
}

/** Remove emojis (incluindo sequências com ZWJ, tons de pele, bandeiras e seletores de variação). */
export function stripEmojis(text: string): string {
  return text
    .replace(/\p{Extended_Pictographic}(\p{Emoji_Modifier}|️|‍\p{Extended_Pictographic})*/gu, "")
    .replace(/\p{Regional_Indicator}/gu, "")
    .replace(/[️‍⃣]/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+$/gm, "");
}

/** Conta caracteres como o usuário os vê (um emoji composto conta como 1). */
export function countCharacters(text: string): number {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return Array.from(new Intl.Segmenter("pt-BR", { granularity: "grapheme" }).segment(text)).length;
  }
  return Array.from(text).length;
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}
