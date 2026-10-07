'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react'
import { BridgeDiagram } from '@/components/bridge-diagram'
import { FooterContactWidget } from '@/components/footer-contact-widget'
import { LaunchOrbit } from '@/components/launch-orbit'
import { LandingPageAnalytics } from '@/components/landing-page-analytics'
import { RotatingAI } from '@/components/rotating-ai'

const SOCIAL_LINKS = {
  twitter: 'https://x.com/darshan_gupta17',
  threads: 'https://www.threads.com/@darshautomates',
  instagram: 'https://www.instagram.com/darshautomates/',
} as const

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const toolGroups = [
  ['FILES', ['Create directory', 'Create file', 'Delete directory', 'Delete file', 'Get active editor', 'Get project context', 'Get workspace info', 'Read file', 'Search file', 'Update project context', 'Write file']],
  ['GIT', ['Git branch', 'Git diff', 'Git log', 'Git show', 'Git staged diff', 'Git status']],
  ['TERMINAL', ['Run command', 'Read terminal', 'Run tests']],
  ['PROCESSES', ['List processes', 'Read process output', 'Send process input', 'Start process', 'Stop process']],
  ['SERVERS', ['List local servers', 'Get environment', 'Http request']],
  ['TESTS', ['Run tests', 'Get diagnostics']],
]
const localBridgeGuide = [
  'Install LocalBridge',
  'Select Public Connection',
  'Choose Ngrok, Add AuthToken',
  'Click Continue',
]
const claudeGuide = [
  'Open Claude → Settings → Customize → Connectors',
  'Click Add → Custom → Web',
  'Enter a name → Paste your MCP server URL',
  'Configure Authentication → Add API keys/headers → Connect',
]
const chatgptGuide = [
  'Settings → Security & Login → Enable Developer Mode',
  'Settings → Plugins → Browse Plugins → +',
  'Enter Name + MCP URL → Trust → Create',
  'New Chat → Use MCP → Approve Tool Call',
]
const geminiGuide = [
  'Open Gemini → Spark',
  'Settings → Connected Apps',
  'Custom Apps for Spark → Add a Custom App',
  'Paste your MCP server HTTPS URL → Connect',
]
function GuideVideo({ src, label }: { src: string; label: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }, [])
  return <div className="guide-video"><video ref={videoRef} src={src} autoPlay muted loop playsInline preload="auto" aria-label={label} /></div>
}
function Label({ number, children, dark = false }: { number: string; children: React.ReactNode; dark?: boolean }) { return <div className={`section-label ${dark ? 'section-label-dark' : ''}`}><span>{number} /</span><span>{children}</span></div> }
export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [waitlistHighlight, setWaitlistHighlight] = useState(false)
  const waitlistHighlightTimerRef = useRef<number | null>(null)
  const closeMenu = () => setMenuOpen(false)

  const scrollToJoinWaitlist = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    closeMenu()
    const target = document.getElementById('join-waitlist')
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })

    if (waitlistHighlightTimerRef.current) {
      window.clearTimeout(waitlistHighlightTimerRef.current)
    }
    setWaitlistHighlight(true)
    waitlistHighlightTimerRef.current = window.setTimeout(() => {
      setWaitlistHighlight(false)
      waitlistHighlightTimerRef.current = null
    }, 2800)
  }

  useEffect(() => {
    if (window.location.hash !== '#join-waitlist') {
      return () => {
        if (waitlistHighlightTimerRef.current) {
          window.clearTimeout(waitlistHighlightTimerRef.current)
        }
      }
    }

    const target = document.getElementById('join-waitlist')
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setWaitlistHighlight(true)
    waitlistHighlightTimerRef.current = window.setTimeout(() => {
      setWaitlistHighlight(false)
      waitlistHighlightTimerRef.current = null
    }, 2800)

    return () => {
      if (waitlistHighlightTimerRef.current) {
        window.clearTimeout(waitlistHighlightTimerRef.current)
      }
    }
  }, [])
  return <div className="site-shell">
    <LandingPageAnalytics />
    <header className="site-nav"><a href="#top" className="wordmark" onClick={closeMenu} aria-label="LocalBridge home"><img src="/localbridge.png" alt="" /><span>LOCALBRIDGE</span></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button><nav className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`} aria-label="Main navigation"><a href="#how-it-works" onClick={closeMenu}>HOW IT WORKS</a><a href="#tools" onClick={closeMenu}>29 TOOLS</a><a className="nav-launch" href="#launch" onClick={closeMenu}>LAUNCHING SOON <ArrowUpRight /></a></nav></header>
    <main id="top">
      <section id="hero" className="hero section-light">
        <div className="hero-copy">
          <h1><span className="hero-headline-first">Connect <RotatingAI /></span><br /><em>to your local workspace.</em></h1>
          <p className="hero-intro">A free VS Code extension.</p>
          <div className="hero-trust">
            <p className="hero-trust-lead">Built Local-First.</p>
            <p className="hero-trust-detail">No LocalBridge server. No code or secrets sent to us. Secrets are stored in VS Code Secret Storage.</p>
          </div>
          <div className="hero-actions">
            <a className="button button-dark" href="#launch">LAUNCHING SOON <ArrowUpRight /></a>
            <div className="hero-quick-links">
              <a className="text-link" href="#how-it-works">SEE HOW IT WORKS <ArrowDown /></a>
              <a className="text-link" href="#join-waitlist" onClick={scrollToJoinWaitlist}>
                JOIN WAITLIST <ArrowDown />
              </a>
            </div>
          </div>
        </div>
        <div className="hero-visual"><BridgeDiagram /></div>
      </section>
      <section id="how-it-works" className="section-dark how-section"><div className="section-inner how-layout"><div className="how-media"><GuideVideo src="https://cdn.widgetkraft.com/localbridge/LocalConnect.mp4" label="Setting up LocalBridge locally" /></div><div className="how-copy"><Label number="01" dark>HOW IT WORKS</Label><h2>Connect. Build. Run.</h2><ol className="guide-steps how-steps">{localBridgeGuide.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol></div></div></section>
      <section id="claude" className="section-light guide-section"><div className="section-inner guide-sticky-layout"><div className="guide-copy"><Label number="02">CLAUDE</Label><h2><span className="guide-title-top">Connect Claude</span><br /><em>to your workspace.</em></h2><ol className="guide-steps">{claudeGuide.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol></div><div className="guide-media"><GuideVideo src="https://cdn.widgetkraft.com/localbridge/ClaudeConnect.mp4" label="Connecting Claude to LocalBridge" /></div></div></section>
      <section id="connect-chatgpt" className="section-dark guide-section"><div className="section-inner guide-sticky-layout guide-sticky-reverse"><div className="guide-copy"><Label number="03" dark>CHATGPT</Label><h2><span className="guide-title-top">Connect ChatGPT</span><br /><em>to your workspace.</em></h2><ol className="guide-steps">{chatgptGuide.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol></div><div className="guide-media"><GuideVideo src="https://cdn.widgetkraft.com/localbridge/gptConnect.mp4" label="Connecting ChatGPT to LocalBridge" /></div></div></section>
      <section id="connect-gemini" className="section-light guide-section"><div className="section-inner guide-sticky-layout"><div className="guide-copy"><Label number="04">GEMINI</Label><h2><span className="guide-title-top">Connect Gemini</span><br /><em>to your workspace.</em></h2><p className="guide-requirement">Requires Gemini PRO</p><ol className="guide-steps">{geminiGuide.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></li>)}</ol></div><div className="guide-media"><GuideVideo src="https://cdn.widgetkraft.com/localbridge/geminiConnect.mp4" label="Connecting Gemini to LocalBridge" /></div></div></section>
      <section id="tools" className="section-light tools-light"><div className="section-inner"><Label number="05">29 TOOLS</Label><div className="section-heading-row tools-heading"><h2>29 tools.<br /><em>One bridge.</em></h2><p>FILES · GIT · TERMINAL · PROCESSES · SERVERS · TESTS · HTTP · DIAGNOSTICS</p></div><div className="tool-groups">{toolGroups.map(([group, tools]) => <div className="tool-category" key={group as string}><h3>{group}</h3><div className="tools-grid">{(tools as string[]).map((tool, index) => <article key={`${group}-${tool}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><h4>{tool}</h4><ArrowUpRight /></article>)}</div></div>)}</div></div></section>
      <section className="launch-section-wrap section-dark" id="launch">
        <div className="section-inner">
          <div className="launch-card-shell">
            <span className="launch-card-corner launch-card-corner-tl" aria-hidden />
            <span className="launch-card-corner launch-card-corner-tr" aria-hidden />
            <span className="launch-card-corner launch-card-corner-bl" aria-hidden />
            <span className="launch-card-corner launch-card-corner-br" aria-hidden />
            <div className="launch-card">
            <div className="launch-card-copy">
              <Label number="06">LAUNCHING SOON</Label>
              <h2>Web AI.<br /><em>Local workspace.</em></h2>
              <p className="launch-subline">LOCALBRIDGE.</p>
              <div className="launch-card-footer">
                <span className="free-badge launch-free-badge">FREE VS CODE EXTENSION</span>
                <a className="button button-dark launch-card-cta" href="#top">LAUNCHING SOON <ArrowUpRight /></a>
              </div>
            </div>
            <div className="launch-card-visual">
              <LaunchOrbit />
            </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer id="waitlist" className="site-footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#top" className="footer-wordmark" aria-label="LocalBridge home">
              <img src="/localbridge.png" alt="" />
              <span>LocalBridge</span>
            </a>
            <p className="footer-tagline">Connect your web-based AI agents to your local codebase.</p>
            <div className="footer-social-icons" aria-label="Social links">
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <IconX />
              </a>
              <a href={SOCIAL_LINKS.threads} target="_blank" rel="noopener noreferrer" aria-label="Threads">
                <img src="/threads.png" alt="" className="footer-social-img" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img src="/instagram-logo.avif" alt="" className="footer-social-img" />
              </a>
            </div>
          </div>
          <div className="footer-nav-wrap">
            <div className="footer-nav-grid">
              <div className="footer-nav-col">
                <h3>Setup</h3>
                <ul>
                  <li><a href="#how-it-works">How It Works</a></li>
                </ul>
              </div>
              <div className="footer-nav-col">
                <h3>Connect</h3>
                <ul>
                  <li><a href="#claude">Connect Claude</a></li>
                  <li><a href="#connect-chatgpt">Connect ChatGPT</a></li>
                  <li><a href="#connect-gemini">Connect Gemini</a></li>
                </ul>
              </div>
              <div className="footer-nav-col">
                <h3>Tools</h3>
                <ul>
                  <li><a href="#tools">29 Tools</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div
            id="join-waitlist"
            className={`footer-substack ${waitlistHighlight ? 'footer-substack-highlight' : ''}`}
          >
            <h3 className="footer-substack-title">Join Waitlist</h3>
            <FooterContactWidget />
          </div>
        </div>
        <div className="footer-bar">
          <span>© 2026 LocalBridge. All rights reserved.</span>
          <nav className="footer-social-bar" aria-label="Social">
            <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href={SOCIAL_LINKS.threads} target="_blank" rel="noopener noreferrer">Threads</a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </nav>
        </div>
      </div>
    </footer>
  </div>
}
