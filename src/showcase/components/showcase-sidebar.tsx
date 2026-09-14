import { SearchInput } from '../../design-system/search-input';
import { Brand } from './brand';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { siteCopy, type NavGroup } from '../content';

/** The showcase page's sidebar — brand mark + search up top, filtered nav
 * groups below. Presentational only: filtering happens in App.tsx (it
 * owns the search-query state), this just renders whatever `groups` it's
 * given. */
export function ShowcaseSidebar({
  query,
  onQueryChange,
  groups,
  activeId,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  groups: NavGroup[];
  activeId: string | null;
}) {
  return (
    <Sidebar>
      <SidebarHeader className="gap-4 pt-3 pb-2">
        <Brand className="flex-col items-start gap-2" markClassName="h-12" />
        <SearchInput
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={siteCopy.searchPlaceholder}
        />
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.group}>
            <SidebarGroupLabel className="font-mono text-[11px] uppercase tracking-wide">
              {group.group}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild size="sm" isActive={item.id === activeId}>
                      <a href={`#${item.id}`}>{item.label}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        {groups.length === 0 && (
          <div className="text-muted-foreground px-4 py-2 text-sm">{siteCopy.noMatches}</div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
