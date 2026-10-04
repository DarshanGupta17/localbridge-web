import Script from 'next/script'
import {
  WIDGETKRAFT_ANALYTICS_SCRIPT,
  WIDGETKRAFT_ANALYTICS_WIDGET_ID,
} from '@/lib/widgetkraft-analytics'

export function WidgetKraftAnalyticsScript() {
  return (
    <Script
      src={WIDGETKRAFT_ANALYTICS_SCRIPT}
      data-widget-id={WIDGETKRAFT_ANALYTICS_WIDGET_ID}
      strategy="afterInteractive"
    />
  )
}
