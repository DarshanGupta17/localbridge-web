'use client'

import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react'

const tools = [
  ['01', 'Create directory', 'Create folders inside the workspace.'],
  ['02', 'Create file', 'Add a new file to the project.'],
  ['03', 'Delete directory', 'Remove a project directory.'],
  ['04', 'Delete file', 'Remove a file from the workspace.'],
  ['05', 'Get project context', 'Understand the active project.'],
  ['06', 'Git branch', 'Inspect the current branch.'],
  ['07', 'Git diff', 'Review changes in the repository.'],
  ['08', 'Git status', 'Check the repository state.'],
  ['09', 'Read file', 'Read files directly from disk.'],
  ['10', 'Search file', 'Find relevant code across a project.'],
  ['11', 'Update project context', 'Keep the agent in sync.'],
  ['12', 'Write file', 'Make supported changes to files.'],
]

const steps = [
  ['01', 'Install', 'Install the free LocalBridge extension in VS Code.'],
  ['02', 'Connect', 'Connect your AI coding agent to your LocalBridge instance.'],
  ['03', 'Build', 'Ask your agent to inspect, modify and work with your project.'],
]

function SectionLabel({ number, children, dark = false }: { number: string; children: React.ReactNode; dark?: boolean }) {
  return <div className={`section-label ${dark ? 'section-label-dark' : ''}`}><span>{number} /</span><span>{children}</span></div>
}

