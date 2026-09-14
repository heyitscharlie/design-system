import type { ComponentType } from 'react';
import type { SectionKind } from '../../content';
import { ColorSection } from './color-section';
import { TypographySection } from './typography-section';
import { SpacingSection } from './spacing-section';
import { ButtonSection } from './button-section';
import { InputSection } from './input-section';
import { SearchInputSection } from './search-input-section';
import { CardSection } from './card-section';
import { ToggleSection } from './toggle-section';
import { PasswordInputSection } from './password-input-section';
import { GettingStartedSection } from './getting-started-section';
import { ThemingSection } from './theming-section';
import { ModeToggleSection } from './mode-toggle-section';
import { UseThemeSection } from './use-theme-section';
import { UseIsMobileSection } from './use-is-mobile-section';

const sectionBodies: Record<SectionKind, ComponentType> = {
  'getting-started': GettingStartedSection,
  theming: ThemingSection,
  color: ColorSection,
  typography: TypographySection,
  spacing: SpacingSection,
  button: ButtonSection,
  input: InputSection,
  'mode-toggle': ModeToggleSection,
  'password-input': PasswordInputSection,
  'search-input': SearchInputSection,
  card: CardSection,
  toggle: ToggleSection,
  'use-theme': UseThemeSection,
  'use-is-mobile': UseIsMobileSection,
};

/** Renders the right demo for a section's `kind` — the switch lives here,
 * once, so nothing else needs to know how many kinds of section exist. */
export function SectionBody({ kind }: { kind: SectionKind }) {
  const Body = sectionBodies[kind];
  return <Body />;
}
