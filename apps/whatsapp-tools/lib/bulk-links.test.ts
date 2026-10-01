import { describe, expect, it } from "vitest";
import { buildBulkLinks, bulkLinksToCsv, bulkLinksToTxt } from "./bulk-links";

describe("buildBulkLinks", () => {
  it("gera um link por linha e ignora linhas vazias", () => {
    const results = buildBulkLinks("11987654321\n\n  (21) 3265-4321 \n123", "oi");
    expect(results).toEqual([
      { original: "11987654321", link: "https://wa.me/5511987654321?text=oi" },
      { original: "(21) 3265-4321", link: "https://wa.me/552132654321?text=oi" },
      { original: "123", link: null },
    ]);
  });
});

describe("exportação", () => {
  const results = [
    { original: "11987654321", link: "https://wa.me/5511987654321" },
    { original: "1,2", link: null },
  ];

  it("gera CSV com cabeçalho e escapa vírgulas", () => {
    expect(bulkLinksToCsv(results)).toBe(
      'numero,link,status\n11987654321,https://wa.me/5511987654321,ok\n"1,2",,inválido',
    );
  });

  it("gera TXT só com links válidos", () => {
    expect(bulkLinksToTxt(results)).toBe("https://wa.me/5511987654321");
  });
});
