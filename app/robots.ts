import { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalvikingz.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/vikingz-1000-admin/",
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
