/**
 * ═══════════════════════════════════════════════════════════════
 *  CNH PLAY  (Bloco 2)
 *  Módulo de gamificação: pontuação, nível, progresso,
 *  desafios e ranking dos colaboradores.
 *
 *  INTEGRAÇÃO FUTURA:
 *  → GET  /api/cnh-play/user-stats     → pontuação, nível, progresso
 *  → GET  /api/cnh-play/ranking        → ranking completo
 *  → GET  /api/cnh-play/challenges     → desafios disponíveis
 *  → POST /api/cnh-play/challenge/:id  → iniciar desafio
 *  → Autenticação por colaborador para dados individuais
 * ═══════════════════════════════════════════════════════════════
 */
import { useState } from "react";
import { colors, radius, fonts, transitions, shadows } from "../styles/theme";
import { currentUser, rankingData, challenges } from "../data/constants";
import Icon, { challengeIconMap } from "./Icon";

// Mapeamento colorKey → cor real
const colorMap = {
  accent:  colors.accent,
  success: colors.success,
  warning: colors.warning,
  danger:  colors.danger,
  pink:    colors.pink,
  info:    colors.info,
  cyan:    colors.cyan,
  violet:  colors.violet,
};

const medalColors = [colors.gold, colors.silver, colors.bronze];

export default function CnhPlay() {
  return (
    <div style={{ animation: "vg-fadeIn 0.35s ease" }}>
      {/* ══ Stats Cards ══ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 22 }}>
        <StatCard
          label="Sua Pontuação" value={currentUser.points.toLocaleString("pt-BR")}
          sub="pontos acumulados" gradient={[colors.accent, colors.accentDark]}
          accentColor={colors.accentLight} delay={0}
        />
        <StatCard
          label="Seu Nível" value={currentUser.level}
          sub="continue evoluindo!" gradient={[colors.success, "#059669"]}
          accentColor={colors.success} delay={0.06}
        />
        <ProgressCard delay={0.12} />
      </div>

      {/* ══ Two Columns: Desafios + Ranking ══ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <ChallengesPanel />
        <RankingPanel />
      </div>
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────
function StatCard({ label, value, sub, gradient, accentColor, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: `linear-gradient(135deg, ${gradient[0]}12, ${gradient[1]}08)`,
        border: `1px solid ${gradient[0]}22`,
        borderRadius: radius.lg, padding: "22px 24px",
        position: "relative", overflow: "hidden",
        animation: `vg-slideUp 0.4s ease ${delay}s both`,
        transition: transitions.normal,
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? shadows.glow(`${gradient[0]}18`) : "none",
      }}>
      {/* Glow orb */}
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 80, height: 80, borderRadius: "50%",
        background: `radial-gradient(circle, ${gradient[0]}15, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        fontSize: 10.5, fontWeight: 700, color: accentColor,
        textTransform: "uppercase", letterSpacing: "0.08em",
        marginBottom: 10, fontFamily: fonts.heading,
      }}>{label}</div>
      <div style={{
        fontSize: 30, fontWeight: 900, color: colors.textPrimary,
        lineHeight: 1, fontFamily: fonts.heading,
      }}>{value}</div>
      <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 6 }}>{sub}</div>
    </div>
  );
}

// ─── PROGRESS CARD ───────────────────────────────────────────────────
function ProgressCard({ delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: `linear-gradient(135deg, ${colors.warningGlow}, ${colors.dangerGlow})`,
        border: `1px solid ${colors.warning}22`,
        borderRadius: radius.lg, padding: "22px 24px",
        position: "relative", overflow: "hidden",
        animation: `vg-slideUp 0.4s ease ${delay}s both`,
        transition: transitions.normal,
        transform: hovered ? "translateY(-2px)" : "none",
      }}>
      <div style={{
        fontSize: 10.5, fontWeight: 700, color: colors.warning,
        textTransform: "uppercase", letterSpacing: "0.08em",
        marginBottom: 10, fontFamily: fonts.heading,
      }}>Progresso Geral</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontSize: 30, fontWeight: 900, color: colors.textPrimary, fontFamily: fonts.heading }}>
          {currentUser.progress}
        </span>
        <span style={{ fontSize: 16, fontWeight: 600, color: colors.textMuted }}>%</span>
      </div>
      {/* Barra */}
      <div style={{
        width: "100%", height: 7, background: "rgba(255,255,255,0.06)",
        borderRadius: radius.full, marginTop: 12, overflow: "hidden",
      }}>
        <div style={{
          width: `${currentUser.progress}%`, height: "100%", borderRadius: radius.full,
          background: `linear-gradient(90deg, ${colors.warning}, ${colors.danger})`,
          animation: "vg-progressFill 1.2s ease both",
        }} />
      </div>
      <div style={{ fontSize: 12, color: colors.textMuted, marginTop: 6 }}>
        {currentUser.progress >= 50 ? "Bom progresso!" : "Continue avançando!"}
      </div>
    </div>
  );
}

// ─── CHALLENGES PANEL ────────────────────────────────────────────────
function ChallengesPanel() {
  return (
    <div style={{
      background: colors.bgCard, borderRadius: radius.lg,
      border: `1px solid ${colors.border}`, padding: 22,
      boxShadow: shadows.card,
      animation: "vg-slideUp 0.4s ease 0.18s both",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <div style={{
          width: 30, height: 30, borderRadius: radius.md,
          background: colors.warningGlow, border: `1px solid ${colors.warning}30`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="zap" size={15} color={colors.warning} />
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: colors.textPrimary, fontFamily: fonts.heading }}>
          Desafios Disponíveis
        </span>
        <span style={{
          marginLeft: "auto", fontSize: 11, fontWeight: 600,
          color: colors.textMuted, fontFamily: fonts.mono,
        }}>{challenges.filter(c => c.status !== "locked").length}/{challenges.length}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {challenges.map((c, i) => {
          const col = colorMap[c.colorKey] || colors.accent;
          const locked = c.status === "locked";
          const active = c.status === "active";
          return (
            <ChallengeItem key={c.id} challenge={c} color={col} locked={locked} active={active} index={i} />
          );
        })}
      </div>
    </div>
  );
}

function ChallengeItem({ challenge, color, locked, active, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 14px", borderRadius: radius.md,
        background: active ? `${color}08` : hovered && !locked ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.012)",
        border: `1px solid ${active ? `${color}25` : hovered && !locked ? colors.borderHover : colors.border}`,
        cursor: locked ? "not-allowed" : "pointer",
        opacity: locked ? 0.45 : 1,
        transition: transitions.fast,
        transform: hovered && !locked ? "translateX(3px)" : "none",
        animation: `vg-fadeIn 0.25s ease ${index * 0.05}s both`,
      }}>
      <div style={{
        width: 34, height: 34, borderRadius: radius.md,
        background: `${color}12`, border: `1px solid ${color}25`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon name={locked ? "lock" : (challengeIconMap[challenge.id] || "zap")} size={15} color={color} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: locked ? colors.textMuted : colors.textPrimary, fontFamily: fonts.body }}>
          {challenge.title}
        </div>
        <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
          {active && "⚡ Em andamento"}
          {challenge.status === "available" && "Disponível para iniciar"}
          {locked && "🔒 Bloqueado"}
        </div>
      </div>
      {active && (
        <div style={{
          width: 8, height: 8, borderRadius: "50%", background: color,
          boxShadow: `0 0 10px ${color}60`, flexShrink: 0,
          animation: "vg-pulse 2s infinite",
        }} />
      )}
      {!locked && !active && (
        <Icon name="chevronR" size={14} color={colors.textMuted} style={{ flexShrink: 0 }} />
      )}
    </div>
  );
}

// ─── RANKING PANEL ───────────────────────────────────────────────────
function RankingPanel() {
  return (
    <div style={{
      background: colors.bgCard, borderRadius: radius.lg,
      border: `1px solid ${colors.border}`, padding: 22,
      boxShadow: shadows.card,
      animation: "vg-slideUp 0.4s ease 0.24s both",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
        <div style={{
          width: 30, height: 30, borderRadius: radius.md,
          background: `${colors.gold}14`, border: `1px solid ${colors.gold}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="trophy" size={15} color={colors.gold} />
        </div>
        <span style={{ fontSize: 15, fontWeight: 700, color: colors.textPrimary, fontFamily: fonts.heading }}>
          Top 5 — Ranking
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {rankingData.map((r, i) => (
          <RankingRow key={r.pos} user={r} index={i} />
        ))}
      </div>

      {/* INTEGRAÇÃO FUTURA: link para ranking completo */}
      <button style={{
        width: "100%", marginTop: 14, padding: "10px",
        background: "rgba(255,255,255,0.02)", border: `1px solid ${colors.border}`,
        borderRadius: radius.md, color: colors.textMuted, fontSize: 12,
        fontWeight: 600, cursor: "pointer", fontFamily: fonts.body,
        transition: transitions.fast,
      }}
        onMouseEnter={(e) => { e.target.style.borderColor = colors.borderHover; e.target.style.color = colors.textSecondary; }}
        onMouseLeave={(e) => { e.target.style.borderColor = colors.border; e.target.style.color = colors.textMuted; }}
      >Ver ranking completo →</button>
    </div>
  );
}

