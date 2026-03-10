import { TerminalSection } from "./terminal-section"
import { ExperienceLog } from "./experience-log"

const experiences = [
  {
    timestamp: "2026",
    title: "Proyecto SentimenAI",
    organization: "Desarrollador Backend & Despliegue (Proyecto Colaborativo)",
    description: [
      "Liderazgo en desarrollo backend con Python y FastAPI para analisis de sentimientos (PLN)",
      "Integracion de APIs de IA generativa (Gemini) y validacion de resultados en JSON",
      "Limpieza y estructuracion de datos en equipo utilizando Pandas y NumPy",
      "Contenerizacion con Docker y despliegue en la nube (Oracle Cloud Infrastructure)",
    ],
    tags: ["Python", "FastAPI", "PLN", "Gemini", "Docker", "OCI"],
  },
  {
    timestamp: "2024-2026",
    title: "Oracle Next Education (ONE)",
    organization: "Programa de Formacion Intensiva en Desarrollo Backend",
    description: [
      "Formacion en desarrollo backend y bases de datos",
      "Aplicacion de buenas practicas de programacion",
      "Trabajo bajo metodologias agiles",
      "Desarrollo de proyectos funcionales",
    ],
    tags: ["Backend", "Bases de Datos", "Agile", "Java"],
  },
  {
    timestamp: "ENE 2025 - AGO 2025",
    title: "Student Researcher",
    organization: "Universidad del Quindio - Semillero de Investigacion",
    description: [
      "Investigacion aplicada a telecomunicaciones",
      "Implementacion de servicios telematicos en redes FTTH",
      "Presentacion de poster en Encuentro Departamental REDSI",
      "Ponencia en evento del Grupo de Investigacion GITUQ",
    ],
    tags: ["Investigacion", "FTTH", "Telematica", "Redes"],
  },
]

const certifications = [
  { name: "Desarrollo web Back-end", org: "Alura Latam", date: "Oct 2022" },
  { name: "Ciberseguridad Nivel Intermedio", org: "MinTIC", date: "Oct 2022" },
  { name: "Los bits y bytes de las redes informaticas", org: "Google", date: "Feb 2024" },
  { name: "Aspectos basicos de la asistencia tecnica", org: "Google", date: "Jun 2024" },
]

export function ExperienceSection() {
  return (
    <TerminalSection command="cat ./experiencia.log" id="experience">
      <div className="space-y-6">
        <div className="text-primary/50 text-sm mb-4">
          {"// === PROYECTOS Y EXPERIENCIA ==="}
        </div>
        {experiences.map((exp, index) => (
          <ExperienceLog key={index} {...exp} />
        ))}

        <div className="mt-8 pt-6 border-t border-primary/20">
          <div className="text-primary/50 text-sm mb-4">
            {"// === CERTIFICACIONES ==="}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-primary/70"
              >
                <span className="text-primary/40">{">"}</span>
                <div>
                  <span className="text-primary">{cert.name}</span>
                  <span className="text-primary/50"> - {cert.org}</span>
                  <span className="text-primary/30 text-xs ml-2">[{cert.date}]</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TerminalSection>
  )
}
