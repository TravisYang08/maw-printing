import { cn } from "@/lib/utils";

interface OptionGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function OptionGroup({ label, children, className }: OptionGroupProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="text-xs uppercase tracking-[0.2em] text-muted">{label}</p>
      {children}
    </div>
  );
}

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function OptionButton({
  selected,
  onClick,
  children,
  className,
}: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-3 py-2.5 text-xs uppercase tracking-wider transition-all",
        selected
          ? "border-maw-magenta bg-maw-magenta text-white"
          : "border-border text-muted hover:border-maw-purple hover:text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
