"use client"

import { useState } from "react"
import { HudCard } from "../hud/hud-card"
import { CyberBadge } from "../hud/cyber-badge"
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  Send,
  Terminal,
  Radio,
  MapPin,
  ExternalLink,
} from "lucide-react"

export function ContactConsole() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [message, setMessage] = useState("")
  const [senderName, setSenderName] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [sentSuccess, setSentSuccess] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("perezfernan159@gmail.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2500)
  }

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+573162344785")
    setCopiedPhone(true)
    setTimeout(() => setCopiedPhone(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open direct mail client with pre-filled content
    const subject = encodeURIComponent(`Contacto Portafolio - ${senderName || "Cyber Operador"}`)
    const body = encodeURIComponent(
      `Remitente: ${senderName} (${senderEmail})\n\nMensaje:\n${message}`
    )
    window.open(`mailto:perezfernan159@gmail.com?subject=${subject}&body=${body}`, "_blank")
    setSentSuccess(true)
    setTimeout(() => setSentSuccess(false), 5000)
  }

  return (
    <section id="contact" className="py-24 relative z-10 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase tracking-widest mb-2">
            <span className="text-primary/40">[05]</span>
            <span>// CANAL DE COMUNICACIÓN ENCRIPTADO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-mono font-bold text-white flex items-center gap-3">
            <span>INICIAR CONTACTO</span>
            <span className="text-primary cyber-text-glow">.COMM</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct Uplinks Column */}
          <div className="lg:col-span-5 space-y-6">
            <HudCard
              headerTitle="TERMINAL // ENLACES DIRECTOS"
              statusTag="FRECUENCIA SEGURA"
              className="space-y-4"
            >
              <p className="text-xs font-mono text-slate-300 leading-relaxed">
                Disponible para roles de{" "}
                <span className="text-primary font-semibold">Backend Developer (Java 21 / Spring Boot)</span>,{" "}
                <span className="text-accent font-semibold">Ingeniero de IA Aplicada</span> y proyectos de infraestructura de telecomunicaciones / ciberseguridad.
              </p>

              {/* Email item */}
              <div className="p-3 bg-slate-900/60 rounded border border-primary/20 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <span className="truncate max-w-[170px] sm:max-w-none">
                    perezfernan159@gmail.com
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 flex items-center gap-1 transition-colors"
                  title="Copiar correo"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[10px]">{copiedEmail ? "COPIADO" : "COPIAR"}</span>
                </button>
              </div>

              {/* Phone item */}
              <div className="p-3 bg-slate-900/60 rounded border border-primary/20 flex items-center justify-between font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <span>+57 316 234 4785</span>
                </div>
                <button
                  onClick={handleCopyPhone}
                  className="px-2 py-1 rounded bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 flex items-center gap-1 transition-colors"
                  title="Copiar teléfono"
                >
                  {copiedPhone ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[10px]">{copiedPhone ? "COPIADO" : "COPIAR"}</span>
                </button>
              </div>

              {/* Social Channels */}
              <div className="pt-2 grid grid-cols-2 gap-3 font-mono text-xs">
                <a
                  href="https://github.com/MarioPerezHamm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900/40 rounded border border-primary/20 hover:border-primary flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4 text-primary" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>

                <a
                  href="https://linkedin.com/in/marioperezdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-900/40 rounded border border-accent/20 hover:border-accent flex items-center gap-2 text-slate-300 hover:text-accent transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-accent" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
                </a>
              </div>

              {/* Location indicator */}
              <div className="pt-4 border-t border-primary/10 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Pasto / Armenia, Quindío, Colombia</span>
              </div>
            </HudCard>
          </div>

          {/* Transmitter HUD Form Column */}
          <div className="lg:col-span-7">
            <HudCard
              accentColor="cyan"
              headerTitle="TRANSMISOR // PROTOCOLO DE TRANSMISIÓN DIRECTA"
              statusTag="ONLINE"
            >
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1 tracking-wider uppercase text-[10px]">
                      NOMBRE / ENTIDAD *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Ej. Recruiter / Tech Lead"
                      className="w-full bg-[#070b13] border border-primary/25 rounded px-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,102,0.3)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 tracking-wider uppercase text-[10px]">
                      CORREO ELECTRÓNICO *
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="operador@empresa.com"
                      className="w-full bg-[#070b13] border border-primary/25 rounded px-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,102,0.3)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 tracking-wider uppercase text-[10px]">
                    MENSAJE O PROPUESTA *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Detalles del proyecto, vacante o colaboración técnica..."
                    className="w-full bg-[#070b13] border border-primary/25 rounded px-3 py-2.5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-primary focus:shadow-[0_0_10px_rgba(0,255,102,0.3)] transition-all resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-primary animate-pulse" />
                    <span>CANAL SEGURO DIRECTO</span>
                  </div>

                  <button type="submit" className="cyber-btn">
                    <Send className="w-3.5 h-3.5" />
                    <span>TRANSMITIR MENSAJE</span>
                  </button>
                </div>

                {sentSuccess && (
                  <div className="mt-3 p-2.5 bg-primary/10 border border-primary rounded text-primary text-center text-xs animate-pulse">
                    ✓ Transmisión preparada correctamente en su cliente de correo.
                  </div>
                )}
              </form>
            </HudCard>
          </div>
        </div>

        {/* Console Exit Footer */}
        <footer className="mt-20 pt-8 border-t border-primary/20 text-center font-mono">
          <div className="space-y-2">
            <p className="text-primary/50 text-xs">
              {"// SISTEMA OPERACIONAL ESTABLE — TODOS LOS PROCESOS ACTIVOS"}
            </p>
            <p className="text-primary/70 text-xs">
              root@mario-perez-portfolio:~$ <span className="text-primary">status --healthy</span>
            </p>
            <p className="text-slate-500 text-[11px] mt-4">
              Mario Fernando Pérez Martínez © 2026 | Ingeniero Electrónico & Backend Developer | Universidad del Quindío
            </p>
          </div>
        </footer>
      </div>
    </section>
  )
}
