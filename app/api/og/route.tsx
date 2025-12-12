import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const imageData = await fetch(new URL("./og-bg.png", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <img
          src={imageData as any}
          width="1200"
          height="630"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
