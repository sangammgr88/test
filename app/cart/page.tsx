"use client";

import { Header } from "@/components/Header";
import { useCart } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";
import { useAuth } from "@/lib/store/auth";

export default function CartPage() {
  const cartItems = useCart((state) => state.items);
  const total = useCart((state) => state.total);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const { isAuthenticated } = useAuth();

  if (!cartItems.length) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="flex flex-col items-center justify-center min-h-96">
              <ShoppingBag size={64} className="text-muted-foreground mb-4" />
              <h1 className="text-3xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground mb-6">
                Start shopping to add items to your cart
              </p>
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-lg border border-border bg-card p-4"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-md flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={96}
                        height={96}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.id}`}
                        className="text-lg font-semibold hover:text-primary transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-sm text-muted-foreground capitalize mb-2">
                        {item.category}
                      </p>
                      <p className="text-lg font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-col items-end gap-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 hover:bg-muted"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 min-w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 hover:bg-muted"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Subtotal
                        </p>
                        <p className="text-lg font-bold">
                          $
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-destructive hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="rounded-lg border border-border bg-card p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6 text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">
                  ${(total * 1.1).toFixed(2)}
                </span>
              </div>

              {isAuthenticated ? (
                <Button className="w-full">Proceed to Checkout</Button>
              ) : (
                <Link href="/login" className="block">
                  <Button className="w-full">Login to Checkout</Button>
                </Link>
              )}

              <Link href="/products">
                <Button variant="outline" className="w-full mt-2">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
