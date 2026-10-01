import { ImageResponse } from "next/og";

export const alt = "Enamel Intelligence — the future of connected dental implants";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f7f6f4",
          color: "#141618",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 18, letterSpacing: 6, color: "#1d6478" }}>
          ENAMEL INTELLIGENCE
        </div>
        <div style={{ fontSize: 76, lineHeight: 0.92, marginTop: 28, maxWidth: 900 }}>
          The tooth is becoming intelligent.
        </div>
        <div style={{ marginTop: 28, fontSize: 22, color: "#3c4450" }}>
          Research-stage dental technology.
        </div>
      </div>
    ),
    size,
  );
}
