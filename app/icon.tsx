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
          background: "#070708",
          color: "#f3f0ea",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 16,
          border: "1px solid #f3f0ea",
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
