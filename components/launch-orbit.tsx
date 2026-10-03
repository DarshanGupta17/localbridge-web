'use client'

import { ChatGPTLogo, ClaudeLogo, GeminiLogo } from '@/components/brand-icons'

export function LaunchOrbit() {
  return (
    <div className="launch-orbit" aria-hidden>
      <div className="launch-orbit-rings">
        <span className="launch-orbit-ring launch-orbit-ring-1" />
        <span className="launch-orbit-ring launch-orbit-ring-2" />
        <span className="launch-orbit-ring launch-orbit-ring-3" />
        <span className="launch-orbit-ring launch-orbit-ring-4" />
      </div>
      <div className="launch-orbit-center">
        <img src="/localbridge.png" alt="" />
      </div>
      <div className="launch-orbit-track launch-orbit-track-outer">
        <div className="launch-orbit-node">
          <span className="launch-orbit-badge">
            <ChatGPTLogo size={34} />
          </span>
        </div>
      </div>
      <div className="launch-orbit-track launch-orbit-track-mid">
        <div className="launch-orbit-node">
          <span className="launch-orbit-badge">
            <ClaudeLogo size={34} />
          </span>
        </div>
      </div>
      <div className="launch-orbit-track launch-orbit-track-inner">
        <div className="launch-orbit-node">
          <span className="launch-orbit-badge">
            <GeminiLogo size={34} />
          </span>
        </div>
      </div>
    </div>
  )
}
