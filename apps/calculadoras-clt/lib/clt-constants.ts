// Tabelas vigentes em 2026 (referência: Ministério da Previdência Social / Receita Federal).
// Atualize aqui quando o governo publicar novos valores anuais.

export const SALARIO_MINIMO = 1621;

export type FaixaProgressiva = {
  ate: number; // limite superior da faixa (Infinity para a última)
  aliquota: number; // 0.075 = 7,5%
};

// INSS 2026 — cálculo progressivo por faixa (cada faixa é tributada na sua própria alíquota).
export const FAIXAS_INSS: FaixaProgressiva[] = [
  { ate: 1621.0, aliquota: 0.075 },
  { ate: 2902.84, aliquota: 0.09 },
  { ate: 4354.27, aliquota: 0.12 },
  { ate: 8475.55, aliquota: 0.14 },
];

export const TETO_INSS = 8475.55;
export const CONTRIBUICAO_MAXIMA_INSS = 988.09;

export type FaixaIRRF = {
  ate: number;
  aliquota: number;
  deducao: number;
};

// IRRF — tabela mensal vigente em 2026 (Lei 15.191/2025).
export const FAIXAS_IRRF: FaixaIRRF[] = [
  { ate: 2428.8, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 182.16 },
  { ate: 3751.05, aliquota: 0.15, deducao: 394.16 },
  { ate: 4664.68, aliquota: 0.225, deducao: 675.49 },
  { ate: Infinity, aliquota: 0.275, deducao: 908.73 },
];

// Redutor do IRRF (Lei 15.270/2025), calculado sobre o rendimento bruto do mês.
// Até R$ 5.000: reduz até R$ 312,89 (na prática, isenção). Entre R$ 5.000,01 e R$ 7.350: redução decrescente.
export const IRRF_REDUTOR_LIMITE_ISENCAO = 5000;
export const IRRF_REDUTOR_VALOR_ISENCAO = 312.89;
export const IRRF_REDUTOR_LIMITE_FINAL = 7350;
export const IRRF_REDUTOR_CONSTANTE = 978.62;
export const IRRF_REDUTOR_FATOR = 0.133145;

export const DEDUCAO_POR_DEPENDENTE_IRRF = 189.59;

// Desconto simplificado mensal: substitui as deduções legais (INSS, dependentes) quando for mais vantajoso.
export const DESCONTO_SIMPLIFICADO_IRRF = 607.2;

export const ALIQUOTA_FGTS = 0.08;
export const MULTA_FGTS_DISPENSA_SEM_JUSTA_CAUSA = 0.4;

export const JORNADA_MENSAL_PADRAO_HORAS = 220;

// Seguro-desemprego 2026 (reajuste pelo INPC, vigente desde 11/01/2026). Parcela mínima = salário mínimo.
export const SEGURO_DESEMPREGO_FAIXA_1 = 2222.17; // até aqui: 80% da média
export const SEGURO_DESEMPREGO_FAIXA_2 = 3703.99; // até aqui: valor fixo da faixa 1 + 50% do excedente
export const SEGURO_DESEMPREGO_PARCELA_MAXIMA = 2518.65;
