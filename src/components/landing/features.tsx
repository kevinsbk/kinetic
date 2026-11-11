"use client"

import { motion } from "motion/react"
import { ArrowRight, CalendarClock, Crown, Gavel, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"

type Feature = {
  icon: LucideIcon
  title: string
  body: string
  visual: React.ReactNode
  className?: string
}

const features: Feature[] = [
  {
    icon: Gavel,
    title: "Autonomous Judge & Mentor Pairing",
    body: "Agents read every team's stack and stage, then send the right judges and mentors to the right tables. No clipboard needed.",
    visual: <PairingVisual />,
    className: "md:col-span-2",
  },
  {
    icon: Crown,
    title: "Instant VIP & Attendee Matchmaking",
    body: "Sponsors, investors and first-timers get a short list of introductions ranked by mutual intent, not a crowded room.",
    visual: <MatchVisual />,
  },
  {
    icon: CalendarClock,
    title: "Zero-Touch Scheduling",
    body: "Demo slots, office hours and judging rounds sort themselves out across every calendar. Reschedules update everyone in seconds.",
    visual: <ScheduleVisual />,
    className: "md:col-span-3 md:grid md:grid-cols-[1fr_1.4fr] md:items-center",
  },
]

export function Features() {
  return (
    <section id="events" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Built for hackathons & special events"
          title="Run the room"
          accent="without running it."
          body="Hosting a demo day, hackathon or summit? Let the agents handle logistics so you can spend your time with people."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ y: 24 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-white/[0.02] transition-colors hover:border-white/[0.12]",
                f.className
              )}
            >
              <div className="relative h-52 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_70%)] md:h-56">
                {f.visual}
              </div>
              <div className="p-6 sm:p-7 md:order-first">
                <span className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                  <f.icon className="size-4 text-amber-300" />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em] text-zinc-50">{f.title}</h3>
                <p className="mt-2 max-w-md text-[14px] leading-relaxed text-zinc-400">{f.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function PairingVisual() {
  const rows = [
    { team: "Team Nova", track: "Infra", judge: "Dr. Lin", tone: "from-indigo-300 to-indigo-600" },
    { team: "Ghostwire", track: "Security", judge: "A. Patel", tone: "from-rose-300 to-rose-600" },
    { team: "Loom Labs", track: "Design", judge: "M. Osei", tone: "from-amber-300 to-orange-500" },
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-6 sm:px-10">
      {rows.map((r, i) => (
        <motion.div
          key={r.team}
          initial={{ x: -12 }}
          whileInView={{ x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.1, duration: 0.6 }}
          className="flex items-center gap-3 text-[13px]"
        >
          <span className="w-28 shrink-0 rounded-lg border border-white/[0.08] bg-[#111113] px-3 py-2 text-zinc-200">
            {r.team}
          </span>
          <span className="relative h-px flex-1 bg-white/10">
            <motion.span
              className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-amber-300 shadow-[0_0_10px_#fcd34d]"
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            />
            <span className="absolute -top-5 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] text-zinc-600 sm:block">
              {r.track}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.08] bg-[#111113] px-3 py-2 text-zinc-200">
            <span className={`size-4 rounded-full bg-gradient-to-br ${r.tone}`} />
            {r.judge}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

function MatchVisual() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative flex items-center">
        <span className="z-10 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-sm font-semibold text-black ring-4 ring-[#0c0c0e]">
          VIP
        </span>
        <span className="-ml-3 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-300 to-indigo-600 text-sm font-semibold text-black ring-4 ring-[#0c0c0e]">
          You
        </span>
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-10 left-1/2 z-20 -translate-x-1/2 rounded-full border border-amber-300/30 bg-[#18181b] px-2.5 py-1 font-mono text-[11px] text-amber-200"
        >
          97% fit
        </motion.span>
      </div>
    </div>
  )
}

function ScheduleVisual() {
  const slots = [
    { t: "14:00", start: "0%", w: "46%", label: "Judging · Round 1", c: "bg-indigo-400/25 border-indigo-300/30" },
    { t: "15:30", start: "30%", w: "34%", label: "Mentor office hours", c: "bg-emerald-400/20 border-emerald-300/30" },
    { t: "17:00", start: "52%", w: "48%", label: "Demo stage", c: "bg-amber-400/20 border-amber-300/30" },
  ]
  return (
    <div className="flex h-full flex-col justify-center gap-3 px-6 sm:px-10">
      {slots.map((s, i) => (
        <div key={s.t} className="flex items-center gap-4">
          <span className="w-10 font-mono text-[11px] text-zinc-600">{s.t}</span>
          <div className="relative h-9 flex-1 rounded-lg bg-white/[0.025]">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ left: s.start, width: s.w, originX: 0 }}
              className={`absolute inset-y-0 flex items-center gap-1.5 rounded-lg border px-3 text-[12px] whitespace-nowrap text-zinc-100 ${s.c}`}
            >
              {s.label}
              {i === 1 && <ArrowRight className="size-3 text-zinc-400" />}
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  )
}
