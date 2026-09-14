import { SearchInput } from '../../../design-system/search-input';
import { siteCopy } from '../../content';

export function SearchInputSection() {
  return (
    <div className="flex max-w-xs flex-col gap-2">
      <SearchInput placeholder={siteCopy.searchPlaceholder} />
      <div className="font-mono text-[11px] text-muted-foreground">Input + leading icon</div>
    </div>
  );
}
