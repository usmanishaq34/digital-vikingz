/**
 * Prisma seed script
 * Run: npm run db:seed
 *
 * Populates the database with:
 * - 1 admin user (using SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD env vars)
 * - 13 pages from hardcoded content
 * - 7 services from data/services.ts
 * - 4 categories
 * - 1 sample post from data/posts.ts
 * - Default settings
 * - Default audit config
 */

import { PrismaClient, ServiceTier } from "@prisma/client"
import bcrypt from "bcryptjs"
import { services as servicesData } from "../data/services"
import { posts as postsData, categories as categoriesData } from "../data/posts"
import { siteConfig } from "../data/site-content"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting seed...")

  // ----- Admin user -----
  const adminEmail = process.env.SEED_ADMIN_EMAIL || process.env.ADMIN_EMAIL || "admin@digitalvikingz.com"
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "ChangeThisStrongPassword123!"

  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: process.env.ADMIN_NAME || "Digital Vikingz Admin",
      hashedPassword,
      role: "ADMIN",
    },
  })
  console.log(`✅ Admin user: ${adminUser.email}`)

  // ----- Categories -----
  for (const catName of categoriesData) {
    await prisma.category.upsert({
      where: { name: catName },
      update: {},
      create: {
        name: catName,
        slug: catName.toLowerCase().replace(/\s+/g, "-"),
      },
    })
  }
  console.log(`✅ ${categoriesData.length} categories created`)

  // ----- Services -----
  for (const service of servicesData) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        title: service.title,
        tier: service.tier.toUpperCase() as ServiceTier,
        shortDescription: service.shortDescription,
        heroLabel: service.heroLabel,
        heroHeading: service.heroHeading,
        heroSub: service.heroSub,
        pricing: service.pricing,
        minEngagement: service.minEngagement,
        fullDescription: service.fullDescription,
        deliverables: service.deliverables,
        process: service.process,
        faqs: service.faqs,
        fitsYou: service.fitsYou,
        notFitsYou: service.notFitsYou,
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
        sortOrder: service.sortOrder,
        published: true,
      },
    })
  }
  console.log(`✅ ${servicesData.length} services created`)

  // ----- Pages -----
  const pages = [
    { slug: "home", title: "Home", heroLabel: "Semantic SEO Authority Agency", heroHeading: "Architect topical authority. <em>Defend it. Scale it.</em>", heroSub: siteConfig.tagline },
    { slug: "about", title: "About", heroLabel: "About · Founder · Methodology Lineage", heroHeading: "Architected by a practitioner, <em>not an agency.</em>", heroSub: "Digital Vikingz is a semantic SEO authority agency founded by Usman Ishaq." },
    { slug: "operating-manual", title: "Operating Manual", heroLabel: "Operating Manual · Methodology Spec", heroHeading: "How we <em>actually build</em> topical authority.", heroSub: "No fluff. No keyword lists. The exact methodology stack." },
    { slug: "build-process", title: "Build Process", heroLabel: "Build Process · 12-Week Sprint Calendar", heroHeading: "Inside the <em>build process.</em>", heroSub: "Week-by-week look at how we engineer topical authority architecture." },
    { slug: "vertical-playbooks", title: "Vertical Playbooks", heroLabel: "Vertical Playbooks · 40+ Industries", heroHeading: "Methodology adapts. <em>Outcomes compound.</em>", heroSub: "Same Koray methodology. Different vertical adaptations." },
    { slug: "the-audit", title: "The Audit", heroLabel: "The Audit · Productized · 60-Day Credit", heroHeading: "Find out what your <em>entity layer</em> is hiding.", heroSub: "Productized $3,500 diagnostic." },
    { slug: "contact", title: "Contact", heroLabel: "Contact · Direct Founder Access", heroHeading: "Talk to the <em>practitioner.</em>", heroSub: "No SDR. No account manager. Strategy calls go directly to Usman." },
    { slug: "privacy-policy", title: "Privacy Policy", heroLabel: "Legal · Privacy", heroHeading: "Privacy <em>Policy</em>", heroSub: "How Digital Vikingz handles personal information." },
  ]

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: page,
    })
  }
  console.log(`✅ ${pages.length} pages created`)

  // ----- Sample post -----
  const methodologyCategory = await prisma.category.findUnique({
    where: { name: "Methodology" },
  })

  for (const post of postsData) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags,
        categoryId: methodologyCategory?.id,
        authorId: adminUser.id,
        published: true,
        publishedAt: new Date(post.publishedAt),
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
      },
    })
  }
  console.log(`✅ ${postsData.length} post(s) created`)

  // ----- Settings -----
  await prisma.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteTitle: siteConfig.name,
      siteTagline: siteConfig.tagline,
      contactEmail: siteConfig.email,
      calendlyUrl: siteConfig.calendlyUrl,
      calendlyAuditUrl: siteConfig.calendlyAuditUrl,
      agencyLocation: siteConfig.location,
      agencyRegions: siteConfig.regions,
      footerTagline: siteConfig.footerTagline,
      noPromisesDisclaimer: siteConfig.noPromisesDisclaimer,
      statsProjects: siteConfig.stats.projects,
      statsVerticals: siteConfig.stats.verticals,
      statsPracticingSince: siteConfig.stats.practicingSince,
      statsTeamSize: siteConfig.stats.teamSize,
      statsMethodologyLineage: siteConfig.stats.methodologyLineage,
      ctaPrimaryLabel: siteConfig.cta.primary,
      ctaAuditLabel: siteConfig.cta.audit,
      ctaFinalHeading: siteConfig.cta.finalHeading,
      ctaFinalSub: siteConfig.cta.finalSub,
      facebookUrl: siteConfig.social.facebook,
      linkedinUrl: siteConfig.social.linkedin,
      instagramUrl: siteConfig.social.instagram,
      tiktokUrl: siteConfig.social.tiktok,
      founderName: siteConfig.founder.name,
      founderTitle: siteConfig.founder.title,
      founderShortBio: siteConfig.founder.shortBio,
      auditPrice: siteConfig.audit.price,
      auditPricePrefix: siteConfig.audit.pricePrefix,
      auditCreditWindow: siteConfig.audit.creditWindow,
      auditIntakeCapacity: siteConfig.audit.intakeCapacity,
    },
  })
  console.log("✅ Settings created")

  console.log("\n🎉 Seed complete!")
  console.log(`\n📧 Admin login: ${adminEmail}`)
  console.log(`🔑 Admin password: ${adminPassword}`)
  console.log(`\n⚠️  Change this password immediately after first login!`)
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
