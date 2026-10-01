"use client";

import { useMemo, useState } from "react";
import { stripEmojis, stripFormatting } from "@/lib/text-format";
import { useCopy } from "@/lib/use-copy";
import { inputClass } from "./PhoneFields";

export function FormattingRemover() {
  const [texto, setTexto] = useState("");
  const [removerFormatacao, setRemoverFormatacao] = useState(true);
  const [removerEmojis, setRemoverEmojis] = useState(true);
  const { copiado, copiar } = useCopy();

  const resultado = useMemo(() => {
    let r = texto;
    if (removerFormatacao) r = stripFormatting(r);
    if (removerEmojis) r = stripEmojis(r);
    return r;
  }, [texto, removerFormatacao, removerEmojis]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="texto" className="block text-xs font-medium text-slate-600">
          Cole o texto do WhatsApp
        </label>
        <textarea
          id="texto"
          rows={6}
          placeholder="*Promoção* de _hoje_ 🎉🔥 ..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className={inputClass}
        />
      </div>

      <fieldset className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-700">
        <legend className="sr-only">O que remover</legend>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={removerFormatacao}
            onChange={(e) => setRemoverFormatacao(e.target.checked)}
            className="accent-brand-green"
          />
          Remover formatação (<code>* _ ~ ```</code>)
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={removerEmojis}
            onChange={(e) => setRemoverEmojis(e.target.checked)}
            className="accent-brand-green"
          />
          Remover emojis
        </label>
      </fieldset>

      {texto.trim() && (
        <div className="space-y-3">
          <label htmlFor="resultado" className="block text-xs font-medium text-slate-600">
            Texto limpo
          </label>
          <textarea
            id="resultado"
            readOnly
            rows={6}
            value={resultado}
            onFocus={(e) => e.target.select()}
            className={`${inputClass} bg-slate-50`}
          />
          <button
            type="button"
            onClick={() => copiar(resultado)}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-dark"
          >
            <span aria-live="polite">{copiado ? "Copiado!" : "Copiar texto limpo"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
