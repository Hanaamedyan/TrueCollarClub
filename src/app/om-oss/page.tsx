"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";
import TeamCard from "@/components/TeamCard";

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
    {
      name: "Alex",
      role: lang === "NO" ? "Grunnlegger & Design" : "Founder & Design",
      quote: lang === "NO"
        ? "Vi laget TCC fordi vi selv savnet klær som virkelig sa noe om hvem vi er."
        : "We created TCC because we wanted clothes that actually said something about who we are.",
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600",
    },
    {
      name: "Sam",
      role: lang === "NO" ? "Produktutvikling" : "Product Development",
      quote: lang === "NO"
        ? "Hvert plagg testes grundig — det skal sitte perfekt etter tolv timers skift."
        : "Every garment is tested thoroughly — it has to fit perfectly after a twelve-hour shift.",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600",
    },
    {
      name: "Mia",
      role: lang === "NO" ? "Kundeservice" : "Customer Service",
      quote: lang === "NO"
        ? "Fornøyde kunder er alt. Jeg svarer alltid personlig og raskt."
        : "Happy customers are everything. I always respond personally and quickly.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop",
    },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="pt-24 md:pt-32 pb-10 md:pb-20 bg-[#0F1F4B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {tr.about.title.split("\n").map((line, i) => (
                <span key={i} className={i === 1 ? "block text-[#F59E0B]" : "block"}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
              {tr.about.text1}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Text */}
            <AnimatedSection direction="right">
              <h2 className="section-title mb-5">
                {lang === "NO" ? "Vår fortelling" : "Our story"}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">{tr.about.text1}</p>
              <p className="text-gray-600 leading-relaxed mb-8 text-sm sm:text-base">{tr.about.text2}</p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {tr.about.values.map((v, i) => (
                  <div key={i} className="flex flex-col gap-2 p-3 sm:p-4 bg-[#F8F7F4] rounded-xl">
                    <CheckCircle size={18} className="text-[#F59E0B] shrink-0" />
                    <h4 className="font-bold text-[#0F1F4B] text-xs sm:text-sm leading-tight" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {v.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed hidden sm:block">{v.text}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Visual — hidden on mobile to avoid overflow issues */}
            <AnimatedSection direction="left" className="hidden lg:block">
              <div className="relative pb-8 pr-8">
                <div className="w-full h-80 bg-[#0F1F4B] rounded-3xl flex items-center justify-center shadow-[0_20px_60px_rgba(15,31,75,0.3)]">
                  <p
                    className="text-white font-black text-7xl tracking-widest"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    TCC
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 bg-[#F59E0B] rounded-2xl p-5 shadow-lg">
                  <p className="font-black text-[#0F1F4B] text-2xl" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    Since<br />2022
                  </p>
                </div>
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-12 md:py-24 bg-[#F8F7F4]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 md:mb-14">
            <h2 className="section-title mb-4">
              {lang === "NO" ? "Vår reise" : "Our journey"}
            </h2>
            <div className="w-16 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          </AnimatedSection>

          {/* Simple left-aligned timeline — works perfectly on all screen sizes */}
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-[#0F1F4B]/15 rounded-full" />

            <div className="flex flex-col gap-8">
              {timeline.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-8 top-5 w-5 h-5 bg-[#0F1F4B] rounded-full border-4 border-[#F8F7F4] shrink-0" />
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(15,31,75,0.08)]">
                    <span
                      className="text-[#F59E0B] font-black text-lg block mb-1"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {item.year}
                    </span>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-wrap items-stretch justify-center gap-6">
            {team.map((member, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="flex">
                <TeamCard
                  name={member.name}
                  role={member.role}
                  quote={member.quote}
                  image={member.image}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-20 bg-[#0F1F4B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {lang === "NO" ? "Klar til å se kolleksjonen?" : "Ready to see the collection?"}
            </h2>
            <p className="text-white/60 mb-8 text-sm sm:text-base">
              {lang === "NO" ? "Finn plagget som passer deg best." : "Find the garment that suits you best."}
            </p>
            <Link href="/butikk" className="btn-gold inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              {tr.about.cta}
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
