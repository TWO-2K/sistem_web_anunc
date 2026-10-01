import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-red">Erro 404</p>
      <h1 className="mt-3 text-2xl font-bold text-slate-900">Página não encontrada</h1>
      <p className="mt-3 text-sm text-slate-600">
        O endereço acessado não existe ou foi movido. Volte para a lista de calculadoras.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-brand-black px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-red"
      >
        Voltar para as calculadoras
      </Link>
    </div>
  );
}
