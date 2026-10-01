"use client";

import { useState } from "react";

export function CopyButton({ texto, rotulo = "Copiar" }: { texto: string; rotulo?: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard indisponível — o usuário ainda pode selecionar e copiar manualmente.
    }
  }

  return (
    <button
      type="button"
      onClick={copiar}
      className="shrink-0 text-xs font-medium text-brand-blue-dark hover:underline"
    >
      <span aria-live="polite">{copiado ? "Copiado!" : rotulo}</span>
    </button>
  );
}
