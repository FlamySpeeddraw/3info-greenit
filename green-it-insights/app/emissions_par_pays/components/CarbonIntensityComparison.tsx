import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MUTED_BAR_COLOR, SELECTED_BAR_COLOR } from "../constants";
import type { CountryEnergyData } from "../types";

type CarbonIntensityComparisonProps = {
  canAddComparedCountry: boolean;
  chartHeight: number;
  comparisonCountries: CountryEnergyData[];
  comparisonSearch: string;
  comparisonSuggestions: CountryEnergyData[];
  selectedCountry: CountryEnergyData;
  onAddComparedCountryFromSearch: () => void;
  onAddSelectedCountryToComparison: () => void;
  onComparisonSearchChange: (value: string) => void;
  onRemoveComparedCountry: (countryName: string) => void;
  onResetComparisonCountries: () => void;
};

export function CarbonIntensityComparison({
  canAddComparedCountry,
  chartHeight,
  comparisonCountries,
  comparisonSearch,
  comparisonSuggestions,
  selectedCountry,
  onAddComparedCountryFromSearch,
  onAddSelectedCountryToComparison,
  onComparisonSearchChange,
  onRemoveComparedCountry,
  onResetComparisonCountries,
}: CarbonIntensityComparisonProps) {
  return (
    <section className="rounded-lg border border-[#112F1F]/15 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Intensite carbone de l&apos;electricite
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#3D2E2B]">
            Choisis librement les pays a comparer. Valeurs issues de la colonne
            OWID <code>carbon_intensity_elec</code>.
          </p>
        </div>
        <p className="text-sm font-medium text-[#5C4641]">gCO2/kWh</p>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <label className="block">
          <span className="text-sm font-bold uppercase tracking-[0.12em] text-[#5C4641]">
            Ajouter un pays au graphique
          </span>
          <input
            list="comparison-country-options"
            value={comparisonSearch}
            onChange={(event) => onComparisonSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onAddComparedCountryFromSearch();
              }
            }}
            placeholder="Rechercher un pays, ex: France, Poland, USA"
            className="mt-3 w-full rounded-md border border-[#112F1F]/25 bg-[#FBFBF9] px-3 py-3 text-base font-semibold text-[#112F1F] outline-none transition placeholder:text-[#7B756B] focus:border-[#112F1F] focus:ring-2 focus:ring-[#112F1F]/20"
          />
          <datalist id="comparison-country-options">
            {comparisonSuggestions.map((country) => (
              <option
                key={country.isoCode}
                value={country.country}
                label={`${country.sourceCountry} (${country.isoCode})`}
              />
            ))}
          </datalist>
        </label>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onAddComparedCountryFromSearch}
            disabled={!canAddComparedCountry}
            className="rounded-md bg-[#112F1F] px-4 py-3 text-sm font-bold text-[#FBFBF9] transition hover:bg-[#224D35] disabled:cursor-not-allowed disabled:bg-[#C8D7CB] disabled:text-[#3D2E2B]"
          >
            Ajouter
          </button>
          <button
            type="button"
            onClick={onAddSelectedCountryToComparison}
            className="rounded-md border border-[#112F1F]/25 px-4 py-3 text-sm font-bold text-[#112F1F] transition hover:bg-[#F2EFE9]"
          >
            Ajouter le pays selectionne
          </button>
          <button
            type="button"
            onClick={onResetComparisonCountries}
            className="rounded-md border border-[#3D2E2B]/25 px-4 py-3 text-sm font-bold text-[#3D2E2B] transition hover:bg-[#F2EFE9]"
          >
            Reperes
          </button>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {comparisonCountries.map((country) => (
          <button
            key={country.isoCode}
            type="button"
            onClick={() => onRemoveComparedCountry(country.country)}
            className="rounded-md border border-[#112F1F]/20 bg-[#F2EFE9] px-3 py-2 text-sm font-semibold text-[#112F1F] transition hover:border-[#112F1F]"
            title={`Retirer ${country.country} du graphique`}
          >
            {country.country} x
          </button>
        ))}
      </div>

      <div style={{ height: chartHeight }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparisonCountries}
            layout="vertical"
            margin={{ top: 8, right: 42, left: 18, bottom: 8 }}
          >
            <CartesianGrid stroke="#E6E1D8" horizontal={false} />
            <XAxis type="number" tick={{ fill: "#3D2E2B" }} />
            <YAxis
              dataKey="country"
              type="category"
              width={96}
              tick={{ fill: "#112F1F", fontWeight: 600 }}
            />
            <Tooltip
              cursor={{ fill: "#F2EFE9" }}
              formatter={(value) => [`${value} gCO2/kWh`, "Intensite"]}
            />
            <Bar dataKey="carbonIntensity" radius={[0, 6, 6, 0]}>
              {comparisonCountries.map((country) => (
                <Cell
                  key={country.country}
                  fill={
                    country.country === selectedCountry.country
                      ? SELECTED_BAR_COLOR
                      : MUTED_BAR_COLOR
                  }
                />
              ))}
              <LabelList
                dataKey="carbonIntensity"
                position="right"
                formatter={(value) => `${value ?? ""}`}
                fill="#3D2E2B"
                fontSize={12}
                fontWeight={700}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
