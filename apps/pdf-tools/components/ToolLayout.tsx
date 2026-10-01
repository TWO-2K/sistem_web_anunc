import Link from "next/link";
import type { ReactNode } from "react";

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm font-medium text-brand-blue hover:underline">
        ← Todas as ferramentas
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-1 max-w-2xl text-slate-600">{description}</p>

      <div className="mt-8 rounded-xl border border-slate-200 border-t-4 border-t-brand-blue bg-white p-5 shadow-md">
        {children}
      </div>

      <p className="mt-8 text-xs text-slate-400">
        Seus arquivos são processados inteiramente no seu navegador. Nenhum arquivo é enviado ou
        armazenado em servidor.
      </p>
    </div>
  );
}
