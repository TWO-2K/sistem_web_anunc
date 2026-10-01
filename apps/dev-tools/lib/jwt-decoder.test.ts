import { describe, expect, it } from "vitest";
import { base64UrlDecode, decodeJwt } from "./jwt-decoder";

function b64url(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}
const header = { alg: "HS256", typ: "JWT" };

describe("base64UrlDecode", () => {
  it("decodifica base64url com UTF-8 e sem padding", () => {
    expect(base64UrlDecode(Buffer.from("ação ✓").toString("base64url"))).toBe("ação ✓");
  });
});

describe("decodeJwt", () => {
  it("decodifica header e payload", () => {
    const token = `${b64url(header)}.${b64url({ sub: "123", name: "João" })}.assinatura`;
    const r = decodeJwt(token);
    expect(r.success).toBe(true);
    expect(JSON.parse(r.header!)).toEqual(header);
    expect(JSON.parse(r.payload!)).toEqual({ sub: "123", name: "João" });
    expect(r.expiraEm).toBeUndefined();
  });

  it("aceita o prefixo Bearer", () => {
    expect(decodeJwt(`Bearer ${b64url(header)}.${b64url({})}.x`).success).toBe(true);
  });

  it("detecta expiração pelo campo exp", () => {
    const token = `${b64url(header)}.${b64url({ exp: 1000 })}.x`;
    const r = decodeJwt(token, new Date(2_000_000));
    expect(r.expiraEm?.getTime()).toBe(1_000_000);
    expect(r.expirado).toBe(true);
    expect(decodeJwt(token, new Date(500_000)).expirado).toBe(false);
  });

  it("retorna erro para entradas inválidas", () => {
    expect(decodeJwt("").success).toBe(false);
    expect(decodeJwt("a.b").success).toBe(false);
    expect(decodeJwt("@@@.@@@.x").success).toBe(false);
  });
});
