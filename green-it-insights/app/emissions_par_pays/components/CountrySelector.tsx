import {
  Box,
  Card,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
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
    <Card asChild variant="surface" className="content-card country-selector-card">
      <aside className="section-stack">
        <Text
          as="label"
          htmlFor="country-search"
          size="2"
          weight="bold"
          color="brown"
          className="form-label"
        >
          Pays sélectionné
        </Text>
        <TextField.Root
          id="country-search"
          list="selected-country-options"
          value={countrySearch}
          onChange={(event) => onCountrySearchChange(event.target.value)}
          onBlur={onCountrySearchBlur}
          placeholder="Rechercher un pays"
          color="grass"
          size="3"
          variant="surface"
          className="field-full"
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="18" width="18" />
          </TextField.Slot>
        </TextField.Root>
        <datalist id="selected-country-options">
          {countrySuggestions.map((country) => (
            <option
              key={country.isoCode}
              value={country.country}
              label={`${country.sourceCountry} (${country.isoCode})`}
            />
          ))}
        </datalist>

        <Select.Root
          value={selectedCountryName}
          onValueChange={(value) => {
            const country = countries.find(
              (currentCountry) => currentCountry.country === value,
            );

            if (country) {
              onSelectCountry(country);
            }
          }}
        >
          <Select.Trigger
            id="country"
            color="grass"
            variant="surface"
            className="field-full"
          />
          <Select.Content>
            {countries.map((country) => (
              <Select.Item key={country.isoCode} value={country.country}>
                {country.country} ({country.isoCode})
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <Box className="muted-card metric-panel">
          <Text as="p" size="2" color="brown">
            Intensité carbone
          </Text>
          <Flex align="baseline" gap="2" className="metric-row">
            <Text size="8" weight="bold">
              {selectedCountry.carbonIntensity}
            </Text>
            <Text size="3" weight="bold">
              gCO2/kWh
            </Text>
          </Flex>
          <Text as="p" size="1" weight="medium" color="brown" className="metric-meta">
            {selectedCountry.sourceCountry} - {selectedCountry.year}
          </Text>
        </Box>
      </aside>
    </Card>
  );
}
