"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularSalarioBrutoAPartirDoLiquido } from "@/lib/calculations";

export default function SalarioLiquidoParaBrutoPage() {
  const [salarioLiquidoDesejado, setSalarioLiquidoDesejado] = useState(2700);
  const [dependentes, setDependentes] = useState(0);
  const [outrosDescontos, setOutrosDescontos] = useState(0);

  const resultado = useMemo(
    () => calcularSalarioBrutoAPartirDoLiquido({ salarioLiquidoDesejado, dependentes, outrosDescontos }),
    [salarioLiquidoDesejado, dependentes, outrosDescontos],
  );

  return (
    <CalculatorLayout
      title="Calculadora de Salário Líquido para Bruto"
      description="Informe o salário líquido que você quer receber e descubra qual precisa ser o salário bruto contratual."
      form={
        <div className="space-y-4">
          <CurrencyInput
            label="Salário líquido desejado"
            value={salarioLiquidoDesejado}
            onChange={setSalarioLiquidoDesejado}
          />
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
            { label: "Salário líquido desejado", value: resultado.salarioLiquidoDesejado, emphasis: true },
            { label: "INSS estimado", value: resultado.inss, negative: true },
            { label: "IRRF estimado", value: resultado.irrf, negative: true },
            { label: "Outros descontos", value: resultado.outrosDescontos, negative: true },
            { label: "Líquido obtido com esse bruto", value: resultado.salarioLiquidoObtido },
          ]}
          total={{ label: "Salário bruto necessário", value: resultado.salarioBrutoEstimado }}
        />
      }
    />
  );
}
