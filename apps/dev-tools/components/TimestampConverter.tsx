"use client";

import { useMemo, useState } from "react";
import { formatarDataLocal, fromDataLocal, fromTimestamp, type TimestampResult } from "@/lib/timestamp-converter";
import { CopyButton } from "@/components/CopyButton";

function Resultado({ r }: { r: TimestampResult }) {
  if (!r.success || !r.data) return null;
  const linhas: [string, string][] = [
    ["Data local", formatarDataLocal(r.data)],
    ["ISO 8601 (UTC)", r.iso!],
    ["Unix (segundos)", String(r.segundos)],
    ["Unix (milissegundos)", String(r.milissegundos)],
  ];
  return (
    <dl role="status" aria-live="polite" className="space-y-2 rounded-lg bg-slate-50 p-4">
      {linhas.map(([rotulo, valor]) => (
        <div key={rotulo} className="flex flex-wrap items-center justify-between gap-2">
          <dt className="text-xs font-medium text-slate-600">{rotulo}</dt>
          <dd className="flex items-center gap-3">
            <code className="break-all font-mono text-sm text-slate-800">{valor}</code>
            <CopyButton texto={valor} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dataLocal, setDataLocal] = useState("");
  const deTimestamp = useMemo(() => fromTimestamp(timestamp), [timestamp]);
  const deData = useMemo(() => fromDataLocal(dataLocal), [dataLocal]);
  const campo =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:border-brand-blue focus:outline-none";

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <div>
          <label htmlFor="ts-input" className="block text-xs font-medium text-slate-600">
            Timestamp Unix (segundos ou milissegundos)
          </label>
          <div className="flex gap-2">
            <input
              id="ts-input"
              inputMode="numeric"
              placeholder="1700000000"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className={campo}
            />
            <button
              type="button"
              onClick={() => setTimestamp(String(Math.floor(Date.now() / 1000)))}
              className="mt-1 shrink-0 rounded-lg border border-brand-blue px-4 py-2 text-sm font-medium text-brand-blue-dark hover:bg-brand-blue/10"
            >
              Agora
            </button>
          </div>
        </div>
        {timestamp.trim() && !deTimestamp.success && (
          <p role="alert" className="text-sm text-red-600">
            {deTimestamp.error}
          </p>
        )}
        <Resultado r={deTimestamp} />
      </section>

      <section className="space-y-3">
        <div>
          <label htmlFor="data-input" className="block text-xs font-medium text-slate-600">
            Data e hora (fuso do seu navegador)
          </label>
          <input
            id="data-input"
            type="datetime-local"
            step={1}
            value={dataLocal}
            onChange={(e) => setDataLocal(e.target.value)}
            className={campo}
          />
        </div>
        <Resultado r={deData} />
      </section>
    </div>
  );
}
