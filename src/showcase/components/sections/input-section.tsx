import { Input } from '../../../design-system/ui/input';
import { inputSamples } from '../../content';

export function InputSection() {
  return (
    <div className="flex max-w-xs flex-col gap-3">
      {inputSamples.map((sample) => (
        <Input
          key={sample.placeholder}
          placeholder={sample.placeholder}
          type={sample.type}
          disabled={sample.disabled}
          aria-invalid={sample.invalid}
        />
      ))}
    </div>
  );
}
