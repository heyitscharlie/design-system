import { Button } from '../../../design-system/ui/button';
import { buttonDisabledLabel, buttonSizeSamples, buttonVariantSamples } from '../../content';

export function ButtonSection() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {buttonVariantSamples.map((sample) => (
          <Button key={sample.variant} variant={sample.variant}>
            {sample.label}
          </Button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {buttonSizeSamples.map((sample) => (
          <Button key={sample.size} size={sample.size}>
            {sample.label}
          </Button>
        ))}
        <Button disabled>{buttonDisabledLabel}</Button>
      </div>
    </>
  );
}
