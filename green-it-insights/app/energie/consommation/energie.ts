import totalJsonData from "@/public/data/energy-use-per-country/primary-energy-consumption-2021.json";
import perCapitaJsonData from "@/public/data/energy-use-per-country/energy-per-capita-2021.json";

export interface EnergyCountryData {
  country: string;
  iso3: string;
  energyTWh: number;
  perCapitaMWh: number;
}

interface EnergyJsonRow {
  country: string;
  year: string;
  energyPerCapita_kWh?: number;
}

function parseJson(): EnergyCountryData[] {
  const totalRows = totalJsonData as EnergyJsonRow[];
  const perCapitaRows = perCapitaJsonData as EnergyJsonRow[];
  const perCapitaMap = new Map<string, number>();

  perCapitaRows.forEach((row) => {
    if (row.year === "2021" && row.country) {
      perCapitaMap.set(`${row.country}::${row.year}`, (row.energyPerCapita_kWh ?? 0) / 1000);
    }
  });

  return totalRows
    .filter(
      (row) =>
        row.year === "2021" &&
        row.country &&
        row.country !== "World"
    )
    .map((row) => ({
      country: row.country,
      iso3: "",
      energyTWh: Number(row.energyPerCapita_kWh ?? 0),
      perCapitaMWh: perCapitaMap.get(`${row.country}::${row.year}`) ?? 0,
    }));
}

let energyConsumptionData: EnergyCountryData[] = [];

try {
  energyConsumptionData = parseJson();
} catch {
  energyConsumptionData = [];
}

export { energyConsumptionData };
