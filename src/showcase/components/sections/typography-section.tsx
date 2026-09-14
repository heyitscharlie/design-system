import { Typography } from '../../../design-system/typography';
import { typeSampleAttribution, typeSamples, typeSampleText } from '../../content';

export function TypographySection() {
  return (
    <div className="flex flex-col gap-4">
      {typeSamples.map((sample) => (
        <div key={sample.label} className="flex items-baseline gap-4">
          <span className="text-muted-foreground w-28 shrink-0 font-mono text-[11px]">{sample.label}</span>
          <Typography variant={sample.variant}>{typeSampleText}</Typography>
        </div>
      ))}
      <div className="text-muted-foreground pl-32 font-mono text-[11px]">{typeSampleAttribution}</div>
    </div>
  );
}
