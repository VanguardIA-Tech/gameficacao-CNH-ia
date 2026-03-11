/**
 * ═══════════════════════════════════════════════════════════════
 *  CHAT ASSISTANT  (Bloco 1)
 *  Mini chat para consultas sobre CNH da IA.
 *  Inclui: campo de input, sugestões clicáveis e keywords.
 *
 *  INTEGRAÇÃO FUTURA:
 *  → Substituir handleSend() pela chamada real à API de IA
 *  → Endpoint sugerido: POST /api/ia-cnh/chat
 *  → Payload: { question: string, context?: string }
 *  → Response: { answer: string, sources?: string[] }
 * ═══════════════════════════════════════════════════════════════
 */
import { useState, useRef, useEffect } from "react";
import { colors, radius, fonts, transitions, shadows } from "../styles/theme";
import { suggestedQuestions, keywords } from "../data/constants";
import Icon from "./Icon";

export default function ChatAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [activeKw, setActiveKw] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((p) => [...p, { role: "user", text: input.trim() }]);
    setInput(""); setActiveKw(null);
    setIsTyping(true);

    // ── INTEGRAÇÃO FUTURA: chamada real à API ──────────────────────
    // try {
    //   const res = await fetch('/api/ia-cnh/chat', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ question: input.trim() }),
    //   });
    //   const data = await res.json();
    //   setMessages(p => [...p, { role: 'assistant', text: data.answer }]);
    // } catch (err) { /* tratamento de erro */ }
    // ──────────────────────────────────────────────────────────────

  setTimeout(() => {
    setMessages((p) => [
      ...p,
      {
        role: "assistant",
        text: `1 - 3R (Receber, Resumir, Recomendar): Esta alavanca é usada para processar o caos informacional de reuniões, áudios e relatórios pesados, transformando-os em sínteses claras e recomendações práticas de próximos passos.

              2 - Instruções Personalizadas: Servem para ensinar a IA a entender o contexto específico da empresa, seus produtos, clientes e a forma particular de decidir do líder, garantindo que as respostas não sejam genéricas.

              3 - Atualização de Memória Intencional (AMI): Consiste em alimentar a IA regularmente com as mudanças, novas decisões e aprendizados da organização, mantendo o "cérebro auxiliar" da empresa sempre atualizado com a realidade atual.

              4 - Comandos Bem Escritos: Foca na habilidade de transformar perguntas vagas em pedidos claros, específicos e orientados a resultados, garantindo que a saída da IA tenha a profundidade necessária.

              5 - Fluxos Multiagente: Permitem o uso de múltiplos contextos ou "agentes" de IA para tratar de diferentes partes da operação, como o comercial, processos ou dados, todos integrados sob a mesma visão.

              6 - IPC (Inteligência Pessoal Compartilhada): Cria agentes personalizados que representam inteligências específicas, como a "inteligência do fundador", do jurídico ou do comercial, funcionando como conselheiros estratégicos que preservam o conhecimento da empresa.`
      }
    ]);
  }, 800);};

  const onKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  const selectSuggestion = (text) => { setInput(text); inputRef.current?.focus(); };
  const toggleKeyword = (kw) => {
    if (activeKw === kw) { setActiveKw(null); }
    else { setActiveKw(kw); setInput(`Sobre: ${kw}`); inputRef.current?.focus(); }
  };

  const filtered = activeKw ? suggestedQuestions.filter((q) => q.tag === activeKw) : suggestedQuestions;
  const hasText = input.trim().length > 0;

  return (
    <div style={{ animation: "vg-fadeIn 0.35s ease" }}>
      {/* ══ Chat box ══ */}
      <div style={{
        background: colors.bgCard, borderRadius: radius.lg,
        border: `1px solid ${colors.border}`, overflow: "hidden",
        marginBottom: 22, boxShadow: shadows.card,
      }}>
        {/* Mensagens */}
        <div style={{ padding: 24, minHeight: 240, maxHeight: 380, overflowY: "auto" }}>
          {messages.length === 0 && !isTyping ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "36px 20px", gap: 10 }}>
              <div style={{
                width: 54, height: 54, borderRadius: radius.xl,
                background: `linear-gradient(135deg, ${colors.accentGlow}, ${colors.violetGlow})`,
                border: `1px solid ${colors.accentBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon name="bot" size={24} color={colors.violet} />
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: colors.textPrimary, fontFamily: fonts.heading }}>
                Olá! Como posso ajudar?
              </div>
              <div style={{ fontSize: 13, color: colors.textSecondary, maxWidth: 400, lineHeight: 1.7 }}>
                Selecione uma das perguntas sugeridas abaixo ou escreva diretamente sua dúvida sobre a CNH da IA.
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  marginBottom: 14, animation: `vg-fadeIn 0.3s ease`,
                }}>
                  {msg.role === "assistant" && (
                    <div style={{
                      width: 28, height: 28, borderRadius: radius.md, marginRight: 10, flexShrink: 0, marginTop: 2,
                      background: colors.accentGlow, border: `1px solid ${colors.accentBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon name="bot" size={14} color={colors.accentLight} />
                    </div>
                  )}
                  <div style={{
                    maxWidth: "72%", padding: "11px 16px",
                    borderRadius: msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: msg.role === "user" ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})` : "rgba(255,255,255,0.03)",
                    border: msg.role === "user" ? "none" : `1px solid ${colors.border}`,
                    color: msg.role === "user" ? "#fff" : colors.textSecondary,
                    fontSize: 13.5, lineHeight: 1.65, fontFamily: fonts.body,
                  }}>{msg.text}</div>
                </div>
              ))}
              {/* Indicador de digitação */}
              {isTyping && (
                <div style={{ display: "flex", alignItems: "center", gap: 10, animation: "vg-fadeIn 0.2s ease" }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: radius.md,
                    background: colors.accentGlow, border: `1px solid ${colors.accentBorder}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon name="bot" size={14} color={colors.accentLight} />
                  </div>
                  <div style={{
                    padding: "10px 18px", borderRadius: "14px 14px 14px 4px",
                    background: "rgba(255,255,255,0.03)", border: `1px solid ${colors.border}`,
                    display: "flex", gap: 5,
                  }}>
                    {[0, 1, 2].map((d) => (
                      <div key={d} style={{
                        width: 7, height: 7, borderRadius: "50%", background: colors.textMuted,
                        animation: `vg-typing 1.2s infinite ${d * 0.2}s`,
                      }} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{
          borderTop: `1px solid ${colors.border}`, padding: "14px 20px",
          display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.015)",
        }}>
          <input ref={inputRef} placeholder="Digite sua pergunta sobre a CNH da IA..."
            value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
            style={{
              flex: 1, background: colors.bgInput,
              border: `1px solid ${colors.border}`, borderRadius: radius.md,
              padding: "11px 16px", color: colors.textPrimary, fontSize: 13.5,
              outline: "none", transition: transitions.fast, fontFamily: fonts.body,
            }}
            onFocus={(e) => { e.target.style.borderColor = colors.accentBorder; e.target.style.background = colors.bgInputHover; }}
            onBlur={(e) => { e.target.style.borderColor = colors.border; e.target.style.background = colors.bgInput; }}
          />
          <button onClick={send} disabled={!hasText}
            style={{
              width: 40, height: 40, borderRadius: radius.md, border: "none",
              background: hasText ? `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})` : colors.bgInput,
              color: hasText ? "#fff" : colors.textMuted,
              cursor: hasText ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: transitions.fast, flexShrink: 0,
              boxShadow: hasText ? shadows.glow("rgba(99,102,241,0.25)") : "none",
            }}>
            <Icon name="send" size={17} />
          </button>
        </div>
      </div>

      {/* ══ Keywords ══ */}
      <section style={{ marginBottom: 22 }}>
        <SectionLabel icon="sparkle" text="Palavras-chave" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {keywords.map((kw) => {
            const active = activeKw === kw;
            return (
              <button key={kw} onClick={() => toggleKeyword(kw)}
                style={{
                  padding: "6px 14px", borderRadius: radius.full,
                  fontSize: 12.5, fontWeight: 500, cursor: "pointer",
                  fontFamily: fonts.body,
                  border: `1px solid ${active ? colors.accentBorder : colors.border}`,
                  background: active ? colors.accentGlow : "rgba(255,255,255,0.02)",
                  color: active ? colors.accentLight : colors.textSecondary,
                  transition: transitions.fast, whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { if (!active) { e.target.style.borderColor = colors.borderHover; e.target.style.color = colors.textPrimary; }}}
                onMouseLeave={(e) => { if (!active) { e.target.style.borderColor = colors.border; e.target.style.color = colors.textSecondary; }}}
              >{kw}</button>
            );
          })}
        </div>
      </section>

      {/* ══ Perguntas sugeridas ══ */}
      <section>
        <SectionLabel icon="sparkle" text="Perguntas sugeridas" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 10 }}>
          {filtered.map((q, i) => (
            <SuggestionCard key={q.id} question={q} index={i} onClick={() => selectSuggestion(q.text)} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Mini-componentes internos ────────────────────────────────────────

function SectionLabel({ icon, text }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 700, color: colors.textMuted,
      textTransform: "uppercase", letterSpacing: "0.08em",
      marginBottom: 10, display: "flex", alignItems: "center", gap: 6,
      fontFamily: fonts.heading,
    }}>
      <Icon name={icon} size={13} color={colors.textMuted} />
      {text}
    </div>
  );
}

function SuggestionCard({ question, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 16px", borderRadius: radius.md,
        background: hovered ? "rgba(99,102,241,0.04)" : "rgba(255,255,255,0.018)",
        border: `1px solid ${hovered ? colors.accentBorder : colors.border}`,
        cursor: "pointer", transition: transitions.normal,
        display: "flex", alignItems: "flex-start", gap: 12,
        animation: `vg-slideUp 0.3s ease ${index * 0.04}s both`,
        transform: hovered ? "translateY(-1px)" : "none",
      }}>
      <div style={{
        width: 26, height: 26, borderRadius: radius.sm + 1,
        background: colors.accentGlow, border: `1px solid ${colors.accentBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 800, color: colors.accentLight,
        flexShrink: 0, fontFamily: fonts.mono,
      }}>{question.id}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.55, fontFamily: fonts.body }}>{question.text}</div>
        <div style={{ fontSize: 10.5, color: colors.textMuted, marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="sparkle" size={10} color={colors.textMuted} /> {question.tag}
        </div>
      </div>
    </div>
  );
}
