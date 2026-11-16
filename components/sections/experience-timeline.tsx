import { Award, Calendar, Check } from "lucide-react"
import { HudCard } from "../hud/hud-card"
import { TechTag } from "../hud/tech-tag"
import { Reveal } from "../ui/reveal"
import { SectionHeader } from "../ui/section-header"

interface Experience {
  period: string
  role: string
  organization: string
  badge: string
  highlights: string[]
  tags: string[]
}

const EXPERIENCES: Experience[] = [
  {
    period: "Dic 2025 — Actual",
    role: "Analista de requerimientos y desarrollo backend",
    organization: "Corporación TOMASI · E-commerce rural",
    badge: "~30 endpoints REST",
    highlights: [
      "Desarrollo en equipo del backend de la plataforma de e-commerce rural con Java 21, Spring Boot y PostgreSQL (~30 endpoints REST).",
      "Integración de la pasarela de pagos Wompi y del almacenamiento de imágenes con Cloudinary.",
      "Levantamiento de requerimientos funcionales con productores artesanales y agrícolas.",
    ],
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "API REST", "Wompi", "Cloudinary"],
  },
  {
    period: "Oct 2026",
    role: "Desarrollador web freelance",
    organization: "MB Nutrition Labs · Landing page de preventa",
    badge: "Freelance",
    highlights: [
      "Diseño y desarrollo en dos semanas de la landing page de preventa para captar leads antes del lanzamiento.",
      "Sitio publicado en mbnutritionlabs.com.",
    ],
    tags: ["React", "GCP", "MCP", "Figma", "Spline"],
  },
  {
    period: "Dic 2025 — Ene 2026",
    role: "Backend developer e IA aplicada",
    organization: "SentimAI · Hackathon ONE II Latam (Equipo 39)",
    badge: "94.2% de precisión",
    highlights: [
      "API de análisis de sentimientos para reseñas, comentarios y tweets.",
      "Modelo de Regresión Logística con TF-IDF que alcanza 94.2% de precisión.",
      "Backend con Spring Boot, MySQL y Redis para caché, desplegado en contenedores sobre OCI.",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Redis", "TF-IDF", "Docker", "OCI"],
  },
  {
    period: "Nov 2025",
    role: "Analista de datos e IA aplicada",
    organization: "Los Carlitos · Hackathon Talento Tech",
    badge: "3.er lugar",
    highlights: [
      "Tercer lugar del hackathon con un MVP construido en 8 horas.",
      "Agente conversacional y modelo de Machine Learning para predecir leads y viabilidad de proyectos en agencias digitales.",
      "Despliegue en Firebase.",
    ],
    tags: ["Machine Learning", "Python", "Firebase"],
  },
  {
    period: "2025",
    role: "Desarrollador de sistema C2",
    organization: "Hackathon TIC Talento Tech · Reto ALIGO Defensores Informáticos",
    badge: "Red team",
    highlights: [
      "Sistema de Command and Control para prácticas de red team y pentesting con comunicación cifrada por TLS.",
      "Interfaz de operador con soporte multi-agente y ejecución de comandos dirigida o en broadcast.",
      "Infraestructura contenerizada con Docker.",
    ],
    tags: ["Red team", "Pentesting", "C2", "TLS", "Docker"],
  },
  {
    period: "Ago 2024 — Oct 2025",
    role: "Estudiante investigador",
    organization: "Universidad del Quindío · Semillero y proyecto de grado",
    badge: "Telecomunicaciones",
    highlights: [
      "Servicios de internet y video streaming sobre una red de fibra óptica FTTH para unas 15 familias.",
      "Dimensionamiento de tráfico y configuración de la red para garantizar ancho de banda simétrico.",
    ],
    tags: ["Redes FTTH", "Fibra óptica", "QoS"],
  },
]

const CERTIFICATIONS = [
  { name: "Oracle Cloud Infrastructure (OCI) Foundations Associate", org: "Oracle University" },
  { name: "Backend Developer — Programa ONE G9", org: "Alura Latam · Oracle Next Education" },
  { name: "Ciberseguridad nivel intermedio", org: "Talento Tech · MinTIC" },
  { name: "Los bits y bytes de las redes informáticas", org: "Google" },
  { name: "Aspectos básicos de la asistencia técnica", org: "Google" },
  { name: "Fundamentos de LLMs y Prompt Engineering", org: "Platzi" },
  { name: "Automatizaciones con Make y creación web con v0", org: "Platzi" },
  { name: "Supabase y fundamentos de Python", org: "Platzi" },
]

export function ExperienceTimeline() {
  return (
    <section id="experience" className="relative scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader
          index="04"
          kicker="Trayectoria"
          title="Experiencia"
          suffix=".log"
          aside={
            <>
              <Calendar className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>2024 — 2026</span>
            </>
          }
        />

        <ol
          data-scene-copy="experience"
          className="relative flex flex-col gap-6 border-l border-primary/30 pl-6 md:pl-10 lg:max-w-2xl xl:max-w-3xl"
        >
          {EXPERIENCES.map((experience) => (
            <li key={`${experience.organization}-${experience.period}`} className="relative">
              <span
                className="absolute -left-6 top-6 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background shadow-[0_0_10px_#00FF66] md:-left-10"
                aria-hidden="true"
              />

              <HudCard headerTitle={experience.period} statusTag={experience.badge}>
                <div className="flex flex-col gap-1">
                  <h3 className="text-pretty font-mono text-lg font-bold text-white sm:text-xl">{experience.role}</h3>
                  <p className="font-mono text-sm text-accent">{experience.organization}</p>
                </div>

                <ul className="mt-4 flex flex-col gap-2 font-mono text-sm leading-relaxed text-slate-300">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2">
                      <span className="text-primary" aria-hidden="true">
                        ›
                      </span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <ul
                  className="mt-4 flex flex-wrap gap-1.5 border-t border-primary/10 pt-4"
                  aria-label="Tecnologías utilizadas"
                >
                  {experience.tags.map((tag) => (
                    <li key={tag}>
                      <TechTag name={tag} variant="primary" />
                    </li>
                  ))}
                </ul>
              </HudCard>
            </li>
          ))}
        </ol>

        <div className="mt-16 border-t border-primary/20 pt-12">
          <Reveal className="mb-6 flex flex-col gap-2">
            <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
              <Award className="h-4 w-4" aria-hidden="true" />
              <span>Formación complementaria</span>
            </p>
            <h3 className="font-mono text-2xl font-bold text-white">Certificaciones</h3>
          </Reveal>

          <ul className="grid grid-cols-1 gap-4 font-mono md:grid-cols-2">
            {CERTIFICATIONS.map((certification, index) => (
              <li key={certification.name}>
                <Reveal
                  delay={(index % 2) * 0.08}
                  offset={16}
                  className="flex h-full items-start gap-3 rounded border border-primary/20 bg-[#0d1322]/90 p-4"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-semibold leading-relaxed text-white">{certification.name}</h4>
                    <p className="text-xs text-slate-400">{certification.org}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
