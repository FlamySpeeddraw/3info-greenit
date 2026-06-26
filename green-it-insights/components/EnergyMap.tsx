"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Heading, Text, Flex, Box, IconButton } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import energyData from "@/data/energy-mix.json";
import { FeatureCollection, Geometry } from "geojson";

const COLORS = {
  dark: {
    bg: "#080E0A",
    foreground: "#EAEFEA",
  },
  eco: {
    white: "#FBFBF9",
  },
  green: {
    dark: "#112F1F",
    light: "#224D35",
    accent: "#2E6A49",
    pale: "#37704e",
  },
  brown: {
    dark: "#3D2E2B",
    light: "#5C4641",
    accent: "#8E6E66",
  },
  intensity: {
    low: "#37704e",      // Bas-carbone
    moderate: "#ae8b83", // Modéré
    high: "#704545",     // Très carboné
  },
};

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
    const width = 1200;
    const height = 600;

    svg.selectAll("*").remove();

    const projection = d3.geoMercator()
      .scale(150)
      .center([0, 40])
      .translate([width / 2, height / 2]);

    const pathGenerator = d3.geoPath().projection(projection);

    svg.append("g")
      .selectAll("path")
      .data(geoData.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator as any)
      .attr("fill", (d) => {
        const countryData = energyData.find((c) => c.id === d.id);
        if (!countryData) return COLORS.dark.bg;

        if (countryData.carbonIntensity < 100) return COLORS.intensity.low;
        if (countryData.carbonIntensity < 400) return COLORS.intensity.moderate;
        return COLORS.intensity.high;
      })
      .attr("stroke", "#2a3a30")
      .attr("stroke-width", 0.5)
      .style("cursor", (d) => energyData.find((c) => c.id === d.id) ? "pointer" : "default")
      .on("click", (event, d) => {
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
    if (intensity < 100) return COLORS.intensity.low;
    if (intensity < 400) return COLORS.intensity.moderate;
    return COLORS.intensity.high;
  };

  return (
    <Box className="w-full relative overflow-hidden" style={{ backgroundColor: COLORS.dark.bg, minHeight: "100vh" }}>
      
      <svg ref={svgRef} viewBox="0 0 1200 600" className="w-full h-auto display-block" style={{ backgroundColor: COLORS.dark.bg }} />

      {/* Drawer Bottom Panel */}
      <Box 
        className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-in-out z-20 overflow-y-auto"
        style={{ 
          backgroundColor: COLORS.dark.bg,
          borderTop: `1px solid #2a3a30`,
          maxHeight: isDrawerOpen ? "420px" : "0px",
          opacity: isDrawerOpen ? 1 : 0,
          pointerEvents: isDrawerOpen ? "auto" : "none",
        }}
      >
        <Box className="p-8" style={{ maxWidth: "100%", margin: "0 auto" }}>
          {/* Header avec Close */}
          <Flex justify="between" align="center" mb="6">
            <IconButton 
              variant="ghost" 
              onClick={() => setIsDrawerOpen(false)}
              style={{ color: COLORS.brown.accent }}
            >
              <Cross1Icon width="20" height="20" />
            </IconButton>
            <Heading 
              size="6" 
              weight="bold"
              style={{ 
                color: COLORS.eco.white,
                flex: 1,
                textAlign: "center"
              }}
            >
              {selectedCountry.name}
            </Heading>
            <Box style={{ width: "40px" }} />
          </Flex>

          {/* Content Grid */}
          <Flex gap="8" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%", maxWidth: "900px", margin: "0 auto" }}>
            
            {/* Left Column - Intensité */}
            <Box>
              <Text 
                size="1"
                weight="bold"
                style={{ 
                  color: COLORS.green.pale,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                  display: "block"
                }}
              >
                Intensité carbone
              </Text>
              <Heading 
                size="5"
                style={{ 
                  color: getIntensityColor(selectedCountry.carbonIntensity),
                  marginBottom: "0.5rem"
                }}
              >
                {selectedCountry.carbonIntensity} gCO₂e/kWh
              </Heading>
              <Text 
                size="2"
                style={{ color: COLORS.dark.foreground }}
              >
                {getIntensityLabel(selectedCountry.carbonIntensity)}
              </Text>
            </Box>

            {/* Right Column - Mix */}
            <Box>
              <Text 
                size="1"
                weight="bold"
                style={{ 
                  color: COLORS.green.pale,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  marginBottom: "1rem",
                  display: "block"
                }}
              >
                Mix énergétique
              </Text>

              {/* Barres de pourcentage */}
              <Flex direction="column" gap="3">
                {pieData.map((arc, i) => (
                  <Box key={i}>
                    <Flex justify="between" align="center" mb="2">
                      <Flex align="center" gap="2">

                        <Text 
                          size="1"
                          style={{ color: COLORS.dark.foreground }}
                        >
                          {arc.name}
                        </Text>
                      </Flex>
                      <Text 
                        size="1" 
                        weight="bold"
                        style={{ color: COLORS.eco.white }}
                      >
                        {arc.value}%
                      </Text>
                    </Flex>
                    <Box
                      style={{
                        height: "6px",
                        backgroundColor: "#2a3a30",
                        borderRadius: "3px",
                        overflow: "hidden"
                      }}
                    >
                      <Box
                        style={{
                          height: "100%",
                          width: `${arc.value}%`,
                          backgroundColor: arc.color,
                          opacity: 0.85,
                          transition: "width 0.3s ease"
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}