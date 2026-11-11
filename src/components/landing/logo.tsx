import { siteConfig } from "@/config/site"

export function Logo() {
  return (
    <span className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-amber-400">
        <svg viewBox="0 0 40 40" className="size-4" aria-hidden>
          <path
            d="M13 11v18M27 11l-9 9 9 9"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {siteConfig.name}
    </span>
  )
}
