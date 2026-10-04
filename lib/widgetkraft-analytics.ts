/** @see https://docs.widgetkraft.com/available-widgets/visitor-tracker-analysis */

export const WIDGETKRAFT_ANALYTICS_WIDGET_ID =
  'e8deb442-3cdf-4f54-bb0a-911bf473993f'

export const WIDGETKRAFT_ANALYTICS_SCRIPT =
  'https://cdn.widgetkraft.com/analytics.js'

export type WidgetKraftEventType =
  | 'click'
  | 'checkout'
  | 'purchase'
  | 'subscription'
  | 'form'
  | 'auth'
  | 'payment'
  | 'download'
  | 'video'
  | 'chatbot'
  | 'custom'

declare global {
  interface Window {
    WidgetKraft?: {
      CreateEvent?: (
        eventType: string,
        eventName: string,
        properties?: Record<string, unknown>,
      ) => void
    }
  }
}

export function trackWidgetKraftEvent(
  eventType: WidgetKraftEventType,
  eventName: string,
  properties?: Record<string, unknown>,
) {
  if (typeof window === 'undefined') return

  const payload = {
    page: window.location.pathname,
    ...properties,
  }

  const create = window.WidgetKraft?.CreateEvent
  if (create) {
    create(eventType, eventName, payload)
    return
  }

  window.setTimeout(() => {
    window.WidgetKraft?.CreateEvent?.(eventType, eventName, payload)
  }, 500)
}
