"use client";

import { useMemo, useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp-link";
import { buildFloatingButtonSnippet, type ButtonPosition } from "@/lib/floating-button";
import { useCopy } from "@/lib/use-copy";
import { PhoneFields, inputClass } from "./PhoneFields";

export function FloatingButtonGenerator() {
  const [ddi, setDdi] = useState("55");
  const [numero, setNumero] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [texto, setTexto] = useState("");
  const [posicao, setPosicao] = useState<ButtonPosition>("right");
  const [cor, setCor] = useState("#25d366");
  const { copiado, copiar } = useCopy();

  const link = useMemo(() => buildWhatsAppLink(numero, mensagem, ddi), [numero, mensagem, ddi]);
  const snippet = link ? buildFloatingButtonSnippet(link, { position: posicao, label: texto, color: cor }) : null;

  return (
    <div className="space-y-4">
      <PhoneFields
        ddi={ddi}
        numero={numero}
        mensagem={mensagem}
        onDdiChange={setDdi}
        onNumeroChange={setNumero}
        onMensagemChange={setMensagem}
        invalid={numero.trim().length > 0 && !link}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_auto]">
        <div>
          <label htmlFor="texto" className="block text-xs font-medium text-slate-600">
            Texto do botão (opcional)
          </label>
          <input
            id="texto"
            type="text"
            placeholder="Fale conosco"
            maxLength={40}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="posicao" className="block text-xs font-medium text-slate-600">
            Posição
          </label>
          <select
            id="posicao"
            value={posicao}
            onChange={(e) => setPosicao(e.target.value as ButtonPosition)}
            className={inputClass}
          >
            <option value="right">Canto direito</option>
            <option value="left">Canto esquerdo</option>
          </select>
        </div>
        <div>
          <label htmlFor="cor" className="block text-xs font-medium text-slate-600">
            Cor
          </label>
          <input
            id="cor"
            type="color"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="mt-1 h-[38px] w-16 cursor-pointer rounded-lg border border-slate-300"
          />
        </div>
      </div>

      {snippet && (
        <div className="space-y-3">
          <div className="relative h-32 overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50">
            <span className="absolute left-3 top-2 text-xs text-slate-400">Pré-visualização</span>
            {/* O snippet usa position:fixed; o transform faz ele se posicionar dentro desta caixa. */}
            <div className="absolute inset-0 [transform:translateZ(0)]" dangerouslySetInnerHTML={{ __html: snippet }} />
          </div>
          <label htmlFor="snippet" className="block text-xs font-medium text-slate-600">
            Cole este código no HTML do seu site, logo antes de &lt;/body&gt;
          </label>
          <textarea
            id="snippet"
            readOnly
            rows={8}
            value={snippet}
            onFocus={(e) => e.target.select()}
            className="w-full rounded-lg border border-slate-300 bg-slate-900 px-3 py-2 font-mono text-xs text-slate-100"
          />
          <button
            type="button"
            onClick={() => copiar(snippet)}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-dark"
          >
            <span aria-live="polite">{copiado ? "Copiado!" : "Copiar código"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
