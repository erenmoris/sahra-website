import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sahra — Nightlife concierge in Egypt";

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
          padding: "80px",
          background: "linear-gradient(135deg, #0b0f1a 0%, #131a29 60%, #1c2438 100%)",
          color: "#efe6d0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 2, color: "#c9a24b" }}>
          CAIRO · NORTH COAST · EL GOUNA · SHARM EL SHEIKH
        </div>
        <div style={{ fontSize: 82, fontWeight: 700, marginTop: 28, lineHeight: 1.15 }}>
          Sahra · Nightlife Concierge
        </div>
        <div style={{ fontSize: 34, marginTop: 26, color: "#b9b0a0", maxWidth: 900 }}>
          Rooftops, Nile boat parties, beach clubs and VIP tables — booked on WhatsApp within hours.
        </div>
        <div
          style={{
            marginTop: 48,
            alignSelf: "flex-start",
            padding: "16px 34px",
            background: "#c9a24b",
            color: "#0b0f1a",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          sahra-website.vercel.app
        </div>
      </div>
    ),
    size,
  );
}
