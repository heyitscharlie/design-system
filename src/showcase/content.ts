import type { VariantProps } from 'class-variance-authority';
import type { TypographyVariant } from '../design-system/typography';
import type { buttonVariants } from '../design-system/ui/button';
import type { cardVariants } from '../design-system/ui/card';

/** Content for the showcase page (App.tsx) only — every piece of copy and
 * every list of tokens/variants the page displays, in one place. Kept
 * separate from App.tsx so that file stays composition-only: no copy, no
 * design tokens, just layout. This is curated display data (what to demo,
 * and how to label it), not a source of truth for the tokens themselves —
 * those live in src/themes/*.css and src/design-system/typography.tsx. */

export const pageIntro = {
  title: 'Design System',
  description:
    "Shared React components for future projects — built on Tailwind CSS variables and shadcn/ui primitives. This page is the whole deliverable: the live components, styled by the real tokens below, in whichever theme you prefer.",
};

/** Copy for the "Getting Started" section — install + wire-up steps for
 * someone consuming the published package, not building it. Kept in sync
 * by hand with the README's "Using this package in another project"
 * section; if one changes, check the other. */
export const gettingStarted = {
  intro:
    "This package targets Tailwind CSS v4's CSS-first config (no tailwind.config.js). Two things are needed in a consuming project.",
  installCommand: 'npm install @heyitscharlie/design-system',
  stylesIntro:
    "Import the design tokens. styles.css carries the color tokens (--background, --primary, --brand-ink, …), the mustard/space palettes, dark mode support, and font imports the components are styled against — without it, components render with classes that resolve to nothing. Import it once, from the consuming project's own global stylesheet, before anything else so later @theme/@source overrides in that file still apply.",
  stylesCode: `/* app/globals.css (or equivalent) */
@import "@heyitscharlie/design-system/styles.css";

/* node_modules is excluded from Tailwind's automatic content
 * detection by default — point it at this package's compiled
 * output so its components' utility classes get generated. */
@source "../node_modules/@heyitscharlie/design-system/dist";`,
  stylesWarning:
    'Don\'t add a separate @import "tailwindcss"; on top of this — styles.css already includes it; importing it twice in the same build risks duplicated output.',
  usageIntro: 'Then use the components:',
  usageCode: "import { Button, ThemeProvider } from '@heyitscharlie/design-system';",
};

/** Copy for the "Theming" section — how ThemeProvider/useTheme work, for
 * someone wiring this package into their own app root. The live
 * PaletteSwitcher/ModeToggle rendered alongside this copy are the same
 * components used in this page's own header — documented here rather
 * than left as unexplained chrome. */
export const theming = {
  intro:
    "Every component is styled against two independent axes — light/dark mode, and a brand palette (mustard or space) — both controlled by one ThemeProvider. Wrap your app root once:",
  providerCode: `import { ThemeProvider } from '@heyitscharlie/design-system';

export default function App() {
  return (
    <ThemeProvider defaultMode="system" defaultPalette="mustard">
      {/* ... */}
    </ThemeProvider>
  );
}`,
  hookIntro:
    'Read or change the current theme from anywhere inside the provider with useTheme(). It returns the same shape ThemeProvider is configured with, plus setters:',
  hookCode: `import { useTheme } from '@heyitscharlie/design-system';

const { mode, palette, setMode, setPalette } = useTheme();
// mode: 'light' | 'dark' | 'system'
// palette: 'mustard' | 'space'`,
  componentsIntro:
    'ModeToggle and PaletteSwitcher are built on useTheme, ready to drop in — the same two controls in the header of this page:',
  mechanismIntro:
    "Under the hood, ThemeProvider applies a .dark class and a data-palette attribute to <html> to match the selectors defined in styles.css — mode defaults to following the OS and stays in sync if it changes, palette defaults to mustard (the attribute-less default) and persists to localStorage under the storageKey you pass (or 'design-system-theme').",
};

/** Copy for the standalone "Mode Toggle" component section — ModeToggle
 * is also demoed live in Theming (alongside PaletteSwitcher, as the pair
 * that theme setup actually needs), but it's a real exported component in
 * its own right and gets its own Components entry for the same reason
 * Button/Card/Toggle do. */
