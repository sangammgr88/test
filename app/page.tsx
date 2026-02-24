import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Truck } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-card to-background">
          <div className="mx-auto max-w-7xl px-4 py-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-pretty">
                Welcome to StorePro
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                Discover a curated collection of premium products with fast
                shipping, secure checkout, and exceptional customer service.
              </p>
              <Link href="/products">
                <Button className="gap-2 px-8 py-6 text-lg">
                  Shop Now <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6">
                <Zap size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground">
                  Get your orders delivered quickly with our reliable shipping
                  partners worldwide.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <Shield size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Secure Checkout</h3>
                <p className="text-muted-foreground">
                  Shop with confidence using our secure payment system and
                  encryption technology.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <Truck size={32} className="text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                <p className="text-muted-foreground">
                  Not satisfied? Return your items hassle-free within 30 days
                  of purchase.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-card py-16">
          <div className="mx-auto max-w-7xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Browse our complete collection of products and find exactly what
              you're looking for.
            </p>
            <Link href="/products">
              <Button className="gap-2">
                View All Products <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 StorePro. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
