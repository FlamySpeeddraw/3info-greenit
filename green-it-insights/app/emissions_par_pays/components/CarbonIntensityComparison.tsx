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
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
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
import {
  CHART_CURSOR_COLOR,
  CHART_GRID_COLOR,
  CHART_PRIMARY_TEXT_COLOR,
  CHART_SECONDARY_TEXT_COLOR,
  MUTED_BAR_COLOR,
  SELECTED_BAR_COLOR,
} from "../constants";
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
      className="content-card comparison-card"
    >
      <section>
        <Flex
          mb="5"
          direction={{ initial: "column", sm: "row" }}
          gap="2"
          align={{ sm: "end" }}
          justify="between"
        >
          <Box>
            <Heading as="h2" size="7">
              Intensite carbone de l&apos;electricite
            </Heading>
            <Text as="p" size="2" color="brown" className="comparison-copy">
              Choisis librement les pays a comparer. Valeurs issues de la colonne
              OWID <Code color="brown">carbon_intensity_elec</Code>.
            </Text>
          </Box>
          <Text size="2" weight="medium" color="brown">
            gCO2/kWh
          </Text>
        </Flex>

        <Box className="comparison-form">
          <Text as="label" className="field-label-block">
            <Text
              as="span"
              size="2"
              weight="bold"
              color="brown"
              className="form-label"
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
              className="field-spacing"
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="18" width="18" />
              </TextField.Slot>
            </TextField.Root>
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

          <Flex gap="5" wrap="wrap" className="comparison-actions">
            <Button
              type="button"
              onClick={onAddComparedCountryFromSearch}
              disabled={!canAddComparedCountry}
              color="grass"
              variant="solid"
              size="3"
              className="action-button-sm"
            >
              Ajouter
            </Button>
            <Button
              type="button"
              onClick={onAddSelectedCountryToComparison}
              color="grass"
              variant="outline"
              size="3"
              className="action-button-lg"
            >
              Ajouter le pays selectionne
            </Button>
            <Button
              type="button"
              onClick={onResetComparisonCountries}
              color="brown"
              variant="soft"
              size="3"
              className="action-button-sm"
            >
              Reperes
            </Button>
          </Flex>
        </Box>

        <Flex gap="4" wrap="wrap" className="country-chip-list">
          {comparisonCountries.map((country) => (
            <Button
              key={country.isoCode}
              type="button"
              onClick={() => onRemoveComparedCountry(country.country)}
              color="grass"
              variant="soft"
              size="3"
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
              <CartesianGrid stroke={CHART_GRID_COLOR} horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: CHART_SECONDARY_TEXT_COLOR }}
              />
              <YAxis
                dataKey="country"
                type="category"
                width={96}
                tick={{ fill: CHART_PRIMARY_TEXT_COLOR, fontWeight: 600 }}
              />
              <Tooltip
                cursor={{ fill: CHART_CURSOR_COLOR }}
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
                  fill={CHART_SECONDARY_TEXT_COLOR}
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
