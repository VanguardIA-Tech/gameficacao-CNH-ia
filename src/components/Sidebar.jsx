/**
 * ═══════════════════════════════════════════════════════════════
 *  SIDEBAR
 *  Menu lateral do Vanguardia 360 com itens de navegação,
 *  seção admin e área do usuário.
 * ═══════════════════════════════════════════════════════════════
 */
import { useState } from "react";
import { colors, fonts, radius, transitions } from "../styles/theme";
import { mainMenuItems, adminMenuItems, currentUser } from "../data/constants";
import Icon, { menuIconMap } from "./Icon";

export default function Sidebar({ activePage, onNavigate }) {
  const [hovered, setHovered] = useState(null);

  const itemStyle = (id) => {
    const active = activePage === id;
    const hover = hovered === id && !active;
    return {
      display: "flex", alignItems: "center", gap: 10,
      padding: "10px 12px", borderRadius: radius.md,
      cursor: "pointer", fontSize: 13.5,
      fontWeight: active ? 600 : 400,
      color: active ? colors.textPrimary : hover ? colors.textPrimary : colors.textSecondary,
      background: active ? colors.brandGlow : hover ? "rgba(255,255,255,0.03)" : "transparent",
      border: "none", width: "100%", textAlign: "left",
      transition: transitions.fast, fontFamily: fonts.body,
    };
  };

  const iconColor = (id) => activePage === id ? colors.brand : colors.textMuted;

  return (
    <aside style={{
      width: 234, minWidth: 234, background: colors.bgElevated,
      borderRight: `1px solid ${colors.border}`,
      display: "flex", flexDirection: "column", height: "100vh",
    }}>
      {/* ── Logo ── */}
      <div style={{
        padding: "18px 20px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: `1px solid ${colors.border}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 24, height: 24, borderRadius: 7,
            background: `linear-gradient(135deg, ${colors.brand}, ${colors.brandDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 900, color: colors.textInverse,
          }}>V</div>
          <span style={{
            fontFamily: fonts.heading, fontWeight: 800, fontSize: 14,
            letterSpacing: "0.05em", textTransform: "uppercase", color: colors.brand,
          }}>VANGUARDIA</span>
        </div>
        <button style={{
          background: "none", border: "none", color: colors.textMuted,
          cursor: "pointer", padding: 4, borderRadius: radius.sm, display: "flex",
        }}>
          <Icon name="chevronL" size={15} />
        </button>
      </div>

      {/* ── Menu Principal ── */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "8px 10px" }}>
        {mainMenuItems.map((item) => (
          <button key={item.id}
            style={itemStyle(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onNavigate(item.id)}>
            <Icon name={menuIconMap[item.id]} size={17} color={iconColor(item.id)} />
            {item.label}
            {item.badge && (
              <span style={{
                marginLeft: "auto",
                background: `linear-gradient(135deg, ${colors.warning}, ${colors.danger})`,
                color: "#fff", fontSize: 9, fontWeight: 700,
                padding: "2px 7px", borderRadius: radius.full,
                letterSpacing: "0.04em", textTransform: "uppercase",
              }}>{item.badge}</span>
            )}
          </button>
        ))}

        {/* ── Admin ── */}
        <div style={{
          fontSize: 10, fontWeight: 700, color: colors.textMuted,
          textTransform: "uppercase", letterSpacing: "0.1em",
          padding: "18px 12px 6px",
        }}>Administração</div>
        {adminMenuItems.map((item) => (
          <button key={item.id}
            style={itemStyle(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onNavigate(item.id)}>
            <Icon name={menuIconMap[item.id]} size={17} color={iconColor(item.id)} />
            {item.label}
          </button>
        ))}
      </nav>

      {/* ── Usuário ── */}
      <div style={{
        borderTop: `1px solid ${colors.border}`,
        padding: "14px 16px", display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: `linear-gradient(135deg, ${colors.brand}, ${colors.brandDark})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: colors.textInverse, flexShrink: 0,
        }}>{currentUser.initials}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary, fontFamily: fonts.body }}>{currentUser.name}</div>
          <div style={{ fontSize: 11, color: colors.textMuted }}>{currentUser.role}</div>
        </div>
      </div>
    </aside>
  );
}
