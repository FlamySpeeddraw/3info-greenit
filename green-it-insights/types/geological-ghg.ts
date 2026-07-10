export type GeologicalPeriodId =
  | "primitive-earth"
  | "proterozoic"
  | "paleozoic"
  | "mesozoic"
  | "cenozoic"
  | "current";

export type GeologicalIllustrationTone =
  | "volcanic"
  | "oceanic"
  | "forest"
  | "coast"
  | "ice"
  | "industrial";

export type GeologicalIllustration = {
  src?: string;
  alt: string;
  tone: GeologicalIllustrationTone;
};

export type Co2DataPoint = {
  id: string;
  periodId: GeologicalPeriodId;
  label: string;
  shortLabel: string;
  timeLabel: string;
  visualPosition: number;
  co2Ppm: number;
  isIndustrialRise?: boolean;
};

export type Co2HealthThreshold = {
  id: string;
  ppm: number;
  label: string;
  description: string;
  severity: "sensitive" | "occupational" | "short-term" | "evacuation" | "lethal";
  rangeEndPpm?: number;
};

export type GeologicalPeriod = {
  id: GeologicalPeriodId;
  name: string;
  dates: string;
  description: string;
  illustration: GeologicalIllustration;
  greenhouseGases: string[];
  majorEvents: string[];
  co2Values: Co2DataPoint[];
};
