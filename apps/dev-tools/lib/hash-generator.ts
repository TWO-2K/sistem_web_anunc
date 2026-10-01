export const ALGORITMOS = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"] as const;
export type Algoritmo = (typeof ALGORITMOS)[number];

export function bufferParaHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function gerarHash(texto: string, algoritmo: Algoritmo): Promise<string> {
  const dados = new TextEncoder().encode(texto);
  const digest = await crypto.subtle.digest(algoritmo, dados);
  return bufferParaHex(digest);
}

export async function gerarTodosHashes(texto: string): Promise<Record<Algoritmo, string>> {
  const valores = await Promise.all(ALGORITMOS.map((a) => gerarHash(texto, a)));
  return Object.fromEntries(ALGORITMOS.map((a, i) => [a, valores[i]])) as Record<Algoritmo, string>;
}
