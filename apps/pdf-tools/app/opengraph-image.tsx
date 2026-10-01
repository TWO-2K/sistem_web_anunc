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
          backgroundColor: "#0a0e17",
          borderTop: "16px solid #0066ff",
          borderBottom: "16px solid #0066ff",
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
          Ferramentas <span style={{ color: "#5c9dff", marginLeft: 16 }}>PDF</span>
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#cbd5e1" }}>
          Juntar, dividir e comprimir PDF grátis
        </div>
      </div>
    ),
    { ...size },
  );
}
