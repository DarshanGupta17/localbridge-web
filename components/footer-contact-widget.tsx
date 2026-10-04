'use client'

import { useEffect, useRef } from 'react'
import { trackWidgetKraftEvent } from '@/lib/widgetkraft-analytics'

const WIDGET_ID = '0263f2da-6388-42e9-9d77-9938a86ed4a0'
const SCRIPT_SRC = 'https://cdn.widgetkraft.com/contact.js'
const STYLE_ID = 'localbridge-contact-overrides'

const SHADOW_OVERRIDES = `
  .contact-form-embed > div > div > div {
    background: transparent !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    max-width: 100% !important;
    padding: 0 !important;
    width: 100% !important;
  }
  .contact-form-embed h3 {
    display: none !important;
  }
  .contact-form-embed form > p,
  .contact-form-embed > div > div > div > p {
    display: none !important;
  }
  .contact-form-embed form {
    align-items: stretch !important;
    border: 1px solid #e0e0e0 !important;
    display: flex !important;
    flex-direction: row !important;
    gap: 0 !important;
    margin: 0 !important;
  }
  .contact-form-embed form > div:first-child {
    display: flex !important;
    flex: 1 1 auto !important;
    flex-direction: column !important;
    gap: 0 !important;
    min-width: 0 !important;
  }
  .contact-form-embed form > div:first-child > div {
    display: flex !important;
    flex: 1 1 auto !important;
    flex-direction: column !important;
    gap: 0 !important;
    justify-content: stretch !important;
    min-width: 0 !important;
  }
  .contact-form-embed form label {
    border: 0 !important;
    clip: rect(0, 0, 0, 0) !important;
    height: 1px !important;
    margin: -1px !important;
    overflow: hidden !important;
    padding: 0 !important;
    position: absolute !important;
    white-space: nowrap !important;
    width: 1px !important;
  }
  .contact-form-embed form input[type="email"],
  .contact-form-embed form input[type="text"] {
    background: #fafafa !important;
    border: 0 !important;
    border-radius: 0 !important;
    box-sizing: border-box !important;
    flex: 1 1 auto !important;
    font-family: Inter, sans-serif !important;
    font-size: 13px !important;
    height: 100% !important;
    min-height: 40px !important;
    padding: 11px 14px !important;
    width: 100% !important;
  }
  .contact-form-embed form input:focus {
    background: #fff !important;
    outline: none !important;
  }
  .contact-form-embed form > div:last-child {
    display: flex !important;
    flex-shrink: 0 !important;
    margin-top: 0 !important;
  }
  .contact-form-embed form button[type="submit"] {
    align-self: stretch !important;
    background: #000 !important;
    border: 0 !important;
    border-left: 1px solid #e0e0e0 !important;
    border-radius: 0 !important;
    color: #fff !important;
    cursor: pointer !important;
    font-family: 'IBM Plex Mono', monospace !important;
    font-size: 10px !important;
    font-weight: 500 !important;
    gap: 6px !important;
    letter-spacing: 0.04em !important;
    min-height: 40px !important;
    padding: 11px 16px !important;
    text-transform: uppercase !important;
    width: auto !important;
  }
  .contact-form-embed form button[type="submit"]:hover:not(:disabled) {
    background: #222 !important;
  }
  .contact-form-embed form button[type="submit"] svg {
    display: none !important;
  }
  @media (max-width: 640px) {
    .contact-form-embed form {
      flex-direction: column !important;
    }
    .contact-form-embed form > div:last-child {
      width: 100% !important;
    }
    .contact-form-embed form button[type="submit"] {
      border-left: 0 !important;
      border-top: 1px solid #e0e0e0 !important;
      min-height: 44px !important;
      width: 100% !important;
    }
    .contact-form-embed form input[type="email"],
    .contact-form-embed form input[type="text"] {
      font-size: 16px !important;
      min-height: 44px !important;
    }
  }
`

declare global {
  interface Window {
    ContactFormWidget?: {
      init: (options: { widgetId: string; mode?: 'inline' | 'floating' }) => void
    }
  }
}

function injectShadowStyles(container: HTMLElement) {
  const shadow = container.shadowRoot
  if (!shadow || shadow.getElementById(STYLE_ID)) return
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = SHADOW_OVERRIDES
  shadow.appendChild(style)
}

