import {
  Box,
  Button,
  Card,
  Code,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
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
import { COLORS } from "../../color.const";
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
    <Card
      asChild
      variant="surface"
      className="border border-green-dark/15 bg-eco-white p-5 shadow-sm sm:p-6"
    >
      <section>
        <Flex
          mb="6"
          direction={{ initial: "column", sm: "row" }}
          gap="2"
          align={{ sm: "end" }}
          justify="between"
        >
          <Box>
            <Heading as="h2" size="7">
              Intensite carbone de l&apos;electricite
            </Heading>
            <Text as="p" size="2" color="brown" className="mt-2 leading-6">
              Choisis librement les pays a comparer. Valeurs issues de la colonne
              OWID <Code color="brown">carbon_intensity_elec</Code>.
            </Text>
          </Box>
          <Text size="2" weight="medium" color="brown">
            gCO2/kWh
          </Text>
        </Flex>

        <Box className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <Text as="label" className="block">
            <Text
              as="span"
              size="2"
              weight="bold"
              color="brown"
              className="block uppercase tracking-[0.12em]"
            >
              Ajouter un pays au graphique
            </Text>
            <TextField.Root
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
              color="grass"
              size="3"
              variant="surface"
              className="mt-3 w-full font-semibold"
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
          </Text>

          <Flex gap="3" wrap="wrap">
            <Button
              type="button"
              onClick={onAddComparedCountryFromSearch}
              disabled={!canAddComparedCountry}
              color="grass"
              variant="solid"
              size="3"
            >
              Ajouter
            </Button>
            <Button
              type="button"
              onClick={onAddSelectedCountryToComparison}
              color="grass"
              variant="outline"
              size="3"
            >
              Ajouter le pays selectionne
            </Button>
            <Button
              type="button"
              onClick={onResetComparisonCountries}
              color="brown"
              variant="soft"
              size="3"
            >
              Reperes
            </Button>
          </Flex>
        </Box>

        <Flex mb="5" gap="2" wrap="wrap">
          {comparisonCountries.map((country) => (
            <Button
              key={country.isoCode}
              type="button"
              onClick={() => onRemoveComparedCountry(country.country)}
              color="grass"
              variant="soft"
              size="2"
              title={`Retirer ${country.country} du graphique`}
            >
              {country.country} x
            </Button>
          ))}
        </Flex>

        <Box style={{ height: chartHeight }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonCountries}
              layout="vertical"
              margin={{ top: 8, right: 42, left: 18, bottom: 8 }}
            >
              <CartesianGrid stroke={COLORS.light.brown[3]} horizontal={false} />
              <XAxis type="number" tick={{ fill: COLORS.brown.dark }} />
              <YAxis
                dataKey="country"
                type="category"
                width={96}
                tick={{ fill: COLORS.green.dark, fontWeight: 600 }}
              />
              <Tooltip
                cursor={{ fill: COLORS.brown.bg }}
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
                  fill={COLORS.brown.dark}
                  fontSize={12}
                  fontWeight={700}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </section>
    </Card>
  );
}
