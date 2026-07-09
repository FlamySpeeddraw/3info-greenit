import { Badge, Box, Card, Flex, Grid, Heading, Link, Section, Text } from "@radix-ui/themes";
import EnergyBarChart from "@/components/energy/EnergyBarChart";
import { energyConsumptionData } from "@/data/energie";

export default async function EnergyConsumptionPage() {
  const top15 = [...energyConsumptionData]
    .sort((a, b) => b.energyTWh - a.energyTWh)
    .slice(0, 15);

  return (
    <Section size="3">
      <Flex direction="column" gap="6">
        <Box>
          <Flex direction="column" gap="3">
            <Badge color="green" variant="soft" size="2">
              Énergie mondiale
            </Badge>

            <Heading as="h1" size="8">
              Consommation globale d&apos;énergie par pays
            </Heading>

            <Text size="3" color="gray" style={{ maxWidth: 820 }}>
              Cette page présente une lecture visuelle de la consommation primaire
              d&apos;énergie par pays afin de mettre en évidence les écarts entre
              territoires et leur lien avec l&apos;impact environnemental du numérique.
            </Text>
          </Flex>
        </Box>

        <Grid columns={{ initial: "1", lg: "2" }} gap="6">
          <Card size="3">
            <Flex direction="column" gap="4">
              <Box>
                <Heading as="h2" size="5">
                  Répartition mondiale
                </Heading>
                <Text as="p" size="2" color="gray">
                  Vue synthétique des niveaux de consommation par pays.
                </Text>
              </Box>

              <Box
                style={{
                  minHeight: 420,
                  borderRadius: 12,
                  background:
                    "linear-gradient(180deg, var(--gray-2) 0%, var(--gray-1) 100%)",
                  border: "1px solid var(--gray-6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 24,
                }}
              >
                <Text size="2" color="gray">
                  Carte choroplèthe à intégrer ici selon ton composant cartographique final.
                </Text>
              </Box>
            </Flex>
          </Card>

          <Card size="3">
            <Flex direction="column" gap="4">
              <Box>
                <Heading as="h2" size="5">
                  Top 15 des pays
                </Heading>
                <Text as="p" size="2" color="gray">
                  Classement décroissant en TWh/an.
                </Text>
              </Box>

              <EnergyBarChart data={top15} />
            </Flex>
          </Card>
        </Grid>

        <Card size="3">
          <Flex direction="column" gap="3">
            <Heading as="h2" size="4">
              Lecture de l&apos;infographie
            </Heading>
            <Text size="2" color="gray">
              Les écarts de consommation reflètent à la fois la taille des populations,
              le niveau d&apos;industrialisation, l&apos;intensité des infrastructures et
              les usages numériques. Ils permettent de replacer le numérique dans un
              système énergétique mondial très inégal.
            </Text>
          </Flex>
        </Card>

        <Box>
          <Text as="p" size="2" color="gray">
            Source :{" "}
            <Link href="https://ourworldindata.org/energy" target="_blank">
              Our World in Data — Energy
            </Link>
          </Text>
        </Box>
      </Flex>
    </Section>
  );
}
