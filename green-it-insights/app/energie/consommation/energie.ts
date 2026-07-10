import fs from "fs";
import path from "path";

export interface EnergyCountryData {
  country: string;
  iso3: string;
  energyTWh: number;
  perCapitaMWh: number;
}

const totalCsvPath = path.join(
  process.cwd(),
  "public",
  "data",
  "energy-use-per-country",
  "OWID_CB_PRIMARY_ENERGY_CONSUMPTION.2021.clean.csv"
);
const perCapitaCsvPath = path.join(
  process.cwd(),
  "public",
  "data",
  "energy-use-per-country",
  "OWID_CB_ENERGY_PER_CAPITA.2021.clean.csv"
);

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function parseCsvRows(content: string) {
  const lines = content.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];

  const header = parseCsvLine(lines.shift() ?? "");
  const countryIndex = header.indexOf("Country");
  const yearIndex = header.indexOf("Year");
  const valueIndex = header.indexOf("EnergyPerCapita_kWh");

  if (countryIndex === -1 || yearIndex === -1 || valueIndex === -1) {
    return [];
  }

  return lines.map((line) => {
    const parts = parseCsvLine(line);
    return {
      country: parts[countryIndex]?.trim() ?? "",
      year: parts[yearIndex]?.trim() ?? "",
      value: Number(parts[valueIndex]),
    };
  });
}

function parseCsv(): EnergyCountryData[] {
  if (!fs.existsSync(totalCsvPath)) return [];

  const totalCsv = fs.readFileSync(totalCsvPath, "utf8");
  const perCapitaCsv = fs.existsSync(perCapitaCsvPath)
    ? fs.readFileSync(perCapitaCsvPath, "utf8")
    : "";

  const totalRows = parseCsvRows(totalCsv);
  const perCapitaRows = parseCsvRows(perCapitaCsv);
  const perCapitaMap = new Map<string, number>();

  perCapitaRows.forEach((row) => {
    if (row.year === "2021" && row.country) {
      perCapitaMap.set(`${row.country}::${row.year}`, row.value / 1000);
    }
  });

  return totalRows
    .filter(
      (row) =>
        row.year === "2021" &&
        row.country &&
        row.country !== "World" &&
        Number.isFinite(row.value)
    )
    .map((row) => ({
      country: row.country,
      iso3: "",
      energyTWh: row.value,
      perCapitaMWh: perCapitaMap.get(`${row.country}::${row.year}`) ?? 0,
    }));
}

let energyConsumptionData: EnergyCountryData[] = [];

try {
  energyConsumptionData = parseCsv();
} catch (e) {
  energyConsumptionData = [];
}

export { energyConsumptionData };
