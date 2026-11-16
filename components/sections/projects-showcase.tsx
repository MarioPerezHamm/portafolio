import {
  Award,
  Cpu,
  ExternalLink,
  Github,
  Network,
  ShieldAlert,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { HudCard } from "../hud/hud-card"
import { TechTag } from "../hud/tech-tag"
import { SectionHeader } from "../ui/section-header"

interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  badge: string
  description: string
  metrics: { label: string; value: string }[]
  tags: string[]
  githubUrl?: string
  liveUrl?: string
  liveLabel?: string
  accent: "green" | "cyan"
  icon: LucideIcon
}

const PROJECTS: Project[] = [
  {
    id: "c2",
    title: "Command & Control (C2)",
    subtitle: "Sistema C2 para red team y pentesting con soporte multi-agente",
    category: "Ciberseguridad",
    badge: "Cifrado TLS",
    description:
      "Sistema de Mando y Control para prácticas controladas de seguridad ofensiva, desarrollado para el reto de ALIGO Defensores Informáticos. Comunicación cifrada con TLS, interfaz de operador para gestionar varios agentes a la vez, ejecución de comandos dirigida o en broadcast y registro de auditoría.",
    metrics: [
      { label: "Seguridad", value: "Cifrado TLS" },
      { label: "Arquitectura", value: "Multi-agente" },
      { label: "Despliegue", value: "Docker" },
    ],
    tags: ["Red team", "Pentesting", "C2", "TLS", "Python", "Docker"],
    githubUrl: "https://github.com/MarioPerezHamm/Command-and-Control-C2-",
    accent: "cyan",
    icon: ShieldAlert,
  },
  {
    id: "sentimai",
    title: "SentimAI",
    subtitle: "API de análisis de sentimientos con modelo de Machine Learning",
    category: "IA + Backend",
    badge: "94.2% de precisión",
    description:
      "API REST que recibe reseñas, comentarios o tweets y los clasifica como positivos, neutros o negativos. El modelo combina Regresión Logística con vectorización TF-IDF y un umbral de 0.51 para priorizar los comentarios críticos.",
    metrics: [
      { label: "Precisión", value: "94.2%" },
      { label: "Umbral", value: "0.51" },
      { label: "Despliegue", value: "OCI + Docker" },
    ],
    tags: ["Java 21", "Spring Boot", "MySQL", "Redis", "TF-IDF", "Regresión logística", "Docker", "OCI"],
    githubUrl: "https://github.com/MarioPerezHamm/sentiment-api-equipo39",
    accent: "green",
    icon: Cpu,
  },
  {
    id: "mb-nutrition",
    title: "MB Nutrition Labs",
    subtitle: "Landing page de preventa para captación de leads",
    category: "Freelance · Web",
    badge: "En producción",
    description:
      "Landing page de preventa desarrollada como proyecto freelance para captar interesados en suplementos de proteína antes del lanzamiento comercial. Construida en dos semanas con herramientas asistidas por agentes e integraciones MCP.",
    metrics: [
      { label: "Tipo", value: "Freelance" },
      { label: "Entrega", value: "2 semanas" },
      { label: "Cloud", value: "GCP" },
    ],
    tags: ["React", "GCP", "MCP", "Figma", "Spline"],
    liveUrl: "https://mbnutritionlabs.com",
    liveLabel: "mbnutritionlabs.com",
    accent: "green",
    icon: Sparkles,
  },
  {
    id: "tomasi",
    title: "Corporación TOMASI",
    subtitle: "Backend de e-commerce para productores rurales",
    category: "Backend",
    badge: "~30 endpoints REST",
    description:
      "Backend de la plataforma de comercio digital para productos artesanales y agrícolas de productores rurales colombianos. Construido con Java 21, Spring Boot y PostgreSQL, con autenticación, pagos con Wompi y gestión de imágenes con Cloudinary.",
    metrics: [
      { label: "API", value: "~30 endpoints" },
      { label: "Pagos", value: "Wompi" },
      { label: "Base de datos", value: "PostgreSQL" },
    ],
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "Wompi", "Cloudinary", "API REST"],
    accent: "cyan",
    icon: ShoppingCart,
  },
  {
    id: "los-carlitos",
    title: "Los Carlitos",
    subtitle: "MVP de analítica y predicción de leads para agencias",
    category: "Hackathon Talento Tech",
    badge: "3.er lugar",
    description:
      "MVP construido en 8 horas durante el Hackathon Talento Tech. Ayuda a agencias de marketing digital a visualizar y predecir el comportamiento de sus clientes con un agente conversacional y un modelo de Machine Learning que estima la viabilidad de los proyectos.",
    metrics: [
      { label: "Resultado", value: "3.er lugar" },
      { label: "Desarrollo", value: "8 horas" },
      { label: "Despliegue", value: "Firebase" },
    ],
    tags: ["Machine Learning", "Python", "Firebase", "Agente conversacional"],
    accent: "green",
    icon: Award,
  },
  {
    id: "ftth",
    title: "Red FTTH y streaming",
    subtitle: "Proyecto de grado en la Universidad del Quindío",
    category: "Telecomunicaciones",
    badge: "Proyecto de grado",
    description:
      "Diseño, dimensionamiento y configuración de una red de fibra hasta el hogar para unas 15 familias, con servicio de internet y video streaming sobre ancho de banda simétrico.",
    metrics: [
      { label: "Cobertura", value: "~15 familias" },
      { label: "Ancho de banda", value: "Simétrico" },
      { label: "Tecnología", value: "FTTH" },
    ],
    tags: ["FTTH", "Fibra óptica", "QoS", "Streaming"],
    accent: "cyan",
    icon: Network,
  },
]

