/**
 * Run: npx tsx scripts/validate-catalog.ts
 * Validates product database integrity.
 */
import { ALL_PRODUCTS } from "../src/data/products";
import { getCatalogStats } from "../src/data/repository";
import { PRINT_POSITIONS, PRINT_SIZES, PRINTING_METHODS } from "../src/data/printing";

const stats = getCatalogStats();
const issues: string[] = [];

for (const p of ALL_PRODUCTS) {
  if (!p.colors.length) issues.push(`${p.id}: no colors`);
  if (!p.sizes.length) issues.push(`${p.id}: no sizes`);
  if (!p.contactOnly && !p.sizes.some((s) => s.price > 0)) {
    issues.push(`${p.id}: no positive prices`);
  }
  for (const c of p.colors) {
    if (!c.hex) issues.push(`${p.id}/${c.id}: missing hex`);
  }
}

console.log("=== M.A.W Catalog Validation ===\n");
console.log("Products:", stats.totalProducts);
console.log("Customizable:", stats.customizableProducts);
console.log("Contact-only:", stats.contactOnlyProducts);
console.log("Color variants:", stats.totalColors);
console.log("Print layouts:", PRINT_POSITIONS.length);
console.log("Print sizes:", PRINT_SIZES.length);
console.log("Print methods:", PRINTING_METHODS.length);
console.log("\nCategories:", stats.categories.join(", "));

if (issues.length) {
  console.log("\nIssues:", issues.length);
  issues.forEach((i) => console.log(" -", i));
  process.exit(1);
}

console.log("\n✓ All checks passed");
