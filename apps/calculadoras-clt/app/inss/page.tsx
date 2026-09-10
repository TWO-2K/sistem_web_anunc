"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput } from "@/components/CurrencyInput";
import { formatBRL, ResultCard } from "@/components/ResultCard";
import { calcularINSSDetalhado } from "@/lib/calculations";

export default function InssPage() {
  const [salarioBruto, setSalarioBruto] = useState(3000);

  const resultado = useMemo(() => calcularINSSDetalhado(salarioBruto), [salarioBruto]);

  return (
    <CalculatorLayout
      title="Calculadora de INSS"
      description="Calcule o desconto de INSS sobre o salário, faixa a faixa, de acordo com a tabela progressiva vigente."
      form={
        <div className="space-y-4">
          <CurrencyInput label="Salário bruto" value={salarioBruto} onChange={setSalarioBruto} />
        </div>
      }
      result={
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Detalhamento por faixa
            </h2>
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500">
                  <th className="pb-2 font-medium">Faixa</th>
                  <th className="pb-2 font-medium">Alíquota</th>
                  <th className="pb-2 font-medium text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resultado.faixas.map((faixa, i) => (
                  <tr key={faixa.ate}>
                    <td className="py-2 text-slate-700">
                      {formatBRL(i === 0 ? 0 : resultado.faixas[i - 1].ate)} até {formatBRL(faixa.ate)}
                    </td>
                    <td className="py-2 text-slate-700">{(faixa.aliquota * 100).toFixed(1)}%</td>
                    <td className="py-2 text-right text-slate-800">{formatBRL(faixa.valorFaixa)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ResultCard
            title="Resumo"
            lines={[
              { label: "Salário bruto", value: salarioBruto, emphasis: true },
              { label: `Alíquota efetiva: ${resultado.aliquotaEfetiva.toFixed(2)}%`, value: resultado.totalDesconto, negative: true },
            ]}
            total={{ label: "Desconto de INSS", value: resultado.totalDesconto }}
          />
        </div>
      }
    />
  );
}
