import { describe, expect, it } from "vitest";
import {
  calcularAdicionalNoturno,
  calcularAvisoPrevio,
  calcularDecimoTerceiro,
  calcularFerias,
  calcularFGTS,
  calcularHorasExtras,
  calcularINSS,
  calcularINSSDetalhado,
  calcularIRRF,
  calcularIRRFDetalhado,
  calcularRescisao,
  calcularSalarioBrutoAPartirDoLiquido,
  calcularSalarioLiquido,
} from "./calculations";

describe("calcularINSS", () => {
  it("calcula progressivamente para salário de R$3.000", () => {
    // 1412*0.075 + (2666.68-1412)*0.09 + (3000-2666.68)*0.12
    expect(calcularINSS(3000)).toBeCloseTo(258.82, 2);
  });

  it("respeita o teto do INSS", () => {
    expect(calcularINSS(20000)).toBeCloseTo(908.85, 1);
  });

  it("retorna 0 para salário 0", () => {
    expect(calcularINSS(0)).toBe(0);
  });
});

describe("calcularIRRF", () => {
  it("é isento até a primeira faixa", () => {
    expect(calcularIRRF(2000)).toBe(0);
  });

  it("aplica alíquota e dedução da faixa correta", () => {
    // base 3000: faixa 15% (até 3751.05), dedução 381.44 => 3000*0.15 - 381.44 = 68.56
    expect(calcularIRRF(3000)).toBeCloseTo(68.56, 2);
  });

  it("reduz a base com dependentes", () => {
    const semDependente = calcularIRRF(3000, 0);
    const comDependente = calcularIRRF(3000, 1);
    expect(comDependente).toBeLessThan(semDependente);
  });
});

describe("calcularSalarioLiquido", () => {
  it("calcula líquido a partir do bruto", () => {
    const resultado = calcularSalarioLiquido({ salarioBruto: 3000 });
    expect(resultado.inss).toBeCloseTo(258.82, 2);
    expect(resultado.salarioLiquido).toBeCloseTo(3000 - resultado.inss - resultado.irrf, 2);
  });

  it("desconta outros valores informados", () => {
    const resultado = calcularSalarioLiquido({ salarioBruto: 3000, outrosDescontos: 100 });
    expect(resultado.outrosDescontos).toBe(100);
  });
});

describe("calcularFerias", () => {
  it("calcula férias integrais com 1/3 constitucional", () => {
    const resultado = calcularFerias({ salarioBruto: 3000 });
    expect(resultado.diasGozo).toBe(30);
    expect(resultado.valorGozo).toBeCloseTo(3000, 2);
    expect(resultado.tercoConstitucionalGozo).toBeCloseTo(1000, 2);
  });

  it("aplica abono pecuniário vendendo 1/3 dos dias", () => {
    const resultado = calcularFerias({ salarioBruto: 3000, venderFerias: true });
    expect(resultado.diasAbono).toBe(10);
    expect(resultado.diasGozo).toBe(20);
    expect(resultado.totalAbono).toBeGreaterThan(0);
  });
});

describe("calcularDecimoTerceiro", () => {
  it("calcula 13º integral em duas parcelas", () => {
    const resultado = calcularDecimoTerceiro({ salarioBruto: 3000 });
    expect(resultado.valorIntegral).toBeCloseTo(3000, 2);
    expect(resultado.primeiraParcela).toBeCloseTo(1500, 2);
    expect(resultado.totalLiquido).toBeLessThan(resultado.valorIntegral);
  });

  it("calcula proporcional por meses trabalhados", () => {
    const resultado = calcularDecimoTerceiro({ salarioBruto: 3000, mesesTrabalhados: 6 });
    expect(resultado.valorIntegral).toBeCloseTo(1500, 2);
  });
});

describe("calcularHorasExtras", () => {
  it("calcula valor da hora extra com adicional de 50%", () => {
    const resultado = calcularHorasExtras({ salarioBruto: 2200, quantidadeHoras: 10 });
    expect(resultado.valorHoraNormal).toBeCloseTo(10, 2);
    expect(resultado.valorHoraExtra).toBeCloseTo(15, 2);
    expect(resultado.totalHorasExtras).toBeCloseTo(150, 2);
  });

  it("inclui DSR sobre as horas extras", () => {
    const resultado = calcularHorasExtras({ salarioBruto: 2200, quantidadeHoras: 10 });
    expect(resultado.dsrSobreHorasExtras).toBeGreaterThan(0);
    expect(resultado.totalComDsr).toBeGreaterThan(resultado.totalHorasExtras);
  });
});

