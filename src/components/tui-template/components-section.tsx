import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { TuiContainer } from "@/components/ui/tui-container"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  RiSettingsLine,
  RiHistoryLine,
  RiCloseLine,
  RiFolderShieldLine,
  RiCpuLine,
  RiErrorWarningLine,
  RiTv2Line,
  RiTerminalBoxLine,
  
  // Navigation & UI Layout
  RiHome2Line,
  RiArrowRightLine,
  RiArrowLeftLine,
  RiArrowUpLine,
  RiArrowDownLine,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiMenuLine,
  RiRefreshLine,
  
  // Actions & Operations
  RiSearchLine,
  RiAddLine,
  RiSubtractLine,
  RiEditLine,
  RiDeleteBinLine,
  RiSaveLine,
  RiShareLine,
  RiDownloadLine,
  RiUploadLine,
  RiFileCopyLine,
  RiCheckLine,
  
  // Communication & Social
  RiMailLine,
  RiPhoneLine,
  RiMessageLine,
  RiUserLine,
  RiGithubFill,
  RiTwitterFill,
  RiGoogleFill,
  RiNotificationLine,
  
  // Indicators & Overlays
  RiInformationLine,
  RiAlertLine,
  RiCheckboxCircleLine,
  RiHeartLine,
  RiStarLine,
  RiEyeLine,
  RiEyeOffLine,
  RiLockLine,
  RiLockUnlockLine,
  
  // Files, folders & Media
  RiFileTextLine,
  RiFolderLine,
  RiFolderOpenLine,
  RiImageLine,
  RiVideoLine,
  RiVolumeUpLine,
  RiCalendarLine,
} from "@remixicon/react"

export interface LogMessage {
  id: string
  timestamp: string
  type: "ACTION" | "SYSTEM" | "WARN" | "SUCCESS"
  message: string
}

interface IconItem {
  name: string
  component: React.ComponentType<{ className?: string }>
  category: "navigation" | "action" | "communication" | "status" | "file"
  description: string
}

const ICON_LIST: IconItem[] = [
  // Navigation
  { name: "RiHome2Line", component: RiHome2Line, category: "navigation", description: "Home page/dashboard" },
  { name: "RiArrowRightLine", component: RiArrowRightLine, category: "navigation", description: "Forward navigation" },
  { name: "RiArrowLeftLine", component: RiArrowLeftLine, category: "navigation", description: "Back navigation" },
  { name: "RiArrowUpLine", component: RiArrowUpLine, category: "navigation", description: "Upwards transition" },
  { name: "RiArrowDownLine", component: RiArrowDownLine, category: "navigation", description: "Downwards transition" },
  { name: "RiArrowRightSLine", component: RiArrowRightSLine, category: "navigation", description: "Accordion/next" },
  { name: "RiArrowLeftSLine", component: RiArrowLeftSLine, category: "navigation", description: "Accordion/prev" },
  { name: "RiMenuLine", component: RiMenuLine, category: "navigation", description: "Sidebar/menu toggle" },
  { name: "RiRefreshLine", component: RiRefreshLine, category: "navigation", description: "Reload/reset state" },

  // Actions
  { name: "RiSearchLine", component: RiSearchLine, category: "action", description: "Filter or search inputs" },
  { name: "RiAddLine", component: RiAddLine, category: "action", description: "Create/add item" },
  { name: "RiSubtractLine", component: RiSubtractLine, category: "action", description: "Decrease/remove" },
  { name: "RiEditLine", component: RiEditLine, category: "action", description: "Modify existing data" },
  { name: "RiDeleteBinLine", component: RiDeleteBinLine, category: "action", description: "Delete/destroy" },
  { name: "RiSaveLine", component: RiSaveLine, category: "action", description: "Commit changes" },
  { name: "RiShareLine", component: RiShareLine, category: "action", description: "Export/share content" },
  { name: "RiDownloadLine", component: RiDownloadLine, category: "action", description: "Fetch files/data" },
  { name: "RiUploadLine", component: RiUploadLine, category: "action", description: "Send files/data" },
  { name: "RiFileCopyLine", component: RiFileCopyLine, category: "action", description: "Copy to clipboard" },
  { name: "RiCheckLine", component: RiCheckLine, category: "action", description: "Confirm/success" },

  // Communication & Social
  { name: "RiMailLine", component: RiMailLine, category: "communication", description: "Email/inbox" },
  { name: "RiPhoneLine", component: RiPhoneLine, category: "communication", description: "Voice call/dial" },
  { name: "RiMessageLine", component: RiMessageLine, category: "communication", description: "Chat/instant message" },
  { name: "RiUserLine", component: RiUserLine, category: "communication", description: "User profile/identity" },
  { name: "RiGithubFill", component: RiGithubFill, category: "communication", description: "Github social link" },
  { name: "RiTwitterFill", component: RiTwitterFill, category: "communication", description: "Twitter social link" },
  { name: "RiGoogleFill", component: RiGoogleFill, category: "communication", description: "Google authentication" },
  { name: "RiNotificationLine", component: RiNotificationLine, category: "communication", description: "Alert bell" },

  // Status & System
  { name: "RiInformationLine", component: RiInformationLine, category: "status", description: "Info tooltip" },
  { name: "RiAlertLine", component: RiAlertLine, category: "status", description: "Warning status banner" },
  { name: "RiCheckboxCircleLine", component: RiCheckboxCircleLine, category: "status", description: "Verified status check" },
  { name: "RiHeartLine", component: RiHeartLine, category: "status", description: "Favorite/like" },
  { name: "RiStarLine", component: RiStarLine, category: "status", description: "Rating/star indicator" },
  { name: "RiEyeLine", component: RiEyeLine, category: "status", description: "Show password/view" },
  { name: "RiEyeOffLine", component: RiEyeOffLine, category: "status", description: "Hide password/private" },
  { name: "RiLockLine", component: RiLockLine, category: "status", description: "Encrypted/secured" },
  { name: "RiLockUnlockLine", component: RiLockUnlockLine, category: "status", description: "Decrypted/public" },

  // Files & Folders
  { name: "RiFileTextLine", component: RiFileTextLine, category: "file", description: "Document/text file" },
  { name: "RiFolderLine", component: RiFolderLine, category: "file", description: "Directory path container" },
  { name: "RiFolderOpenLine", component: RiFolderOpenLine, category: "file", description: "Expanded directory node" },
  { name: "RiImageLine", component: RiImageLine, category: "file", description: "Media/graphics asset" },
  { name: "RiVideoLine", component: RiVideoLine, category: "file", description: "Motion video asset" },
  { name: "RiVolumeUpLine", component: RiVolumeUpLine, category: "file", description: "Audio volume/speaker" },
  { name: "RiCalendarLine", component: RiCalendarLine, category: "file", description: "Date/scheduler indicator" },
]

