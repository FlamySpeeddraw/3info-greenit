import type { Metadata } from "next";
import {
  Badge,
  Box,
  Callout,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Section,
  Separator,
  Text,
  Theme,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Le numérique & l'IA dans la consommation mondiale | Green IT Insights",
  description:
    "Quelle place le numérique et l'intelligence artificielle occupent-ils dans la consommation mondiale d'énergie ? Chiffres clés, data centers, impact de l'IA et sources.",
};

/**
 * Section A. Énergie > 2. Consommation
 * Focus sur le numérique et l'IA dans la consommation globale.
 *
 * Mise en page conforme à la charte graphique (Radix UI Themes, palette Green IT,
 * apparitions au scroll via <ScrollReveal>). Tous les chiffres sont sourcés.
 */

type KeyFigure = {
  value: string;
  label: string;
  source: string;
};

const keyFigures: KeyFigure[] = [
  {
    value: "~4 %",
    label:
      "des émissions mondiales de gaz à effet de serre sont dues au numérique, soit un niveau comparable à l'aviation civile.",
    source: "ADEME",
  },
  {
    value: "415 TWh",
    label:
      "consommés par les data centers dans le monde en 2024, soit environ 1,5 % de la demande électrique mondiale — l'équivalent de la consommation de la France.",
    source: "AIE (IEA)",
  },
  {
    value: "~945 TWh",
    label:
      "projetés pour les data centers en 2030 : la consommation devrait plus que doubler, croissant ~4× plus vite que celle des autres secteurs.",
    source: "AIE (IEA)",
  },
  {
    value: "20–50 %",
    label:
      "part de l'IA dans la consommation totale des data centers attendue à l'horizon 2030.",
    source: "AIE (IEA)",
  },
];

type Source = {
  label: string;
  url: string;
};

const sources: Source[] = [
  {
    label:
      "ADEME — Évaluation de l'impact environnemental du numérique en France (2024)",
    url: "https://ecoresponsable.numerique.gouv.fr/docs/2024/etude-ademe-impacts-environnementaux-numerique.pdf",
  },
  {
    label:
      "ADEME — Numérique et environnement, dossier de presse (janvier 2025)",
    url: "https://www.ademe.fr/wp-content/uploads/2025/01/dossier-de-presse-numerique-et-environnement-090125.pdf",
  },
  {
    label:
      "Bpi / Balises — Les data centers : 13 % de la consommation électrique mondiale en 2030 ?",
    url: "https://balises.bpi.fr/les-data-centers-13-de-la-consommation-energetique-mondiale-en-2030/",
  },
  {
    label: "Opéra Énergie — Consommation d'énergie des data centers, chiffres 2026",
    url: "https://opera-energie.com/consommation-energie-datacenter/",
  },
  {
    label:
      "DCmag — L'AIE alerte : la consommation des data centers d'IA multipliée par 3 d'ici 2030",
    url: "https://dcmag.fr/liea-alerte-la-consommation-electrique-des-datacenters-dia-sera-multipliee-par-3-dici-2030/",
  },
  {
    label:
      "Projet Celsius — Combien d'électricité consomme une requête ChatGPT ?",
    url: "https://projetcelsius.com/blog/combien-consomme-requete-chatgpt/",
  },
  {
    label:
      "Reservoir — Une requête ChatGPT consomme 10× plus d'eau qu'une recherche Google",
    url: "https://www.reservoir.live/une-requete-chatgpt-consomme-10x-plus-deau-quune-recherche-google/",
  },
];

