"use client"

import * as React from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
  type Variants,
} from "motion/react"
import { Bot, Calendar, Heart, MapPin, RotateCcw, Sparkles, Users, X } from "lucide-react"

import { eventConcepts, interests, type EventConcept, type InterestId } from "@/lib/data"
import { cn } from "@/lib/utils"
import { SectionHeading } from "./section-heading"

const SWIPE_THRESHOLD = 110
type Direction = "left" | "right"

// Resolved with AnimatePresence's `custom` so the card flies off the side it was swiped to
const exitVariants: Variants = {
  exit: (dir: Direction) => ({
    x: dir === "right" ? 420 : -420,
    rotate: dir === "right" ? 18 : -18,
    opacity: 0,
    transition: { duration: 0.35 },
  }),
}

export function MatchPreview() {
  const [active, setActive] = React.useState<InterestId[]>(["tech", "coffee"])
  const [decided, setDecided] = React.useState<string[]>([])
  const [exitDir, setExitDir] = React.useState<Direction>("right")
  const [feedback, setFeedback] = React.useState<{ id: string; text: string } | null>(null)
  const [analyzing, setAnalyzing] = React.useState(false)
  const [liked, setLiked] = React.useState(0)

  const deck = eventConcepts.filter(
    (e) => (active.length === 0 || active.includes(e.interest)) && !decided.includes(e.id)
  )
  const top = deck[0]

  function toggleTag(id: InterestId) {
    setActive((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  function decide(dir: Direction) {
    if (!top) return
    setExitDir(dir)
    setDecided((d) => [...d, top.id])
    if (dir === "right") {
      setLiked((n) => n + 1)
      setFeedback(null)
      setAnalyzing(true)
      const card = top
      setTimeout(() => {
        setAnalyzing(false)
        setFeedback({ id: card.id, text: card.match })
      }, 700)
    }
  }

  function reset() {
    setDecided([])
    setFeedback(null)
    setLiked(0)
  }

  return (
    <section id="how-it-works" className="relative border-t border-white/[0.06] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Interest nodes, not listings"
          title="Stop scrolling."
          accent="Start signaling."
          body="Toggle what you're into and react to a few ideas. Your agent works out the rest: the time, the place, and who's worth meeting."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Interest nodes */}
          <div className="flex flex-col rounded-[22px] border border-white/[0.07] bg-white/[0.02] p-6 sm:p-8">
            <p className="text-[15px] font-medium text-zinc-100">Your interest nodes</p>
            <p className="mt-1 text-[13px] text-zinc-500">Tap to toggle. The deck re-weights instantly.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {interests.map(({ id, label, icon: Icon }) => {
                const on = active.includes(id)
                return (
                  <motion.button
                    key={id}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleTag(id)}
                    aria-pressed={on}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] transition-all duration-200",
                      on
                        ? "border-amber-300/40 bg-amber-300/[0.12] text-amber-100"
                        : "border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                    )}
                  >
                    <Icon className={cn("size-3.5", on && "text-amber-300")} />
                    {label}
                  </motion.button>
                )
              })}
            </div>

            <div className="mt-8 grid grid-cols-3 border-t border-white/[0.06] pt-6">
              <Stat label="Nodes active" value={active.length || interests.length} />
              <Stat label="In your deck" value={deck.length} />
              <Stat label="Interested" value={liked} />
            </div>

            <div className="mt-6 flex min-h-[76px] flex-1 items-end">
              <AnimatePresence mode="wait">
                {analyzing ? (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex w-full items-center gap-2 rounded-xl border border-white/[0.07] p-4 text-[13px] text-zinc-400"
                  >
                    <Bot className="size-4 animate-pulse text-indigo-300" />
                    Agents negotiating calendars…
                  </motion.div>
                ) : feedback ? (
                  <motion.div
                    key={feedback.id}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="flex w-full items-start gap-3 rounded-xl border border-amber-300/25 bg-amber-300/[0.07] p-4"
                  >
                    <Sparkles className="mt-0.5 size-4 shrink-0 text-amber-300" />
                    <p className="text-[14px] text-amber-50">{feedback.text}</p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex w-full items-center gap-2 rounded-xl border border-dashed border-white/[0.08] p-4 text-[13px] text-zinc-500"
                  >
                    <Heart className="size-4" /> Mark something Interested to see your agent work.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Card deck */}
          <div className="flex flex-col items-center justify-center rounded-[22px] border border-white/[0.07] bg-[radial-gradient(ellipse_at_50%_40%,rgba(245,158,11,0.07),transparent_65%)] px-6 py-10">
            <div className="relative h-[330px] w-full max-w-[340px]">
              <AnimatePresence custom={exitDir}>
                {deck
                  .slice(0, 3)
                  .reverse()
                  .map((event, i, arr) => {
                    const depth = arr.length - 1 - i
                    return (
                      <SwipeCard
                        key={event.id}
                        event={event}
                        depth={depth}
                        isTop={depth === 0}
                        onSwipe={decide}
                      />
                    )
                  })}
              </AnimatePresence>

              {!top && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[20px] border border-dashed border-white/10 text-center"
                >
                  <p className="max-w-[220px] text-[13px] text-zinc-500">
                    {decided.length > 0
                      ? "Deck cleared. Your agent has what it needs."
                      : "No concepts for these nodes yet."}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[13px] text-zinc-300 hover:bg-white/5"
                  >
                    <RotateCcw className="size-3.5" /> Reset deck
                  </button>
                </motion.div>
              )}
            </div>

            <div className="mt-10 flex items-center gap-3">
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => decide("left")}
                disabled={!top}
                aria-label="Pass"
                className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors hover:border-rose-400/40 hover:text-rose-300 disabled:opacity-30"
              >
                <X className="size-5" />
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => decide("right")}
                disabled={!top}
                className="flex h-14 items-center gap-2 rounded-full bg-zinc-50 px-7 text-[15px] font-medium text-zinc-950 transition-colors hover:bg-white disabled:opacity-30"
              >
                <Heart className="size-4" /> Interested
              </motion.button>
            </div>
            <p className="mt-3 text-[12px] text-zinc-600">Drag the card, or use the buttons</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SwipeCard({
  event,
  depth,
  isTop,
  onSwipe,
}: {
  event: EventConcept
  depth: number
  isTop: boolean
  onSwipe: (dir: Direction) => void
}) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-12, 12])
  const likeOpacity = useTransform(x, [20, 100], [0, 1])
  const passOpacity = useTransform(x, [-100, -20], [1, 0])
  const interest = interests.find((i) => i.id === event.interest)!
  const Icon = interest.icon

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD) onSwipe("right")
    else if (info.offset.x < -SWIPE_THRESHOLD) onSwipe("left")
  }

  return (
    <motion.div
      className={cn(
        "absolute inset-0 flex flex-col rounded-[20px] border border-white/10 bg-gradient-to-b from-[#18181b] to-[#111113] p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]",
        isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
      )}
      style={{ x, rotate, zIndex: 10 - depth }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={onDragEnd}
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{ scale: 1 - depth * 0.05, y: depth * -14, opacity: depth > 1 ? 0.4 : 1 }}
      variants={exitVariants}
      exit="exit"
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <motion.span
        style={{ opacity: likeOpacity }}
        className="absolute top-6 right-6 rotate-6 rounded-md border-2 border-emerald-400 px-2 py-0.5 text-xs font-bold tracking-wider text-emerald-400"
      >
        IN
      </motion.span>
      <motion.span
        style={{ opacity: passOpacity }}
        className="absolute top-6 right-6 -rotate-6 rounded-md border-2 border-rose-400 px-2 py-0.5 text-xs font-bold tracking-wider text-rose-400"
      >
        PASS
      </motion.span>

      <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[12px] text-zinc-400">
        <Icon className="size-3.5" /> {interest.label}
      </span>

      <h3 className="mt-7 font-serif text-[32px] leading-[1.05] text-zinc-50 italic">{event.title}</h3>
      <p className="mt-3 text-[14px] leading-relaxed text-zinc-400">{event.blurb}</p>

      <div className="mt-auto grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-4 text-[12px] text-zinc-400">
        <p className="flex flex-col gap-1"><Calendar className="size-3.5 text-zinc-600" /> {event.when}</p>
        <p className="flex flex-col gap-1"><MapPin className="size-3.5 text-zinc-600" /> <span className="truncate">{event.where}</span></p>
        <p className="flex flex-col gap-1"><Users className="size-3.5 text-zinc-600" /> {event.size}</p>
      </div>
    </motion.div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[28px] font-semibold tracking-tight text-zinc-50 tabular-nums"
      >
        {value}
      </motion.p>
      <p className="text-[12px] text-zinc-500">{label}</p>
    </div>
  )
}
