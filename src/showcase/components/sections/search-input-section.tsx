import { SearchInput } from '../../../design-system/search-input';
import { siteCopy } from '../../content';

export function SearchInputSection() {
  return (
    <div className="max-w-xs">
      <SearchInput placeholder={siteCopy.searchPlaceholder} />
    </div>
  );
}
