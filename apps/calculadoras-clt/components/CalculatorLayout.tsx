import Link from "next/link";
import type { ReactNode } from "react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  form: ReactNode;
  result: ReactNode;
}

export function CalculatorLayout({ title, description, form, result }: CalculatorLayoutProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/" className="text-sm font-medium text-brand-red hover:underline">
        ← Todas as calculadoras
      </Link>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-1 max-w-2xl text-slate-600">{description}</p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 border-t-4 border-t-brand-red bg-white p-5 shadow-md">
          {form}
        </div>
        <div>{result}</div>
      </div>

      <p className="mt-8 text-xs text-slate-400">
        Valores de referência com base nas tabelas de INSS e IRRF vigentes em 2024. As tabelas são
        reajustadas anualmente — este cálculo não substitui a apuração oficial do departamento
        pessoal ou contador da empresa.
      </p>
    </div>
  );
}
