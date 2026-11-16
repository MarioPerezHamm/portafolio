import { BrainCircuit, GraduationCap, Network, Server, ShieldCheck, type LucideIcon } from "lucide-react"
import { HudCard } from "../hud/hud-card"
import { SectionHeader } from "../ui/section-header"

interface FocusArea {
  title: string
  detail: string
  icon: LucideIcon
}

const FOCUS_AREAS: FocusArea[] = [
  {
    title: "Desarrollo backend",
    detail: "Java 21 · Spring Boot · APIs REST · PostgreSQL / MySQL · Redis",
    icon: Server,
  },
  {
    title: "IA aplicada",
    detail: "Regresión logística · TF-IDF · LLMs · Prompt Engineering",
    icon: BrainCircuit,
  },
  {
    title: "Ciberseguridad",
    detail: "Red team / pentesting · C2 · TLS · SSH",
    icon: ShieldCheck,
  },
  {
    title: "Telecomunicaciones",
    detail: "Redes FTTH · TCP/IP · GNS3 / EVE-NG",
    icon: Network,
  },
]

export function AboutHUD() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <SectionHeader index="01" kicker="Perfil" title="Sobre mí" suffix=".sys" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <HudCard className="lg:col-span-7" headerTitle="Perfil profesional">
            <div className="flex flex-col gap-4 font-mono text-sm leading-relaxed text-slate-300 sm:text-base">
              <p>
                Soy <span className="font-semibold text-primary">Ingeniero Electrónico con énfasis en Telecomunicaciones</span>,
                enfocado en <span className="font-semibold text-white">desarrollo backend (Java 21, Spring Boot)</span>,{" "}
                <span className="font-semibold text-white">IA aplicada</span> y{" "}
                <span className="font-semibold text-white">ciberseguridad</span>.
              </p>
              <p>
                Trabajo en el backend de la plataforma de e-commerce rural de{" "}
                <span className="font-semibold text-primary">Corporación TOMASI</span> (~30 endpoints REST). En{" "}
                <span className="font-semibold text-primary">SentimAI</span> entrené un modelo de análisis de sentimientos
                con <span className="font-semibold text-accent">94.2% de precisión</span>, y desarrollé un sistema C2 con
                cifrado TLS para prácticas de red team y pentesting.
              </p>
              <p>
                Mi formación en telecomunicaciones me da una visión de extremo a extremo: desde el paquete que viaja por
                la red hasta el endpoint que lo procesa.
              </p>
            </div>

            <div className="mt-6 flex items-start gap-3 border-t border-primary/15 pt-5 font-mono">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-white">Ingeniería Electrónica — Universidad del Quindío</p>
                <p className="text-xs leading-relaxed text-slate-400">
                  Énfasis en Telecomunicaciones · Graduado en marzo de 2026
                </p>
              </div>
            </div>
          </HudCard>

          <HudCard accentColor="cyan" className="lg:col-span-5" headerTitle="Áreas de enfoque">
            <ul className="flex flex-col gap-3">
              {FOCUS_AREAS.map((area) => {
                const Icon = area.icon
                return (
                  <li
                    key={area.title}
                    className="flex items-start gap-3 rounded border border-primary/15 bg-slate-900/60 p-3 font-mono"
                  >
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <div className="flex flex-col gap-1">
                      <h3 className="text-sm font-semibold text-white">{area.title}</h3>
                      <p className="text-xs leading-relaxed text-slate-300">{area.detail}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </HudCard>
        </div>
      </div>
    </section>
  )
}