const LINK_CLASSES =
  "inline-flex items-center gap-2 rounded border px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-200"

export function ProjectsShowcase() {
  return (
    <section id="projects" className="relative scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader
          index="02"
          kicker="Repositorios y despliegues"
          title="Proyectos destacados"
          suffix=".exe"
          aside={<span>{PROJECTS.length} proyectos</span>}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {PROJECTS.map((project) => {
            const Icon = project.icon
            const isCyan = project.accent === "cyan"
            return (
              <HudCard
                key={project.id}
                accentColor={project.accent}
                className="group flex flex-col"
                headerTitle={project.category}
                statusTag={project.badge}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`rounded border bg-slate-900 p-2.5 ${
                      isCyan ? "border-accent/30 text-accent" : "border-primary/30 text-primary"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-mono text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
                    <p className="font-mono text-xs leading-relaxed text-slate-400">{project.subtitle}</p>
                  </div>
                </div>

                <p className="mt-4 font-mono text-sm leading-relaxed text-slate-300">{project.description}</p>

                <dl className="mt-4 grid grid-cols-3 gap-2 rounded border border-primary/10 bg-slate-900/60 p-3 text-center font-mono">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col gap-1">
                      <dt className="text-xs text-slate-400">{metric.label}</dt>
                      <dd className="text-xs font-bold text-white sm:text-sm">{metric.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`Tecnologías de ${project.title}`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <TechTag name={tag} variant={isCyan ? "cyan" : "primary"} />
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${LINK_CLASSES} border-primary/40 bg-primary/10 text-primary hover:bg-primary hover:text-background`}
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      <span>Ver repositorio</span>
                      <span className="sr-only">de {project.title} en GitHub (se abre en una pestaña nueva)</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${LINK_CLASSES} border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-background`}
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span>{project.liveLabel ?? "Ver sitio"}</span>
                      <span className="sr-only">(se abre en una pestaña nueva)</span>
                    </a>
                  )}
                  {!project.githubUrl && !project.liveUrl && (
                    <span className="font-mono text-xs text-slate-400">Sin enlace público</span>
                  )}
                </div>
              </HudCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
