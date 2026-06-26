// Pas de 'use client' — rendu possible côté serveur si nécessaire,
// mais utilisé uniquement depuis EmissionsBarChart (déjà client)
import type { FilieresData } from "@/types/energie";

interface FilieresTooltipProps {
  data: FilieresData;
  onClose: () => void;
}

type Intensity = {
  label: string;
  bg: string;
  border: string;
  badge: string;
};

function getIntensity(value: number): Intensity {
  if (value >= 600)
    return {
      label: "Très carboné",
      bg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-800",
      badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
  if (value >= 200)
    return {
      label: "Modérément carboné",
      bg: "bg-orange-50 dark:bg-orange-950/30",
      border: "border-orange-200 dark:border-orange-800",
      badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    };
  if (value >= 50)
    return {
      label: "Faiblement émetteur",
      bg: "bg-yellow-50 dark:bg-yellow-950/30",
      border: "border-yellow-200 dark:border-yellow-800",
      badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };
  return {
    label: "Bas-carbone",
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };
}

export function FilieresTooltip({ data, onClose }: FilieresTooltipProps) {
  const intensity = getIntensity(data.emissionFactor);

  return (
    <div
      role="dialog"
      aria-label={`Détail de la filière ${data.name}`}
      className={`relative rounded-xl border p-5 transition-all ${intensity.bg} ${intensity.border}`}
    >
      {/* Fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer le détail"
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full
                   text-[var(--color-text-muted)] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* En-tête */}
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl" aria-hidden="true">{data.icon}</span>
        <div>
          <h3 className="font-semibold text-[var(--color-text)] text-lg leading-tight">
            {data.name}
          </h3>
          <span className={`mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded-full ${intensity.badge}`}>
            {intensity.label}
          </span>
        </div>
      </div>

      {/* 3 KPIs */}
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/60 dark:bg-black/20 rounded-lg px-4 py-3">
          <dt className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
            Facteur d'émission
          </dt>
          <dd className="text-xl font-bold tabular-nums text-[var(--color-text)]">
            {data.emissionFactor.toLocaleString("fr-FR")}
            <span className="text-sm font-normal ml-1">gCO₂e/kWh</span>
          </dd>
        </div>

        <div className="bg-white/60 dark:bg-black/20 rounded-lg px-4 py-3">
          <dt className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
            Part dans le mix mondial
          </dt>
          <dd className="text-xl font-bold tabular-nums text-[var(--color-text)]">
            {data.globalShare}
          </dd>
        </div>

        <div className="bg-white/60 dark:bg-black/20 rounded-lg px-4 py-3">
          <dt className="text-xs text-[var(--color-text-muted)] uppercase tracking-wide mb-1">
            Exemple de pays
          </dt>
          <dd className="text-sm font-medium text-[var(--color-text)]">
            {data.exampleCountry}
          </dd>
        </div>
      </dl>

      {/* Description */}
      <p className="mt-3 text-sm text-[var(--color-text-muted)] leading-relaxed">
        {data.description}
      </p>
    </div>
  );
}
