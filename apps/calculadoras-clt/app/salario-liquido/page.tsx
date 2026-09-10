"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularSalarioLiquido } from "@/lib/calculations";

export default function SalarioLiquidoPage() {
  const [salarioBruto, setSalarioBruto] = useState(3000);
  const [dependentes, setDependentes] = useState(0);
  const [outrosDescontos, setOutrosDescontos] = useState(0);

  const resultado = useMemo(
    () => calcularSalarioLiquido({ salarioBruto, dependentes, outrosDescontos }),
    [salarioBruto, dependentes, outrosDescontos],
  );

  return (
    <CalculatorLayout
      title="Calculadora de Salário Líquido"
      description="Descubra quanto você recebe de salário líquido após os descontos de INSS e Imposto de Renda."
      form={
        <div className="space-y-4">
          <CurrencyInput label="Salário bruto" value={salarioBruto} onChange={setSalarioBruto} />
          <NumberField
            label="Número de dependentes (IRRF)"
            value={dependentes}
            onChange={setDependentes}
            min={0}
          />
          <CurrencyInput
            label="Outros descontos"
            value={outrosDescontos}
            onChange={setOutrosDescontos}
            hint="Vale-transporte, plano de saúde, adiantamentos, etc."
          />
        </div>
      }
      result={
        <ResultCard
          title="Resultado"
          lines={[
            { label: "Salário bruto", value: resultado.salarioBruto, emphasis: true },
            { label: "INSS", value: resultado.inss, negative: true },
            { label: "IRRF", value: resultado.irrf, negative: true },
            { label: "Outros descontos", value: resultado.outrosDescontos, negative: true },
            { label: "FGTS depositado pela empresa (8%)", value: resultado.fgtsDepositado },
          ]}
          total={{ label: "Salário líquido", value: resultado.salarioLiquido }}
        />
      }
    />
  );
}
