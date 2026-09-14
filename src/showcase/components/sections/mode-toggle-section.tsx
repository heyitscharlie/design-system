import { ModeToggle } from '../../../design-system/mode-toggle';
import { Paragraph } from '../../../design-system/typography';
import { CodeBlock } from '../code-block';
import { modeToggleCopy } from '../../content';

export function ModeToggleSection() {
  return (
    <div className="flex flex-col gap-4">
      <Paragraph>{modeToggleCopy.intro}</Paragraph>
      <div className="flex flex-col gap-2">
        <ModeToggle />
        <div className="font-mono text-[11px] text-muted-foreground">click to switch light/dark</div>
      </div>
      <CodeBlock code={modeToggleCopy.usageCode} language="tsx" />
    </div>
  );
}
