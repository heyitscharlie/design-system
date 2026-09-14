import { useEffect } from 'react';
import { useTheme } from '../../design-system/theme-provider';

let cachedPathPromise: Promise<string> | null = null;

/** The tear mark's path geometry lives in exactly one place — the static
 * public/favicon.svg — so this fetches it from there instead of
 * duplicating the path data as a JS constant. Cached as a promise: once
 * fetched, later calls reuse the same resolved value for free. */
function getTearPath(): Promise<string> {
  cachedPathPromise ??= fetch('/favicon.svg')
    .then((res) => res.text())
    .then((svgText) => {
      const match = svgText.match(/<path[^>]*\sd="([^"]+)"/);
      if (!match) throw new Error('favicon.svg: no <path d="..."> found to recolor');
      return match[1];
    });
  return cachedPathPromise;
}

/** Keeps the browser tab favicon in sync with the active theme's
 * `--primary` — mustard doesn't change between light/dark, so in practice
 * this only actually swaps anything for the space palette. Re-runs
 * whenever `mode`/`palette` change; the `requestAnimationFrame` waits a
 * frame so ThemeProvider's own effect (which applies the `.dark`/
 * `data-palette` classes `--primary` resolves against) has definitely
 * committed before we read the computed value. */
export function useDynamicFavicon() {
  const { mode, palette } = useTheme();

  useEffect(() => {
    let cancelled = false;

    getTearPath().then((path) => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        if (cancelled) return;

        const color = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        if (!color) return;

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.56 39.6" fill="${color}"><path d="${path}"/></svg>`;
        const href = `data:image/svg+xml,${encodeURIComponent(svg)}`;

        let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.type = 'image/svg+xml';
        link.href = href;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [mode, palette]);
}
