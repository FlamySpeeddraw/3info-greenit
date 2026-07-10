"use client";

import { Box, Text } from "@radix-ui/themes";
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

export interface EnergyCountryData {
  country: string;
  iso3: string;
  energyTWh: number;
  perCapitaMWh: number;
}

const BAR_COLORS = ["var(--grass-9)", "var(--accent-red)"];
const LABEL_COLORS = ["var(--grass-8)", "var(--accent-red)"];

export default function EnergyBarChart({
  data,
  showGrid,
}: {
  data: EnergyCountryData[];
  showGrid?: boolean;
}) {
  const showGridValue = showGrid ?? true;
  return (
    <Box style={{ width: "100%", height: 520 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 80, left: 12, bottom: 32 }}
        >
          {showGrid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis
            type="number"
            label={{ value: "Consommation totale (TWh/an)", position: "bottom", offset: 16 }}
            tickFormatter={(value) => `${Number(value).toLocaleString("fr-FR")}`}
          />
          <YAxis
            type="category"
            dataKey="country"
            width={160}
            tickLine={false}
            axisLine={false}
            tick={({ x, y, payload, index }) => (
              <text
                x={x - 10}
                y={y + 4}
                textAnchor="end"
                fill={LABEL_COLORS[index % LABEL_COLORS.length]}
                style={{ fontSize: 12 }}
              >
                {payload.value}
              </text>
            )}
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
          <Bar dataKey="energyTWh" radius={[0, 8, 8, 0]} fill="var(--grass-9)">
            {data.map((entry, index) => (
              <Cell key={`cell-${entry.iso3}-${index}`} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
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
