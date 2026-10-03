'use client'

import React, { useEffect, useState } from 'react'
import { ClaudeLogo, ChatGPTLogo, GeminiLogo } from './brand-icons'

export type RotatingItem = {
  id: string
  name: string
  Logo: React.ComponentType<{ size?: number; className?: string }>
}

const ITEMS: RotatingItem[] = [
  { id: 'claude', name: 'claude', Logo: ClaudeLogo },
  { id: 'chatgpt', name: 'chatgpt', Logo: ChatGPTLogo },
  { id: 'gemini', name: 'gemini', Logo: GeminiLogo },
]

export function RotatingAI({
  items = ITEMS,
  interval = 3000,
}: {
  items?: RotatingItem[]
  interval?: number
}) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((curr) => {
        setPrev(curr)
        return (curr + 1) % items.length
      })

      const cleanupTimer = setTimeout(() => {
        setPrev(null)
      }, 550)

      return () => clearTimeout(cleanupTimer)
    }, interval)

    return () => clearInterval(timer)
  }, [items.length, interval])

  const activeItem = items[current]
  const prevItem = prev !== null ? items[prev] : null

  return (
    <span className="rotating-ai-slot" aria-live="polite">
      {prevItem && (
        <span className="rotating-ai-item rotating-ai-exit" aria-hidden="true">
          <span className="rotating-ai-logo-wrap">
            <prevItem.Logo />
          </span>
          <span className={`rotating-ai-text rotating-ai-text-${prevItem.id}`}>{prevItem.name}</span>
        </span>
      )}
      <span
        key={activeItem.id}
        className={`rotating-ai-item ${prev !== null ? 'rotating-ai-enter' : ''}`}
      >
        <span className="rotating-ai-logo-wrap">
          <activeItem.Logo />
        </span>
        <span className={`rotating-ai-text rotating-ai-text-${activeItem.id}`}>{activeItem.name}</span>
      </span>
    </span>
  )
}
