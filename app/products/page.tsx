import { Metadata } from "next";
import { getProducts, getCategories } from "@/lib/services/products";
import { FilterSidebar } from "@/components/FilterSidebar";
import { ProductCard } from "@/components/ProductCard";
import { Header } from "@/components/Header";
import { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "Products - StorePro",
  description: "Browse our collection of products",
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: "asc" | "desc";
    search?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  let products: Product[] = [];
  let categories: string[] = [];
  const itemsPerPage = 12;
  const currentPage = parseInt(params.page || "1");

  try {
    // Fetch categories and products (with fallback to mock data)
    categories = await getCategories();
    products = await getProducts(params.sort);

    // Apply client-side filters
    if (params.category) {
      products = products.filter(
        (p) => p.category.toLowerCase() === params.category?.toLowerCase()
      );
    }

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    if (params.minPrice) {
      const minPrice = parseFloat(params.minPrice);
      products = products.filter((p) => p.price >= minPrice);
    }

    if (params.maxPrice) {
      const maxPrice = parseFloat(params.maxPrice);
      products = products.filter((p) => p.price <= maxPrice);
    }
  } catch (error) {
    console.error("[v0] Error in products page:", error);
  }

  // Pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Our Products</h1>

          <div className="grid gap-8 md:grid-cols-4">
            {/* Sidebar */}
            <FilterSidebar categories={categories} />

            {/* Products Grid */}
            <div className="md:col-span-3">
              {paginatedProducts.length === 0 ? (
                <div className="flex items-center justify-center h-96 text-center">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">No products found</h2>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search criteria
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <a
                            key={page}
                            href={`?${new URLSearchParams({
                              ...Object.fromEntries(
                                Object.entries(params).filter(
                                  ([k]) => k !== "page"
                                )
                              ),
                              page: page.toString(),
                            }).toString()}`}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                              currentPage === page
                                ? "bg-primary text-primary-foreground"
                                : "border border-border hover:bg-muted"
                            }`}
                          >
                            {page}
                          </a>
                        )
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
