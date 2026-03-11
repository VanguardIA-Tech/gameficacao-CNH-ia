/**
 * ═══════════════════════════════════════════════════════════════
 *  CSS global — injetado uma vez no mount da aplicação.
 *  Inclui: fonts, keyframes, hover utilities, scrollbar.
 * ═══════════════════════════════════════════════════════════════
 */

let injected = false;

export function injectGlobalStyles() {
  if (injected) return;
  injected = true;

  const style = document.createElement("style");
  style.id = "vg-global";
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap');

    /* ── Keyframes ────────────────────────────────── */
    @keyframes vg-fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes vg-slideUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes vg-scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes vg-shimmer {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes vg-pulse {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0.6; }
    }
    @keyframes vg-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.25); }
      50%      { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
    }
    @keyframes vg-progressFill {
      from { width: 0%; }
    }
    @keyframes vg-typing {
      0%   { opacity: 0.3; }
      50%  { opacity: 1; }
      100% { opacity: 0.3; }
    }

    /* ── Utility hover classes ────────────────────── */
    .vg-hover-lift:hover   { transform: translateY(-2px); }
    .vg-hover-scale:hover  { transform: scale(1.02); }
    .vg-hover-glow:hover   { box-shadow: 0 0 20px rgba(99,102,241,0.15); }
    .vg-hover-bright:hover { filter: brightness(1.1); }

    /* ── Scrollbar ────────────────────────────────── */
    ::-webkit-scrollbar       { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.14); }

    /* ── Focus visible ───────────────────────────── */
    *:focus-visible {
      outline: 2px solid rgba(99,102,241,0.5);
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);
}
