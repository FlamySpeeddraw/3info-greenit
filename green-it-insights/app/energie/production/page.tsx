import { Text, Heading } from "@radix-ui/themes";
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
          <Text
            size="1"
            weight="bold"
            className="uppercase tracking-widest text-[var(--color-primary)] block mb-3"
          >
            Infographie · Émissions de GES
          </Text>

          <Heading size="8" as="h1" className="mb-4">
            Quelle filière énergétique <br className="hidden sm:block" />
            pour le climat ?
          </Heading>

          <Text as="p" size="3" className="text-[var(--color-text-muted)] max-w-xl leading-relaxed">
            Toutes les sources d'énergie ne se valent pas. Comparez leur empreinte carbone
            en{" "}
            <Text as="span" weight="bold" className="text-[var(--color-text)]">
              gCO₂e par kWh produit
            </Text>
            , en tenant compte de l'ensemble du cycle de vie — de la construction au démantèlement.
          </Text>
        </header>

        {/* ── Graphique ──────────────────────────────────────── */}
        <section
          aria-labelledby="chart-heading"
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-12 shadow-[var(--shadow-md)] mb-8"
        >
          <div className="mb-8">
            <Heading size="4" as="h2" id="chart-heading" className="mb-1">
              Facteur d'émission par filière
            </Heading>
            <Text size="2" as="p" className="text-[var(--color-text-muted)]">
              En gCO₂e/kWh · Du plus au moins émetteur · Cliquez sur une barre pour le détail
            </Text>
          </div>

          <EmissionsBarChart data={sortedData} />
        </section>

        {/* ── Clés de lecture ────────────────────────────────── */}
        <section aria-label="Clés de lecture" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              <Text size="6" as="p" className="block mb-3" aria-hidden="true">
                {item.icon}
              </Text>
              <Heading size="2" as="h3" className="mb-1">{item.title}</Heading>
              <Text size="1" as="p" className="font-mono text-[var(--color-primary)] block mb-2">
                {item.range}
              </Text>
              <Text size="2" as="p" className="text-[var(--color-text-muted)] leading-relaxed">
                {item.text}
              </Text>
            </div>
          ))}
        </section>

      </div>
    </main>
  );
}
