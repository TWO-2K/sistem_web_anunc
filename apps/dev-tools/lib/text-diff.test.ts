import { describe, expect, it } from "vitest";
import { diffLinhas, MAX_LINHAS, normalizarSeJson } from "./text-diff";

describe("diffLinhas", () => {
  it("marca tudo como igual quando os textos são idênticos", () => {
    expect(diffLinhas("a\nb", "a\nb").every((l) => l.tipo === "igual")).toBe(true);
  });

  it("detecta linhas adicionadas, removidas e alteradas", () => {
    expect(diffLinhas("a\nb\nc", "a\nx\nc\nd")).toEqual([
      { tipo: "igual", texto: "a" },
      { tipo: "removido", texto: "b" },
      { tipo: "adicionado", texto: "x" },
      { tipo: "igual", texto: "c" },
      { tipo: "adicionado", texto: "d" },
    ]);
  });

  it("trata CRLF igual a LF", () => {
    expect(diffLinhas("a\r\nb", "a\nb").every((l) => l.tipo === "igual")).toBe(true);
  });

  it("rejeita entradas grandes demais", () => {
    expect(() => diffLinhas("x\n".repeat(MAX_LINHAS + 1), "")).toThrow();
  });
});

describe("normalizarSeJson", () => {
  it("reformata JSON válido e mantém texto comum", () => {
    expect(normalizarSeJson('{"a":1}')).toBe('{\n  "a": 1\n}');
    expect(normalizarSeJson("não é json")).toBe("não é json");
  });
});
