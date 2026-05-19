import type { GarmentSize, Product, ProductSize } from "../schema";

type SizeRow = [
  GarmentSize,
  number,
  { chest?: string; length?: string; shoulder?: string; sleeve?: string; arm?: string },
];

export function toSizes(rows: SizeRow[]): ProductSize[] {
  return rows.map(([size, price, m]) => ({ size, price, ...m }));
}

export function productBase(
  partial: Omit<Product, "slug" | "style" | "notes"> & {
    name: string;
    id: string;
    style?: string;
    notes?: string[];
  }
): Product {
  return {
    ...partial,
    slug: partial.id,
    style: partial.style ?? "Round Neck - Plain T-Shirt",
    notes: partial.notes ?? [
      "Price shown is for 1 piece. For bulk garment orders, message us directly.",
    ],
  };
}
