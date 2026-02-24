import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/services/products";
import { Header } from "@/components/Header";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ChevronLeft, Star } from "lucide-react";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await getProduct(parseInt(id));
    return {
      title: `${product.title} - StorePro`,
      description: product.description,
    };
  } catch {
    return {
      title: "Product - StorePro",
      description: "Product details",
    };
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const product = await getProduct(parseInt(id));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <Link
            href="/products"
            className="flex items-center gap-2 text-primary hover:underline mb-8"
          >
            <ChevronLeft size={20} />
            Back to Products
          </Link>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Image */}
            <div className="flex items-center justify-center rounded-lg border border-border bg-muted p-8 h-96">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                className="h-full w-auto object-contain"
                priority
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground capitalize mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

                {product.rating && (
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={
                            i < Math.round(product.rating!.rate)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating.rate}/5 ({product.rating.count} reviews)
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <AddToCartButton product={product} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
