"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";

// ========================================
// V4: LIVING PAGE
// Scroll-driven everything
// Page feels alive and responsive
// Parallax, reveals, morphing elements
// ========================================

// Parallax wrapper
function Parallax({ children, speed = 0.5, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Scale on scroll
function ScaleReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.div ref={ref} style={{ scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// Sticky header text that changes
function StickyText({ texts, className = "" }: { texts: string[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(scrollYProgress, [0, 1], [0, texts.length - 1]);
  const [displayIndex, setDisplayIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = activeIndex.on("change", (v) => {
      setDisplayIndex(Math.round(v));
    });
    return unsubscribe;
  }, [activeIndex]);

  return (
    <div ref={containerRef} className={className} style={{ height: `${texts.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.h2
          key={displayIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-bold text-center px-6"
        >
          {texts[displayIndex]}
        </motion.h2>
      </div>
    </div>
  );
}

// Progress-linked reveal
function ProgressReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animated counter with scroll trigger
function ScrollCounter({ value, suffix = "", className = "" }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", setDisplayValue);
    return unsubscribe;
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  );
}

// Morphing blob background
function MorphingBlob() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          borderRadius: [
            "60% 40% 30% 70%/60% 30% 70% 40%",
            "30% 60% 70% 40%/50% 60% 30% 60%",
            "60% 40% 30% 70%/60% 30% 70% 40%",
          ],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/20 to-violet-500/20 blur-[100px]"
      />
      <motion.div
        animate={{
          borderRadius: [
            "30% 60% 70% 40%/50% 60% 30% 60%",
            "60% 40% 30% 70%/60% 30% 70% 40%",
            "30% 60% 70% 40%/50% 60% 30% 60%",
          ],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-violet-500/15 to-teal-500/15 blur-[100px]"
      />
    </div>
  );
}

export default function V4LivingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.95]);

  // Overall scroll progress for progress bar
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      {/* Progress bar */}
      <motion.div
        style={{ scaleX: smoothProgress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 to-violet-400 z-50 origin-left"
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-[#030303]/50 backdrop-blur-xl border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex h-16 items-center justify-between">
            <a href="/" className="text-sm font-medium">Executive Assistants</a>
            <a href="#apply" className="text-sm text-neutral-400 hover:text-white transition-colors">
              Apply →
            </a>
          </div>
        </div>
      </nav>

      {/* Hero - Scroll-linked */}
      <section ref={heroRef} className="min-h-[150vh] relative">
        <MorphingBlob />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-sm text-neutral-300">Applications Open</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8"
          >
            <span className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
              Your Career,
            </span>
            <br />
            <span className="text-teal-400">Amplified.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl text-neutral-400 max-w-xl mb-12"
          >
            Join the elite 1% of executive assistants supporting visionary founders.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <a
              href="#apply"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-teal-400 transition-all"
            >
              Start Application
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-neutral-500"
          >
            <span className="text-xs tracking-wider">Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-neutral-600 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1 rounded-full bg-neutral-400"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats - Scroll reveal */}
      <section className="py-32 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 1, suffix: "%", label: "Acceptance Rate" },
              { value: 3000, suffix: "+", label: "Monthly Potential" },
              { value: 200, suffix: "+", label: "Training Hours" },
              { value: 100, suffix: "%", label: "Remote Work" },
            ].map((stat, i) => (
              <ProgressReveal key={i}>
                <div className="text-center">
                  <p className="text-5xl lg:text-6xl font-bold tracking-tight">
                    {stat.value < 100 ? (
                      <ScrollCounter value={stat.value} suffix={stat.suffix} />
                    ) : (
                      <>{stat.value === 3000 ? "$" : ""}<ScrollCounter value={stat.value} suffix={stat.suffix} /></>
                    )}
                  </p>
                  <p className="text-sm text-neutral-500 mt-2">{stat.label}</p>
                </div>
              </ProgressReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky text journey */}
      <StickyText
        texts={[
          "We don't hire.",
          "We invest.",
          "We develop.",
          "We build careers.",
        ]}
        className="bg-gradient-to-b from-[#030303] via-neutral-950 to-[#030303]"
      />

      {/* About with parallax */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <ProgressReveal>
                <p className="text-sm font-medium text-teal-400 mb-6">About Us</p>
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-8">
                  A career accelerator for exceptional people.
                </h2>
                <p className="text-lg text-neutral-400 leading-relaxed">
                  Executive Assistants isn't a staffing agency. We're a development platform for ambitious professionals who want to support the world's most innovative founders—and grow while doing it.
                </p>
              </ProgressReveal>
            </div>

            <Parallax speed={0.3}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🎯", label: "Elite Training", value: "200+ hrs" },
                  { icon: "📈", label: "Clear Growth", value: "3 levels" },
                  { icon: "🤝", label: "Mentorship", value: "Weekly" },
                  { icon: "🌍", label: "Community", value: "Global" },
                ].map((item, i) => (
                  <ScaleReveal key={i}>
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-teal-400/30 transition-colors">
                      <span className="text-3xl">{item.icon}</span>
                      <p className="text-sm text-neutral-500 mt-4">{item.label}</p>
                      <p className="text-xl font-semibold mt-1">{item.value}</p>
                    </div>
                  </ScaleReveal>
                ))}
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* Quote with scale */}
      <section className="py-32 relative overflow-hidden">
        <ScaleReveal className="mx-auto max-w-5xl px-6 lg:px-12 text-center">
          <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            "Most companies hire assistants.
            <span className="text-teal-400"> We build careers.</span>"
          </blockquote>
          <div className="mt-10">
            <p className="text-neutral-500">Colin Pal, Founder</p>
          </div>
        </ScaleReveal>
      </section>

      {/* Benefits - Staggered cards */}
      <section className="py-32 lg:py-48">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <ProgressReveal className="text-center mb-20">
            <p className="text-sm font-medium text-teal-400 mb-6">The Program</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Everything you need to thrive
            </h2>
          </ProgressReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Comprehensive Training", desc: "200+ hours of certification covering executive support, communication, tools, and leadership skills.", delay: 0 },
              { title: "Weekly Mentorship", desc: "Regular 1-on-1s with senior EAs who've walked your path and can guide your growth.", delay: 0.1 },
              { title: "Career Progression", desc: "Clear milestones from Junior to Senior EA, with transparent compensation at each level.", delay: 0.2 },
              { title: "Remote Flexibility", desc: "Work from anywhere with async-first practices and respect for your time zones.", delay: 0.3 },
              { title: "Founder Matching", desc: "Get paired with founders whose work style and mission align with your strengths.", delay: 0.4 },
              { title: "Community Access", desc: "Join a private network of top EAs for peer support, learning, and collaboration.", delay: 0.5 },
            ].map((benefit, i) => (
              <ProgressReveal key={i}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.06] hover:border-teal-400/20 transition-colors h-full"
                >
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              </ProgressReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation */}
      <section className="py-32 lg:py-48 bg-gradient-to-b from-neutral-950 to-[#030303]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <ProgressReveal className="text-center mb-20">
            <p className="text-sm font-medium text-teal-400 mb-6">Compensation</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              Transparent, competitive pay
            </h2>
          </ProgressReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { level: "Junior", range: "$1,500 – $2,000", note: "Entry level" },
              { level: "Mid-Level", range: "$2,000 – $2,500", note: "Proven track record", featured: true },
              { level: "Senior", range: "$2,500 – $3,000+", note: "Executive expertise" },
            ].map((tier, i) => (
              <ScaleReveal key={i}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`p-8 rounded-2xl text-center relative overflow-hidden ${
                    tier.featured
                      ? "bg-gradient-to-b from-teal-400/20 to-teal-400/5 border-2 border-teal-400/30"
                      : "bg-white/[0.02] border border-white/[0.08]"
                  }`}
                >
                  {tier.featured && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-gradient-to-t from-teal-400/10 to-transparent pointer-events-none"
                    />
                  )}
                  <p className="text-sm text-neutral-400 mb-3">{tier.level}</p>
                  <p className="text-3xl font-bold tracking-tight mb-2">{tier.range}</p>
                  <p className="text-sm text-neutral-500">{tier.note}</p>
                </motion.div>
              </ScaleReveal>
            ))}
          </div>

          <ProgressReveal className="text-center mt-12">
            <p className="text-sm text-neutral-500">
              100% Remote · Full-time · 10 PTO Days · Performance Bonuses
            </p>
          </ProgressReveal>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-12">
          <ProgressReveal className="text-center mb-16">
            <p className="text-sm font-medium text-teal-400 mb-6">Requirements</p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">
              What we're looking for
            </h2>
          </ProgressReveal>

          <div className="space-y-4">
            {[
              "2+ years of EA experience or transferable background",
              "Exceptional written and verbal English communication",
              "Available for full-time commitment (40 hours/week)",
              "Flexibility for US timezone collaboration",
              "Proactive, ownership-driven mindset",
            ].map((req, i) => (
              <ProgressReveal key={i}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-teal-400/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-400/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-400 text-sm">✓</span>
                  </div>
                  <span className="text-neutral-300">{req}</span>
                </motion.div>
              </ProgressReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="py-32 lg:py-48 relative overflow-hidden">
        <MorphingBlob />

        <div className="relative mx-auto max-w-3xl px-6 lg:px-12 text-center">
          <ScaleReveal>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
              Ready to<br />
              <span className="text-teal-400">level up?</span>
            </h2>
            <p className="text-xl text-neutral-400 mb-12 max-w-xl mx-auto">
              5 minutes to apply. 48 hours for a response. Your next chapter starts here.
            </p>
            <motion.a
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-teal-400 to-teal-500 text-black rounded-full font-semibold text-lg hover:shadow-[0_0_40px_rgba(20,184,166,0.3)] transition-shadow"
            >
              Start Your Application
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
          </ScaleReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">Executive Assistants</p>
            <p className="text-sm text-neutral-600">© 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
