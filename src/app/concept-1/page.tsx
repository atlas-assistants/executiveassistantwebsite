"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring, useMotionValue, animate } from "framer-motion";
import Image from "next/image";

// ========================================
// CHARACTER-BY-CHARACTER TEXT REVEAL
// ========================================

function TextReveal({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const characters = text.split("");

  return (
    <span className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.035,
            ease: [0.22, 1, 0.36, 1],
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

// ========================================
// MORPHING BLOB BACKGROUND
// ========================================

function MorphingBlob({ className = "", color = "teal" }: { className?: string; color?: "teal" | "violet" | "cyan" }) {
  const colors = {
    teal: "from-teal-500/20 to-cyan-500/10",
    violet: "from-violet-500/15 to-fuchsia-500/10",
    cyan: "from-cyan-500/15 to-teal-500/10",
  };

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      animate={{
        borderRadius: [
          "60% 40% 30% 70%/60% 30% 70% 40%",
          "30% 60% 70% 40%/50% 60% 30% 60%",
          "60% 40% 30% 70%/60% 30% 70% 40%",
        ],
        scale: [1, 1.05, 1],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className={`w-full h-full bg-gradient-to-br ${colors[color]} blur-[100px] rounded-full`} />
    </motion.div>
  );
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-500 z-[60] origin-left"
    />
  );
}

// ========================================
// SCALE + BLUR REVEAL (V4 Element)
// ========================================

function ScaleBlurReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ========================================
// Framer Motion Variants (MetaLab Standard)
// ========================================

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

// ========================================
// Section IDs for Navigation
// ========================================

const sections = [
  { id: "hero", label: "Home" },
  { id: "benefits", label: "Why Join" },
  { id: "team", label: "Team" },
  { id: "role", label: "The Role" },
  { id: "training", label: "Training" },
  { id: "compensation", label: "Pay" },
  { id: "requirements", label: "Standards" },
  { id: "apply", label: "Apply" },
];

// ========================================
// Animated Counter Component
// ========================================

function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const incrementTime = (duration * 1000) / end;
    const timer = setInterval(() => {
      start += Math.ceil(end / 50);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ========================================
// Reveal Animation Wrapper
// ========================================

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ========================================
// Staggered Reveal for Lists
// ========================================

function StaggerReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeInUp} className={`h-full ${className}`}>
      {children}
    </motion.div>
  );
}

// ========================================
// Card with Elevation Hover (MetaLab Standard)
// ========================================

function ElevateCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`card-elevate h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ========================================
// Sticky Sidebar Navigation
// ========================================

function StickyNav({ activeSection }: { activeSection: string }) {
  const navItems = [
    { id: "benefits", label: "Why Join" },
    { id: "team", label: "Our Team" },
    { id: "role", label: "The Role" },
    { id: "training", label: "Training" },
    { id: "compensation", label: "Compensation" },
    { id: "requirements", label: "Standards" },
    { id: "apply", label: "Apply" },
  ];

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`group relative block py-2.5 text-[13px] font-display uppercase tracking-wider font-semibold transition-all duration-300 ${
              isActive
                ? "text-teal-500"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            <span className={`absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-500 transition-all duration-200 ${
              isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`} />
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

// ========================================
// Floating Apply Button (Mobile)
// ========================================

function FloatingApplyButton({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-4 right-4 z-40 lg:hidden"
        >
          <a
            href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-lift flex items-center justify-center w-full py-4 rounded-full bg-teal-500 text-white font-display font-bold text-lg shadow-xl shadow-teal-500/30"
          >
            Start your application
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ========================================
// Newsletter Form with Focus States
// ========================================

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setEmail("");
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="inline-flex items-center gap-2 text-teal-600 font-display font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You're subscribed!
          </div>
          <p className="text-sm text-neutral-500">
            Check your inbox for this week's EA playbook. (Check spam if you don't see it in 5 min.)
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="name@company.com"
        required
        className="focus-ring flex-1 px-6 py-4 rounded-full bg-white border-2 border-neutral-200 text-neutral-900 placeholder-neutral-400 text-base font-body"
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-lift px-8 py-4 rounded-full bg-teal-500 text-white font-display font-bold hover:bg-teal-600 disabled:opacity-50 whitespace-nowrap text-base shadow-lg shadow-teal-500/25"
      >
        {isSubmitting ? "Sending..." : "Get the playbooks"}
      </button>
    </form>
  );
}

// ========================================
// Main Page Component
// ========================================

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeBenefit, setActiveBenefit] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Track scroll for nav blur and floating button
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      setIsScrolled(scrollY > 50);
      setShowFloatingButton(scrollY > windowHeight * 0.5);

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Benefits data - consolidated to 4 strongest
  const benefits = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Training That Works",
      description: "Our 3-pillar system turns good EAs into irreplaceable ones.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "AI That Does the Busywork",
      description: "Proprietary tools that handle the repetitive stuff so you can focus on high-value work.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Clients Worth Working For",
      description: "Work with leaders you'll actually learn from, not just clock hours for.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Transparent Pay",
      description: "You'll know exactly what you'll earn. No surprises, no lowballing.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Floating Apply Button (Mobile) */}
      <FloatingApplyButton show={showFloatingButton} />

      {/* ========================================
          Top Navigation Bar (Scroll-Aware Blur)
          ======================================== */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 nav-blur border-b border-neutral-800/50"
            : "bg-black"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Image
              src="/atlas-logo.webp"
              alt="Atlas"
              width={140}
              height={32}
              className="h-7 sm:h-8 w-auto brightness-0 invert"
              priority
            />
            <a
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lift hidden sm:inline-flex items-center px-6 py-2.5 rounded-full bg-white text-neutral-900 text-sm font-display font-bold hover:bg-neutral-100 shadow-lg"
            >
              Start your application
            </a>
            <a
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden text-sm font-display font-bold text-white"
            >
              Apply now
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Gradient Divider below nav */}
      <div className="relative w-full h-1 bg-gradient-to-r from-teal-500 via-cyan-400 to-violet-500 mt-16 md:mt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-400 to-violet-500 blur-sm" />
      </div>

      {/* ========================================
          Hero Section
          ======================================== */}
      <section id="hero" ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center bg-black overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/40 via-black to-violet-950/30" />

        {/* Morphing Blob Backgrounds - Living, organic shapes */}
        <MorphingBlob
          className="top-0 right-0 w-[800px] h-[800px] -translate-y-1/3 translate-x-1/4"
          color="teal"
        />
        <MorphingBlob
          className="bottom-0 left-0 w-[600px] h-[600px] translate-y-1/3 -translate-x-1/4"
          color="violet"
        />
        <MorphingBlob
          className="top-1/3 left-1/3 w-[400px] h-[400px]"
          color="cyan"
        />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            {/* Hero Headline - Stacked, all white */}
            <div className="overflow-hidden px-2">
              <h1 className="font-display text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[9vw] font-extrabold uppercase tracking-tighter leading-[0.85] text-white">
                <TextReveal text="Land your" delay={0.5} />
              </h1>
            </div>
            <div className="overflow-hidden px-2">
              <h1 className="font-display text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[9vw] font-extrabold uppercase tracking-tighter leading-[0.85] text-white">
                <TextReveal text="Dream EA job" delay={1.0} />
              </h1>
            </div>

            {/* Subheadline - fades in after text reveals */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 sm:mt-10 text-xl sm:text-2xl md:text-3xl text-neutral-400 max-w-3xl mx-auto leading-snug font-body"
            >
              We train ambitious EAs to support <span className="text-white font-semibold">high-growth founders</span>—elite training, AI tools, career growth.
            </motion.p>

            {/* CTAs with Lift Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a
                href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-neutral-900 font-display font-bold text-lg hover:bg-neutral-100 shadow-xl shadow-white/10"
              >
                Start your application
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#compensation"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("compensation")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-display font-semibold text-neutral-400 hover:text-white transition-colors"
              >
                See what you'll earn
                <motion.svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </a>
            </motion.div>

            {/* Anxiety Reducer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.5 }}
              className="mt-6 text-sm text-neutral-500"
            >
              Few minute application · Hear back next day
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - appears after hero content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-neutral-500 uppercase tracking-widest font-display">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-neutral-600 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 bg-teal-400 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================
          Benefits Section - Minimal, Benefits-First
          ======================================== */}
      <section id="benefits" className="relative py-20 sm:py-28 lg:py-32 bg-black scroll-mt-20 overflow-hidden">
        {/* Subtle blob for depth */}
        <MorphingBlob
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-30"
          color="teal"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop: Split screen layout */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16">
            {/* Left column - Label + Navigation */}
            <div className="flex flex-col">
              <ScaleBlurReveal>
                <p className="text-sm font-display font-bold text-teal-400 uppercase tracking-widest mb-8">Why Atlas</p>
              </ScaleBlurReveal>

              {/* Benefit navigation - clickable titles */}
              <nav className="space-y-2">
                {benefits.map((benefit, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveBenefit(index)}
                    className={`group w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-4 ${
                      activeBenefit === index
                        ? "bg-teal-500/10 border-l-2 border-teal-400"
                        : "hover:bg-neutral-800/50 border-l-2 border-transparent"
                    }`}
                    whileHover={{ x: activeBenefit === index ? 0 : 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className={`flex-shrink-0 transition-colors duration-300 ${
                      activeBenefit === index ? "text-teal-400" : "text-neutral-500 group-hover:text-neutral-400"
                    }`}>
                      {benefit.icon}
                    </div>
                    <span className={`font-display font-semibold transition-colors duration-300 ${
                      activeBenefit === index ? "text-teal-300" : "text-neutral-400 group-hover:text-white"
                    }`}>
                      {benefit.title}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Right column - Benefit detail with AnimatePresence */}
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBenefit}
                  initial={{ opacity: 0, x: 20, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="w-full"
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 border border-neutral-700/50 backdrop-blur-sm">
                    {/* Accent glow */}
                    <div className="absolute -inset-1 bg-gradient-to-br from-teal-500/20 to-cyan-500/10 rounded-2xl blur-xl opacity-50" />

                    <div className="relative z-10">
                      {/* Large icon */}
                      <div className="w-16 h-16 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
                        <div className="scale-150">
                          {benefits[activeBenefit].icon}
                        </div>
                      </div>

                      <h3 className="font-display text-2xl xl:text-3xl font-bold text-white mb-4">
                        {benefits[activeBenefit].title}
                      </h3>

                      <p className="text-neutral-300 text-lg leading-relaxed">
                        {benefits[activeBenefit].description}
                      </p>

                      {/* Progress dots */}
                      <div className="flex gap-2 mt-8">
                        {benefits.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveBenefit(idx)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === activeBenefit
                                ? "bg-teal-400 w-6"
                                : "bg-neutral-600 hover:bg-neutral-500"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: Stacked layout */}
          <div className="lg:hidden">
            <ScaleBlurReveal className="mb-6">
              <p className="text-sm font-display font-bold text-teal-400 uppercase tracking-widest">Why Atlas</p>
            </ScaleBlurReveal>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <motion.div
                    className="group flex gap-4 p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/50"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex-shrink-0 text-teal-400">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white mb-1">{benefit.title}</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          Team Section - Social Proof + 1% Reveal
          Merged flow: Testimonials → Bridge → Punchline → Stats
          ======================================== */}
      <section id="team" className="relative pt-20 sm:pt-28 lg:pt-32 pb-20 sm:pb-24 bg-black scroll-mt-20 overflow-hidden">
        {/* Morphing blob backgrounds - simplified to 2 */}
        <MorphingBlob
          className="top-[10%] left-10 w-[400px] h-[400px]"
          color="violet"
        />
        <MorphingBlob
          className="bottom-[15%] left-1/3 w-[600px] h-[600px]"
          color="teal"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScaleBlurReveal className="text-center mb-16 sm:mb-20">
            <p className="text-sm font-display font-bold text-violet-400 uppercase tracking-widest mb-6">Real Humans, Real Stories</p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white">
              They could work anywhere.
              <br />
              <span className="text-violet-400">They chose Atlas.</span>
            </h2>
          </ScaleBlurReveal>

          <style jsx global>{`
            wistia-player[media-id='666u8lgta6']:not(:defined),
            wistia-player[media-id='k5xthojbj8']:not(:defined),
            wistia-player[media-id='x7n6yvu16s']:not(:defined),
            wistia-player[media-id='c76asxsg6y']:not(:defined) {
              display: block;
              filter: blur(5px);
              padding-top: 56.25%;
            }
            wistia-player[media-id='666u8lgta6']:not(:defined) {
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/666u8lgta6/swatch');
            }
            wistia-player[media-id='k5xthojbj8']:not(:defined) {
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/k5xthojbj8/swatch');
            }
            wistia-player[media-id='x7n6yvu16s']:not(:defined) {
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/x7n6yvu16s/swatch');
            }
            wistia-player[media-id='c76asxsg6y']:not(:defined) {
              background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/c76asxsg6y/swatch');
            }
          `}</style>
          {/* Clean 2x2 Testimonial Grid */}
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: "Testimonial 1", role: "Role", location: "Location", wistiaId: "666u8lgta6" },
              { name: "Testimonial 2", role: "Role", location: "Location", wistiaId: "k5xthojbj8" },
              { name: "Testimonial 3", role: "Role", location: "Location", wistiaId: "x7n6yvu16s" },
              { name: "Testimonial 4", role: "Role", location: "Location", wistiaId: "c76asxsg6y" },
            ].map((member, index) => (
              <StaggerItem key={index}>
                <div className="group relative bg-neutral-900/60 rounded-2xl p-5 border border-neutral-800 hover:border-violet-500/30 transition-colors duration-300">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-neutral-900">
                    {/* @ts-expect-error - Wistia web component */}
                    <wistia-player media-id={member.wistiaId} aspect="1.7777777777777777" className="absolute inset-0 w-full h-full"></wistia-player>
                  </div>
                  <div className="text-left">
                    <div className="font-display font-bold text-white group-hover:text-violet-300 transition-colors">{member.name}</div>
                    <div className="text-sm text-violet-400">{member.role}</div>
                    <div className="text-xs text-neutral-500">{member.location}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerReveal>

          {/* ========================================
              The Punchline - Bridging to 1% reveal
              ======================================== */}
          <Reveal className="mt-20 sm:mt-28">
            {/* Subtle divider */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-neutral-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-neutral-700" />
            </div>

            {/* The bridging question */}
            <p className="text-center text-lg sm:text-xl text-neutral-400 font-body mb-16">
              The common thread?
            </p>
          </Reveal>

          {/* The 1% Reveal - The Punchline - DRAMATIC */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              {/* Animated glow pulse */}
              <motion.div
                className="absolute inset-0 blur-3xl bg-teal-500/30 scale-[2]"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1.8, 2.2, 1.8],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="relative font-display text-[120px] sm:text-[180px] md:text-[220px] font-black text-white tracking-tighter leading-none"
              >
                1
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="relative font-display text-[80px] sm:text-[120px] md:text-[150px] font-black text-teal-400 tracking-tighter drop-shadow-[0_0_40px_rgba(20,184,166,0.7)] leading-none"
              >
                %
              </motion.span>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl text-neutral-400 mt-4 font-display font-medium"
            >
              get in
            </motion.p>
          </motion.div>

          <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-neutral-800 p-8 sm:p-10">
            <StaggerReveal className="grid grid-cols-3 gap-8 text-center">
              {[
                { value: 100, suffix: "+", label: "EAs on the team" },
                { value: 20, suffix: "", label: "Countries represented" },
                { staticValue: "4.9 ★", label: "EA satisfaction" },
              ].map((stat, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="group cursor-default"
                  >
                    <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                      {stat.staticValue || <AnimatedCounter value={stat.value!} suffix={stat.suffix} />}
                    </div>
                    <div className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">{stat.label}</div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ========================================
          Main Content with Sticky Nav
          ======================================== */}
      <div className="relative">
        {/* Sticky Nav (Desktop) */}
        <AnimatePresence>
          {showFloatingButton && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="hidden lg:block fixed left-8 xl:left-16 top-1/2 -translate-y-1/2 z-30"
            >
              <StickyNav activeSection={activeSection} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================
            The Role Section - Day in the Life Timeline
            ======================================== */}
        <section id="role" className="relative py-20 sm:py-28 lg:py-32 bg-neutral-50 scroll-mt-20 overflow-hidden">
          {/* Subtle background accents - light theme */}
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScaleBlurReveal className="text-center mb-16 sm:mb-20">
              <p className="text-sm font-display font-bold text-teal-600 uppercase tracking-widest mb-6">A Day in the Life</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
                Become their{" "}
                <span className="text-teal-600">right hand.</span>
              </h2>
            </ScaleBlurReveal>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line - desktop only */}
              <div className="hidden lg:block absolute left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-teal-200 via-teal-300 to-cyan-200" />

              {/* Timeline items */}
              <div className="space-y-12 lg:space-y-16">
                {/* Morning */}
                <ScaleBlurReveal>
                  <div className="lg:grid lg:grid-cols-[120px_1fr] lg:gap-8 items-start">
                    {/* Time marker */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:gap-2 mb-4 lg:mb-0">
                      <div className="hidden lg:flex w-3 h-3 rounded-full bg-teal-500 ring-4 ring-teal-100 relative z-10 mt-2" />
                      <span className="font-display text-2xl sm:text-3xl font-bold text-teal-600">Morning</span>
                    </div>
                    {/* Content */}
                    <div className="lg:pl-8">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                        Inbox zero before they wake up.
                      </h3>
                      <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
                        You scan their inbox and sort by urgency. Emails get drafted in their voice, anything critical gets flagged. By the time they open their laptop,
                        <span className="font-semibold text-neutral-900"> chaos has become clarity.</span>
                      </p>
                    </div>
                  </div>
                </ScaleBlurReveal>

                {/* Midday */}
                <ScaleBlurReveal delay={0.1}>
                  <div className="lg:grid lg:grid-cols-[120px_1fr] lg:gap-8 items-start">
                    {/* Time marker */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:gap-2 mb-4 lg:mb-0">
                      <div className="hidden lg:flex w-3 h-3 rounded-full bg-cyan-500 ring-4 ring-cyan-100 relative z-10 mt-2" />
                      <span className="font-display text-2xl sm:text-3xl font-bold text-cyan-600">Midday</span>
                    </div>
                    {/* Content */}
                    <div className="lg:pl-8">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                        Their calendar. Your machine.
                      </h3>
                      <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
                        You schedule their calls, prep the briefs, and protect their time. When something runs long, you've already rescheduled what's next.
                        <span className="font-semibold text-neutral-900"> They never even notice.</span>
                      </p>
                    </div>
                  </div>
                </ScaleBlurReveal>

                {/* Evening */}
                <ScaleBlurReveal delay={0.2}>
                  <div className="lg:grid lg:grid-cols-[120px_1fr] lg:gap-8 items-start">
                    {/* Time marker */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:gap-2 mb-4 lg:mb-0">
                      <div className="hidden lg:flex w-3 h-3 rounded-full bg-violet-500 ring-4 ring-violet-100 relative z-10 mt-2" />
                      <span className="font-display text-2xl sm:text-3xl font-bold text-violet-600">Evening</span>
                    </div>
                    {/* Content */}
                    <div className="lg:pl-8">
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                        Tomorrow is already handled.
                      </h3>
                      <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed">
                        Loose ends, admin, whatever needed to happen today. Done. Your job is to keep them in their zone of genius. Everything else?
                        <span className="font-semibold text-neutral-900"> You've got it.</span>
                      </p>
                    </div>
                  </div>
                </ScaleBlurReveal>
              </div>

              {/* Closing statement */}
              <ScaleBlurReveal delay={0.3}>
                <div className="mt-16 sm:mt-20 text-center">
                  <p className="font-display text-xl sm:text-2xl text-neutral-500 max-w-2xl mx-auto">
                    This isn't task work. This is{" "}
                    <span className="text-neutral-900 font-semibold">becoming indispensable.</span>
                  </p>
                </div>
              </ScaleBlurReveal>
            </div>
          </div>
        </section>

        {/* ========================================
            Training Section
            ======================================== */}
        <section id="training" className="py-20 sm:py-28 lg:py-32 bg-white scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScaleBlurReveal className="text-center mb-16">
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-900">
                More training to become{" "}
                <span className="text-teal-600">irreplaceable.</span>
              </h2>
              <p className="text-xl text-neutral-500 max-w-2xl mx-auto mt-6">
                Significantly more development than anywhere else. Real mentorship. Skills that compound.
              </p>
            </ScaleBlurReveal>

            {/* Asymmetric Bento Grid for Training */}
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured Card - EA Certification (spans 2 columns on lg) */}
              <StaggerItem className="lg:col-span-2">
                <ElevateCard>
                  <div className="group relative h-full p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-xl shadow-teal-500/20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                      <div className="w-16 h-16 flex-shrink-0 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <h3 className="font-display text-lg font-bold text-white mb-1">EA Certification</h3>
                        <p className="text-teal-100 text-sm">Complete our executive assistant certification program before you even start. This is your foundation.</p>
                      </div>
                    </div>
                  </div>
                </ElevateCard>
              </StaggerItem>

              {/* Regular Card - Weekly Meetings */}
              <StaggerItem>
                <ElevateCard>
                  <div className="group relative h-full text-center p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm hover:border-teal-200 transition-colors duration-300">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-teal-50 via-transparent to-cyan-50 rounded-2xl" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-all duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">Weekly EA Meetings</h3>
                      <p className="text-sm text-neutral-500">Regular team meetings plus dedicated training sessions every week.</p>
                    </div>
                  </div>
                </ElevateCard>
              </StaggerItem>

              {/* Regular Card - EA Mastermind */}
              <StaggerItem>
                <ElevateCard>
                  <div className="group relative h-full text-center p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm hover:border-teal-200 transition-colors duration-300">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-teal-50 via-transparent to-cyan-50 rounded-2xl" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-all duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="font-display text-lg font-bold text-neutral-900 mb-2">EA Mastermind</h3>
                      <p className="text-sm text-neutral-500">Peer support sessions where EAs collaborate and learn from each other.</p>
                    </div>
                  </div>
                </ElevateCard>
              </StaggerItem>

              {/* Wide Card - Team Access (spans 2 columns) */}
              <StaggerItem className="md:col-span-2">
                <ElevateCard>
                  <div className="group relative h-full p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm hover:border-teal-200 transition-colors duration-300">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-teal-50 via-transparent to-cyan-50 rounded-2xl" />
                    <div className="relative z-10 flex items-center gap-6">
                      <div className="w-12 h-12 flex-shrink-0 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white group-hover:border-teal-500 transition-all duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <h3 className="font-display text-lg font-bold text-neutral-900 mb-1">Team Access</h3>
                        <p className="text-sm text-neutral-500">Direct access to our leadership team whenever you need guidance.</p>
                      </div>
                    </div>
                  </div>
                </ElevateCard>
              </StaggerItem>
            </StaggerReveal>
          </div>
        </section>

        {/* ========================================
            Compensation Section
            ======================================== */}
        <section id="compensation" className="py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-white to-teal-50/50 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScaleBlurReveal className="text-center mb-16">
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 mb-6">
                $1,500 to $3,000+/month.{" "}
                <span className="text-teal-600">Transparent.</span>
              </h2>
              <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                No guessing games. Here's exactly what you'll earn at each level.
              </p>
            </ScaleBlurReveal>

            <StaggerReveal className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-12">
              {[
                { level: "Junior", salary: "$1,500 - $2,000", desc: "Entry-level EA experience", featured: false },
                { level: "Mid-Level", salary: "$2,000 - $2,500", desc: "Proven EA track record", featured: true },
                { level: "Senior", salary: "$2,500 - $3,000+", desc: "Executive-level expertise", featured: false },
              ].map((tier, index) => (
                <StaggerItem key={index}>
                  <ElevateCard>
                    <div className={`group relative h-full rounded-2xl p-8 text-center transition-all duration-300 bg-white shadow-sm ${
                      tier.featured
                        ? 'border-2 border-teal-500'
                        : 'border border-neutral-200 hover:border-teal-200'
                    }`}>
                      <p className="font-display text-2xl font-bold mb-1 text-neutral-900">
                        {tier.level}
                      </p>
                      <p className="font-display text-xl font-bold mb-2 text-teal-600">
                        {tier.salary}
                      </p>
                      <p className="text-sm text-neutral-500">{tier.desc}</p>
                    </div>
                  </ElevateCard>
                </StaggerItem>
              ))}
            </StaggerReveal>

            {/* Benefits - Inline flow with dividers, no container */}
            <Reveal>
              <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 sm:gap-x-12">
                {[
                  { title: "100% Remote", desc: "Work from anywhere" },
                  { title: "40 hrs/week", desc: "Full-time" },
                  { title: "10 PTO days", desc: "+ sick leave" },
                  { title: "7 holidays", desc: "4 major + 3 yours" },
                  { title: "Bonuses", desc: "Performance rewards" },
                ].map((item, index, arr) => (
                  <div key={index} className="flex items-center gap-8 sm:gap-12">
                    <motion.div
                      className="group text-center"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <p className="font-display font-bold text-neutral-900 group-hover:text-teal-600 transition-colors">{item.title}</p>
                      <p className="text-sm text-neutral-500">{item.desc}</p>
                    </motion.div>
                    {index < arr.length - 1 && (
                      <div className="hidden sm:block w-px h-8 bg-neutral-200" />
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ========================================
            CEO Quote Section - Signature Moment
            ======================================== */}
        <section className="relative py-24 sm:py-32 lg:py-40 bg-neutral-900 overflow-hidden">
          {/* Morphing blob background */}
          <MorphingBlob
            className="top-1/4 left-1/3 w-[600px] h-[600px]"
            color="teal"
          />

          {/* Decorative quote marks - animated */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 0.1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="absolute top-12 left-8 sm:left-16 lg:left-24"
          >
            <svg className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </motion.div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScaleBlurReveal>
              <div className="flex flex-col items-center text-center">
                <blockquote className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-white leading-[1.1] tracking-tight mb-16 max-w-5xl">
                  <span className="text-neutral-400">"</span>Most companies hire assistants.{" "}
                  <span className="text-teal-400">We build careers.</span><span className="text-neutral-400">"</span>
                </blockquote>

                <div className="flex items-center gap-5">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full bg-teal-500/30 blur-xl scale-150" />
                    <Image
                      src="/colin-pal.jpg"
                      alt="Colin Pal, CEO"
                      width={80}
                      height={80}
                      className="relative w-full h-full rounded-full object-cover ring-2 ring-teal-500/50 shadow-2xl"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-xl font-bold text-white">Colin Pal</p>
                    <p className="text-teal-400 font-medium">CEO, Atlas Assistants</p>
                  </div>
                </div>
              </div>
            </ScaleBlurReveal>
          </div>
        </section>

        {/* ========================================
            Standards Section
            ======================================== */}
        <section id="requirements" className="relative py-20 sm:py-28 lg:py-32 bg-neutral-900 scroll-mt-20 overflow-hidden">
          {/* Morphing blob background */}
          <MorphingBlob
            className="top-1/3 right-1/4 w-[500px] h-[500px]"
            color="teal"
          />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScaleBlurReveal className="text-center mb-16">
              <p className="text-sm font-display font-bold text-teal-400 uppercase tracking-widest mb-6">What We Look For</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
                Do you have{" "}
                <span className="text-teal-400">what it takes?</span>
              </h2>
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                These are the values we live by. You should already have them.
              </p>
            </ScaleBlurReveal>

            {/* Traits as flowing pills - no boxes */}
            <ScaleBlurReveal delay={0.1} className="mb-12">
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {[
                  { title: "Ownership", desc: "You say 'I'll handle it' and you do" },
                  { title: "Proactive", desc: "You solve problems before they're raised" },
                  { title: "Growth Mindset", desc: "You're always learning and improving" },
                  { title: "Clear Communication", desc: "Your emails are clear, concise, kind" },
                  { title: "Tech-Forward", desc: "You embrace new tools and AI" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="px-5 py-3 rounded-full bg-neutral-800 border border-neutral-700 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all duration-300 cursor-default">
                      <span className="font-display font-semibold text-white group-hover:text-teal-300 transition-colors">
                        {item.title}
                      </span>
                    </div>
                    {/* Tooltip on hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-neutral-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                      {item.desc}
                      <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-700" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScaleBlurReveal>

            <ScaleBlurReveal delay={0.2}>
              <div className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-700/50 p-6 max-w-2xl mx-auto">
                <p className="text-sm font-display font-semibold text-teal-400 uppercase tracking-wider mb-4">Requirements</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 text-neutral-300">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    2+ years EA or transferable experience
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Fluent English
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Full-time (40 hrs/week)
                  </div>
                  <div className="flex items-center gap-3 text-neutral-300">
                    <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3.5 h-3.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    US timezone flexibility
                  </div>
                </div>
              </div>
            </ScaleBlurReveal>
          </div>
        </section>

        {/* ========================================
            Apply CTA Section - The Climax
            ======================================== */}
        <section id="apply" className="relative py-24 sm:py-32 lg:py-40 bg-gradient-to-br from-teal-50 via-white to-cyan-50 scroll-mt-20 overflow-hidden">
          {/* Background accent */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-200/30 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScaleBlurReveal>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-sm font-display font-semibold mb-8"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.span>
                We're hiring now
              </motion.p>
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight text-neutral-900 mb-6">
                This could be{" "}
                <span className="text-teal-600">your launchpad.</span>
              </h2>
              <p className="text-xl sm:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto">
                If you've read this far, you're not looking for just another job. Neither are we.
              </p>
              <motion.a
                href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift inline-flex items-center justify-center px-14 py-6 rounded-full bg-teal-500 text-white font-display font-bold text-xl sm:text-2xl shadow-2xl shadow-teal-500/40"
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(20, 184, 166, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                Start your application
                <motion.svg
                  className="ml-3 w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </motion.a>
              <p className="text-sm text-neutral-500 mt-8">
                Few minute application · Hear back next day
              </p>
              <p className="text-xs text-neutral-400 mt-2">
                CV in English, please. We're an equal opportunity employer.
              </p>
            </ScaleBlurReveal>
          </div>
        </section>

        {/* ========================================
            Newsletter Section
            ======================================== */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-teal-50/30 to-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScaleBlurReveal>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
                Not ready yet?
              </h2>
              <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
                Join thousands of EAs getting our weekly playbook. One actionable framework every Thursday.
              </p>
              {/* Form floats free - no container */}
              <NewsletterForm />
            </ScaleBlurReveal>
          </div>
        </section>
      </div>

      {/* ========================================
          Footer
          ======================================== */}
      <footer className="py-10 sm:py-12 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Image
              src="/atlas-logo.webp"
              alt="Atlas"
              width={100}
              height={24}
              className="h-6 w-auto opacity-60"
            />
            <p className="text-sm text-neutral-400">
              &copy; {new Date().getFullYear()} Atlas Assistants. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom padding for mobile floating button */}
      <div className="h-24 lg:hidden" />
    </div>
  );
}