interface ComponentsSectionProps {
  logs: LogMessage[]
  clickCount: number
  setClickCount: React.Dispatch<React.SetStateAction<number>>
  addLog: (message: string, type?: LogMessage["type"]) => void
  handleClearLogs: () => void
}

export function ComponentsSection({
  logs,
  clickCount,
  setClickCount,
  addLog,
  handleClearLogs,
}: ComponentsSectionProps) {
  // Form State
  const [formName, setFormName] = useState("")
  const [formRole, setFormRole] = useState("")
  const [formAccess, setFormAccess] = useState("developer")
  const [formStatus, setFormStatus] = useState("active")

  // Custom retro input states
  const [toggleOn, setToggleOn] = useState(true)
  const [checkbox1, setCheckbox1] = useState(true)
  const [checkbox2, setCheckbox2] = useState(false)
  const [selectedRadio, setSelectedRadio] = useState("alpha")

  // Icon Library Explorer state
  const [iconSearch, setIconSearch] = useState("")
  const [iconCategory, setIconCategory] = useState<string>("all")
  const [iconSize, setIconSize] = useState<"sm" | "md" | "lg" | "xl">("md")
  const [iconColor, setIconColor] = useState<"default" | "primary" | "emerald" | "rose" | "amber" | "blue">("default")
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copyToClipboard = (text: string, iconName: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedText(iconName)
        addLog(`Copied import statement: import { ${iconName} } from "@remixicon/react"`, "SUCCESS")
        setTimeout(() => setCopiedText(null), 2000)
      },
      () => {
        addLog(`Failed to copy ${iconName} statement.`, "WARN")
      }
    )
  }

  // Filtered icons computation
  const filteredIcons = ICON_LIST.filter((icon) => {
    const matchesSearch = icon.name.toLowerCase().includes(iconSearch.toLowerCase()) || 
      icon.description.toLowerCase().includes(iconSearch.toLowerCase())
    const matchesCategory = iconCategory === "all" || icon.category === iconCategory
    return matchesSearch && matchesCategory
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName) {
      addLog("Form submission aborted: name field is required.", "WARN")
      return
    }
    addLog(
      `REGISTERED NEW AGENT: ${formName.toUpperCase()} [Role: ${formRole || "N/A"}, Access: ${formAccess.toUpperCase()}, Status: ${formStatus.toUpperCase()}]`,
      "SUCCESS"
    )
    setFormName("")
    setFormRole("")
  }

  return (
    <div className="space-y-4 outline-none">
      
      {/* PANEL 03: BUTTONS & INTERACTIVE INPUTS */}
      <TuiContainer
        label="03_CONTROLS"
        badge={<Badge variant="outline" className="text-[10px] rounded-none py-0 h-4 leading-none">CVA + INPUTS</Badge>}
      >
        <div className="text-xs text-muted-foreground mb-4">
          Button System &amp; Custom Input Widgets &mdash; Tactical trigger systems and custom brutalist inputs.
        </div>
        
        <div className="flex flex-col gap-6">
          
          {/* Buttons */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground mb-3 tracking-wider uppercase">
              &gt;_ Button Variants &amp; Sizes
            </h3>
            <div className="flex flex-wrap gap-2.5 items-end">
              <Button onClick={() => { setClickCount(c => c + 1); addLog(`Clicked Default variant (clicks: ${clickCount + 1})`) }}>
                Default Button
              </Button>
              <Button variant="secondary" onClick={() => addLog("Clicked Secondary variant")}>
                Secondary
              </Button>
              <Button variant="outline" onClick={() => addLog("Clicked Outline variant")}>
                Outline
              </Button>
              <Button variant="ghost" onClick={() => addLog("Clicked Ghost variant")}>
                Ghost
              </Button>
              <Button variant="destructive" onClick={() => addLog("Triggered Destructive button!", "WARN")}>
                Destructive
              </Button>
              <Button size="sm" onClick={() => addLog("Size: Small (sm)")}>
                Size SM
              </Button>
              <Button size="xs" onClick={() => addLog("Size: Extra Small (xs)")}>
                Size XS
              </Button>
            </div>
          </div>

          {/* Custom Brutalist Input Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-dashed border-border/80 pt-4">
            
            {/* Custom Toggle Switch */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase block">
                &gt;_ Brutalist Switch
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={cn(
                    "w-11 h-6 border flex items-center p-0.5 rounded-none cursor-pointer transition-colors duration-200",
                    toggleOn ? "bg-primary border-primary justify-end" : "bg-muted border-border/60 justify-start"
                  )}
                  onClick={() => {
                    setToggleOn(!toggleOn)
                    addLog(`Toggle Switch flipped: ${!toggleOn ? "ON" : "OFF"}`)
                  }}
                >
                  <span className={cn(
                    "size-4 bg-background border transition-transform duration-200",
                    toggleOn ? "border-primary-foreground" : "border-border"
                  )}></span>
                </button>
                <span className="text-[11px] font-bold uppercase tracking-wide">
                  {toggleOn ? "ON" : "OFF"}
                </span>
              </div>
            </div>

            {/* Custom Retro Checkboxes */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase block">
                &gt;_ Retro Checkboxes
              </span>
              <div className="space-y-2">
                <button
                  type="button"
                  className="flex items-center gap-2 text-xs font-semibold text-foreground/90 select-none cursor-pointer"
                  onClick={() => {
                    setCheckbox1(!checkbox1)
                    addLog(`Checkbox 01 changed: ${!checkbox1}`)
                  }}
                >
                  <div className={cn(
                    "size-4 border border-foreground bg-background flex items-center justify-center shrink-0 transition-colors duration-150 rounded-none",
                    checkbox1 ? "bg-foreground text-background" : "border-foreground/60"
                  )}>
                    {checkbox1 && (
                      <svg className="size-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px] tracking-wide uppercase">Secure Mode SSL</span>
                </button>
                
                <button
                  type="button"
                  className="flex items-center gap-2 text-xs font-semibold text-foreground/90 select-none cursor-pointer"
                  onClick={() => {
                    setCheckbox2(!checkbox2)
                    addLog(`Checkbox 02 changed: ${!checkbox2}`)
                  }}
                >
                  <div className={cn(
                    "size-4 border border-foreground bg-background flex items-center justify-center shrink-0 transition-colors duration-150 rounded-none",
                    checkbox2 ? "bg-foreground text-background" : "border-foreground/60"
                  )}>
                    {checkbox2 && (
                      <svg className="size-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-[11px] tracking-wide uppercase">Allow Remote Sync</span>
                </button>
              </div>
            </div>

            {/* Custom Retro Radio Groups */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase block">
                &gt;_ Retro Radio Group
              </span>
              <div className="flex flex-col gap-2">
                {["alpha", "beta", "gamma"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className="flex items-center gap-2 text-xs font-semibold text-foreground/90 select-none cursor-pointer uppercase"
                    onClick={() => {
                      setSelectedRadio(opt)
                      addLog(`Radio Group selected: ${opt.toUpperCase()}`)
                    }}
                  >
                    <div className={cn(
                      "size-4 border border-foreground bg-background flex items-center justify-center shrink-0 transition-colors duration-150 rounded-none",
                      selectedRadio === opt ? "border-foreground" : "border-foreground/60"
                    )}>
                      {selectedRadio === opt && (
                        <div className="size-2 bg-foreground rounded-none"></div>
                      )}
                    </div>
                    <span className="text-[11px] tracking-wide uppercase">Node_{opt}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Specialized states */}
          <div className="flex flex-wrap items-center gap-2.5 border-t border-dashed border-border/80 pt-4">
            <Button size="icon" onClick={() => addLog("Clicked Icon button (Default)")} title="Open Settings">
              <RiSettingsLine className="size-4" />
            </Button>
            <Button size="icon-sm" variant="outline" onClick={() => addLog("Clicked Icon button (Small)")} title="View Log History">
              <RiHistoryLine className="size-3.5" />
            </Button>
            <Button size="icon-xs" variant="destructive" onClick={() => addLog("Clicked Icon button (Extra Small)", "WARN")} title="Reset Terminal">
              <RiCloseLine className="size-3" />
            </Button>
            <Button disabled>
              Disabled State
            </Button>
            <Button variant="outline" className="gap-2">
              <span className="size-2 bg-emerald-500 rounded-full animate-ping"></span>
              Connection Live
            </Button>
          </div>

        </div>
      </TuiContainer>

      {/* PANEL 04: FORM CONTROLS */}
      <TuiContainer label="04_FIELDS">
        <div className="text-xs text-muted-foreground mb-4">
          Terminal Form Elements &mdash; Inputs, selectors, labels, and textareas aligned to the brutalist aesthetic.
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Name Input */}
            <div className="space-y-1.5">
              <Label htmlFor="agent-name" className="text-xs font-bold text-foreground">
                Agent Codename
              </Label>
              <Input
                id="agent-name"
                placeholder="e.g. GIBSON_DECKER"
                value={formName}
                onChange={(e) => {
                  setFormName(e.target.value)
                  addLog(`Input 'Agent Codename' changed: ${e.target.value}`)
                }}
              />
            </div>

            {/* Role Input */}
            <div className="space-y-1.5">
              <Label htmlFor="agent-role" className="text-xs font-bold text-foreground">
                Agent Role Designation
              </Label>
              <Input
                id="agent-role"
                placeholder="e.g. Systems Architect"
                value={formRole}
                onChange={(e) => {
                  setFormRole(e.target.value)
                  addLog(`Input 'Agent Role' changed: ${e.target.value}`)
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Select Access Level */}
            <div className="space-y-1.5">
              <Label htmlFor="access-level" className="text-xs font-bold text-foreground">
                Clearance Access Level
              </Label>
              <Select
                value={formAccess}
                onValueChange={(val) => {
                  setFormAccess(val)
                  addLog(`Select 'Clearance Access' set to: ${val.toUpperCase()}`)
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Clearance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guest">Level 01_GUEST</SelectItem>
                  <SelectItem value="developer">Level 02_DEVELOPER</SelectItem>
                  <SelectItem value="admin">Level 03_ADMIN</SelectItem>
                  <SelectItem value="root">Level 04_ROOT_SYS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Select Status */}
            <div className="space-y-1.5">
              <Label htmlFor="agent-status" className="text-xs font-bold text-foreground">
                Operational Status
              </Label>
              <Select
                value={formStatus}
                onValueChange={(val) => {
                  setFormStatus(val)
                  addLog(`Select 'Operational Status' set to: ${val.toUpperCase()}`)
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">ACTIVE [RUNNING]</SelectItem>
                  <SelectItem value="suspended">SUSPENDED [LOCKED]</SelectItem>
                  <SelectItem value="offline">OFFLINE [STANDBY]</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Textarea description */}
          <div className="space-y-1.5">
            <Label htmlFor="manifesto" className="text-xs font-bold text-foreground">
              Access Manifesto / Node Notes
            </Label>
            <Textarea
              id="manifesto"
              placeholder="Input system notes or cryptographic verification details here..."
              rows={3}
              onChange={(e) => addLog(`Textarea text edited: ${e.target.value.length} characters`)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => {
              setFormName("")
              setFormRole("")
              addLog("Form fields reset by operator.")
            }}>
              Reset Form
            </Button>
            <Button type="submit">
              Register Node
            </Button>
          </div>
        </form>
      </TuiContainer>

      {/* PANEL 03: INTERACTIVE TABS */}
      <TuiContainer label="03_NAVIGATION">
        <div className="text-xs text-muted-foreground mb-4">
          Tabs Navigation Showcase &mdash; Tab lists featuring clean alignment, active borders, and responsive scaling.
        </div>
        <Tabs defaultValue="system-spec" className="w-full" onValueChange={(val) => addLog(`Tab switched to: ${val.toUpperCase()}`, "SYSTEM")}>
          <TabsList className="w-full border-b mb-4 flex">
            <TabsTrigger value="system-spec" className="flex-1">01_SPECIFICATIONS</TabsTrigger>
            <TabsTrigger value="env-vars" className="flex-1">02_ENVIRONMENT</TabsTrigger>
            <TabsTrigger value="registry" className="flex-1">03_REGISTRY</TabsTrigger>
          </TabsList>
          
          {/* System specifications Tab */}
          <TabsContent value="system-spec" className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs bg-muted/40 p-3 border border-border">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase">OS_PLATFORM</span>
                <span className="font-bold">RetroArch-v4.0</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase">TUI_ENGINE</span>
                <span className="font-bold">Vite 8.0 / React 19</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase">PRESET_ID</span>
                <span className="font-bold text-primary">buG04wd</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase">GRID_SHAPE</span>
                <span className="font-bold">Sharp/Rect [R:0]</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every component inherits the custom CSS variables specified inside <code className="text-foreground border px-1 bg-muted">index.css</code>. 
              The colors conform to the modern high-end OKLCH color space supporting accurate lightness and saturation curves.
            </p>
          </TabsContent>
          
          {/* Env vars Tab */}
          <TabsContent value="env-vars" className="space-y-2">
            <div className="font-mono text-xs p-3 bg-card border border-border rounded-none space-y-1.5 text-muted-foreground">
              <div className="flex justify-between border-b border-dashed border-border/80 pb-1">
                <span className="text-foreground">TEMPLATE_TUI_SECURE_MODE</span>
                <span className="text-emerald-500 font-bold">TRUE</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-border/80 pb-1">
                <span className="text-foreground">TEMPLATE_TUI_ROOT_SHELL</span>
                <span className="text-primary font-bold">/bin/sh</span>
              </div>
              <div className="flex justify-between border-b border-dashed border-border/80 pb-1">
                <span className="text-foreground">TEMPLATE_TUI_REMOTE_SYNC</span>
                <span className="text-rose-500 font-bold">FALSE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground">TEMPLATE_TUI_THEME_ID</span>
                <span className="font-bold">buG04wd_theme_oklch</span>
              </div>
            </div>
          </TabsContent>

          {/* Registry Tab */}
          <TabsContent value="registry" className="space-y-3">
            <div className="text-xs space-y-2">
              <div className="p-2 border border-border bg-card flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RiFolderShieldLine className="size-4 text-primary" />
                  <span>Component Library Mounted</span>
                </div>
                <Badge variant="outline" className="border-emerald-500 text-emerald-500">RESOLVED</Badge>
              </div>
              <div className="p-2 border border-border bg-card flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RiCpuLine className="size-4 text-primary" />
                  <span>Radix Primitives Initialized</span>
                </div>
                <Badge variant="outline" className="border-emerald-500 text-emerald-500">MOUNTED</Badge>
              </div>
              <div className="p-2 border border-border bg-card flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RiSettingsLine className="size-4 text-primary" />
                  <span>Tailwind v4 PostCSS Engine</span>
                </div>
                <Badge variant="outline" className="border-emerald-500 text-emerald-500">COMPILED</Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </TuiContainer>

      {/* PANEL 05: OVERLAYS */}
      <TuiContainer label="05_OVERLAYS">
        <div className="text-xs text-muted-foreground mb-4">
          Dialog &amp; Drawer Panel Overlays &mdash; Full overlays featuring glassmorphic layers, custom trigger boundaries, and smooth animation hooks.
        </div>
        <div className="flex flex-wrap gap-3">

          {/* Dialog Trigger */}
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => addLog("Opened confirmation Dialog.", "SYSTEM")}>
                Open Core Dialog
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-primary/50 rounded-none">
              <DialogHeader>
                <DialogTitle className="uppercase text-xs font-bold tracking-wider text-primary flex items-center gap-1.5">
                  <RiErrorWarningLine className="size-4 text-rose-500 animate-pulse translate-y-[-0.5px] shrink-0" />
                  SYS_ALERT: SYSTEM REBOOT REQUESTED
                </DialogTitle>
                <DialogDescription className="text-xs pt-1">
                  You are initiating a simulated nuclear core reset of the `template-tui` server stack. 
                  This action will reset virtual memory addresses and flash all cached session states.
                </DialogDescription>
              </DialogHeader>
              <div className="font-mono text-[10px] bg-muted/60 p-2.5 border text-muted-foreground space-y-1 rounded-none">
                <div>LOC_ADDR: 0x8F92_77AA_10FF</div>
                <div>TARGET_SYS: SECURE_HOST_CORE</div>
                <div>HASH_SIGN: SHA256_F9238ACD99BEEF</div>
              </div>
              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => addLog("Reset cancelled by operator.")}>Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="destructive" onClick={() => addLog("EXECUTED PROTOCOL: COLD BOOT RE-SYS INITIATED!", "WARN")}>
                    Confirm Cold Boot
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Sheet Drawer Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" onClick={() => addLog("Opened slide-out Console Logs Sheet.", "SYSTEM")}>
                Open Logs Drawer
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md border-l-2 border-primary/50 rounded-none">
              <SheetHeader>
                <SheetTitle className="uppercase text-xs font-bold tracking-wider text-primary flex items-center gap-1.5">
                  <RiTv2Line className="size-4 text-primary translate-y-[-0.5px] shrink-0" />
                  Console Log Stream Viewer
                </SheetTitle>
                <SheetDescription className="text-xs">
                  Review raw, non-volatile state history stored in the browser's volatile storage interface.
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 border border-border bg-card p-3 space-y-3 font-mono text-xs flex-1 h-[calc(100vh-180px)] overflow-y-auto rounded-none">
                <div className="text-[10px] text-muted-foreground flex justify-between items-center border-b pb-1">
                  <span>NODE: SYSTEM_LOGS [COUNT: {logs.length}]</span>
                  <Button variant="ghost" size="xs" onClick={handleClearLogs} className="h-4 px-1.5 text-[9px] text-muted-foreground hover:text-foreground border border-border rounded-none">
                    [WIPE_LOGS]
                  </Button>
                </div>
                <div className="space-y-2">
                  {logs.map((log) => (
                     <div key={log.id} className="border-b border-dashed border-border/50 pb-1.5 text-[11px]">
                      <div className="flex justify-between items-center text-[9px] text-muted-foreground">
                        <span>[{log.timestamp}]</span>
                        <span className={`font-bold ${
                          log.type === "WARN" ? "text-rose-500" :
                          log.type === "SUCCESS" ? "text-emerald-500" :
                          log.type === "SYSTEM" ? "text-blue-500" :
                          "text-muted-foreground"
                        }`}>{log.type}</span>
                      </div>
                      <div className="text-foreground mt-0.5 break-all">{log.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Dropdown Menu Trigger */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" onClick={() => addLog("Opened dropdown options menu.")}>
                Interactive Dropdown
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 rounded-none">
              <DropdownMenuLabel className="text-[10px] text-muted-foreground uppercase">Console Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => addLog("Dropdown Menu: Selected 'Force Garbage Collection'")}>
                <span>Force Garbage Collect</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                addLog("Dropdown Menu: Selected 'Trigger System Ping'", "SYSTEM")
                addLog("PONG: Latency normal.", "SUCCESS")
              }}>
                <span>Verify Node PING</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-rose-500 font-bold" onClick={() => {
                addLog("Dropdown Menu: Selected 'Erase Logs'", "WARN")
                handleClearLogs()
              }}>
                <span>Wipe Terminal Output</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tooltip trigger */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="border border-dashed hover:border-solid border-border/80">
                Hover Tooltip
              </Button>
            </TooltipTrigger>
            <TooltipContent label="NODE_INFO">
              <p className="text-[10px] font-mono">Tooltips are fully optimized for keyboard focuses &amp; high accessibility.</p>
            </TooltipContent>
          </Tooltip>

        </div>
      </TuiContainer>

      {/* PANEL 06: CARDS SHOWCASE */}
      <TuiContainer label="06_CARDS">
        <div className="text-xs text-muted-foreground mb-4">
          Layout Cards &mdash; Pre-configured rectangular panel systems for structured dashboard nodes.
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 01: Host Specs */}
          <Card className="border border-border rounded-none shadow-none bg-card/45">
            <CardHeader className="border-b border-border/50 pb-3">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <RiTerminalBoxLine className="size-4 translate-y-[-0.5px] shrink-0" /> HOST_RESOURCES_01
              </CardTitle>
              <CardDescription className="text-[10px]">
                Raw virtual hardware properties for static matrix host.
              </CardDescription>
            </CardHeader>
            <CardContent className="py-3 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">HOST_ID:</span>
                <span className="font-bold select-all">matrix-node-alpha-44a</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">BANDWIDTH:</span>
                <span className="font-bold text-emerald-500">1.2 Gbps [SECURE]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">SSL_CRT:</span>
                <span className="font-bold text-primary">SHA-384_VERIFIED</span>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 py-2.5 flex justify-end gap-2 bg-muted/20">
              <Button variant="outline" size="xs" onClick={() => addLog("Card Action: Checked host keys")}>Check Keys</Button>
              <Button size="xs" onClick={() => addLog("Card Action: Synced resource nodes")}>Sync Node</Button>
            </CardFooter>
          </Card>

          {/* Card 02: Network Profile */}
          <Card className="border border-border rounded-none shadow-none bg-card/45">
            <CardHeader className="border-b border-border/50 pb-3">
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <RiFolderShieldLine className="size-4 translate-y-[-0.5px] shrink-0" /> SECURITY_PROFILE
              </CardTitle>
              <CardDescription className="text-[10px]">
                Clearance logs and security posture configurations.
              </CardDescription>
            </CardHeader>
            <CardContent className="py-3 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">FIREWALL:</span>
                <span className="font-bold text-emerald-500">SHIELD_UP [100%]</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">INTRUSIONS:</span>
                <span className="font-bold">0 DETECTED</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">LAST_SCAN:</span>
                <span className="font-bold">30s AGO [AUTO]</span>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 py-2.5 flex justify-end gap-2 bg-muted/20">
              <Button variant="destructive" size="xs" onClick={() => addLog("Card Action: Hard reset firewall!", "WARN")}>Lock Firewall</Button>
            </CardFooter>
          </Card>

        </div>
      </TuiContainer>

      {/* PANEL 07: META INDICATORS */}
      <TuiContainer label="07_META_INDICATORS">
        <div className="text-xs text-muted-foreground mb-4">
          Indicators &amp; Badges &mdash; Status lights, avatars, skeleton layers, and separators.
        </div>
        <div className="flex flex-col gap-4">
          
          {/* Badges system */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground mb-2.5 tracking-wider uppercase">
              &gt;_ Badge Variants
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <Badge onClick={() => addLog("Selected Default Badge")}>Default</Badge>
              <Badge variant="secondary" onClick={() => addLog("Selected Secondary Badge")}>Secondary</Badge>
              <Badge variant="outline" onClick={() => addLog("Selected Outline Badge")}>Outline</Badge>
              <Badge variant="destructive" onClick={() => addLog("Selected Destructive Badge", "WARN")}>Destructive</Badge>
            </div>
          </div>

          <Separator />

          {/* Avatar systems */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground mb-2.5 tracking-wider uppercase">
              &gt;_ User Node Profiles (Avatars)
            </h3>
            <div className="flex items-center gap-3">
              <Avatar className="size-8" onClick={() => addLog("Inspected avatar node: DA (Direct Link)")}>
                <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Agent Alpha" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
              
              <Avatar className="size-8 border border-primary" onClick={() => addLog("Inspected avatar node: DS (Fallbacks)")}>
                <AvatarImage src="https://broken-image-link-test.png" />
                <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs">OP</AvatarFallback>
              </Avatar>
              
              <div className="text-xs">
                <div className="font-bold">Operator Node [OP_01]</div>
                <div className="text-[10px] text-muted-foreground uppercase">Clearance level ROOT</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Skeletons/Loaders */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground mb-2.5 tracking-wider uppercase">
              &gt;_ Async Loader (Skeleton)
            </h3>
            <div className="space-y-2 p-2.5 border border-dashed border-border/80">
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-5/6" />
            </div>
          </div>
        </div>
      </TuiContainer>

      {/* PANEL 08: TACTICAL_ICONS */}
      <TuiContainer
        label="08_TACTICAL_ICONS"
        badge={<Badge variant="outline" className="text-[10px] rounded-none py-0 h-4 leading-none">REMIXICON EXPLORER</Badge>}
      >
        <div className="text-xs text-muted-foreground mb-4">
          Tactical Icon Library Explorer &mdash; Frequently used icons categorized, searchable, with interactive scaling, theme colors, and copyable click triggers.
        </div>

        <div className="flex flex-col gap-4">
          {/* CONTROL BAR */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between bg-muted/30 p-3 border border-border">
            {/* Search Input */}
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                &gt;_ Search
              </span>
              <div className="relative w-full">
                <Input
                  placeholder="Filter icons..."
                  value={iconSearch}
                  onChange={(e) => {
                    setIconSearch(e.target.value)
                    addLog(`Icon search query updated: ${e.target.value}`)
                  }}
                  className="pl-7 h-8 text-xs font-mono"
                />
                <RiSearchLine className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              </div>
            </div>

            {/* Adjustments: Size & Color */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              {/* Size Select */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Size</span>
                <div className="flex border border-border">
                  {(["sm", "md", "lg", "xl"] as const).map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => {
                        setIconSize(sz)
                        addLog(`Icon Explorer: size adjusted to ${sz.toUpperCase()}`)
                      }}
                      className={cn(
                        "px-2 py-0.5 border-r last:border-r-0 border-border uppercase text-[10px] font-bold hover:bg-muted transition-colors cursor-pointer",
                        iconSize === sz ? "bg-primary text-primary-foreground hover:bg-primary/95" : "bg-card text-foreground"
                      )}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Select */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Color</span>
                <div className="flex border border-border">
                  {(["default", "primary", "emerald", "rose", "amber", "blue"] as const).map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => {
                        setIconColor(col)
                        addLog(`Icon Explorer: color adjusted to ${col.toUpperCase()}`)
                      }}
                      className={cn(
                        "px-2 py-0.5 border-r last:border-r-0 border-border uppercase text-[10px] font-bold hover:bg-muted transition-colors cursor-pointer",
                        iconColor === col ? "bg-primary text-primary-foreground hover:bg-primary/95" : "bg-card text-foreground"
                      )}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-1.5 border-b border-dashed border-border/80 pb-3">
            {(["all", "navigation", "action", "communication", "status", "file"] as const).map((cat) => {
              const count = cat === "all" 
                ? ICON_LIST.length 
                : ICON_LIST.filter(i => i.category === cat).length
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setIconCategory(cat)
                    addLog(`Icon Explorer: category switched to ${cat.toUpperCase()}`)
                  }}
                  className={cn(
                    "px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border transition-all cursor-pointer rounded-none",
                    iconCategory === cat
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-foreground/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat} ({count})
                </button>
              )
            })}
          </div>

          {/* DYNAMIC INFORMATION BAR */}
          {copiedText && (
            <div className="bg-emerald-500/10 border border-emerald-500/50 p-2 text-xs font-mono text-emerald-500 flex items-center gap-2 animate-fadeIn rounded-none">
              <RiCheckboxCircleLine className="size-4 shrink-0" />
              <span>COPIED IMPORT: <code className="font-bold underline text-emerald-400">import &#123; {copiedText} &#125; from "@remixicon/react"</code> to clipboard!</span>
            </div>
          )}

          {/* ICON GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {filteredIcons.length > 0 ? (
              filteredIcons.map((icon) => {
                const IconComponent = icon.component
                const isCopied = copiedText === icon.name
                
                // Dynamic size class
                const sizeClass = 
                  iconSize === "sm" ? "size-3.5" :
                  iconSize === "md" ? "size-5" :
                  iconSize === "lg" ? "size-7" : "size-10"

                // Dynamic color class
                const colorClass = 
                  iconColor === "default" ? "text-foreground" :
                  iconColor === "primary" ? "text-primary" :
                  iconColor === "emerald" ? "text-emerald-500" :
                  iconColor === "rose" ? "text-rose-500" :
                  iconColor === "amber" ? "text-amber-500" : "text-blue-500"

                return (
                  <button
                    key={icon.name}
                    type="button"
                    title={`Click to copy: import { ${icon.name} } from "@remixicon/react"`}
                    onClick={() => copyToClipboard(`import { ${icon.name} } from "@remixicon/react"`, icon.name)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 border rounded-none bg-card/45 hover:bg-card hover:border-primary/80 transition-all group/icon cursor-pointer select-none text-center h-28 relative overflow-hidden",
                      isCopied ? "border-emerald-500/80 bg-emerald-500/5" : "border-border"
                    )}
                  >
                    {/* Copy Indicator */}
                    <div className={cn(
                      "absolute top-1 right-1 transition-opacity duration-200",
                      isCopied ? "opacity-100" : "opacity-0 group-hover/icon:opacity-40"
                    )}>
                      {isCopied ? (
                        <RiCheckLine className="size-3 text-emerald-500 font-bold" />
                      ) : (
                        <RiFileCopyLine className="size-3 text-muted-foreground" />
                      )}
                    </div>

                    {/* Icon render container */}
                    <div className="flex-1 flex items-center justify-center">
                      <IconComponent className={cn("transition-transform duration-300 group-hover/icon:scale-110", sizeClass, colorClass)} />
                    </div>

                    {/* Meta info */}
                    <div className="w-full mt-2">
                      <div className="font-mono text-[10px] font-bold truncate group-hover/icon:text-primary transition-colors">
                        {icon.name}
                      </div>
                      <div className="text-[8px] text-muted-foreground line-clamp-1 mt-0.5 leading-none">
                        {icon.description}
                      </div>
                    </div>
                  </button>
                )
              })
            ) : (
              <div className="col-span-full border border-dashed border-border p-8 text-center text-xs text-muted-foreground font-mono">
                [NO ICONS FOUND MATCHING SEARCH FILTERS]
              </div>
            )}
          </div>
        </div>
      </TuiContainer>
    </div>
  )
}