function RankingRow({ user, index }) {
  const [hovered, setHovered] = useState(false);
  const isTop3 = index < 3;
  const medal = isTop3 ? medalColors[index] : null;
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "10px 14px", borderRadius: radius.md,
        background: user.isCurrent ? colors.brandGlow : hovered ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.008)",
        border: `1px solid ${user.isCurrent ? `${colors.brand}20` : colors.border}`,
        transition: transitions.fast,
        animation: `vg-slideUp 0.3s ease ${index * 0.06}s both`,
      }}>
      {/* Posição */}
      <div style={{
        width: 28, height: 28, borderRadius: radius.sm + 1,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 900, flexShrink: 0,
        fontFamily: fonts.mono,
        background: medal ? `${medal}18` : "rgba(255,255,255,0.03)",
        color: medal || colors.textMuted,
        border: `1px solid ${medal ? `${medal}30` : colors.border}`,
      }}>{user.pos}</div>
      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 10.5, fontWeight: 700, flexShrink: 0,
        background: user.isCurrent
          ? `linear-gradient(135deg, ${colors.brand}, ${colors.brandDark})`
          : `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
        color: user.isCurrent ? colors.textInverse : "#fff",
      }}>{user.initials}</div>
      {/* Nome */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 13, fontFamily: fonts.body,
          fontWeight: user.isCurrent ? 700 : 500,
          color: user.isCurrent ? colors.brand : colors.textPrimary,
        }}>
          {user.name}
          {user.isCurrent && <span style={{ fontSize: 10, color: colors.textMuted, fontWeight: 400, marginLeft: 6 }}>(você)</span>}
        </div>
      </div>
      {/* Pontos */}
      <div style={{
        fontSize: 13, fontWeight: 800, fontFamily: fonts.mono,
        color: medal || colors.textSecondary,
      }}>{user.points.toLocaleString("pt-BR")}</div>
    </div>
  );
}
