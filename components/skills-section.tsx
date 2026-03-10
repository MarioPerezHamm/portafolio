import { TerminalSection } from "./terminal-section"
import { SkillCategory } from "./skill-category"

const skillCategories = [
  {
    name: "analisis_datos_ia",
    skills: [
      "Python",
      "Pandas",
      "NumPy",
      "Procesamiento de Lenguaje Natural (PLN)",
      "APIs de IA Generativa (Gemini)",
      "Analisis de Sentimientos",
    ],
  },
  {
    name: "desarrollo_backend",
    skills: [
      "FastAPI",
      "Java (Spring Boot)",
      "APIs REST",
      "JSON",
      "JWT",
    ],
  },
  {
    name: "infraestructura_tools",
    skills: [
      "Docker",
      "Oracle Cloud Infrastructure (OCI)",
      "Git/GitHub",
      "Linux (Ubuntu, Debian, Kali)",
      "Windows",
    ],
  },
  {
    name: "redes_telematica",
    skills: [
      "GNS3",
      "Oracle VM",
      "Redes de Datos",
      "FTTH",
    ],
  },
  {
    name: "bases_de_datos",
    skills: ["MySQL", "PostgreSQL", "SQL"],
  },
  {
    name: "ciberseguridad",
    skills: ["ISO 27001", "Proteccion de Sistemas"],
  },
  {
    name: "programacion_web",
    skills: ["JavaScript", "HTML5", "CSS"],
  },
]

export function SkillsSection() {
  return (
    <TerminalSection command="ls ./skills" id="skills">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category) => (
          <SkillCategory
            key={category.name}
            name={category.name}
            skills={category.skills}
          />
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-primary/20">
        <p className="text-primary/50 text-sm">
          {"// Total: "}{skillCategories.length}{" modulos | "}{skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)}{" skills cargados"}
        </p>
      </div>
    </TerminalSection>
  )
}
