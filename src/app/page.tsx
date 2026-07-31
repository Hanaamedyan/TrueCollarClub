"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Shirt, Award, Star, Heart } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";

const iconMap = { shirt: Shirt, badge: Award, star: Star, heart: Heart };

export default function HomePage() {
  const { tr, lang } = useLang();
  const featured = products.filter((p) => p.badge);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F8F7F4]">
        {/* Background shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#0F1F4B]/5" />
          <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full bg-[#1E3A8A]/8" />
          <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-[#F59E0B]/10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F1F4B]/10 text-[#0F1F4B] rounded-full text-sm font-bold mb-6">
                  <span className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse" />
                  {tr.hero.badge}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-[#0F1F4B] mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {tr.hero.title.split("\n").map((line, i) => (
                  <span key={i} className={i === 1 ? "block text-[#1E3A8A]" : "block"}>
                    {line}
                  </span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed"
              >
                {tr.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/butikk" className="btn-primary text-base px-8 py-4">
                  {tr.hero.cta_shop}
                  <ArrowRight size={18} />
                </Link>
                <Link href="/om-oss" className="btn-outline text-base px-8 py-4">
                  {tr.hero.cta_about}
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex gap-8 mt-12"
              >
                {[
                  { num: "100%", label: lang === "NO" ? "Norsk kvalitet" : "Norwegian quality" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-black text-[#0F1F4B]" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {stat.num}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-[420px] h-[420px]">
                {/* Main circle */}
                <div className="absolute inset-0 bg-[#0F1F4B] rounded-full flex items-center justify-center shadow-[0_20px_60px_rgba(15,31,75,0.3)]">
                  <div className="text-center">
                    <p
                      className="text-white font-black text-6xl tracking-widest"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      TCC
                    </p>
                    <p className="text-white/60 text-sm tracking-[0.3em] mt-1 uppercase">
                      True Collar Club
                    </p>
                  </div>
                </div>
                {/* Floating card */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -bottom-6 -left-10 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-[#F59E0B] rounded-xl flex items-center justify-center">
                    <Star size={18} className="text-[#0F1F4B]" fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-black text-sm text-[#0F1F4B]">Premium kvalitet</p>
                    <p className="text-xs text-gray-500">★★★★★</p>
                  </div>
                </motion.div>
                {/* Floating badge 2 */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -top-4 -right-8 bg-[#F59E0B] rounded-2xl shadow-lg p-4"
                >
                  <p className="font-black text-[#0F1F4B] text-sm">#TrueCollarClub</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">
            {tr.hero.scroll}
          </span>
          <ChevronDown size={20} className="text-gray-400" />
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-4">{tr.features.title}</h2>
            <div className="w-16 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {tr.features.items.map((item, i) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Shirt;
              return (
                <AnimatedSection key={i} delay={i * 0.1} className="h-full">
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#F8F7F4] hover:bg-[#EEF2FF] transition-colors group h-full">
                    <div className="w-14 h-14 bg-[#0F1F4B] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1E3A8A] transition-colors">
                      <Icon size={26} className="text-white" />
                    </div>
                    <h3
                      className="font-black text-[#0F1F4B] mb-2"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title mb-3">{tr.featured.title}</h2>
            <p className="text-gray-500 text-lg">{tr.featured.subtitle}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.1}>
                <ProductCard product={product} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link href="/butikk" className="btn-outline inline-flex items-center gap-2">
              {tr.featured.viewAll}
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="py-24 bg-[#0F1F4B] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="right">
              <span className="inline-block px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm font-bold mb-6">
                {tr.about.badge}
              </span>
              <h2
                className="text-4xl md:text-5xl font-black text-white leading-tight mb-6"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {tr.about.title.split("\n").map((line, i) => (
                  <span key={i} className={i === 1 ? "block text-[#F59E0B]" : "block"}>
                    {line}
                  </span>
                ))}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">{tr.about.text1}</p>
              <p className="text-white/70 leading-relaxed mb-8">{tr.about.text2}</p>
              <Link href="/om-oss" className="btn-gold inline-flex items-center gap-2">
                {tr.about.cta}
                <ArrowRight size={18} />
              </Link>
            </AnimatedSection>

            <AnimatedSection direction="left">
              <div className="grid grid-cols-1 gap-4">
                {tr.about.values.map((v, i) => (
                  <div
                    key={i}
                    className="flex gap-4 items-start bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-5"
                  >
                    <div className="w-8 h-8 bg-[#F59E0B] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#0F1F4B] font-black text-sm">{i + 1}</span>
                    </div>
                    <div>
                      <h4
                        className="font-bold text-white mb-1"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {v.title}
                      </h4>
                      <p className="text-white/60 text-sm">{v.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <InstagramIcon size={28} className="text-[#0F1F4B]" />
              <h2 className="section-title">{tr.instagram.title}</h2>
            </div>
            <p className="text-gray-500 text-lg">{tr.instagram.subtitle}</p>
          </AnimatedSection>

          {/* Instagram grid placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div
                  className="aspect-square rounded-xl overflow-hidden card-hover cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${["#0F1F4B","#1E3A8A","#162969","#0A1430","#0F1F4B","#1B3280"][i]} 0%, ${["#1E3A8A","#162969","#0F1F4B","#1E3A8A","#1B3280","#0F1F4B"][i]} 100%)`,
                  }}
                >
                  <div className="w-full h-full flex items-center justify-center text-white/30">
                    <InstagramIcon size={28} />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center">
            <a
              href="https://instagram.com/truecollarclub"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <InstagramIcon size={18} />
              {tr.instagram.cta}
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

