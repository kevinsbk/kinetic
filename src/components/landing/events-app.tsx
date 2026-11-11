"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  Bot,
  Check,
  Clock,
  Coffee,
  Footprints,
  Lightbulb,
  MapPin,
  Search,
  Server,
  Sparkles,
  Users,
  Wine,
} from "lucide-react"

import { appEvents, type AppEvent } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useJoinDialog } from "./join-dialog"
import { SectionHeading } from "./section-heading"

const glyphs = {
  coffee: Coffee,
  server: Server,
  lightbulb: Lightbulb,
  wine: Wine,
  run: Footprints,
  bot: Bot,
} as const

const tabs = ["For you", "Going", "Hosting"] as const
type Tab = (typeof tabs)[number]

/** Dates depend on the viewer's clock, so resolve them after mount to avoid hydration mismatches. */
function useToday() {
  const [today, setToday] = React.useState<Date | null>(null)
  React.useEffect(() => setToday(new Date()), [])
  return today
}

function dayInfo(today: Date | null, offset: number) {
  const fallback = ["Today", "Tomorrow", "In 2 days"][offset] ?? `In ${offset} days`
  if (!today) return { label: fallback, weekday: "", month: "", day: "" }
  const d = new Date(today)
  d.setDate(d.getDate() + offset)
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" })
  return {
    label: offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : weekday,
    weekday,
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()),
  }
}

