import { SceneBackdrop } from "@/components/3d/scene-backdrop"
import { HeroHUD } from "@/components/sections/hero-hud"
import { AboutHUD } from "@/components/sections/about-hud"
import { ProjectsShowcase } from "@/components/sections/projects-showcase"
import { SkillsMatrix } from "@/components/sections/skills-matrix"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { ContactConsole } from "@/components/sections/contact-console"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden text-foreground">
      <SceneBackdrop />

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
