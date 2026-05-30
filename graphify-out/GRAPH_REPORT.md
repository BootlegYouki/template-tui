# Graph Report - template-tui  (2026-05-30)

## Corpus Check
- 38 files · ~17,273 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 294 nodes · 513 edges · 17 communities (15 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0a28c73b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 17|Community 17]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 81 edges
2. `compilerOptions` - 19 edges
3. `compilerOptions` - 16 edges
4. `scripts` - 10 edges
5. `Button()` - 10 edges
6. `Badge()` - 9 edges
7. `tailwind` - 6 edges
8. `aliases` - 6 edges
9. `Separator()` - 6 edges
10. `TabsList()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts
- `SheetOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/sheet.tsx → src/lib/utils.ts
- `SheetFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/sheet.tsx → src/lib/utils.ts
- `App()` --calls--> `useTheme()`  [EXTRACTED]
  src/App.tsx → src/components/theme-provider.tsx

## Communities (17 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (35): cn(), BrutalistSlider(), BrutalistSliderProps, LogMessage, TacticalWidgets(), TacticalWidgetsProps, Avatar(), AvatarBadge() (+27 more)

### Community 1 - "Community 1"
Cohesion: 0.10
Nodes (21): StyleSection(), latencyData, processData, radarData, TelemetrySection(), TelemetrySectionProps, weeklyData, Badge() (+13 more)

### Community 2 - "Community 2"
Cohesion: 0.10
Nodes (24): ResolvedTheme, Theme, THEME_VALUES, ThemeProvider(), ThemeProviderContext, ThemeProviderProps, ThemeProviderState, useTheme() (+16 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (31): ComponentsSectionProps, ICON_LIST, IconItem, Button(), buttonVariants, Card(), CardAction(), CardContent() (+23 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, prettier, prettier-plugin-tailwindcss (+7 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 6 - "Community 6"
Cohesion: 0.09
Nodes (21): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib, module, moduleDetection, moduleResolution (+13 more)

### Community 7 - "Community 7"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection, moduleResolution, noEmit (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (28): dependencies, class-variance-authority, clsx, @fontsource-variable/jetbrains-mono, radix-ui, react, react-dom, recharts (+20 more)

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (5): 1. Verification & Map First (Rule), 2. Maintenance Workflow (Workflow), CLAUDE.md — Workspace Rules & Workflows, Command Guidelines, Graphify Memory & Ingestion Layer

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (5): compilerOptions, paths, files, @/*, references

### Community 11 - "Community 11"
Cohesion: 0.22
Nodes (8): Adding components, 🧹 How to Clean the Template (Start Fresh), 🚀 Key Features, 🧠 maintaining the Graphify Knowledge Graph, 🛠️ Quick Start, React + TypeScript + Vite + shadcn/ui, 📟 template-tui — Retro-Brutalist TUI Design System, Using components

### Community 15 - "Community 15"
Cohesion: 0.33
Nodes (5): APP_TSX_PATH, __dirname, __filename, ROOT_DIR, TEMPLATE_DIR_PATH

### Community 17 - "Community 17"
Cohesion: 0.33
Nodes (5): APP_TSX_PATH, __dirname, __filename, ROOT_DIR, TEMPLATE_DIR_PATH

## Knowledge Gaps
- **143 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+138 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 1`, `Community 2`, `Community 3`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 4` to `Community 8`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _143 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08776595744680851 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.10052910052910052 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.09747899159663866 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.08636977058029689 - nodes in this community are weakly interconnected._