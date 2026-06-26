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
      <div className="max-w-6xl mx-auto">

        {/* ── En-tête ─────────────────────────────────────────── */}
        <header className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
            Infographie · Émissions de GES
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] leading-tight mb-4">
            Quelle filière énergétique <br className="hidden sm:block" />
            pour le climat ?
          </h1>
          <p className="text-[var(--color-text-muted)] text-base max-w-xl leading-relaxed">
            Toutes les sources d'énergie ne se valent pas. Comparez leur empreinte carbone
            en <strong className="text-[var(--color-text)] font-semibold">gCO₂e par kWh produit</strong>,
            en tenant compte de l'ensemble du cycle de vie — de la construction au démantèlement.
          </p>
        </header>

        {/* ── Graphique ──────────────────────────────────────── */}
        <section
          aria-labelledby="chart-heading"
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-12 shadow-[var(--shadow-md)] mb-8"
        >
          <div className="mb-8">
            <h2
              id="chart-heading"
              className="text-xl font-semibold text-[var(--color-text)] mb-1"
            >
              Facteur d'émission par filière
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              En gCO₂e/kWh · Du plus au moins émetteur · Cliquez sur une barre pour le détail
            </p>
          </div>

          <EmissionsBarChart data={sortedData} />
        </section>

        {/* ── Clés de lecture ────────────────────────────────── */}
        <section aria-label="Clés de lecture" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: "🏭",
              title: "Énergies fossiles",
              range: "> 400 gCO₂e/kWh",
              text: "Charbon, fioul et gaz naturel dominent le mix mondial mais concentrent l'essentiel des émissions du secteur électrique.",
            },
            {
              icon: "☀️",
              title: "Renouvelables variables",
              range: "10 – 50 gCO₂e/kWh",
              text: "Éolien et solaire affichent des bilans très faibles. L'essentiel de leur impact carbone provient de la fabrication des équipements.",
            },
            {
              icon: "⚛️",
              title: "Bas-carbone pilotable",
              range: "6 – 15 gCO₂e/kWh",
              text: "Nucléaire et hydraulique combinent quasi-décarbonation et production stable — indispensables pour équilibrer le réseau.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 shadow-[var(--shadow-sm)]"
            >
              <span className="text-3xl block mb-3" aria-hidden="true">{item.icon}</span>
              <h3 className="font-semibold text-[var(--color-text)] text-sm mb-1">{item.title}</h3>
              <p className="text-xs font-mono text-[var(--color-primary)] mb-2">{item.range}</p>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.text}</p>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}
