import { Box, Card, Heading, Text } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
  MIX_COLORS,
} from "../constants";
import type { CountryEnergyData, EnergyMix } from "../types";

type EnergyMixChartProps = {
  selectedCountry: CountryEnergyData;
};

export function EnergyMixChart({ selectedCountry }: EnergyMixChartProps) {
  const mixData = [{ country: selectedCountry.country, ...selectedCountry.mix }];

  return (
    <Card
      asChild
      variant="surface"
      className="border border-green-dark/15 bg-eco-white p-5 shadow-sm dark:border-brown-accent/20 dark:bg-oled-gray sm:p-6"
    >
      <section>
        <Heading as="h2" size="7">
          Mix energetique de {selectedCountry.country}
        </Heading>
        <Text as="p" size="2" color="brown" className="mt-2 leading-6">
          La repartition des sources de production explique les ecarts
          d&apos;intensite carbone observes entre les pays.
        </Text>

        <Box className="mt-6 h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={mixData}
              layout="vertical"
              margin={{ top: 8, right: 24, left: 18, bottom: 8 }}
            >
              <CartesianGrid stroke={CHART_GRID_COLOR} horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
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
                formatter={(value, name) => [`${value}%`, name]}
              />
              <Legend />
              {(Object.keys(MIX_COLORS) as (keyof EnergyMix)[]).map(
                (source) => (
                  <Bar
                    key={source}
                    dataKey={source}
                    stackId="mix"
                    fill={MIX_COLORS[source]}
                  />
                ),
              )}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </section>
    </Card>
  );
}
