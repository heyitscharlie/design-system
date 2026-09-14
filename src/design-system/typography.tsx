import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'font-heading text-3xl tracking-tight',
      h2: 'font-heading text-xl',
      h3: 'font-heading text-lg',
      h4: 'font-heading text-base',
      subheading: 'text-lg font-medium',
      body: 'text-[15px]',
      label: 'font-mono text-xs text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

export type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;

const HEADING_VARIANTS = new Set<TypographyVariant>(['h1', 'h2', 'h3', 'h4']);

/** Default element per variant. Override with `as` when the semantic tag
 * needs to differ from the visual style. */
const defaultTag: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  subheading: 'p',
  body: 'p',
  label: 'span',
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /** Overrides the rendered element (defaults per-variant — see `defaultTag`). */
  as?: React.ElementType;
}

/** The single source of truth for text styling. Heading font and weight
 * are applied here — via the `font-heading` token and the
 * `--palette-font-heading-weight` variable, both set per palette in
 * index.css — instead of a blanket tag selector (`h1, h2, h3, h4 { ... }`),
 * which silently styles anything that happens to use those tags and does
 * nothing for anything that doesn't (e.g. a `<span>` meant to look like a
 * heading). Nothing outside this component should reference
 * `--palette-font-heading{,-weight}` directly — if a new heading treatment
 * is needed, it belongs here, not re-typed at the call site. */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, style, ...props }, ref) => {
    const resolvedVariant = variant ?? 'body';
    const Comp = as ?? defaultTag[resolvedVariant];
    const isHeading = HEADING_VARIANTS.has(resolvedVariant);

    return (
      <Comp
        ref={ref}
        className={cn(typographyVariants({ variant }), className)}
        style={isHeading ? { fontWeight: 'var(--palette-font-heading-weight)', ...style } : style}
        {...props}
      />
    );
  },
);
Typography.displayName = 'Typography';

/** `<Typography variant="body">` as its own named export — the common
 * case of "just a paragraph" doesn't need a `variant` prop spelled out at
 * every call site. */
export const Paragraph = React.forwardRef<HTMLElement, Omit<TypographyProps, 'variant'>>(
  (props, ref) => <Typography ref={ref} variant="body" {...props} />,
);
Paragraph.displayName = 'Paragraph';
