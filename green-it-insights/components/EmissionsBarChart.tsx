"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
      const probe = document.createElement("div");
      probe.style.display = "none";
      document.body.appendChild(probe);

      const resolve = (varName: string, fallback: string): string => {
        probe.style.color = style.getPropertyValue(varName).trim();
        const resolved = getComputedStyle(probe).color;
        return resolved && resolved !== "rgba(0, 0, 0, 0)" ? resolved : fallback;
      };

      setColors({
        textMuted: resolve("--color-text-muted", "#9ca3af"),
        text:      resolve("--color-text",       "#f3f4f6"),
        divider:   resolve("--color-divider",    "#374151"),
        border:    resolve("--color-border",     "#4b5563"),
      });

      document.body.removeChild(probe);
    };

    readColors();

    const observer = new MutationObserver(readColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const handleBarClick = (barData: unknown) => {
    const entry = barData as FilieresData;
    setSelected(selected?.id === entry.id ? null : entry);
  };

  return (
    <div className="w-full space-y-8">
      <style>{`
        .recharts-wrapper,
        .recharts-wrapper svg,
        .recharts-wrapper *:focus,
        .recharts-wrapper *:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>

      {/* Légende */}
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {[
          { color: "#c0392b", label: "Très carboné  ≥ 600" },
          { color: "#e67e22", label: "Modéré  200 – 600" },
          { color: "#f1c40f", label: "Faible  50 – 200" },
          { color: "#27ae60", label: "Bas-carbone  < 50" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-2 text-xs" style={{ color: colors.textMuted }}>
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            {label} <span className="text-[10px]">gCO₂e/kWh</span>
          </span>
        ))}
      </div>

      {/* Graphique */}
      <div
        className="w-full"
        style={{ height: `${data.length * 62 + 40}px` }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 0, right: 90, left: 0, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              stroke={colors.divider}
            />
            <XAxis
              type="number"
              unit=" g"
              tick={{ fontSize: 11, fill: colors.textMuted }}
              tickLine={false}
              axisLine={{ stroke: colors.border }}
              domain={[0, "dataMax + 80"]}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={170}
              tick={{ fontSize: 13, fill: colors.text, fontWeight: 500 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={() => null} cursor={false} />
            <Bar
              dataKey="emissionFactor"
              radius={[0, 5, 5, 0]}
              style={{ cursor: "pointer" }}
              activeBar={false}
              isAnimationActive={false}
              onClick={handleBarClick}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={getBarColor(entry.emissionFactor)}
                  opacity={selected && selected.id !== entry.id ? 0.35 : 1}
                  stroke={selected?.id === entry.id ? colors.text : "none"}
                  strokeWidth={selected?.id === entry.id ? 1.5 : 0}
                />
              ))}
              <LabelList
                dataKey="emissionFactor"
                position="right"
                formatter={(v) => `${Number(v).toLocaleString("fr-FR")} g`}
                style={{ fontSize: 11, fill: colors.textMuted, fontVariantNumeric: "tabular-nums" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Encart détail au clic */}
      {selected && (
        <FilieresTooltip
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
