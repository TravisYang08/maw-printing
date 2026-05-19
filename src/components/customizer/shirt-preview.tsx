"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { PRINT_POSITIONS, PRINT_SIZES } from "@/data/printing";
import type { GarmentCategory, PrintPositionCode, PrintSizeCode } from "@/data/schema";

const PRINT_SCALE: Record<PrintSizeCode, string> = {
  logo: "w-[12%] h-[12%]",
  a7: "w-[16%] h-[16%]",
  a6: "w-[20%] h-[20%]",
  a5: "w-[26%] h-[26%]",
  a4: "w-[32%] h-[32%]",
  a3: "w-[40%] h-[40%]",
  a2: "w-[48%] h-[48%]",
  a1: "w-[55%] h-[55%]",
};

const POSITION_STYLE: Record<PrintPositionCode, string> = {
  a: "top-[20%] left-[32%]",
  b: "top-[22%] left-1/2 -translate-x-1/2",
  c: "top-[30%] left-1/2 -translate-x-1/2",
  d: "top-[55%] right-[28%]",
  e: "top-[55%] left-[28%]",
  f: "top-[62%] left-1/2 -translate-x-1/2",
  g: "top-[18%] left-1/2 -translate-x-1/2",
  h: "top-[30%] left-1/2 -translate-x-1/2",
  i: "top-[55%] right-[28%]",
  j: "top-[55%] left-[28%]",
  k: "top-[62%] left-1/2 -translate-x-1/2",
  l: "top-[38%] left-[12%] -rotate-90",
  m: "top-[14%] left-[22%]",
  n: "top-[38%] right-[12%] rotate-90",
  o: "top-[14%] right-[22%]",
  p: "top-[8%] left-1/2 -translate-x-1/2",
};

interface ShirtPreviewProps {
  category: GarmentCategory;
  colorHex: string;
  printPosition: PrintPositionCode;
  printSize: PrintSizeCode;
  designUrl: string | null;
  view?: "front" | "back";
  className?: string;
}

function GarmentSilhouette({
  category,
  fill,
}: {
  category: GarmentCategory;
  fill: string;
}) {
  const stroke = fill === "#f5f5f5" || fill === "#f5f0e6" ? "#404040" : "#262626";

  if (category === "hoodie") {
    return (
      <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
        <path
          d="M70 45 Q100 20 130 45 L155 55 L175 95 L165 100 L155 75 L145 230 L55 230 L45 75 L35 100 L25 95 L45 55 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
        <ellipse cx="45" cy="130" rx="22" ry="35" fill={fill} stroke={stroke} strokeWidth="1.5" />
        <ellipse cx="155" cy="130" rx="22" ry="35" fill={fill} stroke={stroke} strokeWidth="1.5" />
      </svg>
    );
  }

  if (category === "polo") {
    return (
      <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
        <path
          d="M70 50 L85 70 L100 55 L115 70 L130 50 L150 60 L165 100 L155 105 L145 80 L145 230 L55 230 L55 80 L45 105 L35 100 L50 60 Z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
        />
        <path d="M85 70 L100 90 L115 70" fill="none" stroke={stroke} strokeWidth="1" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden>
      <path
        d="M65 55 L80 75 L100 60 L120 75 L135 55 L155 65 L170 105 L158 110 L148 85 L148 230 L52 230 L52 85 L42 110 L30 105 L45 65 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ShirtPreview({
  category,
  colorHex,
  printPosition,
  printSize,
  designUrl,
  view = "front",
  className,
}: ShirtPreviewProps) {
  const pos = PRINT_POSITIONS.find((p) => p.code === printPosition);
  const size = PRINT_SIZES.find((s) => s.code === printSize);
  const isBackPosition = pos?.side === "back";
  const showOnFront = view === "front" && !isBackPosition;
  const showOnBack = view === "back" && isBackPosition;
  const showPrint = designUrl && (showOnFront || showOnBack);

  return (
    <div
      className={cn(
        "relative aspect-[5/6] w-full max-w-sm mx-auto rounded-lg border border-border bg-surface-elevated p-6",
        className
      )}
    >
      <div className="relative h-full w-full">
        <GarmentSilhouette category={category} fill={colorHex} />
        {showPrint && (
          <div
            className={cn(
              "absolute z-10 overflow-hidden rounded-sm border border-white/20 bg-black/10",
              POSITION_STYLE[printPosition],
              PRINT_SCALE[printSize]
            )}
          >
            <Image
              src={designUrl}
              alt="Design preview"
              fill
              className="object-contain p-0.5"
              unoptimized
            />
          </div>
        )}
      </div>
      <p className="absolute bottom-3 left-0 right-0 text-center text-[10px] uppercase tracking-widest text-muted">
        {size?.label} · {pos?.shortLabel}
      </p>
    </div>
  );
}
