export function SectionHeading({
  eyebrow,
  title,
  accent,
  body,
}: {
  eyebrow: string
  title: string
  /** Rendered in the italic serif after the title */
  accent?: string
  body: string
}) {
  return (
    <div className="max-w-3xl">
      <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-amber-400/90 uppercase">
        <span className="h-px w-6 bg-amber-400/60" />
        {eyebrow}
      </p>
      <h2 className="mt-5 text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-zinc-50 sm:text-[3.4rem]">
        {title}
        {accent && (
          <>
            {" "}
            <span className="font-serif font-normal tracking-[-0.01em] italic text-zinc-300">{accent}</span>
          </>
        )}
      </h2>
      <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-zinc-400">{body}</p>
    </div>
  )
}
