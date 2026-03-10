import type { Metadata, Viewport } from "next"
import { Fira_Code } from "next/font/google"
import "./globals.css"

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mario Perez | Ingeniero Electronico & Backend Developer",
  description:
    "Portafolio de Mario Fernando Perez Martinez - Ingeniero Electronico especializado en desarrollo backend, inteligencia artificial, telematica y ciberseguridad.",
  keywords: [
    "Mario Perez",
    "Ingeniero Electronico",
    "Backend Developer",
    "Python",
    "FastAPI",
    "AI",
    "PLN",
    "Colombia",
  ],
  authors: [{ name: "Mario Fernando Perez Martinez" }],
}

export const viewport: Viewport = {
  themeColor: "#000000",
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
      <body className="min-h-screen">
        <div className="scanline" aria-hidden="true" />
        <div className="crt-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
