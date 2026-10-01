import { describe, expect, it } from "vitest";
import { buildFloatingButtonSnippet } from "./floating-button";

describe("buildFloatingButtonSnippet", () => {
  it("inclui o link e posição à direita por padrão", () => {
    const html = buildFloatingButtonSnippet("https://wa.me/5511987654321");
    expect(html).toContain('href="https://wa.me/5511987654321"');
    expect(html).toContain("right:20px");
  });

  it("aceita posição à esquerda e texto", () => {
    const html = buildFloatingButtonSnippet("https://wa.me/55", { position: "left", label: "Fale conosco" });
    expect(html).toContain("left:20px");
    expect(html).toContain(">Fale conosco</span>");
  });

  it("escapa HTML no texto e ignora cor inválida", () => {
    const html = buildFloatingButtonSnippet("https://wa.me/55", { label: "<b>x</b>", color: "red;}" });
    expect(html).toContain("&lt;b&gt;x&lt;/b&gt;");
    expect(html).toContain("background:#25d366");
  });
});
