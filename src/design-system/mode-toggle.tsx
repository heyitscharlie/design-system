import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './theme-provider';

/** A simple light/dark toggle button, built from the Button atom. Cycles
 * between explicit "light" and "dark" (skips "system" for a predictable
 * single click).
 *
 * Resolves "system" via useState+useEffect rather than reading
 * matchMedia() directly during render — that crashes any SSR/static
 * prerender pass (no window there, e.g. next build), and even guarded
 * with a typeof-window check it would still produce a hydration mismatch
 * whenever the OS preference is dark (server would always assume light).
 * Starting from a fixed default and correcting after mount — the same
 * shape as ThemeProvider's own mode-resolution effect — keeps the first
 * client render identical to the server-rendered HTML. */
export function ModeToggle() {
  const { mode, setMode } = useTheme();
  const [systemIsDark, setSystemIsDark] = useState(false);

  useEffect(() => {
    if (mode !== 'system') return;
    const media = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => setSystemIsDark(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [mode]);

  const isDark = mode === 'dark' || (mode === 'system' && systemIsDark);

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setMode(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
