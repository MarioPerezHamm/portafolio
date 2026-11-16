"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowDown, Cpu, Github, MessageCircle } from "lucide-react"
import { CONTACT, whatsappUrl } from "@/lib/contact"

const HIGHLIGHTS = [
  { value: "94.2%", label: "Precisión del modelo de SentimAI" },
  { value: "~30", label: "Endpoints REST en Corporación TOMASI" },
  { value: "3.er lugar", label: "Hackathon Talento Tech" },
]

const LEGEND = [
  { label: "Servidores", dot: "bg-accent" },
  { label: "API endpoints", dot: "bg-primary" },
  { label: "Clientes", dot: "bg-slate-400" },
]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export function HeroHUD() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center px-4 pb-12 pt-28 md:px-8">
      <div className="hero-scrim absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          data-scene-copy="hero"
          className="flex max-w-xl flex-col gap-6 xl:max-w-2xl"
        >
          <motion.p
            variants={item}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary"
          >
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_#00FF66]" aria-hidden="true" />
            Ingeniero Electrónico · Backend Developer
          </motion.p>

          <motion.h1
            variants={item}
            className="text-balance font-mono text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl xl:text-7xl"
          >
            Mario Fernando <span className="cyber-text-glow text-primary">Pérez Martínez</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-pretty font-mono text-base leading-relaxed text-slate-300 md:text-lg"
          >
            Ingeniero Electrónico con énfasis en Telecomunicaciones, enfocado en{" "}
            <span className="font-semibold text-white">desarrollo backend (Java 21, Spring Boot)</span>,{" "}
            <span className="font-semibold text-white">IA aplicada</span> y{" "}
            <span className="font-semibold text-white">ciberseguridad</span>.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <a href="#projects" className="cyber-btn">
              <Cpu className="h-4 w-4" aria-hidden="true" />
              <span>Ver proyectos</span>
            </a>

            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-accent/50 bg-accent/10 px-5 py-2.5 font-mono text-sm uppercase tracking-wider text-accent transition-colors duration-200 hover:bg-accent hover:text-background"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp</span>
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>

            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-slate-600 px-4 py-2.5 font-mono text-sm uppercase tracking-wider text-slate-200 transition-colors duration-200 hover:border-primary/60 hover:text-primary"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span>GitHub</span>
              <span className="sr-only">(se abre en una pestaña nueva)</span>
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            className="grid grid-cols-1 gap-4 border-t border-primary/20 pt-6 font-mono sm:grid-cols-3"
          >
            {HIGHLIGHTS.map((highlight) => (
              <div key={highlight.label} className="flex flex-col-reverse justify-end gap-1">
                <dt className="text-xs leading-relaxed text-slate-400">{highlight.label}</dt>
                <dd className="text-2xl font-bold text-white">{highlight.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-wrap items-end justify-between gap-6 font-mono text-xs">
        <a
          href="#about"
          className="flex items-center gap-2 uppercase tracking-widest text-primary/80 transition-colors hover:text-primary"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
          <span>Explorar perfil</span>
        </a>

        <ul className="hidden items-center gap-5 text-slate-400 lg:flex" aria-label="Leyenda del grafo de red">
          {LEGEND.map((entry) => (
            <li key={entry.label} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${entry.dot}`} aria-hidden="true" />
              {entry.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
