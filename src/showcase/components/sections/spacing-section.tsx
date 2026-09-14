import { spacingTokens } from '../../content';

export function SpacingSection() {
  return (
    <div className="flex flex-col gap-3">
      {spacingTokens.map((step) => (
        <div key={step} className="flex items-center gap-4">
          <span className="text-muted-foreground w-6 shrink-0 font-mono text-[11px]">{step}</span>
          <div className="bg-primary h-2.5" style={{ width: `calc(var(--spacing) * ${step})` }} />
        </div>
      ))}
    </div>
  );
}