function BridgeDiagram({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`bridge-diagram ${dark ? 'bridge-diagram-dark' : ''}`} aria-label="Claude connects through LocalBridge to your project">
      <div className="diagram-node"><span className="node-kicker">AI AGENT</span><strong>CLAUDE</strong></div>
      <div className="diagram-line"><span>TOOL REQUEST</span><i /></div>
      <div className="diagram-node diagram-node-accent"><span className="node-kicker">THE BRIDGE</span><strong>LOCALBRIDGE</strong></div>
      <div className="diagram-line"><span>SUPPORTED ACTION</span><i /></div>
      <div className="diagram-node"><span className="node-kicker">YOUR WORKSPACE</span><strong>VS CODE PROJECT</strong></div>
    </div>
  )
}

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="site-nav">
        <a href="#top" className="wordmark" onClick={closeMenu} aria-label="LocalBridge home">
          <img src="/localbridge.png" alt="" />
          <span>LOCALBRIDGE</span>
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>01 ABOUT</a>
          <a href="#how-it-works" onClick={closeMenu}>02 HOW IT WORKS</a>
          <a href="#claude" onClick={closeMenu}>03 CLAUDE</a>
          <a href="#tools" onClick={closeMenu}>04 TOOLS</a>
          <a className="nav-launch" href="#launch" onClick={closeMenu}>LAUNCHING SOON <ArrowUpRight /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-light">
          <div className="hero-copy">
            <p className="eyebrow">FREE VS CODE EXTENSION <span>///</span> LAUNCHING SOON</p>
            <h1>Your AI can code.<br /><em>Now let it reach</em><br />your local project.</h1>
            <p className="hero-intro">LocalBridge connects AI coding agents like Claude to your local VS Code workspace, giving them a controlled way to read, write, search and manage your project.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#launch">LAUNCHING SOON ON VSCODE <ArrowUpRight /></a>
              <a className="text-link" href="#how-it-works">SEE HOW IT WORKS <ArrowDown /></a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="visual-index">LB / 001</div>
            <BridgeDiagram />
            <div className="visual-caption">ONE BRIDGE BETWEEN<br />YOUR AI AND YOUR CODE</div>
          </div>
        </section>

        <section id="about" className="section-dark problem-section">
          <div className="section-inner split-grid">
            <SectionLabel number="01" dark>THE PROBLEM</SectionLabel>
            <div className="problem-content"><h2>Your code lives locally.<br /><span>Your AI doesn&apos;t.</span></h2><p>AI coding agents are powerful, but they need a way to interact with the environment where your project actually lives.</p><p className="statement">LocalBridge creates<br />that bridge.</p></div>
            <BridgeDiagram dark />
          </div>
        </section>

        <section className="section-light bridge-section">
          <div className="section-inner">
            <SectionLabel number="02">THE BRIDGE</SectionLabel>
            <div className="section-heading-row"><h2>One bridge between<br />your AI and your workspace.</h2><p>LocalBridge is a free VS Code extension that exposes controlled project-level tools to AI coding agents. Instead of manually moving files or copying code back and forth, your agent can interact with the project through LocalBridge.</p></div>
            <div className="feature-trio"><article><strong>LOCAL</strong><p>Your project stays in your local development environment.</p></article><article><strong>CONTROLLED</strong><p>The extension acts as the bridge between the agent and your workspace.</p></article><article><strong>DIRECT</strong><p>Your coding agent can perform supported project operations through the bridge.</p></article></div>
          </div>
        </section>

        <section id="how-it-works" className="section-dark how-section">
          <div className="section-inner"><SectionLabel number="03" dark>HOW IT WORKS</SectionLabel><h2 className="center-heading">Three steps.<br /><span>One bridge.</span></h2><div className="steps-grid">{steps.map(([number, title, body]) => <article key={number} className="step"><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div><div className="flow-strip"><span>CLAUDE</span><i>↓</i><span>TOOL REQUEST</span><i>↓</i><span>LOCALBRIDGE</span><i>↓</i><span>VS CODE WORKSPACE</span></div></div>
        </section>

        <section id="claude" className="section-light claude-section">
          <div className="section-inner"><SectionLabel number="04">CONNECT CLAUDE</SectionLabel><div className="section-heading-row"><h2>Connect Claude<br />to your local workspace.</h2><p>A clear path from install to a working project. Keep your code where it is, and give your agent a way to work with it.</p></div><div className="setup-layout"><div className="setup-list">{[['01', 'Install LocalBridge', 'Install the free LocalBridge extension in VS Code.'], ['02', 'Open your project', 'Open the project you want Claude to work with.'], ['03', 'Start LocalBridge', 'Start the LocalBridge bridge from the extension.'], ['04', 'Connect Claude', 'Configure Claude to use the LocalBridge connection.'], ['05', 'Start building', 'Claude can now use the available tools to work with your project.']].map(([n, title, body]) => <article key={n}><span>{n}</span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div><div className="terminal-card"><div className="terminal-top"><span>LOCALBRIDGE / STATUS</span><span>●</span></div><div className="terminal-body"><p className="muted">$ localbridge start</p><p>bridge <b>connected</b></p><p>workspace <b>my-project</b></p><p>tools <b>12 available</b></p><div className="terminal-rule" /><p className="muted">ready for requests<span className="cursor" /></p></div></div></div></div>
        </section>

        <section id="tools" className="section-dark tools-section">
          <div className="section-inner"><SectionLabel number="05" dark>TOOLS</SectionLabel><div className="section-heading-row tools-heading"><h2>Give your agent hands-on access to the project.</h2><p>LocalBridge currently supports a growing set of project and Git operations.</p></div><div className="tools-grid">{tools.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p><ArrowUpRight /></article>)}</div><p className="tools-count">12 TOOLS AVAILABLE</p></div>
        </section>

        <section className="section-light experience-section"><div className="section-inner"><SectionLabel number="06">THE EXPERIENCE</SectionLabel><h2>Stop being<br /><em>the middleman.</em></h2><p className="experience-copy">Instead of repeatedly copying files, pasting code and manually moving changes between your editor and your AI assistant, LocalBridge lets the agent interact with the project through supported tools.</p><div className="compare-grid"><div><span>WITHOUT LOCALBRIDGE</span><p>YOU <b>↓</b> COPY <b>↓</b> PASTE <b>↓</b> EXPLAIN <b>↓</b> REPEAT</p></div><div className="compare-with"><span>WITH LOCALBRIDGE</span><p>CLAUDE <b>↕</b> LOCALBRIDGE <b>↕</b> PROJECT</p></div></div></div></section>

        <section className="section-dark developer-section"><div className="section-inner"><SectionLabel number="07" dark>BUILT FOR DEVELOPERS</SectionLabel><div className="developer-layout"><h2>Your editor.<br />Your project.<br /><span>Your workflow.</span></h2><ol>{['Works with VS Code', 'Connects AI agents to your local workspace', 'Supports project file operations', 'Supports Git inspection', 'Maintains project context', 'Free to use'].map((item, i) => <li key={item}><span>0{i + 1}</span>{item}</li>)}</ol></div></div></section>

        <section id="launch" className="section-light launch-section"><div className="section-inner"><SectionLabel number="08">LAUNCHING SOON</SectionLabel><h2>LocalBridge is<br /><em>coming to VS Code.</em></h2><p>One free extension.<br />A simpler way to connect AI with your local code.</p><div className="launch-footer"><span className="free-badge">FREE VS CODE EXTENSION</span><a className="button button-dark" href="#top">LAUNCHING SOON ON VSCODE <ArrowUpRight /></a></div></div></section>
      </main>

      <footer className="section-dark site-footer"><div className="footer-top"><a href="#top" className="wordmark wordmark-footer"><img src="/localbridge.png" alt="" /><span>LOCALBRIDGE</span></a><span>FREE VS CODE EXTENSION</span></div><div className="footer-bottom"><span>© 2026 LOCALBRIDGE</span><nav><a href="#about">About</a><a href="#how-it-works">How it works</a><a href="#claude">Claude</a><a href="#tools">Tools</a></nav></div></footer>
    </div>
  )
}
