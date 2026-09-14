import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Toggle as TogglePrimitive } from "radix-ui"

// Styled to read as a button first, a toggle second — same shape as the
// Button outline variant (which is what ModeToggle is built from) when
// off, filling to the primary color when on, rather than the faint
// hover-only ghost look shadcn ships by default.
//
// No `dark:` overrides here on purpose: --background, --border, --muted,
// --primary etc. already redefine themselves under `.dark` (see
// src/themes/*.css), so bg-background/border-border/bg-primary are
// already dark-mode-correct on their own. Button's outline variant adds
// `dark:bg-input/30` on top of that for its own reasons, but copying it
// here fought data-[state=on]:bg-primary for the same property — same
// specificity, so source order (not intent) decided the winner, and in
// dark mode the dark: background rule won while data-[state=on]'s text
// color still applied: primary-foreground (near-black) text over the
// *unfilled* dark background instead of over primary. Trust the tokens.
const toggleVariants = cva(
  "group/toggle inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-border bg-background text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-[state=on]:border-transparent data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary/80 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function Toggle({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
