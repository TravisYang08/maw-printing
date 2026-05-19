import { SectionHeading } from "@/components/ui/section-heading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/data/brand";

export const metadata = {
  title: "About | M.A.W Printing",
  description:
    "Modern Apparel Works — Thailand-based DTG & DTF printing for Thailand and Myanmar.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
      <SectionHeading
        eyebrow="About Us"
        title={BRAND.fullName}
        description="Where luxury streetwear meets precision custom printing."
        className="mb-16"
      />

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            <strong className="text-foreground">{BRAND.fullName} (M.A.W)</strong>{" "}
            is a Thailand-based garment printing and manufacturing studio
            supporting brands in Thailand and Myanmar.
          </p>
          <p>
            We specialize in high-quality <strong className="text-foreground">DTG</strong>{" "}
            printing with a premium Brother GTX Pro printer from Japan, and{" "}
            <strong className="text-foreground">DTF</strong> printing with an
            advanced 9-color system (CMYK + RGBG + White) for vibrant, accurate
            results.
          </p>
          <p>
            Our minimum order is just <strong className="text-foreground">1 piece</strong>
            — perfect for personal custom orders, businesses, and young
            entrepreneurs building clothing brands. We also provide ready-made
            garments and sourcing support for custom production.
          </p>
          <p>
            Our goal is to be your{" "}
            <strong className="text-foreground">one-stop apparel partner</strong>
            — delivering quality, flexibility, and efficiency.
          </p>
        </div>

        <div className="border border-border bg-surface p-8 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-maw-magenta mb-2">
              Our Promise
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-maw-magenta">—</span>
                MOQ from 1 piece
              </li>
              <li className="flex gap-3">
                <span className="text-maw-magenta">—</span>
                Brother GTX Pro DTG · 9-color DTF
              </li>
              <li className="flex gap-3">
                <span className="text-maw-magenta">—</span>
                Live design preview before checkout
              </li>
              <li className="flex gap-3">
                <span className="text-maw-magenta">—</span>
                Transparent pricing in MM Kyat
              </li>
              <li className="flex gap-3">
                <span className="text-maw-magenta">—</span>
                Garment sourcing for growing brands
              </li>
            </ul>
          </div>
          <div className="border-t border-border pt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-muted mb-2">
              Location
            </p>
            <p className="text-sm text-muted">{BRAND.location}</p>
          </div>
          <Link href="/customize">
            <Button className="w-full">Start Your Order</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
