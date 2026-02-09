"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ========================================
// CONCEPT 3: BOLD GEOMETRIC
// Aesthetic: Swiss design, Bauhaus-inspired, grid-based
// Typography: Space Grotesk
// Colors: Deep navy, bright yellow, white
// Motion: Snappy, precise, mechanical
// ========================================

// Animation variants - snappy and precise
const snapIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

// Reveal wrapper
function Reveal({ children, className = "", variant = snapIn }: { children: React.ReactNode; className?: string; variant?: typeof snapIn }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Concept3() {
  return (
    <div className="min-h-screen bg-white font-geometric">
      {/* Navigation - Bold stripe */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-xl font-bold tracking-tight">
              EA<span className="text-[#FFD93D]">.</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-sm font-medium hover:text-[#FFD93D] transition-colors">About</a>
              <a href="#benefits" className="text-sm font-medium hover:text-[#FFD93D] transition-colors">Benefits</a>
              <a href="#requirements" className="text-sm font-medium hover:text-[#FFD93D] transition-colors">Requirements</a>
              <a
                href="#apply"
                className="px-5 py-2 bg-[#FFD93D] text-[#0A1628] text-sm font-bold hover:bg-[#FFE566] transition-colors"
              >
                APPLY NOW
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Bold geometric split */}
      <section className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        {/* Geometric background shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0A1628]" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#FFD93D] rotate-45" />
        <div className="absolute top-40 right-1/3 w-20 h-20 border-4 border-[#FFD93D]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.div variants={snapIn} className="flex items-center gap-3 mb-6">
                <div className="w-8 h-1 bg-[#FFD93D]" />
                <span className="text-sm font-bold tracking-widest text-[#0A1628] uppercase">
                  Now Hiring
                </span>
              </motion.div>
              <motion.h1
                variants={snapIn}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#0A1628] leading-[1.05] tracking-tight mb-8"
              >
                EXECUTIVE
                <br />
                <span className="text-[#FFD93D] bg-[#0A1628] px-4">ASSISTANTS</span>
                <br />
                WANTED.
              </motion.h1>
              <motion.p variants={snapIn} className="text-xl text-gray-600 max-w-md mb-10">
                Join the top 1% of EAs supporting world-class founders. Remote, flexible, and built for growth.
              </motion.p>
              <motion.div variants={snapIn} className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#0A1628] text-white font-bold text-sm tracking-wide hover:bg-[#162844] transition-colors"
                >
                  START APPLICATION →
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#0A1628] text-[#0A1628] font-bold text-sm tracking-wide hover:bg-[#0A1628] hover:text-white transition-colors"
                >
                  LEARN MORE
                </a>
              </motion.div>
            </motion.div>

            {/* Right - Stats grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } }}
              className="relative z-10"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "1%", label: "ACCEPTANCE RATE", bg: "bg-[#FFD93D]", text: "text-[#0A1628]" },
                  { value: "200+", label: "TRAINING HOURS", bg: "bg-white", text: "text-[#0A1628]" },
                  { value: "$3K+", label: "MONTHLY PAY", bg: "bg-white", text: "text-[#0A1628]" },
                  { value: "100%", label: "REMOTE WORK", bg: "bg-[#FFD93D]", text: "text-[#0A1628]" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    className={`${stat.bg} ${stat.text} p-8 aspect-square flex flex-col justify-end`}
                  >
                    <p className="text-5xl font-bold">{stat.value}</p>
                    <p className="text-xs font-bold tracking-widest mt-2">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section - Grid Layout */}
      <section id="about" className="py-24 lg:py-32 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-1 bg-[#FFD93D]" />
                  <span className="text-sm font-bold tracking-widest text-[#0A1628] uppercase">01</span>
                </div>
                <h2 className="text-4xl font-bold text-[#0A1628] leading-tight">
                  NOT JUST
                  <br />
                  A JOB.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-2">
              <Reveal>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">
                  Executive Assistants is building the world's most elite network of remote EAs. We don't just place talent—we transform careers through rigorous training, ongoing mentorship, and a clear path to advancement.
                </p>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Our EAs support founders at Y Combinator companies, Series B startups, and established enterprises. If you want to work with people building the future, you've found the right place.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Bold Cards */}
      <section id="benefits" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#FFD93D]" />
              <span className="text-sm font-bold tracking-widest text-[#0A1628] uppercase">02</span>
            </div>
            <h2 className="text-4xl font-bold text-[#0A1628] leading-tight mb-16">
              WHAT YOU GET.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                num: "A",
                title: "WORLD-CLASS TRAINING",
                desc: "200+ hours of certification and ongoing development. Live sessions, playbooks, and peer learning.",
                accent: true,
              },
              {
                num: "B",
                title: "COMPETITIVE PAY",
                desc: "Earn $1,500-$3,000+/month based on experience. Clear advancement tiers and performance bonuses.",
                accent: false,
              },
              {
                num: "C",
                title: "FLEXIBILITY",
                desc: "100% remote work from anywhere. 40 hours/week with schedule autonomy.",
                accent: false,
              },
              {
                num: "D",
                title: "CAREER GROWTH",
                desc: "From Junior to Senior EA. Direct mentorship and access to leadership team.",
                accent: true,
              },
            ].map((item, i) => (
              <Reveal key={i} variant={i % 2 === 0 ? slideInLeft : slideInRight}>
                <div className={`p-10 ${item.accent ? "bg-[#0A1628] text-white" : "bg-[#F5F5F5]"}`}>
                  <span className={`text-6xl font-bold ${item.accent ? "text-[#FFD93D]" : "text-gray-200"}`}>
                    {item.num}
                  </span>
                  <h3 className="text-xl font-bold mt-6 mb-4">{item.title}</h3>
                  <p className={`${item.accent ? "text-gray-300" : "text-gray-600"}`}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation Bar */}
      <section className="py-16 bg-[#FFD93D]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <Reveal>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A1628]">
                TRANSPARENT COMPENSATION.
              </h2>
            </Reveal>
            <Reveal>
              <div className="flex items-center gap-12">
                {[
                  { level: "Junior", range: "$1.5-2K" },
                  { level: "Mid", range: "$2-2.5K" },
                  { level: "Senior", range: "$2.5-3K+" },
                ].map((tier, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold text-[#0A1628]">{tier.range}</p>
                    <p className="text-sm font-bold text-[#0A1628]/60 tracking-wide">{tier.level}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="py-24 lg:py-32 bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-1 bg-[#FFD93D]" />
                  <span className="text-sm font-bold tracking-widest uppercase">03</span>
                </div>
                <h2 className="text-4xl font-bold leading-tight">
                  WHAT WE
                  <br />
                  <span className="text-[#FFD93D]">LOOK FOR.</span>
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <div className="space-y-6">
                  {[
                    "2+ years EA or transferable experience",
                    "Fluent English (written and spoken)",
                    "Full-time availability (40 hrs/week)",
                    "US timezone flexibility",
                    "Growth mindset and ownership mentality",
                  ].map((req, i) => (
                    <div key={i} className="flex items-center gap-4 pb-6 border-b border-white/20 last:border-0">
                      <div className="w-8 h-8 bg-[#FFD93D] flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#0A1628]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg">{req}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#FFD93D]" />
              <span className="text-sm font-bold tracking-widest text-[#0A1628] uppercase">04</span>
            </div>
            <h2 className="text-4xl font-bold text-[#0A1628] leading-tight mb-16">
              OUR VALUES.
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-1">
            {[
              { title: "OWNERSHIP", desc: "You handle it. No excuses." },
              { title: "PROACTIVE", desc: "Solve before asked." },
              { title: "GROWTH", desc: "Always learning." },
              { title: "CLARITY", desc: "Clear communication." },
            ].map((value, i) => (
              <Reveal key={i}>
                <div className="bg-[#F5F5F5] p-8 aspect-square flex flex-col justify-between hover:bg-[#FFD93D] transition-colors group">
                  <span className="text-5xl font-bold text-gray-200 group-hover:text-[#0A1628]/20">0{i + 1}</span>
                  <div>
                    <h3 className="font-bold text-[#0A1628] mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-600 group-hover:text-[#0A1628]">{value.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-24 lg:py-32 bg-[#0A1628] text-white relative overflow-hidden">
        {/* Geometric accents */}
        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-[#FFD93D]" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#FFD93D]" />

        <div className="relative max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              READY TO
              <br />
              <span className="text-[#FFD93D]">JOIN US?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-xl mx-auto">
              Five-minute application. Response within 48 hours. Your next chapter starts now.
            </p>
            <a
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-12 py-5 bg-[#FFD93D] text-[#0A1628] text-lg font-bold hover:bg-[#FFE566] transition-colors"
            >
              APPLY NOW →
            </a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0A1628] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xl font-bold">EA<span className="text-[#FFD93D]">.</span></p>
            <p className="text-sm text-gray-400">© 2024 Executive Assistants. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
