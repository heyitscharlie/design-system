import { useMemo, useState } from 'react';
import { ModeToggle } from './design-system/mode-toggle';
import { PaletteSwitcher } from './design-system/palette-switcher';
import { ThemeProvider } from './design-system/theme-provider';
import { Typography } from './design-system/typography';
import { PageGroupSection } from './showcase/components/page-group-section';
import { ShowcaseSidebar } from './showcase/components/showcase-sidebar';
import { CollapsedBrand } from './showcase/components/collapsed-brand';
import { FaviconSync } from './showcase/components/favicon-sync';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './showcase/ui/sidebar';
import { useActiveSection } from './showcase/hooks/use-active-section';
import { nav, navSectionIds, pageGroups, pageIntro, siteCopy } from './showcase/content';

/** The showcase page — composition and layout only. No copy, no design
 * tokens, no page structure: all of that lives in src/showcase/content.ts
 * and src/themes/. `pageGroups` is the single source both the sidebar nav
 * and the main content are built from. */
function App() {
  const [query, setQuery] = useState('');
  const activeId = useActiveSection(navSectionIds);

  const filteredNav = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return nav;
    return nav
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.label.toLowerCase().includes(q)),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <ThemeProvider defaultMode="system" defaultPalette="mustard" storageKey="design-system-theme">
      <FaviconSync />
      <SidebarProvider>
        <ShowcaseSidebar query={query} onQueryChange={setQuery} groups={filteredNav} activeId={activeId} />

        <SidebarInset>
          <header className="border-border bg-background/90 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-3 backdrop-blur">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <CollapsedBrand />
            </div>
            <div className="flex items-center gap-2">
              <PaletteSwitcher />
              <ModeToggle />
            </div>
          </header>

          <main className="min-w-0 flex-1 px-8 py-12">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12">
                <Typography variant="h1">{pageIntro.title}</Typography>
                <Typography variant="body" className="text-muted-foreground mt-3 max-w-xl">
                  {pageIntro.description}
                </Typography>
              </div>

              {pageGroups.map((group, index) => (
                <PageGroupSection key={group.label} group={group} index={index} />
              ))}
            </div>
          </main>

          <footer className="border-border text-muted-foreground border-t px-6 py-8 text-left font-mono text-xs">
            {siteCopy.footer}
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
