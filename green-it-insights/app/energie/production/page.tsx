import { EmissionsBarChart } from "@/components/EmissionsBarChart";
import { ENERGY_DATA } from "./energyData";

export const metadata = {
  title: "Types de production d'énergie et impact sur les GES | Green IT Insights",
  description:
    "Infographie comparative des facteurs d'émission (gCO₂e/kWh) par filière de production d'énergie — données ADEME Base Carbone®.",
};

export default function ProductionPage() {
  const sortedData = [...ENERGY_DATA].sort(
    (a, b) => b.emissionFactor - a.emissionFactor
  );

  return (
    <main className="min-h-screen bg-[var(--color-bg)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* ── En-tête ────────────────────────────────────────── */}
        <header className="mb-10">
          <nav aria-label="Fil d'Ariane" className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
              <li><a href="/" className="hover:text-[var(--color-primary)] transition-colors">Accueil</a></li>
              <li aria-hidden="true" className="text-[var(--color-text-faint)]">/</li>
              <li><a href="/energie" className="hover:text-[var(--color-primary)] transition-colors">Énergie</a></li>
              <li aria-hidden="true" className="text-[var(--color-text-faint)]">/</li>
              <li aria-current="page" className="text-[var(--color-text)]">Production</li>
            </ol>
          </nav>

          <div className="flex items-start gap-3 mb-3">
            <span
              className="mt-1 flex-shrink-0 w-8 h-8 rounded-md bg-[var(--color-primary-highlight)]
                         flex items-center justify-center"
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                   stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text)] leading-tight">
              Production d'énergie &amp; émissions de GES
            </h1>
          </div>

          <p className="text-[var(--color-text-muted)] text-base max-w-2xl leading-relaxed">
            Le choix de la filière énergétique est l'un des leviers les plus puissants dans la lutte
            contre le changement climatique. Comparez le facteur d'émission de chaque mode de production
            en <strong className="text-[var(--color-text)]">gCO₂e/kWh</strong> — sur l'ensemble du cycle de vie.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs text-[var(--color-text-muted)]
                          bg-[var(--color-surface-offset)] border border-[var(--color-border)]
                          rounded-full px-3 py-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
            </svg>
            Analyse du Cycle de Vie (ACV) — Construction, exploitation et démantèlement inclus
          </div>
        </header>

        {/* ── Graphique ──────────────────────────────────────── */}
        <section
          aria-labelledby="chart-heading"
          className="bg-[var(--color-surface)] border border-[var(--color-border)]
                     rounded-2xl p-5 sm:p-8 shadow-[var(--shadow-md)] mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div>
              <h2 id="chart-heading" className="text-lg font-semibold text-[var(--color-text)]">
                Facteurs d'émission par filière
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                Unité : gCO₂e/kWh · Triées du plus au moins émetteur
              </p>
            </div>
            <span className="text-xs text-[var(--color-text-faint)] sm:text-right">
              Cliquez sur une barre pour le détail
            </span>
          </div>

          {/* Client component — 'use client' déclaré dans EmissionsBarChart.tsx */}
          <EmissionsBarChart data={sortedData} />
        </section>

        {/* ── Clés de lecture ────────────────────────────────── */}
        <section aria-labelledby="reading-key-heading" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <h2 id="reading-key-heading" className="sr-only">Clés de lecture</h2>
          {[
            {
              icon: "🏭",
              title: "Fossiles",
              range: "> 400 gCO₂e/kWh",
              text: "Charbon, fioul et gaz naturel cumulent les ¾ du mix mondial mais concentrent l'essentiel des émissions du secteur électrique.",
            },
            {
              icon: "🌿",
              title: "Renouvelables variables",
              range: "10 – 50 gCO₂e/kWh",
              text: "Éolien et solaire présentent des bilans ACV faibles, principalement liés à la fabrication des équipements.",
            },
            {
              icon: "⚛️",
              title: "Bas-carbone pilotable",
              range: "6 – 15 gCO₂e/kWh",
              text: "Nucléaire et hydraulique offrent une production stable et quasi décarbonée, essentiels pour équilibrer le réseau.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-surface)] border border-[var(--color-border)]
                         rounded-xl p-4 shadow-[var(--shadow-sm)]"
            >
              <div className="text-2xl mb-2" aria-hidden="true">{item.icon}</div>
              <h3 className="font-semibold text-[var(--color-text)] text-sm mb-0.5">{item.title}</h3>
              <p className="text-xs text-[var(--color-primary)] font-mono mb-2">{item.range}</p>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </section>

        {/* ── Sources ────────────────────────────────────────── */}
        <footer className="border-t border-[var(--color-divider)] pt-6 pb-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-faint)] mb-3">
            Sources des données
          </h2>
          <ul className="space-y-1.5 text-sm text-[var(--color-text-muted)]">
            <li>
              <span className="font-medium text-[var(--color-text)]">ADEME — Base Carbone®</span>{" · "}
              <a href="https://www.bilans-ges.ademe.fr" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--color-primary)] hover:underline">
                bilans-ges.ademe.fr
              </a>
            </li>
            <li>
              <span className="font-medium text-[var(--color-text)]">Notre Environnement — Ministère de la Transition Écologique</span>{" · "}
              <a href="https://notre-environnement.gouv.fr" target="_blank" rel="noopener noreferrer"
                 className="text-[var(--color-primary)] hover:underline">
                notre-environnement.gouv.fr
              </a>
            </li>
            <li>
              <span className="font-medium text-[var(--color-text)]">Méthode</span>
              {" · "}Analyse du Cycle de Vie (ACV) — données moyennes mondiales 2022–2024
            </li>
          </ul>
        </footer>

      </div>
    </main>
  );
}
