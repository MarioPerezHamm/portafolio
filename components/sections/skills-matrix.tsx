"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BrainCircuit, Cloud, Code2, Database, Network, Server, Shield, type LucideIcon } from "lucide-react"
import { HudCard } from "../hud/hud-card"
import { TechTag } from "../hud/tech-tag"
import { SectionHeader } from "../ui/section-header"

interface SkillCategory {
  id: string
  title: string
  tagline: string
  icon: LucideIcon
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    title: "Lenguajes",
    tagline: "Base de programación",
    icon: Code2,
    skills: ["Java", "Python", "SQL", "JavaScript", "C / C++"],
  },
  {
    id: "backend",
    title: "Backend",
    tagline: "APIs y servicios",
    icon: Server,
    skills: ["Spring Boot", "Java 21", "APIs REST", "Autenticación y seguridad"],
  },
  {
    id: "databases",
    title: "Bases de datos",
    tagline: "Persistencia y caché",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "Redis"],
  },
  {
    id: "cloud",
    title: "Cloud y DevOps",
    tagline: "Contenedores y despliegue",
    icon: Cloud,
    skills: ["Docker", "OCI", "GCP", "Firebase", "Linux"],
  },
  {
    id: "security",
    title: "Ciberseguridad",
    tagline: "Seguridad ofensiva y cifrado",
    icon: Shield,
    skills: ["Red team / pentesting", "C2", "TLS", "SSH"],
  },
  {
    id: "ai",
    title: "IA / ML",
    tagline: "Modelos y lenguaje natural",
    icon: BrainCircuit,
    skills: ["Regresión logística", "TF-IDF", "LLMs", "Prompt Engineering", "Análisis de sentimientos"],
  },
  {
    id: "networks",
    title: "Redes y telecomunicaciones",
    tagline: "Formación de ingeniería",
    icon: Network,
    skills: ["Redes FTTH", "TCP/IP", "GNS3", "EVE-NG"],
  },
]

const ALL_TAB = "all"

const TAB_BASE = "rounded border px-3.5 py-2 transition-colors duration-200"
const TAB_ACTIVE = "border-primary bg-primary font-bold text-background"
const TAB_IDLE = "border-primary/25 bg-slate-900/70 text-slate-200 hover:border-primary/60"

export function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState(ALL_TAB)

  const visibleCategories =
    activeTab === ALL_TAB ? SKILL_CATEGORIES : SKILL_CATEGORIES.filter((category) => category.id === activeTab)

  const tabs = [{ id: ALL_TAB, title: "Todas" }, ...SKILL_CATEGORIES]

  return (
    <section id="skills" className="relative scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader index="03" kicker="Stack" title="Habilidades técnicas" suffix=".cfg" />

        <div
          role="group"
          aria-label="Filtrar habilidades por categoría"
          className="mb-8 flex flex-wrap gap-2 border-b border-primary/15 pb-5 font-mono text-xs uppercase tracking-wider"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`${TAB_BASE} ${isActive ? TAB_ACTIVE : TAB_IDLE}`}
              >
                {tab.title}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((category) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <HudCard headerTitle={category.title} className="h-full">
                    <div className="flex items-center gap-3">
                      <div className="rounded border border-primary/30 bg-slate-900 p-2 text-primary">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <p className="font-mono text-xs text-slate-400">{category.tagline}</p>
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={category.title}>
                      {category.skills.map((skill) => (
                        <li key={skill}>
                          <TechTag name={skill} variant="primary" className="py-1" />
                        </li>
                      ))}
                    </ul>
                  </HudCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
