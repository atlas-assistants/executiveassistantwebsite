"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ========================================
// CONCEPT SELECTOR - Index Page
// ========================================

const premiumVariations = [
  {
    id: 1,
    name: "Cinematic",
    subtitle: "Movie Title Energy",
    description: "Letterbox framing, character-by-character reveals, dramatic timing sequences. Feels like a film opening.",
    href: "/v1",
    colors: ["#050505", "#14b8a6", "#8b5cf6"],
    highlight: "teal",
  },
  {
    id: 2,
    name: "Stripe-Level Polish",
    subtitle: "Obsessive Detail",
    description: "Magnetic buttons, 3D card tilts, ultra-refined micro-interactions. Every pixel is perfect.",
    href: "/v2",
    colors: ["#0a0a0a", "#14b8a6", "#8b5cf6"],
    highlight: "teal",
  },
  {
    id: 3,
    name: "Bold Statement",
    subtitle: "Massive Type",
    description: "Typography-driven design with enormous headlines. Unapologetic scale, dramatic presence.",
    href: "/v3",
    colors: ["#050505", "#14b8a6", "#ffffff"],
    highlight: "teal",
  },
  {
    id: 4,
    name: "Living Page",
    subtitle: "Scroll-Driven",
    description: "Everything responds to scroll. Parallax, morphing blobs, progress counters, sticky text journeys.",
    href: "/v4",
    colors: ["#030303", "#14b8a6", "#8b5cf6"],
    highlight: "teal",
  },
  {
    id: 3,
    name: "Bold Statement",
    subtitle: "Massive Type",
    description: "Typography-driven design with enormous headlines. Unapologetic scale, dramatic presence.",
    href: "/v3",
    colors: ["#050505", "#14b8a6", "#ffffff"],
    highlight: "teal",
  },
  {
    id: 5,
    name: "Premium Dark",
    subtitle: "Luxury Textures",
    description: "Rich textures, gold accents, glass effects, ambient glows. Feels like a high-end fashion brand.",
    href: "/v5",
    colors: ["#0a0a0a", "#fbbf24", "#14b8a6"],
    highlight: "gold",
  },
];

const originalConcepts = [
  {
    id: 1,
    name: "Dark Gradient",
    subtitle: "Tech Modern",
    description: "Dark theme with gradient backgrounds, teal/violet accents, heavy motion, and glassmorphism effects.",
    href: "/concept-1",
    colors: ["#0a0a0a", "#14b8a6", "#8b5cf6"],
  },
  {
    id: 2,
    name: "Light Editorial",
    subtitle: "Magazine Inspired",
    description: "Clean white space, serif-dominant typography, warm neutrals with terracotta accent, editorial layouts.",
    href: "/concept-2",
    colors: ["#FAF9F6", "#9E4B3E", "#57534e"],
  },
  {
    id: 3,
    name: "Bold Geometric",
    subtitle: "Swiss Design",
    description: "Strong geometric shapes, grid-based layouts, deep navy with bright yellow accent, snappy animations.",
    href: "/concept-3",
    colors: ["#0A1628", "#FFD93D", "#ffffff"],
  },
  {
    id: 4,
    name: "Soft Organic",
    subtitle: "Nature Inspired",
    description: "Soft rounded shapes, warm pastels, sage green palette, gentle flowing animations.",
    href: "/concept-4",
    colors: ["#FDF8F3", "#2D5A4A", "#B87A5A"],
  },
  {
    id: 5,
    name: "Minimalist Luxury",
    subtitle: "High Fashion",
    description: "Ultra-minimal black and white with gold accent, dramatic whitespace, slow cinematic motion.",
    href: "/concept-5",
    colors: ["#ffffff", "#000000", "#B8860B"],
  },
];

