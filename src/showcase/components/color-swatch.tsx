import { useEffect, useState } from 'react';
import { useTheme } from '../../design-system/theme-provider';
import { cn } from '../../design-system/lib/utils';
import type { ColorToken } from '../content';

/** A border only earns its keep when the swatch would otherwise be
 * invisible against the page background — i.e. its resolved color is
 * literally the same as `--background`. Checked against the live computed
 * value (not the token name) so it stays correct as palettes change: reads
 * `mode`/`palette` from context purely to know when to recompute. */
export function ColorSwatch({ token }: { token: ColorToken }) {
  const { mode, palette } = useTheme();
  const [needsBorder, setNeedsBorder] = useState(false);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const swatch = styles.getPropertyValue(token.var).trim();
    const background = styles.getPropertyValue('--background').trim();
    setNeedsBorder(swatch === background);
  }, [mode, palette, token.var]);

  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn('h-14 rounded-md', needsBorder && 'border-border border')}
        style={{ background: `var(${token.var})` }}
      />
      <div className="font-mono text-[11px] text-muted-foreground">{token.name}</div>
    </div>
  );
}
