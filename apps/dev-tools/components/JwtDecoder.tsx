"use client";

import { useMemo, useState } from "react";
import { decodeJwt } from "@/lib/jwt-decoder";
import { CopyButton } from "@/components/CopyButton";

function Bloco({ titulo, conteudo }: { titulo: string; conteudo: string }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900">{titulo}</h2>
        <CopyButton texto={conteudo} />
      </div>
      <pre className="mt-2 max-h-96 overflow-auto whitespace-pre-wrap break-all font-mono text-sm text-slate-700">
        {conteudo}
      </pre>
    </div>
  );
}

export function JwtDecoder() {
  const [token, setToken] = useState("");
  const resultado = useMemo(() => decodeJwt(token), [token]);
  const preenchido = token.trim().length > 0;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="jwt-input" className="block text-xs font-medium text-slate-600">
          Token JWT
        </label>
        <textarea
          id="jwt-input"
          rows={5}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm focus:border-brand-blue focus:outline-none"
        />
      </div>

      <p className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-800">
        Esta ferramenta apenas decodifica o token — ela <strong>não verifica a assinatura</strong>.
        Não confie no conteúdo de um JWT sem validá-lo no seu servidor.
      </p>

      {preenchido && !resultado.success && (
        <p role="alert" className="text-sm text-red-600">
          {resultado.error}
        </p>
      )}

      {resultado.success && (
        <div role="status" aria-live="polite" className="space-y-4">
          {resultado.expiraEm && (
            <p className={`text-sm font-medium ${resultado.expirado ? "text-red-600" : "text-green-700"}`}>
              {resultado.expirado ? "Expirado em " : "Expira em "}
              {resultado.expiraEm.toLocaleString("pt-BR")}
            </p>
          )}
          <Bloco titulo="Header" conteudo={resultado.header!} />
          <Bloco titulo="Payload" conteudo={resultado.payload!} />
        </div>
      )}
    </div>
  );
}
