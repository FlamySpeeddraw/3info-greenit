"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Heading, Text, IconButton } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { COLORS } from "@/app/color.const";
import { useTheme } from "@/app/theme-provider";
import energyDataRaw from "@/public/data/emissions-par-pays-owid.json";
import { FeatureCollection, Geometry } from "geojson";

const energyData = energyDataRaw.countries;

const SVG_WIDTH = 800;
const SVG_HEIGHT = 600;
const CLIP_HEIGHT = 550;

interface EnergyMapProps {
  theme?: "dark" | "light";
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function EnergyMap({ theme }: EnergyMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCountry, setSelectedCountry] = useState(energyData[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry, any> | null>(null);
  const isMobile = useIsMobile();
  const { useDarkMode } = useTheme();

  const isDark = theme === "dark" || useDarkMode;

  const ui = isDark
    ? {
        bg: COLORS.oled.black,
        surface: COLORS.oled.gray,
        border: COLORS.oled.gray,
        text: COLORS.dark.foreground,
        strong: COLORS.eco.white,
        label: COLORS.dark.grass[7],
        stroke: COLORS.eco.white,
        noData: COLORS.oled.gray,
        close: COLORS.dark.brown[9],
      }
    : {
        bg: COLORS.eco.white,
        surface: COLORS.eco.gray,
        border: COLORS.light.grass[4],
        text: COLORS.light.foreground,
        strong: COLORS.green.dark,
        label: COLORS.green.accent,
        stroke: COLORS.light.grass[6],
        noData: COLORS.light.grass[3],
        close: COLORS.brown.light,
      };

  const intensityColors = isDark
    ? {
        low: COLORS.dark.grass[7],
        moderate: COLORS.dark.brown[7],
        high: COLORS.dark.brown[8],
      }
    : {
        low: COLORS.green.accent,
        moderate: COLORS.brown.accent,
        high: COLORS.brown.dark,
      };

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  useEffect(() => {
    if (!geoData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = SVG_WIDTH;
    const height = SVG_HEIGHT;

    svg.selectAll("path").remove();

    const projection = d3.geoMercator()
      .scale(120)
      .center([0, 40])
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    svg.select("g[clip-path]")
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("fill", (d) => {
        // Changement ici : on utilise isoCode au lieu de id
        const countryData = energyData.find((c) => c.isoCode === d.id);
        if (!countryData) return ui.noData;

        if (countryData.carbonIntensity < 100) return intensityColors.low;
        if (countryData.carbonIntensity < 400) return intensityColors.moderate;
        return intensityColors.high;
      })
      .attr("stroke", ui.stroke)
      .attr("stroke-width", 0.5)
      .style("cursor", (d) => energyData.find((c) => c.isoCode === d.id) ? "pointer" : "default")
      .on("click", (event, d) => {
        event.stopPropagation();
        const countryData = energyData.find((c) => c.isoCode === d.id);
        if (countryData) {
          setSelectedCountry(countryData);
          setIsDrawerOpen(true);
        }
      })
      .on("mouseover", function(event, d) {
        if(energyData.find((c) => c.isoCode === d.id)) {
          d3.select(this).attr("opacity", 0.85);
        }
      })
      .on("mouseout", function() {
        d3.select(this).attr("opacity", 1);
      });

  }, [geoData, isDark, ui.noData, ui.stroke, intensityColors]);

  // Agrégation des nouvelles données détaillées
  const mix = selectedCountry.mix;
  const pieData = [
    { 
      name: "Renouvelable", 
      value: Number((mix.hydraulique + mix.eolien + mix.solaire).toFixed(1)), 
      color: COLORS.green.accent 
    },
    { 
      name: "Nucléaire", 
      value: mix.nucleaire, 
      color: COLORS.green.light 
    },
    { 
      name: "Fossile", 
      value: Number((mix.charbon + mix.gaz).toFixed(1)), 
      color: COLORS.brown.dark 
    },
    {
      name: "Autres",
      value: mix.autres,
      color: ui.border 
    }
  ].filter(d => d.value > 0);

  const getIntensityLabel = (intensity: number) => {
    if (intensity < 50) return "Bas-carbone";
    if (intensity < 100) return "Très bas-carbone";
    if (intensity < 200) return "Faible";
    if (intensity < 400) return "Modéré";
    return "Très carboné";
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity < 100) return intensityColors.low;
    if (intensity < 400) return intensityColors.moderate;
    return intensityColors.high;
  };

  const handleMapClick = () => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  };

  return (
    <div
      onClick={handleMapClick}
      className={`relative flex w-full overflow-hidden ${isMobile ? "h-[70vh]" : "h-screen"}`}
      style={{ backgroundColor: ui.bg }}
    >
      {/* Map Section */}
      <div className="relative flex-1 overflow-hidden">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          className="block w-full h-full overflow-hidden"
          style={{ backgroundColor: ui.bg }}
        >
          <defs>
            <clipPath id="mapClip">
              <rect x="0" y="0" width={SVG_WIDTH} height={CLIP_HEIGHT} />
            </clipPath>
          </defs>
          <g clipPath="url(#mapClip)" />
        </svg>
      </div>

      {/* Info Drawer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          flex flex-col overflow-y-auto transition-all duration-300 ease-in-out z-10
          ${isMobile 
            ? "absolute left-0 right-0 bottom-0 max-h-[65%] rounded-t-2xl border-t" 
            : "border-l"
          }
        `}
        style={{
          backgroundColor: ui.bg,
          borderColor: ui.border,
          transform: isMobile ? (isDrawerOpen ? "translateY(0)" : "translateY(100%)") : "none",
          width: !isMobile ? (isDrawerOpen ? "350px" : "0px") : "auto",
          opacity: isDrawerOpen ? 1 : 0,
          pointerEvents: isDrawerOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col flex-1 p-6 min-h-0">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <Heading
              size="5"
              weight="bold"
              className="flex-1"
              style={{ color: ui.strong }}
            >
              {/* Changement ici : utilisation de "country" au lieu de "name" */}
              {selectedCountry.country}
            </Heading>
            <IconButton
              variant="ghost"
              onClick={() => setIsDrawerOpen(false)}
              className="w-8 h-8 cursor-pointer"
              style={{ color: ui.close }}
            >
              <Cross1Icon width="18" height="18" />
            </IconButton>
          </div>

          {/* Intensité Carbone */}
          <div className="mb-6">
            <Text
              size="1"
              weight="bold"
              className="block mb-3 uppercase tracking-wider text-xs"
              style={{ color: ui.label }}
            >
              Intensité carbone
            </Text>
            <Heading
              size="4"
              className="mb-2"
              style={{ color: getIntensityColor(selectedCountry.carbonIntensity) }}
            >
              {selectedCountry.carbonIntensity}
            </Heading>
            <Text
              size="1"
              className="text-sm"
              style={{ color: ui.text }}
            >
              gCO₂e/kWh
            </Text>
            <Text
              size="1"
              className="block mt-2"
              style={{ color: ui.label }}
            >
              {getIntensityLabel(selectedCountry.carbonIntensity)}
            </Text>
          </div>

          {/* Mix Énergétique */}
          <div>
            <Text
              size="1"
              weight="bold"
              className="block mb-5 uppercase tracking-wider text-xs"
              style={{ color: ui.label }}
            >
              Mix énergétique
            </Text>

            {/* Barres */}
            <div className="flex flex-col gap-3">
              {pieData.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <Text
                      size="1"
                      className="text-sm"
                      style={{ color: ui.text }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      size="1"
                      weight="bold"
                      className="text-sm"
                      style={{ color: ui.strong }}
                    >
                      {item.value}%
                    </Text>
                  </div>
                  <div
                    className="h-[5px] rounded-full overflow-hidden"
                    style={{ backgroundColor: ui.surface }}
                  >
                    <div
                      className="h-full opacity-90 transition-all duration-300 ease-out"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}