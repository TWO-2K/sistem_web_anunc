"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField, ToggleField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularFerias } from "@/lib/calculations";

export default function FeriasPage() {
  const [salarioBruto, setSalarioBruto] = useState(3000);
  const [dependentes, setDependentes] = useState(0);
  const [venderFerias, setVenderFerias] = useState(false);

  const resultado = useMemo(
    () => calcularFerias({ salarioBruto, dependentes, venderFerias }),
    [salarioBruto, dependentes, venderFerias],
  );

  return (
    <CalculatorLayout
      title="Calculadora de Férias"
      description="Calcule o valor das suas férias com o 1/3 constitucional, com ou sem venda de dias (abono pecuniário)."
      form={
        <div className="space-y-4">
          <CurrencyInput label="Salário bruto" value={salarioBruto} onChange={setSalarioBruto} />
          <NumberField
            label="Número de dependentes (IRRF)"
            value={dependentes}
            onChange={setDependentes}
            min={0}
          />
          <ToggleField
            label="Vender 1/3 das férias (abono pecuniário)"
            checked={venderFerias}
            onChange={setVenderFerias}
            hint="Você goza 20 dias e vende 10 dias, que são pagos sem desconto de INSS/IRRF."
          />
        </div>
      }
      result={
        <ResultCard
          title="Resultado"
          lines={[
            { label: `Férias (${resultado.diasGozo} dias)`, value: resultado.valorGozo },
            { label: "1/3 constitucional", value: resultado.tercoConstitucionalGozo },
            { label: "INSS", value: resultado.inss, negative: true },
            { label: "IRRF", value: resultado.irrf, negative: true },
            { label: "Líquido do período gozado", value: resultado.liquidoGozo, emphasis: true },
            ...(resultado.diasAbono > 0
              ? [
                  {
                    label: `Abono pecuniário (${resultado.diasAbono} dias, isento)`,
                    value: resultado.totalAbono,
                  },
                ]
              : []),
          ]}
          total={{ label: "Total a receber", value: resultado.totalReceber }}
        />
      }
    />
  );
}
