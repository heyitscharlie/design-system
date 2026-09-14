import { WordMark } from './word-mark';
import { Typography } from '../../design-system/typography';
import { cn } from '../../design-system/lib/utils';
import { siteCopy } from '../content';

/** The wordmark + "design-system" label, as one reusable unit — used both
 * in the sidebar's own header (stacked, left-aligned) and, when the
 * sidebar is collapsed, inline next to the trigger in the content header
 * (a row), so the brand never fully disappears. No default direction or
 * alignment here: both are set by the caller via `className`, so there's
 * no base utility class for a caller to fight/override. */
export function Brand({
  className,
  markClassName,
  textClassName,
}: {
  className?: string;
  markClassName?: string;
  textClassName?: string;
}) {
  return (
    <div className={cn('flex gap-2', className)}>
      <WordMark className={cn('text-primary', markClassName)} />
      <Typography variant="subheading" className={textClassName}>
        {siteCopy.brandLabel}
      </Typography>
    </div>
  );
}
