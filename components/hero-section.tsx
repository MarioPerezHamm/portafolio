"use client"

import { useState } from "react"
import { TypewriterText } from "./typewriter-text"

export function HeroSection() {
  const [showName, setShowName] = useState(false)
  const [showRole, setShowRole] = useState(false)

  return (
    <header className="min-h-screen flex flex-col justify-center px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-4xl mx-auto w-full">
        <div className="terminal-border p-6 md:p-10 bg-secondary/20">
          {/* Boot sequence */}
          <div className="space-y-2 mb-8 text-sm text-primary/60">
            <p>{"[OK] Cargando kernel..."}</p>
            <p>{"[OK] Inicializando modulos..."}</p>
            <p>{"[OK] Montando sistema de archivos..."}</p>
          </div>

          {/* Main command */}
          <div className="mb-6">
            <span className="text-primary/70">root@portfolio:~$</span>
            <TypewriterText
              text=" ./iniciar_sistema.sh"
              delay={80}
              className="text-primary font-bold ml-1"
              onComplete={() => setShowName(true)}
            />
          </div>

          {/* Name and Role */}
          {showName && (
            <div className="space-y-4 animate-[fadeIn_0.5s_ease-out]">
              <div className="border-l-4 border-primary pl-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary terminal-glow">
                  <TypewriterText
                    text="MARIO FERNANDO"
                    delay={60}
                    showCursor={false}
                  />
                </h1>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary terminal-glow mt-2">
                  <TypewriterText
                    text="PEREZ MARTINEZ"
                    delay={60}
                    onComplete={() => setShowRole(true)}
                  />
                </h1>
              </div>

              {showRole && (
                <div className="mt-6 space-y-2 animate-[fadeIn_0.5s_ease-out]">
                  <p className="text-primary/80 text-lg md:text-xl">
                    <span className="text-primary/50">{">"}</span> Ingeniero Electronico
                  </p>
                  <p className="text-primary/80 text-lg md:text-xl">
                    <span className="text-primary/50">{">"}</span> Backend Developer & AI Enthusiast
                  </p>
                  <p className="text-primary/60 text-sm mt-4">
                    Armenia, Quindio, Colombia
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Navigation hint */}
          <div className="mt-12 pt-6 border-t border-primary/20">
            <p className="text-primary/50 text-sm">
              {"[SCROLL] para navegar | [CLICK] en enlaces para interactuar"}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  )
}
