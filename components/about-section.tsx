import { TerminalSection } from "./terminal-section"

export function AboutSection() {
  return (
    <TerminalSection command="whoami" id="about">
      <div className="space-y-4 text-primary/80">
        <p className="leading-relaxed">
          Ingeniero Electronico con interes en{" "}
          <span className="text-primary font-bold">desarrollo de aplicaciones</span>,{" "}
          <span className="text-primary font-bold">inteligencia artificial</span>,{" "}
          <span className="text-primary font-bold">telematica</span> y{" "}
          <span className="text-primary font-bold">ciberseguridad</span>.
        </p>
        <p className="leading-relaxed">
          Cuento con solidos conocimientos en redes de datos, sistemas electronicos y
          programacion (Python, Java, JavaScript), complementados con experiencia practica en{" "}
          <span className="text-primary">Procesamiento de Lenguaje Natural (PLN)</span>,
          analisis exploratorio con Pandas y NumPy, e integracion de modelos de IA generativa (Gemini).
        </p>
        <p className="leading-relaxed">
          Busco oportunidades para aplicar y consolidar mis competencias tecnicas en el area de{" "}
          <span className="text-primary font-bold">Analisis de Datos con IA</span>, aportando mi
          capacidad analitica en la validacion de modelos de clasificacion, el desarrollo backend
          y la estructuracion de resultados.
        </p>

        <div className="mt-6 pt-4 border-t border-primary/20">
          <p className="text-primary/50 text-sm">
            {"// Grado esperado: Marzo 2026"}
          </p>
          <p className="text-primary/50 text-sm">
            {"// Universidad del Quindio"}
          </p>
        </div>
      </div>
    </TerminalSection>
  )
}
