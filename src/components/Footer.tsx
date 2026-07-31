"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { tr } = useLang();

  return (
    <footer className="bg-[#0F1F4B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[#0F1F4B] font-black text-sm">TCC</span>
              </div>
              <span className="font-black text-lg" style={{ fontFamily: "Montserrat, sans-serif" }}>
                TrueCollarClub
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{tr.footer.tagline}</p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com/truecollarclub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="mailto:hei@truecollarclub.no"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a
                href="tel:+4700000000"
                className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Pages */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/50 mb-5">
              {tr.footer.links}
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: tr.nav.home },
                { href: "/om-oss", label: tr.nav.about },
                { href: "/butikk", label: tr.nav.shop },
                { href: "/kontakt", label: tr.nav.contact },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/50 mb-5">
              {tr.footer.social}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com/truecollarclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <InstagramIcon size={14} />
                  @truecollarclub
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/50 mb-5">
              {tr.footer.legal}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  {tr.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  {tr.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
          {tr.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
