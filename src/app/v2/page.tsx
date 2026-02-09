// @ts-nocheck
"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

// ========================================
// V2: STRIPE-LEVEL POLISH
// Ultra-refined micro-interactions
// Every pixel perfect, obsessive detail
// Inspired by Stripe/Linear/Vercel
// ========================================

// Magnetic button effect
function MagneticButton({ children, className = "", href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.div;

  return (
    <Component
      ref={ref}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </Component>
  );
}

// Animated counter
function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}{suffix}
        </motion.span>
      ) : (
        <span className="opacity-0">{value}{suffix}</span>
      )}
    </span>
  );
}

// Smooth reveal
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Hover card with subtle 3D tilt
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Gradient text
function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

export default function V2StripeLevelPolish() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white antialiased selection:bg-teal-500/30">
      {/* Subtle grain overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between border-b border-white/[0.08]">
            <motion.a
              href="/"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-medium tracking-tight"
            >
              Executive Assistants
            </motion.a>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden md:flex items-center gap-8"
            >
              {["About", "Program", "Apply"].map((item, i) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16">
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[128px]" />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative mx-auto max-w-7xl px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-medium text-neutral-300">Now Accepting Applications</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6">
              <GradientText>Build your career</GradientText>
              <br />
              <span className="text-neutral-500">supporting visionary</span>
              <br />
              <span className="text-neutral-500">founders.</span>
            </h1>

            <p className="text-lg text-neutral-400 max-w-xl mb-10 leading-relaxed">
              Join an elite network of executive assistants. Get world-class training, competitive pay, and work with the most ambitious founders in tech.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Start Application
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
              <a href="#about" className="text-sm text-neutral-400 hover:text-white transition-colors">
                Learn more →
              </a>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16"
          >
            {[
              { value: "1%", label: "Acceptance Rate" },
              { value: "$3k+", label: "Monthly Potential" },
              { value: "200+", label: "Training Hours" },
              { value: "100%", label: "Remote Work" },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <p className="text-3xl lg:text-4xl font-medium tracking-tight">
                  <AnimatedNumber value={stat.value} />
                </p>
                <p className="text-sm text-neutral-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About */}
      <section id="about" className="py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <Reveal>
              <p className="text-sm font-medium text-teal-400 mb-4">About</p>
              <h2 className="text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] mb-6">
                We're not a staffing agency.
                <span className="text-neutral-500"> We're a career accelerator.</span>
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-6">
                Executive Assistants builds exceptional careers for exceptional people. Our EAs support founders at the world's most innovative companies, with ongoing mentorship, clear advancement paths, and a community that has your back.
              </p>
              <p className="text-neutral-400 leading-relaxed">
                If you're ready to do the best work of your life—and get recognized for it—you're in the right place.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: "🎯", title: "Elite Training", desc: "200+ hours of certification" },
                    { icon: "📈", title: "Clear Growth", desc: "Junior to Senior pathways" },
                    { icon: "🤝", title: "Real Mentorship", desc: "Weekly 1-on-1 guidance" },
                    { icon: "🌍", title: "Global Community", desc: "Network of top EAs" },
                  ].map((item, i) => (
                    <TiltCard key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                      <span className="text-2xl mb-3 block">{item.icon}</span>
                      <h3 className="font-medium mb-1">{item.title}</h3>
                      <p className="text-sm text-neutral-500">{item.desc}</p>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 border-y border-white/[0.06]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <Reveal>
            <blockquote className="text-2xl lg:text-3xl font-medium tracking-tight leading-relaxed">
              "Most companies hire assistants.
              <span className="text-teal-400"> We build careers.</span>"
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-violet-500" />
              <div className="text-left">
                <p className="text-sm font-medium">Colin Pal</p>
                <p className="text-xs text-neutral-500">Founder</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section id="program" className="py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-sm font-medium text-teal-400 mb-4">The Program</p>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight">
              Everything you need to thrive
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Comprehensive Training", desc: "200+ hours of certification covering executive support, communication, tools, and leadership skills.", icon: "📚" },
              { title: "Weekly Mentorship", desc: "Regular 1-on-1s with senior EAs who've walked your path and can guide your growth.", icon: "🧭" },
              { title: "Career Progression", desc: "Clear milestones from Junior to Senior EA, with transparent compensation at each level.", icon: "📈" },
              { title: "Remote Flexibility", desc: "Work from anywhere with async-first practices and respect for your time zones.", icon: "🌎" },
              { title: "Founder Matching", desc: "Get paired with founders whose work style and mission align with your strengths.", icon: "🎯" },
              { title: "Community Access", desc: "Join a private network of top EAs for peer support, learning, and collaboration.", icon: "👥" },
            ].map((benefit, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <TiltCard
                  className={`relative p-8 rounded-2xl border transition-all duration-300 cursor-default ${
                    hoveredBenefit === i
                      ? "bg-white/[0.04] border-white/[0.12]"
                      : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.1]"
                  }`}
                >
                  <div
                    onMouseEnter={() => setHoveredBenefit(i)}
                    onMouseLeave={() => setHoveredBenefit(null)}
                  >
                    <span className="text-3xl mb-4 block">{benefit.icon}</span>
                    <h3 className="text-lg font-medium mb-2">{benefit.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{benefit.desc}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation */}
      <section className="py-32 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-sm font-medium text-teal-400 mb-4">Compensation</p>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-4">
              Transparent, competitive pay
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              We believe in fair, transparent compensation that grows with your experience and impact.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { level: "Junior EA", range: "$1,500 – $2,000", note: "Entry level with training", featured: false },
              { level: "Mid-Level EA", range: "$2,000 – $2,500", note: "Proven track record", featured: true },
              { level: "Senior EA", range: "$2,500 – $3,000+", note: "Executive expertise", featured: false },
            ].map((tier, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <TiltCard className={`relative p-8 rounded-2xl text-center transition-all duration-300 ${
                  tier.featured
                    ? "bg-gradient-to-b from-teal-500/10 to-transparent border-2 border-teal-500/30"
                    : "bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12]"
                }`}>
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-teal-500 text-black text-xs font-medium rounded-full">
                      Most Common
                    </div>
                  )}
                  <p className="text-sm text-neutral-400 mb-2">{tier.level}</p>
                  <p className="text-2xl font-medium tracking-tight mb-2">{tier.range}</p>
                  <p className="text-sm text-neutral-500">{tier.note}</p>
                </TiltCard>
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
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-sm font-medium text-teal-400 mb-4">Requirements</p>
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight">
              What we're looking for
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
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <section id="apply" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[128px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
              Ready to start?
            </h2>
            <p className="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
              Join the top 1% of executive assistants. Your application takes just 5 minutes, and we'll respond within 48 hours.
            </p>
            <MagneticButton
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Start Your Application
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">Executive Assistants</p>
            <p className="text-sm text-neutral-600">© 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
