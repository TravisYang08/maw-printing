import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { BRAND } from "@/data/brand";

const highlights = [
  "Premium Brother GTX Pro DTG printer from Japan",
  "Advanced 9-color DTF printer for vibrant, accurate prints",
  "MOQ from just 1 piece — no order too small",
  "Serving Thailand & Myanmar with fast turnaround",
  "Custom sourcing for brand owners and businesses",
];

export function AboutSection() {
  return (
    <section id="about" className="section-dark border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
          {/* Visual */}
          <div className="flex-1 w-full">
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/catalog/page-01.png"
                  alt="M.A.W Printing Studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 glass-strong rounded-2xl p-6 max-w-xs backdrop-blur-xl">
                <div className="text-3xl font-bold text-maw-gradient mb-1">1 pc</div>
                <p className="text-xs text-muted uppercase tracking-wider">Minimum Order</p>
                <p className="text-xs text-muted mt-2 leading-relaxed">
                  No quantity requirements — print exactly what you need.
                </p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1 space-y-6">
            <SectionHeading
              eyebrow="About Us"
              title={BRAND.fullName}
              description={`${BRAND.tagline}. We combine cutting-edge printing technology with premium blank garments to create products that stand out.`}
            />
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <Check size={16} className="text-maw-magenta mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.15em] text-maw-magenta hover:text-white transition-colors group"
            >
              Learn More
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
