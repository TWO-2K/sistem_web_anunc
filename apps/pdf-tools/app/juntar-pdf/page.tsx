"use client";

import { useState } from "react";
import { FileDropzone } from "@/components/FileDropzone";
import { ToolLayout } from "@/components/ToolLayout";
import { mergePdfs } from "@/lib/pdf-merge";

export default function JuntarPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addFiles(newFiles: File[]) {
    setError(null);
    setFiles((current) => [...current, ...newFiles]);
  }

  function removeFile(index: number) {
    setFiles((current) => current.filter((_, i) => i !== index));
  }

  function moveFile(index: number, direction: -1 | 1) {
    setFiles((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleMerge() {
    if (files.length < 2) return;
    setProcessing(true);
    setError(null);
    try {
      const buffers = await Promise.all(files.map((file) => file.arrayBuffer()));
      const merged = await mergePdfs(buffers);
      const blob = new Blob([new Uint8Array(merged)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "documento-unido.pdf";
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Não foi possível juntar esses arquivos. Verifique se todos são PDFs válidos.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <ToolLayout
      title="Juntar PDF"
      description="Adicione dois ou mais arquivos PDF, ajuste a ordem e baixe tudo combinado em um único documento."
    >
      <div className="space-y-4">
        <FileDropzone label="Adicionar PDF" multiple onFiles={addFiles} />

        {files.length > 0 && (
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <span className="truncate">{file.name}</span>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => moveFile(index, -1)}
                    disabled={index === 0}
                    className="rounded px-2 py-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                    aria-label="Mover para cima"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveFile(index, 1)}
                    disabled={index === files.length - 1}
                    className="rounded px-2 py-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30"
                    aria-label="Mover para baixo"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="rounded px-2 py-1 text-red-600 hover:bg-red-50"
                    aria-label="Remover"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleMerge}
          disabled={files.length < 2 || processing}
          aria-busy={processing}
          className="w-full rounded-lg bg-brand-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span aria-live="polite">{processing ? "Juntando…" : "Juntar e baixar PDF"}</span>
        </button>
      </div>
    </ToolLayout>
  );
}
