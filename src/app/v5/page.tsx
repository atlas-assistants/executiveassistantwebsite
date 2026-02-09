"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ========================================
// V5: PREMIUM DARK
// Rich textures, depth, luxury feel
// Subtle gradients, glass, gold accents
// ========================================

// Reveal with blur
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Glow card
function GlowCard({ children, className = "", glowColor = "teal" }: { children: React.ReactNode; className?: string; glowColor?: string }) {
  const colors = {
    teal: "from-teal-400/20 via-transparent to-transparent",
    gold: "from-amber-400/20 via-transparent to-transparent",
    violet: "from-violet-400/20 via-transparent to-transparent",
  };

  return (
    <div className={`relative group ${className}`}>
      <div className={`absolute -inset-px bg-gradient-to-b ${colors[glowColor as keyof typeof colors]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`} />
      <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
}

// Shimmer text
function ShimmerText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 bg-gradient-to-r from-white via-amber-200 to-white bg-clip-text text-transparent bg-[length:200%_100%] animate-shimmer">
        {children}
      </span>
    </span>
  );
}

export default function V5PremiumDark() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[200px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between border-b border-white/[0.06]">
            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-sm font-medium tracking-widest uppercase"
            >
              Executive Assistants
            </motion.a>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:flex items-center gap-10"
            >
              <a href="#about" className="text-sm text-neutral-400 hover:text-white transition-colors">About</a>
              <a href="#program" className="text-sm text-neutral-400 hover:text-white transition-colors">Program</a>
              <a href="#apply" className="text-sm px-4 py-2 bg-gradient-to-r from-amber-400/10 to-amber-400/5 border border-amber-400/20 rounded-full text-amber-300 hover:bg-amber-400/20 transition-colors">
                Apply Now
              </a>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center relative pt-20">
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="mx-auto max-w-7xl px-6 lg:px-12 py-32 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400/10 to-transparent border border-amber-400/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-medium tracking-wider uppercase text-amber-300">Now Accepting Elite Applicants</span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-[1.05] mb-8"
            >
              <span className="text-neutral-400">Where</span>
              <br />
              <ShimmerText>Excellence</ShimmerText>
              <br />
              <span className="text-neutral-400">Meets Opportunity</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl text-neutral-400 max-w-xl leading-relaxed mb-12"
            >
              Join the top 1% of executive assistants. Work with visionary founders. Build an exceptional career.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-full font-medium hover:shadow-[0_0_50px_rgba(251,191,36,0.25)] transition-all duration-500"
              >
                Begin Application
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="#about" className="text-neutral-400 hover:text-white transition-colors px-4 py-2">
                Learn more →
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Decorative lines */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* Stats */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "1%", label: "Acceptance Rate", accent: true },
              { value: "$3,000+", label: "Monthly Potential" },
              { value: "200+", label: "Training Hours" },
              { value: "100%", label: "Remote Work" },
            ].map((stat, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="text-center py-8">
                  <p className={`text-4xl lg:text-5xl font-semibold tracking-tight ${stat.accent ? "text-amber-400" : ""}`}>
                    {stat.value}
                  </p>
                  <p className="text-sm text-neutral-500 mt-3 tracking-wider uppercase">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <Reveal>
                <p className="text-sm font-medium text-amber-400 tracking-wider uppercase mb-6">About</p>
                <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight leading-tight mb-8">
                  Not a staffing agency.
                  <span className="text-neutral-500"> A career institution.</span>
                </h2>
                <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                  Executive Assistants is where exceptional talent meets transformative opportunity. We don't just place EAs—we cultivate them through rigorous training, ongoing mentorship, and clear advancement pathways.
                </p>
                <p className="text-neutral-500 leading-relaxed">
                  Our network supports founders at the world's most innovative companies. When you join, you're not getting a job—you're launching a career.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎯", title: "Elite Training", desc: "200+ hours certification" },
                  { icon: "📈", title: "Career Growth", desc: "Clear advancement path" },
                  { icon: "🤝", title: "Mentorship", desc: "Weekly 1-on-1 guidance" },
                  { icon: "🌐", title: "Global Network", desc: "Premium community" },
                ].map((item, i) => (
                  <GlowCard key={i} glowColor={i % 2 === 0 ? "teal" : "gold"}>
                    <div className="p-6">
                      <span className="text-2xl">{item.icon}</span>
                      <h3 className="font-medium mt-4 mb-1">{item.title}</h3>
                      <p className="text-sm text-neutral-500">{item.desc}</p>
                    </div>
                  </GlowCard>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-12 text-center">
          <Reveal>
            <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight">
              "Most companies hire assistants.
              <span className="text-amber-400"> We build dynasties.</span>"
            </blockquote>
            <div className="mt-12 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
              <div className="text-left">
                <p className="font-medium">Colin Pal</p>
                <p className="text-sm text-neutral-500">Founder</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Program */}
      <section id="program" className="py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="text-center mb-20">
            <p className="text-sm font-medium text-amber-400 tracking-wider uppercase mb-6">The Program</p>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight">
              Designed for excellence
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "World-Class Training", desc: "200+ hours of comprehensive certification covering executive support, advanced communication, and leadership skills.", icon: "📚" },
              { title: "Personal Mentorship", desc: "Weekly 1-on-1 sessions with senior EAs who guide your development and accelerate your growth.", icon: "🧭" },
              { title: "Clear Progression", desc: "Defined career path from Junior to Senior EA with transparent milestones and compensation increases.", icon: "📈" },
              { title: "Global Flexibility", desc: "Work remotely from anywhere with async-first practices designed for peak productivity.", icon: "🌍" },
              { title: "Founder Matching", desc: "Carefully paired with founders whose vision and work style align with your unique capabilities.", icon: "✨" },
              { title: "Elite Community", desc: "Access to an exclusive network of top-tier EAs for collaboration, support, and lifelong connections.", icon: "💎" },
            ].map((benefit, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <GlowCard className="h-full" glowColor={i % 3 === 0 ? "gold" : i % 3 === 1 ? "teal" : "violet"}>
                  <div className="p-8">
                    <span className="text-3xl">{benefit.icon}</span>
                    <h3 className="text-lg font-medium mt-6 mb-3">{benefit.title}</h3>
                    <p className="text-neutral-400 leading-relaxed">{benefit.desc}</p>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation */}
      <section className="py-32 bg-gradient-to-b from-neutral-950 to-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <Reveal className="text-center mb-20">
            <p className="text-sm font-medium text-amber-400 tracking-wider uppercase mb-6">Compensation</p>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4">
              Premium pay for premium talent
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Transparent compensation that rewards your expertise and grows with your impact.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { level: "Junior EA", range: "$1,500 – $2,000", note: "Entry level" },
              { level: "Mid-Level EA", range: "$2,000 – $2,500", note: "Proven track record", featured: true },
              { level: "Senior EA", range: "$2,500 – $3,000+", note: "Executive expertise" },
            ].map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`relative p-8 rounded-2xl text-center ${
                  tier.featured
                    ? "bg-gradient-to-b from-amber-400/10 to-transparent border-2 border-amber-400/30"
                    : "bg-white/[0.02] border border-white/[0.08]"
                }`}>
                  {tier.featured && (
                    <>
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-black text-xs font-medium rounded-full">
                        Most Common
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 to-transparent rounded-2xl" />
                    </>
                  )}
                  <div className="relative">
                    <p className="text-sm text-neutral-400 mb-3">{tier.level}</p>
                    <p className="text-3xl font-semibold tracking-tight mb-2">{tier.range}</p>
                    <p className="text-sm text-neutral-500">{tier.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center mt-12">
            <p className="text-sm text-neutral-500">
              100% Remote · Full-time (40 hrs/week) · 10 PTO Days · Performance Bonuses
            </p>
          </Reveal>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <Reveal className="text-center mb-16">
            <p className="text-sm font-medium text-amber-400 tracking-wider uppercase mb-6">Requirements</p>
            <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight">
              What we seek
            </h2>
          </Reveal>

          <div className="space-y-4">
            {[
              "2+ years of EA experience or transferable background",
              "Exceptional written and verbal English communication",
              "Available for full-time commitment (40 hours/week)",
              "Flexibility for US timezone collaboration",
              "Proactive, ownership-driven mindset",
            ].map((req, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="flex items-center gap-5 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-amber-400/20 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-400/20 transition-colors">
                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-neutral-300">{req}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="py-32 lg:py-48 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-400/5 rounded-full blur-[200px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <Reveal>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mb-8">
              Your legacy<br />
              <span className="text-amber-400">starts here.</span>
            </h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto">
              Take the first step toward an exceptional career. Apply in 5 minutes, hear back within 48 hours.
            </p>
            <motion.a
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-amber-500 text-black rounded-full font-semibold text-lg hover:shadow-[0_0_60px_rgba(251,191,36,0.3)] transition-all duration-500"
            >
              Begin Your Application
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500 tracking-wider uppercase">Executive Assistants</p>
            <p className="text-sm text-neutral-600">© 2024</p>
          </div>
        </div>
      </footer>

      {/* CSS for shimmer animation */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-shimmer {
          animation: shimmer 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
