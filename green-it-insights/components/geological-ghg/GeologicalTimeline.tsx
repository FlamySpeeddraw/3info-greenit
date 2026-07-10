import { Text } from "@radix-ui/themes";
import type { GeologicalPeriod } from "@/types/geological-ghg";

type GeologicalTimelineProps = {
  activeIndex: number;
  periods: readonly GeologicalPeriod[];
  progress: number;
};

type TimelineStepState = "active" | "past" | "upcoming";

export function GeologicalTimeline({
  activeIndex,
  periods,
  progress,
}: GeologicalTimelineProps) {
  return (
    <nav
      aria-label="Frise chronologique des périodes géologiques"
      className="relative grid gap-1.5 overflow-x-auto pb-1 md:gap-2.5 md:overflow-visible md:pb-0"
    >
      <div
        aria-hidden="true"
        className="h-1 min-w-[680px] translate-y-[1.15rem] overflow-hidden rounded-full bg-brown-dark/15 md:min-w-0 dark:bg-eco-white/15"
      >
        <span
          className="block h-full origin-left bg-linear-to-r from-[var(--grass-9)] to-[var(--brown-9)] will-change-transform"
          style={{ transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})` }}
        />
      </div>

      <ol className="relative m-0 grid min-w-[680px] list-none grid-cols-[repeat(6,112px)] gap-2 p-0 md:min-w-0 md:grid-cols-6">
        {periods.map((period, index) => {
          const state: TimelineStepState =
            index === activeIndex
              ? "active"
              : index < activeIndex
                ? "past"
                : "upcoming";

          return (
            <li
              aria-current={state === "active" ? "step" : undefined}
              className="grid min-w-0 justify-items-center gap-1 text-center opacity-55 transition-[opacity,transform] duration-200 data-[state=active]:-translate-y-0.5 data-[state=active]:opacity-100 data-[state=past]:opacity-75"
              data-state={state}
              key={period.id}
            >
              <span
                aria-hidden="true"
                className="block h-4 w-4 rounded-full border-2 border-[var(--brown-7)] bg-eco-white data-[state=active]:border-[var(--grass-9)] data-[state=active]:bg-[var(--grass-9)] data-[state=active]:shadow-[0_0_0_6px_rgba(17,47,31,0.12)] data-[state=past]:border-[var(--brown-9)] data-[state=past]:bg-[var(--brown-9)] dark:bg-oled-black"
                data-state={state}
              />
              <Text
                as="span"
                className="block min-w-0 leading-tight [overflow-wrap:anywhere]"
                size="1"
                weight="bold"
              >
                {period.name}
              </Text>
              <Text
                as="span"
                className="hidden min-w-0 leading-tight [overflow-wrap:anywhere] md:block"
                color="brown"
                size="1"
              >
                {period.dates}
              </Text>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
