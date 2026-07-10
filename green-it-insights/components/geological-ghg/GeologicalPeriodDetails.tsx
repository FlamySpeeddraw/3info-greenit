import { Badge, Heading, Text } from "@radix-ui/themes";
import type { GeologicalPeriod } from "@/types/geological-ghg";
import styles from "./geological-ghg.module.css";

type GeologicalPeriodDetailsProps = {
  period: GeologicalPeriod;
};

export function GeologicalPeriodDetails({ period }: GeologicalPeriodDetailsProps) {
  return (
    <article className={styles.periodDetails}>
      <header className={styles.periodHeader}>
        <Text as="p" className={styles.periodEyebrow} size="2" weight="bold">
          Période géologique
        </Text>
        <Heading as="h3" className={styles.periodTitle} size="6">
          {period.name}
        </Heading>
        <Text as="p" className={styles.periodDates} color="brown" size="3">
          {period.dates}
        </Text>
      </header>

      <Text as="p" className={styles.periodDescription} size="3">
        {period.description}
      </Text>

      <div className={styles.periodMetaGrid}>
        <section className={styles.periodMetaBlock} aria-labelledby={`${period.id}-gases`}>
          <Heading
            as="h4"
            className={styles.periodMetaTitle}
            id={`${period.id}-gases`}
            size="2"
          >
            Gaz dominants
          </Heading>
          <ul className={styles.gasList}>
            {period.greenhouseGases.map((gas) => (
              <li key={gas}>
                <Badge color="grass" variant="soft">
                  {gas}
                </Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.periodMetaBlock} aria-labelledby={`${period.id}-events`}>
          <Heading
            as="h4"
            className={styles.periodMetaTitle}
            id={`${period.id}-events`}
            size="2"
          >
            Événements majeurs
          </Heading>
          <ul className={styles.eventList}>
            {period.majorEvents.map((event) => (
              <li key={event}>{event}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
