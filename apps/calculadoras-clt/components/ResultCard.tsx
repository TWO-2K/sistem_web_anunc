export function formatBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface ResultLine {
  label: string;
  value: number;
  emphasis?: boolean;
  negative?: boolean;
  format?: "currency" | "number" | "hours";
}

interface ResultCardProps {
  title: string;
  lines: ResultLine[];
  total: { label: string; value: number };
}

function formatLineValue(value: number, format: ResultLine["format"]): string {
  if (format === "number") return value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
  if (format === "hours") return `${value.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}h`;
  return formatBRL(value);
}

export function ResultCard({ title, lines, total }: ResultCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 border-t-4 border-t-brand-red bg-white p-5 shadow-md">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      <dl className="mt-4 divide-y divide-slate-100">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between py-2 text-sm">
            <dt className={line.emphasis ? "font-medium text-slate-800" : "text-slate-600"}>
              {line.label}
            </dt>
            <dd
              className={
                line.negative
                  ? "font-medium text-red-600"
                  : line.emphasis
                    ? "font-semibold text-slate-900"
                    : "text-slate-800"
              }
            >
              {line.negative && line.value > 0 ? "- " : ""}
              {formatLineValue(Math.abs(line.value), line.format ?? "currency")}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-brand-black px-4 py-3">
        <span className="font-medium text-white">{total.label}</span>
        <span className="text-lg font-bold text-brand-red-light">{formatBRL(total.value)}</span>
      </div>
    </div>
  );
}
