"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (productId: number, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
  isOpen: false,
  setIsOpen: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = useCallback((product: Product, size: string, color: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
    setIsOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number, size: string, color: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.selectedSize === size && i.selectedColor === color)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, size: string, color: string, qty: number) => {
      if (qty <= 0) {
        removeFromCart(productId, size, color);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.selectedSize === size && i.selectedColor === color
            ? { ...i, quantity: qty }
            : i
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
