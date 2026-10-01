import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#f7f6f4",
          color: "#141618",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          border: "1px solid #141618",
          fontSize: 11,
          letterSpacing: 0.5,
        }}
      >
        EI
      </div>
    ),
    size,
  );
}
