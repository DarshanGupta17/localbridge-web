'use client'

import { useEffect } from 'react'
import { trackWidgetKraftEvent } from '@/lib/widgetkraft-analytics'

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero',
  'how-it-works': 'How It Works',
  claude: 'Claude',
  'connect-chatgpt': 'ChatGPT',
  'connect-gemini': 'Gemini',
  tools: '29 Tools',
  launch: 'Launch',
  newsletter: 'Join Newsletter',
  waitlist: 'Join Newsletter',
}

function nearestSectionId(el: Element | null): string {
  if (!el) return ''
  const section = el.closest('section[id], footer[id]')
  if (section?.id) return section.id
  if (el.closest('header.site-nav, .site-header, .top-banner')) return 'nav'
  if (el.closest('footer.site-footer')) return 'footer'
  return ''
}

function clickLabel(el: HTMLAnchorElement | HTMLButtonElement): string {
  const aria = el.getAttribute('aria-label')
  if (aria) return aria
  const text = el.textContent?.replace(/\s+/g, ' ').trim()
  if (text) return text.slice(0, 120)
  return el.tagName === 'A' ? 'Link' : 'Button'
}

export function LandingPageAnalytics() {
  useEffect(() => {
    const seenSections = new Set<string>()

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.4) continue
          const id = entry.target.id
          if (!id || seenSections.has(id)) continue
          seenSections.add(id)
          trackWidgetKraftEvent('custom', 'Section Viewed', {
            section: id,
            sectionName: SECTION_LABELS[id] ?? id,
          })
        }
      },
      { threshold: [0.4, 0.55] },
    )

    document
      .querySelectorAll('main section[id], footer#waitlist')
      .forEach((node) => sectionObserver.observe(node))

    const onClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const interactive = target.closest('a, button')
      if (
        !interactive ||
        !(interactive instanceof HTMLAnchorElement || interactive instanceof HTMLButtonElement)
      ) {
        return
      }
      if (interactive.closest('.contact-form-embed')) return

      const section = nearestSectionId(interactive)
      trackWidgetKraftEvent('click', clickLabel(interactive), {
        section,
        sectionName: SECTION_LABELS[section] ?? section,
        href:
          interactive instanceof HTMLAnchorElement
            ? interactive.getAttribute('href') ?? undefined
            : undefined,
        target:
          interactive instanceof HTMLAnchorElement
            ? interactive.target || undefined
            : undefined,
      })
    }

    document.addEventListener('click', onClick, true)

    return () => {
      sectionObserver.disconnect()
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  return null
}
