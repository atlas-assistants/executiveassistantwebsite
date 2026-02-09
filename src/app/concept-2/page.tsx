// @ts-nocheck
"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ========================================
// CONCEPT 2: LIGHT EDITORIAL
// Aesthetic: Magazine-inspired, serif-dominant, warm neutrals
// Typography: Cormorant Garamond
// Colors: Cream, warm grays, terracotta accent
// Motion: Subtle, refined, editorial transitions
// ========================================

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

// Reveal wrapper
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={slideUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Concept2() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#FAF9F6]/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="font-editorial text-2xl font-semibold text-stone-800 tracking-tight">
              Executive Assistants
            </a>
            <div className="hidden md:flex items-center gap-12">
              <a href="#about" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">About</a>
              <a href="#opportunity" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">The Opportunity</a>
              <a href="#culture" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">Culture</a>
              <a
                href="#apply"
                className="px-6 py-2.5 bg-[#9E4B3E] text-white text-sm font-medium rounded-full hover:bg-[#8A3F34] transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Editorial Split Layout */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left - Typography */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="order-2 lg:order-1"
            >
              <motion.p
                variants={fadeIn}
                className="text-[#9E4B3E] font-medium tracking-widest uppercase text-sm mb-6"
              >
                Now Accepting Applications
              </motion.p>
              <motion.h1
                variants={slideUp}
                className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-medium text-stone-900 leading-[1.1] tracking-tight mb-8"
              >
                Your career
                <br />
                <em className="not-italic text-[#9E4B3E]">deserves</em>
                <br />
                better.
              </motion.h1>
              <motion.p
                variants={slideUp}
                className="text-xl text-stone-600 leading-relaxed max-w-md mb-10"
              >
                Join an elite network of executive assistants supporting founders who are building the future. This isn't just a job—it's a career transformation.
              </motion.p>
              <motion.div variants={slideUp} className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center px-8 py-4 bg-stone-900 text-white font-medium rounded-full hover:bg-stone-800 transition-colors"
                >
                  Start Your Application
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center justify-center px-8 py-4 border border-stone-300 text-stone-700 font-medium rounded-full hover:bg-stone-100 transition-colors"
                >
                  Learn More
                </a>
              </motion.div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="order-1 lg:order-2 relative"
            >
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-stone-200">
                <div className="absolute inset-0 bg-gradient-to-br from-[#9E4B3E]/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-editorial text-6xl text-stone-400/50">EA</p>
                  </div>
                </div>
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-stone-100"
              >
                <p className="font-editorial text-4xl font-semibold text-stone-900">1%</p>
                <p className="text-sm text-stone-500 mt-1">Acceptance Rate</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pull Quote Section */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <blockquote className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-800 leading-tight">
              "The best executive assistants don't just support leaders—
              <span className="text-[#9E4B3E]"> they become indispensable partners</span> in building something meaningful."
            </blockquote>
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-stone-300" />
              <div className="text-left">
                <p className="font-medium text-stone-900">Colin Pal</p>
                <p className="text-sm text-stone-500">Founder & CEO</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Section - Editorial Grid */}
      <section id="about" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left column - Label */}
            <div className="lg:col-span-3">
              <Reveal>
                <p className="text-[#9E4B3E] font-medium tracking-widest uppercase text-sm sticky top-32">
                  About Us
                </p>
              </Reveal>
            </div>

            {/* Right column - Content */}
            <div className="lg:col-span-9">
              <Reveal>
                <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-stone-900 leading-tight mb-8">
                  We're building the world's most elite network of executive assistants.
                </h2>
              </Reveal>
              <Reveal>
                <p className="text-xl text-stone-600 leading-relaxed mb-8">
                  Executive Assistants isn't a staffing agency. We're a career accelerator for ambitious professionals who want to work alongside visionary founders and executives.
                </p>
              </Reveal>
              <Reveal>
                <p className="text-xl text-stone-600 leading-relaxed">
                  Our EAs don't just manage calendars—they become strategic partners, trusted advisors, and essential members of leadership teams building category-defining companies.
                </p>
              </Reveal>

              {/* Stats */}
              <div className="grid sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-stone-200">
                {[
                  { value: "200+", label: "Hours of Training" },
                  { value: "$3,000+", label: "Monthly Earnings" },
                  { value: "100%", label: "Remote Work" },
                ].map((stat, i) => (
                  <Reveal key={i}>
                    <div>
                      <p className="font-editorial text-4xl font-semibold text-stone-900">{stat.value}</p>
                      <p className="text-stone-500 mt-2">{stat.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Opportunity - Magazine Layout */}
      <section id="opportunity" className="py-24 lg:py-32 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <Reveal>
                <p className="text-[#D4A59A] font-medium tracking-widest uppercase text-sm mb-6">
                  The Opportunity
                </p>
                <h2 className="font-editorial text-4xl sm:text-5xl font-medium leading-tight mb-8">
                  More than a position—<br />
                  <em className="not-italic text-[#D4A59A]">a career path.</em>
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="text-xl text-stone-300 leading-relaxed mb-8">
                  We invest heavily in our EAs because we know that when you grow, everyone wins. From day one, you'll have access to world-class training, mentorship, and a clear path to advancement.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {[
              { title: "EA Certification", desc: "Complete our comprehensive certification before your first client." },
              { title: "Weekly Training", desc: "Ongoing development with live sessions and peer learning." },
              { title: "Career Growth", desc: "Clear advancement path from Junior to Senior EA." },
              { title: "Team Support", desc: "Direct access to leadership whenever you need guidance." },
            ].map((item, i) => (
              <Reveal key={i}>
                <div className="p-6 rounded-2xl bg-stone-800/50 border border-stone-700">
                  <div className="w-10 h-10 rounded-full bg-[#9E4B3E] flex items-center justify-center mb-4">
                    <span className="text-white font-medium">{i + 1}</span>
                  </div>
                  <h3 className="font-editorial text-xl font-medium mb-2">{item.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation - Clean Layout */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <Reveal>
              <p className="text-[#9E4B3E] font-medium tracking-widest uppercase text-sm mb-6">
                Compensation
              </p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-stone-900 leading-tight">
                Transparent. Competitive. Fair.
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { level: "Junior EA", range: "$1,500 - $2,000", desc: "Entry-level experience" },
              { level: "Mid-Level EA", range: "$2,000 - $2,500", desc: "Proven track record", featured: true },
              { level: "Senior EA", range: "$2,500 - $3,000+", desc: "Executive expertise" },
            ].map((tier, i) => (
              <Reveal key={i}>
                <div className={`p-8 rounded-2xl text-center ${
                  tier.featured
                    ? "bg-[#9E4B3E] text-white"
                    : "bg-stone-100 text-stone-900"
                }`}>
                  <p className={`text-sm font-medium mb-4 ${tier.featured ? "text-white/70" : "text-stone-500"}`}>
                    {tier.level}
                  </p>
                  <p className="font-editorial text-3xl font-semibold mb-2">{tier.range}</p>
                  <p className={`text-sm ${tier.featured ? "text-white/70" : "text-stone-500"}`}>
                    {tier.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Benefits row */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 pt-16 border-t border-stone-200">
            {["100% Remote", "40 hrs/week", "10 PTO Days", "Performance Bonuses"].map((benefit, i) => (
              <Reveal key={i}>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#9E4B3E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-stone-600">{benefit}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section id="culture" className="py-24 lg:py-32 bg-[#F5F3EF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <p className="text-[#9E4B3E] font-medium tracking-widest uppercase text-sm mb-6">
                  Our Values
                </p>
                <h2 className="font-editorial text-4xl sm:text-5xl font-medium text-stone-900 leading-tight">
                  What we look for.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-8">
                {[
                  { title: "Ownership", desc: "You say 'I'll handle it' and you do. No excuses, no handoffs." },
                  { title: "Proactive", desc: "You solve problems before they're raised. You anticipate needs." },
                  { title: "Growth Mindset", desc: "You're always learning, always improving, never satisfied with good enough." },
                  { title: "Clear Communication", desc: "Your messages are clear, concise, and kind. Always." },
                ].map((value, i) => (
                  <Reveal key={i}>
                    <div className="flex gap-6 pb-8 border-b border-stone-300 last:border-0 last:pb-0">
                      <span className="font-editorial text-4xl text-[#9E4B3E] font-light">0{i + 1}</span>
                      <div>
                        <h3 className="font-editorial text-xl font-medium text-stone-900 mb-2">{value.title}</h3>
                        <p className="text-stone-600">{value.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-24 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <p className="text-[#9E4B3E] font-medium tracking-widest uppercase text-sm mb-6">
              Ready to Begin?
            </p>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium text-stone-900 leading-tight mb-8">
              Your next chapter starts here.
            </h2>
            <p className="text-xl text-stone-600 mb-10">
              If you've read this far, you're not looking for just another job. Neither are we.
            </p>
            <a
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 bg-[#9E4B3E] text-white text-lg font-medium rounded-full hover:bg-[#8A3F34] transition-colors"
            >
              Start Your Application
              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="text-sm text-stone-500 mt-6">
              5-minute application • Hear back within 48 hours
            </p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-editorial text-xl font-semibold text-stone-800">Executive Assistants</p>
            <p className="text-sm text-stone-500">© 2024 Executive Assistants. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
