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
          backgroundColor: "#0a0a0a",
          borderTop: "16px solid #ed0000",
          borderBottom: "16px solid #ed0000",
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
          Calculadoras <span style={{ color: "#ff5c5c", marginLeft: 16 }}>CLT</span>
        </div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "#cbd5e1" }}>
          Salário, rescisão, férias, 13º e muito mais
        </div>
      </div>
    ),
    { ...size },
  );
}
