import { SectionHeading } from "@/components/ui/section-heading";
import { BEYOND_BASICS_ITEMS } from "@/data/brand";
import Link from "next/link";

export function BeyondBasics() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Catalog"
          title="Beyond the Basics"
          description="More apparel options available upon request. Custom orders with your preferred designs, fits, and measurements."
          align="center"
          className="mb-12"
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {BEYOND_BASICS_ITEMS.map((item) => (
            <div
              key={item}
              className="border border-border px-4 py-6 text-center text-xs uppercase tracking-widest hover:border-maw-magenta transition"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted">
          <Link href="/contact" className="text-maw-magenta hover:underline">
            Message us
          </Link>{" "}
          for full catalog & budget-based options.
        </p>
      </div>
    </section>
  );
}