export default function ConceptSelector() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="py-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm text-neutral-500 tracking-wider uppercase mb-2">Design Showcase</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              ExecutiveAssistants.com
            </h1>
            <p className="text-xl text-neutral-400 mt-4 max-w-2xl">
              Premium design explorations for the EA recruitment landing page.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Premium Variations - Featured Section */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-teal-500/20 to-violet-500/20 border border-teal-500/30 text-teal-300">
                NEW
              </span>
              <h2 className="text-2xl font-bold">Premium Variations</h2>
            </div>
            <p className="text-neutral-400">
              5 elevated iterations of the Dark Gradient concept, pushing toward unicorn-brand quality.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {premiumVariations.map((variation, i) => (
              <motion.div
                key={variation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link href={variation.href} className="group block">
                  <div className={`relative p-6 lg:p-8 rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-900/50 border transition-all duration-300 ${
                    variation.highlight === "violet"
                      ? "border-violet-500/30 hover:border-violet-500/50 ring-1 ring-violet-500/20"
                      : variation.highlight === "gold"
                      ? "border-amber-500/20 hover:border-amber-500/40"
                      : "border-teal-500/20 hover:border-teal-500/40"
                  }`}>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                      {/* Number */}
                      <div className="flex-shrink-0">
                        <span className={`text-5xl lg:text-6xl font-bold transition-colors ${
                          variation.highlight === "violet"
                            ? "text-violet-500/40 group-hover:text-violet-500/60"
                            : variation.highlight === "gold"
                            ? "text-amber-500/30 group-hover:text-amber-500/50"
                            : "text-teal-500/30 group-hover:text-teal-500/50"
                        }`}>
                          V{variation.id}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                            {variation.name}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            variation.highlight === "violet"
                              ? "bg-violet-500/10 text-violet-400"
                              : variation.highlight === "gold"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-teal-500/10 text-teal-400"
                          }`}>
                            {variation.subtitle}
                          </span>
                        </div>
                        <p className="text-neutral-400 text-sm max-w-xl">
                          {variation.description}
                        </p>
                      </div>

                      {/* Color Swatches */}
                      <div className="flex items-center gap-2">
                        {variation.colors.map((color, ci) => (
                          <div
                            key={ci}
                            className="w-8 h-8 rounded-full border border-neutral-700"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 hidden lg:block">
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          variation.highlight === "violet"
                            ? "border-violet-500/30 group-hover:border-violet-400 group-hover:bg-violet-400"
                            : variation.highlight === "gold"
                            ? "border-amber-500/30 group-hover:border-amber-400 group-hover:bg-amber-400"
                            : "border-teal-500/30 group-hover:border-teal-400 group-hover:bg-teal-400"
                        }`}>
                          <svg
                            className={`w-4 h-4 transition-colors ${
                              variation.highlight === "violet"
                                ? "text-violet-500/50 group-hover:text-black"
                                : variation.highlight === "gold"
                                ? "text-amber-500/50 group-hover:text-black"
                                : "text-teal-500/50 group-hover:text-black"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Original Concepts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold mb-2">Original Concepts</h2>
            <p className="text-neutral-400">
              5 fundamentally different aesthetic directions explored earlier.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {originalConcepts.map((concept, i) => (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              >
                <Link href={concept.href} className="group block">
                  <div className="relative p-6 lg:p-8 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                      {/* Number */}
                      <div className="flex-shrink-0">
                        <span className="text-4xl lg:text-5xl font-bold text-neutral-800 group-hover:text-neutral-700 transition-colors">
                          0{concept.id}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-white/90 transition-colors">
                            {concept.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400">
                            {concept.subtitle}
                          </span>
                        </div>
                        <p className="text-neutral-500 text-sm max-w-xl">
                          {concept.description}
                        </p>
                      </div>

                      {/* Color Swatches */}
                      <div className="flex items-center gap-2">
                        {concept.colors.map((color, ci) => (
                          <div
                            key={ci}
                            className="w-7 h-7 rounded-full border border-neutral-700"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0 hidden lg:block">
                        <div className="w-9 h-9 rounded-full border border-neutral-700 flex items-center justify-center group-hover:border-white group-hover:bg-white transition-all duration-300">
                          <svg
                            className="w-4 h-4 text-neutral-600 group-hover:text-neutral-900 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-neutral-500 text-sm">
              Click any design to view the full page
            </p>
            <p className="text-neutral-600 text-sm">
              Built with Next.js + Tailwind CSS + Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
