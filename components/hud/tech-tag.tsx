interface TechTagProps {
  name: string
  variant?: "primary" | "cyan" | "muted"
  className?: string
}

export function TechTag({
  name,
  variant = "primary",
  className = "",
}: TechTagProps) {
  const styles = {
    primary: "border-primary/30 text-primary/90 bg-primary/5 hover:border-primary/60 hover:bg-primary/10",
    cyan: "border-accent/30 text-accent/90 bg-accent/5 hover:border-accent/60 hover:bg-accent/10",
    muted: "border-slate-700 text-slate-300 bg-slate-800/40 hover:border-slate-500",
  }[variant]

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-mono tracking-wide rounded-sm border transition-colors duration-200 ${styles} ${className}`}
    >
      <span className="text-primary/40 mr-1 text-[10px]">#</span>
      {name}
    </span>
  )
}
