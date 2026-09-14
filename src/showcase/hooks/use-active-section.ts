import { useEffect, useState } from 'react';

/** Tracks which of the given section ids is currently most visible in the
 * viewport — a lightweight scroll-spy. This page has no real routing, so
 * a nav link's "active" state has to be derived from scroll position
 * instead of a URL; without this every link would either always or never
 * look active, neither of which means anything on a single page. */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      // Counts a section as "current" once it's crossed just below the
      // sticky header, and stops counting it once it's past the top 30%
      // of the viewport — approximates "whichever section heading you'd
      // actually say you're reading right now".
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // `ids` comes from a module-level constant (see showcase/content.ts) —
    // stable across renders, safe to depend on directly.
  }, [ids]);

  return activeId;
}
