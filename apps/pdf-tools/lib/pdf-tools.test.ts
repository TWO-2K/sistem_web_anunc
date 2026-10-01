import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import { mergePdfs } from "./pdf-merge";
import { extractPages, getPageCount } from "./pdf-split";
import { compressPdf } from "./pdf-compress";

async function makePdf(pageCount: number): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  for (let i = 0; i < pageCount; i++) doc.addPage([200, 200]);
  return doc.save();
}

describe("mergePdfs", () => {
  it("combina as páginas de múltiplos arquivos, na ordem informada", async () => {
    const pdfA = await makePdf(2);
    const pdfB = await makePdf(3);

    const merged = await mergePdfs([pdfA, pdfB]);
    const result = await PDFDocument.load(merged);

    expect(result.getPageCount()).toBe(5);
  });
});

describe("extractPages / getPageCount", () => {
  it("extrai apenas as páginas selecionadas, na ordem pedida", async () => {
    const pdf = await makePdf(5);

    expect(await getPageCount(pdf)).toBe(5);

    const extracted = await extractPages(pdf, [3, 1]);
    const result = await PDFDocument.load(extracted);

    expect(result.getPageCount()).toBe(2);
  });
});

describe("compressPdf", () => {
  it("retorna um PDF válido com o mesmo número de páginas", async () => {
    const pdf = await makePdf(4);

    const compressed = await compressPdf(pdf);
    const result = await PDFDocument.load(compressed);

    expect(result.getPageCount()).toBe(4);
  });
});
