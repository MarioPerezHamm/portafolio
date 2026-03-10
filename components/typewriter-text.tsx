"use client"

import { useState, useEffect } from "react"

interface TypewriterTextProps {
  text: string
  delay?: number
  className?: string
  showCursor?: boolean
  onComplete?: () => void
}

export function TypewriterText({
  text,
  delay = 50,
  className = "",
  showCursor = true,
  onComplete,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    setDisplayText("")
    setIsComplete(false)

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onComplete?.()
      }
    }, delay)

    return () => clearInterval(interval)
  }, [text, delay, onComplete])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span
          className={`inline-block w-2.5 h-5 ml-0.5 bg-primary align-middle ${
            isComplete ? "animate-blink" : ""
          }`}
          aria-hidden="true"
        />
      )}
    </span>
  )
}
