# 📟 template-tui — Retro-Brutalist TUI Design System

`template-tui` is a high-fidelity, production-ready template designed for building **Terminal User Interface (TUI) style design systems**, tactical control dashboards, and retro-brutalist web applications. 

Powered by **React 19**, **Vite 8**, **Tailwind CSS v4**, **Radix UI**, and **Shadcn**, this template offers a robust foundation for developers looking to build sleek, monospaced interfaces with sharp geometric borders, rich dark/light modes, and high-fidelity terminal interactions.

---

## 🚀 Key Features

*   📟 **Brutalist Grid Layouts**: Integrated `<TuiContainer>` panels rendering geometric fieldset borders, legend headers, and tactical layout alignments.
*   🎨 **Interactive Accent Color Themes**: Multi-theme selector built into the sticky status bar (supporting Monochrome Gray, Tactical Amber, Terminal Green, Cyber Rose, and Cobalt Blue) that automatically synchronizes CSS variables across dark/light mode toggles.
*   ⚡ **Tactical Input Widgets**: Custom brutalist switches, retro checklist boxes, and radio node selectors mapped directly to operational hooks.
*   🔍 **RemixIcon Library Explorer**: Categorized and searchable grid containing 40+ standard web/app icons, featuring dynamic sizing selectors, theme color overrides, and direct click-to-copy import utility linked to the logging console.
*   📜 **Console Log Stream Viewer**: Slide-out drawer sheet logging real-time user actions, telemetry alerts, and clipboard copies, simulating a non-volatile local system terminal.
*   📊 **Telemetry & Charts**: Interactive telemetry boards rendering dynamic CPU, RAM, and network throughput charts built using **Recharts**.
*   🧠 **Graphify Knowledge Graph**: Fully integrated code AST map (`graphify-out/`) providing automated subagent steering rules, workflows, and token-saving semantic queries for AI coding assistants.

---

## 🛠️ Quick Start

Install dependencies and start development using `pnpm` (workspace preference):

```bash
# 1. Install workspace dependencies
pnpm install

# 2. Launch the local development server
pnpm run dev

# 3. Compile the production-ready minified bundle
pnpm run build
```

---

## 🧹 How to Clean the Template (Start Fresh)

The design system showcase is fully isolated from the core application canvas. To delete the showcase and start building your custom blank application:

1.  **Open [src/App.tsx](file:///e:/Github/template-tui/src/App.tsx)**:
    Delete the `<TuiShowcase />` component call and its corresponding import statement, leaving a clean `<App />` canvas.
2.  **Delete the Showcase Assets**:
    Delete the entire `src/components/tui-template/` directory. All telemetry sections, tactical buttons, and icon grids are self-contained inside this folder and can be safely deleted in a single click without breaking the shell.

---

## 🧠 maintaining the Graphify Knowledge Graph

If you use AI coding assistants (like Cursor, Claude Code, or Antigravity), this template includes built-in Graphify rules and workflows. 

To keep the knowledge graph synchronized with your directory layout and code structure after you start writing custom modules, run this offline command (zero LLM token cost):

```bash
graphify update .
```

*Note: Graphify ignore rules are pre-configured in `.graphifyignore` to keep your graph focused on code logic, excluding lockfiles, build directories, and visual templates.*
