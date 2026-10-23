"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HudCard } from "../hud/hud-card"
import { TechTag } from "../hud/tech-tag"
import { Terminal, Database, Cpu, Shield, Network, Code, Cloud } from "lucide-react"

interface SkillCategory {
  id: string
  title: string
  icon: any
  tagline: string
  skills: string[]
  level: string
}

const skillCategories: SkillCategory[] = [
  {
    id: "backend-cloud",
    title: "BACKEND & NUBE",
    icon: Cloud,
    tagline: "Arquitectura escalable, APIs REST y contenedores",
    level: "AVANZADO // EN PRODUCCIÓN",
    skills: [
      "Java 21",
      "Spring Boot",
      "Google Cloud Platform (GCP)",
      "GCP Cloud Run",
      "Docker & Containers",
      "Docker Compose",
      "Oracle Cloud (OCI)",
      "Express.js",
      "Supabase",
      "Firebase",
      "Redis (Caché)",
      "Wompi Payments",
      "Cloudinary",
      "Linux (Ubuntu, Debian, Kali)",
    ],
  },
  {
    id: "ai-data",
    title: "IA & CIENCIA DE DATOS",
    icon: Cpu,
    tagline: "Modelos predictivos, PLN y agentes autónomos",
    level: "ESPECIALIZADO // 94.2% ACC",
    skills: [
      "Machine Learning",
      "Regresión Logística",
      "Vectorización TF-IDF",
      "Análisis de Sentimientos",
      "LLMs (Large Language Models)",
      "Prompt Engineering",
      "Antigravity",
      "MCP (Model Context Protocol)",
      "Cursor",
      "Codex",
      "Claude Code",
      "OpenCode",
      "Windsurf",
      "Pandas & NumPy",
    ],
  },
  {
    id: "languages",
    title: "LENGUAJES & CODE",
    icon: Code,
    tagline: "Desarrollo tipado y programación a bajo nivel",
    level: "MULTILENGUAJE // NATIVO",
    skills: ["Java", "Python", "JavaScript", "C", "C++", "SQL", "TypeScript", "Bash Scripting"],
  },
  {
    id: "databases",
    title: "BASES DE DATOS",
    icon: Database,
    tagline: "Modelado relacional, consultas y persistencia",
    level: "ALTO RENDIMIENTO",
    skills: ["PostgreSQL", "MySQL", "Redis (In-Memory)", "Supabase", "Consultas Optimizadas", "Modelado E-R", "Transacciones ACID"],
  },
  {
    id: "networking",
    title: "REDES & VIRTUALIZACIÓN",
    icon: Network,
    tagline: "Infraestructura óptica y simulación avanzada",
    level: "INGENIERÍA ELECTRÓNICA",
    skills: [
      "Redes FTTH (Fibra hasta el Hogar)",
      "GNS3",
      "EVE-NG",
      "TCP/IP",
      "HTTP / HTTPS",
      "WebSockets",
      "DNS / FTP / SFTP",
      "Simulación de Topologías",
      "Ancho de Banda Simétrico",
    ],
  },
  {
    id: "cybersecurity",
    title: "CIBERSEGURIDAD",
    icon: Shield,
    tagline: "Pentesting, cifrado de tráfico y hardening",
    level: "NIVEL INTERMEDIO // DEFENSOR",
    skills: [
      "Red Team & Pentesting (C2)",
      "Cifrado TLS / SSL",
      "SSH Keys & Hardening",
      "Autenticación Segura (JWT/Auth)",
      "IAM (OCI Foundations)",
      "Fundamentos ISO 27001",
      "Análisis de Vulnerabilidades",
    ],
  },
]

export function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState<string>("all")

  const filteredCategories =
    activeTab === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeTab)

  const totalSkillsCount = skillCategories.reduce(
    (acc, curr) => acc + curr.skills.length,
    0
  )

  return (
    <section id="skills" className="py-24 relative z-10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
              <span className="text-primary/40">[03]</span>
              <span>// ARQUITECTURA DE COMPETENCIAS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-bold text-white flex items-center gap-3">
              <span>HABILIDADES TÉCNICAS</span>
              <span className="text-primary cyber-text-glow">.SYS</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-primary/70">
            <Terminal className="w-4 h-4 text-primary" />
            <span>{totalSkillsCount} MÓDULOS DE INGENIERÍA INDEXADOS</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-primary/15 font-mono text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded transition-all duration-200 border ${
              activeTab === "all"
                ? "bg-primary text-background border-primary font-bold shadow-[0_0_12px_rgba(0,255,102,0.4)]"
                : "bg-slate-900/60 text-slate-300 border-primary/20 hover:border-primary/50"
            }`}
          >
            [ TODOS LOS MÓDULOS ]
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3.5 py-1.5 rounded transition-all duration-200 border ${
                activeTab === cat.id
                  ? "bg-primary text-background border-primary font-bold shadow-[0_0_12px_rgba(0,255,102,0.4)]"
                  : "bg-slate-900/60 text-slate-300 border-primary/20 hover:border-primary/50"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <HudCard
                    headerTitle={cat.title}
                    statusTag={cat.level}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded bg-slate-900 border border-primary/30 text-primary">
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-mono text-slate-400">{cat.tagline}</p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {cat.skills.map((skill) => (
                          <TechTag key={skill} name={skill} variant="primary" />
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-6 border-t border-primary/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>INTEGRIDAD: 100%</span>
                      <span className="text-primary">{cat.skills.length} TECNOLOGÍAS</span>
                    </div>
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
