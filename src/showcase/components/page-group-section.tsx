import { GroupEyebrow } from './group-eyebrow';
import { Section } from './section';
import { SectionBody } from './sections/section-body';
import { eyebrowFor, type PageGroup } from '../content';

/** One group of the page: its eyebrow, then every one of its sections —
 * the single component the page maps over, so adding, removing, or
 * reordering a group/section never touches App.tsx. */
export function PageGroupSection({ group, index }: { group: PageGroup; index: number }) {
  return (
    <div>
      <GroupEyebrow>{eyebrowFor(index, group.label)}</GroupEyebrow>
      {group.sections.map((section) => (
        <Section key={section.id} id={section.id} title={section.title}>
          <SectionBody kind={section.kind} />
        </Section>
      ))}
    </div>
  );
}
