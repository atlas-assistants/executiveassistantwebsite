"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ========================================
// V3: BOLD STATEMENT
// Massive typography, unapologetic scale
// Type-driven design with dramatic impact
// ========================================

// Reveal component for staggered animations
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Split text reveal
function SplitReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{ duration: 0.6, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Line reveal
function LineReveal({ delay = 0 }: { delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-px bg-white/20 origin-left"
    />
  );
}

export default function V3BoldStatement() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <a href="/" className="text-sm font-medium uppercase tracking-[0.2em]">
              Executive Assistants
            </a>
            <a
              href="#apply"
              className="text-sm font-medium uppercase tracking-[0.2em] border-b border-white pb-1 hover:pb-2 transition-all"
            >
              Apply Now
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex flex-col justify-center relative pt-20">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="mx-auto max-w-[1800px] px-6 lg:px-12 w-full">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-teal-400"
              />
              <span className="text-sm uppercase tracking-[0.3em] text-neutral-400">Now Accepting Applications</span>
            </div>
          </motion.div>

          {/* Main headline - MASSIVE */}
          <h1 className="text-[clamp(3.5rem,15vw,14rem)] font-bold leading-[0.85] tracking-[-0.03em] mb-12">
            <SplitReveal text="BUILD" delay={0.5} />
            <br />
            <SplitReveal text="YOUR" className="text-neutral-600" delay={0.6} />
            <br />
            <span className="relative">
              <SplitReveal text="LEGACY" className="text-teal-400" delay={0.7} />
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-2 left-0 h-2 bg-teal-400/30"
              />
            </span>
          </h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-xl lg:text-2xl text-neutral-400 max-w-2xl leading-relaxed"
          >
            Join the elite 1% of executive assistants supporting the world's most ambitious founders.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-neutral-500">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats - Full width dramatic */}
      <section className="py-32 border-y border-white/10">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {[
              { value: "1%", label: "Acceptance" },
              { value: "$3K+", label: "Monthly" },
              { value: "200+", label: "Hours Training" },
              { value: "100%", label: "Remote" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`py-8 lg:py-12 text-center ${i < 3 ? "border-r border-white/10" : ""}`}>
                  <p className="text-6xl lg:text-8xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 mt-4">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About - Type-forward */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-sm uppercase tracking-[0.3em] text-teal-400 mb-8">About</p>
                <h2 className="text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tight">
                  NOT A<br />
                  STAFFING<br />
                  <span className="text-neutral-600">AGENCY.</span>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:pt-20">
              <Reveal delay={0.2}>
                <p className="text-2xl lg:text-3xl font-medium leading-relaxed text-neutral-300 mb-8">
                  We're a career accelerator for exceptional people who refuse to settle for ordinary.
                </p>
                <p className="text-lg text-neutral-500 leading-relaxed">
                  Our EAs support founders at the world's most innovative companies. With 200+ hours of certification training, weekly mentorship, and clear advancement paths, we don't just place talent—we develop it.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Quote - Full bleed */}
      <section className="py-32 lg:py-48 bg-teal-400 text-black">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <Reveal>
            <blockquote className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight max-w-5xl">
              "MOST COMPANIES HIRE ASSISTANTS.
              <span className="text-black/40"> WE BUILD CAREERS."</span>
            </blockquote>
            <div className="mt-12 flex items-center gap-4">
              <div className="w-16 h-px bg-black/30" />
              <p className="text-sm uppercase tracking-[0.2em]">Colin Pal, Founder</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits - Numbered list */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-teal-400 mb-8">What You Get</p>
            <h2 className="text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tight mb-20">
              THE<br />
              PROGRAM
            </h2>
          </Reveal>

          <div className="space-y-0">
            {[
              { title: "ELITE TRAINING", desc: "200+ hours of comprehensive certification covering executive support, communication, and leadership." },
              { title: "WEEKLY MENTORSHIP", desc: "Regular 1-on-1 guidance from senior EAs who have walked your path and can accelerate your growth." },
              { title: "CLEAR ADVANCEMENT", desc: "Defined progression from Junior to Senior with transparent milestones and compensation increases." },
              { title: "GLOBAL COMMUNITY", desc: "Access to a network of top-tier EAs for peer support, learning, and collaboration." },
              { title: "FOUNDER MATCHING", desc: "Get paired with founders whose mission and work style align with your unique strengths." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group">
                  <LineReveal delay={i * 0.1} />
                  <div className="py-8 lg:py-12 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12">
                    <span className="text-6xl lg:text-8xl font-bold text-neutral-800 group-hover:text-neutral-700 transition-colors">
                      0{i + 1}
                    </span>
                    <div className="flex-grow">
                      <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mb-2 group-hover:text-teal-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-500 max-w-xl">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <LineReveal delay={0.5} />
          </div>
        </div>
      </section>

      {/* Compensation - Cards */}
      <section className="py-32 lg:py-48 bg-neutral-950">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <Reveal className="text-center mb-20">
            <p className="text-sm uppercase tracking-[0.3em] text-teal-400 mb-8">Compensation</p>
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">
              TRANSPARENT<br />
              <span className="text-neutral-600">PAY</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { level: "JUNIOR", range: "$1,500 – $2,000", note: "Entry level" },
              { level: "MID-LEVEL", range: "$2,000 – $2,500", note: "Proven track record", featured: true },
              { level: "SENIOR", range: "$2,500 – $3,000+", note: "Executive expertise" },
            ].map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`p-10 text-center relative ${
                  tier.featured
                    ? "bg-teal-400 text-black"
                    : "bg-white/[0.03] border border-white/10"
                }`}>
                  {tier.featured && (
                    <div className="absolute -top-px left-0 right-0 h-1 bg-black/20" />
                  )}
                  <p className={`text-xs uppercase tracking-[0.3em] mb-6 ${tier.featured ? "text-black/60" : "text-neutral-500"}`}>
                    {tier.level}
                  </p>
                  <p className="text-3xl font-bold tracking-tight mb-2">{tier.range}</p>
                  <p className={`text-sm ${tier.featured ? "text-black/60" : "text-neutral-500"}`}>{tier.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <p className="text-sm text-neutral-500 uppercase tracking-[0.2em]">
              100% Remote · 40 hrs/week · 10 PTO Days · Performance Bonuses
            </p>
          </Reveal>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <Reveal className="text-center mb-20">
            <p className="text-sm uppercase tracking-[0.3em] text-teal-400 mb-8">Requirements</p>
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">
              WHAT WE<br />
              <span className="text-neutral-600">SEEK</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-3xl mx-auto">
            {[
              "2+ years of EA experience or transferable background",
              "Exceptional written and verbal English",
              "Full-time commitment (40 hours/week)",
              "US timezone flexibility",
              "Proactive ownership mentality",
              "Hunger for growth and excellence",
            ].map((req, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="flex items-start gap-4 py-4">
                  <span className="text-2xl font-bold text-neutral-700">→</span>
                  <span className="text-lg">{req}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Massive */}
      <section id="apply" className="py-32 lg:py-48 relative">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12 text-center">
          <Reveal>
            <h2 className="text-[clamp(3rem,12vw,12rem)] font-bold leading-[0.85] tracking-[-0.03em] mb-12">
              READY<br />
              <span className="text-teal-400">?</span>
            </h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto">
              5 minutes to apply. 48 hours for a response. Your next chapter starts now.
            </p>
            <motion.a
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-12 py-6 bg-white text-black text-lg font-bold uppercase tracking-[0.2em] hover:bg-teal-400 transition-colors"
            >
              Apply Now
            </motion.a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="mx-auto max-w-[1800px] px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Executive Assistants</p>
            <p className="text-xs text-neutral-600">© 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
