import type { GarmentCategory, Product } from "../schema";
import { semiCombed32Products } from "./semi-combed-32";
import { combedCottonProducts } from "./combed-cotton-lines";
import { premiumLineProducts } from "./premium-lines";
import { contactCatalogProducts, CATEGORY_LABELS } from "./contact-catalog";

/** Master product database — append new product files here */
export const ALL_PRODUCTS: Product[] = [
  ...semiCombed32Products,
  ...combedCottonProducts,
  ...premiumLineProducts,
  ...contactCatalogProducts,
];

export { CATEGORY_LABELS };
