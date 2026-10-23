"use client"

import dynamic from "next/dynamic"
import { HeroHUD } from "@/components/sections/hero-hud"
import { AboutHUD } from "@/components/sections/about-hud"
import { ProjectsShowcase } from "@/components/sections/projects-showcase"
import { SkillsMatrix } from "@/components/sections/skills-matrix"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { ContactConsole } from "@/components/sections/contact-console"

// Dynamically import 3D Three.js canvas to guarantee client-side WebGL mounting
const CyberSceneCanvas = dynamic(
  () =>
    import("@/components/3d/cyber-scene-canvas").then(
      (mod) => mod.CyberSceneCanvas
    ),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-[#0B0F19] pointer-events-none" />
    ),
  }
)

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0B0F19] text-[#E2E8F0] overflow-x-hidden">
      {/* 3D Interactive Centerpiece & Scrollytelling Canvas */}
      <CyberSceneCanvas />

      {/* Scrollytelling HUD Sections */}
      <div className="relative z-10 flex flex-col">
        <HeroHUD />
        <AboutHUD />
        <ProjectsShowcase />
        <SkillsMatrix />
        <ExperienceTimeline />
        <ContactConsole />
      </div>
    </main>
  )
}
