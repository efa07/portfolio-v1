import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { CommandPalette } from "@/components/CommandPalette";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background text-foreground flex flex-col selection:bg-accent selection:text-accent-fg">
      <Navigation />
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <CommandPalette />
    </main>
  );
}
