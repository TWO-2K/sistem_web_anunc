import { describe, expect, it } from "vitest";
import { applyFormat, countCharacters, countWords, stripEmojis, stripFormatting, toPreviewHtml } from "./text-format";

describe("applyFormat", () => {
  it("envolve a seleção com o marcador", () => {
    expect(applyFormat("olá mundo", 4, 9, "bold")).toEqual({ text: "olá *mundo*", selectionStart: 5, selectionEnd: 10 });
  });

  it("deixa espaços das pontas fora do marcador", () => {
    expect(applyFormat("a b c", 1, 4, "italic").text).toBe("a _b_ c");
  });

  it("sem seleção insere o par e põe o cursor no meio", () => {
    expect(applyFormat("oi ", 3, 3, "mono")).toEqual({ text: "oi ``````", selectionStart: 6, selectionEnd: 6 });
  });
});

describe("stripFormatting", () => {
  it("remove todos os marcadores", () => {
    expect(stripFormatting("*negrito* _itálico_ ~tachado~ ```mono```")).toBe("negrito itálico tachado mono");
  });

  it("não mexe em asteriscos soltos ou snake_case", () => {
    expect(stripFormatting("2 * 3 = 6 e nome_do_arquivo")).toBe("2 * 3 = 6 e nome_do_arquivo");
  });
});

describe("toPreviewHtml", () => {
  it("converte marcadores em tags", () => {
    expect(toPreviewHtml("*a* _b_ ~c~ ```d```")).toBe("<strong>a</strong> <em>b</em> <s>c</s> <code>d</code>");
  });

  it("escapa HTML da entrada", () => {
    expect(toPreviewHtml("<img src=x onerror=alert(1)> *oi*")).toBe(
      "&lt;img src=x onerror=alert(1)&gt; <strong>oi</strong>",
    );
  });
});

describe("stripEmojis", () => {
  it("remove emojis simples, compostos e bandeiras", () => {
    expect(stripEmojis("Oi 😀 tudo 👍🏽 bem 👨‍👩‍👧 🇧🇷 ❤️")).toBe("Oi tudo bem");
  });

  it("mantém acentos e números", () => {
    expect(stripEmojis("Promoção 50% 🎉")).toBe("Promoção 50%");
  });
});

describe("contagem", () => {
  it("conta emoji composto como 1 caractere", () => {
    expect(countCharacters("oi 👨‍👩‍👧")).toBe(4);
  });

  it("conta palavras", () => {
    expect(countWords("  uma frase   curta ")).toBe(3);
    expect(countWords("   ")).toBe(0);
  });
});
