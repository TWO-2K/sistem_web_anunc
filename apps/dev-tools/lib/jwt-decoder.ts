export interface JwtDecodeResult {
  success: boolean;
  header?: string;
  payload?: string;
  expiraEm?: Date;
  expirado?: boolean;
  error?: string;
}

export function base64UrlDecode(parte: string): string {
  const base64 = parte.replace(/-/g, "+").replace(/_/g, "/");
  const comPadding = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binario = atob(comPadding);
  const bytes = Uint8Array.from(binario, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function decodificarParte(parte: string, nome: string): Record<string, unknown> {
  try {
    const obj = JSON.parse(base64UrlDecode(parte));
    if (typeof obj !== "object" || obj === null) throw new Error();
    return obj;
  } catch {
    throw new Error(`Não foi possível decodificar o ${nome} do token.`);
  }
}

export function decodeJwt(token: string, agora: Date = new Date()): JwtDecodeResult {
  const limpo = token.trim().replace(/^Bearer\s+/i, "");
  if (!limpo) return { success: false, error: "Cole um token JWT para decodificar." };

  const partes = limpo.split(".");
  if (partes.length !== 3) {
    return {
      success: false,
      error: "Um JWT deve ter 3 partes separadas por ponto (header.payload.assinatura).",
    };
  }

  try {
    const header = decodificarParte(partes[0], "header");
    const payload = decodificarParte(partes[1], "payload");
    const resultado: JwtDecodeResult = {
      success: true,
      header: JSON.stringify(header, null, 2),
      payload: JSON.stringify(payload, null, 2),
    };
    if (typeof payload.exp === "number") {
      resultado.expiraEm = new Date(payload.exp * 1000);
      resultado.expirado = resultado.expiraEm.getTime() < agora.getTime();
    }
    return resultado;
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Token inválido." };
  }
}
