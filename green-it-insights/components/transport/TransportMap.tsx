"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { COLORS } from "@/app/color.const";

const PRODUCTION_CENTERS = [
  { name: "Taïwan", lat: 23.5, lng: 121.0, type: "Semi-conducteurs, puces", size: 12 },
  { name: "Chine (Shenzhen)", lat: 22.5, lng: 114.1, type: "Assemblage, électronique", size: 14 },
  { name: "Corée du Sud", lat: 37.5, lng: 127.0, type: "Mémoires, écrans OLED", size: 10 },
  { name: "Japon", lat: 36.2, lng: 138.3, type: "Composants optiques, capteurs", size: 9 },
  { name: "États-Unis", lat: 37.8, lng: -96.0, type: "Semi-conducteurs, IA", size: 10 },
  { name: "Allemagne", lat: 51.2, lng: 10.4, type: "Équipements industriels IT", size: 8 },
  { name: "Inde", lat: 20.6, lng: 78.9, type: "Assemblage, logiciels", size: 8 },
  { name: "Malaisie", lat: 4.2, lng: 108.0, type: "Semi-conducteurs, PCB", size: 7 },
];

export function TransportMap() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const drawMap = () => {
      if (!svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const width = svgRef.current.clientWidth;
      const height = Math.max(width * 0.5, 250);
      svgRef.current.setAttribute("height", `${height}`);

      const projection = d3.geoNaturalEarth1()
        .scale(width / 6.5)
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(projection);
      const g = svg.append("g");

      d3.json<GeoJSON.FeatureCollection>(
        "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
      ).then((world) => {
        if (!world) return;

        g.selectAll("path")
          .data(world.features)
          .enter()
          .append("path")
          .attr("d", path as never)
          .attr("fill", "#2d5a3f")
          .attr("stroke", "#bbf7d0")
          .attr("stroke-width", 0.5);

        PRODUCTION_CENTERS.forEach((center) => {
          const coords = projection([center.lng, center.lat]);
          if (!coords) return;
          const [x, y] = coords;

          g.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", center.size)
            .attr("fill", COLORS.brown.dark)
            .attr("fill-opacity", 0.85)
            .attr("stroke", COLORS.eco.white)
            .attr("stroke-width", 1.5)
            .style("cursor", "pointer")
            .on("mouseover", function () {
              d3.select(this).attr("fill", COLORS.brown.light);
              svg.append("foreignObject")
                .attr("id", "d3-tooltip")
                .attr("x", x + 14)
                .attr("y", y - 30)
                .attr("width", 180)
                .attr("height", 70)
                .append("xhtml:div")
                .style("background", COLORS.eco.white)
                .style("color", COLORS.oled.black)
                .style("padding", "8px 10px")
                .style("border-radius", "8px")
                .style("font-size", "12px")
                .style("border", "1px solid #ffffff20")
                .html(`<strong>${center.name}</strong><br/>${center.type}`);
            })
            .on("mouseout", function () {
              d3.select(this).attr("fill", COLORS.brown.dark);
              svg.select("#d3-tooltip").remove();
            });
        });
      });
    };

    drawMap();

    const observer = new ResizeObserver(() => drawMap());
    observer.observe(svgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full rounded-2xl border overflow-hidden bg-eco-gray dark:bg-oled-gray border-brown-dark/10 dark:border-eco-white/5">
      <svg
        ref={svgRef}
        className="w-full"
      />
    </div>
  );
}