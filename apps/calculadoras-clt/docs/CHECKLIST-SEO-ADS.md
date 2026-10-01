# Checklist: Domínio, SEO e AdSense

- [ ] Comprar/registrar o domínio `utilzap.com.br` (registro.br) e configurá-lo no Vercel
- [x] Definir `NEXT_PUBLIC_SITE_URL` no ambiente do Vercel — hoje `https://calculadoras-clt.vercel.app` (trocar para `https://utilzap.com.br` quando o domínio for comprado)
- [x] Cadastrar o site no Google Search Console e verificar propriedade (via `calculadoras-clt.vercel.app`)
- [x] Submeter `/sitemap.xml` no Search Console (sitemap confirmado válido; aguardando o Google reprocessar a leitura)
- [ ] Aplicar pro Google AdSense — só depois dos passos acima, com o site já indexado e com tráfego mínimo (o Google costuma exigir isso)
- [ ] Criar de fato o e-mail `contato@utilzap.com.br` (ou trocar por outro endereço) — o código já usa esse e-mail no rodapé, política de privacidade e página Sobre, mas a caixa de entrada ainda não existe

## Boas práticas gerais (auditoria de 2026-09-14)

- [x] SEO: imagem Open Graph, ícone/apple-icon e `manifest.webmanifest` gerados dinamicamente (`app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`, `app/manifest.ts`), metadata própria em `/sobre`, JSON-LD `WebApplication` já existente na home
- [x] Acessibilidade: `ResultCard` anuncia resultados via `aria-live="polite"`
- [x] UX de erro: páginas customizadas `not-found.tsx` e `error.tsx`
- [x] Segurança: headers (`CSP`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) em `next.config.ts`
- [x] LGPD: banner de consentimento de cookies (`components/CookieConsent.tsx`), guarda a escolha em `localStorage`
- [x] CI: `.github/workflows/ci.yml` roda lint + test + build a cada push/PR na `main`
- [ ] Quando Analytics/AdSense forem contratados de fato: carregar os scripts via `next/script` só se `hasAnalyticsConsent()` (de `components/CookieConsent.tsx`) retornar `true`, e ajustar o `Content-Security-Policy` em `next.config.ts` se os domínios usados forem diferentes dos já previstos
