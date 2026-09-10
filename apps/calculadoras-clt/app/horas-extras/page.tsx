"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularHorasExtras } from "@/lib/calculations";

export default function HorasExtrasPage() {
  const [salarioBruto, setSalarioBruto] = useState(2200);
  const [jornadaMensalHoras, setJornadaMensalHoras] = useState(220);
  const [quantidadeHoras, setQuantidadeHoras] = useState(10);
  const [percentualAdicional, setPercentualAdicional] = useState(50);
  const [diasUteisMes, setDiasUteisMes] = useState(25);
  const [domingosEFeriados, setDomingosEFeriados] = useState(4);

  const resultado = useMemo(
    () =>
      calcularHorasExtras({
        salarioBruto,
        jornadaMensalHoras,
        quantidadeHoras,
        percentualAdicional,
        diasUteisMes,
        domingosEFeriados,
      }),
    [salarioBruto, jornadaMensalHoras, quantidadeHoras, percentualAdicional, diasUteisMes, domingosEFeriados],
  );

  return (
    <CalculatorLayout
      title="Calculadora de Horas Extras"
      description="Calcule o valor das horas extras com adicional de 50% ou 100%, incluindo o DSR (descanso semanal remunerado)."
      form={
        <div className="space-y-4">
          <CurrencyInput label="Salário bruto" value={salarioBruto} onChange={setSalarioBruto} />
          <NumberField
            label="Jornada mensal (horas)"
            value={jornadaMensalHoras}
            onChange={setJornadaMensalHoras}
            min={1}
            hint="Padrão CLT: 220 horas/mês."
          />
          <NumberField
            label="Quantidade de horas extras no mês"
            value={quantidadeHoras}
            onChange={setQuantidadeHoras}
            min={0}
          />
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Adicional</span>
            <select
              value={percentualAdicional}
              onChange={(e) => setPercentualAdicional(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
            >
              <option value={50}>50% (dias úteis)</option>
              <option value={100}>100% (domingos e feriados)</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              label="Dias úteis no mês"
              value={diasUteisMes}
              onChange={setDiasUteisMes}
              min={1}
            />
            <NumberField
              label="Domingos e feriados no mês"
              value={domingosEFeriados}
              onChange={setDomingosEFeriados}
              min={0}
            />
          </div>
        </div>
      }
      result={
        <ResultCard
          title="Resultado"
          lines={[
            { label: "Valor da hora normal", value: resultado.valorHoraNormal },
            { label: "Valor da hora extra", value: resultado.valorHoraExtra },
            { label: "Total de horas extras", value: resultado.totalHorasExtras, emphasis: true },
            { label: "DSR sobre horas extras", value: resultado.dsrSobreHorasExtras },
          ]}
          total={{ label: "Total a receber", value: resultado.totalComDsr }}
        />
      }
    />
  );
}
