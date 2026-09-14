import type { VariantProps } from 'class-variance-authority';
import type { TypographyVariant } from '../design-system/typography';
import type { buttonVariants } from '../design-system/ui/button';

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

export const inputSamples: { placeholder: string; disabled?: boolean; invalid?: boolean; type?: string }[] = [
  { placeholder: 'Email address', type: 'email' },
  { placeholder: 'Disabled', disabled: true },
  { placeholder: 'Invalid', invalid: true },
];

/** The kinds of section body this page knows how to render — see
 * showcase/components/sections/section-body.tsx for the kind -> component
 * mapping. Adding a section means: add one entry here, one to a group
 * below, and one case to that mapping — nothing about the page's overall
 * structure (App.tsx) changes. */
export type SectionKind = 'color' | 'typography' | 'spacing' | 'button' | 'input' | 'search-input';

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
    label: 'Foundations',
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
      { id: 'input', title: 'Input', kind: 'input' },
      { id: 'search-input', title: 'Search Input', kind: 'search-input' },
    ],
  },
];

/** "01 — foundations", "02 — components", ... — numbered by position, so
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
