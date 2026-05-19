"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { BRAND } from "@/data/brand";
import { useEffect, useState } from "react";

export function Hero() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(true), []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden border-b border-border">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_rgba(107,29,122,0.3)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,_rgba(209,32,138,0.15)_0%,_transparent_50%)]" />

      {/* Floating catalog preview */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block w-[45%] opacity-40">
        <div className="relative aspect-[16/9] rotate-2 animate-float">
          <Image
            src="/catalog/page-01.png"
            alt="M.A.W Catalog"
            fill
            className="object-cover rounded-2xl shadow-2xl"
            sizes="45vw"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-maw-purple/40 via-transparent to-maw-magenta/30" />
        </div>
        <div className="relative aspect-[16/9] -rotate-3 animate-float mt-[-30%] ml-[15%] w-[70%]" style={{ animationDelay: "2s" }}>
          <Image
            src="/catalog/page-04.png"
            alt="M.A.W Products"
            fill
            className="object-cover rounded-2xl shadow-2xl"
            sizes="35vw"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-bl from-maw-magenta/30 via-transparent to-maw-purple/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 md:px-6 md:py-40 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-maw-purple/30 bg-maw-purple/10 px-4 py-1.5 mb-8 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles size={14} className="text-maw-magenta" />
            <span className="text-xs uppercase tracking-[0.3em] text-maw-magenta">
              {BRAND.fullName}
            </span>
          </div>

          {/* Headline */}
          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Premium{" "}
            <span className="text-maw-gradient font-semibold">DTG & DTF</span>
            <br />
            printing for
            <br />
            modern brands
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-8 max-w-xl text-base md:text-lg leading-relaxed text-muted transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Professional garment printing with MOQ from 1 piece. Premium quality,
            vibrant colors, serving Thailand & Myanmar.
          </p>

          {/* CTAs */}
          <div
            className={`mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link href="/customize">
              <Button size="lg" className="group gap-2 text-base px-8 py-6 bg-maw-gradient hover:opacity-90 transition-all duration-300 hover:shadow-[0_0_40px_rgba(209,32,138,0.4)]">
                Start Customizing
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Button>
            </Link>
            <Link
              href="/#catalog"
              className="text-sm uppercase tracking-[0.2em] text-muted hover:text-white transition-colors duration-300"
            >
              View Catalog →
            </Link>
          </div>

          {/* Stats */}
          <div
            className={`mt-16 flex gap-8 md:gap-12 transition-all duration-700 delay-400 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              { value: "DTG + DTF", label: "Technology" },
              { value: "1 pc", label: "Minimum Order" },
              { value: "TH + MM", label: "Serving" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl md:text-2xl font-semibold text-maw-gradient">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
