const fs = require('fs');
const path = require('path');

const [inputArg, outputArg, ...yearArgs] = process.argv.slice(2);
const inputPath = inputArg || path.join(__dirname, '../public/data/energy-use-per-country/OWID_CB_ENERGY_PER_CAPITA.csv');
const outputPath = outputArg || path.join(__dirname, '../public/data/energy-use-per-country/OWID_CB_ENERGY_PER_CAPITA.2021.clean.csv');
const years = yearArgs.length > 0 ? yearArgs : ['2021'];
const yearSet = new Set(years.map(String));

function parseCsvLine(line) {
  const values = [];
  let current = '';
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
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function stringifyCsvRow(fields) {
  return fields
    .map((value) => {
      if (value == null) return '';
      const escaped = String(value).replace(/"/g, '""');
      return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')
        ? `"${escaped}"`
        : escaped;
    })
    .join(',');
}

if (!fs.existsSync(inputPath)) {
  console.error(`Input file not found: ${inputPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(inputPath, 'utf8');
const rows = raw.split(/\r?\n/).filter((line) => line.trim().length > 0);
if (rows.length === 0) {
  console.error('Input CSV is empty or missing rows.');
  process.exit(1);
}

const header = parseCsvLine(rows[0]);
const countryLabelIdx = header.indexOf('REF_AREA_LABEL');
const yearIdx = header.indexOf('TIME_PERIOD');
const valueIdx = header.indexOf('OBS_VALUE');

if (countryLabelIdx === -1 || yearIdx === -1 || valueIdx === -1) {
  console.error('Impossible de trouver les colonnes REF_AREA_LABEL, TIME_PERIOD ou OBS_VALUE dans le CSV.');
  process.exit(1);
}

const seen = new Set();
const filtered = rows.slice(1).reduce((acc, line) => {
  const cols = parseCsvLine(line);
  const country = cols[countryLabelIdx] || '';
  const rowYear = cols[yearIdx] || '';
  const value = cols[valueIdx] || '';

  if (yearSet.has(rowYear) && value.trim() !== '') {
    const key = `${country}::${rowYear}`;
    if (!seen.has(key)) {
      seen.add(key);
      acc.push([country, rowYear, value]);
    }
  }

  return acc;
}, []);

if (filtered.length === 0) {
  console.warn(`Aucune ligne trouvée pour les années ${years.join(', ')}. Vérifiez que le fichier contient bien des données pour ces années.`);
}

const output = [
  stringifyCsvRow(['Country', 'Year', 'EnergyPerCapita_kWh']),
  ...filtered.map((row) => stringifyCsvRow(row)),
].join('\n') + '\n';

fs.writeFileSync(outputPath, output, 'utf8');
console.log(`Fichier nettoyé écrit dans ${outputPath} (${filtered.length} lignes).`);
