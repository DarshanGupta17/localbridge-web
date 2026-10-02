'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react'

const toolGroups = [
  ['FILES', ['Create directory', 'Create file', 'Delete directory', 'Delete file', 'Get active editor', 'Get project context', 'Get workspace info', 'Read file', 'Search file', 'Update project context', 'Write file']],
  ['GIT', ['Git branch', 'Git diff', 'Git log', 'Git show', 'Git staged diff', 'Git status']],
  ['TERMINAL', ['Run command', 'Read terminal', 'Run tests']],
  ['PROCESSES', ['List processes', 'Read process output', 'Send process input', 'Start process', 'Stop process']],
  ['SERVERS', ['List local servers', 'Get environment', 'Http request']],
  ['TESTS', ['Run tests', 'Get diagnostics']],
]
const steps = [['01', 'CONNECT'], ['02', 'REQUEST'], ['03', 'RUN'], ['04', 'RETURN']]
function Label({ number, children, dark = false }: { number: string; children: React.ReactNode; dark?: boolean }) { return <div className={`section-label ${dark ? 'section-label-dark' : ''}`}><span>{number} /</span><span>{children}</span></div> }
function BridgeDiagram({ dark = false }: { dark?: boolean }) { return <div className={`bridge-diagram ${dark ? 'bridge-diagram-dark' : ''}`} aria-label="Web AI to LocalBridge to your workspace"><div className="diagram-node"><span className="node-kicker">UPSTREAM</span><strong>WEB AI</strong></div><div className="diagram-line"><span>REQUEST</span><i /></div><div className="diagram-node diagram-node-accent"><span className="node-kicker">BRIDGE</span><strong>LOCALBRIDGE</strong></div><div className="diagram-line"><span>EXECUTE</span><i /></div><div className="diagram-node"><span className="node-kicker">DOWNSTREAM</span><strong>YOUR WORKSPACE</strong></div></div> }

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  return <div className="site-shell">
    <header className="site-nav"><a href="#top" className="wordmark" onClick={closeMenu} aria-label="LocalBridge home"><img src="/localbridge.png" alt="" /><span>LOCALBRIDGE</span></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button><nav className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`} aria-label="Main navigation"><a href="#how-it-works" onClick={closeMenu}>HOW IT WORKS</a><a href="#tools" onClick={closeMenu}>29 TOOLS</a><a className="nav-launch" href="#launch" onClick={closeMenu}>LAUNCHING SOON <ArrowUpRight /></a></nav></header>
    <main id="top">
      <section className="hero section-light"><div className="hero-copy"><p className="eyebrow">LOCALBRIDGE</p><h1>Connect web AI<br /><em>to your local workspace.</em></h1><p className="hero-intro">A free VS Code extension.</p><div className="hero-actions"><a className="button button-dark" href="#launch">LAUNCHING SOON <ArrowUpRight /></a><a className="text-link" href="#how-it-works">SEE HOW IT WORKS <ArrowDown /></a></div></div><div className="hero-visual"><div className="visual-index">LB / 001</div><BridgeDiagram /><div className="visual-caption">WEB AI → LOCALBRIDGE →<br />YOUR WORKSPACE</div></div></section>
      <section id="how-it-works" className="section-dark how-section"><div className="section-inner"><Label number="01" dark>HOW IT WORKS</Label><h2>Connect. Build. Run.</h2><div className="steps-grid">{steps.map(([n, title]) => <article key={n} className="step"><span>{n}</span><h3>{title}</h3></article>)}</div><div className="flow-strip"><span>WEB AI</span><i>→</i><span>LOCALBRIDGE</span><i>→</i><span>WORKSPACE</span></div></div></section>
      <section id="claude" className="section-light claude-section"><div className="section-inner"><Label number="02">CLAUDE</Label><div className="section-heading-row compact-heading"><h2>Connect Claude<br /><em>to your workspace.</em></h2><p>Connect Claude to your local workspace.</p></div><div className="setup-layout compact-setup"><div className="setup-list">{[['01', 'Install LocalBridge'], ['02', 'Open your project'], ['03', 'Start the bridge'], ['04', 'Connect Claude']].map(([n, title]) => <article key={n}><span>{n}</span><h3>{title}</h3></article>)}</div><div className="terminal-card"><div className="terminal-top"><span>LOCALBRIDGE / READY</span><span>●</span></div><div className="terminal-body"><p>web AI <b>connected</b></p><p>↓</p><p>localbridge <b>active</b></p><p>↓</p><p>workspace <b>ready</b></p></div></div></div></div></section>
      <section id="tools" className="section-light tools-light"><div className="section-inner"><Label number="03">29 TOOLS</Label><div className="section-heading-row tools-heading"><h2>29 tools.<br /><em>One bridge.</em></h2><p>FILES · GIT · TERMINAL · PROCESSES · SERVERS · TESTS · HTTP · DIAGNOSTICS</p></div><div className="tool-groups">{toolGroups.map(([group, tools]) => <div className="tool-category" key={group as string}><h3>{group}</h3><div className="tools-grid">{(tools as string[]).map((tool, index) => <article key={`${group}-${tool}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><h4>{tool}</h4><ArrowUpRight /></article>)}</div></div>)}</div></div></section>
      <section className="section-dark launch-section" id="launch"><div className="section-inner"><Label number="04" dark>LAUNCHING SOON</Label><h2>Web AI.<br /><em>Local workspace.</em></h2><p className="launch-subline">LOCALBRIDGE.</p><div className="launch-footer"><span className="free-badge">FREE VS CODE EXTENSION</span><a className="button button-invert" href="#top">LAUNCHING SOON <ArrowUpRight /></a></div></div></section>
    </main>
    <footer className="section-dark site-footer"><div className="footer-top"><a href="#top" className="wordmark wordmark-footer"><img src="/localbridge.png" alt="" /><span>LOCALBRIDGE</span></a><span>FREE VS CODE EXTENSION</span></div><div className="footer-bottom"><span>© 2026 LOCALBRIDGE</span><nav><a href="#how-it-works">How it works</a><a href="#tools">29 tools</a></nav></div></footer>
  </div>
}
