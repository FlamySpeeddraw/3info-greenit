"use client";

import "./EmissionsBarChart.css";

import { useMemo, useState } from "react";
import { Card, Heading, Separator, Strong, Text } from "@radix-ui/themes";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    LabelList,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"; // NOTE: recharts pèse ~45 kB gzipped (d3 + redux). Choix justifié pour l'interactivité (clic/hover), sinon envisager un SVG maison.
import { COLORS } from "@/app/color.const";

type EnergyDatum = {
    id: string;
    name: string;
    emissionFactor: number;
    globalShare: string;
    exampleCountry: string;
    description: string;
    icon: string;
};

type RowBackgroundProps = {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    index?: number;
    payload?: EnergyDatum;
};

const CHART_THEME = {
    text: COLORS.dark.foreground,
    grid: COLORS.dark.brown[4],
    axis: COLORS.dark.brown[5],
    tooltipBg: COLORS.eco.white,
    tooltipText: COLORS.green.dark,
    activeStroke: COLORS.brown.dark,
    rowHover: "rgba(255, 255, 255, 0.035)",
    rowSelected: "rgba(255, 255, 255, 0.07)",
};

function getBarColor(index: number) {
    if (index < 3) return COLORS.green.dark;
    if (index < 8) return COLORS.brown.dark;
    return COLORS.brown.accent;
}

export function EmissionsBarChart({ data }: { data: EnergyDatum[] }) {
    const [selected, setSelected] = useState<EnergyDatum | null>(data[0] ?? null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const chartData = useMemo(
        () => data.map((item, index) => ({ ...item, fill: getBarColor(index) })),
        [data]
    );

    const selectedId = selected?.id ?? null;

    const renderRowBackground = (props: RowBackgroundProps) => {
        const { x = 0, y = 0, width = 0, height = 0, payload } = props;

        const id = payload?.id;
        const isSelected = id === selectedId;
        const isHovered = id === hoveredId;

        return (
            <g>
                <Rectangle
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    radius={10}
                    fill={
                        isSelected
                            ? CHART_THEME.rowSelected
                            : isHovered
                                ? CHART_THEME.rowHover
                                : "transparent"
                    }
                    stroke="none"
                    className="emissions-chart__row-bg"
                    onMouseEnter={() => id && setHoveredId(id)}
                    onMouseLeave={() => setHoveredId((current) => (current === id ? null : current))}
                    onClick={() => payload && setSelected(payload)}
                />
            </g>
        );
    };

    return (
        <div className="emissions-chart grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="h-[540px] min-w-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 8, right: 28, left: 8, bottom: 8 }}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <CartesianGrid horizontal={false} stroke={CHART_THEME.grid} />

                        <XAxis
                            type="number"
                            stroke={CHART_THEME.axis}
                            tick={{ fill: CHART_THEME.text, fontSize: 12 }}
                            tickFormatter={(value) => `${Number(value).toLocaleString("fr-FR")}`}
                        />

                        <YAxis
                            type="category"
                            dataKey="name"
                            width={120}
                            stroke={CHART_THEME.axis}
                            tick={{ fill: CHART_THEME.text, fontSize: 12 }}
                        />

                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                backgroundColor: CHART_THEME.tooltipBg,
                                border: `1px solid ${COLORS.brown.accent}`,
                                borderRadius: 14,
                                color: CHART_THEME.tooltipText,
                                outline: "none",
                                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.18)",
                            }}
                            labelStyle={{ color: CHART_THEME.tooltipText, fontWeight: 700 }}
                            formatter={(value, _name, item) => {
                                const payload = item.payload as EnergyDatum;
                                const formattedValue = Number(value ?? 0).toLocaleString("fr-FR");
                                return [`${formattedValue} gCO₂e/kWh`, payload.name];
                            }}
                        />

                        <Bar
                            dataKey="emissionFactor"
                            radius={[0, 10, 10, 0]}
                            isAnimationActive={false}
                            background={renderRowBackground}
                            onClick={(_, index) => setSelected(chartData[index])}
                            onMouseEnter={(data) => setHoveredId(data?.id ?? null)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {chartData.map((entry) => {
                                const isSelected = selectedId === entry.id;
                                const isHovered = hoveredId === entry.id;

                                return (
                                    <Cell
                                        key={entry.id}
                                        fill={entry.fill}
                                        opacity={isSelected ? 1 : isHovered ? 0.98 : 0.9}
                                        stroke={isSelected ? CHART_THEME.activeStroke : "transparent"}
                                        strokeWidth={isSelected ? 2 : 0}
                                        style={{ cursor: "pointer" }}
                                    />
                                );
                            })}

                            <LabelList
                                dataKey="emissionFactor"
                                position="right"
                                formatter={(value) => String(value ?? "")}
                                fill={CHART_THEME.text}
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <Card className="h-fit rounded-2xl border border-brown-dark/10 bg-brown-bg dark:border-brown-accent/20 dark:bg-oled-gray">
                <div className="p-5">
                    <Text
                        as="p"
                        size="1"
                        weight="bold"
                        className="uppercase tracking-wider text-brown-dark dark:text-[var(--brown-11)]"
                    >
                        Détail de la filière
                    </Text>

                    <Heading
                        as="h3"
                        size="5"
                        className="mt-2 text-green-dark dark:text-[var(--foreground)]"
                    >
                        {selected?.name ?? "Aucune filière"}
                    </Heading>

                    <Separator my="4" size="4" />

                    {selected ? (
                        <div className="space-y-4">
                            <div>
                                <Text
                                    as="p"
                                    size="1"
                                    className="text-brown-light dark:text-[var(--brown-11)]/75"
                                >
                                    Facteur d’émission
                                </Text>
                                <Text
                                    as="p"
                                    size="5"
                                    className="text-green-dark dark:text-[var(--foreground)]"
                                >
                                    <Strong>{selected.emissionFactor} gCO₂e/kWh</Strong>
                                </Text>
                            </div>

                            <div>
                                <Text
                                    as="p"
                                    size="1"
                                    className="text-brown-light dark:text-[var(--brown-11)]/75"
                                >
                                    Part de la production mondiale
                                </Text>
                                <Text
                                    as="p"
                                    size="4"
                                    className="text-brown-dark dark:text-[var(--brown-11)]"
                                >
                                    {selected.globalShare}
                                </Text>
                            </div>

                            <div>
                                <Text
                                    as="p"
                                    size="1"
                                    className="text-brown-light dark:text-[var(--brown-11)]/75"
                                >
                                    Exemple
                                </Text>
                                <Text
                                    as="p"
                                    size="2"
                                    className="text-green-dark dark:text-[var(--foreground)]"
                                >
                                    {selected.exampleCountry}
                                </Text>
                            </div>

                            <Text
                                as="p"
                                size="2"
                                className="leading-6 text-brown-light dark:text-[var(--brown-11)]/85"
                            >
                                {selected.description}
                            </Text>
                        </div>
                    ) : (
                        <Text
                            as="p"
                            size="2"
                            className="text-brown-light dark:text-[var(--brown-11)]/85"
                        >
                            Sélectionne une ligne du graphique pour afficher le détail.
                        </Text>
                    )}
                </div>
            </Card>
        </div>
    );
}
