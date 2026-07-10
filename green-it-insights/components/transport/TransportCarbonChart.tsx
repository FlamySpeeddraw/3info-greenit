"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { COLORS } from "@/app/color.const";

const data = [
  { mode: "Maritime", value: 0.01 },
  { mode: "Ferroviaire", value: 0.03 },
  { mode: "Routier", value: 0.096 },
  { mode: "Aérien", value: 0.602 },
];

const barColors = [
  COLORS.green.dark,
  COLORS.green.accent,
  COLORS.brown.accent,
  COLORS.brown.dark,
];

export function TransportCarbonChart() {
  return (
    <div className="w-full h-80 p-6 rounded-2xl border bg-eco-gray dark:bg-oled-gray border-brown-dark/10 dark:border-eco-white/5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
          <XAxis dataKey="mode" tick={{ fontSize: 13 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            label={{
              value: "kgCO₂e / tonne-km",
              angle: -90,
              position: "insideLeft",
              offset: -5,
              style: { fontSize: 11 },
            }}
          />
          <Tooltip
            formatter={(value) => [`${value} kgCO₂e/t-km`, "Émissions"] as [string, string]}
            contentStyle={{
              backgroundColor: COLORS.oled.black,
              border: "1px solid #ffffff20",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={barColors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}