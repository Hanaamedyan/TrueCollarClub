"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import type { Product } from "@/lib/products";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { tr, lang } = useLang();
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const name = lang === "NO" ? product.nameNO : product.nameEN;
  const desc = lang === "NO" ? product.descNO : product.descEN;

  function handleAdd() {
    if (!product.inStock) return;
    addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(15,31,75,0.10)] card-hover flex flex-col">
      {/* Image area */}
      <div
        className="relative h-56 flex items-center justify-center"
        style={{ backgroundColor: selectedColor, opacity: 0.9 }}
      >
        <div className="text-center px-6">
          <p
            className="font-black text-3xl tracking-wider"
            style={{
              color: selectedColor === "#FFFFFF" ? "#0F1F4B" : "#FFFFFF",
              fontFamily: "Montserrat, sans-serif",
              textShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            TCC
          </p>
        </div>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-black uppercase tracking-wider rounded-full ${
              product.badge === "new"
                ? "bg-[#F59E0B] text-[#0F1F4B]"
                : "bg-[#0F1F4B] text-white"
            }`}
          >
            {product.badge === "new" ? tr.featured.new : tr.featured.bestseller}
          </span>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="font-bold text-gray-500">{tr.shop.outOfStock}</span>
          </div>
        )}

        {/* Color swatches */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-5 h-5 rounded-full border-2 transition-transform ${
                selectedColor === color
                  ? "border-[#F59E0B] scale-125"
                  : "border-white/60"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Color ${color}`}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-[#0F1F4B] text-base leading-tight mb-1" style={{ fontFamily: "Montserrat, sans-serif" }}>
          {name}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 flex-1">{desc}</p>

        {/* Size selector */}
        {product.sizes.length > 1 && (
          <div className="mb-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
              {tr.shop.size}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-colors ${
                    selectedSize === size
                      ? "bg-[#0F1F4B] text-white border-[#0F1F4B]"
                      : "border-gray-200 text-gray-600 hover:border-[#0F1F4B]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-xl font-black text-[#0F1F4B]">
            {product.price.toLocaleString("nb-NO")} kr
          </span>
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              added
                ? "bg-green-500 text-white"
                : product.inStock
                ? "bg-[#0F1F4B] text-white hover:bg-[#162969] hover:-translate-y-0.5"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {added ? (
              <>
                <Check size={15} />
                OK!
              </>
            ) : (
              <>
                <ShoppingCart size={15} />
                {product.inStock ? tr.shop.addToCart : tr.shop.outOfStock}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
