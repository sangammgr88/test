import { apiCall } from "../api";
import { Product } from "../types";
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "../mockData";

export async function getProducts(
  sort?: "asc" | "desc"
): Promise<Product[]> {
  try {
    // Fetch all products without sort parameter to avoid API issues
    return await apiCall<Product[]>("/products");
  } catch (error) {
    console.error("[v0] Failed to fetch products from API, using mock data:", error);
    return MOCK_PRODUCTS;
  }
}

export async function getProduct(id: number): Promise<Product> {
  try {
    return await apiCall<Product>(`/products/${id}`);
  } catch (error) {
    console.error("[v0] Failed to fetch product from API, using mock data:", error);
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    if (!product) throw new Error(`Product ${id} not found`);
    return product;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    return await apiCall<string[]>("/products/categories");
  } catch (error) {
    console.error("[v0] Failed to fetch categories from API, using mock data:", error);
    return MOCK_CATEGORIES;
  }
}

export async function getProductsByCategory(
  category: string,
  sort?: "asc" | "desc"
): Promise<Product[]> {
  const endpoint = sort
    ? `/products/category/${category}?sort=${sort}`
    : `/products/category/${category}`;
  return apiCall<Product[]>(endpoint);
}
