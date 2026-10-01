import { PDFDocument } from "pdf-lib";

/**
 * Recompacta o PDF removendo metadados e usando object streams. A redução é
 * modesta (não recomprime imagens internas) mas nunca corrompe o arquivo.
 */
export async function compressPdf(fileBuffer: Uint8Array | ArrayBuffer): Promise<Uint8Array> {
  const doc = await PDFDocument.load(fileBuffer, { updateMetadata: false });

  doc.setTitle("");
  doc.setAuthor("");
  doc.setSubject("");
  doc.setKeywords([]);
  doc.setProducer("");
  doc.setCreator("");

  return doc.save({ useObjectStreams: true });
}
