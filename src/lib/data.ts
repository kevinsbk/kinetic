import {
  Coffee,
  Cpu,
  Dumbbell,
  Footprints,
  Wine,
  type LucideIcon,
} from "lucide-react"

export type InterestId = "tech" | "coffee" | "fitness" | "games" | "family"

export type Interest = {
  id: InterestId
  label: string
  icon: LucideIcon
}

export const interests: Interest[] = [
  { id: "tech", label: "Tech & AI Hackathons", icon: Cpu },
  { id: "coffee", label: "Coffee & Deep Tech", icon: Coffee },
  { id: "fitness", label: "Hypertrophy & Fitness", icon: Dumbbell },
  { id: "games", label: "Board Games & Wine", icon: Wine },
  { id: "family", label: "Seniors & Family Walks", icon: Footprints },
]

export type EventConcept = {
  id: string
  interest: InterestId
  title: string
  blurb: string
  when: string
  where: string
  size: string
  match: string
}

export const eventConcepts: EventConcept[] = [
  {
    id: "e1",
    interest: "tech",
    title: "48h Agent Build Sprint",
    blurb: "Ship an autonomous agent with strangers who become co-founders.",
    when: "Sat · 10:00 AM",
    where: "SoMa Loft, SF",
    size: "24 builders",
    match: "Match Found: 3 nearby founders free Thursday 6 PM",
  },
  {
    id: "e2",
    interest: "coffee",
    title: "Pour-overs & Protocols",
    blurb: "Small-table chats on ZK proofs, robotics and frontier models.",
    when: "Thu · 8:30 AM",
    where: "Ritual Coffee, Valencia",
    size: "6 people",
    match: "Match Found: 2 ML researchers within 1 mi, free Thu AM",
  },
  {
    id: "e3",
    interest: "fitness",
    title: "Push Day Collective",
    blurb: "Progressive overload, spotters included, protein shakes after.",
    when: "Tue · 6:30 PM",
    where: "Ironworks Gym",
    size: "8 lifters",
    match: "Match Found: 4 lifters on your split, free Tue 6:30 PM",
  },
  {
    id: "e4",
    interest: "games",
    title: "Catan & Cabernet",
    blurb: "Euro-games, natural wine, and a table that actually shows up.",
    when: "Fri · 7:00 PM",
    where: "The Board Room, Mission",
    size: "5 players",
    match: "Match Found: 1 table of 4, all free Friday 7 PM",
  },
  {
    id: "e5",
    interest: "family",
    title: "Golden Gate Morning Loop",
    blurb: "A gentle 3-mile walk, stroller- and grandparent-friendly.",
    when: "Sun · 9:00 AM",
    where: "Crissy Field",
    size: "12 walkers",
    match: "Match Found: 3 families nearby, free Sunday morning",
  },
  {
    id: "e6",
    interest: "tech",
    title: "Demo Night: Local LLMs",
    blurb: "Five-minute demos of on-device models. Pizza is decentralized.",
    when: "Wed · 7:00 PM",
    where: "Hacker Dojo",
    size: "40 people",
    match: "Match Found: 5 on-device AI tinkerers free Wednesday",
  },
  {
    id: "e7",
    interest: "coffee",
    title: "Founders' Espresso Hour",
    blurb: "No pitches. Just honest notes from people building hard things.",
    when: "Mon · 8:00 AM",
    where: "Sightglass, SoMa",
    size: "6 founders",
    match: "Match Found: 3 nearby founders free Monday 8 AM",
  },
]

/* ------------------------------------------------------------------ */
/* App feed (Luma-style "Upcoming" list)                               */
/* ------------------------------------------------------------------ */

export type AppEvent = {
  id: string
  /** Days from today — the date tile is computed client-side */
  dayOffset: number
  time: string
  duration: string
  title: string
  host: { name: string; role: string; initials: string }
  venue: string
  area: string
  seats: string
  attendees: string[]
  extra: number
  match: number
  why: string[]
  cover: { gradient: string; glyph: "coffee" | "server" | "lightbulb" | "wine" | "run" | "bot" }
  /** Pre-set RSVP state for the demo */
  status?: "going" | "almost-full"
}

