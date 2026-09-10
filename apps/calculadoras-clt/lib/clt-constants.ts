// Tabelas vigentes em 2024 (referência: Ministério da Previdência Social / Receita Federal).
// Atualize aqui quando o governo publicar novos valores anuais.

export const SALARIO_MINIMO = 1412;

export type FaixaProgressiva = {
  ate: number; // limite superior da faixa (Infinity para a última)
  aliquota: number; // 0.075 = 7,5%
};

// INSS 2024 — cálculo progressivo por faixa (cada faixa é tributada na sua própria alíquota).
export const FAIXAS_INSS: FaixaProgressiva[] = [
  { ate: 1412.0, aliquota: 0.075 },
  { ate: 2666.68, aliquota: 0.09 },
  { ate: 4000.03, aliquota: 0.12 },
  { ate: 7786.02, aliquota: 0.14 },
];

export const TETO_INSS = 7786.02;
export const CONTRIBUICAO_MAXIMA_INSS = 908.85;

export type FaixaIRRF = {
  ate: number;
  aliquota: number;
  deducao: number;
};

// IRRF — tabela mensal vigente desde fev/2024.
export const FAIXAS_IRRF: FaixaIRRF[] = [
  { ate: 2259.2, aliquota: 0, deducao: 0 },
  { ate: 2826.65, aliquota: 0.075, deducao: 169.44 },
  { ate: 3751.05, aliquota: 0.15, deducao: 381.44 },
  { ate: 4664.68, aliquota: 0.225, deducao: 662.77 },
  { ate: Infinity, aliquota: 0.275, deducao: 896.0 },
];

export const DEDUCAO_POR_DEPENDENTE_IRRF = 189.59;

export const ALIQUOTA_FGTS = 0.08;
export const MULTA_FGTS_DISPENSA_SEM_JUSTA_CAUSA = 0.4;

export const JORNADA_MENSAL_PADRAO_HORAS = 220;
