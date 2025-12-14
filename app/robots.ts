import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://devdict.site/sitemap.xml", // 👈 방금 만든 사이트맵 위치를 로봇에게 알려줌
  };
}
