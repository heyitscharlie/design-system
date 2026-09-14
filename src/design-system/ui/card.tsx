import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const cardVariants = cva("flex flex-col gap-3 rounded-xl p-6", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      "primary-transparent": "bg-primary/50 text-primary-foreground",
      "card-transparent": "bg-card/50 text-card-foreground",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-lg font-bold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn("opacity-80", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={className} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-1 flex flex-wrap items-center font-mono text-sm opacity-70 [&>*:not(:first-child)]:before:mx-2 [&>*:not(:first-child)]:before:content-['·']",
        className
      )}
      {...props}
    />
  )
}

export { Card, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
