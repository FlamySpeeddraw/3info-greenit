import Link from "next/link";
import styles from "./geological-ghg.module.css";

type GeologicalFinalCtaProps = {
  isVisible: boolean;
};

export function GeologicalFinalCta({ isVisible }: GeologicalFinalCtaProps) {
  return (
    <aside
      aria-hidden={!isVisible}
      className={styles.finalCta}
      data-visible={isVisible}
    >
      <p className={styles.finalCtaLabel}>Fin du voyage geologique</p>
      <Link className={styles.finalCtaLink} href="/">
        Continuer l&apos;exploration
      </Link>
    </aside>
  );
}
