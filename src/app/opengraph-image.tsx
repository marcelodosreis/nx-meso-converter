import { ImageResponse } from "next/og";

export const alt = "NX Mesos Converter — MapleStory calculator with adjustable rates";
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
        padding: "56px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "2px solid rgba(255,255,255,0.9)",
          borderRadius: "40px",
          background: "rgba(255,253,248,0.94)",
          boxShadow: "0 30px 80px -40px rgba(23,51,77,0.45)",
          padding: "52px 56px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              color: "#a5480b",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "62px",
                height: "62px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #fbd26a 0%, #f5a73b 55%, #f07a25 100%)",
                color: "#713708",
                fontSize: "28px",
                fontWeight: 800,
              }}
            >
              NX
            </div>
            MapleStory
          </div>
          <div
            style={{
              display: "flex",
              borderRadius: "999px",
              background: "#fff3d8",
              color: "#8a4009",
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "10px 18px",
            }}
          >
            ADJUSTABLE RATES
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "44px" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "16px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "68px",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
              }}
            >
              NX Mesos Converter
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                color: "#5b7182",
                lineHeight: 1.35,
              }}
            >
              Convert NX, mesos and dollars with your server rates.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              width: "410px",
              flexDirection: "column",
              gap: "18px",
              border: "2px solid #cbe7fb",
              borderRadius: "30px",
              background: "#f2faff",
              padding: "30px 32px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{
                  display: "flex",
                  color: "#5b7182",
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                NX
              </div>
              <div style={{ display: "flex", fontSize: "44px", fontWeight: 700 }}>5,000</div>
            </div>
            <div style={{ display: "flex", height: "2px", background: "#d9ecfa" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{
                  display: "flex",
                  color: "#5b7182",
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                MESOS
              </div>
              <div style={{ display: "flex", fontSize: "44px", fontWeight: 700 }}>45,000</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{
                  display: "flex",
                  color: "#5b7182",
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}
              >
                USD
              </div>
              <div style={{ display: "flex", fontSize: "32px", fontWeight: 700, color: "#a5480b" }}>
                US$ 5.00
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#5b7182",
            fontSize: "18px",
            fontWeight: 600,
          }}
        >
          <div style={{ display: "flex" }}>Share your scenario with one link</div>
          <div style={{ display: "flex" }}>nx-meso-converter.vercel.app</div>
        </div>
      </div>
    </div>,
    size,
  );
}
