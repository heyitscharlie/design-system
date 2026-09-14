import { Card, CardDescription, CardFooter, CardTitle } from '../../../design-system/ui/card';
import { cardSamples } from '../../content';

export function CardSection() {
  return (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cardSamples.map((sample) => (
        <div key={sample.title} className="flex flex-col gap-2">
          <Card variant={sample.variant}>
            <CardTitle>{sample.title}</CardTitle>
            <CardDescription>{sample.description}</CardDescription>
            <CardFooter>
              {sample.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </CardFooter>
          </Card>
          <div className="font-mono text-[11px] text-muted-foreground">{sample.variant}</div>
        </div>
      ))}
    </div>
  );
}
