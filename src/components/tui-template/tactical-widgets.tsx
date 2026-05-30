import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { TuiContainer } from "@/components/ui/tui-container"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  RiAddLine,
  RiDeleteBinLine,
  RiUserAddLine,
  RiFileCopyLine,
  RiSettingsLine,
  RiLockLine,
  RiLockUnlockLine,
  RiSearchLine,
  RiWalletLine,
  RiArrowRightLine,
  RiCheckDoubleLine,
  RiDownload2Line,
  RiSecurePaymentLine,
  RiSunLine,
  RiThermometerLine,
  RiVolumeUpLine,
  RiTimerLine,
} from "@remixicon/react"

// --- 0. REUSABLE BRUTALIST SLIDER ---
interface BrutalistSliderProps {
  value: number
  min: number
  max: number
  onChange: (val: number) => void
  disabled?: boolean
  className?: string
}

export function BrutalistSlider({ value, min, max, onChange, disabled = false, className }: BrutalistSliderProps) {
  const percentage = useMemo(() => {
    return ((value - min) / (max - min)) * 100
  }, [value, min, max])

  // Custom linear-gradient track styling:
  // Active part is crisp light-gray/white (#e4e4e7), inactive is dark gray (#27272a)
  const trackStyle = {
    background: `linear-gradient(to right, #e4e4e7 0%, #e4e4e7 ${percentage}%, #27272a ${percentage}%, #27272a 100%)`
  }

  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      disabled={disabled}
      style={trackStyle}
      className={cn(
        "w-full appearance-none h-3 cursor-pointer rounded-none outline-none focus:outline-none transition-all",
        "[&::-webkit-slider-runnable-track]:appearance-none [&::-webkit-slider-runnable-track]:bg-transparent",
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:mt-[-4px]",
        "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    />
  )
}

interface LogMessage {
  id: string
  timestamp: string
  type: "ACTION" | "SYSTEM" | "WARN" | "SUCCESS"
  message: string
}

interface TacticalWidgetsProps {
  addLog: (message: string, type?: LogMessage["type"]) => void
}

export function TacticalWidgets({ addLog }: TacticalWidgetsProps) {
  // --- 1. ENV VARIABLES STATE ---
  const [envVars, setEnvVars] = useState([
    { key: "DATABASE_URL", val: "postgresql://postgres:root@localhost:5432/sys", isSecret: false },
    { key: "NEXT_PUBLIC_API", val: "https://api.vrl.mx/v1", isSecret: false },
    { key: "STRIPE_SECRET", val: "sk_live_51Nv2x900buG04wd", isSecret: true },
  ])
  const [newKey, setNewKey] = useState("")
  const [newVal, setNewVal] = useState("")
  const [isSecretInput, setIsSecretInput] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)

  const handleAddEnv = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKey) return
    const formattedKey = newKey.toUpperCase().replace(/\s+/g, "_")
    setEnvVars((prev) => [...prev, { key: formattedKey, val: newVal, isSecret: isSecretInput }])
    addLog(`ENV: Registered new variable [${formattedKey}]`, "SUCCESS")
    setNewKey("")
    setNewVal("")
    setIsSecretInput(false)
  }

  const handleDeleteEnv = (keyToDelete: string) => {
    setEnvVars((prev) => prev.filter((item) => item.key !== keyToDelete))
    addLog(`ENV: Deleted variable [${keyToDelete}]`, "WARN")
  }

  const handleRedeploy = () => {
    setIsDeploying(true)
    addLog("BUILD: Deploy triggered. Gathering environment matrices...", "SYSTEM")
    setTimeout(() => {
      addLog("BUILD: Containerizing micro-services... [1/2]", "SYSTEM")
    }, 500)
    setTimeout(() => {
      addLog("BUILD: Injecting custom preset 'buG04wd' configurations...", "SYSTEM")
    }, 1000)
    setTimeout(() => {
      setIsDeploying(false)
      addLog("BUILD: Environment redeployed successfully. Pod online.", "SUCCESS")
    }, 1600)
  }

  // --- 2. TEAM HUB STATE ---
  const [teamMembers, setTeamMembers] = useState([
    { email: "clara@example.com", role: "Editor", avatar: "AA" },
    { email: "tom@example.com", role: "Viewer", avatar: "TM" },
  ])
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Viewer")

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail || !inviteEmail.includes("@")) {
      addLog("TEAM: Invalid email designation provided.", "WARN")
      return
    }
    const initials = inviteEmail.split("@")[0].substring(0, 2).toUpperCase()
    setTeamMembers((prev) => [...prev, { email: inviteEmail, role: inviteRole, avatar: initials }])
    addLog(`TEAM: Member invitation dispatched to ${inviteEmail} as [${inviteRole}]`, "SUCCESS")
    setInviteEmail("")
  }

  const handleCopyLink = () => {
    const inviteLink = `https://vrl.mx/reInv?code=buG04wd_${Math.random().toString(36).substring(2, 8)}`
    navigator.clipboard.writeText(inviteLink)
    addLog("TEAM: Secure workspace invite link copied to clipboard.", "ACTION")
  }

  // --- 3. VERCEL AGENT / CAPABILITIES ---
  const [vercelAgentChecked, setVercelAgentChecked] = useState([true, true, false])
  const activeAgentCount = useMemo(() => vercelAgentChecked.filter(Boolean).length, [vercelAgentChecked])

  const toggleAgentItem = (index: number) => {
    const next = [...vercelAgentChecked]
    next[index] = !next[index]
    setVercelAgentChecked(next)
    addLog(`AGENT: Optimization module ${index + 1} status flipped.`, "ACTION")
  }

  // --- 4. INVOICE MATRIX ---
  const invoiceItems = [
    { item: "Design System Framework", qty: 1, price: 1200 },
    { item: "Priority Support (Annual)", qty: 12, price: 95 },
    { item: "Custom Diagnostics Suite", qty: 1, price: 850 },
  ]
  const subtotal = useMemo(() => invoiceItems.reduce((acc, current) => acc + current.qty * current.price, 0), [])
  const tax = useMemo(() => parseFloat((subtotal * 0.08).toFixed(2)), [subtotal])
  const total = useMemo(() => subtotal + tax, [subtotal, tax])

  // --- 5. SEARCHABLE TRANSACTIONS ---
  const [txnSearch, setTxnSearch] = useState("")
  const transactions = [
    { id: 1, merchant: "Blue Bottle Coffee", status: "Completed", date: "Today, 10:24 AM", amount: -6.50 },
    { id: 2, merchant: "Whole Foods Market", status: "Completed", date: "Yesterday", amount: -142.10 },
    { id: 3, merchant: "Uber Technologies", status: "Completed", date: "Oct 12", amount: -24.18 },
    { id: 4, merchant: "Netflix Subscription", status: "Pending", date: "Oct 11", amount: -20.99 },
    { id: 5, merchant: "Vercel Enterprise Tier", status: "Completed", date: "Oct 08", amount: 480.00 },
  ]
  const filteredTxns = useMemo(() => {
    return transactions.filter(t => 
      t.merchant.toLowerCase().includes(txnSearch.toLowerCase()) ||
      t.status.toLowerCase().includes(txnSearch.toLowerCase())
    )
  }, [txnSearch])

  // --- 6. INVESTMENT TRADE DESK ---
  const [investFunds, setInvestFunds] = useState("1100.00")
  const [selectedAsset, setSelectedAsset] = useState("VOO")
  const assetPrices: Record<string, number> = {
    VOO: 480.0,
    AAPL: 190.0,
    VIX: 14.5,
    O: 58.2,
  }
  const buyingPower = 12450.0
  const estimatedShares = useMemo(() => {
    const amt = parseFloat(investFunds)
    if (isNaN(amt) || amt <= 0) return 0
    return parseFloat((amt / assetPrices[selectedAsset]).toFixed(4))
  }, [investFunds, selectedAsset])

  const handleOrderSubmission = () => {
    const amt = parseFloat(investFunds)
    if (isNaN(amt) || amt <= 0 || amt > buyingPower) {
      addLog("TRADE: Insufficient buying capacity or invalid trade value.", "WARN")
      return
    }
    addLog(`TRADE: Executed BUY order for ${estimatedShares} units of ${selectedAsset} totalling $${amt.toFixed(2)}`, "SUCCESS")
  }

  // --- 7. SAVINGS GOALS ---
  const [retirementTarget, setRetirementTarget] = useState(420000)
  const [realEstateTarget, setRealEstateTarget] = useState(85000)

  const makeDeposit = (target: "retire" | "estate") => {
    if (target === "retire") {
      setRetirementTarget(prev => Math.min(prev + 5000, 500000))
      addLog("SAVINGS: Dispatched $5,000.00 deposit allocation to RETIREMENT target.", "SUCCESS")
    } else {
      setRealEstateTarget(prev => Math.min(prev + 2500, 320000))
      addLog("SAVINGS: Dispatched $2,500.00 deposit allocation to REAL ESTATE target.", "SUCCESS")
    }
  }

  // --- 8. SMART LOCK MONITOR ---
  const [isLocked, setIsLocked] = useState(true)
  const [asciiGrid, setAsciiGrid] = useState<string[]>([])

  useEffect(() => {
    const chars = "01#$%&<>[]X"
    const generateGrid = () => {
      const grid = []
      for (let i = 0; i < 4; i++) {
        let row = ""
        for (let j = 0; j < 12; j++) {
          row += chars[Math.floor(Math.random() * chars.length)]
        }
        grid.push(row)
      }
      return grid
    }
    setAsciiGrid(generateGrid())

    const interval = setInterval(() => {
      setAsciiGrid(generateGrid())
    }, 600)
    return () => clearInterval(interval)
  }, [])

  const handleLockToggle = () => {
    setIsLocked(!isLocked)
    addLog(
      `SECURE: Front Door system state set to [${!isLocked ? "LOCKED" : "UNLOCKED"}] (HASH: SHA256_F9A8)`,
      !isLocked ? "SYSTEM" : "WARN"
    )
  }

  // --- 9. SHIPPING ADDRESS ---
  const [streetAddress, setStreetAddress] = useState("123 Main Street")
  const [suiteAddress, setSuiteAddress] = useState("Apt 4B")
  const [cityAddress, setCityAddress] = useState("San Francisco")
  const [stateAddress, setStateAddress] = useState("CA")
  const [zipAddress, setZipAddress] = useState("94107")

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault()
    addLog(`SHIPPING: Configured operational node delivery address to ${cityAddress}, ${stateAddress}`, "SUCCESS")
  }

  // --- 10. FEEDBACK CONSOLE ---
  const [feedbackTopic, setFeedbackTopic] = useState("System Presets")
  const [feedbackText, setFeedbackText] = useState("")

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedbackText) return
    addLog(`FEEDBACK: Filed operator response for [${feedbackTopic}] - "${feedbackText.substring(0, 30)}..."`, "SUCCESS")
    setFeedbackText("")
  }

  // --- 11. NEW DESIGN SYSTEM SLIDERS STATE ---
  const [minPayout, setMinPayout] = useState(2500)
  const [preferredCurrency, setPreferredCurrency] = useState("USD")

  // Kitchen Island Ambient Controller State
  const [isDeviceOn, setIsDeviceOn] = useState(true)
  const [activePreset, setActivePreset] = useState("Cooking")
  const [brightness, setBrightness] = useState(90)
  const [colorTemp, setColorTemp] = useState(75)
  const [volume, setVolume] = useState(40)
  const [fade, setFade] = useState(10)

  const presets: Record<string, { brightness: number; colorTemp: number; volume: number; fade: number }> = {
    Cooking: { brightness: 90, colorTemp: 75, volume: 40, fade: 10 },
    Dining: { brightness: 50, colorTemp: 30, volume: 60, fade: 20 },
    Nightlight: { brightness: 15, colorTemp: 10, volume: 0, fade: 80 },
    Focus: { brightness: 100, colorTemp: 95, volume: 20, fade: 0 },
  }

  const handleApplyPreset = (presetName: string) => {
    if (!isDeviceOn) return
    setActivePreset(presetName)
    const vals = presets[presetName]
    setBrightness(vals.brightness)
    setColorTemp(vals.colorTemp)
    setVolume(vals.volume)
    setFade(vals.fade)
    addLog(`DEVICE: Applied ambient lighting preset [${presetName.toUpperCase()}]`, "ACTION")
  }

  const handleToggleDevice = () => {
    setIsDeviceOn(!isDeviceOn)
    addLog(
      `DEVICE: Kitchen Island power state set to [${!isDeviceOn ? "ON" : "OFF"}]`,
      !isDeviceOn ? "SUCCESS" : "WARN"
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 outline-none">
      
      {/* ==================== COLUMN 1 ==================== */}
      <div className="space-y-4">
        
        {/* Environment Variables Manager */}
        <TuiContainer
          label="ENV_VARIABLES"
          badge={
            <Badge variant="outline" className="text-[10px] rounded-none py-0 h-4 leading-none bg-primary/10">
              {envVars.length} KEYS
            </Badge>
          }
        >
          <div className="text-xs text-muted-foreground mb-3">
            Secure environment configurations injecting variables into compiling pods.
          </div>

          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 border border-border/40 p-2 bg-muted/20 font-mono text-xs">
            {envVars.map((item) => (
              <div key={item.key} className="flex items-center justify-between border-b border-dashed border-border/80 pb-1.5 last:border-b-0">
                <div className="flex flex-col gap-0.5 max-w-[80%]">
                  <span className="font-bold text-foreground overflow-x-hidden text-ellipsis whitespace-nowrap">{item.key}</span>
                  <span className="text-[10px] text-muted-foreground overflow-x-hidden text-ellipsis whitespace-nowrap font-mono">
                    {item.isSecret ? "••••••••••••••••" : item.val}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-rose-500 hover:text-rose-600 border border-transparent hover:border-rose-500/30 rounded-none shrink-0"
                  onClick={() => handleDeleteEnv(item.key)}
                >
                  <RiDeleteBinLine className="size-3" />
                </Button>
              </div>
            ))}
          </div>

          {/* Form to Add Variable */}
          <form onSubmit={handleAddEnv} className="mt-3 grid grid-cols-2 gap-2 pt-2 border-t border-dashed border-border/80 col-span-2">
            <div className="col-span-2">
              <Input
                placeholder="VARIABLE_NAME"
                className="h-7 text-xs rounded-none"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value.toUpperCase())}
              />
            </div>
            <div>
              <Input
                placeholder="Variable Value"
                className="h-7 text-xs rounded-none"
                value={newVal}
                onChange={(e) => setNewVal(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between border border-input px-2 bg-background h-7">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Secret?</span>
              <button
                type="button"
                className={cn(
                  "px-1.5 py-0.5 text-[9px] font-bold border rounded-none cursor-pointer",
                  isSecretInput ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border"
                )}
                onClick={() => setIsSecretInput(!isSecretInput)}
              >
                {isSecretInput ? "YES" : "NO"}
              </button>
            </div>
            <div className="col-span-2 flex gap-2 justify-end mt-1">
              <Button
                type="button"
                variant="outline"
                size="xs"
                className="flex-1"
                disabled={isDeploying}
                onClick={handleRedeploy}
              >
                <RiSettingsLine className={cn("size-3.5", isDeploying && "animate-spin")} />
                {isDeploying ? "DEPLOYING..." : "RE-DEPLOY"}
              </Button>
              <Button type="submit" size="xs" className="flex-1">
                <RiAddLine className="size-3.5" /> ADD KEY
              </Button>
            </div>
          </form>
        </TuiContainer>

        {/* Invite Team Collaborator */}
        <TuiContainer label="TEAM_COLLABORATORS">
          <div className="text-xs text-muted-foreground mb-3">
            Invite your team to collaborate on this host cluster.
          </div>

          <div className="space-y-2 border border-border/40 p-2 bg-muted/20">
            {teamMembers.map((member) => (
              <div key={member.email} className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 max-w-[70%]">
                  <Avatar className="size-6 border border-border rounded-none shrink-0">
                    <AvatarFallback className="text-[9px] bg-primary/20 text-primary font-bold">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate text-foreground/90 font-medium">{member.email}</span>
                </div>
                <Badge variant="outline" className="text-[9px] leading-none py-0.5 rounded-none uppercase">
                  {member.role}
                </Badge>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddMember} className="mt-3 space-y-2.5 pt-2 border-t border-dashed border-border/80">
            <div className="flex gap-2">
              <Input
                placeholder="clara@example.com"
                className="h-7 text-xs rounded-none flex-1"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="w-24 h-7 text-[10px] rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                  <SelectItem value="Billing">Billing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between gap-2 pt-1">
              <Button type="button" variant="outline" size="xs" className="flex-1 gap-1" onClick={handleCopyLink}>
                <RiFileCopyLine className="size-3" /> COPY INVITE
              </Button>
              <Button type="submit" size="xs" className="flex-1 gap-1">
                <RiUserAddLine className="size-3" /> SEND INVITE
              </Button>
            </div>
          </form>
        </TuiContainer>

        {/* Shipping Address Console */}
        <TuiContainer label="DELIVERY_NODE">
          <div className="text-xs text-muted-foreground mb-3">
            Deploy physical hardware modules or billing receipts.
          </div>
          <form onSubmit={handleSaveAddress} className="space-y-2 text-xs">
            <div className="space-y-0.5">
              <Label className="text-[9px] font-bold text-muted-foreground uppercase">Street Address</Label>
              <Input
                className="h-7 text-xs rounded-none"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-0.5">
                <Label className="text-[9px] font-bold text-muted-foreground uppercase">Apt / Suite</Label>
                <Input
                  className="h-7 text-xs rounded-none"
                  value={suiteAddress}
                  onChange={(e) => setSuiteAddress(e.target.value)}
                />
              </div>
              <div className="space-y-0.5">
                <Label className="text-[9px] font-bold text-muted-foreground uppercase">ZIP Code</Label>
                <Input
                  className="h-7 text-xs rounded-none"
                  value={zipAddress}
                  onChange={(e) => setZipAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 space-y-0.5">
                <Label className="text-[9px] font-bold text-muted-foreground uppercase">City</Label>
                <Input
                  className="h-7 text-xs rounded-none"
                  value={cityAddress}
                  onChange={(e) => setCityAddress(e.target.value)}
                />
              </div>
              <div className="space-y-0.5">
                <Label className="text-[9px] font-bold text-muted-foreground uppercase">State</Label>
                <Select value={stateAddress} onValueChange={setStateAddress}>
                  <SelectTrigger className="h-7 text-[10px] rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="CA">CA</SelectItem>
                    <SelectItem value="NY">NY</SelectItem>
                    <SelectItem value="TX">TX</SelectItem>
                    <SelectItem value="WA">WA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <Button type="submit" size="xs" className="w-full">
                SAVE SHIPPING NODE
              </Button>
            </div>
          </form>
        </TuiContainer>

      </div>

      {/* ==================== COLUMN 2 ==================== */}
      <div className="space-y-4">
        
        {/* Payout Threshold Slider Card (Brutalist Slider) */}
        <TuiContainer
          label="PAYOUT_SETTINGS"
          badge={
            <Badge variant="outline" className="text-[10px] rounded-none py-0 h-4 leading-none bg-primary/10 border-primary/20">
              BRUTALIST SLIDER
            </Badge>
          }
        >
          <div className="text-xs text-muted-foreground mb-3">
            Dynamic thick-track payout thresholds with sharp square indicators.
          </div>

          <div className="space-y-4 border border-border/40 p-3 bg-muted/10 font-mono">
            {/* Header readouts */}
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold text-foreground/80 uppercase tracking-wide">
                Minimum Payout Amount
              </span>
              <span className="text-xl font-bold text-foreground">
                ${minPayout.toFixed(2)}
              </span>
            </div>

            {/* Slider track */}
            <div className="space-y-1.5">
              <BrutalistSlider
                min={50}
                max={10000}
                value={minPayout}
                onChange={(val) => {
                  setMinPayout(val)
                  if (val % 250 === 0) {
                    addLog(`PAYOUT: Adjusted payout threshold to $${val}`, "ACTION")
                  }
                }}
              />
              <div className="flex justify-between text-[9px] text-muted-foreground font-bold">
                <span>$50 (MIN)</span>
                <span>$10,000 (MAX)</span>
              </div>
            </div>

            {/* Config controls */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-dashed border-border/80 text-xs">
              <div className="space-y-0.5">
                <Label className="text-[9px] font-bold text-muted-foreground uppercase">Currency Code</Label>
                <Select value={preferredCurrency} onValueChange={setPreferredCurrency}>
                  <SelectTrigger className="h-7 text-[10px] rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro Core</SelectItem>
                    <SelectItem value="GBP">GBP - Sterling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col justify-end">
                <Button size="xs" className="h-7 rounded-none" onClick={() => addLog(`PAYOUT: Saved threshold matrix at $${minPayout} ${preferredCurrency}`, "SUCCESS")}>
                  SAVE THRESHOLD
                </Button>
              </div>
            </div>
          </div>
        </TuiContainer>

        {/* Kitchen Island Device Ambient Controller */}
        <TuiContainer
          label="SMART_LIGHT_CONTROLLER"
          badge={
            <Badge variant="outline" className={cn(
              "text-[9px] font-bold rounded-none h-4 leading-none uppercase transition-colors",
              isDeviceOn 
                ? "border-emerald-500 text-emerald-500 bg-emerald-500/10" 
                : "border-rose-500 text-rose-500 bg-rose-500/10"
            )}>
              {isDeviceOn ? "DEVICE_ON" : "DEVICE_OFF"}
            </Badge>
          }
        >
          <div className="text-xs text-muted-foreground mb-3">
            Custom retro console panelgoverning ambient light configurations.
          </div>

          <div className="border border-border/40 p-3.5 bg-muted/10 space-y-4">
            
            {/* Title block + Toggle Switch */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wide">Kitchen Island</h3>
                <span className="text-[9px] text-muted-foreground uppercase font-mono block">Hue Color Ambient</span>
              </div>
              
              {/* SPECIFIC SHARP BRUTALIST TOGGLE SWITCH */}
              <button
                type="button"
                className={cn(
                  "w-11 h-6 border flex items-center p-0.5 rounded-none cursor-pointer transition-colors duration-200",
                  isDeviceOn ? "bg-primary border-primary justify-end" : "bg-muted border-border/60 justify-start"
                )}
                onClick={handleToggleDevice}
              >
                {/* Knob is a perfect square size-4 (16px) */}
                <span className={cn(
                  "size-4 bg-background border rounded-none transition-transform duration-200 shrink-0",
                  isDeviceOn ? "border-primary-foreground" : "border-border"
                )}></span>
              </button>
            </div>

            {/* Preset tab buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {Object.keys(presets).map((name) => (
                <button
                  key={name}
                  type="button"
                  disabled={!isDeviceOn}
                  className={cn(
                    "px-2.5 py-1 text-[10px] font-bold border font-mono uppercase transition-all rounded-none cursor-pointer",
                    activePreset === name && isDeviceOn
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground border-border/80 hover:border-foreground/60 disabled:opacity-40 disabled:cursor-not-allowed"
                  )}
                  onClick={() => handleApplyPreset(name)}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Slider Controls Rows */}
            <div className={cn("space-y-2.5 transition-opacity duration-300", !isDeviceOn && "opacity-40 pointer-events-none")}>
              
              {/* Brightness Control */}
              <div className="flex items-center gap-3 border border-border/30 p-2 bg-card/25 text-xs">
                <div className="flex items-center gap-1.5 w-24 shrink-0 font-mono text-[10px]">
                  <RiSunLine className="size-3.5 text-foreground/75" />
                  <span className="font-bold uppercase">Brightness</span>
                </div>
                <div className="flex-grow flex items-center gap-2">
                  <BrutalistSlider
                    min={0}
                    max={100}
                    value={brightness}
                    onChange={(val) => {
                      setBrightness(val)
                      setActivePreset("")
                    }}
                    disabled={!isDeviceOn}
                  />
                  <span className="w-8 text-right font-mono font-bold text-[9px]">{brightness}%</span>
                </div>
              </div>

              {/* Color Temp Control */}
              <div className="flex items-center gap-3 border border-border/30 p-2 bg-card/25 text-xs">
                <div className="flex items-center gap-1.5 w-24 shrink-0 font-mono text-[10px]">
                  <RiThermometerLine className="size-3.5 text-foreground/75" />
                  <span className="font-bold uppercase">Color Temp</span>
                </div>
                <div className="flex-grow flex items-center gap-2">
                  <BrutalistSlider
                    min={0}
                    max={100}
                    value={colorTemp}
                    onChange={(val) => {
                      setColorTemp(val)
                      setActivePreset("")
                    }}
                    disabled={!isDeviceOn}
                  />
                  <span className="w-8 text-right font-mono font-bold text-[9px]">{colorTemp}%</span>
                </div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3 border border-border/30 p-2 bg-card/25 text-xs">
                <div className="flex items-center gap-1.5 w-24 shrink-0 font-mono text-[10px]">
                  <RiVolumeUpLine className="size-3.5 text-foreground/75" />
                  <span className="font-bold uppercase">Volume</span>
                </div>
                <div className="flex-grow flex items-center gap-2">
                  <BrutalistSlider
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(val) => {
                      setVolume(val)
                      setActivePreset("")
                    }}
                    disabled={!isDeviceOn}
                  />
                  <span className="w-8 text-right font-mono font-bold text-[9px]">{volume}%</span>
                </div>
              </div>

              {/* Fade Control */}
              <div className="flex items-center gap-3 border border-border/30 p-2 bg-card/25 text-xs">
                <div className="flex items-center gap-1.5 w-24 shrink-0 font-mono text-[10px]">
                  <RiTimerLine className="size-3.5 text-foreground/75" />
                  <span className="font-bold uppercase">Fade</span>
                </div>
                <div className="flex-grow flex items-center gap-2">
                  <BrutalistSlider
                    min={0}
                    max={100}
                    value={fade}
                    onChange={(val) => {
                      setFade(val)
                      setActivePreset("")
                    }}
                    disabled={!isDeviceOn}
                  />
                  <span className="w-8 text-right font-mono font-bold text-[9px]">{fade}%</span>
                </div>
              </div>

            </div>
          </div>
        </TuiContainer>

        {/* Investment Trade Desk */}
        <TuiContainer label="INVESTMENT_TRADE_DESK">
          <div className="text-xs text-muted-foreground mb-3 flex items-center justify-between">
            <span>Trade synthetic asset options with buying power bounds.</span>
            <span className="font-mono font-bold text-primary flex items-center gap-1">
              <RiWalletLine className="size-3.5" /> ${buyingPower.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <Label className="text-[9px] font-bold text-muted-foreground uppercase">Funds allocation ($)</Label>
              <Input
                placeholder="1000.00"
                className="h-7 text-xs rounded-none font-mono"
                value={investFunds}
                onChange={(e) => setInvestFunds(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[9px] font-bold text-muted-foreground uppercase">Asset holdings</Label>
              <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                <SelectTrigger className="h-7 text-[10px] rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="VOO">VOO (S&P 500) - $480</SelectItem>
                  <SelectItem value="AAPL">AAPL (Apple) - $190</SelectItem>
                  <SelectItem value="VIX">VIX (Volatility) - $14.50</SelectItem>
                  <SelectItem value="O">O (Realty) - $58.20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Real-time Calculation Area */}
          <div className="mt-3 border border-border/50 bg-muted/15 p-2 font-mono text-[10px] space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted-foreground uppercase">Est. shares capacity:</span>
              <span className="font-bold text-foreground text-sm">{estimatedShares}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground uppercase">Stock Price Point:</span>
              <span className="font-bold text-foreground">${assetPrices[selectedAsset]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground uppercase">Est. Buying Power Remain:</span>
              <span className="font-bold text-foreground">
                ${(buyingPower - (parseFloat(investFunds) || 0) >= 0 
                  ? (buyingPower - (parseFloat(investFunds) || 0)).toLocaleString() 
                  : 0
                )}
              </span>
            </div>
          </div>

          <Button
            className="w-full mt-3 text-[10px] font-bold tracking-wider"
            onClick={handleOrderSubmission}
          >
            <RiArrowRightLine className="size-3.5 mr-1" /> EXECUTE TRANSACTION ORDER
          </Button>
        </TuiContainer>

        {/* Operator Response / Feedback console */}
        <TuiContainer label="OPERATOR_RESPONSE">
          <div className="text-xs text-muted-foreground mb-3">
            Submit terminal reports directly to host command.
          </div>
          <form onSubmit={handleSubmitFeedback} className="space-y-2 text-xs">
            <div className="space-y-0.5">
              <Label className="text-[9px] font-bold text-muted-foreground uppercase">Diagnostic Area</Label>
              <Select value={feedbackTopic} onValueChange={setFeedbackTopic}>
                <SelectTrigger className="h-7 text-[10px] rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="System Presets">System Presets (buG04wd)</SelectItem>
                  <SelectItem value="Hardware Matrix">Hardware Diagnostic Modules</SelectItem>
                  <SelectItem value="Latency Anomalies">Network Latency Streams</SelectItem>
                  <SelectItem value="Security Shields">Security Firewalls</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-0.5">
              <Label className="text-[9px] font-bold text-muted-foreground uppercase">Response Message</Label>
              <Textarea
                placeholder="Operator logs message here..."
                rows={2}
                className="text-xs rounded-none min-h-[50px] resize-none"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="xs" className="w-full">
                SUBMIT LOG REPORT
              </Button>
            </div>
          </form>
        </TuiContainer>

      </div>

      {/* ==================== COLUMN 3 ==================== */}
      <div className="space-y-4">
        
        {/* Invoice INV-1027 Itemized Table */}
        <TuiContainer
          label="INVOICE_INV-1027"
          badge={
            <Badge variant="outline" className="text-[10px] rounded-none py-0 h-4 leading-none bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
              PENDING
            </Badge>
          }
        >
          <div className="text-xs text-muted-foreground mb-3">
            Itemized cost invoice breakdown for custom presets.
          </div>

          <div className="border border-border/40 bg-muted/10 font-mono text-[11px]">
            {/* Header */}
            <div className="grid grid-cols-12 bg-muted/40 p-1.5 border-b border-border/50 font-bold text-muted-foreground">
              <div className="col-span-6">ITEM</div>
              <div className="col-span-2 text-center">QTY</div>
              <div className="col-span-4 text-right">EXT</div>
            </div>
            {/* Rows */}
            <div className="divide-y divide-dashed divide-border/60">
              {invoiceItems.map((item) => (
                <div key={item.item} className="grid grid-cols-12 p-1.5 text-foreground/90">
                  <div className="col-span-6 font-medium truncate">{item.item}</div>
                  <div className="col-span-2 text-center text-muted-foreground">{item.qty}</div>
                  <div className="col-span-4 text-right font-bold">${item.qty * item.price}</div>
                </div>
              ))}
            </div>
            {/* Calculations block */}
            <div className="border-t border-border/60 bg-muted/20 p-2 space-y-1 text-xs">
              <div className="flex justify-between text-muted-foreground text-[10px]">
                <span>SUBTOTAL VALUE:</span>
                <span className="font-bold text-foreground">${subtotal}</span>
              </div>
              <div className="flex justify-between text-muted-foreground text-[10px]">
                <span>TAX ALLOCATION (8%):</span>
                <span className="font-bold text-foreground">${tax}</span>
              </div>
              <Separator className="bg-border/60 my-1" />
              <div className="flex justify-between font-bold text-foreground">
                <span>TOTAL EX. TAX:</span>
                <span className="text-primary">${total}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-3 pt-2 border-t border-dashed border-border/80">
            <Button
              variant="outline"
              size="xs"
              className="flex-1 gap-1 text-[10px]"
              onClick={() => addLog("INVOICE: Generated secure PDF document download matrix.", "SUCCESS")}
            >
              <RiDownload2Line className="size-3.5" /> DOWNLOAD PDF
            </Button>
            <Button
              size="xs"
              className="flex-1 gap-1 text-[10px]"
              onClick={() => addLog(`INVOICE: Initiated total payment settlement of $${total}`, "SUCCESS")}
            >
              <RiSecurePaymentLine className="size-3.5" /> PAY NOW
            </Button>
          </div>
        </TuiContainer>

        {/* Searchable Transaction Ledger */}
        <TuiContainer label="TRANSACTIONS_LEDGER">
          <div className="text-xs text-muted-foreground mb-3 flex items-center justify-between gap-2">
            <span>Recent transaction ledger files.</span>
            <div className="relative max-w-[120px]">
              <RiSearchLine className="size-3 absolute left-1.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="SEARCH..."
                className="w-full text-[9px] bg-background border border-border h-5 pl-5 pr-1 outline-none uppercase font-mono"
                value={txnSearch}
                onChange={(e) => setTxnSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5 border border-border/40 p-1.5 bg-muted/20 font-mono text-xs max-h-[165px] overflow-y-auto">
            {filteredTxns.length === 0 ? (
              <div className="text-center py-4 text-[10px] text-muted-foreground">NO MATCHING LEDGER FILES</div>
            ) : (
              filteredTxns.map((txn) => (
                <div key={txn.id} className="flex justify-between items-center border-b border-border/30 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex flex-col gap-0.5 max-w-[65%]">
                    <span className="font-bold text-foreground truncate">{txn.merchant}</span>
                    <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                      <span>{txn.date}</span>
                      <span className={cn(
                        "font-bold shrink-0",
                        txn.status === "Pending" ? "text-amber-500" : "text-emerald-500"
                      )}>[{txn.status.toUpperCase()}]</span>
                    </div>
                  </div>
                  <span className={cn(
                    "font-bold text-[11px]",
                    txn.amount < 0 ? "text-rose-500" : "text-emerald-500"
                  )}>
                    {txn.amount < 0 ? "-" : "+"}${Math.abs(txn.amount).toFixed(2)}
                  </span>
                </div>
              ))
            )}
          </div>
        </TuiContainer>

        {/* Vercel Agent Capabilities */}
        <TuiContainer
          label="VERCEL_AGENT"
          badge={
            <Badge variant="outline" className={cn(
              "text-[9px] font-bold rounded-none h-4 leading-none transition-colors",
              activeAgentCount === 3 
                ? "border-emerald-500 text-emerald-500 bg-emerald-500/10" 
                : "border-primary/50 text-primary bg-primary/10"
            )}>
              {activeAgentCount}/3 CONFIGURED
            </Badge>
          }
        >
          <div className="text-xs text-muted-foreground mb-3">
            Optimize workflows and deploy post-merge database analytics.
          </div>

          <div className="space-y-2 text-xs">
            <button
              type="button"
              className="flex items-start gap-2.5 text-left border border-border/40 p-2 hover:border-primary/50 bg-card/25 w-full cursor-pointer select-none transition-colors"
              onClick={() => toggleAgentItem(0)}
            >
              <div className={cn(
                "size-4 border border-foreground bg-background flex items-center justify-center shrink-0 transition-colors duration-150 rounded-none mt-0.5",
                vercelAgentChecked[0] ? "bg-foreground text-background" : "border-foreground/60"
              )}>
                {vercelAgentChecked[0] && (
                  <svg className="size-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-foreground text-[10px] block uppercase">Logic-Context Reviews</span>
                <span className="text-[10px] text-muted-foreground leading-normal block">
                  Find logic bugs dynamically prior to pipeline execution.
                </span>
              </div>
            </button>

            <button
              type="button"
              className="flex items-start gap-2.5 text-left border border-border/40 p-2 hover:border-primary/50 bg-card/25 w-full cursor-pointer select-none transition-colors"
              onClick={() => toggleAgentItem(1)}
            >
              <div className={cn(
                "size-4 border border-foreground bg-background flex items-center justify-center shrink-0 transition-colors duration-150 rounded-none mt-0.5",
                vercelAgentChecked[1] ? "bg-foreground text-background" : "border-foreground/60"
              )}>
                {vercelAgentChecked[1] && (
                  <svg className="size-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-foreground text-[10px] block uppercase">Tailored suggestions</span>
                <span className="text-[10px] text-muted-foreground leading-normal block">
                  Synchronize DB suggestions directly with schema updates.
                </span>
              </div>
            </button>

            <button
              type="button"
              className="flex items-start gap-2.5 text-left border border-border/40 p-2 hover:border-primary/50 bg-card/25 w-full cursor-pointer select-none transition-colors"
              onClick={() => toggleAgentItem(2)}
            >
              <div className={cn(
                "size-4 border border-foreground bg-background flex items-center justify-center shrink-0 transition-colors duration-150 rounded-none mt-0.5",
                vercelAgentChecked[2] ? "bg-foreground text-background" : "border-foreground/60"
              )}>
                {vercelAgentChecked[2] && (
                  <svg className="size-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <div className="space-y-0.5">
                <span className="font-bold text-foreground text-[10px] block uppercase">Post-Merge Analytics</span>
                <span className="text-[10px] text-muted-foreground leading-normal block">
                  Analyze anomalies automatically on production load matrices.
                </span>
              </div>
            </button>
          </div>

          <div className="mt-3 pt-2 border-t border-dashed border-border/80">
            <Button
              className="w-full text-[10px] font-bold tracking-wider"
              disabled={activeAgentCount === 0}
              onClick={() => addLog(`AGENT: Verification protocol executed for ${activeAgentCount} subsystems.`, "SUCCESS")}
            >
              <RiCheckDoubleLine className="size-3.5 mr-1" /> VERIFY CAPABILITIES
            </Button>
          </div>
        </TuiContainer>

        {/* Savings Targets PROGRESS */}
        <TuiContainer label="SAVINGS_TARGETS">
          <div className="text-xs text-muted-foreground mb-3">
            Active asset milestone markers for system maturity.
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Retirement */}
            <div className="border border-border/40 p-2.5 bg-card/10 space-y-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-foreground uppercase">RETIREMENT LEDGER</span>
                <span className="text-muted-foreground font-semibold">
                  ${retirementTarget.toLocaleString()} / $500,000 ({(retirementTarget / 500000 * 100).toFixed(0)}%)
                </span>
              </div>
              <div className="w-full h-2.5 border border-border bg-muted/40 p-0.5 rounded-none">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${retirementTarget / 500000 * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-end pt-1">
                <Button size="xs" className="h-5 px-2 text-[9px] rounded-none" onClick={() => makeDeposit("retire")}>
                  + $5k DEPOSIT
                </Button>
              </div>
            </div>

            {/* Real Estate */}
            <div className="border border-border/40 p-2.5 bg-card/10 space-y-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-foreground uppercase">REAL ESTATE RESERVE</span>
                <span className="text-muted-foreground font-semibold">
                  ${realEstateTarget.toLocaleString()} / $320,000 ({(realEstateTarget / 320000 * 100).toFixed(0)}%)
                </span>
              </div>
              <div className="w-full h-2.5 border border-border bg-muted/40 p-0.5 rounded-none">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${realEstateTarget / 320000 * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-end pt-1">
                <Button size="xs" className="h-5 px-2 text-[9px] rounded-none" onClick={() => makeDeposit("estate")}>
                  + $2.5k DEPOSIT
                </Button>
              </div>
            </div>
          </div>
        </TuiContainer>

        {/* Smart Lock Monitoring Visualizer */}
        <TuiContainer
          label="SMART_LOCK_CONSOLE"
          badge={
            <Badge variant="outline" className={cn(
              "text-[10px] rounded-none py-0 h-4 leading-none font-bold uppercase transition-colors",
              isLocked 
                ? "border-rose-500 text-rose-500 bg-rose-500/10" 
                : "border-emerald-500 text-emerald-500 bg-emerald-500/10"
            )}>
              {isLocked ? "LOCKED" : "UNLOCKED"}
            </Badge>
          }
        >
          <div className="text-xs text-muted-foreground mb-3 flex items-center justify-between">
            <span>Secure door lock and real-time scanning feed.</span>
            <span className="size-1.5 bg-rose-500 rounded-full animate-ping"></span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Visualizer Feed */}
            <div className="col-span-2 border border-border bg-black/90 p-2 font-mono text-[9px] leading-tight select-none h-[88px] overflow-hidden text-emerald-500 flex flex-col justify-between">
              <div className="flex justify-between border-b border-emerald-500/20 pb-0.5 text-[8px] text-emerald-500/60 uppercase">
                <span>Feed: FRONT_CAM</span>
                <span>fps: 15.0</span>
              </div>
              <div className="space-y-0.5 text-center flex-1 py-1 text-emerald-400 font-mono tracking-widest opacity-80 select-none">
                {asciiGrid.map((row, idx) => (
                  <div key={idx}>{row}</div>
                ))}
              </div>
            </div>

            {/* Lock Button controls */}
            <div className="flex flex-col gap-2 justify-center items-center border border-border/60 bg-muted/15 p-1.5 rounded-none">
              <div className="rounded-full bg-muted/40 p-2">
                {isLocked ? (
                  <RiLockLine className="size-5 text-rose-500 animate-pulse" />
                ) : (
                  <RiLockUnlockLine className="size-5 text-emerald-500" />
                )}
              </div>
              <Button size="xs" className="w-full text-[9px] rounded-none py-1 h-auto" onClick={handleLockToggle}>
                {isLocked ? "UNLOCK" : "LOCK"}
              </Button>
            </div>
          </div>
        </TuiContainer>

      </div>

    </div>
  )
}
