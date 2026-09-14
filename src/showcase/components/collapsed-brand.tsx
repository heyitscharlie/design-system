import { Brand } from './brand';
import { useSidebar } from '../ui/sidebar';

/** Shown only when the desktop sidebar is collapsed (offcanvas) — the
 * sidebar's own header, brand mark included, is off-screen at that point,
 * so this puts a compact, row-oriented `Brand` next to the trigger in the
 * content header instead. Mobile has its own off-canvas sheet with the
 * brand still inside it, so this renders nothing there. */
export function CollapsedBrand() {
  const { state, isMobile } = useSidebar();

  if (isMobile || state !== 'collapsed') return null;

  return <Brand className="flex-row items-center" markClassName="h-6" textClassName="text-sm" />;
}
