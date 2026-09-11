import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://utilzap.com.br";

const routes = [
  "",
  "/salario-liquido",
  "/rescisao",
  "/ferias",
  "/decimo-terceiro",
  "/horas-extras",
  "/fgts",
  "/inss",
  "/irrf",
  "/adicional-noturno",
  "/aviso-previo",
  "/salario-liquido-para-bruto",
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
