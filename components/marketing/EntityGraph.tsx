"use client"

import { useEffect, useRef, useState } from "react"

interface Cluster {
  id: string
  label: string
  angle: number
  attributes: string[]
}

const clusters: Cluster[] = [
  { id: "topical-authority", label: "Topical Authority", angle: -90, attributes: ["Coverage", "Depth", "Authority Map", "Topical Path"] },
  { id: "entity-architecture", label: "Entity Architecture", angle: -30, attributes: ["Central Entity", "Predicates", "E-A-V Triples", "Knowledge Graph"] },
  { id: "ai-visibility", label: "AI Visibility", angle: 30, attributes: ["LLM Citation", "Perplexity", "ChatGPT", "Google AIO"] },
  { id: "source-term-vector", label: "Source Term Vector", angle: 90, attributes: ["Vocabulary Boundary", "Glossary", "Banned Phrases", "Canonical Forms"] },
  { id: "methodology-lineage", label: "Methodology Lineage", angle: 150, attributes: ["Koray Framework", "200+ Projects", "40+ Verticals", "6 Years Practice"] },
  { id: "pipeline-attribution", label: "Pipeline Attribution", angle: 210, attributes: ["Demo Booking", "MQL Tracking", "Revenue Tied", "GA4 Wired"] },
]

