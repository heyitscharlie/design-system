import { Paragraph } from '../../../design-system/typography';
import { ModeToggle } from '../../../design-system/mode-toggle';
import { PaletteSwitcher } from '../../../design-system/palette-switcher';
import { CodeBlock } from '../code-block';
import { theming } from '../../content';

export function ThemingSection() {
  return (
    <div className="flex flex-col gap-4">
      <Paragraph>{theming.intro}</Paragraph>
      <CodeBlock code={theming.providerCode} language="tsx" />

      <Paragraph className="mt-2">{theming.hookIntro}</Paragraph>
      <CodeBlock code={theming.hookCode} language="tsx" />

      <Paragraph className="mt-2">{theming.componentsIntro}</Paragraph>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <PaletteSwitcher />
          <ModeToggle />
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          PaletteSwitcher · ModeToggle — the same pair in this page's own header
        </div>
      </div>

      <Paragraph className="text-muted-foreground mt-2 text-sm">{theming.mechanismIntro}</Paragraph>
    </div>
  );
}
