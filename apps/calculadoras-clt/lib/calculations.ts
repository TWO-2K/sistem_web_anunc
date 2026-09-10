import {
  ALIQUOTA_FGTS,
  DEDUCAO_POR_DEPENDENTE_IRRF,
  FAIXAS_IRRF,
  FAIXAS_INSS,
  MULTA_FGTS_DISPENSA_SEM_JUSTA_CAUSA,
  TETO_INSS,
} from "./clt-constants";

function round2(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

/** Cálculo progressivo do INSS por faixa, respeitando o teto. */
export function calcularINSS(salarioBase: number): number {
  const base = Math.min(Math.max(salarioBase, 0), TETO_INSS);
  let total = 0;
  let limiteAnterior = 0;
  for (const faixa of FAIXAS_INSS) {
    if (base <= limiteAnterior) break;
    const valorNaFaixa = Math.min(base, faixa.ate) - limiteAnterior;
    total += valorNaFaixa * faixa.aliquota;
    limiteAnterior = faixa.ate;
  }
  return round2(total);
}

/** IRRF mensal sobre uma base de cálculo já líquida de INSS, com dedução por dependente. */
export function calcularIRRF(baseCalculo: number, dependentes = 0): number {
  const base = Math.max(baseCalculo - dependentes * DEDUCAO_POR_DEPENDENTE_IRRF, 0);
  const faixa = FAIXAS_IRRF.find((f) => base <= f.ate) ?? FAIXAS_IRRF[FAIXAS_IRRF.length - 1];
  const imposto = base * faixa.aliquota - faixa.deducao;
  return round2(Math.max(imposto, 0));
}

export interface SalarioLiquidoInput {
  salarioBruto: number;
  dependentes?: number;
  outrosDescontos?: number;
}

export interface SalarioLiquidoResultado {
  salarioBruto: number;
  inss: number;
  baseIrrf: number;
  irrf: number;
  outrosDescontos: number;
  salarioLiquido: number;
  fgtsDepositado: number;
}

export function calcularSalarioLiquido(input: SalarioLiquidoInput): SalarioLiquidoResultado {
  const { salarioBruto, dependentes = 0, outrosDescontos = 0 } = input;
  const inss = calcularINSS(salarioBruto);
  const baseIrrf = salarioBruto - inss;
  const irrf = calcularIRRF(baseIrrf, dependentes);
  const salarioLiquido = salarioBruto - inss - irrf - outrosDescontos;
  return {
    salarioBruto: round2(salarioBruto),
    inss,
    baseIrrf: round2(baseIrrf),
    irrf,
    outrosDescontos: round2(outrosDescontos),
    salarioLiquido: round2(salarioLiquido),
    fgtsDepositado: round2(salarioBruto * ALIQUOTA_FGTS),
  };
}

export interface FeriasInput {
  salarioBruto: number;
  diasDireito?: number;
  venderFerias?: boolean;
  dependentes?: number;
}

export interface FeriasResultado {
  diasGozo: number;
  diasAbono: number;
  valorGozo: number;
  tercoConstitucionalGozo: number;
  inss: number;
  irrf: number;
  liquidoGozo: number;
  valorAbono: number;
  tercoConstitucionalAbono: number;
  totalAbono: number;
  totalReceber: number;
}

export function calcularFerias(input: FeriasInput): FeriasResultado {
  const { salarioBruto, diasDireito = 30, venderFerias = false, dependentes = 0 } = input;
  const diasAbono = venderFerias ? Math.round(diasDireito / 3) : 0;
  const diasGozo = diasDireito - diasAbono;

  const valorGozo = (salarioBruto / 30) * diasGozo;
  const tercoConstitucionalGozo = valorGozo / 3;
  const totalTributavel = valorGozo + tercoConstitucionalGozo;

  const inss = calcularINSS(totalTributavel);
  const baseIrrf = totalTributavel - inss;
  const irrf = calcularIRRF(baseIrrf, dependentes);
  const liquidoGozo = totalTributavel - inss - irrf;

  const valorAbono = (salarioBruto / 30) * diasAbono;
  const tercoConstitucionalAbono = valorAbono / 3;
  const totalAbono = valorAbono + tercoConstitucionalAbono; // abono pecuniário é isento de INSS/IRRF

  return {
    diasGozo,
    diasAbono,
    valorGozo: round2(valorGozo),
    tercoConstitucionalGozo: round2(tercoConstitucionalGozo),
    inss,
    irrf,
    liquidoGozo: round2(liquidoGozo),
    valorAbono: round2(valorAbono),
    tercoConstitucionalAbono: round2(tercoConstitucionalAbono),
    totalAbono: round2(totalAbono),
    totalReceber: round2(liquidoGozo + totalAbono),
  };
}

export interface DecimoTerceiroInput {
  salarioBruto: number;
  mesesTrabalhados?: number; // 0-12, use 12 para 13º integral
  dependentes?: number;
}

export interface DecimoTerceiroResultado {
  valorIntegral: number;
  primeiraParcela: number;
  segundaParcelaBruta: number;
  inss: number;
  irrf: number;
  segundaParcelaLiquida: number;
  totalLiquido: number;
}

export function calcularDecimoTerceiro(input: DecimoTerceiroInput): DecimoTerceiroResultado {
  const { salarioBruto, mesesTrabalhados = 12, dependentes = 0 } = input;
  const valorIntegral = (salarioBruto / 12) * mesesTrabalhados;
  const primeiraParcela = valorIntegral / 2;
  const segundaParcelaBruta = valorIntegral - primeiraParcela;

  const inss = calcularINSS(valorIntegral);
  const baseIrrf = valorIntegral - inss;
  const irrf = calcularIRRF(baseIrrf, dependentes);
  const segundaParcelaLiquida = segundaParcelaBruta - inss - irrf;

  return {
    valorIntegral: round2(valorIntegral),
    primeiraParcela: round2(primeiraParcela),
    segundaParcelaBruta: round2(segundaParcelaBruta),
    inss,
    irrf,
    segundaParcelaLiquida: round2(segundaParcelaLiquida),
    totalLiquido: round2(primeiraParcela + segundaParcelaLiquida),
  };
}

export interface HorasExtrasInput {
  salarioBruto: number;
  jornadaMensalHoras?: number;
  quantidadeHoras: number;
  percentualAdicional?: number; // 50 ou 100
  diasUteisMes?: number;
  domingosEFeriados?: number;
}

export interface HorasExtrasResultado {
  valorHoraNormal: number;
  valorHoraExtra: number;
  totalHorasExtras: number;
  dsrSobreHorasExtras: number;
  totalComDsr: number;
}

export function calcularHorasExtras(input: HorasExtrasInput): HorasExtrasResultado {
  const {
    salarioBruto,
    jornadaMensalHoras = 220,
    quantidadeHoras,
    percentualAdicional = 50,
    diasUteisMes = 25,
    domingosEFeriados = 4,
  } = input;

  const valorHoraNormal = salarioBruto / jornadaMensalHoras;
  const valorHoraExtra = valorHoraNormal * (1 + percentualAdicional / 100);
  const totalHorasExtras = valorHoraExtra * quantidadeHoras;
  const dsrSobreHorasExtras = diasUteisMes > 0 ? (totalHorasExtras / diasUteisMes) * domingosEFeriados : 0;

  return {
    valorHoraNormal: round2(valorHoraNormal),
    valorHoraExtra: round2(valorHoraExtra),
    totalHorasExtras: round2(totalHorasExtras),
    dsrSobreHorasExtras: round2(dsrSobreHorasExtras),
    totalComDsr: round2(totalHorasExtras + dsrSobreHorasExtras),
  };
}

export interface SalarioBrutoInput {
  salarioLiquidoDesejado: number;
  dependentes?: number;
  outrosDescontos?: number;
}

export interface SalarioBrutoResultado {
  salarioLiquidoDesejado: number;
  salarioBrutoEstimado: number;
  inss: number;
  irrf: number;
  outrosDescontos: number;
  salarioLiquidoObtido: number;
}

/** Busca binária: encontra o salário bruto cujo líquido resultante bate com o valor desejado. */
export function calcularSalarioBrutoAPartirDoLiquido(input: SalarioBrutoInput): SalarioBrutoResultado {
  const { salarioLiquidoDesejado, dependentes = 0, outrosDescontos = 0 } = input;

  let low = 0;
  let high = Math.max(salarioLiquidoDesejado * 2 + outrosDescontos, 1000) + 50000;
  for (let i = 0; i < 80; i++) {
    const mid = (low + high) / 2;
    const { salarioLiquido } = calcularSalarioLiquido({ salarioBruto: mid, dependentes, outrosDescontos });
    if (salarioLiquido < salarioLiquidoDesejado) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const salarioBrutoEstimado = (low + high) / 2;
  const final = calcularSalarioLiquido({ salarioBruto: salarioBrutoEstimado, dependentes, outrosDescontos });

  return {
    salarioLiquidoDesejado: round2(salarioLiquidoDesejado),
    salarioBrutoEstimado: round2(salarioBrutoEstimado),
    inss: final.inss,
    irrf: final.irrf,
    outrosDescontos: round2(outrosDescontos),
    salarioLiquidoObtido: final.salarioLiquido,
  };
}

export interface FgtsInput {
  salarioBruto: number;
  saldoAtual?: number;
  meses: number;
}

export interface FgtsResultado {
  depositoMensal: number;
  meses: number;
  saldoInicial: number;
  totalDepositado: number;
  saldoFinalEstimado: number;
  multaRescisoriaEstimada: number;
}

export function calcularFGTS(input: FgtsInput): FgtsResultado {
  const { salarioBruto, saldoAtual = 0, meses } = input;
  const depositoMensal = round2(salarioBruto * ALIQUOTA_FGTS);
  const totalDepositado = round2(depositoMensal * meses);
  const saldoFinalEstimado = round2(saldoAtual + totalDepositado);

  return {
    depositoMensal,
    meses,
    saldoInicial: round2(saldoAtual),
    totalDepositado,
    saldoFinalEstimado,
    multaRescisoriaEstimada: round2(saldoFinalEstimado * MULTA_FGTS_DISPENSA_SEM_JUSTA_CAUSA),
  };
}

export interface FaixaInssDetalhe {
  ate: number;
  aliquota: number;
  baseFaixa: number;
  valorFaixa: number;
}

export interface INSSDetalhadoResultado {
  faixas: FaixaInssDetalhe[];
  totalDesconto: number;
  aliquotaEfetiva: number;
}

export function calcularINSSDetalhado(salarioBruto: number): INSSDetalhadoResultado {
  const base = Math.min(Math.max(salarioBruto, 0), TETO_INSS);
  let limiteAnterior = 0;
  let total = 0;
  const faixas: FaixaInssDetalhe[] = [];

  for (const faixa of FAIXAS_INSS) {
    if (base <= limiteAnterior) break;
    const baseFaixa = Math.min(base, faixa.ate) - limiteAnterior;
    const valorFaixa = baseFaixa * faixa.aliquota;
    faixas.push({
      ate: faixa.ate,
      aliquota: faixa.aliquota,
      baseFaixa: round2(baseFaixa),
      valorFaixa: round2(valorFaixa),
    });
    total += valorFaixa;
    limiteAnterior = faixa.ate;
  }

  return {
    faixas,
    totalDesconto: round2(total),
    aliquotaEfetiva: salarioBruto > 0 ? round2((total / salarioBruto) * 100) : 0,
  };
}

export interface IRRFDetalhadoInput {
  salarioBruto: number;
  dependentes?: number;
  outrasDeducoes?: number;
}

export interface IRRFDetalhadoResultado {
  inss: number;
  baseCalculo: number;
  faixaAliquota: number;
  faixaDeducao: number;
  irrf: number;
  aliquotaEfetiva: number;
  salarioLiquidoAposIrrf: number;
}

export function calcularIRRFDetalhado(input: IRRFDetalhadoInput): IRRFDetalhadoResultado {
  const { salarioBruto, dependentes = 0, outrasDeducoes = 0 } = input;
  const inss = calcularINSS(salarioBruto);
  const baseAntesDependentes = Math.max(salarioBruto - inss - outrasDeducoes, 0);
  const irrf = calcularIRRF(baseAntesDependentes, dependentes);

  const baseFinal = Math.max(baseAntesDependentes - dependentes * DEDUCAO_POR_DEPENDENTE_IRRF, 0);
  const faixa = FAIXAS_IRRF.find((f) => baseFinal <= f.ate) ?? FAIXAS_IRRF[FAIXAS_IRRF.length - 1];

  return {
    inss,
    baseCalculo: round2(baseFinal),
    faixaAliquota: round2(faixa.aliquota * 100),
    faixaDeducao: faixa.deducao,
    irrf,
    aliquotaEfetiva: salarioBruto > 0 ? round2((irrf / salarioBruto) * 100) : 0,
    salarioLiquidoAposIrrf: round2(salarioBruto - inss - irrf),
  };
}

export interface AdicionalNoturnoInput {
  salarioBruto: number;
  jornadaMensalHoras?: number;
  horasNoturnas: number;
  percentualAdicional?: number;
}

export interface AdicionalNoturnoResultado {
  valorHoraNormal: number;
  horasNoturnasEquivalentes: number;
  valorHorasNoturnasSemAdicional: number;
  valorAdicionalNoturno: number;
  totalHorasNoturnasComAdicional: number;
}

// Hora noturna reduzida: 52min30s de relógio equivalem a 1h de trabalho noturno (fator 60/52,5).
export function calcularAdicionalNoturno(input: AdicionalNoturnoInput): AdicionalNoturnoResultado {
  const { salarioBruto, jornadaMensalHoras = 220, horasNoturnas, percentualAdicional = 20 } = input;

  const valorHoraNormal = salarioBruto / jornadaMensalHoras;
  const horasNoturnasEquivalentes = horasNoturnas * (60 / 52.5);
  const valorHorasNoturnasSemAdicional = valorHoraNormal * horasNoturnasEquivalentes;
  const valorAdicionalNoturno = valorHorasNoturnasSemAdicional * (percentualAdicional / 100);

  return {
    valorHoraNormal: round2(valorHoraNormal),
    horasNoturnasEquivalentes: round2(horasNoturnasEquivalentes),
    valorHorasNoturnasSemAdicional: round2(valorHorasNoturnasSemAdicional),
    valorAdicionalNoturno: round2(valorAdicionalNoturno),
    totalHorasNoturnasComAdicional: round2(valorHorasNoturnasSemAdicional + valorAdicionalNoturno),
  };
}

export interface AvisoPrevioInput {
  salarioBruto: number;
  anosCompletos: number;
  indenizado: boolean;
}

export interface AvisoPrevioResultado {
  diasAvisoPrevio: number;
  diasAdicionaisPorTempo: number;
  valorAvisoPrevio: number;
  reflexoDecimoTerceiro: number;
  reflexoFerias: number;
  tercoReflexoFerias: number;
}

export function calcularAvisoPrevio(input: AvisoPrevioInput): AvisoPrevioResultado {
  const { salarioBruto, anosCompletos, indenizado } = input;

  const diasAdicionaisPorTempo = Math.min(anosCompletos * 3, 60);
  const diasAvisoPrevio = 30 + diasAdicionaisPorTempo;
  const valorAvisoPrevio = indenizado ? (salarioBruto / 30) * diasAvisoPrevio : 0;

  // Aviso prévio indenizado projeta +1 mês de tempo de serviço para 13º e férias proporcionais.
  const reflexoDecimoTerceiro = indenizado ? salarioBruto / 12 : 0;
  const reflexoFerias = indenizado ? salarioBruto / 12 : 0;
  const tercoReflexoFerias = reflexoFerias / 3;

  return {
    diasAvisoPrevio,
    diasAdicionaisPorTempo,
    valorAvisoPrevio: round2(valorAvisoPrevio),
    reflexoDecimoTerceiro: round2(reflexoDecimoTerceiro),
    reflexoFerias: round2(reflexoFerias),
    tercoReflexoFerias: round2(tercoReflexoFerias),
  };
}

export interface RescisaoInput {
  tipo: "sem_justa_causa"; // outros tipos (pedido de demissão, justa causa, acordo) ficam para v2
  salarioBruto: number;
  diasTrabalhadosNoMes: number;
  mesesTrabalhadosNoAnoParaDecimoTerceiro: number;
  mesesTrabalhadosParaFeriasProporcionais: number;
  possuiFeriasVencidas: boolean;
  anosCompletos: number;
  avisoPrevioIndenizado: boolean;
  saldoFgts: number;
  dependentes?: number;
}

export interface RescisaoResultado {
  saldoSalario: number;
  avisoPrevioDias: number;
  valorAvisoPrevio: number;
  decimoTerceiroProporcional: number;
  feriasProporcionais: number;
  tercoFeriasProporcionais: number;
  feriasVencidas: number;
  tercoFeriasVencidas: number;
  multaFgts: number;
  inssSaldoSalario: number;
  irrfSaldoSalario: number;
  inssDecimoTerceiro: number;
  irrfDecimoTerceiro: number;
  totalBruto: number;
  totalDescontos: number;
  totalLiquido: number;
}

export function calcularRescisao(input: RescisaoInput): RescisaoResultado {
  const {
    salarioBruto,
    diasTrabalhadosNoMes,
    mesesTrabalhadosNoAnoParaDecimoTerceiro,
    mesesTrabalhadosParaFeriasProporcionais,
    possuiFeriasVencidas,
    anosCompletos,
    avisoPrevioIndenizado,
    saldoFgts,
    dependentes = 0,
  } = input;

  const saldoSalario = (salarioBruto / 30) * diasTrabalhadosNoMes;

  const avisoPrevioDias = 30 + Math.min(anosCompletos * 3, 60);
  const valorAvisoPrevio = avisoPrevioIndenizado ? (salarioBruto / 30) * avisoPrevioDias : 0;

  const decimoTerceiroProporcional = (salarioBruto / 12) * mesesTrabalhadosNoAnoParaDecimoTerceiro;

  const feriasProporcionais = (salarioBruto / 12) * mesesTrabalhadosParaFeriasProporcionais;
  const tercoFeriasProporcionais = feriasProporcionais / 3;

  const feriasVencidas = possuiFeriasVencidas ? salarioBruto : 0;
  const tercoFeriasVencidas = feriasVencidas / 3;

  const multaFgts = saldoFgts * MULTA_FGTS_DISPENSA_SEM_JUSTA_CAUSA;

  const inssSaldoSalario = calcularINSS(saldoSalario);
  const irrfSaldoSalario = calcularIRRF(saldoSalario - inssSaldoSalario, dependentes);

  const inssDecimoTerceiro = calcularINSS(decimoTerceiroProporcional);
  const irrfDecimoTerceiro = calcularIRRF(decimoTerceiroProporcional - inssDecimoTerceiro, dependentes);

  const totalBruto =
    saldoSalario +
    valorAvisoPrevio +
    decimoTerceiroProporcional +
    feriasProporcionais +
    tercoFeriasProporcionais +
    feriasVencidas +
    tercoFeriasVencidas +
    multaFgts;

  const totalDescontos = inssSaldoSalario + irrfSaldoSalario + inssDecimoTerceiro + irrfDecimoTerceiro;

  return {
    saldoSalario: round2(saldoSalario),
    avisoPrevioDias,
    valorAvisoPrevio: round2(valorAvisoPrevio),
    decimoTerceiroProporcional: round2(decimoTerceiroProporcional),
    feriasProporcionais: round2(feriasProporcionais),
    tercoFeriasProporcionais: round2(tercoFeriasProporcionais),
    feriasVencidas: round2(feriasVencidas),
    tercoFeriasVencidas: round2(tercoFeriasVencidas),
    multaFgts: round2(multaFgts),
    inssSaldoSalario,
    irrfSaldoSalario,
    inssDecimoTerceiro,
    irrfDecimoTerceiro,
    totalBruto: round2(totalBruto),
    totalDescontos: round2(totalDescontos),
    totalLiquido: round2(totalBruto - totalDescontos),
  };
}
