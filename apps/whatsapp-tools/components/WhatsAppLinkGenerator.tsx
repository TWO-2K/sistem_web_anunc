"use client";

import { useMemo, useState } from "react";
import { buildWhatsAppLink } from "@/lib/whatsapp-link";
import { useCopy } from "@/lib/use-copy";
import { PhoneFields } from "./PhoneFields";

export function WhatsAppLinkGenerator() {
  const [ddi, setDdi] = useState("55");
  const [numero, setNumero] = useState("");
  const [mensagem, setMensagem] = useState("");
  const { copiado, copiar } = useCopy();

  const link = useMemo(() => buildWhatsAppLink(numero, mensagem, ddi), [numero, mensagem, ddi]);

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

      {link && (
        <div className="space-y-3 rounded-lg bg-slate-50 p-4">
          <p role="status" aria-live="polite" className="break-all text-sm text-slate-700">
            {link}
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => copiar(link)}
              className="rounded-lg border border-brand-green px-4 py-2 text-sm font-medium text-brand-green-dark hover:bg-brand-green/10"
            >
              <span aria-live="polite">{copiado ? "Copiado!" : "Copiar link"}</span>
            </button>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-dark"
            >
              Abrir no WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
