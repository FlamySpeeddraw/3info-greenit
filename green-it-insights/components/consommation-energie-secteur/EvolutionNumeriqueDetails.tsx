import {
  Card,
  Heading,
  Text,
  Box,
  Grid,
  Badge,
} from "@radix-ui/themes";


const events = [
  {
    year: "2005",
    title: "Généralisation d'Internet",
    icon: "🌐",
    description:
      "L'accès à Internet se démocratise. Les serveurs et infrastructures réseau commencent à consommer davantage d'énergie.",
  },
  {
    year: "2010",
    title: "Explosion des smartphones",
    icon: "📱",
    description:
      "L'utilisation massive des smartphones augmente la fabrication d'appareils électroniques et la consommation des réseaux mobiles.",
  },
  {
    year: "2015",
    title: "Cloud et streaming",
    icon: "☁️",
    description:
      "Le stockage en ligne, les plateformes vidéo et les services cloud nécessitent davantage de datacenters.",
  },
  {
    year: "2020",
    title: "Streaming massif et visioconférences",
    icon: "💻",
    description:
      "Le télétravail et les usages numériques augmentent fortement avec la généralisation des réunions en ligne.",
  },
  {
    year: "2025",
    title: "IA et nouveaux datacenters",
    icon: "🤖",
    description:
      "L'intelligence artificielle augmente fortement les besoins en calcul, entraînant la construction de nouveaux centres de données.",
  },
];


export default function EvolutionNumeriqueDetails() {
  return (
    <Box mt="8">

      <Heading size="6">
        Pourquoi la consommation numérique augmente autant ?
      </Heading>


      <Text size="2">
        La consommation énergétique du numérique augmente
        principalement à cause de la multiplication des équipements,
        des services en ligne et des infrastructures nécessaires. Elle a doublée depuis 2005
      </Text>


      <Grid
        columns={{
          initial: "1",
          md: "3",
        }}
        gap="4"
        mt="5"
      >

        {events.map((event) => (

          <Card key={event.year}>

            <Box p="4">

              <Badge color="grass">
                {event.year}
              </Badge>


              <Heading size="3" mt="3">
                {event.icon} {event.title}
              </Heading>


              <Text size="2">
                {event.description}
              </Text>

            </Box>

          </Card>

        ))}

      </Grid>

    </Box>
  );
}