/**
 * ═══════════════════════════════════════════════════════════════
 *  DADOS ESTÁTICOS / MOCK
 *  Centraliza tudo o que futuramente virá do backend.
 *  Cada seção está marcada com INTEGRAÇÃO FUTURA.
 * ═══════════════════════════════════════════════════════════════
 */

// ── INTEGRAÇÃO FUTURA: dados do usuário logado virão da sessão/auth ──
export const currentUser = {
  name: "Lucas Marques",
  initials: "LM",
  role: "Administrador",
  points: 1200,
  level: "Intermediário",
  progress: 65,
  position: 4,
};

// ── Menu principal do sistema ──
export const mainMenuItems = [
  { id: "operacao",   label: "Operação" },
  { id: "performance",label: "Performance" },
  { id: "squads",     label: "Squads" },
  { id: "empresas",   label: "Empresas" },
  { id: "entregas",   label: "Entregas" },
  { id: "agenda",     label: "Agenda" },
  { id: "insights",   label: "Insights IA" },
  { id: "ia-cnh",     label: "IA CNH", badge: "novo" },
  { id: "tutoriais",  label: "Tutoriais" },
];

export const adminMenuItems = [
  { id: "acessos",       label: "Acessos" },
  { id: "notificacoes",  label: "Notificações" },
  { id: "configuracoes", label: "Configurações" },
];

// ── Sub-abas da página IA CNH ──
export const subTabs = [
  { id: "chat",    label: "Assistente IA",  iconKey: "bot" },
  { id: "play",    label: "CNH PLAY",       iconKey: "gamepad" },
  { id: "modulos", label: "Módulos",        iconKey: "grid" },
];

// ── INTEGRAÇÃO FUTURA: perguntas sugeridas carregadas via API ──
export const suggestedQuestions = [
  { id: 1, text: "Quais as 6 alavancas do CNH da IA?",      tag: "CNH da IA" },
  { id: 2, text: "Qual é o principal objetivo do workshop da CNH da IA?",           tag: "Workshop" },
  { id: 3, text: "O que precisa ser entregue sobre a CNH da IA?",                  tag: "Entregáveis" },
  { id: 4, text: "Quem deve participar da CNH da IA?",                             tag: "Participantes" },
  { id: 5, text: "Quais são os benefícios da CNH da IA para a empresa?",           tag: "Benefícios" },
  { id: 6, text: "Como funciona o processo da CNH da IA?",                         tag: "Objetivo" },
  { id: 7, text: "Onde encontro mais informações sobre a CNH da IA?",              tag: "Regras" },
];

export const keywords = [
  "CNH da IA", "Workshop", "Entregáveis", "Objetivo",
  "Participantes", "Regras", "Benefícios",
];

// ── INTEGRAÇÃO FUTURA: ranking via API com dados reais ──
export const rankingData = [
  { pos: 1, name: "Ana Carolina Silva",   points: 2350, initials: "AC" },
  { pos: 2, name: "Rafael Oliveira",      points: 1980, initials: "RO" },
  { pos: 3, name: "Fernanda Peixoto",     points: 1540, initials: "FP" },
  { pos: 4, name: "Lucas Marques",        points: 1200, initials: "LM", isCurrent: true },
  { pos: 5, name: "Mario Ruben Neto",     points: 980,  initials: "MR" },
];

// ── INTEGRAÇÃO FUTURA: desafios carregados dinamicamente ──
export const challenges = [
  { id: 1, title: "Quiz rápido sobre CNH da IA", colorKey: "warning",  status: "available" },
  { id: 2, title: "Verdadeiro ou Falso",         colorKey: "success",  status: "available" },
  { id: 3, title: "Missão do dia",               colorKey: "accent",   status: "active" },
  { id: 4, title: "Revisão de conceitos",        colorKey: "pink",     status: "available" },
  { id: 5, title: "Desafio relâmpago",           colorKey: "danger",   status: "locked" },
];

// ── Módulos futuros (roadmap visual) ──
export const futureModules = [
  { id: "trilha",       title: "Trilha de Aprendizagem", desc: "Etapas de evolução, conteúdos concluídos e progresso individual", colorKey: "success" },
  { id: "biblioteca",   title: "Biblioteca CNH",         desc: "PDFs, vídeos, resumos e links úteis sobre a CNH da IA",           colorKey: "info" },
  { id: "certificados", title: "Certificados",           desc: "Acompanhe seu progresso e certificados conquistados",              colorKey: "warning" },
  { id: "missoes",      title: "Missões",      desc: "Desafios recorrentes para engajamento contínuo",                   colorKey: "pink" },
];
