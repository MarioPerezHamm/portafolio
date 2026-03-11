import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { TerminalSection } from "./terminal-section"
import { TerminalLink } from "./terminal-link"

export function ContactSection() {
  return (
    <TerminalSection command="./contactar.exe" id="contact">
      <div className="space-y-6">
        <p className="text-primary/70 mb-6">
          {"// Ejecutando protocolo de contacto..."}
          <br />
          {"// Canales de comunicacion disponibles:"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          <TerminalLink
            href="https://github.com/MarioPerezHamm"
            icon={Github}
            label="GitHub/MarioPerezHamm"
          />
          <TerminalLink
            href="https://linkedin.com/in/"
            icon={Linkedin}
            label="LinkedIn"
          />
          <TerminalLink
            href="mailto:perezfernan159@gmail.com"
            icon={Mail}
            label="perezfernan159@gmail.com"
          />
          <TerminalLink
            href="https://github.com/MarioPerezHamm/sentiment-api-equipo39"
            icon={ExternalLink}
            label="Proyecto SentimenAI"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-primary/20 space-y-2">
          <p className="text-primary/50 text-sm">
            {"// Ubicacion: Armenia, Quindio, Colombia"}
          </p>
          <p className="text-primary/50 text-sm">
            {"// Telefono: +57 316 234 4785"}
          </p>
          <p className="text-primary/50 text-sm">
            {"// Status: Disponible para nuevas oportunidades"}
          </p>
        </div>
      </div>
    </TerminalSection>
  )
}
