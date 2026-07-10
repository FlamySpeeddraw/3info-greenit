import type { GeologicalPeriod } from "@/types/geological-ghg";
import styles from "./geological-ghg.module.css";

type GeologicalTimelineProps = {
  activeIndex: number;
  periods: readonly GeologicalPeriod[];
  progress: number;
};

export function GeologicalTimeline({
  activeIndex,
  periods,
  progress,
}: GeologicalTimelineProps) {
  return (
    <nav
      aria-label="Frise chronologique des périodes géologiques"
      className={styles.timeline}
    >
      <div className={styles.timelineRail} aria-hidden="true">
        <span
          className={styles.timelineProgress}
          style={{ transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})` }}
        />
      </div>

      <ol className={styles.timelineList}>
        {periods.map((period, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;

          return (
            <li
              aria-current={isActive ? "step" : undefined}
              className={[
                styles.timelineItem,
                isActive ? styles.timelineItemActive : "",
                isPast ? styles.timelineItemPast : "",
              ].join(" ")}
              key={period.id}
            >
              <span className={styles.timelineDot} aria-hidden="true" />
              <span className={styles.timelineName}>{period.name}</span>
              <span className={styles.timelineDates}>{period.dates}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
