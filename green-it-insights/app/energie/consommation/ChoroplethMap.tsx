"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import type { EnergyCountryData } from "@/app/energie/consommation/energie";

type GeoFeature = {
  properties: {
    name: string;
  };
};

type GeoJson = {
  features: GeoFeature[];
};

type TooltipState = {
  x: number;
  y: number;
  country: string;
  totalValue: string;
  perCapitaValue: string;
};

const WIDTH = 960;
const HEIGHT = 520;

const COUNTRY_ALIASES: Record<string, string> = {
  "bahamas the": "bahamas",
  "czechia": "czech republic",
  "republic of korea": "south korea",
  "south korea": "south korea",
  "north macedonia": "macedonia",
  "russia": "russian federation",
  "united states": "united states of america",
  "usa": "united states of america",
  "united states of america": "united states of america",
  "democratic republic of the congo": "congo, dem. rep.",
  "congo, dem. rep.": "congo, dem. rep.",
  "congo": "congo, rep.",
  "congo, rep.": "congo, rep.",
  "ivory coast": "côte d'ivoire",
  "cote d'ivoire": "côte d'ivoire",
  "laos": "lao people's democratic republic",
  "myanmar": "myanmar",
};

function normalizeCountryName(name: string) {
  const cleaned = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/ the$/g, "")
    .replace(/\s+/g, " ");

  return COUNTRY_ALIASES[cleaned] ?? cleaned;
}

export default function ChoroplethMap({ data }: { data: EnergyCountryData[] }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const totalByCountry = useMemo(() => {
    const map = new Map<string, number>();

    data.forEach((entry) => {
      if (!entry.country) return;
      map.set(normalizeCountryName(entry.country), entry.energyTWh);
    });

    return map;
  }, [data]);

  const perCapitaByCountry = useMemo(() => {
    const map = new Map<string, number>();

    data.forEach((entry) => {
      if (!entry.country) return;
      map.set(normalizeCountryName(entry.country), entry.perCapitaMWh);
    });

    return map;
  }, [data]);

  useEffect(() => {
    let cancelled = false;
    const svgElement = svgRef.current;

    if (!svgElement) return;

    async function drawMap() {
      const geo = await d3.json<GeoJson>("/data/world.geojson");
      if (!geo || cancelled) return;

      const svg = d3.select(svgElement);
      svg.selectAll("*").remove();
      svg.attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

      const projection = d3.geoNaturalEarth1().fitSize([WIDTH, HEIGHT], geo as never);
      const path = d3.geoPath(projection);

      const values = Array.from(perCapitaByCountry.values()).filter(
        (value) => Number.isFinite(value) && value > 0
      );
      const maxValue = values.length > 0 ? Math.max(...values) : 1;
      const colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0, maxValue]);

      svg
        .append("rect")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .attr("fill", "var(--gray-1)");

      const countries = svg.append("g");

      countries
        .selectAll("path")
        .data(geo.features)
        .join("path")
        .attr("d", path as never)
        .attr("fill", (feature) => {
          const countryName = feature.properties?.name ?? "";
          const value = perCapitaByCountry.get(normalizeCountryName(countryName));

          if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
            return "#f3f4f6";
          }

          return colorScale(value);
        })
        .attr("stroke", "#d1d5db")
        .attr("stroke-width", 0.7)
        .style("cursor", (feature) => {
          const countryName = feature.properties?.name ?? "";
          return totalByCountry.has(normalizeCountryName(countryName)) ? "pointer" : "default";
        })
        .on("mouseenter", function (_event, feature) {
          const countryName = feature.properties?.name ?? "Pays inconnu";
          const normalized = normalizeCountryName(countryName);
          const value = perCapitaByCountry.get(normalized);

          if (typeof value !== "number" || !Number.isFinite(value)) return;

          d3.select(this).attr("stroke", "#166534").attr("stroke-width", 1.2);
        })
        .on("mousemove", function (event, feature) {
          const countryName = feature.properties?.name ?? "Pays inconnu";
          const normalized = normalizeCountryName(countryName);
          const totalValue = totalByCountry.get(normalized);
          const perCapitaValue = perCapitaByCountry.get(normalized);

          if (
            typeof totalValue !== "number" ||
            !Number.isFinite(totalValue) ||
            typeof perCapitaValue !== "number" ||
            !Number.isFinite(perCapitaValue)
          ) {
            return;
          }

          const [x, y] = d3.pointer(event, svgElement);
          setTooltip({
            x,
            y,
            country: countryName,
            totalValue: `${totalValue.toLocaleString("fr-FR")} TWh`,
            perCapitaValue: `${perCapitaValue.toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} MWh/hab`,
          });
        })
        .on("mouseleave", function () {
          setTooltip(null);
          d3.select(this).attr("stroke", "#d1d5db").attr("stroke-width", 0.7);
        });
    }

    drawMap();

    return () => {
      cancelled = true;
      setTooltip(null);
    };
  }, [perCapitaByCountry, totalByCountry]);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
        <svg ref={svgRef} className="w-full h-auto" role="img" aria-label="Carte choroplèthe de la consommation d'énergie mondiale" />

        {tooltip ? (
          <div
            className="pointer-events-none absolute rounded-md border border-gray-200 bg-white/95 px-3 py-2 text-xs shadow-sm text-black"
            style={{
              left: `${Math.min(tooltip.x + 16, WIDTH - 180)}px`,
              top: `${Math.max(tooltip.y - 8, 12)}px`,
            }}
          >
            <div className="font-semibold text-black">{tooltip.country}</div>
            <div className="text-black">Consommation totale : {tooltip.totalValue}</div>
            <div className="text-black">Consommation/hab : {tooltip.perCapitaValue}</div>
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
        <span className="font-medium">Échelle :</span>
        <div
          className="h-2 w-24 rounded-full"
          style={{
            background: "linear-gradient(90deg, #f3f4f6 0%, #86efac 50%, #166534 100%)",
          }}
        />
        <span>faible à élevé (consommation par habitant)</span>
      </div>
    </div>
  );
}
