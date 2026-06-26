import type { FilieresData } from "@/types/energie";

interface FilieresTooltipProps {
  data: FilieresData;
  onClose: () => void;
}

function getIntensity(value: number) {
  if (value >= 600)
    return {
      label: "Très carboné",
      colorClass: "text-red-600 dark:text-red-400",
      bgClass: "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/50",
      badgeClass: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
      dot: "#c0392b",
    };
  if (value >= 200)
    return {
      label: "Modérément carboné",
      colorClass: "text-orange-600 dark:text-orange-400",
      bgClass: "bg-orange-50 dark:bg-orange-950/20 border-orange-100 dark:border-orange-900/50",
      badgeClass: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
      dot: "#e67e22",
    };
  if (value >= 50)
    return {
      label: "Faiblement émetteur",
      colorClass: "text-yellow-600 dark:text-yellow-400",
      bgClass: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-100 dark:border-yellow-900/50",
      badgeClass: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
      dot: "#f1c40f",
    };
  return {
    label: "Bas-carbone",
    colorClass: "text-green-600 dark:text-green-400",
    bgClass: "bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/50",
    badgeClass: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    dot: "#27ae60",
  };
}

export function FilieresTooltip({ data, onClose }: FilieresTooltipProps) {
  const intensity = getIntensity(data.emissionFactor);

  return (
    <div
      role="dialog"
      aria-label={`Détail — ${data.name}`}
      className={`relative rounded-xl border p-6 ${intensity.bgClass} transition-all`}
    >
      {/* Fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full
                   text-[var(--color-text-muted)] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
        </svg>
      </button>

      {/* En-tête */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="w-2.5 h-2.5 rounded-sm flex-shrink-0 mt-0.5"
          style={{ backgroundColor: intensity.dot }}
          aria-hidden="true"
        />
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-semibold text-[var(--color-text)] text-base leading-tight">
            <span aria-hidden="true" className="mr-1.5">{data.icon}</span>
            {data.name}
          </h3>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${intensity.badgeClass}`}>
            {intensity.label}
          </span>
        </div>
      </div>

      {/* KPIs */}
      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-white/70 dark:bg-black/25 rounded-lg px-4 py-3">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
            Facteur d'émission
          </dt>
          <dd className={`text-2xl font-bold tabular-nums leading-none ${intensity.colorClass}`}>
            {data.emissionFactor.toLocaleString("fr-FR")}
            <span className="text-xs font-normal text-[var(--color-text-muted)] ml-1">gCO₂e/kWh</span>
          </dd>
        </div>

        <div className="bg-white/70 dark:bg-black/25 rounded-lg px-4 py-3">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
            Mix mondial
          </dt>
          <dd className="text-2xl font-bold tabular-nums leading-none text-[var(--color-text)]">
            {data.globalShare}
          </dd>
        </div>

        <div className="bg-white/70 dark:bg-black/25 rounded-lg px-4 py-3">
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
            Pays utilisateurs
          </dt>
          <dd className="text-sm font-medium text-[var(--color-text)] leading-snug">
            {data.exampleCountry}
          </dd>
        </div>
      </dl>

      {/* Description */}
      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
        {data.description}
      </p>
    </div>
  );
}
