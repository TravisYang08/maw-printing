import type { ProductColor, ShirtColorGroup } from "./schema";

/** Approximate hex from catalog color names (PDF has no hex codes) */
const NAME_TO_HEX: Record<string, string> = {
  white: "#f5f5f5",
  black: "#0a0a0a",
  cream: "#f5f0e6",
  grey: "#9ca3af",
  gray: "#9ca3af",
  "light grey": "#d1d5db",
  "dark grey": "#4b5563",
  "cement grey": "#9ca3af",
  beige: "#d4c4a8",
  brown: "#5c4033",
  "dark brown": "#3d2914",
  khaki: "#c4b59a",
  navy: "#1e3a5f",
  "navy blue": "#1e3a5f",
  red: "#c41e3a",
  maroon: "#800020",
  pink: "#e8a0bf",
  "light pink": "#fbcfe8",
  "barbie pink": "#ff69b4",
  orange: "#f97316",
  yellow: "#facc15",
  mustard: "#d4a017",
  "honey mustard": "#c9a227",
  green: "#22c55e",
  "mint green": "#86efac",
  "olive green": "#6b705c",
  blue: "#3b82f6",
  "sky blue": "#87ceeb",
  "royal blue": "#2563eb",
  purple: "#9333ea",
  "acid wash": "#3d3d3d",
  "vintage black": "#2a2a2a",
  "vintage grey": "#6b7280",
  "bleached black": "#2d2d2d",
  "bleached grey": "#8b8b8b",
  "bleached brown": "#5c4033",
  "bleached red": "#7f1d1d",
  "bleached pink": "#ec4899",
  "bleached green": "#65a30d",
  "bleached apricot": "#fdba74",
  "bleached purple": "#a78bfa",
  "acid galaxy": "#0a0a0a",
  "acid dot": "#1a1a1a",
  "vintage gradient": "#6b7280",
};

export function inferHexFromName(name: string): string {
  const key = name.toLowerCase().trim();
  if (NAME_TO_HEX[key]) return NAME_TO_HEX[key];
  for (const [k, v] of Object.entries(NAME_TO_HEX)) {
    if (key.includes(k)) return v;
  }
  return "#6b7280";
}

export function inferShirtGroup(name: string): ShirtColorGroup {
  const n = name.toLowerCase();
  if (n === "white" || n === "off-white" || n.includes("off white")) {
    return "white";
  }
  return "color";
}

export function buildColor(
  code: string,
  name: string,
  opts?: { minOrderQty?: number; hex?: string; shirtGroup?: ShirtColorGroup }
): ProductColor {
  return {
    id: code.toLowerCase(),
    code,
    name,
    hex: opts?.hex ?? inferHexFromName(name),
    shirtGroup: opts?.shirtGroup ?? inferShirtGroup(name),
    minOrderQty: opts?.minOrderQty,
  };
}
