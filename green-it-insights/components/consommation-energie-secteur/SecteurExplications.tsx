import {
  Card,
  Heading,
  Text,
  Box,
  Grid,
  Badge
} from "@radix-ui/themes";


const secteurs = [
  {
    nom: "Industrie",
    impact: "37%",
    icon: "🏭",
    description:
      "La fabrication des matériaux et produits nécessite beaucoup d'énergie. Les secteurs les plus consommateurs sont notamment l'acier, le ciment et la fabrication électronique."
  },
  {
    nom: "Résidentiel",
    impact: "30%",
    icon: "🏠",
    description:
      "Les bâtiments consomment principalement pour le chauffage, la climatisation, l'éclairage et les appareils électriques."
  },
  {
    nom: "Transport",
    impact: "26%",
    icon: "🚚",
    description:
      "Les véhicules terrestres, avions et bateaux utilisent principalement des carburants fossiles comme le pétrole."
  },
  {
    nom: "Numérique",
    impact: "4%",
    icon: "💻",
    description:
      "La consommation vient des datacenters, réseaux, smartphones, ordinateurs et nouveaux usages comme l'intelligence artificielle."
  },
  {
    nom: "Agriculture",
    impact: "3%",
    icon: "🌱",
    description:
      "L'énergie est utilisée pour l'irrigation, les machines agricoles, les serres et la transformation alimentaire."
  }
];


export default function SecteurExplications() {

  return (
    <Box mt="8">

      <Heading size="6">
        Pourquoi chaque secteur consomme de l&apos;énergie ?
      </Heading>


      <Grid
        columns={{
          initial:"1",
          md:"2",
          lg:"3"
        }}
        gap="4"
        mt="5"
      >

        {secteurs.map((secteur)=>(

          <Card key={secteur.nom}>

            <Box p="4">

              <Badge color="grass">
                {secteur.impact}
              </Badge>


              <Heading size="4" mt="3">
                {secteur.icon} {secteur.nom}
              </Heading>


              <Text size="2">
                {secteur.description}
              </Text>

            </Box>

          </Card>

        ))}

      </Grid>

    </Box>
  );
}