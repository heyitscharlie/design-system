import { useDynamicFavicon } from '../hooks/use-dynamic-favicon';

/** Renders nothing — mounts `useDynamicFavicon` for the whole app. Needs
 * to be a component (not called directly in App) since it has to sit
 * inside `ThemeProvider` to read theme state via context. */
export function FaviconSync() {
  useDynamicFavicon();
  return null;
}