describe("calcularSalarioBrutoAPartirDoLiquido", () => {
  it("é o inverso de calcularSalarioLiquido", () => {
    const bruto = 3000;
    const { salarioLiquido } = calcularSalarioLiquido({ salarioBruto: bruto });
    const resultado = calcularSalarioBrutoAPartirDoLiquido({ salarioLiquidoDesejado: salarioLiquido });
    expect(resultado.salarioBrutoEstimado).toBeCloseTo(bruto, 1);
    expect(resultado.salarioLiquidoObtido).toBeCloseTo(salarioLiquido, 1);
  });
});

describe("calcularFGTS", () => {
  it("calcula depósito mensal (8%) e projeção de saldo", () => {
    const resultado = calcularFGTS({ salarioBruto: 3000, meses: 12 });
    expect(resultado.depositoMensal).toBeCloseTo(240, 2);
    expect(resultado.totalDepositado).toBeCloseTo(2880, 2);
    expect(resultado.saldoFinalEstimado).toBeCloseTo(2880, 2);
  });

  it("soma ao saldo já existente", () => {
    const resultado = calcularFGTS({ salarioBruto: 3000, saldoAtual: 1000, meses: 12 });
    expect(resultado.saldoFinalEstimado).toBeCloseTo(3880, 2);
    expect(resultado.multaRescisoriaEstimada).toBeCloseTo(1552, 2);
  });
});

describe("calcularINSSDetalhado", () => {
  it("detalha o desconto faixa a faixa e soma o total", () => {
    const resultado = calcularINSSDetalhado(3000);
    const somaFaixas = resultado.faixas.reduce((acc, f) => acc + f.valorFaixa, 0);
    expect(somaFaixas).toBeCloseTo(resultado.totalDesconto, 2);
    expect(resultado.totalDesconto).toBeCloseTo(258.82, 2);
  });
});

describe("calcularIRRFDetalhado", () => {
  it("retorna a mesma base e IRRF que o cálculo padrão", () => {
    const resultado = calcularIRRFDetalhado({ salarioBruto: 3000 });
    const irrfPadrao = calcularIRRF(3000 - calcularINSS(3000));
    expect(resultado.irrf).toBeCloseTo(irrfPadrao, 2);
  });
});

describe("calcularAdicionalNoturno", () => {
  it("aplica o fator de hora reduzida e o adicional de 20%", () => {
    const resultado = calcularAdicionalNoturno({ salarioBruto: 2200, horasNoturnas: 10 });
    expect(resultado.valorHoraNormal).toBeCloseTo(10, 2);
    expect(resultado.horasNoturnasEquivalentes).toBeCloseTo(11.43, 2);
    expect(resultado.valorAdicionalNoturno).toBeGreaterThan(0);
  });
});

describe("calcularAvisoPrevio", () => {
  it("calcula dias e valor indenizado com reflexos", () => {
    const resultado = calcularAvisoPrevio({ salarioBruto: 3000, anosCompletos: 2, indenizado: true });
    expect(resultado.diasAvisoPrevio).toBe(36);
    expect(resultado.valorAvisoPrevio).toBeCloseTo(3600, 2);
    expect(resultado.reflexoDecimoTerceiro).toBeCloseTo(250, 2);
  });

  it("não gera valor quando trabalhado", () => {
    const resultado = calcularAvisoPrevio({ salarioBruto: 3000, anosCompletos: 2, indenizado: false });
    expect(resultado.valorAvisoPrevio).toBe(0);
  });
});

describe("calcularRescisao", () => {
  it("soma as verbas de uma dispensa sem justa causa", () => {
    const resultado = calcularRescisao({
      tipo: "sem_justa_causa",
      salarioBruto: 3000,
      diasTrabalhadosNoMes: 15,
      mesesTrabalhadosNoAnoParaDecimoTerceiro: 6,
      mesesTrabalhadosParaFeriasProporcionais: 6,
      possuiFeriasVencidas: false,
      anosCompletos: 2,
      avisoPrevioIndenizado: true,
      saldoFgts: 5000,
    });

    expect(resultado.saldoSalario).toBeCloseTo(1500, 2);
    expect(resultado.avisoPrevioDias).toBe(36);
    expect(resultado.multaFgts).toBeCloseTo(2000, 2);
    expect(resultado.totalLiquido).toBeLessThan(resultado.totalBruto);
    expect(resultado.totalBruto).toBeGreaterThan(0);
  });
});
