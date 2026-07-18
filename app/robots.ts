import { MetadataRoute } from "next"

const BASE_URL = "https://digitalvikingz.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          // The two real author profiles stay crawlable even though the
          // /author/ directory below is blocked. A more specific Allow
          // rule wins over a broader Disallow.
          "/author/usman-ishaq",
          "/author/abad-aslam",
        ],
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
          "/*?sid=",
          "/*?sid=*",
          "/*?utm_source=*",
          "/*?utm_medium=*",
          "/*?utm_campaign=*",
          "/*?utm_term=*",
          "/*?utm_content=*",
          "/*?elementor_library=*",
          "/*?elementor=*",
          "/elementor-",
          "/2024/",
          "/2025/",
          "/2026/",
          "/btmymgf-",
          "/liwzjvt-",
          "/gkrcvix-",
          "/rlcidye-",
          "/rloidye-",
          "/can-really-make-money-blogging-food/",
          "/wp-admin/",
          "/wp-includes/",
          "/wp-json/",
          "/?s=",
          "/search/",
          "/*?replytocom=",
          "/tag/*/page/",
          "/category/*/page/",
          "/author/",
          "/trackback/",
          "/feed/",
          "/comments/feed/",
          "/xmlrpc.php",
        ],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
