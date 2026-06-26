"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import energyDataset from "../../public/data/emissions-par-pays-owid.json";

type EnergyMix = {
  charbon: number;
  gaz: number;
  nucleaire: number;
  hydraulique: number;
  eolien: number;
  solaire: number;
  autres: number;
};

type CountryEnergyData = {
  country: string;
  sourceCountry: string;
  isoCode: string;
  year: number;
  carbonIntensity: number;
  mix: EnergyMix;
};

type EnergyDataset = {
  source: string;
  sourceUrl: string;
  downloadedFrom: string;
  generatedAt: string;
  countries: CountryEnergyData[];
};

const dataset = energyDataset as EnergyDataset;
const countries = [...dataset.countries].sort((a, b) =>
  a.country.localeCompare(b.country),
);

const mixColors: Record<keyof EnergyMix, string> = {
  charbon: "#3D2E2B",
  gaz: "#8C5E4F",
  nucleaire: "#5F7C65",
  hydraulique: "#2F6F7E",
  eolien: "#6A9A72",
  solaire: "#D0A629",
  autres: "#7B756B",
};

const selectedBarColor = "#112F1F";
const mutedBarColor = "#C8D7CB";
const france = countries.find((country) => country.country === "France");
const poland = countries.find((country) => country.country === "Pologne");
const dataYears = [...new Set(countries.map((country) => country.year))].sort();
const referenceCountryNames = [
  "Suede",
  "France",
  "Royaume-Uni",
  "Allemagne",
  "Etats-Unis",
  "Pologne",
];
const dataYearLabel =
  dataYears.length === 1
    ? `${dataYears[0]}`
    : `${dataYears[0]}-${dataYears[dataYears.length - 1]}`;

function normalizeCountryQuery(value: string) {
  return value.trim().toLowerCase();
}

function findCountryFromQuery(value: string) {
  const query = normalizeCountryQuery(value);

  return countries.find(
    (country) =>
      country.country.toLowerCase() === query ||
      country.sourceCountry.toLowerCase() === query ||
      country.isoCode.toLowerCase() === query,
  );
}

