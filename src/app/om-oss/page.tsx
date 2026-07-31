"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import type { Metadata } from "next";

export default function AboutPage() {
  const { tr, lang } = useLang();

  const timeline = lang === "NO"
    ? [
        { year: "2022", text: "TrueCollarClub ble grunnlagt med ideen om klær for de som jobber." },
        { year: "2023", text: "Lansering av første kolleksjon — 3 t-skjorter, utsolgt på 48 timer." },
        { year: "2024", text: "Utvidet til hoodies, caps og tilbehør. Over 500 fornøyde kunder." },
        { year: "2025", text: "Ny nettbutikk lansert. Klare for enda større vekst." },
      ]
    : [
        { year: "2022", text: "TrueCollarClub was founded with the idea of clothes for those who work." },
        { year: "2023", text: "First collection launched — 3 t-shirts, sold out in 48 hours." },
        { year: "2024", text: "Expanded to hoodies, caps and accessories. Over 500 happy customers." },
        { year: "2025", text: "New online store launched. Ready for even bigger growth." },
      ];

  const team = [
    { name: "Alex", role: lang === "NO" ? "Grunnlegger & Design" : "Founder & Design" },
    { name: "Sam", role: lang === "NO" ? "Produktutvikling" : "Product Development" },
    { name: "Mia", role: lang === "NO" ? "Kundeservice" : "Customer Service" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0F1F4B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-bold mb-6">
              {tr.about.badge}
            </span>
            <h1
              className="text-5xl md:text-6xl font-black leading-tight mb-6"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {tr.about.title.split("\n").map((line, i) => (
                <span key={i} className={i === 1 ? "block text-[#F59E0B]" : "block"}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-white/70 text-xl leading-relaxed max-w-2xl">
              {tr.about.text1}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <h2 className="section-title mb-6">
                {lang === "NO" ? "Vår fortelling" : "Our story"}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">{tr.about.text1}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{tr.about.text2}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                {tr.about.values.map((v, i) => (
                  <div key={i} className="flex flex-col gap-2 p-4 bg-[#F8F7F4] rounded-xl">
                    <CheckCircle size={20} className="text-[#F59E0B]" fill="currentColor" />
                    <h4 className="font-bold text-[#0F1F4B] text-sm" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {v.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{v.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Visual */}
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="w-full h-80 bg-[#0F1F4B] rounded-3xl flex items-center justify-center shadow-[0_20px_60px_rgba(15,31,75,0.3)]">
                  <p
                    className="text-white font-black text-7xl tracking-widest"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    TCC
                  </p>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#F59E0B] rounded-2xl p-5 shadow-lg">
                  <p className="font-black text-[#0F1F4B] text-2xl" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Since<br />2022
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#F8F7F4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">
              {lang === "NO" ? "Vår reise" : "Our journey"}
            </h2>
            <div className="w-16 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#0F1F4B]/15" />
            <div className="flex flex-col gap-10">
              {timeline.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className={`relative flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-start`}>
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-16 md:pl-0`}>
                      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(15,31,75,0.08)]">
                        <span className="text-[#F59E0B] font-black text-xl" style={{ fontFamily: "Montserrat, sans-serif" }}>
                          {item.year}
                        </span>
                        <p className="text-gray-600 mt-2 text-sm leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                    <div className="absolute left-5 md:left-auto md:relative w-6 h-6 bg-[#0F1F4B] rounded-full border-4 border-[#F8F7F4] flex-shrink-0 md:mx-auto mt-6" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">
              {lang === "NO" ? "Menneskene bak" : "The people behind"}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="text-center">
                  <div
                    className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black shadow-navy"
                    style={{
                      background: `linear-gradient(135deg, #0F1F4B, #1E3A8A)`,
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {member.name[0]}
                  </div>
                  <h3 className="font-black text-[#0F1F4B]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{member.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0F1F4B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {lang === "NO" ? "Klar til å se kolleksjonen?" : "Ready to see the collection?"}
            </h2>
            <p className="text-white/60 mb-8">
              {lang === "NO"
                ? "Finn plagget som passer deg best."
                : "Find the garment that suits you best."}
            </p>
            <Link href="/butikk" className="btn-gold inline-flex items-center gap-2">
              {tr.about.cta}
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
