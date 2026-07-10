import {
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
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
    <Card
      asChild
      variant="surface"
      className="simulator-card"
    >
      <section>
        <Grid asChild>
          <div className="simulator-layout">
          <Box>
            <Heading as="h2" size="7" className="simulator-title">
              Simulation des émissions
            </Heading>
            <Text as="p" size="2" className="simulator-copy">
              Saisis une consommation électrique pour estimer les émissions
              selon le pays choisi.
            </Text>
          </Box>

          <Grid asChild>
            <div className="simulator-controls">
            <Text as="label" className="field-label-block">
              <Text as="span" size="2" weight="bold" className="simulator-label">
                Consommation en kWh
              </Text>
              <TextField.Root
                type="number"
                min="0"
                step="1"
                value={kwh}
                onChange={(event) =>
                  onKwhChange(Math.max(0, Number(event.target.value)))
                }
                color="grass"
                size="3"
                variant="surface"
                className="simulator-field"
              />
            </Text>

            <Box className="simulator-result">
              <Text as="p" size="2" className="simulator-label">
                Émissions estimées
              </Text>
              <Flex align="baseline" gap="2" className="metric-row">
                <Text size="8" weight="bold" className="simulator-title">
                  {emissionsKg.toFixed(1)}
                </Text>
                <Text size="3" weight="bold" className="simulator-title">
                  kgCO2
                </Text>
              </Flex>
            </Box>
            </div>
          </Grid>
          </div>
        </Grid>

        <Text
          as="p"
          size="2"
          className="simulator-note"
        >
          {selectedCountry.country === "France" ? (
            <>
              Pour une même consommation électrique, héberger ce service en
              Pologne génère environ {polandFranceRatio.toFixed(0)} fois plus de
              CO2 qu&apos;en France.
            </>
          ) : (
            <>
              Pour une même consommation électrique, héberger ce service en{" "}
              {selectedCountry.country} génère environ {franceRatio.toFixed(1)}{" "}
              fois les émissions mesurées en France.
            </>
          )}
        </Text>
      </section>
    </Card>
  );
}
