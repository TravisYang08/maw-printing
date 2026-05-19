"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shirt, Palette, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const categories = [
  {
    title: "T-Shirts & Tops",
    description: "Premium cotton tees, polos, and oversized fits — vibrant DTG prints with a soft finish.",
    icon: Shirt,
    pages: [4, 5, 6],
    href: "/customize",
  },
  {
    title: "Hoodies & Outerwear",
    description: "Cozy hoodies, sweatshirts, and jackets with durable DTF transfers that last.",
    icon: Sparkles,
    pages: [7, 8, 9],
    href: "/customize",
  },
  {
    title: "Full Collection",
    description: "Complete product range — from casual wear to accessories, all customizable.",
    icon: Palette,
    pages: [10, 11, 12],
    href: "/catalog",
  },
];

export function MaterialsShowcase() {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Materials & Products"
          title="Premium Quality, Endless Possibilities"
          description="From everyday tees to statement outerwear — every piece crafted with precision DTG and DTF technology."
          align="center"
          className="mb-16"
        />

        <div className="space-y-20">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={cat.title}
                className={`flex flex-col gap-8 md:gap-12 ${
                  isReversed ? "md:flex-row-reverse" : "md:flex-row"
                } items-center`}
              >
                {/* Image stack */}
                <div className="flex-1 w-full">
                  <div className="relative grid grid-cols-2 gap-3">
                    {cat.pages.map((page, i) => (
                      <div
                        key={page}
                        className={`relative ${
                          i === 0 ? "col-span-2 aspect-[16/7]" : "aspect-[4/5]"
                        } overflow-hidden rounded-2xl border border-border group cursor-pointer`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <Image
                          src={`/catalog/page-${String(page).padStart(2, "0")}.png`}
                          alt={`${cat.title} — preview ${i + 1}`}
                          fill
                          sizes={i === 0 ? "60vw" : "30vw"}
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl" />
                        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 group-hover:ring-maw-magenta/30 transition-all duration-400 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1 space-y-5">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-maw-purple/20 border border-maw-purple/30">
                    <Icon size={22} className="text-maw-magenta" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-muted leading-relaxed max-w-md">{cat.description}</p>
                  <Link
                    href={cat.href}
                    className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-maw-magenta hover:text-white transition-colors group/link"
                  >
                    Explore {cat.title.split(" ")[0]}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border glass hover:border-maw-magenta/30 transition-all duration-300 group"
          >
            <span className="text-sm uppercase tracking-[0.2em]">View Full Catalog</span>
            <ArrowRight size={16} className="text-maw-magenta transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
