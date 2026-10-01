"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">Erro</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Algo deu errado</h1>
      <p className="mt-3 text-sm text-slate-600">
        Ocorreu um erro inesperado ao processar o arquivo. Tente novamente.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-brand-navy px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-blue"
      >
        Tentar novamente
      </button>
    </div>
  );
}
