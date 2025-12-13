import { ImageResponse } from "next/og";

// Image metadata
export const alt = "DevLangDict - Developer Language Dictionary";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Cloudflare Pages requires Edge runtime
export const runtime = "edge";

export default async function Image() {
  // Load the background image using fetch which is supported in Edge
  const imageData = await fetch(
    new URL("./api/og/og-bg.png", import.meta.url)
  ).then((res) => res.arrayBuffer());

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
      ...size,
    }
  );
}
