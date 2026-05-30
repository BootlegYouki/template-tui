import { Badge } from "@/components/ui/badge"
import { TuiContainer } from "@/components/ui/tui-container"

export function StyleSection() {
  return (
    <div className="space-y-4 outline-none">
      {/* PANEL 01: TYPOGRAPHY */}
      <TuiContainer
        label="01_TYPOGRAPHY"
        badge={<Badge variant="outline" className="text-[10px] rounded-none py-0 h-4 leading-none">FONT: MONO</Badge>}
      >
        <div className="text-xs text-muted-foreground mb-4">
          Typography System &mdash; Sharp monospaced typefaces designed for high-density command consoles.
        </div>
        
        <div className="space-y-6">
          {/* Headings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-dashed border-border/80 pb-6">
            <div className="space-y-3">
              <div>
                <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Heading 1 [h1]</span>
                <h1 className="text-3xl font-extrabold tracking-tight uppercase">MATRIX CORE</h1>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Heading 2 [h2]</span>
                <h2 className="text-xl font-bold tracking-tight uppercase">SYSTEMS MONITORING</h2>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Heading 3 [h3]</span>
                <h3 className="text-lg font-bold uppercase">Operations Center</h3>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Heading 4 [h4]</span>
                <h4 className="text-base font-semibold uppercase">Hardware Diagnostics</h4>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Heading 5 [h5]</span>
                <h5 className="text-sm font-semibold uppercase">Protocol Parameters</h5>
              </div>
              <div>
                <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Heading 6 [h6]</span>
                <h6 className="text-xs font-semibold uppercase">Volatile Memory Registers</h6>
              </div>
            </div>
          </div>

          {/* Paragraph, blockquote, inline tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <span className="text-[9px] text-muted-foreground uppercase font-bold block">Standard Body Paragraph</span>
              <p className="text-xs/relaxed text-muted-foreground leading-relaxed">
                This is standard body paragraph text rendering in JetBrains Mono. In TUI designs, density is critical. 
                We use a line-height of <code className="text-foreground border px-1 bg-muted">1.6</code> to maintain clear 
                legibility even at extremely low font sizes like <span className="font-bold text-foreground">11px</span> or <span className="font-bold text-foreground">12px</span>.
              </p>
              
              <div className="pt-2">
                <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Keyboard Shortcuts [kbd]</span>
                <div className="flex flex-wrap gap-2 items-center text-xs">
                  <span>Press</span>
                  <kbd className="px-1.5 py-0.5 border border-border bg-muted text-[10px] font-mono rounded-none text-foreground/80 shadow-[0_1px_0_0_rgba(0,0,0,0.15)]">D</kbd>
                  <span>to swap theme, or</span>
                  <kbd className="px-1.5 py-0.5 border border-border bg-muted text-[10px] font-mono rounded-none text-foreground/80 shadow-[0_1px_0_0_rgba(0,0,0,0.15)]">Ctrl</kbd>
                  <span>+</span>
                  <kbd className="px-1.5 py-0.5 border border-border bg-muted text-[10px] font-mono rounded-none text-foreground/80 shadow-[0_1px_0_0_rgba(0,0,0,0.15)]">`</kbd>
                  <span>to focus shell.</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[9px] text-muted-foreground uppercase font-bold block">System Blockquote</span>
              <blockquote className="border-l-2 border-primary pl-4 py-1 italic text-muted-foreground text-xs">
                "Brutalist terminal aesthetics prioritize functional readability above all. Sharp edges, 
                non-rounded containers, high contrast, and direct visual hierarchy provide a lightweight, 
                zero-friction workspace."
              </blockquote>

              <div className="pt-1">
                <span className="text-[9px] text-muted-foreground uppercase font-bold block mb-1">Preformatted Code Blocks</span>
                <pre className="p-2 border border-border bg-muted/40 text-[10px] overflow-x-auto text-foreground/90 font-mono leading-normal">
{`// Shell Authentication Matrix
const auth = async (node: string) => {
  return await verify(node) ? 0x01 : 0x00;
};`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </TuiContainer>

      {/* PANEL 02: COLOR PALETTE */}
      <TuiContainer
        label="02_COLOR_PALETTE"
        badge={<Badge variant="outline" className="text-[10px] rounded-none py-0 h-4 leading-none">OKLCH LABS</Badge>}
      >
        <div className="text-xs text-muted-foreground mb-4">
          Color Palette System &mdash; Modern OKLCH variables mapping dynamically between high-fidelity Light and Dark matrices.
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          
          {/* Swatch 1: Background */}
          <div className="border border-border p-2 bg-card/60 flex flex-col gap-2">
            <div className="w-full h-12 bg-background border border-border flex items-center justify-center text-[10px] font-bold">
              bg-background
            </div>
            <div className="text-[10px]">
              <div className="font-bold text-foreground">Background</div>
              <div className="text-muted-foreground select-all text-[9px] font-mono">--background</div>
              <div className="text-[8px] text-muted-foreground/75 mt-1">Light: oklch(1 0 0)<br />Dark: oklch(0.145 0 0)</div>
            </div>
          </div>

          {/* Swatch 2: Foreground */}
          <div className="border border-border p-2 bg-card/60 flex flex-col gap-2">
            <div className="w-full h-12 bg-foreground border border-border flex items-center justify-center text-[10px] font-bold text-background">
              bg-foreground
            </div>
            <div className="text-[10px]">
              <div className="font-bold text-foreground">Foreground</div>
              <div className="text-muted-foreground select-all text-[9px] font-mono">--foreground</div>
              <div className="text-[8px] text-muted-foreground/75 mt-1">Light: oklch(0.145 0 0)<br />Dark: oklch(0.985 0 0)</div>
            </div>
          </div>

          {/* Swatch 3: Primary */}
          <div className="border border-border p-2 bg-card/60 flex flex-col gap-2">
            <div className="w-full h-12 bg-primary border border-border flex items-center justify-center text-[10px] font-bold text-primary-foreground">
              bg-primary
            </div>
            <div className="text-[10px]">
              <div className="font-bold text-foreground">Primary Accent</div>
              <div className="text-muted-foreground select-all text-[9px] font-mono">--primary</div>
              <div className="text-[8px] text-muted-foreground/75 mt-1">Light: oklch(0.205 0 0)<br />Dark: oklch(0.922 0 0)</div>
            </div>
          </div>

          {/* Swatch 4: Secondary */}
          <div className="border border-border p-2 bg-card/60 flex flex-col gap-2">
            <div className="w-full h-12 bg-secondary border border-border flex items-center justify-center text-[10px] font-bold text-secondary-foreground">
              bg-secondary
            </div>
            <div className="text-[10px]">
              <div className="font-bold text-foreground">Secondary</div>
              <div className="text-muted-foreground select-all text-[9px] font-mono">--secondary</div>
              <div className="text-[8px] text-muted-foreground/75 mt-1">Light: oklch(0.88 0 0)<br />Dark: oklch(0.269 0 0)</div>
            </div>
          </div>

          {/* Swatch 5: Muted */}
          <div className="border border-border p-2 bg-card/60 flex flex-col gap-2">
            <div className="w-full h-12 bg-muted border border-border flex items-center justify-center text-[10px] font-bold text-muted-foreground">
              bg-muted
            </div>
            <div className="text-[10px]">
              <div className="font-bold text-foreground">Muted Utility</div>
              <div className="text-muted-foreground select-all text-[9px] font-mono">--muted</div>
              <div className="text-[8px] text-muted-foreground/75 mt-1">Light: oklch(0.88 0 0)<br />Dark: oklch(0.269 0 0)</div>
            </div>
          </div>

          {/* Swatch 6: Accent */}
          <div className="border border-border p-2 bg-card/60 flex flex-col gap-2">
            <div className="w-full h-12 bg-accent border border-border flex items-center justify-center text-[10px] font-bold text-accent-foreground">
              bg-accent
            </div>
            <div className="text-[10px]">
              <div className="font-bold text-foreground">Accent Highlight</div>
              <div className="text-muted-foreground select-all text-[9px] font-mono">--accent</div>
              <div className="text-[8px] text-muted-foreground/75 mt-1">Light: oklch(0.88 0 0)<br />Dark: oklch(0.269 0 0)</div>
            </div>
          </div>

          {/* Swatch 7: Destructive */}
          <div className="border border-border p-2 bg-card/60 flex flex-col gap-2">
            <div className="w-full h-12 bg-destructive border border-border flex items-center justify-center text-[10px] font-bold text-primary-foreground">
              bg-destructive
            </div>
            <div className="text-[10px]">
              <div className="font-bold text-foreground">Destructive State</div>
              <div className="text-muted-foreground select-all text-[9px] font-mono">--destructive</div>
              <div className="text-[8px] text-muted-foreground/75 mt-1">Light: oklch(0.577 0.245 27.325)<br />Dark: oklch(0.704 0.191 22.216)</div>
            </div>
          </div>

          {/* Swatch 8: Border */}
          <div className="border border-border p-2 bg-card/60 flex flex-col gap-2">
            <div className="w-full h-12 border border-border flex items-center justify-center text-[10px] text-muted-foreground">
              border-border
            </div>
            <div className="text-[10px]">
              <div className="font-bold text-foreground">Borders &amp; Dividers</div>
              <div className="text-muted-foreground select-all text-[9px] font-mono">--border</div>
              <div className="text-[8px] text-muted-foreground/75 mt-1">Light: oklch(0.922 0 0)<br />Dark: oklch(1 0 0 / 10%)</div>
            </div>
          </div>

        </div>
      </TuiContainer>
    </div>
  )
}
