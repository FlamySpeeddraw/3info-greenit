import type { CountryEnergyData } from "../types";

type CountrySelectorProps = {
  countrySearch: string;
  countrySuggestions: CountryEnergyData[];
  countries: CountryEnergyData[];
  selectedCountry: CountryEnergyData;
  selectedCountryName: string;
  onCountrySearchBlur: () => void;
  onCountrySearchChange: (value: string) => void;
  onSelectCountry: (country: CountryEnergyData) => void;
};

export function CountrySelector({
  countrySearch,
  countrySuggestions,
  countries,
  selectedCountry,
  selectedCountryName,
  onCountrySearchBlur,
  onCountrySearchChange,
  onSelectCountry,
}: CountrySelectorProps) {
  return (
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
        onChange={(event) => onCountrySearchChange(event.target.value)}
        onBlur={onCountrySearchBlur}
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
            (currentCountry) => currentCountry.country === event.target.value,
          );

          if (country) {
            onSelectCountry(country);
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
  );
}
