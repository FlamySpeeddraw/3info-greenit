export type EnergyMix = {
  charbon: number;
  gaz: number;
  nucleaire: number;
  hydraulique: number;
  eolien: number;
  solaire: number;
  autres: number;
};

export type CountryEnergyData = {
  country: string;
  sourceCountry: string;
  isoCode: string;
  year: number;
  carbonIntensity: number;
  mix: EnergyMix;
};

export type EnergyDataset = {
  source: string;
  sourceUrl: string;
  downloadedFrom: string;
  generatedAt: string;
  countries: CountryEnergyData[];
};
