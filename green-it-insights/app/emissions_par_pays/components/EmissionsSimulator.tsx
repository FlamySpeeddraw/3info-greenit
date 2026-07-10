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
      className="border border-green-dark/15 bg-green-dark p-5 text-eco-white shadow-sm dark:border-brown-accent/20 dark:bg-oled-gray sm:p-6"
    >
      <section>
        <Grid gap="6" className="lg:grid-cols-[320px_1fr] lg:items-center">
          <Box>
            <Heading as="h2" size="7" className="text-eco-white">
              Simulation des emissions
            </Heading>
            <Text as="p" size="2" className="mt-2 leading-6 text-green-bg">
              Saisis une consommation electrique pour estimer les emissions
              selon le pays choisi.
            </Text>
          </Box>

          <Grid gap="4" columns={{ sm: "2" }}>
            <Text as="label" className="block">
              <Text as="span" size="2" weight="bold" className="text-green-bg">
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
                className="mt-2 w-full font-bold text-green-dark"
              />
            </Text>

            <Box className="rounded-md border border-eco-white/20 bg-eco-white/10 p-4">
              <Text as="p" size="2" className="text-green-bg">
                Emissions estimees
              </Text>
              <Flex align="baseline" gap="2" className="mt-1">
                <Text size="8" weight="bold" className="text-eco-white">
                  {emissionsKg.toFixed(1)}
                </Text>
                <Text size="3" weight="bold" className="text-eco-white">
                  kgCO2
                </Text>
              </Flex>
            </Box>
          </Grid>
        </Grid>

        <Text
          as="p"
          size="2"
          className="mt-6 rounded-md bg-eco-white/10 p-4 leading-6 text-eco-white"
        >
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
        </Text>
      </section>
    </Card>
  );
}
