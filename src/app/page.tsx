import { EventsApp } from "@/components/landing/events-app"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"
import { Hero } from "@/components/landing/hero"
import { JoinDialogProvider } from "@/components/landing/join-dialog"
import { MatchPreview } from "@/components/landing/match-preview"
import { Navbar } from "@/components/landing/navbar"

export default function Home() {
  return (
    <JoinDialogProvider>
      <Navbar />
      <main>
        <Hero />
        <MatchPreview />
        <Features />
        <EventsApp />
      </main>
      <Footer />
    </JoinDialogProvider>
  )
}
