import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 pb-20">
        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-primary/20 text-center">
          <div className="space-y-2">
            <p className="text-primary/50 text-sm">
              {"// Sistema terminado correctamente"}
            </p>
            <p className="text-primary/70 text-sm">
              root@portfolio:~$ <span className="text-primary">exit</span>
            </p>
            <p className="text-primary/40 text-xs mt-4">
              Desarrollado por Mario Fernando Perez Martinez | 2026
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
