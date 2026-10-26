import { ImageResponse } from "next/og";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/locales";
import { buildSharePreview } from "@/lib/share-preview";

export const dynamic = "force-dynamic";

const IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

export function GET(request: Request) {
  const url = new URL(request.url);
  const requestedLocale = url.searchParams.get("locale");
  const locale =
    requestedLocale !== null && isLocale(requestedLocale) ? requestedLocale : DEFAULT_LOCALE;
  const preview = buildSharePreview(locale, url.search);

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
        padding: "44px",
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
          padding: "40px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#a5480b",
              fontSize: "18px",
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
                width: "52px",
                height: "52px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #fbd26a 0%, #f5a73b 55%, #f07a25 100%)",
                color: "#713708",
                fontSize: "23px",
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
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              padding: "8px 15px",
            }}
          >
            ADJUSTABLE RATES
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "14px" }}>
            <div
              style={{
                display: "flex",
                fontSize: "52px",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              NX Mesos Converter
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "23px",
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
              width: "580px",
              flexDirection: "column",
              gap: "16px",
              border: "2px solid #cbe7fb",
              borderRadius: "28px",
              background: "#f2faff",
              padding: "28px 32px",
            }}
          >
            <ValueRow label="NX" value={preview.nxValue} />
            <div style={{ display: "flex", height: "2px", background: "#d9ecfa" }} />
            <ValueRow label="MESOS" value={preview.mesosValue} />
            <ValueRow label="USD" value={preview.usdValue} accent />
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
    {
      ...IMAGE_SIZE,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
}

function ValueRow({
  label,
  value,
  accent = false,
}: Readonly<{ label: string; value: string; accent?: boolean }>) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <div
        style={{
          display: "flex",
          color: "#5b7182",
          fontSize: "15px",
          fontWeight: 700,
          letterSpacing: "0.1em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: `${getValueFontSize(value)}px`,
          fontWeight: 700,
          color: accent ? "#a5480b" : "#17334d",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function getValueFontSize(value: string): number {
  if (value.length > 14) {
    return 30;
  }

  if (value.length > 10) {
    return 36;
  }

  return 50;
}
