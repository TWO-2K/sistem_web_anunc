"use client";

import { useRef, useState, type DragEvent } from "react";

interface FileDropzoneProps {
  label: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
}

function filterPdfFiles(fileList: FileList | null): File[] {
  if (!fileList) return [];
  return Array.from(fileList).filter((file) => file.type === "application/pdf");
}

export function FileDropzone({ label, multiple = false, onFiles }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragging(false);
    const files = filterPdfFiles(event.dataTransfer.files);
    if (files.length > 0) onFiles(files);
  }

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        className={`cursor-pointer rounded-lg border-2 border-dashed px-6 py-10 text-center transition ${
          dragging ? "border-brand-blue bg-blue-50" : "border-slate-300 hover:border-brand-blue"
        }`}
      >
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="mt-1 text-xs text-slate-500">Arraste um PDF aqui ou clique para escolher</p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          const files = filterPdfFiles(event.target.files);
          if (files.length > 0) onFiles(files);
          event.target.value = "";
        }}
      />
    </div>
  );
}
