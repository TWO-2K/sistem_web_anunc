"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/FileDropzone";
import { PdfPageGrid } from "@/components/PdfPageGrid";
import { ToolLayout } from "@/components/ToolLayout";
import { extractPages } from "@/lib/pdf-split";

export default function DividirPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(files: File[]) {
    setFile(files[0]);
    setSelected(new Set());
    setError(null);
  }

  function toggle(pageNumber: number) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(pageNumber)) next.delete(pageNumber);
      else next.add(pageNumber);
      return next;
    });
  }

  async function handleExtract() {
    if (!file || selected.size === 0) return;
    setProcessing(true);
    setError(null);
    try {
      const buffer = await file.arrayBuffer();
      const pageNumbers = Array.from(selected).sort((a, b) => a - b);
      const extracted = await extractPages(buffer, pageNumbers);
      const blob = new Blob([new Uint8Array(extracted)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "paginas-extraidas.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Não foi possível processar esse arquivo. Verifique se é um PDF válido.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <ToolLayout
      title="Dividir PDF"
      description="Envie um PDF, clique nas páginas que você quer manter e baixe um novo arquivo só com elas."
    >
      <div className="space-y-4">
        {!file && <FileDropzone label="Escolher PDF" onFiles={handleFile} />}

        {file && (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="truncate text-slate-700">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-600 hover:underline"
              >
                Trocar arquivo
              </button>
            </div>

            <PdfPageGrid file={file} selected={selected} onToggle={toggle} />

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleExtract}
              disabled={selected.size === 0 || processing}
              aria-busy={processing}
              className="w-full rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span aria-live="polite">
                {processing
                  ? "Processando…"
                  : `Extrair ${selected.size > 0 ? selected.size : ""} página(s) selecionada(s)`}
              </span>
            </button>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
