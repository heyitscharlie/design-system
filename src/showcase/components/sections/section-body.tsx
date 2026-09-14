import type { ComponentType } from 'react';
import type { SectionKind } from '../../content';
import { ColorSection } from './color-section';
import { TypographySection } from './typography-section';
import { SpacingSection } from './spacing-section';
import { ButtonSection } from './button-section';
import { InputSection } from './input-section';
import { SearchInputSection } from './search-input-section';

const sectionBodies: Record<SectionKind, ComponentType> = {
  color: ColorSection,
  typography: TypographySection,
  spacing: SpacingSection,
  button: ButtonSection,
  input: InputSection,
  'search-input': SearchInputSection,
};

/** Renders the right demo for a section's `kind` — the switch lives here,
 * once, so nothing else needs to know how many kinds of section exist. */
export function SectionBody({ kind }: { kind: SectionKind }) {
  const Body = sectionBodies[kind];
  return <Body />;
}
