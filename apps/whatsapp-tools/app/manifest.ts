import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ferramentas WhatsApp",
    short_name: "Ferramentas WhatsApp",
    description:
      "Ferramentas gratuitas para WhatsApp: gere um link para iniciar conversa sem salvar contato.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b141a",
    theme_color: "#0b141a",
    lang: "pt-BR",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
