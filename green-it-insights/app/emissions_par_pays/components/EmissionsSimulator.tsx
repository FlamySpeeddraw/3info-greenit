import type { CountryEnergyData } from "../types";

type EmissionsSimulatorProps = {
  emissionsKg: number;
  franceRatio: number;
  kwh: number;
  polandFranceRatio: number;
  selectedCountry: CountryEnergyData;
  onKwhChange: (kwh: number) => void;
};

export function EmissionsSimulator({
  emissionsKg,
  franceRatio,
  kwh,
  polandFranceRatio,
  selectedCountry,
  onKwhChange,
}: EmissionsSimulatorProps) {
  return (
    <section className="rounded-lg border border-[#112F1F]/15 bg-[#112F1F] p-5 text-[#FBFBF9] shadow-sm sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-center">
        <div>
          <h2 className="text-2xl font-bold">Simulation des emissions</h2>
          <p className="mt-2 text-sm leading-6 text-[#DDE8DE]">
            Saisis une consommation electrique pour estimer les emissions selon
            le pays choisi.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
          <label className="block">
            <span className="text-sm font-semibold text-[#DDE8DE]">
              Consommation en kWh
            </span>
            <input
              type="number"
              min="0"
              step="1"
              value={kwh}
              onChange={(event) =>
                onKwhChange(Math.max(0, Number(event.target.value)))
              }
              className="mt-2 w-full rounded-md border border-[#FBFBF9]/20 bg-[#FBFBF9] px-3 py-3 text-lg font-bold text-[#112F1F] outline-none transition focus:ring-2 focus:ring-[#D0A629]"
            />
          </label>

          <div className="rounded-md border border-[#FBFBF9]/20 bg-[#FBFBF9]/10 p-4">
            <p className="text-sm text-[#DDE8DE]">Emissions estimees</p>
            <p className="mt-1 text-3xl font-bold">
              {emissionsKg.toFixed(1)}
              <span className="ml-2 text-base font-semibold">kgCO2</span>
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 rounded-md bg-[#FBFBF9]/10 p-4 text-sm leading-6 text-[#FBFBF9]">
        {selectedCountry.country === "France" ? (
          <>
            Pour une meme consommation electrique, heberger ce service en
            Pologne genere environ {polandFranceRatio.toFixed(0)} fois plus de
            CO2 qu&apos;en France.
          </>
        ) : (
          <>
            Pour une meme consommation electrique, heberger ce service en{" "}
            {selectedCountry.country} genere environ {franceRatio.toFixed(1)}{" "}
            fois les emissions mesurees en France.
          </>
        )}
      </p>
    </section>
  );
}
