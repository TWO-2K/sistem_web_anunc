import { PDFDocument } from "pdf-lib";

export async function mergePdfs(files: (Uint8Array | ArrayBuffer)[]): Promise<Uint8Array> {
  const merged = await PDFDocument.create();

  for (const fileBuffer of files) {
    const source = await PDFDocument.load(fileBuffer);
    const pages = await merged.copyPages(source, source.getPageIndices());
    for (const page of pages) merged.addPage(page);
  }

  return merged.save();
}
