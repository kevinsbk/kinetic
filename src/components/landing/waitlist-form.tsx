"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowRight, Check, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WaitlistForm() {
  const [email, setEmail] = React.useState("")
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">("idle")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    // Replace with a real waitlist endpoint
    setTimeout(() => setStatus("done"), 900)
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex h-11 max-w-md items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 text-sm text-emerald-300"
        >
          <Check className="size-4" />
          You&apos;re on the list. Watch your inbox for an invite.
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0, y: -6 }}
          onSubmit={onSubmit}
          className="flex w-full max-w-md flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors focus-within:border-white/20 sm:flex-row"
        >
          <Input
            type="email"
            required
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10 border-0 bg-transparent text-[15px] shadow-none focus-visible:ring-0 dark:bg-transparent"
            aria-label="Email address"
          />
          <Button type="submit" className="h-10 shrink-0 rounded-xl px-5" disabled={status === "loading"}>
            {status === "loading" ? <Loader2 className="animate-spin" /> : null}
            Get Early Access
            {status === "idle" && (
              <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" />
            )}
          </Button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
