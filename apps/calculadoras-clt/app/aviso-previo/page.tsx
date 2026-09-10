"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField, ToggleField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularAvisoPrevio } from "@/lib/calculations";

export default function AvisoPrevioPage() {
  const [salarioBruto, setSalarioBruto] = useState(3000);
  const [anosCompletos, setAnosCompletos] = useState(2);
  const [indenizado, setIndenizado] = useState(true);

  const resultado = useMemo(
    () => calcularAvisoPrevio({ salarioBruto, anosCompletos, indenizado }),
    [salarioBruto, anosCompletos, indenizado],
  );

  return (
    <CalculatorLayout
      title="Calculadora de Aviso Prévio"
      description="Calcule os dias e o valor do aviso prévio proporcional (30 dias + 3 dias por ano completo de empresa, até 90 dias)."
      form={
        <div className="space-y-4">
          <CurrencyInput label="Salário bruto" value={salarioBruto} onChange={setSalarioBruto} />
          <NumberField
            label="Anos completos de empresa"
            value={anosCompletos}
            onChange={setAnosCompletos}
            min={0}
          />
          <ToggleField
            label="Aviso prévio indenizado"
            checked={indenizado}
            onChange={setIndenizado}
            hint="Desmarque se o aviso prévio foi trabalhado — nesse caso não há valor indenizado."
          />
        </div>
      }
      result={
        <ResultCard
          title="Resultado"
          lines={[
            { label: "Dias de aviso prévio", value: resultado.diasAvisoPrevio, format: "number" },
            {
              label: "Dias adicionais por tempo de empresa",
              value: resultado.diasAdicionaisPorTempo,
              format: "number",
            },
            {
              label: "Reflexo no 13º proporcional",
              value: resultado.reflexoDecimoTerceiro,
            },
            {
              label: "Reflexo nas férias proporcionais + 1/3",
              value: resultado.reflexoFerias + resultado.tercoReflexoFerias,
            },
          ]}
          total={{ label: "Valor do aviso prévio indenizado", value: resultado.valorAvisoPrevio }}
        />
      }
    />
  );
}
