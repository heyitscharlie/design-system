import { useIsMobile } from '../../../design-system/hooks/use-mobile';
import { Paragraph } from '../../../design-system/typography';
import { CodeBlock } from '../code-block';
import { useIsMobileCopy } from '../../content';

export function UseIsMobileSection() {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-4">
      <Paragraph>{useIsMobileCopy.intro}</Paragraph>
      <CodeBlock code={useIsMobileCopy.usageCode} language="tsx" />
      <div className="font-mono text-[11px] text-muted-foreground">
        live from this window: {String(isMobile)}
      </div>
    </div>
  );
}
