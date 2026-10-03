import type { Metadata } from 'next'
import { LandingPage } from '@/components/landing-page'

export const metadata: Metadata = {
  title: 'LocalBridge — Connect web AI to your local codebase',
  description: 'Connect your web-based AI agents to your local codebase.',
}

export default function Page() {
  return <LandingPage />
}