export const modeToggleCopy = {
  intro: 'A light/dark toggle button, built from the Button atom — the same one in this page\'s own header.',
  usageCode: "import { ModeToggle } from '@heyitscharlie/design-system';",
};

/** Copy for the "Utils" group — hooks and helper functions the package
 * exports alongside its components. */
export const useThemeCopy = {
  intro: 'Read or change the current theme from anywhere inside ThemeProvider — the same hook ModeToggle and PaletteSwitcher are built on. See Theming for the full ThemeProvider setup this depends on.',
  usageCode: `import { useTheme } from '@heyitscharlie/design-system';

const { mode, palette, setMode, setPalette } = useTheme();`,
};

export const useIsMobileCopy = {
  intro: 'True below a 768px viewport width, kept in sync via a matchMedia listener — resize the window to see it flip live below.',
  usageCode: `import { useIsMobile } from '@heyitscharlie/design-system';

const isMobile = useIsMobile();`,
};

/** Small standalone strings that don't belong to any list above — the
 * brand's subtitle, the sidebar search's placeholder (shared with its own
 * demo section, so it can't say two different things in two places), the
 * sidebar's empty-search state, and the footer line. */
export const siteCopy = {
  brandLabel: 'design-system',
  searchPlaceholder: 'Search',
  noMatches: 'No matches',
  footer: '@heyitscharlie/design-system',
};

export interface ColorToken {
  name: string;
  var: string;
}

export const colorTokens: ColorToken[] = [
  { name: 'background', var: '--background' },
  { name: 'foreground', var: '--foreground' },
  { name: 'card', var: '--card' },
  { name: 'popover', var: '--popover' },
  { name: 'primary', var: '--primary' },
  { name: 'secondary', var: '--secondary' },
  { name: 'muted', var: '--muted' },
  { name: 'accent', var: '--accent' },
  { name: 'destructive', var: '--destructive' },
  { name: 'border', var: '--border' },
];

/** A curated subset of Tailwind's spacing scale (`--spacing` is defined by
 * Tailwind itself, not this design system) — just enough steps to show the
 * scale's progression, not an exhaustive list. */
export const spacingTokens: string[] = ['1', '2', '3', '4', '6', '8', '12', '16'];

export interface TypeSample {
  label: string;
  variant: TypographyVariant;
}

export const typeSamples: TypeSample[] = [
  { label: 'h1', variant: 'h1' },
  { label: 'h2', variant: 'h2' },
  { label: 'h3', variant: 'h3' },
  { label: 'h4', variant: 'h4' },
  { label: 'subheading', variant: 'subheading' },
  { label: 'body', variant: 'body' },
  { label: 'label', variant: 'label' },
];

export const typeSampleText = "I am serious, and don't call me Shirley.";

export interface ButtonVariantSample {
  variant: NonNullable<VariantProps<typeof buttonVariants>['variant']>;
  label: string;
}

export const buttonVariantSamples: ButtonVariantSample[] = [
  { variant: 'default', label: 'Default' },
  { variant: 'outline', label: 'Outline' },
  { variant: 'secondary', label: 'Secondary' },
  { variant: 'ghost', label: 'Ghost' },
  { variant: 'destructive', label: 'Destructive' },
  { variant: 'link', label: 'Link' },
];

export interface ButtonSizeSample {
  size: NonNullable<VariantProps<typeof buttonVariants>['size']>;
  label: string;
}

export const buttonSizeSamples: ButtonSizeSample[] = [
  { size: 'sm', label: 'Small' },
  { size: 'default', label: 'Default' },
  { size: 'lg', label: 'Large' },
];

export const buttonDisabledLabel = 'Disabled';

export interface InputSample {
  label: string;
  placeholder: string;
  disabled?: boolean;
  invalid?: boolean;
  type?: string;
  defaultValue?: string;
}

export const inputSamples: InputSample[] = [
  { label: 'Active', placeholder: 'Type something...' },
  { label: 'Disabled', placeholder: 'Disabled', disabled: true },
  { label: 'Invalid', placeholder: 'Invalid', invalid: true },
  { label: 'Email', placeholder: 'you@example.com', type: 'email' },
];

export interface CardSample {
  title: string;
  description: string;
  tags: string[];
  variant: NonNullable<VariantProps<typeof cardVariants>['variant']>;
}

