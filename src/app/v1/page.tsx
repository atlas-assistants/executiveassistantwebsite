"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// ========================================
// V1: CINEMATIC
// Movie-title-sequence energy
// Dramatic text reveals, orchestrated timing
// High-end film production feel
// ========================================

// Character-by-character text reveal
function TextReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.03,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// Word-by-word reveal for subtitles
function WordReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Cinematic reveal for sections
function CinematicReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function V1Cinematic() {
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Cinematic letterbox bars */}
      <div className="fixed top-0 left-0 right-0 h-[8vh] bg-black z-50" />
      <div className="fixed bottom-0 left-0 right-0 h-[8vh] bg-black z-50" />

      {/* Hero - Full screen cinematic */}
      <section ref={heroRef} className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(ellipse at 20% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 80% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 50% 80%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
                "radial-gradient(ellipse at 20% 50%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-6 max-w-6xl"
        >
          <AnimatePresence>
            {showContent && (
              <>
                {/* Pre-title */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0 }}
                  className="mb-8"
                >
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="w-24 h-px bg-gradient-to-r from-transparent via-teal-400 to-transparent mx-auto mb-6 origin-center"
                  />
                  <span className="text-teal-400 text-sm tracking-[0.4em] uppercase">
                    <TextReveal text="NOW ACCEPTING APPLICATIONS" delay={0.8} />
                  </span>
                </motion.div>

                {/* Main title - Cinematic reveal */}
                <h1 className="mb-8">
                  <div className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[100px] font-bold leading-[0.9] tracking-tighter">
                    <TextReveal text="THE FUTURE" delay={1.5} />
                  </div>
                  <div className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[100px] font-bold leading-[0.9] tracking-tighter">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400">
                      <TextReveal text="OF WORK" delay={2.2} />
                    </span>
                  </div>
                </h1>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 3 }}
                  className="text-xl sm:text-2xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                  <WordReveal
                    text="Join the top 1% of executive assistants. Support visionary founders. Build your legacy."
                    delay={3.2}
                  />
                </motion.p>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 4.5 }}
                >
                  <a
                    href="#story"
                    className="group inline-flex items-center gap-4 text-white"
                  >
                    <span className="text-sm tracking-widest uppercase">Begin</span>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </motion.div>
                  </a>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Story Section - Cinematic scroll */}
      <section id="story" className="py-32 lg:py-48 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <CinematicReveal>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.4] text-neutral-300">
              We're not a staffing agency.
              <span className="text-white font-medium"> We're building something unprecedented</span>
              —a network of elite executive assistants who become
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-violet-400"> indispensable partners</span> to the world's most ambitious founders.
            </p>
          </CinematicReveal>
        </div>
      </section>

      {/* Stats - Cinematic reveal */}
      <section className="py-32 lg:py-48 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 md:gap-8">
            {[
              { value: "1%", label: "Acceptance Rate", delay: 0 },
              { value: "200+", label: "Training Hours", delay: 0.2 },
              { value: "$3K+", label: "Monthly Earnings", delay: 0.4 },
              { value: "100%", label: "Remote", delay: 0.6 },
            ].map((stat, i) => (
              <CinematicReveal key={i}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: stat.delay }}
                  className="text-center"
                >
                  <p className="text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
                    {stat.value}
                  </p>
                  <p className="text-neutral-500 text-sm tracking-widest uppercase mt-4">{stat.label}</p>
                </motion.div>
              </CinematicReveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Opportunity - Full screen sections */}
      <section className="relative">
        {/* Section 1 */}
        <div className="min-h-screen flex items-center py-32 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <CinematicReveal>
                <p className="text-teal-400 text-sm tracking-[0.3em] uppercase mb-6">01 — Training</p>
                <h2 className="text-5xl lg:text-6xl font-bold leading-[1.1] mb-8">
                  World-class
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                    preparation.
                  </span>
                </h2>
                <p className="text-xl text-neutral-400 leading-relaxed">
                  Complete our certification before your first placement. Weekly training. Ongoing mentorship. The tools and skills to become truly irreplaceable.
                </p>
              </CinematicReveal>
              <CinematicReveal>
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-teal-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center">
                  <div className="text-8xl font-bold text-white/10">EA</div>
                </div>
              </CinematicReveal>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="min-h-screen flex items-center py-32 border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <CinematicReveal className="order-2 lg:order-1">
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 border border-white/10 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl font-bold text-white/20">$3K+</p>
                    <p className="text-white/40 mt-2">per month</p>
                  </div>
                </div>
              </CinematicReveal>
              <CinematicReveal className="order-1 lg:order-2">
                <p className="text-violet-400 text-sm tracking-[0.3em] uppercase mb-6">02 — Compensation</p>
                <h2 className="text-5xl lg:text-6xl font-bold leading-[1.1] mb-8">
                  Transparent.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    Competitive.
                  </span>
                </h2>
                <p className="text-xl text-neutral-400 leading-relaxed mb-8">
                  No guessing games. Clear tiers from Junior to Senior EA. Performance bonuses. A path that rewards excellence.
                </p>
                <div className="space-y-3">
                  {[
                    { level: "Junior", range: "$1,500 - $2,000" },
                    { level: "Mid-Level", range: "$2,000 - $2,500" },
                    { level: "Senior", range: "$2,500 - $3,000+" },
                  ].map((tier, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-neutral-400">{tier.level}</span>
                      <span className="font-medium">{tier.range}</span>
                    </div>
                  ))}
                </div>
              </CinematicReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Quote - Cinematic full screen */}
      <section className="min-h-screen flex items-center justify-center relative border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <CinematicReveal>
            <div className="mb-8">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-16 h-px bg-teal-400 mx-auto origin-center"
              />
            </div>
            <blockquote className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.2] mb-12">
              "Most companies hire assistants.
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 font-medium">
                {" "}We build careers.
              </span>"
            </blockquote>
            <p className="text-neutral-500 tracking-widest uppercase text-sm">Colin Pal — Founder & CEO</p>
          </CinematicReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 lg:py-48 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <CinematicReveal>
            <p className="text-teal-400 text-sm tracking-[0.3em] uppercase mb-8">Your Chapter Begins</p>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8">
              Ready to become
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-400">
                irreplaceable?
              </span>
            </h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto">
              Five-minute application. Response within 48 hours. The beginning of something extraordinary.
            </p>
            <motion.a
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-black font-bold rounded-full text-lg"
            >
              Start Your Application
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </CinematicReveal>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <p className="text-neutral-600 text-sm">© 2024 Executive Assistants</p>
          <a href="/" className="text-neutral-600 text-sm hover:text-white transition-colors">
            ← All Concepts
          </a>
        </div>
      </footer>
    </div>
  );
}
