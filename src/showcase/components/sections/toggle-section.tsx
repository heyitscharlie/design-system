import { useState } from 'react';
import { Frown, Smile } from 'lucide-react';
import { Toggle } from '../../../design-system/ui/toggle';
import { toggleSamples } from '../../content';

/** Demos the icon size variant: a controlled toggle swapping between a
 * happy and a sad face depending on pressed state, rather than showing a
 * fixed icon regardless of state (the point of an icon toggle). */
function MoodToggle() {
  const [sad, setSad] = useState(false);

  return (
    <Toggle
      size="icon"
      pressed={sad}
      onPressedChange={setSad}
      aria-label={sad ? 'Switch to happy' : 'Switch to sad'}
    >
      {sad ? <Frown /> : <Smile />}
    </Toggle>
  );
}

export function ToggleSection() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-3">
          {toggleSamples.map((sample) => (
            <Toggle
              key={sample.label}
              defaultPressed={sample.defaultPressed}
              disabled={sample.disabled}
              aria-label={sample.label}
            >
              {sample.label}
            </Toggle>
          ))}
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          default · pressed (Italic) · disabled
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <MoodToggle />
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          icon size, controlled (click to toggle)
        </div>
      </div>
    </>
  );
}
