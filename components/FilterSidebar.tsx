"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface FilterSidebarProps {
  categories: string[];
}

export function FilterSidebar({ categories }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort");

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get("category") === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(type === "min" ? "minPrice" : "maxPrice", value);
    } else {
      params.delete(type === "min" ? "minPrice" : "maxPrice");
    }
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  const handleSortChange = (sortValue: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams);
    if (params.get("sort") === sortValue) {
      params.delete("sort");
    } else {
      params.set("sort", sortValue);
    }
    params.delete("page");
    router.push(`/products?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push("/products");
  };

  const hasActiveFilters = selectedCategory || minPrice || maxPrice || sort;

  return (
    <aside className="w-full md:w-64 space-y-6">
      {/* Sort */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Sort by Price</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="asc"
              checked={sort === "asc"}
              onChange={() => handleSortChange("asc")}
              className="w-4 h-4"
            />
            <span className="text-sm">Low to High</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sort"
              value="desc"
              checked={sort === "desc"}
              onChange={() => handleSortChange("desc")}
              className="w-4 h-4"
            />
            <span className="text-sm">High to Low</span>
          </label>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice || ""}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            className="w-full px-2 py-2 text-sm border border-border rounded-md"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice || ""}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            className="w-full px-2 py-2 text-sm border border-border rounded-md"
          />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          onClick={handleClearFilters}
          variant="outline"
          className="w-full gap-2"
        >
          <X size={16} />
          Clear Filters
        </Button>
      )}
    </aside>
  );
}
