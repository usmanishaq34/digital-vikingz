/**
 * BLOG POSTS — Edit to add or update posts.
 */

export type PostCategory = "Methodology" | "Case Studies" | "AI Visibility" | "Industry Analysis"

export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  category: PostCategory
  tags: string[]
  publishedAt: string // ISO date
  readingTimeMinutes: number
  featuredImage?: string
  seoTitle?: string
  seoDescription?: string
}

export const categories: PostCategory[] = ["Methodology", "Case Studies", "AI Visibility", "Industry Analysis"]

export const posts: Post[] = [
  {
    slug: "why-most-seo-audits-miss-the-entity-layer",
    title: "Why Most SEO Audits Miss the Entity Layer",
    excerpt: "Most SEO audits operate at the surface layer — title tags, internal linking, schema. They miss the layer that actually determines whether your site compounds authority or fragments it: the entity layer. Here's how to diagnose your own.",
    category: "Methodology",
    tags: ["entity-layer", "audit", "semantic-seo", "methodology"],
    publishedAt: "2026-04-29T00:00:00.000Z",
    readingTimeMinutes: 10,
    seoTitle: "Why Most SEO Audits Miss the Entity Layer",
    seoDescription: "Traditional SEO audits miss the entity layer — the underlying definition coherence that determines whether your site compounds authority or fragments it. Here's how to diagnose your own.",
    content: `<p>Most SEO audits look thorough. They cover technical issues, content gaps, backlink profile health, keyword opportunities, page speed, schema markup. They produce 40-page reports with screenshots, severity ratings, and prioritized fixes. They feel rigorous because they catalog dozens of problems your site has.</p>

<p>And almost all of them miss the layer that actually determines whether your site compounds authority or fragments it.</p>

<p>The entity layer.</p>

<h2>What the <em>entity layer</em> actually is</h2>

<p>Search engines and large language models don't index your site as a collection of pages. They index it as a representation of <strong>entities</strong> — concepts, people, products, places, events — and the <strong>predicates</strong> (relationships) connecting those entities. When Google's algorithm reads your homepage, it's not asking "what keywords does this rank for?" It's asking: "What is the central entity this site represents? How is it defined? How consistently is that definition reinforced across the rest of the site?"</p>

<p>A traditional SEO audit answers questions like: "Are your title tags optimized? Is your internal linking clean? Is your schema markup deployed?" Those questions are real, but they operate at the surface layer. They tell you whether the technical signals are wired correctly. They don't tell you whether the underlying entity definition is coherent.</p>

<blockquote><p>An entity-fragmented site can pass every technical SEO checklist and still fail to rank — because the architecture itself is incoherent.</p></blockquote>

<h3>What this looks like in practice</h3>

<p>Consider a SaaS company selling workflow automation software. Their homepage describes the product as a "workflow platform." Their About page calls it an "automation tool." Their Solutions page calls it "process management software." Their Pricing page calls it an "enterprise app."</p>

<p>Every one of those terms describes the same product. A human reader connects them effortlessly. A search engine — and increasingly, an AI retrieval system — does not. Each term creates a slightly different entity signature. The result is that the site's <strong>Central Entity</strong> never binds. Authority that should accumulate to a single, defensible category position scatters across four loosely-connected ones.</p>

<p>A traditional audit will look at this site and report:</p>

<ul>
<li>Title tags are optimized</li>
<li>Schema markup is deployed</li>
<li>Internal linking is clean</li>
<li>Page speed is acceptable</li>
<li>Content depth is adequate</li>
</ul>

<p>And it will recommend incremental improvements to each. None of those recommendations will fix the problem, because the problem isn't at any of those layers. It's at the entity definition layer — and most audit frameworks don't even have a place to flag it.</p>

<h2>Why this <em>matters more</em> in 2026 than it did in 2022</h2>

<p>Three years ago, you could rank a fragmented entity site through sheer content volume and link acquisition. Google's algorithm was forgiving of vocabulary drift because keyword-matching still carried significant ranking weight. You could publish 200 blog posts, get a handful of decent backlinks, and outrun your structural problems through tactical execution.</p>

<p>That window is closing. Two forces are converging to make entity coherence a hard prerequisite, not an optional polish:</p>

<h3>Force one: <em>Google's entity graph</em> is maturing</h3>

<p>Google's Knowledge Graph has been quietly absorbing entity-relationship data from millions of sites for over a decade. The 2024-2025 algorithm updates explicitly weight <strong>entity authority</strong> as a ranking signal. Sites with coherent entity definitions get retrieved for category queries; sites with fragmented entities get retrieved for keyword queries — and keyword queries are a shrinking percentage of total search volume.</p>

<h3>Force two: <em>AI retrieval surfaces</em> reward entity clarity</h3>

<p>ChatGPT, Perplexity, Claude, Gemini, and Google's AI Overviews don't retrieve from sites the way classic search did. They extract <strong>Entity-Attribute-Value triples</strong> from your content and use those triples to answer user queries. A site with a clean Central Entity, consistent predicates, and well-structured E-A-V scaffolding gets cited disproportionately. A site with fragmented entities gets ignored — because the retrieval models can't extract clean triples from incoherent vocabulary.</p>

<p>Here's the asymmetric outcome that matters: <strong>two sites with identical content depth, identical backlink profiles, and identical technical SEO can have radically different AI visibility</strong> based purely on whether their entity layer is coherent.</p>

<h2>How to <em>diagnose</em> your own entity layer</h2>

<p>You can run a partial diagnostic without methodology training. Three exercises:</p>

<h3>Exercise 1: The Central Entity definition test</h3>

<p>Open four pages on your site: homepage, about page, primary product/service page, pricing page. On each, find the sentence that describes <strong>what your business is</strong>. Write those four sentences down side by side.</p>

<p>If they describe the same entity using consistent vocabulary — same nouns, same predicates, same conceptual framing — your Central Entity is probably bound. If they use four different vocabulary registers, your Central Entity is fragmented and authority is leaking.</p>

<h3>Exercise 2: The predicate consistency test</h3>

<p>Pick one relationship that appears across multiple pages — for example, "this product is used by [customer type]." Search your site for every page that describes that relationship. Are you using the same predicate phrasing every time? Or are some pages saying "designed for," others saying "built for," others saying "made for," others saying "tailored to"?</p>

<p>Each variation creates a separate predicate signature. Search engines treat them as semantically related but not identical. <strong>Predicate inconsistency is one of the most common authority leaks in mid-sized B2B sites.</strong></p>

<h3>Exercise 3: The AI retrieval test</h3>

<p>Take five queries that represent the buyer's question space for your category. Plug each one into ChatGPT, Perplexity, and Google's AI Overviews. Count how many times your site is cited as a source. Then count how many times your competitors are cited.</p>

<p>If you're invisible across all three surfaces while competitors aren't, the problem is rarely "we need more content." It's almost always entity-layer: your site doesn't produce clean enough E-A-V triples for the retrieval models to extract.</p>

<h2>Why most agencies <em>can't fix this</em></h2>

<p>Entity-layer diagnostics require a specific methodological foundation. The dominant SEO frameworks taught at agencies — keyword research, technical audits, link acquisition, content production — don't include entity architecture. An agency optimizing for keyword rankings will recommend tactics that improve keyword rankings. None of those tactics fix the entity layer; some actively make it worse by adding more vocabulary fragmentation.</p>

<p>The methodological framework that does address entity coherence comes from Koray Tuğberk Gübür's published body of work on semantic SEO. <strong>Topical authority architecture, Source Term Vector specification, predicate frameworks, agreement-area analysis, Information Gain engineering</strong> — these are the operational disciplines that let you diagnose and fix entity-layer problems at scale.</p>

<p>The shorter version: <strong>traditional SEO is keyword-first. Semantic SEO is entity-first. They produce different sites, different rankings, different pipeline.</strong></p>

<h2>The honest <em>diagnostic vs. fix</em> distinction</h2>

<p>A diagnostic identifies problems. A fix solves them. The two are separate engagements with different timelines.</p>

<p>Entity-layer fixes are usually quarters of work, not weeks. Locking a fragmented Central Entity definition takes a writeup that cascades through 4-12 priority pages. Specifying a Source Term Vector and enforcing it requires a banned-phrase registry, governance manual, and editorial QA workflow. Repairing predicate inconsistency means rewriting copy across dozens of pages.</p>

<p>None of this is fast. But it's also work that compounds for years instead of breaking in 18 months. The trade-off most businesses get wrong is choosing tactics that produce 6-month wins over architecture that produces 5-year compounding. <strong>That trade-off is rational only if you're not planning to be in business for five years.</strong></p>

<p>If you're planning to be there, the architecture decisions made at the entity layer are the ones that will determine whether you're still ranking when buyers search your category in 2030.</p>`,
  },
]

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllPostSlugs(): string[] {
  return posts.map((p) => p.slug)
}

export function getPostsByCategory(category: PostCategory): Post[] {
  return posts.filter((p) => p.category === category)
}

export function getPublishedPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPostBySlug(slug)
  if (!current) return []
  return posts
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit)
}
