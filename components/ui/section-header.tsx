import type { ReactNode } from "react"
import { Reveal } from "./reveal"

interface SectionHeaderProps {
  index: string
  kicker: string
  title: string
  suffix: string
  aside?: ReactNode
}

export function SectionHeader({ index, kicker, title, suffix, aside }: SectionHeaderProps) {
  return (
    <Reveal className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary">
          <span className="text-primary/60">[{index}]</span>
          <span>
            {"// "}
            {kicker}
          </span>
        </p>
        <h2 className="text-balance font-mono text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
          <span className="cyber-text-glow text-primary">{suffix}</span>
        </h2>
      </div>
      {aside && <div className="flex items-center gap-2 font-mono text-xs text-slate-400">{aside}</div>}
    </Reveal>
  )
}
