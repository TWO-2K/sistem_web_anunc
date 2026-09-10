"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularDecimoTerceiro } from "@/lib/calculations";

export default function DecimoTerceiroPage() {
  const [salarioBruto, setSalarioBruto] = useState(3000);
  const [mesesTrabalhados, setMesesTrabalhados] = useState(12);
  const [dependentes, setDependentes] = useState(0);

  const resultado = useMemo(
    () => calcularDecimoTerceiro({ salarioBruto, mesesTrabalhados, dependentes }),
    [salarioBruto, mesesTrabalhados, dependentes],
  );

  return (
    <CalculatorLayout
      title="Calculadora de 13º Salário"
      description="Calcule o 13º salário integral ou proporcional, com a 1ª parcela (sem desconto) e a 2ª parcela (com INSS e IRRF)."
      form={
        <div className="space-y-4">
          <CurrencyInput label="Salário bruto" value={salarioBruto} onChange={setSalarioBruto} />
          <NumberField
            label="Meses trabalhados no ano"
            value={mesesTrabalhados}
            onChange={(v) => setMesesTrabalhados(Math.min(Math.max(v, 0), 12))}
            min={0}
            max={12}
            hint="Use 12 para o 13º integral. Considere 1 mês a cada período igual ou superior a 15 dias trabalhados."
          />
          <NumberField
            label="Número de dependentes (IRRF)"
            value={dependentes}
            onChange={setDependentes}
            min={0}
          />
        </div>
      }
      result={
        <ResultCard
          title="Resultado"
          lines={[
            { label: "Valor integral do 13º", value: resultado.valorIntegral, emphasis: true },
            { label: "1ª parcela (sem desconto)", value: resultado.primeiraParcela },
            { label: "2ª parcela (bruta)", value: resultado.segundaParcelaBruta },
            { label: "INSS (sobre o total)", value: resultado.inss, negative: true },
            { label: "IRRF (sobre o total)", value: resultado.irrf, negative: true },
            { label: "2ª parcela líquida", value: resultado.segundaParcelaLiquida },
          ]}
          total={{ label: "Total líquido a receber", value: resultado.totalLiquido }}
        />
      }
    />
  );
}
