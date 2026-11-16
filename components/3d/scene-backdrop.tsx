"use client"

import { useCallback, useEffect, useState, useSyncExternalStore } from "react"
import dynamic from "next/dynamic"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
import type { SceneQuality } from "./network-graph"
import { SceneBoundary } from "./scene-boundary"

const NetworkScene = dynamic(() => import("./network-scene").then((mod) => mod.NetworkScene), { ssr: false })

const LOW_QUALITY_QUERY = "(max-width: 767px), (pointer: coarse)"
const CAMERA_SPRING = { stiffness: 70, damping: 22, mass: 0.6 }
const EXPERIENCE_SECTION_ID = "experience"
const CONTENT_SCENE_OPACITY = 0.75

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

// Right edge of a copy column as a fraction of the viewport width; the scene centres itself in the space beyond it.
function copyEdge(name: string) {
  const column = document.querySelector<HTMLElement>(`[data-scene-copy="${name}"]`)
  return column ? clamp01(column.getBoundingClientRect().right / window.innerWidth) : 0
}

function subscribeToQuality(onChange: () => void) {
  const query = window.matchMedia(LOW_QUALITY_QUERY)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

function useSceneQuality(): SceneQuality {
  const isLow = useSyncExternalStore(
    subscribeToQuality,
    () => window.matchMedia(LOW_QUALITY_QUERY).matches,
    () => false,
  )
  return isLow ? "low" : "high"
}

function useSceneScroll() {
  const { scrollY } = useScroll()
  const hero = useMotionValue(0)
  const page = useMotionValue(0)
  const experience = useMotionValue(0)
  const heroEdge = useMotionValue(0)
  const experienceEdge = useMotionValue(0)

  const measure = useCallback(() => {
    const viewport = window.innerHeight
    const offset = window.scrollY
    const scrollable = document.documentElement.scrollHeight - viewport

    hero.set(clamp01(offset / viewport))
    page.set(scrollable > 0 ? clamp01(offset / scrollable) : 0)

    const section = document.getElementById(EXPERIENCE_SECTION_ID)
    if (section) {
      const rect = section.getBoundingClientRect()
      experience.set(clamp01((viewport - rect.top) / (rect.height + viewport)))
    }

    heroEdge.set(copyEdge("hero"))
    experienceEdge.set(copyEdge("experience"))
  }, [hero, page, experience, heroEdge, experienceEdge])

  useMotionValueEvent(scrollY, "change", measure)

  useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure])

  return {
    hero: useSpring(hero, CAMERA_SPRING),
    page: useSpring(page, CAMERA_SPRING),
    experience: useSpring(experience, CAMERA_SPRING),
    heroEdge,
    experienceEdge,
  }
}

function supportsWebGL2() {
  try {
    const context = document.createElement("canvas").getContext("webgl2")
    context?.getExtension("WEBGL_lose_context")?.loseContext()
    return Boolean(context)
  } catch {
    return false
  }
}

function useIdleReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start = () => setReady(supportsWebGL2())
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1500 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(start, 300)
    return () => window.clearTimeout(id)
  }, [])

  return ready
}

export function SceneBackdrop() {
  const ready = useIdleReady()
  const quality = useSceneQuality()
  const reducedMotion = useReducedMotion()
  const scroll = useSceneScroll()
  const sceneOpacity = useTransform(scroll.hero, [0, 1], [1, CONTENT_SCENE_OPACITY])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div className="absolute inset-0" style={{ opacity: sceneOpacity }}>
        {ready && (
          <SceneBoundary>
            <NetworkScene quality={quality} scroll={scroll} reducedMotion={Boolean(reducedMotion)} />
          </SceneBoundary>
        )}
      </motion.div>
      <div className="scene-vignette absolute inset-0" />
    </div>
  )
}
