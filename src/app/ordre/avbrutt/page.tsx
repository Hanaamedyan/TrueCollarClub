"use client";

import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export default function AvbruttPage() {
  const { lang } = useLang();
  const { setIsOpen } = useCart();

  const content = {
    NO: {
      title:    "Betaling avbrutt",
      subtitle: "Ingen penger ble trukket. Handlekurven din er fortsatt lagret.",
      back:     "Gå tilbake til kassen",
      shop:     "Fortsett å handle",
    },
    EN: {
      title:    "Payment cancelled",
      subtitle: "No money was charged. Your cart is still saved.",
      back:     "Return to checkout",
      shop:     "Continue shopping",
    },
  };

  const c = content[lang];

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4 pt-24">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-3xl shadow-[0_8px_48px_rgba(15,31,75,0.12)] p-8 text-center"
        >
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={40} className="text-red-500" />
          </div>

          <h1
            className="text-2xl font-black text-[#0F1F4B] mb-3"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {c.title}
          </h1>
          <p className="text-gray-500 mb-8">{c.subtitle}</p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="btn-primary w-full py-4"
            >
              <ShoppingCart size={18} />
              {c.back}
            </button>
            <Link href="/butikk" className="btn-outline w-full py-3 text-sm">
              <ArrowLeft size={16} />
              {c.shop}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
