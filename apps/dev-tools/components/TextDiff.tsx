"use client";

import { useState } from "react";
import { diffLinhas, normalizarSeJson, type DiffLinha } from "@/lib/text-diff";

const estilos: Record<DiffLinha["tipo"], string> = {
  igual: "text-slate-700",
  adicionado: "bg-green-100 text-green-900",
  removido: "bg-red-100 text-red-900",
};
const prefixos: Record<DiffLinha["tipo"], string> = { igual: " ", adicionado: "+", removido: "-" };

export function TextDiff() {
  const [original, setOriginal] = useState("");
  const [modificado, setModificado] = useState("");
  const [normalizarJson, setNormalizarJson] = useState(true);
  const [linhas, setLinhas] = useState<DiffLinha[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  function comparar() {
    try {
      const a = normalizarJson ? normalizarSeJson(original) : original;
      const b = normalizarJson ? normalizarSeJson(modificado) : modificado;
      setLinhas(diffLinhas(a, b));
      setErro(null);
    } catch (error) {
      setLinhas(null);
      setErro(error instanceof Error ? error.message : "Não foi possível comparar.");
    }
  }

  const adicionadas = linhas?.filter((l) => l.tipo === "adicionado").length ?? 0;
  const removidas = linhas?.filter((l) => l.tipo === "removido").length ?? 0;
  const campo =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:border-brand-blue focus:outline-none";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="diff-original" className="block text-xs font-medium text-slate-600">
            Texto original
          </label>
          <textarea id="diff-original" rows={10} value={original} onChange={(e) => setOriginal(e.target.value)} className={campo} />
        </div>
        <div>
          <label htmlFor="diff-modificado" className="block text-xs font-medium text-slate-600">
            Texto modificado
          </label>
          <textarea id="diff-modificado" rows={10} value={modificado} onChange={(e) => setModificado(e.target.value)} className={campo} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="button" onClick={comparar} className="rounded-lg bg-brand-blue px-4 py-2 text-sm font-medium text-white">
          Comparar
        </button>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" checked={normalizarJson} onChange={(e) => setNormalizarJson(e.target.checked)} />
          Ignorar formatação quando for JSON
        </label>
      </div>

      {erro && (
        <p role="alert" className="text-sm text-red-600">
          {erro}
        </p>
      )}

      {linhas && (
        <div role="status" aria-live="polite" className="space-y-2">
          <p className="text-sm text-slate-600">
            {adicionadas === 0 && removidas === 0
              ? "Os textos são idênticos."
              : `${adicionadas} linha(s) adicionada(s), ${removidas} removida(s).`}
          </p>
          <pre className="max-h-[32rem] overflow-auto rounded-lg bg-slate-50 p-2 font-mono text-sm">
            {linhas.map((l, i) => (
              <div key={i} className={`whitespace-pre-wrap break-all px-2 ${estilos[l.tipo]}`}>
                {prefixos[l.tipo]} {l.texto}
              </div>
            ))}
          </pre>
        </div>
      )}
    </div>
  );
}
