import { Paragraph } from '../../../design-system/typography';
import { CodeBlock } from '../code-block';
import { gettingStarted } from '../../content';

export function GettingStartedSection() {
  return (
    <div className="flex flex-col gap-4">
      <Paragraph>{gettingStarted.intro}</Paragraph>
      <CodeBlock code={gettingStarted.installCommand} language="bash" />

      <Paragraph className="mt-2">{gettingStarted.stylesIntro}</Paragraph>
      <CodeBlock code={gettingStarted.stylesCode} language="css" />
      <Paragraph className="text-muted-foreground text-sm">{gettingStarted.stylesWarning}</Paragraph>

      <Paragraph className="mt-2">{gettingStarted.usageIntro}</Paragraph>
      <CodeBlock code={gettingStarted.usageCode} language="tsx" />
    </div>
  );
}
