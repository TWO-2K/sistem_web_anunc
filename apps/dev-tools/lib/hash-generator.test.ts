import { describe, expect, it } from "vitest";
import { gerarHash, gerarTodosHashes } from "./hash-generator";

describe("gerarHash", () => {
  it("gera SHA-1 e SHA-256 conhecidos", async () => {
    expect(await gerarHash("abc", "SHA-1")).toBe("a9993e364706816aba3e25717850c26c9cd0d89d");
    expect(await gerarHash("abc", "SHA-256")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
  });

  it("gera o hash de texto vazio", async () => {
    expect(await gerarHash("", "SHA-256")).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
  });
});

describe("gerarTodosHashes", () => {
  it("retorna todos os algoritmos com o tamanho correto", async () => {
    const r = await gerarTodosHashes("teste");
    expect(r["SHA-1"]).toHaveLength(40);
    expect(r["SHA-256"]).toHaveLength(64);
    expect(r["SHA-384"]).toHaveLength(96);
    expect(r["SHA-512"]).toHaveLength(128);
  });
});
