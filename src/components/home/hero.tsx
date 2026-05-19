"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { BRAND } from "@/data/brand";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(107,29,122,0.25)_0%,_#050505_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32 lg:py-40">
        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-maw-magenta">
          {BRAND.fullName}
        </p>
        <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-muted">
          {BRAND.tagline} · {BRAND.taglineMm}
        </p>
        <h1 className="max-w-3xl text-4xl font-light leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
          <span className="text-maw-gradient font-semibold">modern</span>
          <br />
          apparel works
        </h1>
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          Premium DTG & DTF printing on tees, hoodies, polos, and oversized
          fits. MOQ from 1 piece — serving Thailand & Myanmar.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href="/customize">
            <Button size="lg" className="group gap-2">
              Start Customizing
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Button>
          </Link>
          <Link
            href="/#pricing"
            className="text-xs uppercase tracking-[0.2em] text-muted hover:text-maw-magenta transition"
          >
            View Pricing →
          </Link>
        </div>
      </div>
    </section>
  );
}
