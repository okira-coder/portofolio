import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.title}`;
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
          justifyContent: "space-between",
          padding: 80,
          background: "#171512",
          color: "#fffdf8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#b5aa9c" }}>{site.name}</div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 980 }}>
          {site.promise}
        </div>
        <div style={{ fontSize: 28, color: "#f08a4b" }}>{site.title}</div>
      </div>
    ),
    size,
  );
}
