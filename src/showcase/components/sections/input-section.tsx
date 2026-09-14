import { Input } from '../../../design-system/ui/input';
import { inputSamples } from '../../content';

export function InputSection() {
  return (
    <div className="flex max-w-xs flex-col gap-4">
      {inputSamples.map((sample) => (
        <div key={sample.label} className="flex flex-col gap-2">
          <Input
            placeholder={sample.placeholder}
            type={sample.type}
            defaultValue={sample.defaultValue}
            disabled={sample.disabled}
            aria-invalid={sample.invalid}
          />
          <div className="font-mono text-[11px] text-muted-foreground">{sample.label}</div>
        </div>
      ))}
    </div>
  );
}
