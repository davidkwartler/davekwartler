import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "David Kwartler — Senior Product Manager";

export default function OpenGraphImage() {
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
          backgroundColor: "#0a0a0f",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 10% 0%, rgba(139, 92, 246, 0.35), transparent), radial-gradient(ellipse 50% 40% at 100% 30%, rgba(34, 211, 238, 0.22), transparent), radial-gradient(ellipse 50% 50% at 40% 100%, rgba(59, 130, 246, 0.28), transparent)",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          David Kwartler
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#d1d5db",
          }}
        >
          Identity nerd, agentic-travel PM, occasional race car driver
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 26,
            color: "#9ca3af",
          }}
        >
          davidkwartler.com
        </div>
      </div>
    ),
    size
  );
}
