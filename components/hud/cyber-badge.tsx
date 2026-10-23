"use client"

interface CyberBadgeProps {
  label: string
  status?: "active" | "standby" | "alert" | "encrypted"
  className?: string
}

export function CyberBadge({
  label,
  status = "active",
  className = "",
}: CyberBadgeProps) {
  const statusStyles = {
    active: {
      dot: "bg-primary shadow-[0_0_8px_#00FF66]",
      text: "text-primary border-primary/30 bg-primary/10",
    },
    standby: {
      dot: "bg-accent shadow-[0_0_8px_#00E5FF]",
      text: "text-accent border-accent/30 bg-accent/10",
    },
    alert: {
      dot: "bg-amber-400 shadow-[0_0_8px_#f59e0b]",
      text: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    },
    encrypted: {
      dot: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
      text: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
    },
  }[status]

  return (
    <span
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded text-[11px] font-mono tracking-widest uppercase border ${statusStyles.text} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${statusStyles.dot}`} />
      <span>{label}</span>
    </span>
  )
}
