interface TerminalSectionProps {
  command: string
  children: React.ReactNode
  id?: string
}

export function TerminalSection({ command, children, id }: TerminalSectionProps) {
  return (
    <section id={id} className="py-12 md:py-16">
      <div className="terminal-border p-4 md:p-6 bg-secondary/30">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/20">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" aria-hidden="true" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" aria-hidden="true" />
          </div>
          <span className="text-primary/60 text-sm ml-2">terminal</span>
        </div>
        <div className="mb-4">
          <span className="text-primary/70">{">"}</span>
          <span className="text-primary font-bold ml-2 terminal-glow">{command}</span>
        </div>
        <div className="pl-4 border-l border-primary/20">{children}</div>
      </div>
    </section>
  )
}