function attachWaitlistAnalytics(container: HTMLElement): (() => void) | undefined {
  const shadow = container.shadowRoot
  if (!shadow) return undefined

  const form = shadow.querySelector('form')
  if (!form || form.dataset.lbAnalyticsAttached === '1') return undefined

  form.dataset.lbAnalyticsAttached = '1'
  const emailInput = form.querySelector('input[type="email"]')

  let joinSucceeded = false

  emailInput?.addEventListener(
    'focus',
    () => {
      trackWidgetKraftEvent('form', 'Waitlist Form Started', {
        section: 'waitlist',
      })
    },
    { once: true },
  )

  emailInput?.addEventListener('input', () => {
    form.dataset.lbWaitlistHasInput = '1'
  })

  form.addEventListener('submit', () => {
    const email = emailInput instanceof HTMLInputElement ? emailInput.value.trim() : ''
    trackWidgetKraftEvent('form', 'Waitlist Form Submitted', {
      section: 'waitlist',
      hasEmail: email.includes('@'),
    })

    for (const delayMs of [800, 2000, 4500]) {
      window.setTimeout(() => {
        if (joinSucceeded) return
        const submitButton = form.querySelector('button[type="submit"]')
        const alert = shadow.querySelector('[role="alert"]')
        const buttonText = submitButton?.textContent ?? ''

        if (/submitted/i.test(buttonText)) {
          joinSucceeded = true
          trackWidgetKraftEvent('form', 'Waitlist Join Success', {
            section: 'waitlist',
            filled: true,
          })
          return
        }

        if (alert?.textContent && delayMs >= 2000) {
          trackWidgetKraftEvent('form', 'Waitlist Join Failed', {
            section: 'waitlist',
            filled: Boolean(form.dataset.lbWaitlistHasInput),
            error: alert.textContent.slice(0, 200),
          })
        }
      }, delayMs)
    }
  })

  const onPageHide = () => {
    if (joinSucceeded) return
    if (form.dataset.lbWaitlistHasInput !== '1') {
      trackWidgetKraftEvent('custom', 'Waitlist Not Started', {
        section: 'waitlist',
        filled: false,
      })
      return
    }
    trackWidgetKraftEvent('custom', 'Waitlist Not Completed', {
      section: 'waitlist',
      filled: true,
    })
  }

  window.addEventListener('pagehide', onPageHide)

  return () => {
    window.removeEventListener('pagehide', onPageHide)
  }
}


function scheduleWaitlistAnalytics(container: HTMLElement) {
  const timerIds: number[] = []
  let detachPageHide: (() => void) | undefined

  for (const delay of [0, 200, 600, 1500, 3000]) {
    timerIds.push(
      window.setTimeout(() => {
        if (detachPageHide) return
        const teardown = attachWaitlistAnalytics(container)
        if (teardown) detachPageHide = teardown
      }, delay),
    )
  }

  return () => {
    for (const id of timerIds) window.clearTimeout(id)
    detachPageHide?.()
  }
}

export function FooterContactWidget() {
  const initStartedRef = useRef(false)

  useEffect(() => {
    const container = document.getElementById('contactform-root')
    if (!container) return

    let clearAnalyticsTimers: (() => void) | undefined

    const boot = () => {
      if (!window.ContactFormWidget) return
      if (!container.shadowRoot && !initStartedRef.current) {
        initStartedRef.current = true
        window.ContactFormWidget.init({ widgetId: WIDGET_ID, mode: 'inline' })
      }
      injectShadowStyles(container)
      clearAnalyticsTimers?.()
      clearAnalyticsTimers = scheduleWaitlistAnalytics(container)
    }

    if (window.ContactFormWidget) {
      boot()
    } else {
      const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
      if (existing) {
        existing.addEventListener('load', boot, { once: true })
      } else {
        const script = document.createElement('script')
        script.src = SCRIPT_SRC
        script.async = true
        script.onload = boot
        document.body.appendChild(script)
      }
    }

    return () => {
      clearAnalyticsTimers?.()
    }
  }, [])

  return <div id="contactform-root" className="footer-contact-widget" />
}
