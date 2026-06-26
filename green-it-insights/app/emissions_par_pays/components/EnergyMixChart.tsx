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
import { MIX_COLORS } from "../constants";
import type { CountryEnergyData, EnergyMix } from "../types";

type EnergyMixChartProps = {
  selectedCountry: CountryEnergyData;
};

export function EnergyMixChart({ selectedCountry }: EnergyMixChartProps) {
  const mixData = [{ country: selectedCountry.country, ...selectedCountry.mix }];

  return (
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
            {(Object.keys(MIX_COLORS) as (keyof EnergyMix)[]).map((source) => (
              <Bar
                key={source}
                dataKey={source}
                stackId="mix"
                fill={MIX_COLORS[source]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
