"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/store/cart";
import { Button } from "./ui/button";
import { ShoppingCart, Check } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({
  product,
  className = "",
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <label className="font-semibold">Quantity:</label>
        <div className="flex items-center border border-border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-muted"
          >
            −
          </button>
          <span className="px-4 py-2 min-w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(10, quantity + 1))}
            className="px-3 py-2 hover:bg-muted"
          >
            +
          </button>
        </div>
      </div>

      <Button
        onClick={handleAddToCart}
        className="w-full gap-2 py-6 text-lg"
        variant={isAdded ? "default" : "default"}
      >
        {isAdded ? (
          <>
            <Check size={24} />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart size={24} />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
