"use client";

import { useState } from "react";
import { generateUuids, MAX_QUANTIDADE, MIN_QUANTIDADE } from "@/lib/uuid-generator";

export function UuidGenerator() {
  const [quantidade, setQuantidade] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [semHifens, setSemHifens] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiado, setCopiado] = useState<number | "todos" | null>(null);

  function gerar() {
    setUuids(generateUuids(quantidade, { uppercase, semHifens }));
    setCopiado(null);
  }

  async function copiar(texto: string, alvo: number | "todos") {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(alvo);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
      // Clipboard indisponível — o usuário ainda pode selecionar e copiar manualmente.
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="uuid-quantidade" className="block text-xs font-medium text-slate-600">
            Quantidade (até {MAX_QUANTIDADE})
          </label>
          <input
            id="uuid-quantidade"
            type="number"
            min={MIN_QUANTIDADE}
            max={MAX_QUANTIDADE}
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="mt-1 w-28 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-blue focus:outline-none"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
          Maiúsculas
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" checked={semHifens} onChange={(e) => setSemHifens(e.target.checked)} />
          Sem hífens
        </label>
        <button
          type="button"
          onClick={gerar}
          className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white"
        >
          Gerar UUIDs
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-3 rounded-lg bg-slate-50 p-4">
          <ul role="status" aria-live="polite" className="max-h-96 space-y-1 overflow-auto">
            {uuids.map((uuid, i) => (
              <li key={`${uuid}-${i}`} className="flex items-center justify-between gap-2">
                <code className="break-all font-mono text-sm text-slate-700">{uuid}</code>
                <button
                  type="button"
                  onClick={() => copiar(uuid, i)}
                  className="shrink-0 text-xs font-medium text-brand-blue-dark hover:underline"
                >
                  {copiado === i ? "Copiado!" : "Copiar"}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => copiar(uuids.join("\n"), "todos")}
            className="rounded-lg border border-brand-blue px-4 py-2 text-sm font-medium text-brand-blue-dark hover:bg-brand-blue/10"
          >
            <span aria-live="polite">{copiado === "todos" ? "Copiado!" : "Copiar todos"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
