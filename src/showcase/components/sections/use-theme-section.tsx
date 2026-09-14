import { useTheme } from '../../../design-system/theme-provider';
import { Paragraph } from '../../../design-system/typography';
import { CodeBlock } from '../code-block';
import { useThemeCopy } from '../../content';

export function UseThemeSection() {
  const { mode, palette } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      <Paragraph>{useThemeCopy.intro}</Paragraph>
      <CodeBlock code={useThemeCopy.usageCode} language="tsx" />
      <div className="font-mono text-[11px] text-muted-foreground">
        live from this page: mode is &quot;{mode}&quot; · palette is &quot;{palette}&quot;
      </div>
    </div>
  );
}
