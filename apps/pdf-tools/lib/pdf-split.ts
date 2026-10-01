import { PDFDocument } from "pdf-lib";

/**
 * Extrai as páginas indicadas (1-based, na ordem informada) para um novo PDF.
 */
export async function extractPages(
  fileBuffer: Uint8Array | ArrayBuffer,
  pageNumbers: number[],
): Promise<Uint8Array> {
  const source = await PDFDocument.load(fileBuffer);
  const result = await PDFDocument.create();
  const indices = pageNumbers.map((n) => n - 1);
  const pages = await result.copyPages(source, indices);
  for (const page of pages) result.addPage(page);
  return result.save();
}

export async function getPageCount(fileBuffer: Uint8Array | ArrayBuffer): Promise<number> {
  const source = await PDFDocument.load(fileBuffer);
  return source.getPageCount();
}
