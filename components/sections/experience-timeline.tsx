"use client"

import { HudCard } from "../hud/hud-card"
import { TechTag } from "../hud/tech-tag"
import { CyberBadge } from "../hud/cyber-badge"
import { Briefcase, Award, Calendar, CheckCircle2, Shield, Cpu, ExternalLink } from "lucide-react"

interface ExperienceItem {
  period: string
  role: string
  organization: string
  badge: string
  status: "active" | "standby" | "alert" | "encrypted"
  highlights: string[]
  tags: string[]
}

const experiences: ExperienceItem[] = [
  {
    period: "DIC 2025 — ACTUAL",
    role: "Analista de Requerimientos y Soluciones Digitales",
    organization: "Corporación TOMASI — Comercialización digital de productos rurales",
    badge: "ACTIVO // EN PRODUCCIÓN",
    status: "active",
    highlights: [
      "Estructuración de requerimientos funcionales y comerciales para productores artesanales y agrícolas.",
      "Desarrollo backend en equipo con Java 21, Spring Boot y PostgreSQL con más de 30 endpoints REST.",
      "Integración de pasarela de pagos Wompi y almacenamiento multimedia con Cloudinary.",
      "Presentación a Dirección de especificación técnica, arquitectura y seguridad.",
    ],
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "Wompi", "Cloudinary", "Arquitectura REST"],
  },
  {
    period: "2025",
    role: "Desarrollador — Sistema Command and Control (C2) Red Team",
    organization: "Hackathon TIC – Talento Tech (Reto ALIGO Defensores Informáticos)",
    badge: "PENTESTING LAB",
    status: "encrypted",
    highlights: [
      "Desarrollo de sistema C2 para prácticas de red team y pentesting con cifrado TLS punto a punto.",
      "Interfaz gráfica de operador con soporte multi-agente y ejecución de comandos remotos individuales o broadcast.",
      "Contenerización de la infraestructura mediante Docker.",
    ],
    tags: ["Ciberseguridad", "Red Team", "TLS/SSL", "Docker", "Multi-Agent"],
  },
  {
    period: "OCT 2026",
    role: "Desarrollador Web Freelance — Landing Page Preventa",
    organization: "MB Nutrition Labs (Proyecto Freelance)",
    badge: "AGENTS & MCP",
    status: "active",
    highlights: [
      "Desarrollo en 2 semanas de landing page de preventa para captación de leads comerciales antes del lanzamiento.",
      "Construcción utilizando v0 y Antigravity, integrando mediante MCP (Model Context Protocol) Spline, Figma, GCP (despliegue de servicios en Cloud Run) y Composio.",
    ],
    tags: ["Google Cloud (GCP)", "GCP Cloud Run", "Antigravity", "MCP", "v0", "Docker", "Spline 3D", "Figma", "Composio"],
  },
  {
    period: "DIC 2025 — ENE 2026",
    role: "Backend Developer & IA Aplicada — Proyecto SentimAI",
    organization: "Hackathon ONE II – Latam (Alura Latam & NoCountry) — Equipo 39",
    badge: "94.2% ML ACCURACY",
    status: "active",
    highlights: [
      "Diseño de API de clasificación de sentimientos en reseñas y tweets.",
      "Entrenamiento de modelo de Regresión Logística con TF-IDF alcanzando 94.2% de precisión (umbral 0.51).",
      "Backend con Spring Boot, MySQL y Redis para caché; microservicios contenerizados en Oracle Cloud (OCI).",
    ],
    tags: ["Java", "Spring Boot", "Machine Learning", "TF-IDF", "Redis", "OCI", "Docker"],
  },
  {
    period: "21 NOV 2025",
    role: "Analista de Datos e IA Aplicada — Equipo 'Los Carlitos'",
    organization: "Hackathon Talento Tech: Un encuentro de creación en la región 2",
    badge: "3.er LUGAR PODIO",
    status: "standby",
    highlights: [
      "MVP desarrollado en 8 horas para entender y predecir leads y comportamiento de clientes para agencias digitales.",
      "Agente conversacional con Gemini CLI y modelo de Machine Learning para predecir viabilidad de proyectos.",
      "Despliegue ágil en Firebase y obtención del 3.er lugar del certamen.",
    ],
    tags: ["Gemini CLI", "Machine Learning", "Firebase", "Python", "Data Analytics"],
  },
  {
    period: "AGO 2024 — OCT 2025",
    role: "Estudiante Investigador — Semillero & Proyecto de Grado",
    organization: "Universidad del Quindío",
    badge: "INGENIERÍA TELECOM",
    status: "encrypted",
    highlights: [
      "Implementación de servicios de internet y video streaming sobre red de fibra óptica FTTH para ~15 familias.",
      "Dimensionamiento de tráfico y configuración de red para asegurar ancho de banda simétrico de subida y bajada.",
    ],
    tags: ["Redes FTTH", "Fibra Óptica", "Telefónica/Redes", "Simulación", "QoS"],
  },
]

