# Sistemas Web

Monorepo de mini-apps web. Cada app vive em `/apps/<nome>` e roda de forma independente (workspaces npm).

Veja [ROADMAP.md](./ROADMAP.md) para a lista de apps planejados.

## Apps

- [`apps/calculadoras-clt`](./apps/calculadoras-clt) — calculadoras financeiras/CLT (salário líquido, rescisão, férias, 13º, horas extras)
- [`apps/pdf-tools`](./apps/pdf-tools) — ferramentas para PDF (juntar, dividir, comprimir)
- [`apps/whatsapp-tools`](./apps/whatsapp-tools) — ferramentas para WhatsApp (gerador de link wa.me)
- [`apps/dev-tools`](./apps/dev-tools) — ferramentas para desenvolvedores (formatador e validador de JSON)

## Rodando um app

```bash
npm install
npm run dev -w apps/calculadoras-clt
npm run dev -w apps/pdf-tools
npm run dev -w apps/whatsapp-tools
npm run dev -w apps/dev-tools
```
