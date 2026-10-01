import { buildWhatsAppLink } from "./whatsapp-link";

export interface BulkLinkResult {
  original: string;
  link: string | null;
}

/** Gera um link wa.me por linha não vazia da lista. Linhas inválidas vêm com link null. */
export function buildBulkLinks(rawList: string, message: string, ddi?: string): BulkLinkResult[] {
  return rawList
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((original) => ({ original, link: buildWhatsAppLink(original, message, ddi) }));
}

function csvField(value: string): string {
  return /[",\n;]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export function bulkLinksToCsv(results: BulkLinkResult[]): string {
  const rows = results.map((r) => [csvField(r.original), r.link ?? "", r.link ? "ok" : "inválido"].join(","));
  return ["numero,link,status", ...rows].join("\n");
}

export function bulkLinksToTxt(results: BulkLinkResult[]): string {
  return results.flatMap((r) => (r.link ? [r.link] : [])).join("\n");
}
