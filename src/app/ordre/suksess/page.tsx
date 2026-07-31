"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

function SuksessContent() {
  const { lang } = useLang();
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (!cleared) {
      clearCart();
      setCleared(true);
    }
  }, [clearCart, cleared]);

  const content = {
    NO: {
      title:    "Takk for bestillingen!",
      subtitle: "Betalingen din er bekreftet. Du mottar en kvittering på e-post snart.",
      orderId:  "Ordrenummer",
      next:     "Hva skjer nå?",
      steps: [
        { icon: "📦", text: "Vi pakker bestillingen din" },
        { icon: "🚚", text: "Sendt innen 1–3 virkedager" },
        { icon: "📬", text: "Levert til deg" },
      ],
      cta:  "Fortsett å handle",
      home: "Tilbake til forsiden",
    },
    EN: {
      title:    "Thank you for your order!",
      subtitle: "Your payment is confirmed. You'll receive a receipt by email shortly.",
      orderId:  "Order ID",
      next:     "What happens next?",
      steps: [
        { icon: "📦", text: "We're packing your order" },
        { icon: "🚚", text: "Shipped within 1–3 business days" },
        { icon: "📬", text: "Delivered to you" },
      ],
      cta:  "Continue shopping",
      home: "Back to home",
    },
  };

  const c = content[lang];

  return (
    <div className="max-w-lg w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-[0_8px_48px_rgba(15,31,75,0.12)] p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-green-600" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1
            className="text-3xl font-black text-[#0F1F4B] mb-3"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            {c.title}
          </h1>
          <p className="text-gray-500 mb-6 leading-relaxed">{c.subtitle}</p>

          {sessionId && (
            <div className="bg-[#F8F7F4] rounded-xl px-4 py-3 mb-6 text-left">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                {c.orderId}
              </p>
              <p className="text-sm font-mono text-[#0F1F4B] break-all">{sessionId}</p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mb-8"
        >
          <p className="text-sm font-bold text-[#0F1F4B] mb-4 text-left">{c.next}</p>
          <div className="flex flex-col gap-3">
            {c.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#F8F7F4] rounded-xl px-4 py-3">
                <span className="text-xl">{step.icon}</span>
                <span className="text-sm font-medium text-gray-700">{step.text}</span>
                <span className="ml-auto w-5 h-5 bg-[#0F1F4B] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3"
        >
          <Link href="/butikk" className="btn-primary w-full py-4 text-base">
            <Package size={18} />
            {c.cta}
          </Link>
          <Link href="/" className="btn-outline w-full py-3 text-sm">
            {c.home}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SuksessPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4 pt-24 pb-16">
      <Suspense
        fallback={
          <div className="flex items-center gap-3 text-[#0F1F4B]">
            <Loader2 size={24} className="animate-spin" />
          </div>
        }
      >
        <SuksessContent />
      </Suspense>
    </div>
  );
}
