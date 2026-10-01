export interface TimestampResult {
  success: boolean;
  data?: Date;
  segundos?: number;
  milissegundos?: number;
  iso?: string;
  error?: string;
}

function montar(data: Date): TimestampResult {
  if (Number.isNaN(data.getTime())) return { success: false, error: "Data inválida." };
  const ms = data.getTime();
  return {
    success: true,
    data,
    segundos: Math.floor(ms / 1000),
    milissegundos: ms,
    iso: data.toISOString(),
  };
}

// Valores com 13+ dígitos são tratados como milissegundos; abaixo disso, segundos.
export function fromTimestamp(entrada: string): TimestampResult {
  const limpo = entrada.trim();
  if (!limpo) return { success: false, error: "Digite um timestamp." };
  if (!/^-?\d+$/.test(limpo)) {
    return { success: false, error: "O timestamp deve conter apenas números." };
  }
  const valor = Number(limpo);
  const emMs = limpo.replace("-", "").length >= 13;
  return montar(new Date(emMs ? valor : valor * 1000));
}

// Recebe o valor de um <input type="datetime-local"> (horário local do navegador).
export function fromDataLocal(entrada: string): TimestampResult {
  if (!entrada) return { success: false, error: "Escolha uma data e hora." };
  return montar(new Date(entrada));
}

export function formatarDataLocal(data: Date): string {
  return data.toLocaleString("pt-BR", { dateStyle: "full", timeStyle: "medium" });
}