export function EventsApp() {
  const today = useToday()
  const [tab, setTab] = React.useState<Tab>("For you")
  const [selectedId, setSelectedId] = React.useState(appEvents[0].id)
  const [going, setGoing] = React.useState<Set<string>>(
    () => new Set(appEvents.filter((e) => e.status === "going").map((e) => e.id))
  )

  const visible = appEvents.filter((e) => (tab === "Going" ? going.has(e.id) : tab === "For you"))
  const groups = groupByDay(visible)
  const selected = appEvents.find((e) => e.id === selectedId) ?? appEvents[0]

  function toggleGoing(id: string) {
    setGoing((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section id="app" className="relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="The app"
          title="Your week,"
          accent="already planned."
          body="This is what your feed looks like after a few swipes. Small rooms with people worth meeting, each on a time that already works for everyone."
        />

        <motion.div
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 overflow-hidden rounded-[22px] border border-white/10 bg-[#0c0c0e] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.9)]"
        >
          <AppChrome />

          <div className="grid lg:grid-cols-[1fr_400px]">
            {/* Feed */}
            <div className="min-w-0 border-white/[0.06] p-5 sm:p-8 lg:border-r">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="text-[28px] font-semibold tracking-[-0.03em] text-zinc-50">Events</h3>
                <div className="flex rounded-lg bg-white/[0.04] p-0.5 text-[13px]">
                  {tabs.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className={cn(
                        "relative rounded-md px-3 py-1.5 transition-colors",
                        tab === t ? "text-zinc-50" : "text-zinc-500 hover:text-zinc-300"
                      )}
                    >
                      {tab === t && (
                        <motion.span
                          layoutId="tab-pill"
                          className="absolute inset-0 rounded-md bg-white/[0.08]"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative">{t}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                {groups.length === 0 && (
                  <p className="rounded-xl border border-dashed border-white/10 p-10 text-center text-sm text-zinc-500">
                    {tab === "Hosting"
                      ? "You're not hosting anything. You don't need to. Agents do it."
                      : "Nothing yet. Tap an event and hit Join."}
                  </p>
                )}

                {groups.map(([offset, events]) => {
                  const info = dayInfo(today, offset)
                  return (
                    <div key={offset} className="relative grid grid-cols-[18px_1fr] gap-x-4 pb-8 last:pb-0 sm:grid-cols-[120px_1fr]">
                      {/* timeline rail */}
                      <div className="relative">
                        <span className="absolute top-[9px] left-[5px] size-2 rounded-full bg-zinc-600 ring-4 ring-[#0c0c0e] sm:left-auto sm:right-[-21px]" />
                        <span className="absolute top-5 bottom-[-12px] left-[8px] border-l border-dashed border-white/10 sm:left-auto sm:right-[-18px]" />
                        <p className="hidden text-[15px] font-medium text-zinc-200 sm:block">{info.label}</p>
                        <p className="hidden text-[13px] text-zinc-500 sm:block">{offset > 1 ? "" : info.weekday}</p>
                      </div>

                      <div className="min-w-0">
                        <p className="mb-3 text-[15px] font-medium text-zinc-200 sm:hidden">
                          {info.label} <span className="text-zinc-500">{offset > 1 ? "" : info.weekday}</span>
                        </p>
                        <div className="space-y-3">
                          {events.map((e) => (
                            <EventRow
                              key={e.id}
                              event={e}
                              active={e.id === selected.id}
                              going={going.has(e.id)}
                              onSelect={() => setSelectedId(e.id)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Detail */}
            <div className="border-t border-white/[0.06] bg-white/[0.015] lg:border-t-0">
              <AnimatePresence mode="wait">
                <EventDetail
                  key={selected.id}
                  event={selected}
                  info={dayInfo(today, selected.dayOffset)}
                  going={going.has(selected.id)}
                  onToggle={() => toggleGoing(selected.id)}
                />
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function groupByDay(events: AppEvent[]) {
  const map = new Map<number, AppEvent[]>()
  for (const e of events) map.set(e.dayOffset, [...(map.get(e.dayOffset) ?? []), e])
  return [...map.entries()].sort(([a], [b]) => a - b)
}

function AppChrome() {
  return (
    <div className="flex items-center gap-4 border-b border-white/[0.06] px-4 py-3">
      <div className="flex gap-1.5">
        <span className="size-3 rounded-full bg-[#ff5f57]/80" />
        <span className="size-3 rounded-full bg-[#febc2e]/80" />
        <span className="size-3 rounded-full bg-[#28c840]/80" />
      </div>
      <div className="mx-auto flex h-7 w-full max-w-xs items-center justify-center gap-2 rounded-md bg-white/[0.04] font-mono text-[11px] text-zinc-500">
        <Search className="size-3" /> kinetic.events/discover
      </div>
      <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-[10px] font-semibold text-black">
        YOU
      </span>
    </div>
  )
}

function Cover({ event, className }: { event: AppEvent; className?: string }) {
  const Glyph = glyphs[event.cover.glyph]
  return (
    <div
      className={cn("grain relative overflow-hidden", className)}
      style={{ background: event.cover.gradient }}
    >
      <Glyph className="absolute top-1/2 left-1/2 size-[38%] -translate-x-1/2 -translate-y-1/2 text-white/85 drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)]" strokeWidth={1.4} />
    </div>
  )
}

function EventRow({
  event,
  active,
  going,
  onSelect,
}: {
  event: AppEvent
  active: boolean
  going: boolean
  onSelect: () => void
}) {
  return (
    <motion.button
      type="button"
      layout
      onClick={onSelect}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "group flex w-full gap-3 rounded-2xl border p-3.5 text-left sm:gap-4 sm:p-4 transition-colors",
        active
          ? "border-white/15 bg-white/[0.06]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[13px] text-zinc-500">
          {event.time}
          <span className="mx-1.5 text-zinc-700">·</span>
          <span className="text-amber-300/90">{event.match}% match</span>
        </p>
        <p className="mt-1 text-[17px] leading-snug font-semibold tracking-[-0.01em] text-zinc-100">
          {event.title}
        </p>
        <p className="mt-2 flex items-center gap-1.5 truncate text-[13px] text-zinc-400">
          <Avatar initials={event.host.initials} size="xs" /> By {event.host.name}
        </p>
        <p className="mt-1 flex items-center gap-1.5 truncate text-[13px] text-zinc-500">
          <MapPin className="size-3.5 shrink-0" /> {event.venue}
        </p>
        <div className="mt-3 flex items-center gap-2">
          {going ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-400/10 px-2 py-0.5 text-[12px] font-medium text-emerald-300">
              <Check className="size-3" /> Going
            </span>
          ) : event.status === "almost-full" ? (
            <span className="rounded-md bg-amber-400/10 px-2 py-0.5 text-[12px] font-medium text-amber-300">
              1 seat left
            </span>
          ) : (
            <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[12px] text-zinc-400">{event.seats}</span>
          )}
          <AttendeeStack event={event} />
        </div>
      </div>
      <Cover event={event} className="size-[72px] shrink-0 rounded-xl sm:size-[104px]" />
    </motion.button>
  )
}

function EventDetail({
  event,
  info,
  going,
  onToggle,
}: {
  event: AppEvent
  info: ReturnType<typeof dayInfo>
  going: boolean
  onToggle: () => void
}) {
  const { openJoin } = useJoinDialog()

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
      className="p-5 sm:p-8"
    >
      <Cover event={event} className="aspect-[4/3] w-full rounded-2xl" />

      <h4 className="mt-6 text-[22px] leading-tight font-semibold tracking-[-0.02em] text-zinc-50">
        {event.title}
      </h4>

      <div className="mt-3 flex items-center gap-2.5">
        <Avatar initials={event.host.initials} />
        <div className="min-w-0">
          <p className="truncate text-sm text-zinc-200">{event.host.name}</p>
          <p className="truncate text-[12px] text-zinc-500">{event.host.role}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 flex-col overflow-hidden rounded-lg border border-white/10 text-center">
            <span className="bg-white/[0.06] py-px text-[9px] font-semibold tracking-wider text-zinc-400">
              {info.month || "—"}
            </span>
            <span className="flex flex-1 items-center justify-center text-[15px] font-semibold text-zinc-100">
              {info.day || "·"}
            </span>
          </div>
          <div>
            <p className="text-sm text-zinc-200">{info.label === info.weekday ? info.weekday : `${info.label}, ${info.weekday}`}</p>
            <p className="flex items-center gap-1 text-[12px] text-zinc-500">
              <Clock className="size-3" /> {event.time} · {event.duration}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/10">
            <MapPin className="size-4 text-zinc-400" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm text-zinc-200">{event.venue}</p>
            <p className="truncate text-[12px] text-zinc-500">{event.area}</p>
          </div>
        </div>
      </div>

      {/* Agent rationale */}
      <div className="mt-6 rounded-xl border border-amber-400/20 bg-gradient-to-b from-amber-400/[0.07] to-transparent p-4">
        <p className="flex items-center gap-1.5 text-[12px] font-medium tracking-wide text-amber-300">
          <Sparkles className="size-3.5" /> Why your agent picked this
        </p>
        <ul className="mt-3 space-y-2">
          {event.why.map((w) => (
            <li key={w} className="flex gap-2 text-[13px] leading-snug text-zinc-300">
              <Check className="mt-0.5 size-3.5 shrink-0 text-amber-400/80" /> {w}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between text-[13px] text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Users className="size-3.5" /> {event.seats}
        </span>
        <AttendeeStack event={event} />
      </div>

      <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={onToggle}
          className={cn(
            "flex h-11 items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors",
            going
              ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
              : "bg-zinc-50 text-zinc-950 hover:bg-white"
          )}
        >
          {going ? (
            <>
              <Check className="size-4" /> You&apos;re going
            </>
          ) : (
            "Join event"
          )}
        </motion.button>
        <button
          type="button"
          onClick={openJoin}
          className="h-11 rounded-xl border border-white/10 px-4 text-sm text-zinc-300 transition-colors hover:bg-white/[0.05]"
        >
          Get the app
        </button>
      </div>
    </motion.div>
  )
}

const avatarTones = [
  "from-amber-300 to-orange-500",
  "from-indigo-300 to-indigo-600",
  "from-emerald-300 to-teal-600",
  "from-rose-300 to-rose-600",
  "from-sky-300 to-blue-600",
]

function tone(initials: string) {
  const n = [...initials].reduce((a, c) => a + c.charCodeAt(0), 0)
  return avatarTones[n % avatarTones.length]
}

function Avatar({ initials, size = "md" }: { initials: string; size?: "xs" | "md" }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-black/80",
        tone(initials),
        size === "xs" ? "size-4 text-[7px]" : "size-8 text-[11px]"
      )}
    >
      {initials}
    </span>
  )
}

function AttendeeStack({ event }: { event: AppEvent }) {
  return (
    <span className="flex items-center">
      <span className="flex -space-x-1.5">
        {event.attendees.map((a) => (
          <span
            key={a}
            className={cn("size-5 rounded-full bg-gradient-to-br ring-2 ring-[#0c0c0e]", tone(a))}
          />
        ))}
      </span>
      {event.extra > 0 && <span className="ml-1.5 text-[12px] text-zinc-500">+{event.extra}</span>}
    </span>
  )
}
