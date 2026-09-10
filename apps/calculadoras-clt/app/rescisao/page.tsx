"use client";

import { useMemo, useState } from "react";
import { CalculatorLayout } from "@/components/CalculatorLayout";
import { CurrencyInput, NumberField, ToggleField } from "@/components/CurrencyInput";
import { ResultCard } from "@/components/ResultCard";
import { calcularRescisao } from "@/lib/calculations";

export default function RescisaoPage() {
  const [salarioBruto, setSalarioBruto] = useState(3000);
  const [diasTrabalhadosNoMes, setDiasTrabalhadosNoMes] = useState(15);
  const [mesesTrabalhadosNoAnoParaDecimoTerceiro, setMesesDecimoTerceiro] = useState(6);
  const [mesesTrabalhadosParaFeriasProporcionais, setMesesFerias] = useState(6);
  const [possuiFeriasVencidas, setPossuiFeriasVencidas] = useState(false);
  const [anosCompletos, setAnosCompletos] = useState(2);
  const [avisoPrevioIndenizado, setAvisoPrevioIndenizado] = useState(true);
  const [saldoFgts, setSaldoFgts] = useState(5000);
  const [dependentes, setDependentes] = useState(0);

  const resultado = useMemo(
    () =>
      calcularRescisao({
        tipo: "sem_justa_causa",
        salarioBruto,
        diasTrabalhadosNoMes,
        mesesTrabalhadosNoAnoParaDecimoTerceiro,
        mesesTrabalhadosParaFeriasProporcionais,
        possuiFeriasVencidas,
        anosCompletos,
        avisoPrevioIndenizado,
        saldoFgts,
        dependentes,
      }),
    [
      salarioBruto,
      diasTrabalhadosNoMes,
      mesesTrabalhadosNoAnoParaDecimoTerceiro,
      mesesTrabalhadosParaFeriasProporcionais,
      possuiFeriasVencidas,
      anosCompletos,
      avisoPrevioIndenizado,
      saldoFgts,
      dependentes,
    ],
  );

  return (
    <CalculatorLayout
      title="Calculadora de Rescisão Trabalhista"
      description="Simule os valores de uma rescisão por dispensa sem justa causa: saldo de salário, aviso prévio, 13º e férias proporcionais, e multa de 40% do FGTS."
      form={
        <div className="space-y-4">
          <CurrencyInput label="Salário bruto" value={salarioBruto} onChange={setSalarioBruto} />
          <NumberField
            label="Dias trabalhados no mês da rescisão"
            value={diasTrabalhadosNoMes}
            onChange={setDiasTrabalhadosNoMes}
            min={0}
            max={30}
          />
          <div className="grid grid-cols-2 gap-4">
            <NumberField
              label="Meses trabalhados no ano (13º)"
              value={mesesTrabalhadosNoAnoParaDecimoTerceiro}
              onChange={setMesesDecimoTerceiro}
              min={0}
              max={12}
            />
            <NumberField
              label="Meses do período aquisitivo atual (férias)"
              value={mesesTrabalhadosParaFeriasProporcionais}
              onChange={setMesesFerias}
              min={0}
              max={11}
            />
          </div>
          <NumberField
            label="Anos completos de empresa"
            value={anosCompletos}
            onChange={setAnosCompletos}
            min={0}
            hint="Usado para o aviso prévio proporcional (+3 dias por ano, até 60 dias adicionais)."
          />
          <CurrencyInput
            label="Saldo do FGTS"
            value={saldoFgts}
            onChange={setSaldoFgts}
            hint="Saldo informado no extrato do FGTS — usado para calcular a multa de 40%."
          />
          <NumberField
            label="Número de dependentes (IRRF)"
            value={dependentes}
            onChange={setDependentes}
            min={0}
          />
          <ToggleField
            label="Possui férias vencidas (período aquisitivo completo não gozado)"
            checked={possuiFeriasVencidas}
            onChange={setPossuiFeriasVencidas}
          />
          <ToggleField
            label="Aviso prévio indenizado"
            checked={avisoPrevioIndenizado}
            onChange={setAvisoPrevioIndenizado}
            hint="Desmarque se o aviso prévio foi trabalhado (não gera valor indenizado)."
          />
        </div>
      }
      result={
        <ResultCard
          title="Resultado"
          lines={[
            { label: "Saldo de salário", value: resultado.saldoSalario },
            {
              label: `Aviso prévio indenizado (${resultado.avisoPrevioDias} dias)`,
              value: resultado.valorAvisoPrevio,
            },
            { label: "13º salário proporcional", value: resultado.decimoTerceiroProporcional },
            { label: "Férias proporcionais", value: resultado.feriasProporcionais },
            { label: "1/3 sobre férias proporcionais", value: resultado.tercoFeriasProporcionais },
            { label: "Férias vencidas", value: resultado.feriasVencidas },
            { label: "1/3 sobre férias vencidas", value: resultado.tercoFeriasVencidas },
            { label: "Multa de 40% do FGTS", value: resultado.multaFgts },
            { label: "INSS (saldo de salário + 13º)", value: resultado.inssSaldoSalario + resultado.inssDecimoTerceiro, negative: true },
            { label: "IRRF (saldo de salário + 13º)", value: resultado.irrfSaldoSalario + resultado.irrfDecimoTerceiro, negative: true },
          ]}
          total={{ label: "Total líquido a receber", value: resultado.totalLiquido }}
        />
      }
    />
  );
}
