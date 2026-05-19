import type { BrandInfo, ServiceSpec } from "./schema";

export const BRAND: BrandInfo = {
  name: "M.A.W",
  fullName: "Modern Apparel Works",
  tagline: "Modern Garments for Modern People",
  taglineMm: "IN MM KYAT",
  phone: "+66 9 2299 5921",
  email: "hello@mawprinting.com",
  location: "Thailand · Serving Thailand & Myanmar",
  social: "MODERN APPAREL WORKS - M.A.W",
  currency: "Ks",
  moqNote: "MOQ starts from 1 piece for printing.",
};

export const SERVICES: ServiceSpec[] = [
  {
    id: "dtg",
    title: "Direct to Garment (DTG)",
    description:
      "Premium Brother GTX Pro DTG printer from Japan — high-quality full-color prints with a soft, smooth finish.",
    items: [
      "T-shirts",
      "Hoodies",
      "Jackets",
      "Sweatshirts",
      "Denim",
      "Cotton and cotton-blend garments",
    ],
  },
  {
    id: "dtf",
    title: "Direct to Film (DTF)",
    description:
      "Advanced 9-color DTF printer (CMYK + RGBG + White) for vibrant, accurate, eye-catching prints.",
    items: [
      "T-shirts",
      "Hoodies",
      "Sweatshirts",
      "Jackets",
      "Denim",
      "Tote bags",
      "Caps and accessories",
      "Cotton, polyester, and blended fabrics",
    ],
  },
  {
    id: "sourcing",
    title: "Garments & Sourcing",
    description:
      "Ready-to-print blank garments and manufacturer sourcing for custom production.",
    items: [
      "Ready-made T-shirts, hoodies, and garments",
      "Different colors, fits, and GSM options",
      "Pre-printed DTF transfer rolls",
      "Sourcing support for brand owners",
    ],
  },
];

export const BEYOND_BASICS_ITEMS = [
  "Hoodies",
  "Pullovers",
  "Jackets",
  "Sweatshirts",
  "Polo Shirts",
  "Shorts",
  "Pants",
  "Tote Bags",
];
