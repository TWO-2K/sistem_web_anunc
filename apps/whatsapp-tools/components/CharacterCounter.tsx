"use client";

import { useState } from "react";
import { countCharacters, countWords } from "@/lib/text-format";
import { inputClass } from "./PhoneFields";

// Limites aproximados praticados pelo app; o WhatsApp não publica uma tabela oficial.
const LIMITES = [
  { nome: "Status (texto)", limite: 700 },
  { nome: "Legenda de foto/vídeo", limite: 1024 },
  { nome: "Recado (\"sobre\") do perfil", limite: 139 },
];

export function CharacterCounter() {
  const [texto, setTexto] = useState("");
  const caracteres = countCharacters(texto);
  const palavras = countWords(texto);
  const linhas = texto ? texto.split(/\r?\n/).length : 0;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="texto" className="block text-xs font-medium text-slate-600">
          Seu texto
        </label>
        <textarea
          id="texto"
          rows={6}
          placeholder="Digite ou cole o texto do status, legenda ou recado..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className={inputClass}
        />
      </div>

      <dl className="grid grid-cols-3 gap-3 text-center">
        {[
          ["Caracteres", caracteres],
          ["Palavras", palavras],
          ["Linhas", linhas],
        ].map(([rotulo, valor]) => (
          <div key={rotulo} className="rounded-lg bg-slate-50 p-3">
            <dt className="text-xs text-slate-500">{rotulo}</dt>
            <dd className="text-2xl font-bold tabular-nums text-slate-900">{valor}</dd>
          </div>
        ))}
      </dl>

      <ul className="space-y-3" aria-live="polite">
        {LIMITES.map(({ nome, limite }) => {
          const excedeu = caracteres > limite;
          const pct = Math.min(100, (caracteres / limite) * 100);
          return (
            <li key={nome}>
              <div className="flex justify-between text-sm">
                <span className="text-slate-700">{nome}</span>
                <span className={`tabular-nums ${excedeu ? "font-semibold text-red-600" : "text-slate-500"}`}>
                  {caracteres}/{limite}
                  {excedeu && ` · ${caracteres - limite} a mais`}
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all ${excedeu ? "bg-red-500" : "bg-brand-green"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-slate-500">
        Emojis compostos (como 👨‍👩‍👧) contam como 1 caractere. Os limites são os praticados pelo
        aplicativo e podem mudar sem aviso.
      </p>
    </div>
  );
}
