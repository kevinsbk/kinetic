"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { ArrowUpRight, Sparkles } from "lucide-react"

import { siteConfig } from "@/config/site"
import { KineticQR } from "./qr-code"
import { useJoinDialog } from "./join-dialog"
import { WaitlistForm } from "./waitlist-form"

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.1 + i * 0.09, duration: 0.8, ease },
  }),
}

const queueFaces = [
  "from-amber-300 to-orange-500",
  "from-indigo-400 to-violet-600",
  "from-emerald-300 to-teal-600",
  "from-rose-300 to-pink-600",
]

export function Hero() {
  const [lead, rest] = siteConfig.tagline.split(", ")

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute top-[-10%] right-[-5%] h-[620px] w-[620px] rounded-full bg-[conic-gradient(from_200deg,#6366f1,#f59e0b,#6366f1)] opacity-[0.16] blur-[140px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 pt-16 pb-24 sm:px-6 lg:grid-cols-[1.35fr_1fr] lg:gap-10 lg:pt-24 lg:pb-32">
        <div>
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pr-3 pl-1 text-[13px] text-zinc-400 backdrop-blur">
              <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                Beta
              </span>
              <span className="hidden sm:inline">Decentralized Event Planning</span>
              <span className="hidden text-zinc-700 sm:inline">•</span>
              <span className="text-zinc-200">Powered by Autonomous AI</span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-7 text-[3.4rem] leading-[0.95] font-semibold tracking-[-0.045em] text-zinc-50 sm:text-7xl lg:text-[5.25rem]"
          >
            {lead},
            <br />
            <span className="font-serif text-[1.08em] lg:whitespace-nowrap font-normal tracking-[-0.02em] italic text-zinc-300">
              {rest}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-7 max-w-[34rem] text-[17px] leading-relaxed text-zinc-400"
          >
            {siteConfig.description}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-9">
            <WaitlistForm />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-6 flex items-center gap-3 text-[13px] text-zinc-500"
          >
            <div className="flex -space-x-2">
              {queueFaces.map((g) => (
                <span key={g} className={`size-6 rounded-full bg-gradient-to-br ${g} ring-2 ring-background`} />
              ))}
            </div>
            <span>
              <span className="text-zinc-300">1,283</span> people queued in SF, NYC and London
            </span>
          </motion.div>
        </div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 40, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.25, duration: 1, ease }}
        >
          <PassCard />
        </motion.div>
      </div>
    </section>
  )
}

/** Ticket-style pass holding the QR. Tilts toward the cursor. */
function PassCard() {
  const { openJoin } = useJoinDialog()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 150, damping: 18 })
  const sheenX = useTransform(mx, [0, 1], ["0%", "100%"])

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  function onLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div className="relative [perspective:1200px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      {/* glow pooled under the card */}
      <div aria-hidden className="absolute inset-x-6 -bottom-6 h-24 rounded-full bg-amber-500/25 blur-3xl" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-[330px] rounded-[28px] border border-white/10 bg-gradient-to-b from-[#17171a] to-[#0d0d0f] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] sm:w-[360px]"
      >
        {/* holographic sheen */}
        <motion.div
          aria-hidden
          style={{ backgroundPositionX: sheenX }}
          className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.07)_45%,rgba(245,158,11,0.08)_50%,transparent_65%)] bg-[length:250%_100%]"
        />

        <div className="p-6 pb-5">
          <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase">
            <span>{siteConfig.name} Pass</span>
            <span>Cohort 04</span>
          </div>
          <p className="mt-5 font-serif text-[30px] leading-none italic text-zinc-100">
            Scan to Join
          </p>
          <p className="mt-1 text-sm text-zinc-400">& preview the live demo</p>
        </div>

        {/* perforation */}
        <div className="relative h-6">
          <span className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full border-r border-white/10 bg-background" />
          <span className="absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full border-l border-white/10 bg-background" />
          <span className="absolute inset-x-5 top-1/2 border-t border-dashed border-white/10" />
        </div>

        <div className="px-6 pt-4 pb-6">
          <button
            type="button"
            onClick={openJoin}
            aria-label="Open join flow"
            className="relative block w-full cursor-pointer overflow-hidden rounded-2xl transition-transform duration-300 hover:scale-[1.015]"
          >
            <KineticQR size={280} className="shadow-none" />
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 h-12 bg-gradient-to-b from-transparent via-amber-400/25 to-transparent"
              animate={{ top: ["-15%", "100%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
            />
          </button>

          {/* live micro-link preview */}
          <button
            type="button"
            onClick={openJoin}
            className="group mt-4 flex w-full items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5 text-left transition-colors hover:bg-white/[0.06]"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-indigo-500">
              <Sparkles className="size-4 text-white" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium text-zinc-200">
                {siteConfig.name} · Live demo
              </span>
              <span className="block truncate font-mono text-[11px] text-zinc-500">
                {siteConfig.previewUrl}
              </span>
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-emerald-400">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
              </span>
              LIVE
            </span>
            <ArrowUpRight className="size-4 text-zinc-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
