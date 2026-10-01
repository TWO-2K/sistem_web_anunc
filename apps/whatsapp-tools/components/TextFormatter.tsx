"use client";

import { useRef, useState } from "react";
import { applyFormat, toPreviewHtml, type FormatStyle } from "@/lib/text-format";
import { useCopy } from "@/lib/use-copy";
import { inputClass } from "./PhoneFields";

const BOTOES: { style: FormatStyle; label: string; title: string; className: string }[] = [
  { style: "bold", label: "B", title: "Negrito (*texto*)", className: "font-bold" },
  { style: "italic", label: "I", title: "Itálico (_texto_)", className: "italic" },
  { style: "strike", label: "S", title: "Tachado (~texto~)", className: "line-through" },
  { style: "mono", label: "</>", title: "Monoespaçado (```texto```)", className: "font-mono text-xs" },
];

export function TextFormatter() {
  const [texto, setTexto] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { copiado, copiar } = useCopy();

  function formatar(style: FormatStyle) {
    const el = textareaRef.current;
    if (!el) return;
    const result = applyFormat(texto, el.selectionStart, el.selectionEnd, style);
    setTexto(result.text);
    // Restaura a seleção depois que o React atualizar o valor do textarea.
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-end justify-between gap-2">
          <label htmlFor="texto" className="block text-xs font-medium text-slate-600">
            Sua mensagem — selecione um trecho e clique no estilo
          </label>
          <div role="toolbar" aria-label="Formatação" className="flex gap-1">
            {BOTOES.map((b) => (
              <button
                key={b.style}
                type="button"
                title={b.title}
                aria-label={b.title}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => formatar(b.style)}
                className={`h-8 min-w-8 rounded-md border border-slate-300 px-2 text-sm text-slate-700 hover:border-brand-green hover:bg-brand-green/10 ${b.className}`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
        <textarea
          id="texto"
          ref={textareaRef}
          rows={6}
          placeholder="Digite ou cole sua mensagem aqui..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className={inputClass}
        />
      </div>

      {texto.trim() && (
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-slate-600">Como vai aparecer no WhatsApp</p>
            <div
              className="mt-1 whitespace-pre-wrap break-words rounded-lg rounded-tl-none bg-[#d9fdd3] px-3 py-2 text-sm text-slate-900 shadow-sm [&_code]:font-mono [&_code]:text-[0.85em]"
              // Seguro: toPreviewHtml escapa todo o HTML da entrada antes de aplicar as tags.
              dangerouslySetInnerHTML={{ __html: toPreviewHtml(texto) }}
            />
          </div>
          <button
            type="button"
            onClick={() => copiar(texto)}
            className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-dark"
          >
            <span aria-live="polite">{copiado ? "Copiado!" : "Copiar texto formatado"}</span>
          </button>
        </div>
      )}

      <details className="text-sm text-slate-600">
        <summary className="cursor-pointer font-medium">Como funciona a formatação do WhatsApp</summary>
        <ul className="mt-2 list-inside list-disc space-y-1">
          <li>
            <code>*texto*</code> → <strong>negrito</strong>
          </li>
          <li>
            <code>_texto_</code> → <em>itálico</em>
          </li>
          <li>
            <code>~texto~</code> → <s>tachado</s>
          </li>
          <li>
            <code>```texto```</code> → <span className="font-mono">monoespaçado</span>
          </li>
        </ul>
      </details>
    </div>
  );
}
