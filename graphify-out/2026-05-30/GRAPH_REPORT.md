# Graph Report - template-tui  (2026-05-30)

## Corpus Check
- 38 files · ~17,356 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 310 nodes · 657 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `899e480b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Tactical UI Components Forge|Tactical UI Components Forge]]
- [[_COMMUNITY_Vivid TUI Components Hub|Vivid TUI Components Hub]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Data Pulse Hub|Data Pulse Hub]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Terminal UI Collective|Terminal UI Collective]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Modern Package Masters|Modern Package Masters]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Nimble Pnpm Pioneers|Nimble Pnpm Pioneers]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 83 edges
2. `ComponentsSection()` - 68 edges
3. `TacticalWidgets()` - 29 edges
4. `compilerOptions` - 19 edges
5. `DropdownMenu()` - 17 edges
6. `compilerOptions` - 16 edges
7. `TelemetrySection()` - 16 edges
8. `Badge()` - 13 edges
9. `Button()` - 13 edges
10. `scripts` - 12 edges

## Surprising Connections (you probably didn't know these)
- `graphify pipeline` --conceptually_related_to--> `Graphify Memory & Ingestion Layer`  [INFERRED]
  .agents/workflows/graphify.md → CLAUDE.md
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts
- `SheetOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/sheet.tsx → src/lib/utils.ts
- `SheetFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/sheet.tsx → src/lib/utils.ts

## Communities (18 total, 4 thin omitted)

### Community 0 - "Tactical UI Components Forge"
Cohesion: 0.15
Nodes (28): cn(), TuiContainer, BrutalistSlider(), BrutalistSliderProps, LogMessage, TacticalWidgets(), TacticalWidgetsProps, Avatar() (+20 more)

### Community 1 - "Vivid TUI Components Hub"
Cohesion: 0.12
Nodes (19): ResolvedTheme, Theme, THEME_VALUES, ThemeProvider(), ThemeProviderContext, ThemeProviderProps, ThemeProviderState, useTheme() (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.23
Nodes (15): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuPortal(), DropdownMenuRadioGroup() (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 5 - "Data Pulse Hub"
Cohesion: 0.13
Nodes (22): StyleSection(), latencyData, processData, radarData, TelemetrySection(), TelemetrySectionProps, weeklyData, Badge() (+14 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (21): APP_TSX_PATH, __dirname, __filename, ROOT_DIR, TEMPLATE_DIR_PATH, APP_TSX_PATH, __dirname, __filename (+13 more)

### Community 7 - "Community 7"
Cohesion: 0.06
Nodes (33): dependencies, class-variance-authority, clsx, @fontsource-variable/jetbrains-mono, radix-ui, react, react-dom, recharts (+25 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 9 - "Terminal UI Collective"
Cohesion: 0.12
Nodes (32): ComponentsSection(), ComponentsSectionProps, ICON_LIST, IconItem, LogMessage, Card(), CardAction(), CardContent() (+24 more)

### Community 10 - "Community 10"
Cohesion: 0.17
Nodes (11): Adding components, 🧼 Clean the Template (Start Fresh), 🧹 How to Clean the Template (Start Fresh), 🚀 Key Features, 🧠 maintaining the Graphify Knowledge Graph, 🛠️ Quick Start, React + TypeScript + Vite + shadcn/ui, 📟 Restore/Initialize the Template (+3 more)

### Community 11 - "Community 11"
Cohesion: 0.18
Nodes (11): Graphify Memory & Ingestion Layer, graphify-out/, template-tui, graphify, graphify query, 1. Verification & Map First (Rule), 2. Maintenance Workflow (Workflow), CLAUDE.md — Workspace Rules & Workflows (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.33
Nodes (5): compilerOptions, paths, files, @/*, references

## Knowledge Gaps
- **137 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+132 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Tactical UI Components Forge` to `Terminal UI Collective`, `Community 2`, `Data Pulse Hub`, `Vivid TUI Components Hub`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `ComponentsSection()` connect `Terminal UI Collective` to `Tactical UI Components Forge`, `Vivid TUI Components Hub`, `Community 2`, `Data Pulse Hub`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `TuiContainer` connect `Tactical UI Components Forge` to `Terminal UI Collective`, `Community 11`, `Data Pulse Hub`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _140 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Vivid TUI Components Hub` be split into smaller, more focused modules?**
  _Cohesion score 0.12183908045977011 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._