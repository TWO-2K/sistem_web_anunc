import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ferramentas PDF",
    short_name: "Ferramentas PDF",
    description:
      "Ferramentas gratuitas para PDF: junte, divida e comprima arquivos PDF direto no navegador.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e17",
    theme_color: "#0a0e17",
    lang: "pt-BR",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
