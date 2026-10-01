import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://whatsapp-tools.vercel.app";

const routes = [
  "",
  "/gerador-link-whatsapp",
  "/qrcode-whatsapp",
  "/botao-whatsapp-site",
  "/gerador-link-whatsapp-em-massa",
  "/formatador-texto-whatsapp",
  "/contador-caracteres-whatsapp",
  "/remover-formatacao-whatsapp",
  "/sobre",
  "/politica-de-privacidade",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
