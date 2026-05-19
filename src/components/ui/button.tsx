import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
        variant === "primary" &&
          "bg-maw-gradient text-white hover:opacity-90 active:scale-[0.98]",
        variant === "secondary" &&
          "bg-surface-elevated text-foreground border border-border hover:border-maw-magenta",
        variant === "ghost" &&
          "text-muted hover:text-foreground hover:bg-surface-elevated",
        variant === "outline" &&
          "border border-maw-magenta text-maw-magenta hover:bg-maw-magenta hover:text-white",
        size === "sm" && "px-4 py-2 text-xs uppercase",
        size === "md" && "px-6 py-3 text-sm uppercase",
        size === "lg" && "px-8 py-4 text-sm uppercase",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
