"use client"

import { QRCodeSVG } from "qrcode.react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

/**
 * Dark-on-light QR for reliable scanning, with the brand mark excavated in the center.
 */
export function KineticQR({ size = 168, className }: { size?: number; className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-[#fafaf9] p-4", className)}>
      <QRCodeSVG
        value={siteConfig.joinUrl}
        size={size}
        level="H"
        bgColor="#fafaf9"
        fgColor="#09090b"
        marginSize={0}
        imageSettings={{
          src: "/qr-mark.svg",
          height: size * 0.2,
          width: size * 0.2,
          excavate: true,
        }}
        className="block h-auto w-full"
      />
    </div>
  )
}
