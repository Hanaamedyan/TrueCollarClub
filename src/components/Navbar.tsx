"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const { lang, setLang, tr } = useLang();
  const { totalItems, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: tr.nav.home },
    { href: "/om-oss", label: tr.nav.about },
    { href: "/butikk", label: tr.nav.shop },
    { href: "/kontakt", label: tr.nav.contact },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md ${
          scrolled
            ? "shadow-[0_2px_20px_rgba(15,31,75,0.10)]"
            : "shadow-none"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#0F1F4B] rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">TCC</span>
              </div>
              <span
                className="font-black text-lg tracking-tight"
                style={{ color: scrolled ? "#0F1F4B" : "#0F1F4B", fontFamily: "Montserrat, sans-serif" }}
              >
                TrueCollarClub
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative text-[#0F1F4B] font-medium text-sm hover:text-[#1E3A8A] transition-colors duration-200
                    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5
                    after:bg-[#1E3A8A] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {/* Language switcher */}
              <div className="hidden md:flex items-center border border-[#0F1F4B] rounded-lg overflow-hidden text-xs font-bold">
                <button
                  onClick={() => setLang("NO")}
                  className={`px-2.5 py-1.5 transition-colors ${
                    lang === "NO" ? "bg-[#0F1F4B] text-white" : "text-[#0F1F4B] hover:bg-[#EEF2FF]"
                  }`}
                >
                  NO
                </button>
                <button
                  onClick={() => setLang("EN")}
                  className={`px-2.5 py-1.5 transition-colors ${
                    lang === "EN" ? "bg-[#0F1F4B] text-white" : "text-[#0F1F4B] hover:bg-[#EEF2FF]"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-[#0F1F4B] hover:text-[#1E3A8A] transition-colors"
                aria-label={tr.nav.cart}
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#F59E0B] text-[#0F1F4B] text-xs font-black rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 text-[#0F1F4B]"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#0F1F4B] font-semibold text-base py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-500 font-medium">Språk / Language:</span>
                <button
                  onClick={() => { setLang("NO"); setMenuOpen(false); }}
                  className={`px-3 py-1 rounded text-sm font-bold ${lang === "NO" ? "bg-[#0F1F4B] text-white" : "text-[#0F1F4B] border border-[#0F1F4B]"}`}
                >
                  NO
                </button>
                <button
                  onClick={() => { setLang("EN"); setMenuOpen(false); }}
                  className={`px-3 py-1 rounded text-sm font-bold ${lang === "EN" ? "bg-[#0F1F4B] text-white" : "text-[#0F1F4B] border border-[#0F1F4B]"}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
