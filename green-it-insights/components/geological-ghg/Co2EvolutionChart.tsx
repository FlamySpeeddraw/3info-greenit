"use client";

import { useMemo } from "react";
import * as d3 from "d3";
import type {
  Co2DataPoint,
  Co2HealthThreshold,
  GeologicalPeriodId,
} from "@/types/geological-ghg";
import styles from "./geological-ghg.module.css";

type Co2EvolutionChartProps = {
  activePeriodId: GeologicalPeriodId;
  data: readonly Co2DataPoint[];
  dangerExplanation: string;
  healthThresholds: readonly Co2HealthThreshold[];
  note: string;
  progress: number;
};

type ChartPoint = Co2DataPoint & {
  isInterpolated?: boolean;
};

const WIDTH = 760;
const HEIGHT = 230;
const MARGIN = {
  top: 18,
  right: 26,
  bottom: 42,
  left: 58,
};

const yTickValues = [280, 420, 1000, 10000, 100000];

function getVisiblePoints(
  data: readonly Co2DataPoint[],
  progress: number,
): ChartPoint[] {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  if (clampedProgress <= 0.01 || data.length === 0) {
    return [];
  }

  if (data.length === 1) {
    return [data[0]];
  }

  const segmentProgress = clampedProgress * (data.length - 1);
  const fullIndex = Math.min(data.length - 1, Math.floor(segmentProgress));
  const visiblePoints: ChartPoint[] = data.slice(0, fullIndex + 1);
  const partialProgress = segmentProgress - fullIndex;
  const nextPoint = data[fullIndex + 1];
  const currentPoint = data[fullIndex];

  if (nextPoint && partialProgress > 0) {
    visiblePoints.push({
      ...nextPoint,
      id: `${currentPoint.id}-${nextPoint.id}-interpolated`,
      co2Ppm: d3.interpolateNumber(
        currentPoint.co2Ppm,
        nextPoint.co2Ppm,
      )(partialProgress),
      label: nextPoint.label,
      shortLabel: nextPoint.shortLabel,
      timeLabel: nextPoint.timeLabel,
      visualPosition: d3.interpolateNumber(
        currentPoint.visualPosition,
        nextPoint.visualPosition,
      )(partialProgress),
      isInterpolated: true,
    });
  }

  return visiblePoints;
}

export function Co2EvolutionChart({
  activePeriodId,
  data,
  dangerExplanation,
  healthThresholds,
  note,
  progress,
}: Co2EvolutionChartProps) {
  const chart = useMemo(() => {
    const xScale = d3
      .scaleLinear()
      .domain([0, 6])
      .range([MARGIN.left, WIDTH - MARGIN.right]);
    const yScale = d3
      .scaleLog()
      .domain([250, 120000])
      .range([HEIGHT - MARGIN.bottom, MARGIN.top])
      .clamp(true);
    const visiblePoints = getVisiblePoints(data, progress);
    const line = d3
      .line<ChartPoint>()
      .defined((point) => point.co2Ppm > 0)
      .x((point) => xScale(point.visualPosition))
      .y((point) => yScale(point.co2Ppm))
      .curve(d3.curveMonotoneX);
    const activePoint =
      [...visiblePoints]
        .reverse()
        .find((point) => point.periodId === activePeriodId) ??
      visiblePoints[visiblePoints.length - 1];

    return {
      activePoint,
      healthThresholdPositions: healthThresholds.map((threshold) => ({
        ...threshold,
        rangeEndY: threshold.rangeEndPpm
          ? yScale(threshold.rangeEndPpm)
          : undefined,
        y: yScale(threshold.ppm),
      })),
      linePath: visiblePoints.length > 1 ? line(visiblePoints) : "",
      visiblePoints,
      xScale,
      yScale,
    };
  }, [activePeriodId, data, healthThresholds, progress]);

  return (
    <figure className={styles.chartSurface}>
      <figcaption className={styles.chartCaption}>
        <span>CO₂ atmosphérique</span>
        <small>{note}</small>
      </figcaption>
      <p className={styles.chartWarning}>{dangerExplanation}</p>

      <svg
        aria-label="Courbe synchronisée de concentration de dioxyde de carbone atmosphérique"
        className={styles.co2Chart}
        focusable="false"
        role="img"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        <g aria-hidden="true">
          {yTickValues.map((tick) => (
            <g className={styles.chartGridLine} key={tick}>
              <line
                x1={MARGIN.left}
                x2={WIDTH - MARGIN.right}
                y1={chart.yScale(tick)}
                y2={chart.yScale(tick)}
              />
              <text x={MARGIN.left - 10} y={chart.yScale(tick) + 4}>
                {tick >= 1000 ? `${tick / 1000}k` : tick}
              </text>
            </g>
          ))}

          {chart.healthThresholdPositions.map((threshold) => (
            <g
              className={styles.chartHealthThreshold}
              data-severity={threshold.severity}
              key={threshold.id}
            >
              {threshold.rangeEndY ? (
                <rect
                  height={Math.max(2, threshold.y - threshold.rangeEndY)}
                  width={WIDTH - MARGIN.left - MARGIN.right}
                  x={MARGIN.left}
                  y={threshold.rangeEndY}
                />
              ) : null}
              <line
                x1={MARGIN.left}
                x2={WIDTH - MARGIN.right}
                y1={threshold.y}
                y2={threshold.y}
              />
              <text x={WIDTH - MARGIN.right} y={threshold.y - 6}>
                {threshold.label}
              </text>
            </g>
          ))}

          {data.map((point) => (
            <text
              className={styles.chartXAxisLabel}
              key={point.id}
              x={chart.xScale(point.visualPosition)}
              y={HEIGHT - 14}
            >
              {point.shortLabel}
            </text>
          ))}
        </g>

        <path
          className={styles.chartBasePath}
          d={
            d3
              .line<Co2DataPoint>()
              .x((point) => chart.xScale(point.visualPosition))
              .y((point) => chart.yScale(point.co2Ppm))
              .curve(d3.curveMonotoneX)(data) ?? undefined
          }
        />

        {chart.linePath ? (
          <path className={styles.chartProgressPath} d={chart.linePath} />
        ) : null}

        {chart.visiblePoints.map((point) => (
          <circle
            className={[
              styles.chartPoint,
              point.isIndustrialRise ? styles.chartPointIndustrial : "",
            ].join(" ")}
            cx={chart.xScale(point.visualPosition)}
            cy={chart.yScale(point.co2Ppm)}
            key={point.id}
            r={point.isInterpolated ? 3.4 : 4.2}
          />
        ))}

        {chart.activePoint ? (
          <g className={styles.chartActivePoint}>
            <circle
              cx={chart.xScale(chart.activePoint.visualPosition)}
              cy={chart.yScale(chart.activePoint.co2Ppm)}
              r="9"
            />
            <text
              x={chart.xScale(chart.activePoint.visualPosition)}
              y={chart.yScale(chart.activePoint.co2Ppm) - 14}
            >
              {Math.round(chart.activePoint.co2Ppm).toLocaleString("fr-FR")} ppm
            </text>
          </g>
        ) : null}
      </svg>
    </figure>
  );
}
