"use client";

import { useMemo, useState } from "react";
import { REFERENCE_COUNTRY_NAMES } from "./constants";
import {
  findCountryFromQuery,
  getCountrySuggestions,
} from "./country-utils";
import { CarbonIntensityComparison } from "./components/CarbonIntensityComparison";
import { CountrySelector } from "./components/CountrySelector";
import { EmissionsSimulator } from "./components/EmissionsSimulator";
import { EnergyMixChart } from "./components/EnergyMixChart";
import type { CountryEnergyData } from "./types";

type EmissionsParPaysClientProps = {
  countries: CountryEnergyData[];
};

export function EmissionsParPaysClient({
  countries,
}: EmissionsParPaysClientProps) {
  const france = countries.find((country) => country.country === "France");
  const poland = countries.find((country) => country.country === "Pologne");
  const defaultCountryName = france?.country ?? countries[0]?.country ?? "";

  const [selectedCountryName, setSelectedCountryName] =
    useState(defaultCountryName);
  const [countrySearch, setCountrySearch] = useState(defaultCountryName);
  const [comparisonSearch, setComparisonSearch] = useState("");
  const [comparedCountryNames, setComparedCountryNames] = useState(
    REFERENCE_COUNTRY_NAMES,
  );
  const [kwh, setKwh] = useState(100);

  const selectedCountry = useMemo(
    () =>
      countries.find((country) => country.country === selectedCountryName) ??
      france ??
      countries[0],
    [countries, france, selectedCountryName],
  );

  const comparisonCountries = useMemo(
    () =>
      comparedCountryNames
        .map((countryName) =>
          countries.find((country) => country.country === countryName),
        )
        .filter((country): country is CountryEnergyData => Boolean(country))
        .sort((a, b) => a.carbonIntensity - b.carbonIntensity),
    [countries, comparedCountryNames],
  );

  const countrySuggestions = useMemo(
    () => getCountrySuggestions(countries, countrySearch),
    [countries, countrySearch],
  );

  const comparisonSuggestions = useMemo(
    () =>
      getCountrySuggestions(countries, comparisonSearch, comparedCountryNames),
    [countries, comparisonSearch, comparedCountryNames],
  );

  const requestedComparedCountry = findCountryFromQuery(
    countries,
    comparisonSearch,
  );
  const canAddComparedCountry = Boolean(
    requestedComparedCountry &&
      !comparedCountryNames.includes(requestedComparedCountry.country),
  );
  const chartHeight = Math.max(
    300,
    Math.min(620, comparisonCountries.length * 42 + 80),
  );
  const emissionsKg = (kwh * selectedCountry.carbonIntensity) / 1000;
  const franceRatio = france
    ? selectedCountry.carbonIntensity / france.carbonIntensity
    : 0;
  const polandFranceRatio =
    france && poland ? poland.carbonIntensity / france.carbonIntensity : 0;

  function selectCountry(country: CountryEnergyData) {
    setSelectedCountryName(country.country);
    setCountrySearch(country.country);
  }

  function handleCountrySearchChange(value: string) {
    setCountrySearch(value);

    const country = findCountryFromQuery(countries, value);

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
    const country = findCountryFromQuery(countries, comparisonSearch);

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
    const referenceCountryNames = REFERENCE_COUNTRY_NAMES.filter(
      (countryName) =>
        countries.some((country) => country.country === countryName),
    );

    setComparedCountryNames(referenceCountryNames);
  }

  return (
    <>
      <CarbonIntensityComparison
        canAddComparedCountry={canAddComparedCountry}
        chartHeight={chartHeight}
        comparisonCountries={comparisonCountries}
        comparisonSearch={comparisonSearch}
        comparisonSuggestions={comparisonSuggestions}
        selectedCountry={selectedCountry}
        onAddComparedCountryFromSearch={addComparedCountryFromSearch}
        onAddSelectedCountryToComparison={() =>
          addComparedCountry(selectedCountry)
        }
        onComparisonSearchChange={setComparisonSearch}
        onRemoveComparedCountry={removeComparedCountry}
        onResetComparisonCountries={resetComparisonCountries}
      />

      <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <CountrySelector
          countrySearch={countrySearch}
          countrySuggestions={countrySuggestions}
          countries={countries}
          selectedCountry={selectedCountry}
          selectedCountryName={selectedCountryName}
          onCountrySearchBlur={() => setCountrySearch(selectedCountry.country)}
          onCountrySearchChange={handleCountrySearchChange}
          onSelectCountry={selectCountry}
        />

        <EnergyMixChart selectedCountry={selectedCountry} />
      </section>

      <EmissionsSimulator
        emissionsKg={emissionsKg}
        franceRatio={franceRatio}
        kwh={kwh}
        polandFranceRatio={polandFranceRatio}
        selectedCountry={selectedCountry}
        onKwhChange={setKwh}
      />
    </>
  );
}
