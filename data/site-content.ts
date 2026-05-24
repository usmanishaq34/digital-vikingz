/**
 * SITE CONTENT — Edit this file to change content across the site.
 *
 * Until the admin panel is wired to a database, all content lives here.
 * After admin is built, this becomes the seed file for the database.
 */

export const siteConfig = {
  name: "Digital Vikingz",
  tagline: "Semantic SEO authority agency. Built on Koray methodology.",
  url: "https://digitalvikingz.com",
  ogImage: "/images/og-default.png",

  // Contact
  email: "workwithus@digitalvikingz.com",
  calendlyUrl: "https://calendly.com/usmanishaqsemanticseospecialist/30min",
  calendlyAuditUrl: "https://calendly.com/usmanishaqsemanticseospecialist/30min?audit=true",

  // Location
  location: "Bahawalpur",
  regions: "US · UK · CA · AU · DE",

  // Social URLs
  social: {
    facebook: "https://www.facebook.com/DigitalVikingz",
    linkedin: "https://www.linkedin.com/company/digital-vikingz",
    instagram: "https://www.instagram.com/digitalvikingz/",
    tiktok: "https://www.tiktok.com/@digital.vikingzofficial",
  },

  // Stats
  stats: {
    projects: "200+",
    verticals: "40+",
    practicingSince: "2019",
    teamSize: "15",
    methodologyLineage: "Koray Tuğberk Gübür",
  },

  // CTAs
  cta: {
    primary: "Book Strategy Call",
    audit: "Book Audit Intake",
    finalHeading: 'Want this <em>methodology</em> applied to your site?',
    finalSub: "Book a 30-minute strategy call. No pitch deck — methodology fit assessment, scope direction, and honest answers about whether we're the right partner.",
  },

  // Footer
  footerTagline: "Semantic SEO authority agency built on Koray Tuğberk Gübür's methodology. We architect topical authority, defend it against AI dilution, and convert it into pipeline.",
  noPromisesDisclaimer: "No ranking guarantees · No traffic promises · Methodology only",

  // Founder
  founder: {
    name: "Usman Ishaq",
    title: "Founder & CEO · Digital Vikingz",
    photoUrl: "/images/founder.png",
    shortBio: "Methodology-trained semantic SEO practitioner. Mechanical engineer turned digital systems architect. Practicing since 2019, deep-trained in Koray Tuğberk Gübür's framework since 2023.",
  },

  // Audit
  audit: {
    price: "$3,500",
    pricePrefix: "Starts at",
    creditWindow: 60,
    intakeCapacity: 4,
  },
} as const

export type SiteConfig = typeof siteConfig
