"use client";

import { useEffect, useState } from "react";
import { ALGORITMOS, gerarTodosHashes, type Algoritmo } from "@/lib/hash-generator";
import { CopyButton } from "@/components/CopyButton";

export function HashGenerator() {
  const [texto, setTexto] = useState("");
  const [hashes, setHashes] = useState<Record<Algoritmo, string> | null>(null);
  const [uppercase, setUppercase] = useState(false);

  useEffect(() => {
    let cancelado = false;
    gerarTodosHashes(texto)
      .then((r) => {
        if (!cancelado) setHashes(r);
      })
      .catch(() => {
        if (!cancelado) setHashes(null);
      });
    return () => {
      cancelado = true;
    };
  }, [texto]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="hash-input" className="block text-xs font-medium text-slate-600">
          Texto
        </label>
        <textarea
          id="hash-input"
          rows={6}
          placeholder="Digite ou cole o texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:border-brand-blue focus:outline-none"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />
        Maiúsculas
      </label>

      {hashes && (
        <dl role="status" aria-live="polite" className="space-y-3 rounded-lg bg-slate-50 p-4">
          {ALGORITMOS.map((alg) => {
            const valor = uppercase ? hashes[alg].toUpperCase() : hashes[alg];
            return (
              <div key={alg}>
                <div className="flex items-center justify-between">
                  <dt className="text-xs font-medium text-slate-600">{alg}</dt>
                  <CopyButton texto={valor} />
                </div>
                <dd className="break-all font-mono text-sm text-slate-800">{valor}</dd>
              </div>
            );
          })}
        </dl>
      )}

      <p className="text-xs text-slate-500">
        O texto é codificado em UTF-8 e o hash é calculado pela Web Crypto API do seu navegador. MD5
        não está disponível por ser considerado inseguro e não ter suporte nativo.
      </p>
    </div>
  );
}
