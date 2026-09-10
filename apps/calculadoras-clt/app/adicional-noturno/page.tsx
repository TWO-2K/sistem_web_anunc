"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularAdicionalNoturno } from "@/lib/calculations";

export default function AdicionalNoturnoPage() {
  const [salarioBruto, setSalarioBruto] = useState(2200);
  const [jornadaMensalHoras, setJornadaMensalHoras] = useState(220);
  const [horasNoturnas, setHorasNoturnas] = useState(40);
  const [percentualAdicional, setPercentualAdicional] = useState(20);

  const resultado = useMemo(
    () => calcularAdicionalNoturno({ salarioBruto, jornadaMensalHoras, horasNoturnas, percentualAdicional }),
    [salarioBruto, jornadaMensalHoras, horasNoturnas, percentualAdicional],
  );

  return (
    <CalculatorLayout
      title="Calculadora de Adicional Noturno"
      description="Calcule o valor do adicional noturno (mínimo de 20%) sobre as horas trabalhadas entre 22h e 5h, já considerando a hora noturna reduzida."
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
            label="Horas noturnas trabalhadas no mês (22h às 5h)"
            value={horasNoturnas}
            onChange={setHorasNoturnas}
            min={0}
          />
          <NumberField
            label="Percentual do adicional (%)"
            value={percentualAdicional}
            onChange={setPercentualAdicional}
            min={20}
            hint="Mínimo legal de 20%. Convenções coletivas podem prever percentual maior."
          />
        </div>
      }
      result={
        <ResultCard
          title="Resultado"
          lines={[
            { label: "Valor da hora normal", value: resultado.valorHoraNormal },
            {
              label: "Horas noturnas equivalentes (hora reduzida)",
              value: resultado.horasNoturnasEquivalentes,
              format: "hours",
            },
            { label: "Valor das horas sem adicional", value: resultado.valorHorasNoturnasSemAdicional },
            { label: "Valor do adicional noturno", value: resultado.valorAdicionalNoturno, emphasis: true },
          ]}
          total={{ label: "Total das horas noturnas com adicional", value: resultado.totalHorasNoturnasComAdicional }}
        />
      }
    />
  );
}
