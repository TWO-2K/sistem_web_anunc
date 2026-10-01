import { describe, expect, it } from "vitest";
import { formatJson, minifyJson } from "./json-formatter";

describe("formatJson", () => {
  it("formata um JSON válido com indentação de 2 espaços por padrão", () => {
    const result = formatJson('{"a":1,"b":[2,3]}');
    expect(result.success).toBe(true);
    expect(result.output).toBe('{\n  "a": 1,\n  "b": [\n    2,\n    3\n  ]\n}');
  });

  it("aceita indentação customizada", () => {
    const result = formatJson('{"a":1}', 4);
    expect(result.output).toBe('{\n    "a": 1\n}');
  });

  it("retorna erro para entrada vazia", () => {
    const result = formatJson("   ");
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("retorna erro para JSON inválido", () => {
    const result = formatJson("{a:1}");
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});

describe("minifyJson", () => {
  it("minifica um JSON válido removendo espaços", () => {
    const result = minifyJson('{\n  "a": 1,\n  "b": 2\n}');
    expect(result.success).toBe(true);
    expect(result.output).toBe('{"a":1,"b":2}');
  });

  it("retorna erro para entrada vazia", () => {
    const result = minifyJson("");
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("retorna erro para JSON inválido", () => {
    const result = minifyJson("{'a':1}");
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
