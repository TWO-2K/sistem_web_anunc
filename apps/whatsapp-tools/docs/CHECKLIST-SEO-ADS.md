# Checklist: Domínio, SEO e AdSense — Ferramentas WhatsApp

- [ ] Definir e comprar/registrar o domínio deste app (ainda não decidido — pode ser um subdomínio de `utilzap.com.br` ou domínio próprio) e configurá-lo no Vercel
- [ ] Definir `NEXT_PUBLIC_SITE_URL` no ambiente do Vercel (hoje o fallback no código é `https://whatsapp-tools.vercel.app`)
- [ ] Cadastrar o site no Google Search Console e verificar propriedade
- [ ] Submeter `/sitemap.xml` no Search Console
- [ ] Aplicar pro Google AdSense — só depois dos passos acima, com o site já indexado e com tráfego mínimo
- [ ] Confirmar que o e-mail `contato@utilzap.com.br` (usado no rodapé, política de privacidade e página Sobre) recebe mensagens, ou trocar por outro endereço

## Boas práticas gerais (herdadas do `calculadoras-clt`/`pdf-tools`, já aplicadas no scaffold)

- [x] SEO: imagem Open Graph, ícone/apple-icon e `manifest.webmanifest` gerados dinamicamente (`app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`, `app/manifest.ts`), metadata própria em cada rota, JSON-LD `WebApplication` na home
- [x] UX de erro: páginas customizadas `not-found.tsx` e `error.tsx`
- [x] Segurança: headers (`CSP`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) em `next.config.ts`
- [x] LGPD: banner de consentimento de cookies (`components/CookieConsent.tsx`), guarda a escolha em `localStorage`
- [x] CI: job `whatsapp-tools` em `.github/workflows/ci.yml` roda lint + test + build a cada push/PR na `main`
- [ ] Quando Analytics/AdSense forem contratados de fato: carregar os scripts via `next/script` só se `hasAnalyticsConsent()` (de `components/CookieConsent.tsx`) retornar `true`
- [x] Acessibilidade (`aria-live`/`role="alert"`) no estado de validação/resultado do gerador de link