// Same title/description/tags across every sample, varying only `variant`
// — a variant comparison needs identical content, or a height difference
// from one sample's copy just happening to be longer reads as a sizing
// bug in the component itself.
const CARD_SAMPLE_COPY = {
  title: 'Sample Card',
  description:
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.',
  tags: ['Svelte', 'Tailwind'],
};

export const cardSamples: CardSample[] = [
  { ...CARD_SAMPLE_COPY, variant: 'primary' },
  { ...CARD_SAMPLE_COPY, variant: 'primary-transparent' },
  { ...CARD_SAMPLE_COPY, variant: 'card-transparent' },
];

export const toggleSamples: { label: string; defaultPressed?: boolean; disabled?: boolean }[] = [
  { label: 'Bold' },
  { label: 'Italic', defaultPressed: true },
  { label: 'Disabled', disabled: true },
];

/** The kinds of section body this page knows how to render — see
 * showcase/components/sections/section-body.tsx for the kind -> component
 * mapping. Adding a section means: add one entry here, one to a group
 * below, and one case to that mapping — nothing about the page's overall
 * structure (App.tsx) changes. */
export type SectionKind =
  | 'getting-started'
  | 'theming'
  | 'color'
  | 'typography'
  | 'spacing'
  | 'button'
  | 'input'
  | 'mode-toggle'
  | 'password-input'
  | 'search-input'
  | 'card'
  | 'toggle'
  | 'use-theme'
  | 'use-is-mobile';

export interface PageSection {
  id: string;
  title: string;
  kind: SectionKind;
}

export interface PageGroup {
  label: string;
  sections: PageSection[];
}

/** The single source of truth for the page's structure: nav groups, main-
 * content sections, and their order all come from this one list — nothing
 * else hand-repeats a group/section name. */
export const pageGroups: PageGroup[] = [
  {
    label: 'Getting Started',
    sections: [{ id: 'getting-started', title: 'Getting Started', kind: 'getting-started' }],
  },
  {
    label: 'Theming',
    sections: [{ id: 'theming', title: 'Theming', kind: 'theming' }],
  },
  {
    label: 'Primitives',
    sections: [
      { id: 'color', title: 'Color', kind: 'color' },
      { id: 'typography', title: 'Typography', kind: 'typography' },
      { id: 'spacing', title: 'Spacing', kind: 'spacing' },
    ],
  },
  {
    label: 'Components',
    sections: [
      { id: 'button', title: 'Button', kind: 'button' },
      { id: 'card', title: 'Card', kind: 'card' },
      { id: 'input', title: 'Input', kind: 'input' },
      { id: 'mode-toggle', title: 'Mode Toggle', kind: 'mode-toggle' },
      { id: 'password-input', title: 'Password Input', kind: 'password-input' },
      { id: 'search-input', title: 'Search Input', kind: 'search-input' },
      { id: 'toggle', title: 'Toggle', kind: 'toggle' },
    ],
  },
  {
    label: 'Utils',
    sections: [
      { id: 'use-is-mobile', title: 'useIsMobile', kind: 'use-is-mobile' },
      { id: 'use-theme', title: 'useTheme', kind: 'use-theme' },
    ],
  },
];

/** "01 — getting started", "02 — theming", ... — numbered by position, so
 * reordering `pageGroups` renumbers the eyebrows for free instead of
 * needing a hand-edited number at each call site. */
export function eyebrowFor(groupIndex: number, label: string): string {
  return `${String(groupIndex + 1).padStart(2, '0')} — ${label.toLowerCase()}`;
}

export interface NavGroup {
  group: string;
  items: { id: string; label: string }[];
}

/** Derived from `pageGroups`, not hand-duplicated — the sidebar nav and
 * the main content are guaranteed to list the same sections in the same
 * order because they're built from the same source. */
export const nav: NavGroup[] = pageGroups.map((group) => ({
  group: group.label,
  items: group.sections.map((section) => ({ id: section.id, label: section.title })),
}));

/** Flattened once at module load — a stable reference, safe to pass
 * straight into `useActiveSection`'s effect dependency array. */
export const navSectionIds: string[] = pageGroups.flatMap((group) => group.sections.map((s) => s.id));
