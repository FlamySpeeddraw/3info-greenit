import type { GeologicalIllustrationTone } from "@/types/geological-ghg";
import styles from "./geological-ghg.module.css";

type GeologicalPlaceholderIllustrationProps = {
  alt: string;
  tone: GeologicalIllustrationTone;
};

const toneClassNames: Record<GeologicalIllustrationTone, string> = {
  volcanic: styles.placeholderVolcanic,
  oceanic: styles.placeholderOceanic,
  forest: styles.placeholderForest,
  coast: styles.placeholderCoast,
  ice: styles.placeholderIce,
  industrial: styles.placeholderIndustrial,
};

export function GeologicalPlaceholderIllustration({
  alt,
  tone,
}: GeologicalPlaceholderIllustrationProps) {
  return (
    <div
      aria-label={alt}
      className={`${styles.placeholderIllustration} ${toneClassNames[tone]}`}
      role="img"
    >
      <span className={styles.placeholderSky} aria-hidden="true" />
      <span className={styles.placeholderSun} aria-hidden="true" />
      <span className={styles.placeholderHorizon} aria-hidden="true" />
      <span className={styles.placeholderGround} aria-hidden="true" />
      <span className={styles.placeholderTraceOne} aria-hidden="true" />
      <span className={styles.placeholderTraceTwo} aria-hidden="true" />
    </div>
  );
}
