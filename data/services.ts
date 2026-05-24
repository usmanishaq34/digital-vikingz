/**
 * SERVICES — Edit to change service page content.
 * Each service drives /services/[slug] dynamic route.
 */

export type ServiceTier = "Claim" | "Shield" | "Scale"

export interface Service {
  slug: string
  title: string
  tier: ServiceTier
  shortDescription: string
  heroLabel: string
  heroHeading: string
  heroSub: string
  pricing: string
  minEngagement: string
  fullDescription: string
  deliverables: string[]
  process: Array<{ title: string; description: string }>
  faqs: Array<{ question: string; answer: string }>
  fitsYou: string[]
  notFitsYou: string[]
  seoTitle: string
  seoDescription: string
  sortOrder: number
}

export const services: Service[] = [
  {
    slug: "semantic-seo-architecture",
    title: "Semantic SEO Architecture",
    tier: "Claim",
    sortOrder: 1,
    shortDescription: "12-month authority blueprint. We architect the entire topical authority infrastructure for your category.",
    heroLabel: "Claim Tier · Architecture · 12-Month Engagement",
    heroHeading: "Architect topical authority. <em>From the entity layer up.</em>",
    heroSub: "Most sites build content. We build architecture. The blueprint of your Source Term Vector, Topical Map, and predicate framework that determines whether your site compounds authority for the next 5 years.",
    pricing: "Custom · scoped per engagement",
    minEngagement: "12 months",
    fullDescription: "Architecture is not content. Content is what you publish. Architecture is the underlying structure that determines whether what you publish compounds authority or fragments it. We architect the Central Entity definition, the Source Term Vector boundary, the Topical Map of attribute coverage, and the predicate framework that governs how your site describes its core relationships. The result is a methodology-grade infrastructure that every future content decision plugs into cleanly.",
    deliverables: [
      "Central Entity specification document",
      "Source Term Vector vocabulary boundary",
      "Topical Map with attribute coverage analysis",
      "Predicate framework with canonical phrasing",
      "Information Gain strategy per priority page",
      "Editorial governance manual",
      "Glossary of canonical terms",
      "Banned-phrase registry",
      "QA workflow for content production",
      "12-month implementation roadmap",
    ],
    process: [
      { title: "Discovery (Weeks 1-2)", description: "Deep audit of current entity layer, predicate consistency, vocabulary fragmentation, and topical coverage gaps." },
      { title: "Specification (Weeks 3-4)", description: "Define Central Entity, write Source Term Vector boundary, map topical attribute space, draft predicate framework." },
      { title: "Architecture Rollout (Weeks 5-8)", description: "Cascade definitions through priority pages, rewrite copy for vocabulary consistency, deploy schema markup updates." },
      { title: "Content Production (Weeks 9-36)", description: "Execute content production against architecture, weekly editorial QA against Source Term Vector, monthly authority diagnostics." },
      { title: "Compounding Phase (Weeks 37+)", description: "Architecture is locked. Content velocity increases. Authority signals compound. Engagement transitions to maintenance + Scale-tier services." },
    ],
    faqs: [
      { question: "Why 12 months minimum?", answer: "Topical authority architecture compounds. Short engagements produce tactical wins that get erased by the next algorithm update. 12 months is the floor at which architecture decisions begin to show in rankings and AI citations." },
      { question: "Can you do this without the Audit first?", answer: "Yes, but we recommend the Audit. Without it we're working blind for the first 4-6 weeks while we diagnose. The Audit compresses that to 2 weeks." },
      { question: "Do you guarantee rankings?", answer: "No. Anyone who guarantees rankings is lying or doesn't understand modern search. We guarantee methodology execution, deliverable quality, and architecture coherence." },
    ],
    fitsYou: [
      "B2B SaaS with 50+ existing pages",
      "Established business in a defined category",
      "Has internal content team or production capacity",
      "Multi-year horizon for SEO compounding",
      "Methodology-curious leadership",
    ],
    notFitsYou: [
      "Pre-launch sites with no content",
      "Short-term tactical SEO needs (6 months or less)",
      "Affiliate/arbitrage sites",
      "E-commerce with thousands of product pages (different methodology)",
      "Looking for ranking guarantees",
    ],
    seoTitle: "Semantic SEO Architecture — Topical Authority Infrastructure",
    seoDescription: "12-month topical authority architecture engagement. Central Entity specification, Source Term Vector, Topical Map, predicate framework. Methodology by Koray Tuğberk Gübür.",
  },
  {
    slug: "semantic-content-audit",
    title: "Semantic Content Audit",
    tier: "Claim",
    sortOrder: 2,
    shortDescription: "Productized $3,500 diagnostic. Real entity-layer analysis with actionable recommendations.",
    heroLabel: "Claim Tier · Productized · $3,500 · 60-Day Credit",
    heroHeading: "Find out what your <em>entity layer</em> is hiding.",
    heroSub: "Productized diagnostic. Real Source Term Vector mapping. Real predicate consistency analysis. Real recommendations you can execute or hand to your team. Capacity capped at 4 audits per month so each one gets real attention.",
    pricing: "$3,500",
    minEngagement: "One-time engagement · 60-day credit toward larger work",
    fullDescription: "The Audit is the entry point to working with Digital Vikingz. It's not a 40-page automated PDF. It's a 2-week deep diagnostic of your entity layer, conducted by Usman directly, producing a methodology-grade analysis of where your site's topical authority is leaking, where the Source Term Vector is fragmented, and where Information Gain opportunities exist. The $3,500 fee credits 100% toward any larger engagement booked within 60 days.",
    deliverables: [
      "Central Entity coherence diagnostic",
      "Source Term Vector fragmentation map",
      "Predicate consistency analysis (top 20 pages)",
      "Topical Map gap analysis",
      "Information Gain opportunity inventory",
      "AI retrieval readiness assessment (ChatGPT, Perplexity, Google AIO)",
      "Priority recommendation list (ranked by leverage)",
      "60-minute live debrief call",
      "Executable next-steps document",
    ],
    process: [
      { title: "Intake (Day 1)", description: "30-minute call to scope priorities, understand business context, agree on focus pages." },
      { title: "Deep Diagnostic (Days 2-8)", description: "Manual entity-layer analysis. No automated tools. Each priority page reviewed against Source Term Vector criteria." },
      { title: "Synthesis (Days 9-11)", description: "Findings synthesized into ranked recommendation list. Information Gain opportunities documented." },
      { title: "Debrief (Day 12)", description: "60-minute live call to walk through findings, answer questions, agree on next steps." },
      { title: "Decide (Days 13-60)", description: "Take the recommendations and execute internally, or credit the fee toward a larger architecture or production engagement." },
    ],
    faqs: [
      { question: "Why $3,500 specifically?", answer: "It's the floor that makes a real diagnostic possible without it being a loss-leader. Cheaper audits are either automated PDFs or junior-level work. We do this manually." },
      { question: "What if I don't want to continue with you after?", answer: "Take the recommendations and execute internally. The audit document is yours. No upsell pressure." },
      { question: "Why only 4 per month?", answer: "Capacity. Each audit takes 8-12 days of focused work. Doing more would compromise quality, which compromises the methodology." },
    ],
    fitsYou: [
      "B2B sites with 20+ existing pages",
      "Leadership willing to act on findings",
      "Curious about entity-layer thinking",
      "Want to know before committing to larger engagement",
    ],
    notFitsYou: [
      "Just want a quick PDF for compliance",
      "Looking for keyword research",
      "Need 24-hour turnaround",
      "Sites under 20 pages (not enough surface to audit)",
    ],
    seoTitle: "Semantic Content Audit — $3,500 Entity-Layer Diagnostic",
    seoDescription: "Productized $3,500 entity-layer audit. Source Term Vector analysis, predicate consistency, Information Gain opportunities. 4 audits per month. 60-day credit window.",
  },
  {
    slug: "llm-ai-search-visibility",
    title: "LLM & AI Search Visibility",
    tier: "Shield",
    sortOrder: 3,
    shortDescription: "Get cited by ChatGPT, Perplexity, Claude, and Google AI Overviews. Defense against AI dilution.",
    heroLabel: "Shield Tier · AI Retrieval · LLM Citation",
    heroHeading: "Get cited by AI. <em>Not erased by it.</em>",
    heroSub: "AI retrieval surfaces don't index pages. They extract Entity-Attribute-Value triples. Sites that produce clean E-A-V triples get cited disproportionately. Sites that don't get erased from the conversation. We engineer the second outcome into the first.",
    pricing: "Custom · scoped per engagement",
    minEngagement: "6 months",
    fullDescription: "AI search is not Google search with different branding. The retrieval mechanism is fundamentally different — it extracts structured Entity-Attribute-Value triples from your content and uses those triples to answer queries. Sites optimized for keywords get ignored. Sites with clean entity layers get cited. We engineer your content so AI retrieval systems can extract clean triples and select your site as a primary source.",
    deliverables: [
      "AI retrieval readiness audit",
      "E-A-V triple optimization for priority pages",
      "Structured schema deployment (Article, FAQPage, HowTo, Service)",
      "Citation magnet content production",
      "Perplexity citation tracking",
      "ChatGPT/Claude visibility monitoring",
      "Google AI Overview presence analysis",
      "Monthly citation report",
    ],
    process: [
      { title: "Diagnostic", description: "Test 20+ category queries across ChatGPT, Perplexity, Claude, Gemini, Google AIO. Map current citation presence." },
      { title: "E-A-V Optimization", description: "Restructure priority pages so retrieval systems can extract clean triples. Deploy structured schema." },
      { title: "Citation Magnet Production", description: "Create content specifically designed to be cited (data points, frameworks, comparisons, definitions)." },
      { title: "Monitoring", description: "Weekly citation tracking, monthly visibility reports, quarterly strategy adjustments." },
    ],
    faqs: [
      { question: "Can you guarantee ChatGPT will cite us?", answer: "No. We can engineer the conditions that make citation likely. The retrieval models make the final call." },
      { question: "Is this just SEO with extra steps?", answer: "No. Traditional SEO optimizes for keyword matching. This optimizes for entity extraction. Different mechanism, different optimization." },
      { question: "How do you measure success?", answer: "Citation frequency across surfaces, citation context quality, traffic from AI-source referrals, brand mention growth in AI responses." },
    ],
    fitsYou: [
      "B2B with informational query exposure",
      "Companies in emerging categories",
      "Brands losing branded search to AI overviews",
      "Educational/methodology-driven businesses",
    ],
    notFitsYou: [
      "E-commerce product pages (different methodology)",
      "Local services (different retrieval pattern)",
      "Sites with very thin existing content",
      "Need results this quarter",
    ],
    seoTitle: "LLM & AI Search Visibility — Get Cited by ChatGPT, Perplexity, Google AIO",
    seoDescription: "Engineer your site to be cited by AI retrieval systems. E-A-V triple optimization, structured schema, citation magnet content. ChatGPT, Perplexity, Claude, Google AI Overviews.",
  },
  {
    slug: "authority-link-building",
    title: "Authority Link Building",
    tier: "Shield",
    sortOrder: 4,
    shortDescription: "Methodology-grade link building. Source Term Vector aligned. No PBNs. No guest post farms.",
    heroLabel: "Shield Tier · Link Authority · Source-Term Aligned",
    heroHeading: "Links that <em>reinforce</em> authority.",
    heroSub: "Most link building is contamination. Generic guest posts dilute your Source Term Vector. PBN networks pollute your entity signal. We build links that reinforce your Central Entity definition and accelerate topical authority compounding.",
    pricing: "Custom · scoped per engagement",
    minEngagement: "6 months",
    fullDescription: "Link building done badly is worse than no link building. Every link from a contextually-misaligned site adds noise to your Source Term Vector and weakens your Central Entity definition. We build only methodology-aligned links: contextually relevant, predicate-consistent, from sources that strengthen rather than fragment your entity signature.",
    deliverables: [
      "Link target taxonomy aligned to Source Term Vector",
      "Source vetting against entity contamination criteria",
      "Outreach copy aligned to predicate framework",
      "5-15 placements per month (quality > quantity)",
      "Full transparency on every placement",
      "Source-by-source contribution analysis",
      "Monthly reporting with entity-graph impact analysis",
    ],
    process: [
      { title: "Source Term Vector Specification", description: "Define which link sources reinforce vs fragment your entity signal." },
      { title: "Target Identification", description: "Manual research of contextually-aligned sources within your topical cluster." },
      { title: "Outreach Production", description: "Hand-written outreach using your canonical predicates and vocabulary." },
      { title: "Placement & QA", description: "Each placement reviewed against entity-contamination criteria before publication." },
      { title: "Reporting", description: "Monthly impact reports showing source-by-source contribution to authority graph." },
    ],
    faqs: [
      { question: "How many links per month?", answer: "5-15 typically. Quality is the constraint, not volume. 50-link-per-month services are doing PBN or guest post farms." },
      { question: "Do you do guest posts?", answer: "Yes, but only on contextually-aligned publications. No generic 'guest post on any DR40+ site' work." },
      { question: "What's your refusal criteria?", answer: "Source must pass: vocabulary alignment, predicate consistency, audience overlap, content quality, link velocity health. Any fail → reject the placement opportunity." },
    ],
    fitsYou: [
      "B2B with established product/category position",
      "Companies that care about entity coherence",
      "Long-term authority horizon",
      "Methodology-curious leadership",
    ],
    notFitsYou: [
      "Volume-first 'we need 100 links/month'",
      "Anyone wanting PBN or rented links",
      "Sites with no existing authority foundation",
      "Quick-win tactical SEO budgets",
    ],
    seoTitle: "Authority Link Building — Methodology-Grade Link Acquisition",
    seoDescription: "Source Term Vector aligned link building. No PBNs. No guest post farms. 5-15 contextually-aligned placements per month. Reinforces entity signal instead of fragmenting it.",
  },
  {
    slug: "semantic-content-network",
    title: "Semantic Content Network",
    tier: "Shield",
    sortOrder: 5,
    shortDescription: "External authority distribution across off-site properties. Cluster-aligned content syndication.",
    heroLabel: "Shield Tier · External Distribution · Cluster Network",
    heroHeading: "Authority distributed. <em>Not duplicated.</em>",
    heroSub: "Most content syndication is duplication. We architect a network of off-site properties where each property reinforces a specific cluster in your topical map. The result is a distributed entity signal that builds authority across the web, not just on your domain.",
    pricing: "Custom · scoped per engagement",
    minEngagement: "6 months",
    fullDescription: "A semantic content network is not link building and not guest posting — it's external authority architecture. Multiple off-site properties (Medium publications, Substack, LinkedIn newsletters, niche industry sites) each owned or controlled by you, each aligned to a specific cluster in your topical map. Together they create a distributed entity signal that search engines and AI systems read as 'this entity has territorial authority across multiple surfaces.'",
    deliverables: [
      "External property identification and audit",
      "Cluster-property mapping",
      "Content production for each property (cluster-aligned)",
      "Cross-property predicate consistency",
      "Network entity graph documentation",
      "Monthly distribution report",
    ],
    process: [
      { title: "Network Audit", description: "Identify existing or available external properties that can hold cluster authority." },
      { title: "Cluster Mapping", description: "Assign each property to a specific cluster in your topical map." },
      { title: "Content Architecture", description: "Specify content type, cadence, and predicate framework for each property." },
      { title: "Production", description: "Ongoing content production for each property in the network." },
      { title: "Integration", description: "Cross-link strategy between network properties and main site." },
    ],
    faqs: [
      { question: "Isn't this just PR?", answer: "No. PR optimizes for brand awareness. This optimizes for entity-cluster distribution across the web." },
      { question: "Won't Google penalize duplicate content?", answer: "It's not duplicate content. Each property produces cluster-aligned unique content. The distribution is structural, not content-level." },
    ],
    fitsYou: [
      "Established brands ready to expand entity surface area",
      "Companies with multiple natural authority clusters",
      "Long-term authority builders",
    ],
    notFitsYou: [
      "Pre-launch or early-stage brands",
      "Single-cluster simple businesses",
      "Short-term tactical SEO",
    ],
    seoTitle: "Semantic Content Network — External Authority Distribution",
    seoDescription: "Distributed authority architecture across off-site properties. Each property reinforces a specific topical cluster. Cluster-aligned content syndication.",
  },
  {
    slug: "semantic-content-production",
    title: "Semantic Content Production",
    tier: "Scale",
    sortOrder: 6,
    shortDescription: "Execute at velocity. Production capacity wired to your architecture. 4-50 articles per month.",
    heroLabel: "Scale Tier · Production Velocity · Architecture-Aligned",
    heroHeading: "Production velocity. <em>Architecture-aligned.</em>",
    heroSub: "Architecture without production is theory. We execute against your Source Term Vector at scale — 4 to 50 methodology-grade articles per month, all aligned to your topical map, all reviewed against your predicate framework, all designed to compound authority.",
    pricing: "Custom · scoped per engagement",
    minEngagement: "6 months",
    fullDescription: "Most content production is volume without architecture. The result is fragmentation — every new article contaminates the Source Term Vector slightly more. Our production process is the opposite: every article is briefed against the architecture, written by methodology-trained writers, QA'd against the predicate framework, and published only after passing entity-coherence checks. Velocity that compounds instead of dilutes.",
    deliverables: [
      "Topical map-driven editorial calendar",
      "Content briefs aligned to Source Term Vector",
      "Methodology-trained writer team",
      "Editorial QA against predicate framework",
      "Information Gain per article (target: 30%+ new attributes)",
      "Monthly performance reporting",
      "Quarterly editorial calendar refresh",
    ],
    process: [
      { title: "Editorial Architecture", description: "Build editorial calendar from topical map gaps. Brief each piece against Source Term Vector." },
      { title: "Production", description: "Methodology-trained writers produce against briefs. Length, depth, attribute coverage all specified." },
      { title: "QA", description: "Every piece reviewed for predicate consistency, vocabulary alignment, Information Gain percentage." },
      { title: "Publication", description: "Coordinated with internal team or self-published depending on engagement structure." },
      { title: "Iteration", description: "Performance data feeds back into editorial calendar refresh." },
    ],
    faqs: [
      { question: "How many articles per month?", answer: "4 to 50. Capacity scales with engagement scope. Quality is constant — velocity adjusts." },
      { question: "Who writes the content?", answer: "Methodology-trained writers on our team, briefed against your specific architecture. Not generic SEO content writers." },
      { question: "Can you write in our industry?", answer: "We've adapted methodology across 40+ industries. Industry-specific vocabulary is part of the Source Term Vector specification." },
    ],
    fitsYou: [
      "Established architecture (ours or yours)",
      "Need consistent content velocity",
      "Long-term authority builders",
      "Want methodology consistency, not freelancer roulette",
    ],
    notFitsYou: [
      "Want $50/article generic content",
      "No existing architecture or strategy",
      "Need stuff published tomorrow",
      "Looking for AI-generated content at volume",
    ],
    seoTitle: "Semantic Content Production — Architecture-Aligned Velocity",
    seoDescription: "Methodology-grade content production at scale. 4-50 articles per month, Source Term Vector aligned, predicate framework QA'd, Information Gain engineered.",
  },
  {
    slug: "pipeline-attribution-seo",
    title: "Pipeline Attribution SEO",
    tier: "Scale",
    sortOrder: 7,
    shortDescription: "SEO tied to pipeline. Real revenue attribution. Stop reporting traffic, start reporting deals.",
    heroLabel: "Scale Tier · Pipeline-Connected · Attribution-Wired",
    heroHeading: "SEO that ships <em>revenue.</em>",
    heroSub: "Most SEO reports traffic. Traffic is a vanity metric. We wire your SEO directly to pipeline — MQL attribution, demo bookings, opportunity-to-close, revenue tied to organic source. The reports your CFO will actually read.",
    pricing: "Custom · scoped per engagement",
    minEngagement: "6 months",
    fullDescription: "If you can't connect SEO investment to revenue, the executive team will eventually defund it. We wire the attribution from search query to closed-won deal. GA4 events configured properly. CRM integration. Pipeline source tagging. The result is SEO reporting that competes with paid acquisition for budget on equal footing — because it shows actual dollars, not click counts.",
    deliverables: [
      "GA4 event architecture rebuild",
      "CRM integration (HubSpot, Salesforce, Pipedrive)",
      "UTM strategy and governance",
      "Source-of-truth dashboard build",
      "MQL attribution by organic source",
      "Opportunity-to-close pipeline tracking",
      "Monthly revenue-attributed SEO report",
      "Quarterly investment ROI analysis",
    ],
    process: [
      { title: "Audit", description: "Map current attribution gaps. Identify where revenue tracking breaks." },
      { title: "Rewire", description: "Rebuild GA4 events, CRM integration, UTM strategy." },
      { title: "Dashboard", description: "Build single source-of-truth dashboard for organic pipeline contribution." },
      { title: "Validate", description: "30-day validation period to confirm attribution accuracy." },
      { title: "Optimize", description: "Use attribution data to optimize SEO investment toward highest-revenue content." },
    ],
    faqs: [
      { question: "What CRMs do you support?", answer: "HubSpot, Salesforce, Pipedrive, Close, Pipefy. Others on request." },
      { question: "Is this just SEO reporting?", answer: "No. This is attribution architecture. Most SEO agencies report on rankings. We report on revenue. Different deliverable." },
      { question: "How long until I see real attribution data?", answer: "30 days for initial signal, 90 days for statistical confidence on deal-level attribution." },
    ],
    fitsYou: [
      "B2B SaaS with defined sales pipeline",
      "Companies with $1M+ ARR",
      "CRM already in use",
      "Leadership ready to make budget decisions on attribution data",
    ],
    notFitsYou: [
      "E-commerce (different attribution mechanism)",
      "Pre-product-market-fit companies",
      "No existing CRM",
      "Don't track pipeline at all",
    ],
    seoTitle: "Pipeline Attribution SEO — Revenue-Tied SEO Reporting",
    seoDescription: "Wire SEO to pipeline. MQL attribution, deal-level revenue tracking, GA4 + CRM integration. Report dollars instead of clicks.",
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug)
}

export function getServicesByTier(tier: ServiceTier): Service[] {
  return services.filter((s) => s.tier === tier).sort((a, b) => a.sortOrder - b.sortOrder)
}
