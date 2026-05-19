import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-light tracking-tight">{title}</h2>
      {description && (
        <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
