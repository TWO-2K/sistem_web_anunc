import { describe, expect, it } from "vitest";
import { clampQuantidade, formatUuid, generateUuids, MAX_QUANTIDADE } from "./uuid-generator";

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

describe("clampQuantidade", () => {
  it("limita ao intervalo permitido", () => {
    expect(clampQuantidade(0)).toBe(1);
    expect(clampQuantidade(-5)).toBe(1);
    expect(clampQuantidade(1000)).toBe(MAX_QUANTIDADE);
    expect(clampQuantidade(7.9)).toBe(7);
    expect(clampQuantidade(NaN)).toBe(1);
  });
});

describe("formatUuid", () => {
  const uuid = "3f2b8c1a-9d4e-4f6a-8b7c-1d2e3f4a5b6c";

  it("mantém o formato padrão sem opções", () => {
    expect(formatUuid(uuid)).toBe(uuid);
  });

  it("remove hífens e converte para maiúsculas", () => {
    expect(formatUuid(uuid, { semHifens: true, uppercase: true })).toBe(
      "3F2B8C1A9D4E4F6A8B7C1D2E3F4A5B6C",
    );
  });
});

describe("generateUuids", () => {
  it("gera a quantidade pedida de UUIDs v4 válidos e únicos", () => {
    const uuids = generateUuids(20);
    expect(uuids).toHaveLength(20);
    uuids.forEach((u) => expect(u).toMatch(UUID_V4));
    expect(new Set(uuids).size).toBe(20);
  });

  it("aplica as opções de formatação", () => {
    const [u] = generateUuids(1, { uppercase: true, semHifens: true });
    expect(u).toMatch(/^[0-9A-F]{32}$/);
  });
});
