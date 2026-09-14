import type { ReactNode } from 'react';

export function GroupEyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="text-accent mt-12 mb-2 font-mono text-xs tracking-wide first:mt-0">
      {children}
    </div>
  );
}
