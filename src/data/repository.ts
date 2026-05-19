/**
 * Product repository — single access layer for UI & pricing.
 */

import type {
  GarmentCategory,
  GarmentSize,
  Product,
  ProductColor,
} from "./schema";
import { ALL_PRODUCTS } from "./products";

/** Customizer UI tabs (4) → underlying catalog categories */
export const CUSTOMIZER_TABS: {
  tab: "tshirt" | "oversized-tee" | "hoodie" | "polo";
  label: string;
  categories: GarmentCategory[];
}[] = [
  { tab: "tshirt", label: "T-Shirt", categories: ["tshirt", "baby-tee"] },
  { tab: "oversized-tee", label: "Oversized Tee", categories: ["oversized-tee"] },
  { tab: "hoodie", label: "Hoodie", categories: ["hoodie"] },
  { tab: "polo", label: "Polo", categories: ["polo"] },
];

export function getAllProducts(): Product[] {
  return ALL_PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: GarmentCategory): Product[] {
  return ALL_PRODUCTS.filter((p) => p.category === category);
}

export function getProductsForCustomizerTab(
  tab: "tshirt" | "oversized-tee" | "hoodie" | "polo"
): Product[] {
  const group = CUSTOMIZER_TABS.find((t) => t.tab === tab);
  if (!group) return [];
  return ALL_PRODUCTS.filter((p) => group.categories.includes(p.category));
}

export function getCustomizableProducts(): Product[] {
  return ALL_PRODUCTS.filter((p) => !p.contactOnly);
}

export function getDefaultProduct(
  tab: "tshirt" | "oversized-tee" | "hoodie" | "polo"
): Product {
  const list = getProductsForCustomizerTab(tab).filter((p) => !p.contactOnly);
  if (list.length > 0) return list[0];
  const fallback = getProductsForCustomizerTab(tab);
  if (fallback.length > 0) return fallback[0];
  return ALL_PRODUCTS[0];
}

export function getProductColor(
  productId: string,
  colorId: string
): ProductColor | undefined {
  return getProductById(productId)?.colors.find((c) => c.id === colorId);
}

export function getGarmentPrice(productId: string, size: GarmentSize): number {
  const product = getProductById(productId);
  if (!product) return 0;
  const row = product.sizes.find((s) => s.size === size);
  return row?.price ?? 0;
}

export function getAvailableSizes(productId: string): GarmentSize[] {
  const product = getProductById(productId);
  if (!product) return ["M"];
  return product.sizes.map((s) => s.size);
}

export function getCatalogStats() {
  const products = ALL_PRODUCTS;
  const colorCount = products.reduce((n, p) => n + p.colors.length, 0);
  const withPricing = products.filter(
    (p) => !p.contactOnly && p.sizes.some((s) => s.price > 0)
  );
  return {
    totalProducts: products.length,
    customizableProducts: withPricing.length,
    contactOnlyProducts: products.filter((p) => p.contactOnly).length,
    totalColors: colorCount,
    categories: [...new Set(products.map((p) => p.category))],
  };
}
