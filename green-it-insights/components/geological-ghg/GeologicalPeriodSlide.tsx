import Image from "next/image";
import type { GeologicalPeriod } from "@/types/geological-ghg";
import { GeologicalPeriodDetails } from "./GeologicalPeriodDetails";
import { GeologicalPlaceholderIllustration } from "./GeologicalPlaceholderIllustration";
import styles from "./geological-ghg.module.css";

type GeologicalPeriodSlideProps = {
  isActive: boolean;
  period: GeologicalPeriod;
};

export function GeologicalPeriodSlide({
  isActive,
  period,
}: GeologicalPeriodSlideProps) {
  return (
    <section
      aria-hidden={!isActive}
      className={styles.periodSlide}
      data-active={isActive}
    >
      <div className={styles.illustrationFrame}>
        {period.illustration.src ? (
          <Image
            alt={period.illustration.alt}
            className={styles.periodImage}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 92vw, 78vw"
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
    </section>
  );
}
