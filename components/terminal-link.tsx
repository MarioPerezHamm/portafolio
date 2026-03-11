import { LucideIcon } from "lucide-react"

interface TerminalLinkProps {
  href: string
  icon: LucideIcon
  label: string
  external?: boolean
}

export function TerminalLink({ href, icon: Icon, label, external = true }: TerminalLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-3 px-4 py-3 border border-primary/40 
                 bg-background hover:bg-primary hover:text-background
                 transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,255,65,0.5)]"
    >
      <Icon className="w-5 h-5" />
      <span className="font-mono text-sm">{label}</span>
      <span className="ml-auto text-primary/50 group-hover:text-background/50 text-xs">
        {"[ENTER]"}
      </span>
    </a>
  )
}
