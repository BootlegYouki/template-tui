# Graph Report - template-tui  (2026-05-30)

## Corpus Check
- 35 files · ~16,087 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 271 nodes · 473 edges · 15 communities (13 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `065fd999`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 80 edges
2. `compilerOptions` - 19 edges
3. `compilerOptions` - 16 edges
4. `Button()` - 9 edges
5. `Badge()` - 8 edges
6. `scripts` - 7 edges
7. `tailwind` - 6 edges
8. `aliases` - 6 edges
9. `Separator()` - 5 edges
10. `TabsList()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `BrutalistSlider()` --calls--> `cn()`  [EXTRACTED]
  src/components/tui-template/tactical-widgets.tsx → src/lib/utils.ts
- `SelectGroup()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/select.tsx → src/lib/utils.ts
- `SelectLabel()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/select.tsx → src/lib/utils.ts
- `SelectSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/select.tsx → src/lib/utils.ts
- `SelectScrollUpButton()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/select.tsx → src/lib/utils.ts

## Communities (15 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (45): cn(), ComponentsSectionProps, ICON_LIST, IconItem, Avatar(), AvatarBadge(), AvatarFallback(), AvatarGroup() (+37 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (23): StyleSection(), latencyData, processData, radarData, TelemetrySection(), TelemetrySectionProps, weeklyData, Badge() (+15 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (21): ResolvedTheme, Theme, THEME_VALUES, ThemeProvider(), ThemeProviderContext, ThemeProviderProps, ThemeProviderState, useTheme() (+13 more)

### Community 3 - "Community 3"
Cohesion: 0.11
Nodes (20): BrutalistSlider(), BrutalistSliderProps, LogMessage, TacticalWidgets(), TacticalWidgetsProps, Input(), Label(), Select() (+12 more)

### Community 4 - "Community 4"
Cohesion: 0.07
Nodes (26): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, prettier, prettier-plugin-tailwindcss (+18 more)

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
Cohesion: 0.14
Nodes (14): dependencies, class-variance-authority, clsx, @fontsource-variable/jetbrains-mono, radix-ui, react, react-dom, recharts (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (5): 1. Verification & Map First (Rule), 2. Maintenance Workflow (Workflow), CLAUDE.md — Workspace Rules & Workflows, Command Guidelines, Graphify Memory & Ingestion Layer

### Community 10 - "Community 10"
Cohesion: 0.33
Nodes (5): compilerOptions, paths, files, @/*, references

### Community 11 - "Community 11"
Cohesion: 0.50
Nodes (3): Adding components, React + TypeScript + Vite + shadcn/ui, Using components

## Knowledge Gaps
- **125 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 0` to `Community 1`, `Community 2`, `Community 3`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 8` to `Community 4`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07562008469449485 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09247311827956989 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0896551724137931 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.10846560846560846 - nodes in this community are weakly interconnected._