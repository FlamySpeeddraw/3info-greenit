"use client";

import { Box, Text } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface EnergyCountryData {
  country: string;
  iso3: string;
  energyTWh: number;
  perCapitaMWh: number;
}

export default function EnergyBarChart({
  data,
}: {
  data: EnergyCountryData[];
}) {
  return (
    <Box style={{ width: "100%", height: 520 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 24, left: 12, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            tickFormatter={(value) => `${Number(value).toLocaleString("fr-FR")}`}
          />
          <YAxis
            type="category"
            dataKey="country"
            width={120}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;

              const item = payload[0]?.payload as EnergyCountryData;

              return (
                <Box
                  style={{
                    background: "var(--color-panel-solid, white)",
                    border: "1px solid var(--gray-6)",
                    borderRadius: 12,
                    padding: 12,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  }}
                >
                  <Text as="p" weight="bold" size="2">
                    {label}
                  </Text>
                  <Text as="p" size="2" color="gray">
                    Consommation totale : {item.energyTWh.toLocaleString("fr-FR")} TWh
                  </Text>
                  <Text as="p" size="2" color="gray">
                    Par habitant : {item.perCapitaMWh.toLocaleString("fr-FR")} MWh/hab
                  </Text>
                </Box>
              );
            }}
          />
          <Bar dataKey="energyTWh" radius={[0, 8, 8, 0]} fill="var(--green-9)">
            <LabelList
              dataKey="energyTWh"
              position="right"
              formatter={(value: number) => value.toLocaleString("fr-FR")}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