export default function Home() {
  const [selectedCountryName, setSelectedCountryName] = useState("France");
  const [countrySearch, setCountrySearch] = useState("France");
  const [comparisonSearch, setComparisonSearch] = useState("");
  const [comparedCountryNames, setComparedCountryNames] =
    useState(referenceCountryNames);
  const [kwh, setKwh] = useState(100);

  const selectedCountry = useMemo(
    () =>
      countries.find((country) => country.country === selectedCountryName) ??
      france ??
      countries[0],
    [selectedCountryName],
  );

  const comparisonCountries = useMemo(
    () =>
      comparedCountryNames
        .map((countryName) =>
          countries.find((country) => country.country === countryName),
        )
        .filter((country): country is CountryEnergyData => Boolean(country))
        .sort((a, b) => a.carbonIntensity - b.carbonIntensity),
    [comparedCountryNames],
  );

  const countrySuggestions = useMemo(() => {
    const query = normalizeCountryQuery(countrySearch);

    if (!query) {
      return countries.slice(0, 12);
    }

    return countries
      .filter(
        (country) =>
          country.country.toLowerCase().includes(query) ||
          country.sourceCountry.toLowerCase().includes(query) ||
          country.isoCode.toLowerCase().includes(query),
      )
      .slice(0, 12);
  }, [countrySearch]);

  const comparisonSuggestions = useMemo(() => {
    const query = normalizeCountryQuery(comparisonSearch);

    return countries
      .filter(
        (country) =>
          !comparedCountryNames.includes(country.country) &&
          (query
            ? country.country.toLowerCase().includes(query) ||
              country.sourceCountry.toLowerCase().includes(query) ||
              country.isoCode.toLowerCase().includes(query)
            : true),
      )
      .slice(0, 12);
  }, [comparisonSearch, comparedCountryNames]);

  function selectCountry(country: CountryEnergyData) {
    setSelectedCountryName(country.country);
    setCountrySearch(country.country);
  }

  function handleCountrySearchChange(value: string) {
    setCountrySearch(value);

    const country = findCountryFromQuery(value);

    if (country) {
      setSelectedCountryName(country.country);
    }
  }

  function addComparedCountry(country: CountryEnergyData) {
    setComparedCountryNames((currentCountries) =>
      currentCountries.includes(country.country)
        ? currentCountries
        : [...currentCountries, country.country],
    );
    setComparisonSearch("");
  }

  function addComparedCountryFromSearch() {
    const country = findCountryFromQuery(comparisonSearch);

    if (country) {
      addComparedCountry(country);
    }
  }

  function removeComparedCountry(countryName: string) {
    setComparedCountryNames((currentCountries) =>
      currentCountries.filter((name) => name !== countryName),
    );
  }

  function resetComparisonCountries() {
    const uniqueCountries = new Map<string, CountryEnergyData>();

    referenceCountryNames
      .map((countryName) =>
        countries.find((country) => country.country === countryName),
      )
      .filter((country): country is CountryEnergyData => Boolean(country))
      .forEach((country) => uniqueCountries.set(country.country, country));

    setComparedCountryNames([...uniqueCountries.keys()]);
  }

  function addSelectedCountryToComparison() {
    addComparedCountry(selectedCountry);
  }

  const chartHeight = Math.max(
    300,
    Math.min(620, comparisonCountries.length * 42 + 80),
  );

  const canAddComparedCountry = Boolean(
    findCountryFromQuery(comparisonSearch) &&
      !comparedCountryNames.includes(
        findCountryFromQuery(comparisonSearch)?.country ?? "",
      ),
    );

  const mixData = useMemo(
    () => [{ country: selectedCountry.country, ...selectedCountry.mix }],
    [selectedCountry],
  );

  const emissionsKg = (kwh * selectedCountry.carbonIntensity) / 1000;
  const franceRatio = france
    ? selectedCountry.carbonIntensity / france.carbonIntensity
    : 0;
  const polandFranceRatio =
    france && poland ? poland.carbonIntensity / france.carbonIntensity : 0;

  return (
    <main className="min-h-screen bg-[#FBFBF9] px-5 py-10 text-[#112F1F] sm:px-8 lg:px-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#5C4641]">
            Green IT Insights
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Mix energetique et emissions carbone par pays
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#3D2E2B]">
            Le pays qui heberge un service numerique influence directement son
            empreinte carbone. Une meme consommation electrique ne genere pas le
            meme volume de CO2 selon le mix utilise pour produire
            l&apos;electricite.
          </p>
          <p className="mt-3 text-sm leading-6 text-[#5C4641]">
            Donnees locales issues du dataset Energy d&apos;Our World in Data:
            {countries.length} pays disponibles, derniere annee disponible:
            {dataYearLabel}.
          </p>
        </header>

        <section className="rounded-lg border border-[#112F1F]/15 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Intensite carbone de l&apos;electricite
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#3D2E2B]">
                Choisis librement les pays a comparer. Valeurs issues de la
                colonne OWID <code>carbon_intensity_elec</code>.
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
                onChange={(event) => setComparisonSearch(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addComparedCountryFromSearch();
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
                onClick={addComparedCountryFromSearch}
                disabled={!canAddComparedCountry}
                className="rounded-md bg-[#112F1F] px-4 py-3 text-sm font-bold text-[#FBFBF9] transition hover:bg-[#224D35] disabled:cursor-not-allowed disabled:bg-[#C8D7CB] disabled:text-[#3D2E2B]"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={addSelectedCountryToComparison}
                className="rounded-md border border-[#112F1F]/25 px-4 py-3 text-sm font-bold text-[#112F1F] transition hover:bg-[#F2EFE9]"
              >
                Ajouter le pays selectionne
              </button>
              <button
                type="button"
                onClick={resetComparisonCountries}
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
                onClick={() => removeComparedCountry(country.country)}
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
                          ? selectedBarColor
                          : mutedBarColor
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

        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-lg border border-[#112F1F]/15 bg-white p-5 shadow-sm sm:p-6">
            <label
              htmlFor="country-search"
              className="text-sm font-bold uppercase tracking-[0.12em] text-[#5C4641]"
            >
              Pays selectionne
            </label>
            <input
              id="country-search"
              list="selected-country-options"
              value={countrySearch}
              onChange={(event) => handleCountrySearchChange(event.target.value)}
              onBlur={() => setCountrySearch(selectedCountry.country)}
              placeholder="Rechercher un pays"
              className="mt-3 w-full rounded-md border border-[#112F1F]/25 bg-[#FBFBF9] px-3 py-3 text-base font-semibold text-[#112F1F] outline-none transition placeholder:text-[#7B756B] focus:border-[#112F1F] focus:ring-2 focus:ring-[#112F1F]/20"
            />
            <datalist id="selected-country-options">
              {countrySuggestions.map((country) => (
                <option
                  key={country.isoCode}
                  value={country.country}
                  label={`${country.sourceCountry} (${country.isoCode})`}
                />
              ))}
            </datalist>

            <select
              id="country"
              value={selectedCountryName}
              onChange={(event) => {
                const country = countries.find(
                  (currentCountry) =>
                    currentCountry.country === event.target.value,
                );

                if (country) {
                  selectCountry(country);
                }
              }}
              className="mt-3 w-full rounded-md border border-[#112F1F]/25 bg-[#FBFBF9] px-3 py-3 text-base font-semibold text-[#112F1F] outline-none transition focus:border-[#112F1F] focus:ring-2 focus:ring-[#112F1F]/20"
            >
              {countries.map((country) => (
                <option key={country.isoCode} value={country.country}>
                  {country.country} ({country.isoCode})
                </option>
              ))}
            </select>

            <div className="mt-6 rounded-md bg-[#F2EFE9] p-4">
              <p className="text-sm text-[#3D2E2B]">Intensite carbone</p>
              <p className="mt-1 text-3xl font-bold">
                {selectedCountry.carbonIntensity}
                <span className="ml-2 text-base font-semibold">gCO2/kWh</span>
              </p>
              <p className="mt-2 text-xs font-medium text-[#5C4641]">
                {selectedCountry.sourceCountry} - {selectedCountry.year}
              </p>
            </div>
          </aside>

          <section className="rounded-lg border border-[#112F1F]/15 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-2xl font-bold">
              Mix energetique de {selectedCountry.country}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#3D2E2B]">
              La repartition des sources de production explique les ecarts
              d&apos;intensite carbone observes entre les pays.
            </p>

            <div className="mt-6 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mixData}
                  layout="vertical"
                  margin={{ top: 8, right: 24, left: 18, bottom: 8 }}
                >
                  <CartesianGrid stroke="#E6E1D8" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: "#3D2E2B" }}
                  />
                  <YAxis
                    dataKey="country"
                    type="category"
                    width={96}
                    tick={{ fill: "#112F1F", fontWeight: 600 }}
                  />
                  <Tooltip
                    cursor={{ fill: "#F2EFE9" }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                  <Legend />
                  {(Object.keys(mixColors) as (keyof EnergyMix)[]).map(
                    (source) => (
                      <Bar
                        key={source}
                        dataKey={source}
                        stackId="mix"
                        fill={mixColors[source]}
                      />
                    ),
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </section>

        <section className="rounded-lg border border-[#112F1F]/15 bg-[#112F1F] p-5 text-[#FBFBF9] shadow-sm sm:p-6">
          <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold">Simulation des emissions</h2>
              <p className="mt-2 text-sm leading-6 text-[#DDE8DE]">
                Saisis une consommation electrique pour estimer les emissions
                selon le pays choisi.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
              <label className="block">
                <span className="text-sm font-semibold text-[#DDE8DE]">
                  Consommation en kWh
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={kwh}
                  onChange={(event) =>
                    setKwh(Math.max(0, Number(event.target.value)))
                  }
                  className="mt-2 w-full rounded-md border border-[#FBFBF9]/20 bg-[#FBFBF9] px-3 py-3 text-lg font-bold text-[#112F1F] outline-none transition focus:ring-2 focus:ring-[#D0A629]"
                />
              </label>

              <div className="rounded-md border border-[#FBFBF9]/20 bg-[#FBFBF9]/10 p-4">
                <p className="text-sm text-[#DDE8DE]">Emissions estimees</p>
                <p className="mt-1 text-3xl font-bold">
                  {emissionsKg.toFixed(1)}
                  <span className="ml-2 text-base font-semibold">kgCO2</span>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 rounded-md bg-[#FBFBF9]/10 p-4 text-sm leading-6 text-[#FBFBF9]">
            {selectedCountry.country === "France" && poland ? (
              <>
                Pour une meme consommation electrique, heberger ce service en
                Pologne genere environ {polandFranceRatio.toFixed(0)} fois plus
                de CO2 qu&apos;en France.
              </>
            ) : (
              <>
                Pour une meme consommation electrique, heberger ce service en{" "}
                {selectedCountry.country} genere environ{" "}
                {franceRatio.toFixed(1)} fois les emissions mesurees en France.
              </>
            )}
          </p>
        </section>

        <section className="rounded-lg border border-[#3D2E2B]/20 bg-[#F2EFE9] p-5 sm:p-6">
          <h2 className="text-2xl font-bold">Conclusion</h2>
          <p className="mt-3 leading-7 text-[#3D2E2B]">
            A consommation identique, le lieu d&apos;hebergement change fortement les
            emissions de CO2 d&apos;un service numerique. Choisir un pays dont
            l&apos;electricite est moins carbonee permet donc de reduire directement
            l&apos;empreinte carbone liee a l&apos;usage des serveurs.
          </p>
          <p className="mt-4 text-xs leading-5 text-[#5C4641]">
            Donnees extraites du fichier local{" "}
            <code>public/data/owid-energy-data.csv</code>, telecharge depuis Our
            World in Data. La categorie autres regroupe le petrole et les autres
            renouvelables du dataset OWID.
          </p>
        </section>
      </section>
    </main>
  );
}
