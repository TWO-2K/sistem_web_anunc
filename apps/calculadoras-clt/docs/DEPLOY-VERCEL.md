# Manual: como subir um app deste monorepo na Vercel

Este repositório é um monorepo com npm workspaces (`apps/*`). Cada app dentro de `/apps` é
importado na Vercel como um **projeto separado**, apontando para a subpasta correta.

## 1. Subir as mudanças para o GitHub

```bash
git add .
git commit -m "mensagem"
git push
```

Repositório remoto: `https://github.com/TWO-2K/sistem_web_anunc`

## 2. Importar o projeto na Vercel

1. Acesse [vercel.com](https://vercel.com) → **Add New → Project**.
2. Selecione o repositório `TWO-2K/sistem_web_anunc`.
3. Em **Root Directory**, clique em "Edit" e escolha a pasta do app, por exemplo:
   `apps/calculadoras-clt`
4. Framework Preset: a Vercel detecta **Next.js** automaticamente.
5. Build Command e Install Command: deixe os padrões (`next build` / `npm install`).
   A Vercel resolve as dependências do workspace normalmente a partir do Root Directory.

## 3. Configurar variáveis de ambiente

Em **Settings → Environment Variables** do projeto, adicione:

| Nome | Valor | Ambientes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL final do site (ex.: `https://utilzap.com.br`) | Production, Preview, Development |

> O código usa esse valor com fallback embutido, mas defina sempre a variável em produção.

## 4. Deploy

Clique em **Deploy**. A Vercel builda o projeto e publica em uma URL temporária tipo:
`nome-do-projeto.vercel.app`

## 5. Domínio customizado

1. No projeto, vá em **Settings → Domains**.
2. Adicione o domínio (ex.: `utilzap.com.br` ou um subdomínio como `crm.mitmacom.com.br`).
3. Siga as instruções de DNS exibidas pela Vercel:
   - Domínio raiz → registro `A` apontando para o IP da Vercel (ou `ALIAS`/`ANAME` se o provedor suportar).
   - Subdomínio → registro `CNAME` apontando para `cname.vercel-dns.com`.
4. Se o domínio usa Cloudflare como proxy (nuvem laranja), pode ser necessário cadastrar o
   hostname completo (ex.: `crm.mitmacom.com.br`) em **SSL/TLS → Custom Hostnames** no Cloudflare,
   além do registro DNS — isso é independente da configuração de domínio feita na Vercel.
5. Aguarde a propagação e a emissão automática do certificado SSL pela Vercel.

## 6. Repetir para outros apps

Para subir um novo app do monorepo (ex.: `apps/outro-app`), repita o passo 2 criando um
**novo projeto na Vercel** com Root Directory apontando para a pasta correspondente — cada
app vira um projeto e um domínio independentes, mesmo estando no mesmo repositório Git.
