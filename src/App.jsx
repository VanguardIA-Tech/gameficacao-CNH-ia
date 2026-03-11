/**
 * ═══════════════════════════════════════════════════════════════
 *  VANGUARDIA 360 — APP ROOT
 *  Orquestra: Sidebar, TopBar e páginas do sistema.
 *  A aba "IA CNH" contém 3 sub-abas:
 *    1. Assistente IA (chat)
 *    2. CNH PLAY (gamificação)
 *    3. Módulos (roadmap futuro)
 * ═══════════════════════════════════════════════════════════════
 */
import { useState, useEffect } from "react";
import { colors, fonts, radius, transitions } from "./styles/theme";
import { injectGlobalStyles } from "./styles/globalStyles";
import { subTabs, mainMenuItems, adminMenuItems } from "./data/constants";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ChatAssistant from "./components/ChatAssistant";
import CnhPlay from "./components/CnhPlay";
import FutureModules from "./components/FutureModules";
import Icon, { menuIconMap } from "./components/Icon";

export default function App() {
  const [activePage, setActivePage] = useState("ia-cnh");
  const [activeSubTab, setActiveSubTab] = useState("chat");

  useEffect(() => { injectGlobalStyles(); }, []);

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    if (pageId === "ia-cnh") setActiveSubTab("chat");
  };

  return (
    <div style={{
      display: "flex", height: "100vh", width: "100%",
      fontFamily: fonts.body, background: colors.bg,
      color: colors.textPrimary, overflow: "hidden",
    }}>
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar />
        {activePage === "ia-cnh" ? (
          <IaCnhPage activeSubTab={activeSubTab} onSubTabChange={setActiveSubTab} />
        ) : (
          <PlaceholderPage pageId={activePage} />
        )}
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PÁGINA IA CNH
// ═══════════════════════════════════════════════════════════════
function IaCnhPage({ activeSubTab, onSubTabChange }) {
  return (
    <div style={{ flex: 1, overflow: "auto", padding: "0 28px 32px" }}>
      {/* ── Header ── */}
      <header style={{ padding: "28px 0 6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: radius.lg - 2,
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 4px 24px ${colors.accent}30`,
          }}>
            <Icon name="bot" size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{
              fontSize: 22, fontWeight: 800, color: colors.textPrimary,
              fontFamily: fonts.heading, lineHeight: 1.2, margin: 0,
            }}>IA CNH</h1>
            <p style={{ fontSize: 13.5, color: colors.textSecondary, margin: 0, marginTop: 2 }}>
              Central de consulta, aprendizado e engajamento sobre a CNH da IA
            </p>
          </div>
        </div>
      </header>

      {/* ── Sub-tabs ── */}
      <nav style={{
        display: "flex", gap: 2, margin: "18px 0 24px",
        borderBottom: `1px solid ${colors.border}`,
      }}>
        {subTabs.map((tab) => {
          const active = activeSubTab === tab.id;
          return (
            <button key={tab.id} onClick={() => onSubTabChange(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 7,
                padding: "10px 20px", fontSize: 13,
                fontWeight: active ? 700 : 400,
                color: active ? colors.textPrimary : colors.textMuted,
                background: "none", border: "none",
                borderBottom: `2px solid ${active ? colors.accent : "transparent"}`,
                cursor: "pointer", transition: transitions.fast,
                marginBottom: -1, fontFamily: fonts.heading,
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => { if (!active) e.target.style.color = colors.textSecondary; }}
              onMouseLeave={(e) => { if (!active) e.target.style.color = colors.textMuted; }}
            >
              <Icon name={tab.iconKey} size={15} color={active ? colors.accentLight : colors.textMuted} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* ── Content ── */}
      {activeSubTab === "chat" && <ChatAssistant />}
      {activeSubTab === "play" && <CnhPlay />}
      {activeSubTab === "modulos" && <FutureModules />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  PLACEHOLDER (outras páginas do sistema)
// ═══════════════════════════════════════════════════════════════
function PlaceholderPage({ pageId }) {
  const all = [...mainMenuItems, ...adminMenuItems];
  const label = all.find((m) => m.id === pageId)?.label || pageId;
  return (
    <div style={{
      flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
      textAlign: "center", padding: 40,
    }}>
      <div>
        <div style={{
          width: 56, height: 56, borderRadius: radius.lg,
          background: colors.bgCard, border: `1px solid ${colors.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <Icon name={menuIconMap?.[pageId] || "grid"} size={24} color={colors.textMuted} />
        </div>
        <div style={{ fontSize: 15, color: colors.textSecondary, fontFamily: fonts.heading, fontWeight: 600 }}>
          {label}
        </div>
        <div style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
          Conteúdo original do sistema Vanguardia 360
        </div>
      </div>
    </div>
  );
}








