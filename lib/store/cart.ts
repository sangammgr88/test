"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "../types";

interface CartStore {
  items: CartItem[];
  total: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      addToCart: (product: Product, quantity: number) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [
              ...state.items,
              {
                ...product,
                quantity,
              },
            ];
          }

          const total = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return { items: newItems, total };
        });
      },

      removeFromCart: (productId: number) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== productId);
          const total = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
          return { items: newItems, total };
        });
      },

      updateQuantity: (productId: number, quantity: number) => {
        set((state) => {
          let newItems: CartItem[];
          if (quantity <= 0) {
            newItems = state.items.filter((item) => item.id !== productId);
          } else {
            newItems = state.items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            );
          }

          const total = newItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return { items: newItems, total };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      },

      calculateTotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
