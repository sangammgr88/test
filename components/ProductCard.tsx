"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Button } from "./ui/button";
import { useCart } from "@/lib/store/cart";
import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow h-full">
      <Link href={`/products/${product.id}`} className="group">
        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-md bg-muted flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="h-full w-full object-contain group-hover:scale-105 transition-transform"
            priority={false}
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1">
        <Link href={`/products/${product.id}`} className="group">
          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mb-3 capitalize">
          {product.category}
        </p>

        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.round(product.rating!.rate)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <div className="flex gap-2 mt-3">
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            className="w-16 px-2 py-1 text-sm border border-border rounded-md"
          />
          <Button
            onClick={handleAddToCart}
            className="flex-1 gap-2"
            variant={isAdded ? "default" : "outline"}
          >
            <ShoppingCart size={16} />
            {isAdded ? "Added!" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}
