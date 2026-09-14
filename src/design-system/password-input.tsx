import * as React from 'react';
import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { Input } from './ui/input';
import { cn } from './lib/utils';

/** A standard `Input` (type="password") with a trailing button that
 * toggles the masked value visible/hidden — same size and styling as
 * every other input, plus the eye toggle. `className` applies to the
 * wrapper (for layout/spacing); every other prop forwards to the
 * underlying `Input` except `type`, which this component owns. */
export function PasswordInput({
  className,
  ...props
}: Omit<React.ComponentProps<'input'>, 'type'>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={cn('relative', className)}>
      <Input type={visible ? 'text' : 'password'} className="pr-8" {...props} />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2"
      >
        {visible ? <EyeClosed className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