export const appEvents: AppEvent[] = [
  {
    id: "yc-coffee",
    dayOffset: 0,
    time: "8:30 AM",
    duration: "45 min",
    title: "Coffee chat with a YC founder",
    host: { name: "Priya Raman", role: "Founder · YC W25, dev tools", initials: "PR" },
    venue: "Sightglass Coffee",
    area: "SoMa, San Francisco",
    seats: "4 seats · 1 left",
    attendees: ["JK", "AL", "MS"],
    extra: 0,
    match: 96,
    why: [
      "You both starred the same agent-infra repos this month",
      "8:30–9:15 is open on both calendars",
      "6 minute walk from your morning location",
    ],
    cover: {
      gradient:
        "radial-gradient(at 20% 15%, #f59e0b 0, transparent 55%), radial-gradient(at 85% 80%, #ea580c 0, transparent 50%), linear-gradient(135deg, #451a03, #1c1917)",
      glyph: "coffee",
    },
    status: "almost-full",
  },
  {
    id: "google-dumplings",
    dayOffset: 0,
    time: "6:30 PM",
    duration: "2 hrs",
    title: "Distributed systems & dumplings with Google engineers",
    host: { name: "Marcus Lee", role: "Staff Software Engineer, Google", initials: "ML" },
    venue: "Dumpling Home",
    area: "Hayes Valley, San Francisco",
    seats: "8 seats",
    attendees: ["TW", "RS", "NK", "EB"],
    extra: 3,
    match: 91,
    why: [
      "You asked about consensus protocols in your interest notes",
      "3 of the 8 are also preparing for infra interviews",
      "You're free after 6 PM today",
    ],
    cover: {
      gradient:
        "radial-gradient(at 80% 20%, #22d3ee 0, transparent 50%), radial-gradient(at 15% 85%, #4f46e5 0, transparent 55%), linear-gradient(160deg, #0c4a6e, #0f172a)",
      glyph: "server",
    },
    status: "going",
  },
  {
    id: "meta-pm",
    dayOffset: 1,
    time: "12:00 PM",
    duration: "1 hr",
    title: "Meta PM office hours: product sense teardown",
    host: { name: "Dana Okafor", role: "Product Manager, Meta", initials: "DO" },
    venue: "Philz Coffee",
    area: "Mission, San Francisco",
    seats: "6 seats",
    attendees: ["SH", "VP"],
    extra: 2,
    match: 88,
    why: [
      "You're moving from engineering into product",
      "Dana prefers small groups of under 6. You'd be the 5th",
      "Lunch hour is open on your calendar",
    ],
    cover: {
      gradient:
        "radial-gradient(at 25% 25%, #818cf8 0, transparent 50%), radial-gradient(at 80% 75%, #c084fc 0, transparent 50%), linear-gradient(135deg, #1e1b4b, #18181b)",
      glyph: "lightbulb",
    },
  },
  {
    id: "supper-club",
    dayOffset: 1,
    time: "7:30 PM",
    duration: "2.5 hrs",
    title: "Founders & funders supper club",
    host: { name: "Assembled by Kinetic", role: "No host. Agents picked the table", initials: "K" },
    venue: "Private dining room",
    area: "Russian Hill, San Francisco",
    seats: "10 seats",
    attendees: ["AB", "CY", "LO", "GF"],
    extra: 5,
    match: 84,
    why: [
      "2 pre-seed angels here invest in your category",
      "Seating was balanced so nobody pitches twice",
      "Dietary preferences are already sent to the kitchen",
    ],
    cover: {
      gradient:
        "radial-gradient(at 70% 25%, #fb7185 0, transparent 50%), radial-gradient(at 20% 80%, #b45309 0, transparent 55%), linear-gradient(135deg, #4c0519, #1c1917)",
      glyph: "wine",
    },
  },
  {
    id: "stripe-run",
    dayOffset: 2,
    time: "7:00 AM",
    duration: "1 hr",
    title: "Stripe engineers run club · Embarcadero 5K",
    host: { name: "Jules Martin", role: "Infrastructure Engineer, Stripe", initials: "JM" },
    venue: "Ferry Building steps",
    area: "Embarcadero, San Francisco",
    seats: "Open · 14 going",
    attendees: ["KD", "MP", "OS"],
    extra: 11,
    match: 79,
    why: [
      "Matches your Hypertrophy & Fitness node",
      "Easy pace group of about 9:30/mi, same as your Strava",
      "Coffee after, with 4 people from fintech",
    ],
    cover: {
      gradient:
        "radial-gradient(at 20% 20%, #34d399 0, transparent 50%), radial-gradient(at 85% 80%, #0ea5e9 0, transparent 55%), linear-gradient(135deg, #064e3b, #0f172a)",
      glyph: "run",
    },
  },
  {
    id: "agents-hackathon",
    dayOffset: 2,
    time: "10:00 AM",
    duration: "48 hrs",
    title: "Hackathon: agents that actually book things",
    host: { name: "Kinetic × SF builders", role: "Judges paired by agents", initials: "K×" },
    venue: "Shack15",
    area: "Ferry Building, San Francisco",
    seats: "40 builders",
    attendees: ["HN", "ZT", "RB", "CQ"],
    extra: 28,
    match: 93,
    why: [
      "2 teams are looking for a full-stack engineer like you",
      "Judge pairing is already set: infra and consumer tracks",
      "Your weekend is clear",
    ],
    cover: {
      gradient:
        "radial-gradient(at 75% 20%, #a3e635 0, transparent 45%), radial-gradient(at 20% 80%, #6366f1 0, transparent 55%), linear-gradient(135deg, #1a2e05, #0f0f1a)",
      glyph: "bot",
    },
  },
]
