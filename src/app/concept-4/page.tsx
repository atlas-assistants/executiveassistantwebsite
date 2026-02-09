"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ========================================
// CONCEPT 4: SOFT ORGANIC
// Aesthetic: Nature-inspired, rounded, welcoming
// Typography: Outfit (rounded, friendly)
// Colors: Sage green, soft peach, warm cream
// Motion: Gentle, flowing, organic
// ========================================

// Animation variants - gentle and organic
const floatIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const scaleFloat = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Reveal wrapper
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={floatIn}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Concept4() {
  return (
    <div className="min-h-screen bg-[#FDF8F3] font-organic">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#FDF8F3]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="text-2xl font-semibold text-[#2D5A4A]">
              Executive Assistants
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#why" className="text-[#5A7A6C] hover:text-[#2D5A4A] transition-colors">Why Us</a>
              <a href="#benefits" className="text-[#5A7A6C] hover:text-[#2D5A4A] transition-colors">Benefits</a>
              <a href="#values" className="text-[#5A7A6C] hover:text-[#2D5A4A] transition-colors">Values</a>
              <a
                href="#apply"
                className="px-6 py-3 bg-[#2D5A4A] text-white font-medium rounded-full hover:bg-[#234A3C] transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Soft, organic shapes */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 relative overflow-hidden">
        {/* Organic blob shapes */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#E8D5C4]/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#C5D5CD]/40 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            >
              <motion.div
                variants={floatIn}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#C5D5CD] rounded-full mb-8"
              >
                <span className="w-2 h-2 bg-[#2D5A4A] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#2D5A4A]">Now accepting applications</span>
              </motion.div>

              <motion.h1
                variants={floatIn}
                className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#2D5A4A] leading-[1.1] mb-8"
              >
                A career that
                <br />
                <span className="text-[#B87A5A]">grows with you.</span>
              </motion.h1>

              <motion.p
                variants={floatIn}
                className="text-xl text-[#5A7A6C] leading-relaxed max-w-xl mx-auto mb-10"
              >
                Join our community of exceptional executive assistants supporting visionary founders. Remote-first, human-centered, and built for long-term growth.
              </motion.p>

              <motion.div variants={floatIn} className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#apply"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#2D5A4A] text-white font-medium rounded-full hover:bg-[#234A3C] transition-all hover:shadow-lg hover:shadow-[#2D5A4A]/20"
                >
                  Begin Your Journey
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#why"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2D5A4A] font-medium rounded-full hover:bg-[#C5D5CD] transition-colors border border-[#C5D5CD]"
                >
                  Learn More
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating stat cards */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
            className="flex flex-wrap justify-center gap-4 mt-20"
          >
            {[
              { value: "1%", label: "Acceptance Rate" },
              { value: "200+", label: "Training Hours" },
              { value: "$3K+", label: "Monthly Pay" },
              { value: "100%", label: "Remote" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleFloat}
                className="px-8 py-5 bg-white rounded-2xl shadow-sm border border-[#E8E4DE]"
              >
                <p className="text-2xl font-semibold text-[#2D5A4A]">{stat.value}</p>
                <p className="text-sm text-[#5A7A6C]">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Section - Organic cards */}
      <section id="why" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="text-[#B87A5A] font-medium">Why Join Us</span>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#2D5A4A] mt-4">
              More than a job.
              <br />
              A community.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "Continuous Learning",
                desc: "Access to 200+ hours of training, weekly workshops, and mentorship from senior EAs.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: "Supportive Community",
                desc: "Weekly mastermind sessions, peer support, and direct access to our leadership team.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: "Real Growth Path",
                desc: "Clear advancement from Junior to Senior EA with transparent milestones and compensation tiers.",
              },
            ].map((item, i) => (
              <Reveal key={i}>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#E8E4DE] hover:shadow-md hover:border-[#C5D5CD] transition-all">
                  <div className="w-14 h-14 bg-[#C5D5CD] rounded-2xl flex items-center justify-center text-[#2D5A4A] mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#2D5A4A] mb-3">{item.title}</h3>
                  <p className="text-[#5A7A6C] leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Soft background */}
      <section id="benefits" className="py-24 lg:py-32 bg-[#C5D5CD]/20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal>
                <span className="text-[#B87A5A] font-medium">Benefits & Compensation</span>
                <h2 className="text-4xl sm:text-5xl font-semibold text-[#2D5A4A] mt-4 mb-8">
                  We take care
                  <br />
                  of our people.
                </h2>
                <p className="text-lg text-[#5A7A6C] leading-relaxed">
                  We believe in transparent compensation and comprehensive support. When you thrive, we all thrive.
                </p>
              </Reveal>
            </div>
            <div>
              <div className="space-y-4">
                {[
                  { level: "Junior EA", range: "$1,500 - $2,000/mo", desc: "Entry-level experience" },
                  { level: "Mid-Level EA", range: "$2,000 - $2,500/mo", desc: "Proven track record" },
                  { level: "Senior EA", range: "$2,500 - $3,000+/mo", desc: "Executive expertise" },
                ].map((tier, i) => (
                  <Reveal key={i}>
                    <div className="bg-white rounded-2xl p-6 flex items-center justify-between border border-[#E8E4DE]">
                      <div>
                        <p className="font-semibold text-[#2D5A4A]">{tier.level}</p>
                        <p className="text-sm text-[#5A7A6C]">{tier.desc}</p>
                      </div>
                      <p className="text-xl font-semibold text-[#B87A5A]">{tier.range}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <div className="flex flex-wrap gap-3 mt-8">
                  {["100% Remote", "40 hrs/week", "10 PTO Days", "Bonuses"].map((perk, i) => (
                    <span key={i} className="px-4 py-2 bg-white rounded-full text-sm text-[#2D5A4A] border border-[#E8E4DE]">
                      {perk}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="text-[#B87A5A] font-medium">Our Values</span>
            <h2 className="text-4xl sm:text-5xl font-semibold text-[#2D5A4A] mt-4">
              What we believe in.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Ownership", desc: "We take responsibility and follow through." },
              { title: "Growth", desc: "We're always learning and improving." },
              { title: "Kindness", desc: "We communicate with clarity and care." },
              { title: "Initiative", desc: "We anticipate needs and act proactively." },
            ].map((value, i) => (
              <Reveal key={i}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto bg-[#E8D5C4]/50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-semibold text-[#B87A5A]">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#2D5A4A] mb-2">{value.title}</h3>
                  <p className="text-[#5A7A6C] text-sm">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements - Checklist */}
      <section className="py-24 lg:py-32 bg-[#2D5A4A] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="text-[#C5D5CD] font-medium">Requirements</span>
              <h2 className="text-4xl sm:text-5xl font-semibold mt-4">
                Is this right
                <br />
                <span className="text-[#E8D5C4]">for you?</span>
              </h2>
            </Reveal>
            <div>
              <div className="space-y-4">
                {[
                  "2+ years of EA or transferable experience",
                  "Fluent English communication",
                  "Full-time availability (40 hours/week)",
                  "Comfortable working US timezone hours",
                  "Growth mindset and ownership mentality",
                ].map((req, i) => (
                  <Reveal key={i}>
                    <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                      <div className="w-6 h-6 bg-[#C5D5CD] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[#2D5A4A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>{req}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="apply" className="py-24 lg:py-32 relative overflow-hidden">
        {/* Organic shapes */}
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-[#C5D5CD]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#E8D5C4]/30 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2D5A4A] mb-8">
              Ready to bloom?
            </h2>
            <p className="text-xl text-[#5A7A6C] mb-10 max-w-xl mx-auto">
              Take the first step towards a career that values your growth as much as your skills.
            </p>
            <a
              href="https://careers.atlasassistants.com/jobs/4985570-executive-assistant-fully-remote-global/applications/new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 bg-[#2D5A4A] text-white text-lg font-medium rounded-full hover:bg-[#234A3C] transition-all hover:shadow-xl hover:shadow-[#2D5A4A]/20"
            >
              Start Your Application
              <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <p className="text-sm text-[#5A7A6C] mt-6">
              5-minute application • Response within 48 hours
            </p>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#E8E4DE]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xl font-semibold text-[#2D5A4A]">Executive Assistants</p>
            <p className="text-sm text-[#5A7A6C]">© 2024 Executive Assistants. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
