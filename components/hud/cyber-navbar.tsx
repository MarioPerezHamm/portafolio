"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Terminal, Cpu, Layers, Briefcase, Mail, Shield } from "lucide-react"

export function CyberNavbar() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0) {
        setScrollPercentage(Math.min(100, Math.round((scrollY / maxScroll) * 100)))
      }

      const sections = ["about", "projects", "skills", "experience", "contact"]
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            return
          }
        }
      }
      setActiveSection("hero")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { id: "about", label: "PERFIL", icon: Terminal },
    { id: "projects", label: "PROYECTOS", icon: Cpu },
    { id: "skills", label: "SKILLS", icon: Layers },
    { id: "experience", label: "LOGS", icon: Briefcase },
    { id: "contact", label: "CONTACTO", icon: Mail },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <a
          href="#"
          className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 rounded bg-[#0d1322]/85 border border-primary/20 backdrop-blur-md font-mono text-xs text-white hover:border-primary/50 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-bold tracking-wider">
            MARIO_PEREZ<span className="text-primary">.DEV</span>
          </span>
        </a>

        {/* Floating Nav Capsule */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#0d1322]/85 border border-primary/25 backdrop-blur-md font-mono text-xs shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = activeSection === link.id
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-background font-bold shadow-[0_0_10px_#00FF66]"
                    : "text-slate-300 hover:text-primary hover:bg-primary/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </a>
            )
          })}
        </nav>

        {/* Telemetry Indicator */}
        <div className="pointer-events-auto flex items-center gap-3 px-3 py-1.5 rounded bg-[#0d1322]/85 border border-primary/20 backdrop-blur-md font-mono text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] text-primary/70">SYNC:</span>
            <span className="text-primary font-bold">{scrollPercentage}%</span>
          </div>
          <div className="w-12 bg-slate-800 h-1 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-150"
              style={{ width: `${scrollPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
