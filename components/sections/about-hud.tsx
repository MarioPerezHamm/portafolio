"use client"

import { motion } from "framer-motion"
import { HudCard } from "../hud/hud-card"
import { Cpu, Network, ShieldCheck, Database, Award, BookOpen, Layers } from "lucide-react"

export function AboutHUD() {
  return (
    <section id="about" className="py-20 relative z-10 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
            <span className="text-primary/40">[01]</span>
            <span>// TELEMETRÍA DE PERFIL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white flex items-center gap-3">
            <span>PERFIL PROFESIONAL</span>
            <span className="text-primary cyber-text-glow">.SYS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Story HUD Card */}
          <HudCard
            className="lg:col-span-8 space-y-5"
            headerTitle="DIAGNÓSTICO // INGENIERO ELECTRÓNICO & BACKEND DEVELOPER"
            statusTag="PERFIL VERIFICADO"
          >
            <p className="text-slate-300 leading-relaxed font-mono text-sm sm:text-base">
              Soy <span className="text-primary font-semibold">Ingeniero Electrónico con énfasis en Telecomunicaciones</span> por la{" "}
              <span className="text-accent">Universidad del Quindío (2026)</span>, con una marcada vocación hacia el desarrollo de software backend con{" "}
              <span className="text-white font-semibold">Java 21 y Spring Boot</span>, bases de datos SQL de alto rendimiento (PostgreSQL y MySQL), inteligencia artificial aplicada y ciberseguridad.
            </p>

            <p className="text-slate-300 leading-relaxed font-mono text-sm sm:text-base">
              He participado activamente en el diseño y despliegue del backend para la plataforma de comercio electrónico rural de{" "}
              <span className="text-primary font-semibold">Corporación TOMASI</span> (manejando más de 30 endpoints REST con pasarela Wompi y almacenamiento Cloudinary), y en el ecosistema{" "}
              <span className="text-white font-semibold">SentimAI</span>, donde entrené un modelo de Machine Learning con{" "}
              <span className="text-accent font-semibold">94.2% de precisión</span> desplegado en microservicios contenerizados en <span className="text-primary font-semibold">Google Cloud Platform (Cloud Run)</span> y Oracle Cloud Infrastructure (OCI).
            </p>

            <p className="text-slate-300 leading-relaxed font-mono text-sm sm:text-base">
              Combino análisis riguroso de requerimientos, ingeniería de telecomunicaciones (redes FTTH, protocolos TCP/IP, simulación GNS3/EVE-NG), despliegue serverless contenerizado en GCP Cloud Run y desarrollo con agentes de código modernos (Antigravity, Cursor, Codex, Claude Code, MCP), garantizando soluciones escalables, seguras y orientadas a resultados reales.
            </p>

            {/* Sub-areas pill badges */}
            <div className="pt-4 border-t border-primary/15 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/60 p-2.5 rounded border border-primary/15">
                <Network className="w-4 h-4 text-primary shrink-0" />
                <span>Telecomunicaciones & FTTH</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/60 p-2.5 rounded border border-primary/15">
                <Database className="w-4 h-4 text-accent shrink-0" />
                <span>Backend Java 21 & SQL</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900/60 p-2.5 rounded border border-primary/15">
                <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GCP Cloud Run & IA Models</span>
              </div>
            </div>
          </HudCard>

          {/* Side Radar & Telemetry Stats */}
          <div className="lg:col-span-4 space-y-6">
            <HudCard
              accentColor="cyan"
              headerTitle="METRICS // TELEMETRÍA"
              statusTag="LIVE"
              className="space-y-4"
            >
              {/* Stat 1 */}
              <div className="p-3 bg-slate-900/50 rounded border border-primary/15">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>PRECISIÓN ML (TF-IDF)</span>
                  <span className="text-primary font-bold">94.2%</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-[94.2%]" />
                </div>
              </div>

              {/* Stat 2 */}
              <div className="p-3 bg-slate-900/50 rounded border border-accent/15">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>REST ENDPOINTS PROD</span>
                  <span className="text-accent font-bold">30+</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-accent h-full rounded-full w-[85%]" />
                </div>
              </div>

              {/* Stat 3 */}
              <div className="p-3 bg-slate-900/50 rounded border border-emerald-400/15">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>PODIO HACKATHON IA</span>
                  <span className="text-emerald-400 font-bold">3.er LUGAR</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full w-[90%]" />
                </div>
              </div>

              {/* Academic Footnote */}
              <div className="pt-2 text-xs font-mono text-slate-400 space-y-1">
                <div className="flex items-center gap-1.5 text-primary/80">
                  <Award className="w-3.5 h-3.5" />
                  <span className="font-semibold">Universidad del Quindío</span>
                </div>
                <p className="text-[11px] text-slate-400 pl-5">
                  Graduado: Marzo 2026 | Énfasis en Telecomunicaciones
                </p>
              </div>
            </HudCard>

            {/* Quick Core Strengths Box */}
            <HudCard headerTitle="HABILIDADES CLAVE">
              <div className="text-xs font-mono text-slate-300 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Resolución analítica de problemas</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Arquitectura backend y microservicios</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Seguridad TLS y red team C2</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  <span>Trabajo en equipo y comunicación técnica</span>
                </div>
              </div>
            </HudCard>
          </div>
        </div>
      </div>
    </section>
  )
}
