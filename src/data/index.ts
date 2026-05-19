/**
 * M.A.W Product Database — public API
 * @see src/data/schema.ts for types
 * @see src/data/CATALOG_MANIFEST.json for extraction metadata
 */

export * from "./schema";
export * from "./brand";
export * from "./printing";
export * from "./repository";
export * from "./color-utils";

// Re-export labels for backward compatibility
export { CATEGORY_LABELS } from "./products";
