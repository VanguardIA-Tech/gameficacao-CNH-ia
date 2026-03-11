/**
 * ═══════════════════════════════════════════════════════════════
 *  FUTURE MODULES
 *  Cards de roadmap dos módulos que virão dentro da aba IA CNH.
 *  Cada card é um placeholder visual com tag "Em breve".
 *
 *  INTEGRAÇÃO FUTURA:
 *  → Cada módulo terá sua própria rota/componente
 *  → GET /api/ia-cnh/modules → lista de módulos e status
 *  → Conteúdos dinâmicos carregados sob demanda
 * ═══════════════════════════════════════════════════════════════
 */
import { useState } from "react";
import { colors, radius, fonts, transitions, shadows } from "../styles/theme";
import { futureModules } from "../data/constants";
import Icon, { moduleIconMap } from "./Icon";

const colorMap = {
  success: colors.success,
  info:    colors.info,
  violet:  colors.violet,
  warning: colors.warning,
  pink:    colors.pink,
  cyan:    colors.cyan,
};

export default function FutureModules() {
  return (
    <div style={{ animation: "vg-fadeIn 0.35s ease" }}>
      {/* Intro */}
      <div style={{
        background: colors.bgCard, borderRadius: radius.lg,
        border: `1px solid ${colors.border}`, padding: "20px 24px",
        marginBottom: 22, boxShadow: shadows.card,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: radius.md,
            background: colors.accentGlow, border: `1px solid ${colors.accentBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="grid" size={16} color={colors.accentLight} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: colors.textPrimary, fontFamily: fonts.heading }}>
            Roadmap de Módulos
          </span>
        </div>
        <p style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.65, maxWidth: 600 }}>
          A aba IA CNH está em expansão contínua. Confira abaixo os módulos que estão sendo desenvolvidos
          para enriquecer a experiência de aprendizado e engajamento dos colaboradores.
        </p>
      </div>

      {/* Grid de módulos */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
        gap: 14,
      }}>
        {futureModules.map((mod, i) => (
          <ModuleCard key={mod.id} module={mod} index={i} />
        ))}
      </div>
    </div>
  );
}

function ModuleCard({ module, index }) {
  const [hovered, setHovered] = useState(false);
  const col = colorMap[module.colorKey] || colors.accent;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: colors.bgCard,
        borderRadius: radius.lg,
        border: `1px solid ${hovered ? `${col}30` : colors.border}`,
        padding: 22, position: "relative", overflow: "hidden",
        cursor: "default",
        transition: transitions.normal,
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.35), ${shadows.glow(`${col}12`)}` : shadows.card,
        animation: `vg-slideUp 0.4s ease ${index * 0.06}s both`,
      }}
    >
      {/* Shimmer top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${col}50, transparent)`,
        backgroundSize: "200% 100%",
        animation: "vg-shimmer 4s infinite",
        opacity: hovered ? 1 : 0.5,
        transition: "opacity 0.3s",
      }} />

      {/* Corner glow */}
      {hovered && (
        <div style={{
          position: "absolute", top: -30, right: -30,
          width: 100, height: 100, borderRadius: "50%",
          background: `radial-gradient(circle, ${col}12, transparent 70%)`,
          pointerEvents: "none",
        }} />
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: radius.md + 2,
          background: `${col}12`, border: `1px solid ${col}22`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: transitions.fast,
          transform: hovered ? "scale(1.08)" : "none",
        }}>
          <Icon name={moduleIconMap[module.id] || "grid"} size={18} color={col} />
        </div>
        <div style={{
          fontSize: 14.5, fontWeight: 700, color: colors.textPrimary,
          fontFamily: fonts.heading,
        }}>{module.title}</div>
      </div>

      {/* Desc */}
      <p style={{
        fontSize: 12.5, color: colors.textSecondary, lineHeight: 1.55,
        marginBottom: 16, fontFamily: fonts.body,
      }}>{module.desc}</p>

      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "5px 12px", borderRadius: radius.full,
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${colors.border}`,
        fontSize: 11, fontWeight: 600, color: colors.textMuted,
        fontFamily: fonts.heading, letterSpacing: "0.02em",
      }}>
        <Icon name="lock" size={11} color={colors.textMuted} />
        Em breve
      </div>
    </div>
  );
}
