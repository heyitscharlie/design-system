import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from './lib/utils';

/** An `Input` with a leading search icon — the pattern used for filtering
 * lists/nav, not a distinct input type. `className` applies to the
 * wrapper (for layout/spacing); every other prop forwards to the
 * underlying `Input`. */
export function SearchInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <div className={cn('relative', className)}>
      <Search className="text-muted-foreground pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2" />
      <Input className="h-7 pl-7 text-xs" {...props} />
    </div>
  );
}
