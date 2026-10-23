"use client"

import { motion } from "framer-motion"
import { HudCard } from "../hud/hud-card"
import { TechTag } from "../hud/tech-tag"
import { CyberBadge } from "../hud/cyber-badge"
import { ExternalLink, Github, Terminal, ShieldAlert, Cpu, ShoppingCart, Award, Sparkles, Network } from "lucide-react"

interface ProjectData {
  id: string
  title: string
  subtitle: string
  category: string
  status: "active" | "standby" | "alert" | "encrypted"
  badgeLabel: string
  description: string
  metrics: { label: string; value: string }[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  accent: "green" | "cyan"
  icon: any
}

const projects: ProjectData[] = [
  {
    id: "sentimai",
    title: "SentimAI",
    subtitle: "AI Sentiment Analysis API & ML Classification Pipeline",
    category: "AI & BACKEND MICROSERVICES",
    status: "active",
    badgeLabel: "94.2% ML ACCURACY",
    description:
      "API REST de alto rendimiento que recibe reseñas, comentarios o tweets, aplicando un modelo de Data Science para clasificar sentimientos (Positivo, Neutro o Negativo) en JSON. Desarrollado con modelo de Regresión Logística y vectorización TF-IDF con umbral optimizado de 0.51 para priorizar comentarios críticos.",
    metrics: [
      { label: "PRECISIÓN MODELO", value: "94.2%" },
      { label: "UMBRAL NEGATIVOS", value: "0.51" },
      { label: "DESPLIEGUE CLOUD", value: "OCI + Docker" },
    ],
    tags: ["Java 21", "Spring Boot", "MySQL", "Redis", "Machine Learning", "TF-IDF", "React", "Docker", "OCI"],
    githubUrl: "https://github.com/MarioPerezHamm/sentiment-api-equipo39",
    accent: "green",
    icon: Cpu,
  },
  {
    id: "c2-pentest",
    title: "Command & Control (C2) System",
    subtitle: "Red Team & Pentesting Architecture with Multi-Agent Support",
    category: "CYBERSECURITY & NETWORKING",
    status: "encrypted",
    badgeLabel: "TLS 1.3 ENCRYPTED",
    description:
      "Sistema de Mando y Control (C2) funcional para prácticas controladas de ciberseguridad ofensiva (Red Team / Pentesting), desarrollado para el reto empresarial de ALIGO Defensores Informáticos. Integra cifrado TLS extremo a extremo, GUI de operador con gestión de múltiples agentes simultáneos, ejecución broadcast o dirigida y registro de auditoría.",
    metrics: [
      { label: "SEGURIDAD", value: "Cifrado TLS" },
      { label: "ARQUITECTURA", value: "Multi-Agente" },
      { label: "CONTAINER", value: "Docker Compose" },
    ],
    tags: ["Ciberseguridad", "Red Team", "TLS/SSL", "Python", "Multi-Agent", "Docker", "GNS3"],
    githubUrl: "https://github.com/MarioPerezHamm/Command-and-Control-C2-",
    accent: "cyan",
    icon: ShieldAlert,
  },
  {
    id: "tomasi",
    title: "Corporación TOMASI Backend",
    subtitle: "E-Commerce Infrastructure for Rural & Agricultural Producers",
    category: "ENTERPRISE BACKEND & PAYMENTS",
    status: "active",
    badgeLabel: "30+ REST ENDPOINTS",
    description:
      "Plataforma backend de comercio digital para productos artesanales y agrícolas de productores rurales colombianos. Arquitectura con Java 21 y Spring Boot conectada a PostgreSQL, implementando autenticación robusta, pasarela de pagos Wompi y administración de activos multimedia con Cloudinary.",
    metrics: [
      { label: "ENDPOINTS REST", value: "30+ Activos" },
      { label: "PASARELA", value: "Wompi Pay" },
      { label: "STORAGE", value: "Cloudinary" },
    ],
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "Wompi", "Cloudinary", "REST API", "Seguridad"],
    accent: "green",
    icon: ShoppingCart,
  },
  {
    id: "los-carlitos",
    title: "Los Carlitos MVP — Podio Hackathon",
    subtitle: "3.er Lugar // AI Marketing Predictive Leads Agent",
    category: "DATA ANALYTICS & RAPID AI",
    status: "active",
    badgeLabel: "3.er LUGAR PODIO",
    description:
      "MVP desarrollado en 8 horas récord para el Hackathon Talento Tech. Permite a agencias de marketing digital visualizar, predecir y entender el comportamiento de sus clientes mediante un agente conversacional interactivo asistido por IA (Gemini CLI) y modelos de Machine Learning entrenados para predecir viabilidad de proyectos.",
    metrics: [
      { label: "DESARROLLO", value: "8 Horas MVP" },
      { label: "PREMIO", value: "3.er Lugar Hackathon" },
      { label: "STACK IA", value: "Gemini CLI + ML" },
    ],
    tags: ["Machine Learning", "Gemini CLI", "Firebase", "Data Analytics", "Chatbot Agent", "Python"],
    accent: "cyan",
    icon: Award,
  },
  {
    id: "mb-nutrition",
    title: "MB Nutrition Labs Landing",
    subtitle: "High-Performance Pre-Sale Lead Engine Built with AI Agents",
    category: "WEB DEVELOPMENT & AGENTIC WORKFLOWS",
    status: "active",
    badgeLabel: "PRODUCCIÓN LIVE",
    description:
      "Landing page de preventa de alta conversión desarrollada para captar leads interesados en suplementos de proteína antes de su lanzamiento comercial. Desarrollada en 2 semanas utilizando herramientas asistidas por agentes (v0, Antigravity) e integraciones MCP con Spline, Figma, GCP y Composio.",
    metrics: [
      { label: "LEAD TIME", value: "2 Semanas" },
      { label: "HERRAMIENTAS", value: "Antigravity + MCP" },
      { label: "3D ASSETS", value: "Spline + Figma" },
    ],
    tags: ["React", "Antigravity", "MCP", "Spline 3D", "Figma", "GCP", "Composio"],
    liveUrl: "https://mbnutritionlabs.com",
    accent: "green",
    icon: Sparkles,
  },
  {
    id: "ftth-semillero",
    title: "Red FTTH & Streaming Telemático",
    subtitle: "Optical Fiber Telecom Infrastructure for Rural Community",
    category: "TELECOMMUNICATIONS & NETWORKS",
    status: "encrypted",
    badgeLabel: "SIMETRÍA GARANTIZADA",
    description:
      "Proyecto de investigación y grado en la Universidad del Quindío enfocado en el diseño, dimensionamiento y configuración de una red FTTH (Fibra hasta el Hogar) para 15 familias, asegurando distribución de internet y video streaming con ancho de banda simétrico y control de calidad de servicio.",
    metrics: [
      { label: "COBERTURA", value: "~15 Familias" },
      { label: "BANDA", value: "Simétrica 100%" },
      { label: "INFRAESTRUCTURA", value: "FTTH / QoS" },
    ],
    tags: ["FTTH", "Fibra Óptica", "Telefónica/Redes", "QoS", "GNS3", "Streaming", "Investigación"],
    accent: "cyan",
    icon: Network,
  },
]

