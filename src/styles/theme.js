/**
 * ═══════════════════════════════════════════════════════════════
 *  VANGUARDIA 360 — DESIGN TOKENS
 *  Sistema de design centralizado. Todas as cores, tipografia,
 *  espaçamentos e variáveis visuais partem daqui.
 * ═══════════════════════════════════════════════════════════════
 */

export const colors = {
  // ── Superfícies ──
  bg:           "#0b0d12",
  bgElevated:   "#10121a",
  bgCard:       "#141722",
  bgCardHover:  "#181c28",
  bgInput:      "rgba(255,255,255,0.035)",
  bgInputHover: "rgba(255,255,255,0.055)",

  // ── Bordas ──
  border:       "rgba(255,255,255,0.055)",
  borderHover:  "rgba(255,255,255,0.1)",
  borderActive: "rgba(99,102,241,0.35)",

  // ── Texto ──
  textPrimary:   "#eaecf0",
  textSecondary: "#8b90a0",
  textMuted:     "#555a6e",
  textInverse:   "#0b0d12",

  // ── Marca Vanguardia ──
  brand:         "#3ee67e",
  brandDark:     "#1da85a",
  brandGlow:     "rgba(62,230,126,0.12)",

  // ── Acento principal (IA CNH) ──
  accent:        "#6366f1",
  accentLight:   "#818cf8",
  accentDark:    "#4f46e5",
  accentGlow:    "rgba(99,102,241,0.15)",
  accentBorder:  "rgba(99,102,241,0.25)",

  // ── Acento secundário ──
  violet:        "#a78bfa",
  violetGlow:    "rgba(167,139,250,0.12)",

  // ── Semânticas ──
  success:       "#34d399",
  successGlow:   "rgba(52,211,153,0.1)",
  warning:       "#fbbf24",
  warningGlow:   "rgba(251,191,36,0.1)",
  danger:        "#f87171",
  dangerGlow:    "rgba(248,113,113,0.1)",
  info:          "#38bdf8",
  infoGlow:      "rgba(56,189,248,0.1)",
  pink:          "#f472b6",
  pinkGlow:      "rgba(244,114,182,0.1)",
  cyan:          "#22d3ee",
  cyanGlow:      "rgba(34,211,238,0.1)",

  // ── Ranking medalhas ──
  gold:   "#f59e0b",
  silver: "#94a3b8",
  bronze: "#cd7f32",
};

export const fonts = {
  heading: "'Outfit', 'DM Sans', sans-serif",
  body:    "'Outfit', 'DM Sans', sans-serif",
  mono:    "'JetBrains Mono', 'Fira Code', monospace",
};

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  full: 9999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 40,
};

export const shadows = {
  card:    "0 2px 16px rgba(0,0,0,0.25)",
  glow:    (color) => `0 4px 24px ${color}`,
  subtle:  "0 1px 3px rgba(0,0,0,0.3)",
};

export const transitions = {
  fast:    "all 0.15s ease",
  normal:  "all 0.25s ease",
  smooth:  "all 0.35s cubic-bezier(0.4,0,0.2,1)",
};
