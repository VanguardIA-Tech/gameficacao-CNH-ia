# Vanguardia 360 — IA CNH

Projeto front-end estruturado da aba **IA CNH** do sistema Vanguardia 360.

## Estrutura de pastas

```
src/
├── components/
│   ├── Icon.jsx            # Biblioteca centralizada de ícones SVG
│   ├── Sidebar.jsx         # Menu lateral de navegação
│   ├── TopBar.jsx          # Barra superior com busca
│   ├── ChatAssistant.jsx   # Bloco 1 — Mini chat / assistente IA
│   ├── CnhPlay.jsx         # Bloco 2 — Gamificação, ranking, desafios
│   └── FutureModules.jsx   # Bloco 3 — Cards de módulos futuros
├── data/
│   └── constants.js        # Dados mock e configurações centralizadas
├── styles/
│   ├── theme.js            # Design tokens (cores, fontes, espaçamentos)
│   └── globalStyles.js     # CSS global injetado (keyframes, scrollbar)
├── App.jsx                 # Componente raiz / orquestrador
└── main.jsx                # Entry point React
```

## Como rodar

```bash
npm install
npm run dev
```

Acesse **http://localhost:5173** no navegador.

## Pontos de integração futura

Todos marcados com comentários `INTEGRAÇÃO FUTURA` no código:

- **ChatAssistant.jsx** → `POST /api/ia-cnh/chat`
- **CnhPlay.jsx** → `GET /api/cnh-play/user-stats`, `/ranking`, `/challenges`
- **FutureModules.jsx** → `GET /api/ia-cnh/modules`
- **constants.js** → dados mock a serem substituídos por chamadas reais

## Build para produção

```bash
npm run build
```

Arquivos gerados na pasta `dist/`.
