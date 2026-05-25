import { MetadataRoute } from "next"
import { prisma } from "@/lib/db"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digitalvikingz.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // ============= STATIC PAGES =============
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/operating-manual`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/build-process`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/vertical-playbooks`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/the-audit`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  // ============= DYNAMIC SERVICE PAGES =============
  let servicePages: MetadataRoute.Sitemap = []
  try {
    const services = await prisma.service.findMany({
      where: {
        OR: [
          { status: "published" } as any,
          { published: true },
        ],
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    servicePages = services.map((service) => ({
      url: `${BASE_URL}/services/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    }))
  } catch (err) {
    console.error("Failed to fetch services for sitemap:", err)
  }

  // ============= DYNAMIC BLOG POSTS =============
  let postPages: MetadataRoute.Sitemap = []
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: {
        slug: true,
        publishedAt: true,
        updatedAt: true,
      },
    })

    postPages = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))
  } catch (err) {
    console.error("Failed to fetch posts for sitemap:", err)
  }

  // ============= BLOG CATEGORIES =============
  let categoryPages: MetadataRoute.Sitemap = []
  try {
    const categories = await prisma.category.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    categoryPages = categories.map((category) => ({
      url: `${BASE_URL}/blog/category/${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  } catch (err) {
    console.error("Failed to fetch categories for sitemap:", err)
  }

  return [...staticPages, ...servicePages, ...postPages, ...categoryPages]
}