export function ProjectsShowcase() {
  return (
    <section id="projects" className="py-24 relative z-10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
              <span className="text-primary/40">[02]</span>
              <span>// REPOSITORIO DE DESPLIEGUES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-mono font-bold text-white flex items-center gap-3">
              <span>PROYECTOS DESTACADOS</span>
              <span className="text-primary cyber-text-glow">.EXE</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>6 MÓDULOS ACTIVOS DE CV</span>
          </div>
        </div>

        {/* Projects 3D HUD Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, idx) => {
            const Icon = project.icon
            return (
              <HudCard
                key={project.id}
                accentColor={project.accent}
                className="flex flex-col justify-between group hover:-translate-y-1"
                headerTitle={project.category}
                statusTag={project.badgeLabel}
              >
                <div>
                  {/* Title & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded bg-slate-900 border border-primary/20 text-primary group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-slate-400">{project.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 font-mono text-xs sm:text-sm leading-relaxed my-4">
                    {project.description}
                  </p>

                  {/* Telemetry Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2 my-4 p-2.5 bg-slate-900/60 rounded border border-primary/10 text-center font-mono">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-[10px] text-slate-400 uppercase">{m.label}</div>
                        <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 mb-5">
                    {project.tags.map((tag) => (
                      <TechTag
                        key={tag}
                        name={tag}
                        variant={project.accent === "cyan" ? "cyan" : "primary"}
                      />
                    ))}
                  </div>
                </div>

                {/* Footer Uplinks */}
                <div className="pt-4 border-t border-primary/15 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-300 hover:text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>REPOSITORIO</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent hover:text-accent/80 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>VER SITIO</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[10px] text-slate-400">SYS_ID: 0{idx + 1}</span>
                </div>
              </HudCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
