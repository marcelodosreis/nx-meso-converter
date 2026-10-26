import { ImageResponse } from "next/og";

export const alt = "NX Mesos Converter — MapleStory calculator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at 20% 0%, #ffffff 0%, #e8f5ff 45%, #fff7e6 100%)",
        color: "#17334d",
        fontFamily: "sans-serif",
        padding: "72px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: "24px",
          border: "2px solid rgba(255,255,255,0.9)",
          borderRadius: "40px",
          background: "rgba(255,253,248,0.92)",
          boxShadow: "0 30px 80px -40px rgba(23,51,77,0.45)",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "#a5480b",
            fontSize: "24px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          MapleStory
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "76px",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          NX Mesos Converter
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "32px",
            color: "#5b7182",
            lineHeight: 1.35,
          }}
        >
          NX · Mesos · USD · Local currency. Adjustable rates for your server.
        </div>
      </div>
    </div>,
    size,
  );
}
