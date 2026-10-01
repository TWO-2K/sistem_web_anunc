"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/FileDropzone";
import { ToolLayout } from "@/components/ToolLayout";
import { compressPdf } from "@/lib/pdf-compress";

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function ComprimirPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);

  function handleFile(files: File[]) {
    setFile(files[0]);
    setResultSize(null);
    setError(null);
  }

  async function handleCompress() {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResultSize(null);
    try {
      const buffer = await file.arrayBuffer();
      const compressed = await compressPdf(buffer);
      setResultSize(compressed.byteLength);
      const blob = new Blob([new Uint8Array(compressed)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "documento-comprimido.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Não foi possível comprimir esse arquivo. Verifique se é um PDF válido.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <ToolLayout
      title="Comprimir PDF"
      description="Reduza o tamanho do arquivo removendo metadados e otimizando a estrutura interna do PDF."
    >
      <div className="space-y-4">
        {!file && <FileDropzone label="Escolher PDF" onFiles={handleFile} />}

        {file && (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="truncate text-slate-700">
                {file.name} · {formatSize(file.size)}
              </span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-600 hover:underline"
              >
                Trocar arquivo
              </button>
            </div>

            {resultSize !== null && (
              <p role="status" aria-live="polite" className="text-sm text-slate-600">
                Tamanho original: {formatSize(file.size)} → Comprimido: {formatSize(resultSize)}
              </p>
            )}

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleCompress}
              disabled={processing}
              aria-busy={processing}
              className="w-full rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span aria-live="polite">{processing ? "Comprimindo…" : "Comprimir e baixar PDF"}</span>
            </button>

            <p className="text-xs text-slate-400">
              A redução varia por arquivo. PDFs com imagens já compactadas ou sem metadados
              extras podem ter ganho pequeno.
            </p>
          </>
        )}
      </div>
    </ToolLayout>
  );
}
