import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0b141a",
          borderTop: "16px solid #25d366",
          borderBottom: "16px solid #25d366",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: -1,
          }}
        >
          Ferramentas <span style={{ color: "#7de3a3", marginLeft: 16 }}>WhatsApp</span>
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#cbd5e1" }}>
          Gerador de link para conversar sem salvar contato
        </div>
      </div>
    ),
    { ...size },
  );
}
