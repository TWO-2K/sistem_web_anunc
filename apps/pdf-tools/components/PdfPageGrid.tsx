"use client";

import { useEffect, useState } from "react";

interface PageThumb {
  pageNumber: number;
  dataUrl: string;
}

interface PdfPageGridProps {
  file: File;
  selected: Set<number>;
  onToggle: (pageNumber: number) => void;
}

async function renderThumbnails(file: File): Promise<PageThumb[]> {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const thumbs: PageThumb[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 0.35 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d");
    if (!context) continue;
    await page.render({ canvasContext: context, viewport }).promise;
    thumbs.push({ pageNumber, dataUrl: canvas.toDataURL("image/png") });
  }

  return thumbs;
}

export function PdfPageGrid({ file, selected, onToggle }: PdfPageGridProps) {
  const [thumbs, setThumbs] = useState<PageThumb[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    renderThumbnails(file)
      .then((result) => {
        if (!cancelled) setThumbs(result);
      })
      .catch(() => {
        if (!cancelled) setError("Não foi possível ler as páginas deste PDF.");
      });
    return () => {
      cancelled = true;
    };
  }, [file]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!thumbs) return <p className="text-sm text-slate-500">Carregando páginas…</p>;

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {thumbs.map((thumb) => {
        const isSelected = selected.has(thumb.pageNumber);
        return (
          <button
            key={thumb.pageNumber}
            type="button"
            onClick={() => onToggle(thumb.pageNumber)}
            className={`relative rounded-lg border-2 p-1 transition ${
              isSelected ? "border-brand-blue bg-blue-50" : "border-slate-200 hover:border-brand-blue"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb.dataUrl} alt={`Página ${thumb.pageNumber}`} className="w-full rounded" />
            <span className="mt-1 block text-center text-xs text-slate-600">{thumb.pageNumber}</span>
          </button>
        );
      })}
    </div>
  );
}
