"use client";

import { useMemo, useState } from "react";
import { formatJson, minifyJson } from "@/lib/json-formatter";

export function JsonFormatter() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"format" | "minify">("format");
  const [copiado, setCopiado] = useState(false);

  const resultado = useMemo(
    () => (mode === "format" ? formatJson(input) : minifyJson(input)),
    [input, mode],
  );
  const inputPreenchido = input.trim().length > 0;

  async function copiarResultado() {
    if (!resultado.output) return;
    try {
      await navigator.clipboard.writeText(resultado.output);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard indisponível — o usuário ainda pode selecionar e copiar manualmente.
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="json-input" className="block text-xs font-medium text-slate-600">
          JSON de entrada
        </label>
        <textarea
          id="json-input"
          rows={8}
          placeholder='{"exemplo": true}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:border-brand-blue focus:outline-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("format")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "format"
              ? "bg-brand-blue text-white"
              : "border border-slate-300 text-slate-600 hover:border-brand-blue"
          }`}
        >
          Formatar
        </button>
        <button
          type="button"
          onClick={() => setMode("minify")}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            mode === "minify"
              ? "bg-brand-blue text-white"
              : "border border-slate-300 text-slate-600 hover:border-brand-blue"
          }`}
        >
          Minificar
        </button>
      </div>

      {inputPreenchido && !resultado.success && (
        <p role="alert" className="text-sm text-red-600">
          {resultado.error}
        </p>
      )}

      {resultado.success && resultado.output && (
        <div className="space-y-3 rounded-lg bg-slate-50 p-4">
          <pre
            role="status"
            aria-live="polite"
            className="max-h-96 overflow-auto whitespace-pre-wrap break-all font-mono text-sm text-slate-700"
          >
            {resultado.output}
          </pre>
          <button
            type="button"
            onClick={copiarResultado}
            className="rounded-lg border border-brand-blue px-4 py-2 text-sm font-medium text-brand-blue-dark hover:bg-brand-blue/10"
          >
            <span aria-live="polite">{copiado ? "Copiado!" : "Copiar resultado"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
