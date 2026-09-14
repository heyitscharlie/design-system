// Interactive (hooks/context/state), so the whole bundle needs to be a
// client boundary for Next.js App Router consumers — Rollup bundles every
// file here into a single dist/index.mjs, so one directive at the entry
// covers it rather than needing it per source file.
'use client';

export { Button, buttonVariants } from './components/ui/button';
export { Input } from './components/ui/input';
export { ThemeProvider, useTheme } from './components/theme-provider';
export type { ThemeMode, Palette, ThemeState } from './components/theme-provider';
export { ModeToggle } from './components/mode-toggle';
export { PaletteSwitcher } from './components/palette-switcher';
export { cn } from './lib/utils';
