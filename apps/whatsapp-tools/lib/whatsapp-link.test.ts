import { describe, expect, it } from "vitest";
import { buildWhatsAppLink, normalizePhoneNumber } from "./whatsapp-link";

describe("normalizePhoneNumber", () => {
  it("remove formatação e usa DDI padrão 55", () => {
    expect(normalizePhoneNumber("(11) 98765-4321")).toBe("5511987654321");
  });

  it("aceita DDI customizado", () => {
    expect(normalizePhoneNumber("11987654321", "1")).toBe("111987654321");
  });

  it("aceita telefone fixo (10 dígitos)", () => {
    expect(normalizePhoneNumber("1132654321")).toBe("551132654321");
  });

  it("retorna null para número muito curto", () => {
    expect(normalizePhoneNumber("123")).toBeNull();
  });

  it("retorna null para número muito longo", () => {
    expect(normalizePhoneNumber("119876543210")).toBeNull();
  });
});

describe("buildWhatsAppLink", () => {
  it("gera link sem mensagem quando texto vazio", () => {
    expect(buildWhatsAppLink("11987654321", "")).toBe("https://wa.me/5511987654321");
  });

  it("gera link com mensagem codificada", () => {
    expect(buildWhatsAppLink("11987654321", "Olá, tudo bem?")).toBe(
      "https://wa.me/5511987654321?text=Ol%C3%A1%2C%20tudo%20bem%3F",
    );
  });

  it("retorna null quando o número é inválido", () => {
    expect(buildWhatsAppLink("123", "oi")).toBeNull();
  });
});