const statusMessages = [
  "SaaS topical authority architecture",
  "B2B entity-layer audit",
  "Multi-location GBP cluster",
  "LLM citation optimization",
  "Source Term Vector specification",
  "Topical map for fintech vertical",
  "Predicate framework refactor",
  "AI Overview readiness audit",
]

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export default function EntityGraph() {
  const [activeCluster, setActiveCluster] = useState<string | null>(null)
  const [statusIdx, setStatusIdx] = useState(0)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const cx = 600
  const cy = 375
  const clusterRadius = 240
  const attrRadius = 90

  // Status message rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((i) => (i + 1) % statusMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Auto-cycle on mount
  useEffect(() => {
    let cancelled = false
    let idx = 0
    const cycle = () => {
      if (cancelled || idx >= clusters.length) {
        setActiveCluster(null)
        return
      }
      setActiveCluster(clusters[idx].id)
      idx++
      setTimeout(cycle, 800)
    }
    const startTimeout = setTimeout(cycle, 800)
    return () => {
      cancelled = true
      clearTimeout(startTimeout)
    }
  }, [])

  const handleMouseEnter = (clusterId: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setActiveCluster(clusterId)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setActiveCluster(null), 300)
  }

  return (
    <section className="relative py-28 px-8 overflow-hidden bg-bg">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(10,10,10,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-content mx-auto relative z-10">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16 items-end">
          <div>
            <span className="section-label mb-6">Topical Authority Graph</span>
            <h2 className="h2-display italic-accent">
              What your site looks like to <em>search engines.</em>
            </h2>
          </div>
          <p className="text-base md:text-lg text-ink-2 leading-relaxed max-w-xl">
            Search engines and AI retrieval systems don&apos;t see pages. They see{" "}
            <strong className="text-accent font-semibold">entities</strong> connected by{" "}
            <strong className="text-accent font-semibold">predicates</strong>. The visualization below is the same topological model we use to architect every engagement. Hover any cluster to reveal its attribute layer.
          </p>
        </div>

        {/* Canvas */}
        <div className="relative w-full aspect-[16/10] max-h-[720px] bg-bg border border-line overflow-hidden">
          {/* Inner dot grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(10,10,10,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Live indicator */}
          <div className="absolute top-5 right-5 z-10 flex items-center gap-2 bg-bg border border-line-strong px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest font-semibold text-ink-2">
            <span className="relative w-1.5 h-1.5 rounded-full bg-accent">
              <span className="absolute inset-0 rounded-full bg-accent animate-ping" />
            </span>
            <span>Live · Building</span>
          </div>

          {/* Status strip */}
          <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3.5 bg-bg border border-line px-4 py-3 font-mono text-[11px] font-medium text-ink-2 max-w-[calc(100%-2.5rem)]">
            <span className="uppercase font-bold text-ink-muted">Building</span>
            <span className="text-ink font-semibold transition-opacity duration-300">
              {statusMessages[statusIdx]}
            </span>
            <span className="hidden sm:block w-px h-3 bg-line-strong" />
            <span className="hidden sm:block uppercase font-bold text-ink-muted">Entity</span>
            <span className="hidden sm:block text-ink font-semibold">Digital Vikingz</span>
          </div>

          {/* SVG */}
          <svg viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid meet" className="w-full h-full block relative z-[1]">
            <defs>
              <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#db4c23" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#db4c23" stopOpacity="0" />
              </radialGradient>
            </defs>

            <circle cx={cx} cy={cy} r="160" fill="url(#centerGlow)" />

            {/* Center lines to clusters */}
            {clusters.map((cluster, idx) => {
              const cpos = polar(cx, cy, clusterRadius, cluster.angle)
              return (
                <line
                  key={`center-line-${cluster.id}`}
                  x1={cx}
                  y1={cy}
                  x2={cpos.x}
                  y2={cpos.y}
                  stroke="rgba(10,10,10,0.18)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  style={{
                    animation: "dash-flow 8s linear infinite",
                    animationDelay: `${idx * 0.4}s`,
                  }}
                />
              )
            })}

            {/* Clusters and their attributes */}
            {clusters.map((cluster) => {
              const cpos = polar(cx, cy, clusterRadius, cluster.angle)
              const isActive = activeCluster === cluster.id
              const arcSpan = 100
              const arcStart = cluster.angle - arcSpan / 2

              return (
                <g key={cluster.id}>
                  {/* Attribute lines + dots + nodes */}
                  {cluster.attributes.map((attr, ai) => {
                    const attrAngle = arcStart + (arcSpan / (cluster.attributes.length - 1)) * ai
                    const apos = polar(cpos.x, cpos.y, attrRadius, attrAngle)
                    const words = attr.split(" ")
                    const useTwoLines = words.length > 1 && attr.length > 10
                    return (
                      <g key={`${cluster.id}-attr-${ai}`}>
                        <line
                          x1={cpos.x}
                          y1={cpos.y}
                          x2={apos.x}
                          y2={apos.y}
                          stroke={isActive ? "#db4c23" : "rgba(10,10,10,0.08)"}
                          strokeWidth={isActive ? 1.5 : 1}
                          style={{ transition: "stroke 0.3s, stroke-width 0.3s, opacity 0.3s" }}
                          opacity={isActive ? 1 : 0.7}
                        />
                        {isActive && (
                          <circle
                            cx={(cpos.x + apos.x) / 2}
                            cy={(cpos.y + apos.y) / 2}
                            r="2"
                            fill="#db4c23"
                            style={{
                              animation: "connection-pulse 1.5s ease-in-out infinite",
                            }}
                          />
                        )}
                        <g transform={`translate(${apos.x}, ${apos.y})`}>
                          <circle
                            r="26"
                            fill={isActive ? "rgba(219,76,35,0.08)" : "#ffffff"}
                            stroke={isActive ? "#db4c23" : "rgba(10,10,10,0.1)"}
                            strokeWidth="1"
                            style={{ transition: "all 0.3s" }}
                          />
                          <text
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill={isActive ? "#0a0a0a" : "#6b6b65"}
                            fontFamily="var(--font-mono)"
                            fontSize="9.5"
                            fontWeight={isActive ? 700 : 500}
                            letterSpacing="0.04em"
                            style={{ textTransform: "uppercase", pointerEvents: "none" }}
                          >
                            {useTwoLines ? (
                              <>
                                <tspan x="0" dy="-4">{words.slice(0, Math.ceil(words.length / 2)).join(" ")}</tspan>
                                <tspan x="0" dy="12">{words.slice(Math.ceil(words.length / 2)).join(" ")}</tspan>
                              </>
                            ) : (
                              attr
                            )}
                          </text>
                        </g>
                      </g>
                    )
                  })}

                  {/* Cluster node */}
                  <g
                    transform={`translate(${cpos.x}, ${cpos.y})`}
                    onMouseEnter={() => handleMouseEnter(cluster.id)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => handleMouseEnter(cluster.id)}
                    onBlur={() => handleMouseLeave()}
                    onClick={() => setActiveCluster(isActive ? null : cluster.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Topical cluster: ${cluster.label}`}
                    style={{ cursor: "pointer", outline: "none" }}
                  >
                    <circle
                      r="44"
                      fill={isActive ? "#db4c23" : "#ffffff"}
                      stroke={isActive ? "#db4c23" : "rgba(10,10,10,0.22)"}
                      strokeWidth={isActive ? 2 : 1.5}
                      style={{ transition: "all 0.3s" }}
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isActive ? "#ffffff" : "#0a0a0a"}
                      fontFamily="var(--font-body)"
                      fontSize="12"
                      fontWeight="600"
                      letterSpacing="0.01em"
                      style={{ pointerEvents: "none" }}
                    >
                      {cluster.label.split(" ").length > 1 ? (
                        <>
                          <tspan x="0" dy="-6">{cluster.label.split(" ")[0]}</tspan>
                          <tspan x="0" dy="14">{cluster.label.split(" ").slice(1).join(" ")}</tspan>
                        </>
                      ) : (
                        cluster.label
                      )}
                    </text>
                  </g>
                </g>
              )
            })}

            {/* Center node */}
            <g transform={`translate(${cx}, ${cy})`}>
              <circle r="64" fill="#0a0a0a" stroke="#db4c23" strokeWidth="2" />
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffffff"
                fontFamily="var(--font-display)"
                fontSize="15"
                fontWeight="600"
                letterSpacing="-0.01em"
                style={{ pointerEvents: "none" }}
              >
                <tspan x="0" dy="-6">Digital</tspan>
                <tspan x="0" dy="20">Vikingz</tspan>
              </text>
            </g>
          </svg>
        </div>

        {/* Caption strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-line border-t-0 bg-bg">
          <CaptionCell label="Central Entity" value="Digital <em>Vikingz</em>" />
          <CaptionCell label="Cluster Count" value="<em>6</em> topical clusters" />
          <CaptionCell label="Attribute Nodes" value="<em>24</em> sub-attributes" />
          <CaptionCell label="Methodology" value="Koray <em>aligned</em>" />
        </div>
      </div>

      <style>{`
        @keyframes dash-flow {
          to { stroke-dashoffset: -64; }
        }
        @keyframes connection-pulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}

function CaptionCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-6 py-4 border-r border-line last:border-r-0 flex flex-col gap-1">
      <span className="mono-pill text-ink-muted">{label}</span>
      <span
        className="font-display text-base font-medium text-ink italic-accent"
        style={{ letterSpacing: "-0.01em" }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  )
}
