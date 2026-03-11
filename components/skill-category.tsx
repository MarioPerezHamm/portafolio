import { Folder, FileCode } from "lucide-react"

interface SkillCategoryProps {
  name: string
  skills: string[]
}

export function SkillCategory({ name, skills }: SkillCategoryProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-primary">
        <Folder className="w-4 h-4" />
        <span className="font-bold">{name}/</span>
      </div>
      <div className="pl-6 space-y-1">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-2 text-primary/80 hover:text-primary transition-colors"
          >
            <FileCode className="w-3 h-3" />
            <span className="text-sm">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
