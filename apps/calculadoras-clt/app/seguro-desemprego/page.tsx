"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularSeguroDesemprego } from "@/lib/calculations";

const SOLICITACOES = [
  { value: 1, label: "Primeira solicitação" },
  { value: 2, label: "Segunda solicitação" },
  { value: 3, label: "Terceira ou mais" },
] as const;

export default function SeguroDesempregoPage() {
  const [mediaSalarial, setMediaSalarial] = useState(2500);
  const [mesesTrabalhados, setMesesTrabalhados] = useState(18);
  const [solicitacao, setSolicitacao] = useState<1 | 2 | 3>(1);

  const resultado = useMemo(
    () => calcularSeguroDesemprego({ mediaSalarial, mesesTrabalhados, solicitacao }),
    [mediaSalarial, mesesTrabalhados, solicitacao],
  );

  return (
    <CalculatorLayout
      title="Calculadora de Seguro-Desemprego"
      description="Descubra o valor de cada parcela e quantas parcelas você recebe ao ser dispensado sem justa causa."
      form={
        <div className="space-y-4">
          <CurrencyInput
            label="Média dos 3 últimos salários"
            value={mediaSalarial}
            onChange={setMediaSalarial}
            hint="Some os salários brutos dos 3 meses anteriores à dispensa e divida por 3."
          />
          <NumberField
            label="Meses trabalhados com carteira (últimos 36 meses)"
            value={mesesTrabalhados}
            onChange={setMesesTrabalhados}
            min={0}
            max={36}
          />
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Qual solicitação é esta?</span>
            <select
              value={solicitacao}
              onChange={(e) => setSolicitacao(Number(e.target.value) as 1 | 2 | 3)}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
            >
              {SOLICITACOES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      }
      result={
        resultado.temDireito ? (
          <ResultCard
            title="Resultado"
            lines={[
              { label: "Valor de cada parcela", value: resultado.valorParcela },
              { label: "Quantidade de parcelas", value: resultado.quantidadeParcelas, format: "number" },
            ]}
            total={{ label: "Total a receber", value: resultado.valorTotal }}
          />
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Sem direito ao benefício</p>
            <p className="mt-2">
              Para esta solicitação são necessários pelo menos {resultado.mesesMinimos} meses trabalhados
              com carteira nos últimos 36 meses.
            </p>
          </div>
        )
      }
    />
  );
}
