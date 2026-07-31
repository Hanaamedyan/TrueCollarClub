"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import AnimatedSection from "@/components/AnimatedSection";

type Category = "all" | "tshirts" | "hoodies" | "caps" | "accessories";
type SortKey = "featured" | "priceLow" | "priceHigh" | "newest";

export default function ShopPage() {
  const { tr, lang } = useLang();
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortKey>("featured");

  const filterKeys: { key: Category; label: string }[] = [
    { key: "all", label: tr.shop.filters.all },
    { key: "tshirts", label: tr.shop.filters.tshirts },
    { key: "hoodies", label: tr.shop.filters.hoodies },
    { key: "caps", label: tr.shop.filters.caps },
    { key: "accessories", label: tr.shop.filters.accessories },
  ];

  const filtered = products
    .filter((p) => category === "all" || p.category === category)
    .sort((a, b) => {
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      if (sort === "newest") return b.id - a.id;
      return (b.badge ? 1 : 0) - (a.badge ? 1 : 0);
    });

  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-10 md:pb-16 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1
              className="text-3xl sm:text-5xl font-black text-[#0F1F4B] mb-2"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {tr.shop.title}
            </h1>
            <p className="text-gray-500 text-base sm:text-lg">{tr.shop.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 md:top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
          <div className="flex flex-col gap-3">
            {/* Category filters — scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {filterKeys.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                    category === key
                      ? "bg-[#0F1F4B] text-white"
                      : "bg-[#F8F7F4] text-[#0F1F4B] hover:bg-[#EEF2FF]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <SlidersHorizontal size={14} />
              <span className="font-medium text-xs">{tr.shop.sortBy}:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-medium text-[#0F1F4B] bg-white focus:outline-none focus:border-[#0F1F4B]"
              >
                <option value="featured">{tr.shop.sort.featured}</option>
                <option value="priceLow">{tr.shop.sort.priceLow}</option>
                <option value="priceHigh">{tr.shop.sort.priceHigh}</option>
                <option value="newest">{tr.shop.sort.newest}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-10 md:py-16 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-400 font-medium mb-6">
            {filtered.length} {lang === "NO" ? "produkter" : "products"}
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-xl font-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
                {tr.shop.noProducts}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <AnimatedSection key={product.id} delay={i * 0.07}>
                  <ProductCard product={product} />
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
