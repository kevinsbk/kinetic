import { siteConfig } from "@/config/site"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <Logo />
        <p>© {new Date().getFullYear()} {siteConfig.name}. Gather on purpose.</p>
        <div className="flex gap-5">
          <a href={siteConfig.x} className="hover:text-foreground">X</a>
          <a href={siteConfig.github} className="hover:text-foreground">GitHub</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
        </div>
      </div>
    </footer>
  )
}
