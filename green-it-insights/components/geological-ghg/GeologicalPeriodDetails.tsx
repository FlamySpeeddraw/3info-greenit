import { Badge, Heading, Text } from "@radix-ui/themes";
import type { GeologicalPeriod } from "@/types/geological-ghg";

type GeologicalPeriodDetailsProps = {
  period: GeologicalPeriod;
};

export function GeologicalPeriodDetails({ period }: GeologicalPeriodDetailsProps) {
  return (
    <article className="grid content-start gap-2 md:gap-3">
      <header className="grid gap-1">
        <Text as="p" className="uppercase" color="brown" size="2" weight="bold">
          Période géologique
        </Text>
        <Heading as="h3" size="6">
          {period.name}
        </Heading>
        <Text as="p" color="brown" size="2">
          {period.dates}
        </Text>
      </header>

      <Text as="p" size={{ initial: "2", md: "3" }}>
        {period.description}
      </Text>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[0.85rem]">
        <section aria-labelledby={`${period.id}-gases`} className="min-w-0">
          <Heading
            as="h4"
            className="uppercase"
            color="brown"
            id={`${period.id}-gases`}
            mb="2"
            size="2"
          >
            Gaz dominants
          </Heading>
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
            {period.greenhouseGases.map((gas) => (
              <li key={gas}>
                <Badge color="grass" variant="soft">
                  {gas}
                </Badge>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={`${period.id}-events`} className="min-w-0">
          <Heading
            as="h4"
            className="uppercase"
            color="brown"
            id={`${period.id}-events`}
            mb="2"
            size="2"
          >
            Événements majeurs
          </Heading>
          <ul className="m-0 grid list-none gap-1.5 p-0">
            {period.majorEvents.map((event) => (
              <li
                className="relative pl-4 before:absolute before:left-0 before:top-[0.48rem] before:h-[0.35rem] before:w-[0.35rem] before:rounded-full before:bg-[var(--brown-9)] before:content-['']"
                key={event}
              >
                <Text as="p" className="leading-snug" size="2">
                  {event}
                </Text>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
