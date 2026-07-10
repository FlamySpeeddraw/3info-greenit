import energyDataset from "../../public/data/emissions-par-pays-owid.json";
import type { EnergyDataset } from "./types";

export const energyData = {
  source: energyDataset.source,
  sourceUrl: energyDataset.sourceUrl,
  downloadedFrom: energyDataset.downloadedFrom,
  generatedAt: energyDataset.generatedAt,
  countries: energyDataset.countries,
} satisfies EnergyDataset;

export const countries = [...energyData.countries].sort((a, b) =>
  a.country.localeCompare(b.country),
);
