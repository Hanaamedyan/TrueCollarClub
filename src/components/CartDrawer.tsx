"use client";

import { useState } from "react";
import { X, Plus, Minus, ShoppingBag, Loader2, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, totalPrice, isOpen, setIsOpen } = useCart();
  const { tr, lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          items: items.map((i) => ({
            name:     lang === "NO" ? i.product.nameNO : i.product.nameEN,
            price:    i.product.price,
            quantity: i.quantity,
            size:     i.selectedSize,
            color:    i.selectedColor,
          })),
        }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const { url } = await res.json();
      window.location.href = url;
    } catch {
      setError(
        lang === "NO"
          ? "Noe gikk galt. Prøv igjen."
          : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2
                className="text-xl font-black text-[#0F1F4B]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {tr.cart.title}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-medium">{tr.cart.empty}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex gap-4 bg-gray-50 rounded-xl p-4"
                    >
                      {/* Color swatch as thumbnail */}
                      <div
                        className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: item.selectedColor }}
                      >
                        <span
                          className="font-black text-xs tracking-wider"
                          style={{
                            color: item.selectedColor === "#FFFFFF" ? "#0F1F4B" : "#FFFFFF",
                            fontFamily: "Montserrat, sans-serif",
                          }}
                        >
                          TCC
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#0F1F4B] text-sm leading-tight">
                          {lang === "NO" ? item.product.nameNO : item.product.nameEN}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.selectedSize}</p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity - 1
                                )
                              }
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#0F1F4B] transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-semibold w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.selectedSize,
                                  item.selectedColor,
                                  item.quantity + 1
                                )
                              }
                              className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#0F1F4B] transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-bold text-[#0F1F4B] text-sm">
                            {(item.product.price * item.quantity).toLocaleString("nb-NO")} kr
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor
                          )
                        }
                        className="text-gray-300 hover:text-red-500 transition-colors self-start pt-0.5"
                        aria-label={tr.cart.remove}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100">
                {/* Totalt */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-semibold text-gray-600">{tr.cart.total}</span>
                  <span className="text-2xl font-black text-[#0F1F4B]">
                    {totalPrice.toLocaleString("nb-NO")} kr
                  </span>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-sm text-red-500 font-medium mb-3 text-center">{error}</p>
                )}

                {/* Checkout button */}
                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="btn-primary w-full text-base py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {lang === "NO" ? "Sender til betaling..." : "Redirecting..."}
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      {tr.cart.checkout}
                    </>
                  )}
                </button>

                {/* Stripe badge */}
                <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
                  <Lock size={11} />
                  {lang === "NO"
                    ? "Sikker betaling via Stripe"
                    : "Secure payment via Stripe"}
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
