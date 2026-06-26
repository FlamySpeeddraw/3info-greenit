"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Card, Heading, Text, Flex, Box, Badge, IconButton } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";
import energyData from "@/data/energy-mix.json";
import { FeatureCollection, Geometry } from "geojson";

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
    const width = 800;
    const height = 400;

    svg.selectAll("*").remove();

    const projection = d3.geoMercator()
      .scale(120)
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
        if (!countryData) return "#e1eae3";

        if (countryData.carbonIntensity < 100) return "#80ae87";
        if (countryData.carbonIntensity < 400) return "#c1a6a0";
        return "#3D2E2B";
      })
      .attr("stroke", "#FBFBF9")
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
            d3.select(this).attr("opacity", 0.7);
         }
      })
      .on("mouseout", function() {
         d3.select(this).attr("opacity", 1);
      });

  }, [geoData]);

  const pieGenerator = d3.pie<any>().value((d) => d.value).sort(null);
  const arcGenerator = d3.arc<any>().innerRadius(0).outerRadius(80);
  
  const pieData = pieGenerator([
    { name: "Renouvelable", value: selectedCountry.mix.renewable, color: "#2E6A49" },
    { name: "Nucléaire", value: selectedCountry.mix.nuclear, color: "#224D35" },
    { name: "Fossile", value: selectedCountry.mix.fossil, color: "#3D2E2B" },
  ].filter(d => d.value > 0));

  return (
    <Card variant="surface" className="w-full relative overflow-hidden border p-0 shadow-sm" style={{ borderColor: '#3D2E2B20' }}>
      
      <Box className="w-full bg-eco-white dark:bg-oled-black">
        <svg ref={svgRef} viewBox="0 0 800 400" className="w-full h-auto" />
      </Box>

      <Box 
        className={`absolute top-0 left-0 h-full w-full sm:w-80 p-6 pt-12 shadow-2xl transition-transform duration-500 ease-in-out z-10 flex flex-col justify-start`}
        style={{ 
          backgroundColor: '#FBFBF9',
          transform: isDrawerOpen ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        <Flex justify="between" align="center" mb="4">
          <Heading size="6" style={{ color: '#112F1F' }}>
            {selectedCountry.name}
          </Heading>
          <IconButton variant="ghost" color="gray" onClick={() => setIsDrawerOpen(false)}>
            <Cross1Icon />
          </IconButton>
        </Flex>
        
        <Box mb="6">
          <Badge 
            color={selectedCountry.carbonIntensity < 100 ? "grass" : selectedCountry.carbonIntensity < 400 ? "orange" : "tomato"}
            size="2" 
          >
            {selectedCountry.carbonIntensity} gCO₂e/kWh
          </Badge>
        </Box>

        <Text size="2" weight="bold" mb="4" className="block" style={{ color: '#3D2E2B' }}>
          Mix Énergétique :
        </Text>

        <Flex justify="center" mb="6">
          <svg viewBox="-100 -100 200 200" width="160" height="160">
            {pieData.map((arc, i) => (
              <path 
                key={i} 
                d={arcGenerator(arc) as string} 
                fill={arc.data.color}
                stroke="#FBFBF9"
                strokeWidth="2"
              />
            ))}
          </svg>
        </Flex>

        <Flex direction="column" gap="2">
          {pieData.map((arc, i) => (
            <Flex key={i} align="center" justify="between">
              <Flex align="center" gap="2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: arc.data.color }}></div>
                <Text size="2" style={{ color: '#112F1F' }}>{arc.data.name}</Text>
              </Flex>
              <Text size="2" weight="bold" style={{ color: '#3D2E2B' }}>{arc.data.value}%</Text>
            </Flex>
          ))}
        </Flex>

      </Box>
    </Card>
  );
}