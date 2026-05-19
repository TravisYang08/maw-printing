/**
 * M.A.W Product Database Schema
 * All product data is typed against these interfaces — never hardcode in components.
 */

export type GarmentCategory =
  | "tshirt"
  | "hoodie"
  | "polo"
  | "oversized-tee"
  | "sweatshirt"
  | "baby-tee"
  | "pants"
  | "shorts"
  | "jacket"
  | "pullover"
  | "tote-bag"
  | "accessories";

export type GarmentFit =
  | "standard"
  | "oversized"
  | "boxy"
  | "baby-tee"
  | "superslim";

export type ShirtColorGroup = "white" | "color";

export type PrintMethod = "dtg" | "dtf";

export type PrintSizeCode =
  | "logo"
  | "a7"
  | "a6"
  | "a5"
  | "a4"
  | "a3"
  | "a2"
  | "a1";

export type PrintPositionCode =
  | "a" | "b" | "c" | "d" | "e" | "f"
  | "g" | "h" | "i" | "j" | "k"
  | "l" | "m" | "n" | "o" | "p";

export type GarmentSize =
  | "XS" | "S" | "M" | "L" | "XL"
  | "2XL" | "3XL" | "4XL" | "5XL" | "6XL";

/** Single color SKU within a product variant */
export interface ProductColor {
  id: string;
  code: string;
  name: string;
  hex: string;
  shirtGroup: ShirtColorGroup;
  minOrderQty?: number;
}

/** Size with measurements and unit price (Ks) */
export interface ProductSize {
  size: GarmentSize;
  price: number;
  chest?: string;
  length?: string;
  shoulder?: string;
  sleeve?: string;
  arm?: string;
}

/** One orderable product variant (fabric + fit + optional collection) */
export interface Product {
  id: string;
  slug: string;
  name: string;
  fabricName: string;
  collection?: string;
  category: GarmentCategory;
  fit: GarmentFit;
  style: string;
  material: string;
  gsm: string;
  mawRating?: number;
  description?: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  contactOnly?: boolean;
  notes?: string[];
  sourcePage?: number;
}

export interface PrintSizeSpec {
  code: PrintSizeCode;
  label: string;
  inch: string;
  cm: string;
}

export interface PrintPositionSpec {
  code: PrintPositionCode;
  label: string;
  shortLabel: string;
  side: "front" | "back" | "sleeve" | "neck";
}

export interface QuantityTier {
  minQty: number;
  discountPercent: number;
  label: string;
}

export interface DtgPrintPriceRow {
  size: PrintSizeCode;
  white: number | null;
  color: number | null;
  contactForPricing?: boolean;
}

export interface DtfPrintPriceRow {
  size: PrintSizeCode;
  price: number;
}

export interface PrintingMethodSpec {
  id: PrintMethod;
  name: string;
  fullName: string;
  description: string;
  equipment?: string;
  quantityTiers: QuantityTier[];
  printableOn: string[];
}

export interface BrandInfo {
  name: string;
  fullName: string;
  tagline: string;
  taglineMm: string;
  phone: string;
  email: string;
  location: string;
  social: string;
  currency: string;
  moqNote: string;
}

export interface ServiceSpec {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface CatalogMeta {
  version: string;
  extractedFrom: string;
  extractedAt: string;
  productCount: number;
  variantCount: number;
  colorCount: number;
  missingFields: string[];
}
