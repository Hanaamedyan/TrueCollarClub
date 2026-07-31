"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import AnimatedSection from "@/components/AnimatedSection";

const schema = z.object({
  name:    z.string().min(2),
  email:   z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});
type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { tr, lang } = useLang();
  const f = tr.contact.form;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const infoItems = [
    { icon: Mail, ...tr.contact.info.email },
    { icon: Phone, ...tr.contact.info.phone },
    { icon: Clock, ...tr.contact.info.hours },
    { icon: MapPin, ...tr.contact.info.location },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0F1F4B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-bold mb-6">
              {tr.contact.badge}
            </span>
            <h1
              className="text-5xl font-black leading-tight mb-4"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {tr.contact.title}
            </h1>
            <p className="text-white/70 text-lg max-w-xl">{tr.contact.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <AnimatedSection direction="right" className="lg:col-span-2">
              <div className="flex flex-col gap-4 mb-8">
                {infoItems.map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(15,31,75,0.08)]">
                    <div className="w-11 h-11 bg-[#0F1F4B] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
                      <p className="font-semibold text-[#0F1F4B]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="bg-[#0F1F4B] rounded-2xl overflow-hidden h-48 relative">
                {/* Simplified Norway outline SVG */}
                <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full opacity-10" fill="white">
                  <path d="M100,10 L120,30 L130,60 L125,90 L140,110 L135,140 L150,160 L145,190 L130,210 L110,230 L90,240 L70,230 L60,210 L55,180 L65,160 L60,140 L70,120 L65,100 L75,80 L70,50 L80,30 Z" />
                </svg>

                {/* Bergen marker */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Pulse ring */}
                    <div className="absolute inset-0 w-8 h-8 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full bg-[#F59E0B]/40 animate-ping" />
                    {/* Dot */}
                    <div className="relative flex flex-col items-center gap-1.5">
                      <div className="w-4 h-4 bg-[#F59E0B] rounded-full border-2 border-white shadow-lg" />
                      <div className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#F59E0B]" />
                        <span className="text-white text-xs font-bold">Bergen, Norge</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="left" className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 shadow-[0_4px_32px_rgba(15,31,75,0.10)]">
                <h2
                  className="text-2xl font-black text-[#0F1F4B] mb-6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {f.send}
                </h2>

                {status === "success" && (
                  <div className="flex items-center gap-3 bg-green-50 text-green-700 rounded-xl p-4 mb-6">
                    <CheckCircle size={20} />
                    <span className="font-medium">{f.success}</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-3 bg-red-50 text-red-600 rounded-xl p-4 mb-6">
                    <AlertCircle size={20} />
                    <span className="font-medium">{f.error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#0F1F4B] mb-2">{f.name}</label>
                      <input
                        {...register("name")}
                        placeholder={f.namePlaceholder}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#0F1F4B] ${
                          errors.name ? "border-red-400 bg-red-50" : "border-gray-200 focus:bg-[#EEF2FF]"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0F1F4B] mb-2">{f.email}</label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder={f.emailPlaceholder}
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#0F1F4B] ${
                          errors.email ? "border-red-400 bg-red-50" : "border-gray-200 focus:bg-[#EEF2FF]"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F1F4B] mb-2">{f.subject}</label>
                    <input
                      {...register("subject")}
                      placeholder={f.subjectPlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#0F1F4B] ${
                        errors.subject ? "border-red-400 bg-red-50" : "border-gray-200 focus:bg-[#EEF2FF]"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#0F1F4B] mb-2">{f.message}</label>
                    <textarea
                      {...register("message")}
                      rows={6}
                      placeholder={f.messagePlaceholder}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:border-[#0F1F4B] resize-none ${
                        errors.message ? "border-red-400 bg-red-50" : "border-gray-200 focus:bg-[#EEF2FF]"
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary w-full py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                    {status === "sending" ? f.sending : f.send}
                  </button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
