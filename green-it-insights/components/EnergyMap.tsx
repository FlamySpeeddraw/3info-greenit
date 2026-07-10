"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Heading, Text, Flex, Box, IconButton } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import { COLORS } from "@/app/color.const"; 
import energyData from "@/data/energy-mix.json";
import { FeatureCollection, Geometry } from "geojson";

const INTENSITY_COLORS = {
  low: COLORS.dark.grass[7],      
  moderate: COLORS.dark.brown[7], 
  high: COLORS.dark.brown[8],     
};

const SVG_WIDTH = 800;
const SVG_HEIGHT = 600;
const CLIP_HEIGHT = 550;

export function EnergyMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedCountry, setSelectedCountry] = useState(energyData[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [geoData, setGeoData] = useState<FeatureCollection<Geometry, any> | null>(null);

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
        const countryData = energyData.find((c) => c.id === d.id);
        if (!countryData) return COLORS.oled.black;

        if (countryData.carbonIntensity < 100) return INTENSITY_COLORS.low;
        if (countryData.carbonIntensity < 400) return INTENSITY_COLORS.moderate;
        return INTENSITY_COLORS.high;
      })
      .attr("stroke", COLORS.eco.white)
      .attr("stroke-width", 0.5)
      .style("cursor", (d) => energyData.find((c) => c.id === d.id) ? "pointer" : "default")
      .on("click", (event, d) => {
        event.stopPropagation();
        const countryData = energyData.find((c) => c.id === d.id);
        if (countryData) {
          setSelectedCountry(countryData);
          setIsDrawerOpen(true);
        }
      })
      .on("mouseover", function(event, d) {
        if(energyData.find((c) => c.id === d.id)) {
          d3.select(this).attr("opacity", 0.85);
        }
      })
      .on("mouseout", function() {
        d3.select(this).attr("opacity", 1);
      });

  }, [geoData]);

  const pieData = [
    { name: "Renouvelable", value: selectedCountry.mix.renewable, color: COLORS.green.accent },
    { name: "Nucléaire", value: selectedCountry.mix.nuclear, color: COLORS.green.light },
    { name: "Fossile", value: selectedCountry.mix.fossil, color: COLORS.brown.dark },
  ].filter(d => d.value > 0);

  const getIntensityLabel = (intensity: number) => {
    if (intensity < 50) return "Bas-carbone";
    if (intensity < 100) return "Très bas-carbone";
    if (intensity < 200) return "Faible";
    if (intensity < 400) return "Modéré";
    return "Très carboné";
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity < 100) return INTENSITY_COLORS.low;
    if (intensity < 400) return INTENSITY_COLORS.moderate;
    return INTENSITY_COLORS.high;
  };

  const handleMapClick = () => {
    if (isDrawerOpen) {
      setIsDrawerOpen(false);
    }
  };

  return (
    <div
      onClick={handleMapClick}
      style={{ 
        backgroundColor: COLORS.dark.background, 
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        display: "flex"
      }}
    >
      {/* Map Section */}
      <div 
        style={{ 
          flex: 1,
          overflow: "hidden",
          position: "relative"
        }}
      >
        <svg 
          ref={svgRef} 
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          style={{ 
            width: "100%",
            height: "100%",
            backgroundColor: COLORS.oled.black,
            display: "block",
            overflow: "hidden"
          }}
        >
          <defs>
            <clipPath id="mapClip">
              <rect x="0" y="0" width={SVG_WIDTH} height={CLIP_HEIGHT} />
            </clipPath>
          </defs>
          <g clipPath="url(#mapClip)" />
        </svg>
      </div>

      {/* Info Drawer - Côté droit */}
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{ 
          backgroundColor: COLORS.oled.black,
          borderLeft: `1px solid ${COLORS.oled.gray}`,
          width: isDrawerOpen ? "350px" : "0px",
          opacity: isDrawerOpen ? 1 : 0,
          pointerEvents: isDrawerOpen ? "auto" : "none",
          display: "flex",
          flexDirection: "column",
          transition: "all 300ms ease-in-out",
          overflowY: "auto"
        }}
      >
        <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <Heading 
              size="5" 
              weight="bold"
              style={{ 
                color: COLORS.eco.white,
                flex: 1,
              }}
            >
              {selectedCountry.name}
            </Heading>
            <IconButton 
              variant="ghost" 
              onClick={() => setIsDrawerOpen(false)}
              style={{ color: COLORS.dark.brown[9], width: "32px", height: "32px" }}
            >
              <Cross1Icon width="18" height="18" />
            </IconButton>
          </div>

          {/* Intensité Carbone */}
          <div style={{ marginBottom: "24px" }}>
            <Text 
              size="1"
              weight="bold"
              style={{ 
                color: COLORS.dark.grass[7],
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.75rem",
                display: "block",
                fontSize: "0.75rem"
              }}
            >
              Intensité carbone
            </Text>
            <Heading 
              size="4"
              style={{ 
                color: getIntensityColor(selectedCountry.carbonIntensity),
                marginBottom: "0.5rem"
              }}
            >
              {selectedCountry.carbonIntensity}
            </Heading>
            <Text 
              size="1"
              style={{ color: COLORS.dark.foreground, fontSize: "0.875rem" }}
            >
              gCO₂e/kWh
            </Text>
            <Text 
              size="1"
              style={{ color: COLORS.dark.grass[7], marginTop: "0.5rem" }}
            >
              {getIntensityLabel(selectedCountry.carbonIntensity)}
            </Text>
          </div>

          {/* Mix Énergétique */}
          <div>
            <Text 
              size="1"
              weight="bold"
              style={{ 
                color: COLORS.dark.grass[7],
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "1.25rem",
                display: "block",
                fontSize: "0.75rem"
              }}
            >
              Mix énergétique
            </Text>

            {/* Barres */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {pieData.map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <Text 
                      size="1"
                      style={{ color: COLORS.dark.foreground, fontSize: "0.875rem" }}
                    >
                      {item.name}
                    </Text>
                    <Text 
                      size="1" 
                      weight="bold"
                      style={{ color: COLORS.eco.white, fontSize: "0.875rem" }}
                    >
                      {item.value}%
                    </Text>
                  </div>
                  <div
                    style={{
                      height: "5px",
                      backgroundColor: COLORS.oled.gray,
                      borderRadius: "2.5px",
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                        opacity: 0.9,
                        transition: "width 0.3s ease"
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