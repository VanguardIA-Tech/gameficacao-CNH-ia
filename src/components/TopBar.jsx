/**
 * ═══════════════════════════════════════════════════════════════
 *  TOP BAR
 *  Barra superior com busca e ações globais.
 * ═══════════════════════════════════════════════════════════════
 */
import { colors, radius } from "../styles/theme";
import Icon from "./Icon";

export default function TopBar() {
  return (
    <div style={{
      padding: "12px 28px",
      display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 12,
      borderBottom: `1px solid ${colors.border}`,
      background: colors.bg, flexShrink: 0,
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        background: colors.bgInput, borderRadius: radius.md,
        padding: "8px 14px", fontSize: 13, color: colors.textMuted,
        border: `1px solid ${colors.border}`, cursor: "text",
      }}>
        <Icon name="search" size={14} color={colors.textMuted} />
        <span>Buscar cliente...</span>
        <kbd style={{
          background: "rgba(255,255,255,0.05)", borderRadius: 4,
          padding: "1px 6px", fontSize: 11, fontWeight: 600,
          color: colors.textMuted, marginLeft: 8,
          border: `1px solid ${colors.border}`,
        }}>⌘K</kbd>
      </div>
      <button style={{
        width: 34, height: 34, borderRadius: radius.md,
        background: colors.bgInput, border: `1px solid ${colors.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", color: colors.textMuted,
      }}>
        <Icon name="bell" size={16} />
      </button>
    </div>
  );
}