export default function NumeriqueIaPage() {
  return (
    <Theme accentColor="grass" grayColor="sand" radius="large">
      <Container size="3" px="5">
      <Section size="2">
        <Badge color="grass" variant="soft" radius="full" mb="3">
          A. Énergie — Consommation
        </Badge>
        <Heading as="h1" size="8" mb="3">
          Le numérique &amp; l&apos;IA dans la consommation mondiale d&apos;énergie
        </Heading>
        <Text as="p" size="4" color="gray">
          Longtemps perçu comme « immatériel », le numérique repose en réalité
          sur une infrastructure physique massive — data centers, réseaux,
          terminaux — dont la consommation électrique explose avec l&apos;essor du
          cloud, du streaming et désormais de l&apos;intelligence artificielle.
        </Text>
      </Section>

      {/* Chiffres clés */}
      <ScrollReveal>
        <Section size="2" pt="0">
          <Heading as="h2" size="6" mb="4">
            Les chiffres clés
          </Heading>
          <Grid columns={{ initial: "1", sm: "2" }} gap="4">
            {keyFigures.map((fig) => (
              <Card key={fig.value} size="3">
                <Heading as="h3" size="8" color="grass" mb="2">
                  {fig.value}
                </Heading>
                <Text as="p" size="2" color="gray" mb="3">
                  {fig.label}
                </Text>
                <Badge color="gray" variant="soft">
                  Source : {fig.source}
                </Badge>
              </Card>
            ))}
          </Grid>
        </Section>
      </ScrollReveal>

      {/* La place du numérique */}
      <ScrollReveal>
        <Section size="2" pt="0">
          <Heading as="h2" size="6" mb="3">
            Quelle place pour le numérique ?
          </Heading>
          <Text as="p" size="3" mb="3">
            À l&apos;échelle mondiale, le secteur numérique représente aujourd&apos;hui
            environ <strong>4 % des émissions de gaz à effet de serre</strong>,
            un poids comparable à celui de l&apos;aviation civile — et cette part
            progresse plus vite que la moyenne des autres secteurs. En France,
            l&apos;ADEME estime que le numérique pèse désormais{" "}
            <strong>4,4 % de l&apos;empreinte carbone nationale</strong> et consomme
            près de <strong>11 % de l&apos;électricité</strong> du pays.
          </Text>
          <Text as="p" size="3">
            Point contre-intuitif souvent ignoré : la majorité de cet impact ne
            vient pas de l&apos;usage mais de la <strong>fabrication</strong>.
            Environ <strong>60 % de l&apos;empreinte carbone du numérique</strong>{" "}
            provient de la production des équipements (extraction des métaux,
            assemblage), tandis que les data centers représentent à eux seuls
            près de <strong>46 %</strong> de l&apos;empreinte liée à
            l&apos;infrastructure.
          </Text>
        </Section>
      </ScrollReveal>

      {/* Les data centers */}
      <ScrollReveal>
        <Section size="2" pt="0">
          <Heading as="h2" size="6" mb="3">
            Les data centers : le cœur énergétique
          </Heading>
          <Text as="p" size="3" mb="3">
            En 2024, les data centers ont consommé environ{" "}
            <strong>415 TWh d&apos;électricité</strong> dans le monde, soit{" "}
            <strong>~1,5 % de la demande mondiale</strong> et l&apos;équivalent de
            la consommation annuelle de la France. Leur croissance dépasse{" "}
            <strong>10 % par an</strong>.
          </Text>
          <Text as="p" size="3">
            Selon l&apos;Agence internationale de l&apos;énergie (AIE), cette
            consommation devrait <strong>plus que doubler d&apos;ici 2030</strong>{" "}
            pour atteindre près de <strong>945 TWh</strong> (≈ 3 % de la demande
            mondiale), en croissant environ <strong>quatre fois plus vite</strong>{" "}
            que la consommation électrique de tous les autres secteurs réunis.
          </Text>
        </Section>
      </ScrollReveal>

      {/* Le facteur IA */}
      <ScrollReveal>
        <Section size="2" pt="0">
          <Heading as="h2" size="6" mb="3">
            Le facteur accélérateur : l&apos;intelligence artificielle
          </Heading>
          <Text as="p" size="3" mb="3">
            Jusqu&apos;ici, la hausse était tirée par le cloud et le streaming.
            L&apos;<strong>IA générative</strong> change désormais l&apos;échelle du
            problème. Selon Gartner, les serveurs optimisés pour l&apos;IA
            représenteraient déjà{" "}
            <strong>~31 % de la consommation des data centers en 2026</strong>,
            leur demande passant de <strong>95 à 175 TWh</strong> en une seule
            année. À l&apos;horizon 2030, l&apos;IA pourrait peser{" "}
            <strong>20 à 50 %</strong> de la consommation totale des data
            centers.
          </Text>
          <Text as="p" size="3" mb="2">
            Deux phases sont à distinguer :
          </Text>
          <Box asChild mb="3">
            <ul style={{ paddingLeft: "1.25rem", listStyle: "disc" }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <Text size="3">
                  <strong>L&apos;entraînement</strong> des modèles est ponctuel
                  mais intense : entraîner un grand modèle mobilise des dizaines
                  de MW pendant des semaines, soit l&apos;équivalent de la
                  consommation de dizaines de milliers de foyers.
                </Text>
              </li>
              <li>
                <Text size="3">
                  <strong>L&apos;inférence</strong> (chaque requête) est faible
                  individuellement — de l&apos;ordre de <strong>0,3 Wh</strong> pour
                  une requête, comparable à une recherche Google — mais se répète
                  des milliards de fois par jour, ce qui en fait le vrai poste de
                  consommation à grande échelle.
                </Text>
              </li>
            </ul>
          </Box>
          <Text as="p" size="3">
            S&apos;ajoute la <strong>consommation d&apos;eau</strong> pour le
            refroidissement des serveurs : on estime qu&apos;une session de
            quelques dizaines de questions « coûte » environ un demi-litre
            d&apos;eau, et une requête IA peut consommer jusqu&apos;à{" "}
            <strong>10× plus d&apos;eau</strong> qu&apos;une recherche web classique.
          </Text>
        </Section>
      </ScrollReveal>

      {/* Message clé */}
      <ScrollReveal>
        <Section size="2" pt="0">
          <Callout.Root color="grass" size="3">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              <strong>À retenir</strong> — Le numérique n&apos;est pas immatériel.
              L&apos;IA n&apos;est pas le seul coupable, mais elle accélère
              brutalement une trajectoire déjà ascendante. La sobriété numérique
              (allonger la durée de vie des équipements, héberger dans des pays à
              électricité bas-carbone, mutualiser plutôt que multiplier) devient
              un levier aussi décisif que l&apos;efficacité technique.
            </Callout.Text>
          </Callout.Root>
        </Section>
      </ScrollReveal>

      {/* Sources */}
      <Section size="2" pt="0">
        <Separator size="4" mb="5" />
        <Heading as="h2" size="6" mb="4">
          Sources
        </Heading>
        <Flex direction="column" gap="2">
          {sources.map((src) => (
            <Link
              key={src.url}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              size="2"
            >
              {src.label}
            </Link>
          ))}
        </Flex>
        <Text as="p" size="1" color="gray" mt="5">
          Chiffres collectés en juin 2026 ; les projections (AIE, Gartner)
          évoluent rapidement et sont à réactualiser régulièrement.
        </Text>
      </Section>
      </Container>
    </Theme>
  );
}
