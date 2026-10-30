"use client";

import { motion } from "motion/react";

const W = 640;
const H = 360;
const center = { x: W / 2, y: H / 2 };
const slots = [
  { x: 110, y: 50 },
  { x: W - 110, y: 50 },
  { x: 110, y: H - 50 },
  { x: W - 110, y: H - 50 },
];

/** Claude au centre, les outils autour, reliés par MCP. Les connexions se dessinent à l’entrée à l’écran. */
export function McpDiagram({ nodes }: { nodes: readonly string[] }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Claude connecté via MCP à : ${nodes.join(", ")}`}
      className="h-auto w-full overflow-visible"
    >
      {nodes.slice(0, 4).map((name, i) => {
        const p = slots[i];
        const midX = (p.x + center.x) / 2;
        const midY = (p.y + center.y) / 2;
        return (
          <g key={name}>
            <line x1={center.x} y1={center.y} x2={p.x} y2={p.y} stroke="var(--line)" strokeWidth={1.5} />
            <motion.line
              x1={center.x}
              y1={center.y}
              x2={p.x}
              y2={p.y}
              stroke="var(--accent)"
              strokeWidth={1.5}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.18, ease: "easeInOut" }}
            />
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.18 }}
            >
              <rect x={midX - 30} y={midY - 13} width={60} height={26} rx={13} fill="var(--ink)" stroke="var(--line)" />
              <text x={midX} y={midY + 5} textAnchor="middle" fontSize={14} fill="var(--muted)" fontFamily="var(--font-jetbrains)">
                MCP
              </text>
            </motion.g>
            <g>
              <rect x={p.x - 95} y={p.y - 32} width={190} height={64} rx={14} fill="var(--panel)" stroke="var(--line)" />
              <text x={p.x} y={p.y + 8} textAnchor="middle" fontSize={22} fill="var(--text)">
                {name}
              </text>
            </g>
          </g>
        );
      })}
      <rect x={center.x - 105} y={center.y - 42} width={210} height={84} rx={18} fill="var(--raised)" stroke="var(--accent)" strokeWidth={1.5} />
      <text x={center.x} y={center.y + 10} textAnchor="middle" fontSize={28} fontWeight={600} fill="var(--text)">
        Claude
      </text>
    </svg>
  );
}
