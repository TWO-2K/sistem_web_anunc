export type DiffTipo = "igual" | "adicionado" | "removido";

export interface DiffLinha {
  tipo: DiffTipo;
  texto: string;
}

export const MAX_LINHAS = 5000;

// Diff linha a linha via LCS (maior subsequência comum). Usa memória O(n*m),
// por isso a entrada é limitada a MAX_LINHAS por lado.
export function diffLinhas(original: string, modificado: string): DiffLinha[] {
  const a = original.split(/\r?\n/);
  const b = modificado.split(/\r?\n/);
  if (a.length > MAX_LINHAS || b.length > MAX_LINHAS) {
    throw new Error(`Cada texto pode ter no máximo ${MAX_LINHAS} linhas.`);
  }

  const n = a.length;
  const m = b.length;
  const lcs: Uint32Array[] = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const resultado: DiffLinha[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      resultado.push({ tipo: "igual", texto: a[i] });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      resultado.push({ tipo: "removido", texto: a[i++] });
    } else {
      resultado.push({ tipo: "adicionado", texto: b[j++] });
    }
  }
  while (i < n) resultado.push({ tipo: "removido", texto: a[i++] });
  while (j < m) resultado.push({ tipo: "adicionado", texto: b[j++] });
  return resultado;
}

// Se o texto for JSON válido, normaliza a formatação antes de comparar, para que
// diferenças só de espaçamento/indentação não apareçam no diff.
export function normalizarSeJson(texto: string): string {
  try {
    return JSON.stringify(JSON.parse(texto), null, 2);
  } catch {
    return texto;
  }
}
