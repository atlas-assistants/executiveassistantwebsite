"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ========================================
// CONCEPT 5: MINIMALIST LUXURY
// Aesthetic: Ultra-minimal, high fashion, dramatic
// Typography: DM Serif Display
// Colors: Black, white, gold accent only
// Motion: Slow, cinematic, purposeful
// ========================================

// Animation variants - slow and cinematic
const fadeInSlow = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const slideUpSlow = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] as const } },
};

// Reveal wrapper
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, delay, ease: [0.25, 0.1, 0.25, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Concept5() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-white font-luxury text-black">
      {/* Navigation - Ultra minimal */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-24">
            <a href="/" className="text-sm tracking-[0.3em] uppercase">
              Executive Assistants
            </a>
            <div className="hidden md:flex items-center gap-12">
              <a href="#about" className="text-sm tracking-wider hover:text-[#B8860B] transition-colors">About</a>
              <a href="#opportunity" className="text-sm tracking-wider hover:text-[#B8860B] transition-colors">Opportunity</a>
              <a
                href="#apply"
                className="text-sm tracking-wider border-b border-black hover:border-[#B8860B] hover:text-[#B8860B] transition-colors pb-1"
              >
                Apply
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Full screen, dramatic */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="text-center px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.p
              variants={fadeInSlow}
              className="text-[#B8860B] text-sm tracking-[0.4em] uppercase mb-8"
            >
              Now Accepting Applications
            </motion.p>
            <motion.h1
              variants={slideUpSlow}
              className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-normal leading-[0.95] tracking-tight mb-12"
            >
              Elevate
              <br />
              <em className="not-italic text-[#B8860B]">Your</em>
              <br />
              Career
            </motion.h1>
            <motion.div
              variants={lineReveal}
              className="w-24 h-px bg-black mx-auto mb-12 origin-left"
            />
            <motion.p
              variants={fadeInSlow}
              className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed mb-12"
            >
              Join an exclusive network of executive assistants supporting visionary leaders.
            </motion.p>
            <motion.a
              variants={fadeInSlow}
              href="#apply"
              className="inline-block text-sm tracking-[0.2em] uppercase border-b-2 border-black pb-2 hover:border-[#B8860B] hover:text-[#B8860B] transition-colors"
            >
              Begin Application
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border border-gray-300 rounded-full flex justify-center"
          >
            <motion.div className="w-1 h-2 bg-gray-400 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Bar - Minimal */}
      <section className="py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
            {[
              { value: "1%", label: "Acceptance" },
              { value: "200+", label: "Training Hours" },
              { value: "$3,000+", label: "Monthly" },
              { value: "100%", label: "Remote" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`text-center ${i < 3 ? "lg:border-r lg:border-gray-100" : ""}`}>
                  <p className="text-4xl lg:text-5xl font-normal">{stat.value}</p>
                  <p className="text-sm text-gray-500 tracking-wider uppercase mt-2">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Oversized typography */}
      <section id="about" className="py-32 lg:py-48">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="max-w-4xl">
            <Reveal>
              <p className="text-[#B8860B] text-sm tracking-[0.3em] uppercase mb-8">About</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] mb-12">
                We curate exceptional talent for exceptional leaders.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Executive Assistants isn't a staffing agency. We're a career accelerator for ambitious professionals who demand more from their work. Our EAs support founders at the world's most innovative companies.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quote Section - Full width black */}
      <section className="py-32 lg:py-48 bg-black text-white">
        <div className="max-w-5xl mx-auto px-8 lg:px-16 text-center">
          <Reveal>
            <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.3] tracking-tight">
              "The most valuable assistant isn't one who takes orders—
              <span className="text-[#B8860B]"> it's one who anticipates needs.</span>"
            </blockquote>
            <div className="mt-12">
              <div className="w-16 h-px bg-[#B8860B] mx-auto mb-6" />
              <p className="text-sm tracking-wider uppercase text-gray-400">Colin Pal, Founder</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Opportunity Section */}
      <section id="opportunity" className="py-32 lg:py-48">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <Reveal>
            <p className="text-[#B8860B] text-sm tracking-[0.3em] uppercase mb-8">The Opportunity</p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <Reveal delay={0.1}>
                <h2 className="text-4xl sm:text-5xl font-normal leading-[1.15]">
                  A path to
                  <br />
                  <em className="not-italic text-[#B8860B]">excellence.</em>
                </h2>
              </Reveal>
            </div>
            <div>
              <div className="space-y-12">
                {[
                  { title: "Certification", desc: "Complete our comprehensive program before your first placement." },
                  { title: "Mentorship", desc: "Weekly guidance from senior EAs who've walked your path." },
                  { title: "Advancement", desc: "Clear progression from Junior to Senior with defined milestones." },
                  { title: "Community", desc: "Access to a network of peers and leadership support." },
                ].map((item, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.1}>
                    <div className="border-b border-gray-200 pb-8">
                      <h3 className="text-xl font-normal mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compensation - Clean minimal */}
      <section className="py-32 lg:py-48 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <Reveal className="text-center mb-20">
            <p className="text-[#B8860B] text-sm tracking-[0.3em] uppercase mb-8">Compensation</p>
            <h2 className="text-4xl sm:text-5xl font-normal">Transparent. Always.</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { level: "Junior", range: "$1,500 – $2,000", note: "Entry-level" },
              { level: "Mid-Level", range: "$2,000 – $2,500", note: "Proven track record", featured: true },
              { level: "Senior", range: "$2,500 – $3,000+", note: "Executive expertise" },
            ].map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`p-10 text-center ${
                  tier.featured ? "bg-black text-white" : "bg-white border border-gray-200"
                }`}>
                  <p className={`text-sm tracking-wider uppercase mb-6 ${tier.featured ? "text-[#B8860B]" : "text-gray-500"}`}>
                    {tier.level}
                  </p>
                  <p className="text-2xl font-normal mb-2">{tier.range}</p>
                  <p className={`text-sm ${tier.featured ? "text-gray-400" : "text-gray-500"}`}>{tier.note}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-16">
            <p className="text-sm text-gray-500 tracking-wider">
              100% Remote • 40 hrs/week • 10 PTO Days • Performance Bonuses
            </p>
          </Reveal>
        </div>
      </section>

      {/* Requirements - Minimal list */}
      <section className="py-32 lg:py-48">
        <div className="max-w-4xl mx-auto px-8 lg:px-16">
          <Reveal className="text-center mb-20">
            <p className="text-[#B8860B] text-sm tracking-[0.3em] uppercase mb-8">Requirements</p>
            <h2 className="text-4xl sm:text-5xl font-normal">What we seek.</h2>
          </Reveal>

          <div className="space-y-0">
            {[
              "2+ years of EA or transferable experience",
              "Exceptional written and verbal English",
              "Full-time commitment (40 hours weekly)",
              "US timezone flexibility",
              "Ownership mentality and proactive nature",
            ].map((req, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex items-center gap-8 py-6 border-b border-gray-200">
                  <span className="text-sm text-[#B8860B] tracking-wider">0{i + 1}</span>
                  <span className="text-lg">{req}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dramatic */}
      <section id="apply" className="py-32 lg:py-48 bg-black text-white relative overflow-hidden">
        {/* Gold accent line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B8860B] to-transparent" />

        <div className="max-w-3xl mx-auto px-8 lg:px-16 text-center">
          <Reveal>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] mb-12">
              Ready to
              <br />
              <em className="not-italic text-[#B8860B]">ascend?</em>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-md mx-auto">
              Your next chapter begins with a single step.
            </p>
            <a
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-5 bg-[#B8860B] text-black text-sm tracking-[0.2em] uppercase hover:bg-[#D4A017] transition-colors"
            >
              Begin Application
            </a>
            <p className="text-sm text-gray-600 mt-8">
              Five minutes • Response within 48 hours
            </p>
          </Reveal>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm tracking-[0.3em] uppercase">Executive Assistants</p>
            <p className="text-sm text-gray-500">© 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
