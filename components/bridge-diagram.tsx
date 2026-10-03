'use client'

import React from 'react'
import {
  ClaudeLogo,
  ChatGPTLogo,
  GeminiLogo,
  MCPLogo,
  VSCodeLogo,
  CursorLogo,
  AntigravityLogo,
  MoreIDELogo,
} from './brand-icons'

type Point = { x: number; y: number }

type BrandNode = {
  id: string
  label: string
  x: number
  y: number
  component: React.ComponentType<{ size?: number; className?: string }>
}

/* =========================================================================
   DIAGRAM GEOMETRY & CURVES
========================================================================= */

const W = 380
const H = 540
const CENTER: Point = { x: 190, y: 270 }
const HUB_SIZE = 82
const HUB_TOP = CENTER.y - HUB_SIZE / 2
const HUB_BOTTOM = CENTER.y + HUB_SIZE / 2

const upstream: BrandNode[] = [
  { id: 'claude', label: 'Claude', x: 44, y: 46, component: ClaudeLogo },
  { id: 'chatgpt', label: 'ChatGPT', x: 142, y: 46, component: ChatGPTLogo },
  { id: 'gemini', label: 'Gemini', x: 238, y: 46, component: GeminiLogo },
  { id: 'mcp', label: '+ MCP', x: 336, y: 46, component: MCPLogo },
]

const downstream: BrandNode[] = [
  { id: 'vscode', label: 'VS Code', x: 44, y: H - 46, component: VSCodeLogo },
  { id: 'cursor', label: 'Cursor', x: 142, y: H - 46, component: CursorLogo },
  { id: 'antigravity', label: 'Antigravity', x: 238, y: H - 46, component: AntigravityLogo },
  { id: 'ide', label: '+ IDE', x: 336, y: H - 46, component: MoreIDELogo },
]

// Distinct connection entry points on LocalBridge hub to prevent collapsing
const hubUpstreamX = [164, 181, 199, 216]
const hubDownstreamX = [164, 181, 199, 216]

function topCurve(nodeX: number, nodeY: number, hubX: number) {
  const startX = nodeX
  const startY = nodeY + 42
  const endX = hubX
  const endY = HUB_TOP
  const dy = endY - startY
  return `M ${startX} ${startY} C ${startX} ${startY + dy * 0.55}, ${endX} ${endY - dy * 0.45}, ${endX} ${endY}`
}

function bottomCurve(hubX: number, nodeX: number, nodeY: number) {
  const startX = hubX
  const startY = HUB_BOTTOM
  const endX = nodeX
  const endY = nodeY - 42
  const dy = endY - startY
  return `M ${startX} ${startY} C ${startX} ${startY + dy * 0.45}, ${endX} ${endY - dy * 0.55}, ${endX} ${endY}`
}

/* =========================================================================
   ANIMATED CURVED BLUE CONNECTION COMPONENT
========================================================================= */

function CurvedConnection({
  d,
  duration,
  delay,
}: {
  d: string
  duration: number
  delay: number
}) {
  return (
    <g className="bridge-curve-group">
      {/* Static dashed guide curve */}
      <path
        d={d}
        fill="none"
        stroke="#d4d4d8"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />

      {/* Moving curved blue line that travels to and fro along the curve */}
      <path
        d={d}
        fill="none"
        stroke="#2563eb"
        strokeWidth="2.75"
        strokeLinecap="round"
        pathLength="100"
        strokeDasharray="18 182"
        strokeDashoffset="18"
        filter="url(#blue-runner-glow)"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="18; -82; 18"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
          keyTimes="0; 0.5; 1"
          calcMode="spline"
          keySplines="0.45 0.05 0.55 0.95; 0.45 0.05 0.55 0.95"
        />
      </path>
    </g>
  )
}

/* =========================================================================
   BORDERLESS BRAND NODE
========================================================================= */

function NodeBadge({ node }: { node: BrandNode }) {
  const IconComponent = node.component
  const iconSize = node.id === 'mcp' || node.id === 'ide' ? 42 : 56
  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      <foreignObject x={-56} y={-32} width={112} height={88}>
        <div xmlns="http://www.w3.org/1999/xhtml" className="bridge-node-item">
          <div className="bridge-node-logo">
            <IconComponent size={iconSize} />
          </div>
          <span className="bridge-node-label">{node.label}</span>
        </div>
      </foreignObject>
    </g>
  )
}

/* =========================================================================
   MAIN BRIDGE DIAGRAM
========================================================================= */

export function BridgeDiagram() {
  return (
    <div className="bridge-web" aria-label="Web AI connected through LocalBridge to your local IDEs">
      <svg
        className="bridge-web-svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-hidden
      >
        <defs>
          <filter id="blue-runner-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#3b82f6" floodOpacity="0.65" />
          </filter>
          <filter id="hub-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Top curved connections from AI/MCP to LocalBridge */}
        {upstream.map((node, i) => (
          <CurvedConnection
            key={`up-${node.id}`}
            d={topCurve(node.x, node.y, hubUpstreamX[i])}
            duration={2.6 + i * 0.25}
            delay={i * 0.28}
          />
        ))}

        {/* Bottom curved connections from LocalBridge to IDEs */}
        {downstream.map((node, i) => (
          <CurvedConnection
            key={`down-${node.id}`}
            d={bottomCurve(hubDownstreamX[i], node.x, node.y)}
            duration={2.7 + i * 0.22}
            delay={0.15 + i * 0.3}
          />
        ))}

        {/* Top Company Logos (Borderless) */}
        {upstream.map((node) => (
          <NodeBadge key={node.id} node={node} />
        ))}

        {/* Center LocalBridge Hub */}
        <g transform={`translate(${CENTER.x}, ${CENTER.y})`}>
          <rect
            x={-HUB_SIZE / 2}
            y={-HUB_SIZE / 2}
            width={HUB_SIZE}
            height={HUB_SIZE}
            rx={20}
            fill="#000000"
            filter="url(#hub-shadow)"
          />
          <image
            href="/localbridge.png"
            x={-HUB_SIZE / 2}
            y={-HUB_SIZE / 2}
            width={HUB_SIZE}
            height={HUB_SIZE}
            preserveAspectRatio="xMidYMid meet"
          />
        </g>

        {/* Bottom IDE Logos (Borderless) */}
        {downstream.map((node) => (
          <NodeBadge key={node.id} node={node} />
        ))}
      </svg>
    </div>
  )
}
