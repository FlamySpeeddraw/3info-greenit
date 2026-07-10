import {
  Box,
  Card,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
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
    <Card
      asChild
      variant="surface"
      className="border border-green-dark/15 bg-eco-white p-5 shadow-sm dark:border-brown-accent/20 dark:bg-oled-gray sm:p-6"
    >
      <aside>
        <Text
          as="label"
          htmlFor="country-search"
          size="2"
          weight="bold"
          color="brown"
          className="block uppercase tracking-[0.12em]"
        >
          Pays selectionne
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
          className="mt-3 w-full font-semibold"
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
            className="mt-3 w-full font-semibold"
          />
          <Select.Content>
            {countries.map((country) => (
              <Select.Item key={country.isoCode} value={country.country}>
                {country.country} ({country.isoCode})
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <Box className="mt-6 rounded-md bg-brown-bg p-4 dark:bg-brown-dark/30">
          <Text as="p" size="2" color="brown">
            Intensite carbone
          </Text>
          <Flex align="baseline" gap="2" className="mt-1">
            <Text size="8" weight="bold">
              {selectedCountry.carbonIntensity}
            </Text>
            <Text size="3" weight="bold">
              gCO2/kWh
            </Text>
          </Flex>
          <Text as="p" size="1" weight="medium" color="brown" className="mt-2">
            {selectedCountry.sourceCountry} - {selectedCountry.year}
          </Text>
        </Box>
      </aside>
    </Card>
  );
}
