import type { ReactNode } from 'react';
import { Typography } from '../../design-system/typography';

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-8 first:border-t-0 first:pt-0 scroll-mt-20">
      <Typography variant="h2" className="mb-6">
        {title}
      </Typography>
      {children}
    </section>
  );
}
