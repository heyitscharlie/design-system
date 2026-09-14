import * as React from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from './lib/utils';

/** A standard `Input` with a leading search icon — same size and styling
 * as every other input, not a smaller/compact variant of its own.
 * `className` applies to the wrapper (for layout/spacing); every other
 * prop forwards to the underlying `Input`. */
export function SearchInput({ className, ...props }: React.ComponentProps<'input'>) {
  return (
    <div className={cn('relative', className)}>
      <Search className="text-muted-foreground pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2" />
      <Input className="pl-8" {...props} />
    </div>
  );
}
