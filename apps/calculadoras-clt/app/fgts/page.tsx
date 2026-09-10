"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularFGTS } from "@/lib/calculations";

export default function FgtsPage() {
  const [salarioBruto, setSalarioBruto] = useState(3000);
  const [saldoAtual, setSaldoAtual] = useState(0);
  const [meses, setMeses] = useState(12);

  const resultado = useMemo(
    () => calcularFGTS({ salarioBruto, saldoAtual, meses }),
    [salarioBruto, saldoAtual, meses],
  );

  return (
    <CalculatorLayout
      title="Calculadora de FGTS"
      description="Calcule o depósito mensal do FGTS (8% do salário bruto) e projete o saldo acumulado ao longo dos meses."
      form={
        <div className="space-y-4">
          <CurrencyInput label="Salário bruto" value={salarioBruto} onChange={setSalarioBruto} />
          <CurrencyInput
            label="Saldo atual do FGTS"
            value={saldoAtual}
            onChange={setSaldoAtual}
            hint="Opcional — some ao saldo já existente no extrato."
          />
          <NumberField
            label="Número de meses para projetar"
            value={meses}
            onChange={setMeses}
            min={1}
          />
        </div>
      }
      result={
        <ResultCard
          title="Resultado"
          lines={[
            { label: "Depósito mensal (8%)", value: resultado.depositoMensal },
            { label: `Total depositado em ${resultado.meses} meses`, value: resultado.totalDepositado },
            { label: "Saldo inicial informado", value: resultado.saldoInicial },
            {
              label: "Multa de 40% em caso de dispensa sem justa causa",
              value: resultado.multaRescisoriaEstimada,
            },
          ]}
          total={{ label: "Saldo final estimado", value: resultado.saldoFinalEstimado }}
        />
      }
    />
  );
}
