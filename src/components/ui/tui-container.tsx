import * as React from "react"
import { cn } from "@/lib/utils"

export interface TuiContainerProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
  label: string
  borderColor?: string
  textColor?: string
  badge?: React.ReactNode
}

const TuiContainer = React.forwardRef<HTMLFieldSetElement, TuiContainerProps>(
  ({ className, label, children, borderColor = "border-border/60 hover:border-primary/80", textColor = "text-muted-foreground group-hover:text-primary", badge, ...props }, ref) => {
    return (
      <fieldset
        ref={ref}
        className={cn(
          "group border bg-card/30 backdrop-blur-sm p-4 font-mono relative transition-all duration-300 rounded-none w-full",
          borderColor,
          className
        )}
        {...props}
      >
        <legend className={cn("px-2 text-xs font-bold uppercase tracking-widest flex items-center gap-2 select-none transition-colors duration-300", textColor)}>
          <span>[{label}]</span>
          {badge && <span className="normal-case font-normal">{badge}</span>}
        </legend>
        <div className="w-full h-full text-sm">
          {children}
        </div>
      </fieldset>
    )
  }
)

TuiContainer.displayName = "TuiContainer"

export { TuiContainer }
