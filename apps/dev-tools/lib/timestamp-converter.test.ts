import { describe, expect, it } from "vitest";
import { fromDataLocal, fromTimestamp } from "./timestamp-converter";

describe("fromTimestamp", () => {
  it("interpreta segundos", () => {
    const r = fromTimestamp("1700000000");
    expect(r.iso).toBe("2023-11-14T22:13:20.000Z");
    expect(r.milissegundos).toBe(1_700_000_000_000);
  });

  it("interpreta milissegundos quando tem 13 dígitos", () => {
    const r = fromTimestamp("1700000000123");
    expect(r.segundos).toBe(1_700_000_000);
    expect(r.iso).toBe("2023-11-14T22:13:20.123Z");
  });

  it("rejeita entradas inválidas", () => {
    expect(fromTimestamp("").success).toBe(false);
    expect(fromTimestamp("12a").success).toBe(false);
  });
});

describe("fromDataLocal", () => {
  it("converte uma data local em timestamp", () => {
    const r = fromDataLocal("2024-01-01T00:00");
    expect(r.success).toBe(true);
    expect(r.milissegundos).toBe(new Date(2024, 0, 1).getTime());
  });

  it("rejeita entrada vazia ou inválida", () => {
    expect(fromDataLocal("").success).toBe(false);
    expect(fromDataLocal("lixo").success).toBe(false);
  });
});
