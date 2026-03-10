interface ExperienceLogProps {
  timestamp: string
  title: string
  organization: string
  description: string[]
  tags: string[]
}

export function ExperienceLog({
  timestamp,
  title,
  organization,
  description,
  tags,
}: ExperienceLogProps) {
  return (
    <div className="border-l-2 border-primary/40 pl-4 py-4 hover:border-primary transition-colors">
      <div className="text-primary/50 text-xs mb-1 font-mono">[{timestamp}]</div>
      <h3 className="text-primary font-bold text-lg terminal-glow">{title}</h3>
      <div className="text-primary/70 text-sm mb-3">{organization}</div>
      <ul className="space-y-1 mb-3">
        {description.map((item, index) => (
          <li key={index} className="text-primary/80 text-sm flex items-start gap-2">
            <span className="text-primary/50 mt-0.5">{">"}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs border border-primary/30 text-primary/70 bg-primary/5"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
