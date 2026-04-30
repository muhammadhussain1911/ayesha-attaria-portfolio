import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://ayeshaattaria.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All crawlers including search engines, AI, and LLMs
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
