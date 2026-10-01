const DEFAULT_DDI = "55";

/**
 * Normaliza um número de telefone BR para o formato exigido pelo wa.me:
 * apenas dígitos, com DDI na frente (ex: 5511987654321).
 * Retorna null se, depois de limpar, o número não tiver DDD + número (10 ou 11 dígitos).
 */
export function normalizePhoneNumber(rawNumber: string, ddi: string = DEFAULT_DDI): string | null {
  const digitsOnlyDdi = ddi.replace(/\D/g, "") || DEFAULT_DDI;
  const digitsOnlyNumber = rawNumber.replace(/\D/g, "");

  if (digitsOnlyNumber.length < 10 || digitsOnlyNumber.length > 11) return null;

  return `${digitsOnlyDdi}${digitsOnlyNumber}`;
}

export function buildWhatsAppLink(rawNumber: string, message: string, ddi: string = DEFAULT_DDI): string | null {
  const normalized = normalizePhoneNumber(rawNumber, ddi);
  if (!normalized) return null;

  const params = message.trim() ? `?text=${encodeURIComponent(message.trim())}` : "";
  return `https://wa.me/${normalized}${params}`;
}
