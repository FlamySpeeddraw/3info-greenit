import Image from "next/image";
import type { GeologicalPeriod } from "@/types/geological-ghg";
import { GeologicalPeriodDetails } from "./GeologicalPeriodDetails";
import { GeologicalPlaceholderIllustration } from "./GeologicalPlaceholderIllustration";

type GeologicalPeriodSlideProps = {
  isActive: boolean;
  period: GeologicalPeriod;
};

export function GeologicalPeriodSlide({
  isActive,
  period,
}: GeologicalPeriodSlideProps) {
  return (
    <li
      className="grid content-start gap-2 rounded-lg border border-brown-dark/10 bg-eco-white/80 p-3 opacity-60 transition-[opacity,border-color] duration-300 data-[state=active]:border-[var(--grass-9)]/50 data-[state=active]:opacity-100 md:min-h-[70vh] md:gap-3 md:p-4 dark:border-eco-white/10 dark:bg-oled-gray/80"
      data-state={isActive ? "active" : "inactive"}
    >
      <div className="relative aspect-video overflow-hidden rounded-md border border-brown-dark/15 bg-[var(--brown-2)] dark:border-eco-white/10">
        {period.illustration.src ? (
          <Image
            alt={period.illustration.alt}
            className="object-cover"
            fill
            loading="lazy"
            sizes="(max-width: 768px) 92vw, 44vw"
            src={period.illustration.src}
          />
        ) : (
          <GeologicalPlaceholderIllustration
            alt={period.illustration.alt}
            tone={period.illustration.tone}
          />
        )}
      </div>

      <GeologicalPeriodDetails period={period} />
    </li>
  );
}
