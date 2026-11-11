"use client"

import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { useJoinDialog } from "./join-dialog"

const links = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#events", label: "For hosts" },
  { href: "#app", label: "The app" },
]

export function Navbar() {
  const { openJoin } = useJoinDialog()

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" aria-label="Home">
          <Logo />
        </a>
        <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </div>
        <Button size="sm" onClick={openJoin} className="h-8 rounded-full px-4">
          Get access
        </Button>
      </nav>
    </header>
  )
}
