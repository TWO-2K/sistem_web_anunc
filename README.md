# Sistemas Web

Monorepo de mini-apps web. Cada app vive em `/apps/<nome>` e roda de forma independente (workspaces npm).

Veja [ROADMAP.md](./ROADMAP.md) para a lista de apps planejados.

## Apps

- [`apps/calculadoras-clt`](./apps/calculadoras-clt) — calculadoras financeiras/CLT (salário líquido, rescisão, férias, 13º, horas extras)

## Rodando um app

```bash
npm install
npm run dev -w apps/calculadoras-clt
```
