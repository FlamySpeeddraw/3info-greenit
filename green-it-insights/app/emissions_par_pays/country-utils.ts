import type { CountryEnergyData } from "./types";

export function normalizeCountryQuery(value: string) {
  return value.trim().toLowerCase();
}

export function findCountryFromQuery(
  countries: CountryEnergyData[],
  value: string,
) {
  const query = normalizeCountryQuery(value);

  return countries.find(
    (country) =>
      country.country.toLowerCase() === query ||
      country.sourceCountry.toLowerCase() === query ||
      country.isoCode.toLowerCase() === query,
  );
}

export function getCountrySuggestions(
  countries: CountryEnergyData[],
  value: string,
  excludedCountryNames: string[] = [],
) {
  const query = normalizeCountryQuery(value);

  return countries
    .filter(
      (country) =>
        !excludedCountryNames.includes(country.country) &&
        (query
          ? country.country.toLowerCase().includes(query) ||
            country.sourceCountry.toLowerCase().includes(query) ||
            country.isoCode.toLowerCase().includes(query)
          : true),
    )
    .slice(0, 12);
}

export function getDataYearLabel(countries: CountryEnergyData[]) {
  const years = [...new Set(countries.map((country) => country.year))].sort();

  return years.length === 1 ? `${years[0]}` : `${years[0]}-${years.at(-1)}`;
}
