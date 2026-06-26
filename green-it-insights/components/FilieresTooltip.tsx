import { Button, Text, Heading } from "@radix-ui/themes";
import type { FilieresData } from "@/types/energie";
import {
  EMISSION_COLORS,
  EMISSION_THRESHOLDS,
  getEmissionLevel,
} from "./EmissionsConstants";

interface FilieresTooltipProps {
  data: FilieresData;
  onClose: () => void;
}

const INTENSITY_CONFIG = {
  VERY_HIGH: {
    label: "Très carboné",
    bgClass: "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/50",
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    valueClass: "text-red-600 dark:text-red-400",
  },
  HIGH: {
    label: "Modérément carboné",
    bgClass: "bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/50",
    badgeClass: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
    valueClass: "text-orange-600 dark:text-orange-400",
  },
  MEDIUM: {
    label: "Faiblement émetteur",
    bgClass: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-100 dark:border-yellow-900/50",
    badgeClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
    valueClass: "text-yellow-600 dark:text-yellow-400",
  },
  LOW: {
    label: "Bas-carbone",
    bgClass: "bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/50",
    badgeClass: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    valueClass: "text-green-600 dark:text-green-400",
  },
} as const satisfies Record<
  keyof typeof EMISSION_COLORS,
  { label: string; bgClass: string; badgeClass: string; valueClass: string }
>;

export function FilieresTooltip({ data, onClose }: FilieresTooltipProps) {
  const level = getEmissionLevel(data.emissionFactor);
  const config = INTENSITY_CONFIG[level];
  const dot = EMISSION_COLORS[level];

  return (
    <div
      role="dialog"
      aria-label={`Détail — ${data.name}`}
      className={`relative rounded-xl border p-6 transition-all ${config.bgClass}`}
    >
      {/* Bouton fermer — composant Button du DS Radix */}
      <Button
        variant="ghost"
        size="1"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M1 1l10 10M11 1L1 11"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </Button>

      {/* En-tête */}
      <div className="flex items-center gap-3 flex-wrap mb-5">
        <span
          className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
          style={{ backgroundColor: dot }}
          aria-hidden="true"
        />
        <Heading size="3" as="h3">
          <span aria-hidden="true" className="mr-1.5">{data.icon}</span>
          {data.name}
        </Heading>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badgeClass}`}>
          {config.label}
        </span>
      </div>

      {/* KPIs */}
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-white/70 dark:bg-black/25 rounded-lg px-4 py-3">
          <Text as="dt" size="1" weight="bold" className="uppercase tracking-wider text-[var(--color-text-muted)] mb-1 block">
            Facteur d'émission
          </Text>
          <dd className={`text-2xl font-bold tabular-nums leading-none ${config.valueClass}`}>
            {data.emissionFactor.toLocaleString("fr-FR")}
            <Text as="span" size="1" className="text-[var(--color-text-muted)] ml-1 font-normal">
              gCO₂e/kWh
            </Text>
          </dd>
        </div>

        <div className="bg-white/70 dark:bg-black/25 rounded-lg px-4 py-3">
          <Text as="dt" size="1" weight="bold" className="uppercase tracking-wider text-[var(--color-text-muted)] mb-1 block">
            Mix mondial
          </Text>
          <dd className="text-2xl font-bold tabular-nums leading-none text-[var(--color-text)]">
            {data.globalShare}
          </dd>
        </div>

        <div className="bg-white/70 dark:bg-black/25 rounded-lg px-4 py-3">
          <Text as="dt" size="1" weight="bold" className="uppercase tracking-wider text-[var(--color-text-muted)] mb-1 block">
            Pays utilisateurs
          </Text>
          <dd>
            <Text size="2" weight="medium">
              {data.exampleCountry}
            </Text>
          </dd>
        </div>
      </dl>

      {/* Description */}
      <Text as="p" size="2" className="text-[var(--color-text-muted)] leading-relaxed">
        {data.description}
      </Text>
    </div>
  );
}
