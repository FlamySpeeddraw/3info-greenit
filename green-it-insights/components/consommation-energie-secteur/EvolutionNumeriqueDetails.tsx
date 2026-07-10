import { ScrollReveal } from "./ScrollReveal";
import {
  Heading,
  Text,
  Box,
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
        des services en ligne et des infrastructures nécessaires.
        Elle a doublé depuis 2005.
      </Text>


      <Box mt="8" className="relative">

        {/* Ligne verticale */}
        <Box
          className="
            absolute
            left-5
            top-0
            h-full
            w-[3px]
            bg-green-dark
          "
        />


        <Box className="flex flex-col gap-8">

          {events.map((event) => (

  <ScrollReveal key={event.year}>

    <Box
      className="
        relative
        pl-16
      "
    >

      {/* Point de la timeline */}
      <Box
        className="
          absolute
          left-2
          top-5
          h-6
          w-6
          rounded-full
          bg-green-dark
          border-4
          border-eco-white
        "
      />


      <Box className="glassmorphism rounded-xl p-5">

        <Badge color="grass">
          {event.year}
        </Badge>


        <Heading size="4" mt="3">
          {event.icon} {event.title}
        </Heading>


        <Text size="2">
          {event.description}
        </Text>

      </Box>


    </Box>

  </ScrollReveal>

))}

        </Box>

      </Box>

    </Box>
  );
}