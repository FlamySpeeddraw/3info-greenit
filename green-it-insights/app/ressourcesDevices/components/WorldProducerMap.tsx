"use client";

import { COLORS } from "@/app/color.const";
import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { Producer } from "@/public/data/producers";

const WIDTH = 960;
const HEIGHT = 520;

const MAP_BACKGROUND = "var(--eco-gray)";
const COUNTRY_FILL = COLORS.eco.white;
const COUNTRY_STROKE = "var(--grass-4)";
const PRODUCER_FILL = COLORS.green.accent;
const PRODUCER_HOVER = COLORS.green.dark;

type WorldProducersMapProps = {
    producers: Producer[];
    onHover: (producer: Producer | null) => void;
};

type GeoFeature = {
    properties: {
        name: string;
    };
};

type WorldGeoJson = {
    features: GeoFeature[];
};

export function WorldProducersMap({
    producers,
    onHover,
}: WorldProducersMapProps) {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const producerByCountry = useMemo(() => {
        return new Map(producers.map((producer) => [producer.country, producer]));
    }, [producers]);

    useEffect(() => {
        let cancelled = false;

        async function drawMap() {
            const svgElement = svgRef.current;
            if (!svgElement) return;

            const geo = await d3.json<WorldGeoJson>("/data/world.geojson");
            if (!geo || cancelled) return;

            const svg = d3.select(svgElement);
            svg.selectAll("*").remove();

            svg.attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`);

            const projection = d3.geoNaturalEarth1().fitSize([WIDTH, HEIGHT], geo as any);
            const path = d3.geoPath(projection);

            svg
                .append("rect")
                .attr("width", WIDTH)
                .attr("height", HEIGHT)
                .attr("fill", MAP_BACKGROUND);

            svg
                .append("g")
                .selectAll("path")
                .data(geo.features)
                .join("path")
                .attr("d", path as any)
                .attr("fill", (country) =>
                    producerByCountry.has(country.properties.name)
                        ? PRODUCER_FILL
                        : COUNTRY_FILL,
                )
                .attr("stroke", COUNTRY_STROKE)
                .attr("stroke-width", 0.7)
                .style("cursor", (country) =>
                    producerByCountry.has(country.properties.name) ? "pointer" : "default",
                )
                .on("mouseenter", function (_event, country) {
                    const producer = producerByCountry.get(country.properties.name);
                    if (!producer) return;

                    onHover(producer);

                    d3.select(this)
                        .attr("fill", PRODUCER_HOVER)
                        .attr("stroke", COLORS.brown.accent)
                        .attr("stroke-width", 1.4);
                })
                .on("mouseleave", function (_event, country) {
                    const producer = producerByCountry.get(country.properties.name);

                    onHover(null);

                    d3.select(this)
                        .attr("fill", producer ? PRODUCER_FILL : COUNTRY_FILL)
                        .attr("stroke", COUNTRY_STROKE)
                        .attr("stroke-width", 0.7);
                });
        }

        drawMap();

        return () => {
            cancelled = true;
        };
    }, [producerByCountry, onHover]);

    return (
        <svg
            ref={svgRef}
            role="img"
            aria-label="Carte mondiale des producteurs de ressources IT"
            className="w-full h-auto"
        />
    );
}