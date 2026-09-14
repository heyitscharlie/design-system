// Interactive (hooks/context/state), so the whole bundle needs to be a
// client boundary for Next.js App Router consumers — Rollup bundles every
// file here into a single dist/index.mjs, so one directive at the entry
// covers it rather than needing it per source file.
'use client';

export { Button, buttonVariants } from './design-system/ui/button';
export { Card, CardTitle, CardDescription, CardContent, CardFooter } from './design-system/ui/card';
export { cn } from './design-system/lib/utils';
export { Input } from './design-system/ui/input';
export { ModeToggle } from './design-system/mode-toggle';
export { PaletteSwitcher } from './design-system/palette-switcher';
export { PasswordInput } from './design-system/password-input';
export { SearchInput } from './design-system/search-input';
export { ThemeProvider, useTheme } from './design-system/theme-provider';
export type { ThemeMode, Palette, ThemeState } from './design-system/theme-provider';
export { Toggle, toggleVariants } from './design-system/ui/toggle';
export { Typography, Paragraph } from './design-system/typography';
export type { TypographyVariant, TypographyProps } from './design-system/typography';
export { useIsMobile } from './design-system/hooks/use-mobile';
