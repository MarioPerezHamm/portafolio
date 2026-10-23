import type { Metadata, Viewport } from "next"
import { Fira_Code } from "next/font/google"
import { SmoothScroll } from "@/components/ui/smooth-scroll"
import { CyberNavbar } from "@/components/hud/cyber-navbar"
import "./globals.css"

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mario Pérez Martínez | Ingeniero Electrónico & Backend Developer",
  description:
    "Portafolio profesional de Mario Fernando Pérez Martínez — Ingeniero Electrónico con énfasis en Telecomunicaciones (Universidad del Quindío). Especialista en desarrollo backend con Java 21, Spring Boot, bases de datos SQL, IA aplicada (94.2% precisión ML), despliegues en Google Cloud (Cloud Run) / OCI, redes FTTH y ciberseguridad.",
  keywords: [
    "Mario Perez",
    "Mario Fernando Perez Martinez",
    "Ingeniero Electronico",
    "Universidad del Quindio",
    "Backend Developer",
    "Java 21",
    "Spring Boot",
    "Machine Learning",
    "Python",
    "Docker",
    "Google Cloud Platform",
    "GCP",
    "Cloud Run",
    "OCI",
    "FTTH",
    "Ciberseguridad",
    "Colombia",
  ],
  authors: [{ name: "Mario Fernando Pérez Martínez" }],
  creator: "Mario Fernando Pérez Martínez",
}

export const viewport: Viewport = {
  themeColor: "#0B0F19",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={firaCode.variable}>
      <body className="min-h-screen bg-[#0B0F19] text-[#E2E8F0] antialiased selection:bg-[#00FF66] selection:text-[#0B0F19]">
        <div className="cyber-scanline" aria-hidden="true" />
        <SmoothScroll>
          <CyberNavbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
