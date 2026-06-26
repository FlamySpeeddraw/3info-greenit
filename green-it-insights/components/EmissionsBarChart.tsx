"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { FilieresTooltip } from "./FilieresTooltip";
import { useState, useEffect } from "react";
import type { FilieresData } from "@/types/energie";

interface EmissionsBarChartProps {
  data: FilieresData[];
}

function getBarColor(value: number): string {
  if (value >= 600) return "#c0392b";
  if (value >= 200) return "#e67e22";
  if (value >= 50)  return "#f1c40f";
  return "#27ae60";
}

interface ChartColors {
  textMuted: string;
  text: string;
  divider: string;
  border: string;
}

export function EmissionsBarChart({ data }: EmissionsBarChartProps) {
  const [selected, setSelected] = useState<FilieresData | null>(null);
  const [colors, setColors] = useState<ChartColors>({
    textMuted: "#6b7280",
    text: "#111827",
    divider: "#e5e7eb",
    border: "#d1d5db",
  });

  useEffect(() => {
    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      setColors({
        textMuted: style.getPropertyValue("--color-text-muted").trim() || "#6b7280",
        text:      style.getPropertyValue("--color-text").trim()       || "#111827",
        divider:   style.getPropertyValue("--color-divider").trim()    || "#e5e7eb",
        border:    style.getPropertyValue("--color-border").trim()     || "#d1d5db",
      });
    };

    // Lecture initiale
    readColors();

    // Écoute les changements de thème (data-theme sur <html>)
    const observer = new MutationObserver(readColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full space-y-6">

      {/* Légende couleurs */}
      <div className="flex flex-wrap gap-3 text-sm">
        {[
          { color: "#c0392b", label: "Très carboné (≥ 600 gCO₂e/kWh)" },
          { color: "#e67e22", label: "Modéré (200–600)" },
          { color: "#f1c40f", label: "Faible (50–200)" },
          { color: "#27ae60", label: "Bas-carbone (< 50)" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            <span style={{ color: colors.textMuted, fontSize: "0.875rem" }}>{label}</span>
          </span>
        ))}
      </div>

      {/* Graphique */}
      <div className="w-full" style={{ height: `${data.length * 52 + 40}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 80, left: 0, bottom: 0 }}
            barCategoryGap="28%"
          >
            <CartesianGrid
              horizontal={false}
              strokeDasharray="4 4"
              stroke={colors.divider}
            />
            <XAxis
              type="number"
              unit=" gCO₂e"
              tick={{ fontSize: 12, fill: colors.textMuted }}
              tickLine={false}
              axisLine={{ stroke: colors.border }}
              domain={[0, "dataMax + 50"]}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={150}
              tick={{ fontSize: 13, fill: colors.text }}
              tickLine={false}
              axisLine={false}
            />
            <Bar
              dataKey="emissionFactor"
              radius={[0, 4, 4, 0]}
              cursor="pointer"
              onClick={(entry: FilieresData) =>
                setSelected(selected?.id === entry.id ? null : entry)
              }
            >
              {data.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={getBarColor(entry.emissionFactor)}
                  opacity={selected && selected.id !== entry.id ? 0.4 : 1}
                  stroke={selected?.id === entry.id ? colors.text : "none"}
                  strokeWidth={selected?.id === entry.id ? 1.5 : 0}
                />
              ))}
              <LabelList
                dataKey="emissionFactor"
                position="right"
                formatter={(v: number) => `${v.toLocaleString("fr-FR")} g`}
                style={{ fontSize: 12, fill: colors.textMuted }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tooltip détail au clic */}
      {selected && (
        <FilieresTooltip
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
