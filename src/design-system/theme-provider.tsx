import { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type Palette = 'mustard' | 'space';

export interface ThemeState {
  /** Light/dark preference. 'system' follows the OS and stays in sync if it changes. */
  mode: ThemeMode;
  /** Brand palette — independent of light/dark. */
  palette: Palette;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
  defaultPalette?: Palette;
  /** localStorage key the combined { mode, palette } state is persisted under. */
  storageKey?: string;
}

interface ThemeContextValue extends ThemeState {
  setMode: (mode: ThemeMode) => void;
  setPalette: (palette: Palette) => void;
}

const defaultState: ThemeState = { mode: 'system', palette: 'mustard' };

const ThemeProviderContext = createContext<ThemeContextValue>({
  ...defaultState,
  setMode: () => null,
  setPalette: () => null,
});

function readStoredState(storageKey: string, fallback: ThemeState): ThemeState {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<ThemeState>;
    return {
      mode: parsed.mode ?? fallback.mode,
      palette: parsed.palette ?? fallback.palette,
    };
  } catch {
    return fallback;
  }
}

/** Wraps your app to provide both axes of theming — light/dark `mode` and
 * brand `palette` — as one unit: a single provider, a single `useTheme()`
 * hook, and one localStorage entry, rather than two parallel contexts.
 * Applies `.light`/`.dark` and `data-palette` to `<html>` to match the
 * selectors defined in `index.css`. */
export function ThemeProvider({
  children,
  defaultMode = defaultState.mode,
  defaultPalette = defaultState.palette,
  storageKey = 'design-system-theme',
  ...props
}: ThemeProviderProps) {
  // Starts from the props, identically on the server and on the client's
  // first (hydration) render — NOT from localStorage. Reading storage
  // inside this initializer, even lazily, still runs during the client's
  // first render, and the server never has access to it at all; the two
  // renders diverge the moment a stored preference differs from the
  // defaults (e.g. stored mode "dark" vs. a server that can only assume
  // "system"), which is exactly what produces a hydration mismatch in
  // anything — like ModeToggle — that branches its output on `mode`. The
  // stored preference (if any) is applied below, once, after mount.
  const [state, setState] = useState<ThemeState>({ mode: defaultMode, palette: defaultPalette });

  // Apply a stored preference after mount, as a plain client-side update
  // rather than part of the hydration diff — the same "start from the
  // safe default, correct once mounted" shape as the .light/.dark class
  // effect below (which the same reasoning already covers via
  // suppressHydrationWarning on <html> at the call site).
  useEffect(() => {
    setState(readStoredState(storageKey, { mode: defaultMode, palette: defaultPalette }));
    // Only ever meant to run once, on mount, to adopt a stored value —
    // re-running on prop changes would stomp a user's live selection.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Resolve + apply .light/.dark, and keep it in sync with the OS while mode === 'system'.
  useEffect(() => {
    const root = window.document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const apply = () => {
      root.classList.remove('light', 'dark');
      const resolved = state.mode === 'system' ? (media.matches ? 'dark' : 'light') : state.mode;
      root.classList.add(resolved);
    };

    apply();
    if (state.mode !== 'system') return;
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, [state.mode]);

  // Apply data-palette (mustard is the attribute-less default in index.css).
  useEffect(() => {
    const root = window.document.documentElement;
    if (state.palette === 'mustard') {
      root.removeAttribute('data-palette');
    } else {
      root.setAttribute('data-palette', state.palette);
    }
  }, [state.palette]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const value: ThemeContextValue = {
    ...state,
    setMode: (mode) => setState((s) => ({ ...s, mode })),
    setPalette: (palette) => setState((s) => ({ ...s, palette })),
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
