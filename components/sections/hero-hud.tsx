"use client"

import { motion } from "framer-motion"
import { ArrowDown, Terminal, Shield, Cpu, Activity, ExternalLink, Download } from "lucide-react"
import { CyberBadge } from "../hud/cyber-badge"

export function HeroHUD() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 md:px-8 pt-24 pb-16 z-10">
      <div className="max-w-5xl w-full mx-auto">
        {/* Top Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-3 mb-6 px-4 py-2 rounded-sm bg-[#0d1322]/80 border border-primary/20 backdrop-blur-md"
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-xs font-mono tracking-widest text-primary/80 uppercase">
              CYBER_CORE // SYS.ONLINE [v4.2.0]
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <CyberBadge label="TLS 1.3 ENCRYPTED" status="encrypted" />
            <span className="hidden sm:inline-block text-[11px] text-primary/60">
              LOC: PASTO / ARMENIA, COLOMBIA
            </span>
          </div>
        </motion.div>

        {/* Main Central HUD Terminal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="hud-panel p-6 md:p-10 rounded-sm relative overflow-hidden"
        >
          {/* Corner accents */}
          <div className="hud-corner-tl" />
          <div className="hud-corner-tr" />
          <div className="hud-corner-bl" />
          <div className="hud-corner-br" />

          {/* Terminal Command Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-primary/15">
            <div className="flex items-center gap-2 text-xs font-mono text-primary/70">
              <Terminal className="w-4 h-4 text-primary" />
              <span>root@cyber-node:~$ ./load_operator_profile.sh --full</span>
            </div>
            <span className="text-[11px] font-mono text-accent">STATUS: READY</span>
          </div>

          {/* Primary Identity Display */}
          <div className="space-y-4">
            <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded text-xs font-mono text-primary uppercase tracking-widest mb-1">
              [ INGENIERO ELECTRÓNICO & BACKEND DEVELOPER ]
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-mono text-white">
              MARIO FERNANDO <br />
              <span className="text-primary cyber-text-glow">PÉREZ MARTÍNEZ</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 font-mono max-w-3xl leading-relaxed pt-2">
              Ingeniero Electrónico con énfasis en Telecomunicaciones{" "}
              <span className="text-accent">(Universidad del Quindío, 2026)</span>. Especializado en{" "}
              <span className="text-primary font-semibold">Desarrollo Backend con Java 21 & Spring Boot</span>,{" "}
              <span className="text-primary font-semibold">Inteligencia Artificial Aplicada</span>, despliegues contenerizados en{" "}
              <span className="text-accent font-semibold">Google Cloud Platform (Cloud Run)</span> y OCI, redes FTTH y ciberseguridad.
            </p>
          </div>

          {/* Telemetry quick metrics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-primary/15 font-mono">
            <div className="p-3 bg-slate-900/40 border border-primary/15 rounded">
              <div className="text-[10px] text-primary/60 uppercase">CORE ENGINE</div>
              <div className="text-sm md:text-base font-bold text-white mt-0.5">Java 21 / Spring</div>
            </div>
            <div className="p-3 bg-slate-900/40 border border-primary/15 rounded">
              <div className="text-[10px] text-accent/60 uppercase">AI PRECISION</div>
              <div className="text-sm md:text-base font-bold text-accent mt-0.5">94.2% ML Model</div>
            </div>
            <div className="p-3 bg-slate-900/40 border border-primary/15 rounded">
              <div className="text-[10px] text-primary/60 uppercase">INFRASTRUCTURE</div>
              <div className="text-sm md:text-base font-bold text-white mt-0.5">GCP / OCI / Docker</div>
            </div>
            <div className="p-3 bg-slate-900/40 border border-primary/15 rounded">
              <div className="text-[10px] text-emerald-400/60 uppercase">CLOUD DEPLOY</div>
              <div className="text-sm md:text-base font-bold text-emerald-400 mt-0.5">Cloud Run Ready</div>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-8 pt-4">
            <a href="#projects" className="cyber-btn group">
              <Cpu className="w-4 h-4 text-primary group-hover:text-background transition-colors" />
              <span>EXPLORAR PROYECTOS</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-mono tracking-wider border border-accent/40 bg-accent/10 text-accent hover:bg-accent hover:text-background transition-all duration-200 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            >
              <Activity className="w-4 h-4" />
              <span>ESTABLECER CONTACTO</span>
            </a>

            <a
              href="https://github.com/MarioPerezHamm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-mono text-slate-300 hover:text-primary transition-colors border border-slate-700/60 hover:border-primary/40"
            >
              <ExternalLink className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-primary/60 hover:text-primary transition-colors text-xs font-mono"
          >
            <span>SCROLL // EXPLORAR SISTEMA</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-primary" />
          </a>
        </div>
      </div>
    </section>
  )
}
