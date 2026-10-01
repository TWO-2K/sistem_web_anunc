"use client";

import { useState } from "react";

/** Copia texto para a área de transferência e expõe um flag "copiado" por 2s. */
export function useCopy() {
  const [copiado, setCopiado] = useState(false);

  async function copiar(texto: string) {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard indisponível — o usuário ainda pode selecionar e copiar manualmente.
    }
  }

  return { copiado, copiar };
}
