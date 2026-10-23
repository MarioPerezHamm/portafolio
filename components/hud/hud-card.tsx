"use client"

import { ReactNode } from "react"
import { motion, HTMLMotionProps } from "framer-motion"

interface HudCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  accentColor?: "green" | "cyan"
  showCorners?: boolean
  headerTitle?: string
  statusTag?: string
}

export function HudCard({
  children,
  className = "",
  accentColor = "green",
  showCorners = true,
  headerTitle,
  statusTag,
  ...props
}: HudCardProps) {
  const isCyan = accentColor === "cyan"
  const cornerColor = isCyan ? "border-[#00E5FF]" : "border-[#00FF66]"
  const glowBorder = isCyan
    ? "hover:border-[#00E5FF]/60 hover:shadow-[0_0_25px_rgba(0,229,255,0.18)]"
    : "hover:border-[#00FF66]/60 hover:shadow-[0_0_25px_rgba(0,255,102,0.18)]"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`hud-panel relative rounded-sm p-5 md:p-6 transition-all duration-300 ${glowBorder} ${className}`}
      {...props}
    >
      {/* HUD Corner Tech Brackets */}
      {showCorners && (
        <>
          <div className={`hud-corner-tl ${cornerColor}`} />
          <div className={`hud-corner-tr ${cornerColor}`} />
          <div className={`hud-corner-bl ${cornerColor}`} />
          <div className={`hud-corner-br ${cornerColor}`} />
        </>
      )}

      {/* Optional HUD Header Bar */}
      {(headerTitle || statusTag) && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-primary/15 text-xs font-mono tracking-wider">
          {headerTitle && (
            <div className="flex items-center gap-2 text-primary/80 uppercase font-semibold">
              <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
              <span>{headerTitle}</span>
            </div>
          )}
          {statusTag && (
            <span className="text-primary/50 text-[11px] font-mono">
              [{statusTag}]
            </span>
          )}
        </div>
      )}

      {children}
    </motion.div>
  )
}
