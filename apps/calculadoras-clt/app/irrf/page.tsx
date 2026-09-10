"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularIRRFDetalhado } from "@/lib/calculations";

export default function IrrfPage() {
  const [salarioBruto, setSalarioBruto] = useState(3000);
  const [dependentes, setDependentes] = useState(0);
  const [outrasDeducoes, setOutrasDeducoes] = useState(0);

  const resultado = useMemo(
    () => calcularIRRFDetalhado({ salarioBruto, dependentes, outrasDeducoes }),
    [salarioBruto, dependentes, outrasDeducoes],
  );

  return (
    <CalculatorLayout
      title="Calculadora de IRRF"
      description="Calcule o Imposto de Renda Retido na Fonte sobre o salário, com a faixa, alíquota e dedução aplicadas."
      form={
        <div className="space-y-4">
          <CurrencyInput label="Salário bruto" value={salarioBruto} onChange={setSalarioBruto} />
          <NumberField
            label="Número de dependentes"
            value={dependentes}
            onChange={setDependentes}
            min={0}
          />
          <CurrencyInput
            label="Outras deduções"
            value={outrasDeducoes}
            onChange={setOutrasDeducoes}
            hint="Pensão alimentícia ou previdência privada, por exemplo."
          />
        </div>
      }
      result={
        <ResultCard
          title="Resultado"
          lines={[
            { label: "Salário bruto", value: salarioBruto, emphasis: true },
            { label: "INSS descontado", value: resultado.inss, negative: true },
            { label: "Base de cálculo do IRRF", value: resultado.baseCalculo },
            {
              label: `Faixa aplicada: ${resultado.faixaAliquota.toFixed(1)}% (dedução ${resultado.faixaDeducao.toLocaleString(
                "pt-BR",
                { style: "currency", currency: "BRL" },
              )})`,
              value: resultado.irrf,
              negative: true,
            },
            { label: `Alíquota efetiva: ${resultado.aliquotaEfetiva.toFixed(2)}%`, value: resultado.irrf, negative: true },
          ]}
          total={{ label: "Salário após IRRF", value: resultado.salarioLiquidoAposIrrf }}
        />
      }
    />
  );
}
