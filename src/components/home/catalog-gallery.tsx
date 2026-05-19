"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const TOTAL_PAGES = 22;

const catalogPages = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  src: `/catalog/page-${String(i + 1).padStart(2, "0")}.png`,
  alt: `M.A.W Catalog — Page ${i + 1}`,
  id: i + 1,
}));

export function CatalogGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Set<number>>(new Set());

  const open = (id: number) => setLightbox(id);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => {
    setLightbox((prev) => (prev ? (prev === 1 ? TOTAL_PAGES : prev - 1) : null));
  }, []);
  const next = useCallback(() => {
    setLightbox((prev) => (prev ? (prev === TOTAL_PAGES ? 1 : prev + 1) : null));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  return (
    <section id="catalog" className="section-dark border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Full Catalog"
          title="Explore Our Collection"
          description="Browse through our complete catalog — 22 pages of premium printing samples, materials, and inspiration."
          align="center"
          className="mb-16"
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {catalogPages.map((page, i) => (
            <button
              key={page.id}
              type="button"
              onClick={() => open(page.id)}
              className="group relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-surface-elevated cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-maw-magenta"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Image
                src={page.src}
                alt={page.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-cover transition-all duration-700 group-hover:scale-110 ${
                  loaded.has(page.id) ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setLoaded((s) => new Set(s).add(page.id))}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-between p-4">
                <span className="text-xs font-medium text-white">Page {page.id}</span>
                <ZoomIn size={16} className="text-white" />
              </div>
              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 group-hover:ring-maw-magenta/40 transition-all duration-400 pointer-events-none" />
              {/* Shimmer loading */}
              {!loaded.has(page.id) && (
                <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface-elevated to-surface animate-shimmer bg-[length:200%_100%]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={close}
        >
          {/* Close */}
          <button
            type="button"
            onClick={close}
            className="absolute top-6 right-6 z-10 p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Page counter */}
          <div className="absolute top-6 left-6 z-10 text-sm text-white/60">
            {lightbox} / {TOTAL_PAGES}
          </div>

          {/* Prev */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 z-10 p-3 text-white/60 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
          <div
            className="relative w-full max-w-6xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={`/catalog/page-${String(lightbox).padStart(2, "0")}.png`}
                alt={`Catalog page ${lightbox}`}
                fill
                sizes="90vw"
                className="object-contain animate-scale-in"
                priority
              />
            </div>
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 z-10 p-3 text-white/60 hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight size={36} />
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[90vw] overflow-x-auto pb-2">
            {catalogPages.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={(e) => { e.stopPropagation(); setLightbox(page.id); }}
                className={`relative w-14 h-10 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  page.id === lightbox
                    ? "border-maw-magenta scale-110"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={page.src}
                  alt={`Thumbnail ${page.id}`}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
