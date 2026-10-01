export const MIN_QUANTIDADE = 1;
export const MAX_QUANTIDADE = 100;

export interface UuidOptions {
  uppercase?: boolean;
  semHifens?: boolean;
}

export function clampQuantidade(quantidade: number): number {
  if (!Number.isFinite(quantidade)) return MIN_QUANTIDADE;
  return Math.min(MAX_QUANTIDADE, Math.max(MIN_QUANTIDADE, Math.trunc(quantidade)));
}

export function formatUuid(uuid: string, options: UuidOptions = {}): string {
  let resultado = options.semHifens ? uuid.replace(/-/g, "") : uuid;
  if (options.uppercase) resultado = resultado.toUpperCase();
  return resultado;
}

export function generateUuids(
  quantidade: number,
  options: UuidOptions = {},
  gerar: () => string = () => crypto.randomUUID(),
): string[] {
  return Array.from({ length: clampQuantidade(quantidade) }, () => formatUuid(gerar(), options));
}
