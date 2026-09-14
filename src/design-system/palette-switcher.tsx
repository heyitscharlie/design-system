import { cn } from './lib/utils';
import { useTheme, type Palette } from './theme-provider';

const palettes: { id: Palette; label: string; swatch: string }[] = [
  { id: 'mustard', label: 'Mustard', swatch: '#f2b949' },
  { id: 'space', label: 'Space', swatch: '#a710f9' },
];

/** Segmented control for switching between the "mustard" and "space" brand
 * palettes. Built from plain buttons (not the Button atom) since it's a
 * tight segmented-control shape, not a standalone button. */
export function PaletteSwitcher() {
  const { palette, setPalette } = useTheme();

  return (
    <div className="border-border bg-card inline-flex items-center gap-0.5 rounded-md border p-0.5">
      {palettes.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => setPalette(p.id)}
          aria-pressed={palette === p.id}
          className={cn(
            'flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs font-medium transition-colors',
            palette === p.id
              ? 'bg-secondary text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <span
            className="size-2 rounded-full"
            style={{ background: p.swatch }}
            aria-hidden="true"
          />
          {p.label}
        </button>
      ))}
    </div>
  );
}