const certifications = [
  { name: "Oracle Cloud Infrastructure (OCI) Foundations Associate", org: "Oracle University", type: "Cloud & IAM" },
  { name: "Backend Developer", org: "Alura Latam (Programa ONE G9 / Oracle Next Education)", type: "Backend & Java" },
  { name: "Ciberseguridad Nivel Intermedio", org: "Talento Tech / MinTIC", type: "Security & Pentest" },
  { name: "Los bits y bytes de las redes informáticas", org: "Google", type: "Networking" },
  { name: "Aspectos básicos de la asistencia técnica", org: "Google", type: "IT Support" },
  { name: "Fundamentos de LLMs & Prompt Engineering", org: "Platzi", type: "AI & GenAI" },
  { name: "Automatizaciones con Make & Creación Web con v0", org: "Platzi", type: "Automation & Agents" },
  { name: "Supabase & Fundamentos de Python", org: "Platzi", type: "Data & Code" },
]

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 relative z-10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
              <span className="text-primary/40">[04]</span>
              <span>// HISTORIAL DE OPERACIONES & LOGS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-bold text-white flex items-center gap-3">
              <span>EXPERIENCIA & HITOS</span>
              <span className="text-primary cyber-text-glow">.LOG</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Calendar className="w-4 h-4 text-accent" />
            <span>TRAYECTORIA VERIFICADA 2024 — 2026</span>
          </div>
        </div>

        {/* Timeline Events */}
        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 md:before:left-8 before:w-0.5 before:bg-primary/20 before:z-0">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative z-10 pl-10 md:pl-16">
              {/* Timeline Node Point */}
              <div className="absolute left-2.5 md:left-6.5 top-5 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-primary shadow-[0_0_10px_#00FF66]" />

              <HudCard
                headerTitle={exp.period}
                statusTag={exp.badge}
                className="space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-bold font-mono text-white">
                    {exp.role}
                  </h3>
                  <span className="text-xs font-mono text-accent">
                    {exp.organization}
                  </span>
                </div>

                <ul className="space-y-1.5 pt-2 text-xs sm:text-sm font-mono text-slate-300">
                  {exp.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-primary/10">
                  {exp.tags.map((t) => (
                    <TechTag key={t} name={t} variant="primary" />
                  ))}
                </div>
              </HudCard>
            </div>
          ))}
        </div>

        {/* Certifications Matrix Grid */}
        <div className="mt-16 pt-12 border-t border-primary/20">
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-3">
            <Award className="w-4 h-4" />
            <span>// CREDENCIALES & CERTIFICACIONES OFICIALES</span>
          </div>
          <h3 className="text-2xl font-mono font-bold text-white mb-6">
            CERTIFICACIONES PROFESIONALES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
            {certifications.map((cert, cIdx) => (
              <div
                key={cIdx}
                className="p-4 rounded bg-[#0d1322]/80 border border-primary/15 hover:border-primary/40 transition-colors flex items-start gap-3"
              >
                <span className="text-primary mt-1 text-xs">✓</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">{cert.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="text-primary/70">{cert.org}</span>
                    <span>•</span>
                    <span className="text-accent text-[11px]">{cert.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
