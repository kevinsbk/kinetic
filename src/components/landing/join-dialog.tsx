"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight, CalendarCheck, Check, Loader2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { siteConfig } from "@/config/site"
import { interests, type InterestId } from "@/lib/data"
import { cn } from "@/lib/utils"

const REQUIRED_INTERESTS = 3

type JoinDialogContextValue = { openJoin: () => void }

const JoinDialogContext = React.createContext<JoinDialogContextValue | null>(null)

export function useJoinDialog() {
  const ctx = React.useContext(JoinDialogContext)
  if (!ctx) throw new Error("useJoinDialog must be used inside <JoinDialogProvider>")
  return ctx
}

export function JoinDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const value = React.useMemo(() => ({ openJoin: () => setOpen(true) }), [])

  return (
    <JoinDialogContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 overflow-hidden border border-border bg-card p-0 ring-0 sm:max-w-md">
          {/* Remount on open so the flow always starts at step 1 */}
          {open && <JoinFlow onDone={() => setOpen(false)} />}
        </DialogContent>
      </Dialog>
    </JoinDialogContext.Provider>
  )
}

type Step = 1 | 2 | 3

function JoinFlow({ onDone }: { onDone: () => void }) {
  const [step, setStep] = React.useState<Step>(1)
  const [email, setEmail] = React.useState("")
  const [calendar, setCalendar] = React.useState<"idle" | "connecting" | "connected">("idle")
  const [picked, setPicked] = React.useState<InterestId[]>([])

  const emailValid = /^\S+@\S+\.\S+$/.test(email)
  const canContinue = emailValid || calendar === "connected"

  function connectCalendar() {
    setCalendar("connecting")
    // Simulated OAuth round-trip
    setTimeout(() => setCalendar("connected"), 1100)
  }

  function toggle(id: InterestId) {
    setPicked((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : prev.length < REQUIRED_INTERESTS
          ? [...prev, id]
          : prev
    )
  }

  return (
    <div>
      <div className="flex gap-1.5 px-6 pt-6">
        {[1, 2].map((s) => (
          <div key={s} className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-amber-400"
              initial={false}
              animate={{ width: step >= s ? "100%" : "0%" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          {step === 1 && (
            <div className="space-y-5">
              <DialogHeader>
                <p className="font-mono text-xs text-muted-foreground">Step 1 of 2</p>
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  Join {siteConfig.name}
                </DialogTitle>
                <DialogDescription>
                  Your agent needs a way to reach you and to know when you&apos;re free.
                </DialogDescription>
              </DialogHeader>

              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (canContinue) setStep(2)
                }}
              >
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    autoFocus
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10 pl-9"
                  />
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  and / or
                  <div className="h-px flex-1 bg-border" />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-full"
                  disabled={calendar !== "idle"}
                  onClick={connectCalendar}
                >
                  {calendar === "idle" && (
                    <>
                      <GoogleIcon /> Connect Google Calendar
                    </>
                  )}
                  {calendar === "connecting" && (
                    <>
                      <Loader2 className="animate-spin" /> Connecting…
                    </>
                  )}
                  {calendar === "connected" && (
                    <>
                      <CalendarCheck className="text-emerald-400" /> Calendar connected
                    </>
                  )}
                </Button>

                <Button type="submit" className="h-10 w-full" disabled={!canContinue}>
                  Continue <ArrowRight />
                </Button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <DialogHeader>
                <p className="font-mono text-xs text-muted-foreground">Step 2 of 2</p>
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  Pick 3 core interests
                </DialogTitle>
                <DialogDescription>
                  These seed your agent. You can refine them anytime.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-2">
                {interests.map(({ id, label, icon: Icon }) => {
                  const active = picked.includes(id)
                  const disabled = !active && picked.length >= REQUIRED_INTERESTS
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggle(id)}
                      disabled={disabled}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                        active
                          ? "border-indigo-500/60 bg-indigo-500/10 text-foreground"
                          : "border-border text-muted-foreground hover:border-zinc-600 hover:text-foreground",
                        disabled && "cursor-not-allowed opacity-40"
                      )}
                    >
                      <Icon className="size-4" />
                      <span className="flex-1">{label}</span>
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded-full border transition-colors",
                          active ? "border-indigo-400 bg-indigo-500" : "border-zinc-600"
                        )}
                      >
                        {active && <Check className="size-3 text-white" />}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" className="h-10" onClick={() => setStep(1)}>
                  <ArrowLeft /> Back
                </Button>
                <Button
                  className="h-10 flex-1"
                  disabled={picked.length !== REQUIRED_INTERESTS}
                  onClick={() => setStep(3)}
                >
                  Join the queue ({picked.length}/{REQUIRED_INTERESTS})
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-amber-400"
              >
                <Check className="size-7 text-white" />
              </motion.div>
              <DialogHeader className="items-center">
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  You&apos;re in the queue
                </DialogTitle>
                <DialogDescription>
                  Position <span className="font-mono text-foreground">#1,284</span>. Your agent
                  is already scanning for your first gathering.
                </DialogDescription>
              </DialogHeader>
              <Button variant="outline" className="h-10 w-full" onClick={onDone}>
                Done
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.96 10.96 0 0 0 12 1 11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  )
}
