"use client";

import { useMemo, useState } from "react";
import { buildBulkLinks, bulkLinksToCsv, bulkLinksToTxt } from "@/lib/bulk-links";
import { downloadFile } from "@/lib/download";
import { inputClass } from "./PhoneFields";

const MAX_LINHAS = 5000;
// BOM para o Excel abrir o CSV com acentuação correta.
const UTF8_BOM = "﻿";

export function BulkLinkGenerator() {
  const [ddi, setDdi] = useState("55");
  const [lista, setLista] = useState("");
  const [mensagem, setMensagem] = useState("");

  const resultados = useMemo(
    () => buildBulkLinks(lista, mensagem, ddi).slice(0, MAX_LINHAS),
    [lista, mensagem, ddi],
  );
  const validos = resultados.filter((r) => r.link).length;
  const invalidos = resultados.length - validos;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[5.5rem_1fr] gap-3">
        <div>
          <label htmlFor="ddi" className="block text-xs font-medium text-slate-600">
            DDI
          </label>
          <input
            id="ddi"
            type="text"
            inputMode="numeric"
            value={ddi}
            onChange={(e) => setDdi(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="mensagem" className="block text-xs font-medium text-slate-600">
            Mensagem para todos (opcional)
          </label>
          <input
            id="mensagem"
            type="text"
            placeholder="Olá! Tudo bem?"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="lista" className="block text-xs font-medium text-slate-600">
          Números (um por linha, com DDD)
        </label>
        <textarea
          id="lista"
          rows={8}
          placeholder={"11 98765-4321\n(21) 99876-5432\n31987654321"}
          value={lista}
          onChange={(e) => setLista(e.target.value)}
          className={`${inputClass} font-mono`}
        />
      </div>

      {resultados.length > 0 && (
        <div className="space-y-3 rounded-lg bg-slate-50 p-4">
          <p role="status" aria-live="polite" className="text-sm text-slate-700">
            <strong>{validos}</strong> link(s) gerado(s)
            {invalidos > 0 && <span className="text-red-600"> · {invalidos} número(s) inválido(s)</span>}
            {resultados.length === MAX_LINHAS && ` · limite de ${MAX_LINHAS} linhas`}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                downloadFile("links-whatsapp.csv", UTF8_BOM + bulkLinksToCsv(resultados), "text/csv;charset=utf-8")
              }
              className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-dark"
            >
              Baixar .csv
            </button>
            <button
              type="button"
              disabled={validos === 0}
              onClick={() => downloadFile("links-whatsapp.txt", bulkLinksToTxt(resultados))}
              className="rounded-lg border border-brand-green px-4 py-2 text-sm font-medium text-brand-green-dark hover:bg-brand-green/10 disabled:opacity-50"
            >
              Baixar .txt
            </button>
          </div>
          <div className="max-h-72 overflow-auto rounded border border-slate-200 bg-white">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-3 py-2 font-medium">Número</th>
                  <th className="px-3 py-2 font-medium">Link</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((r, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    <td className="whitespace-nowrap px-3 py-1.5 text-slate-700">{r.original}</td>
                    <td className="break-all px-3 py-1.5">
                      {r.link ? (
                        <a
                          href={r.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-green-dark hover:underline"
                        >
                          {r.link}
                        </a>
                      ) : (
                        <span className="text-red-600">número inválido</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
