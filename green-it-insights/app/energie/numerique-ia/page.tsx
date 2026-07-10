import type { Metadata } from "next";
import {
  Box,
  Callout,
  Container,
  Text,
  Theme,
} from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Hero } from "@/components/sections/Hero";
import { KeyFigures } from "@/components/sections/KeyFigures";
import { ContentSection } from "@/components/sections/ContentSection";
import { Sources } from "@/components/sections/Sources";
import { Waffle } from "@/components/viz/Waffle";
import { Donut } from "@/components/viz/Donut";
import { TrendChart } from "@/components/viz/TrendChart";
import { CompareBars } from "@/components/viz/CompareBars";
import { keyFigures, sources } from "./data";

const PAGE_TITLE =
  "Le numérique & l'IA dans la consommation mondiale | Green IT Insights";
const PAGE_DESCRIPTION =
  "Quelle place le numérique et l'intelligence artificielle occupent-ils dans la consommation mondiale d'énergie ? Chiffres clés, data centers, impact de l'IA et sources.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Green IT",
    "numérique responsable",
    "consommation énergie",
    "data centers",
    "intelligence artificielle",
    "empreinte carbone",
    "sobriété numérique",
  ],
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    type: "article",
    locale: "fr_FR",
    siteName: "Green IT Insights",
  },
  twitter: {
    card: "summary",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

/**
 * Section A. Énergie > 2. Consommation
 * Focus sur le numérique et l'IA dans la consommation globale.
 *
 * Cette page assemble des sections GÉNÉRIQUES (@/components/sections) et leur fournit
 * tout le contenu en paramètres : le texte vit donc ici, la logique de mise en
 * page dans les composants. Données structurées dans ./data, visualisations
 * réutilisables dans @/components/viz.
 *
 * NB : le <Theme> est scopé ici car le layout racine (venant de main) n'en
 * fournit pas encore. À déplacer dans le layout quand le design system y sera
 * câblé (carte infra/design system).
 */
export default function NumeriqueIaPage() {
  return (
    <Theme accentColor="grass" grayColor="sand" radius="large">
      <Container size="3" px="5">
        <Hero
          badge="A. Énergie — Consommation"
          title={
            <>
              Le numérique &amp; l&apos;IA dans la consommation mondiale
              d&apos;énergie
            </>
          }
          lead={
            <>
              Longtemps perçu comme « immatériel », le numérique repose en
              réalité sur une infrastructure physique massive — data centers,
              réseaux, terminaux — dont la consommation électrique explose avec
              l&apos;essor du cloud, du streaming et désormais de
              l&apos;intelligence artificielle.
            </>
          }
        />

        <KeyFigures heading="Les chiffres clés" figures={keyFigures} />

        <ContentSection heading="Quelle place pour le numérique ?">
          <Text as="p" size="3" mb="3">
            À l&apos;échelle mondiale, le secteur numérique représente
            aujourd&apos;hui environ{" "}
            <strong>4 % des émissions de gaz à effet de serre</strong>, un poids
            comparable à celui de l&apos;aviation civile — et cette part
            progresse plus vite que la moyenne des autres secteurs. En France,
            l&apos;ADEME estime que le numérique pèse désormais{" "}
            <strong>4,4 % de l&apos;empreinte carbone nationale</strong> et
            consomme près de <strong>11 % de l&apos;électricité</strong> du pays.
          </Text>
          <Waffle
            filled={4}
            total={100}
            title="Ce que pèse le numérique : 4 cases sur 100"
            caption="~4 % des émissions mondiales de GES — soit autant que l'aviation civile, et la part progresse plus vite que la moyenne."
            ariaLabel="Le numérique représente environ 4 cases sur 100, soit 4 % des émissions mondiales de gaz à effet de serre, un niveau comparable à l'aviation civile."
          />
          <Text as="p" size="3">
            Point contre-intuitif souvent ignoré : la majorité de cet impact ne
            vient pas de l&apos;usage mais de la <strong>fabrication</strong>.
            Environ <strong>60 % de l&apos;empreinte carbone du numérique</strong>{" "}
            provient de la production des équipements (extraction des métaux,
            assemblage), tandis que les data centers représentent à eux seuls
            près de <strong>46 %</strong> de l&apos;empreinte liée à
            l&apos;infrastructure.
          </Text>
          <Donut
            title="D'où vient l'impact ? Surtout de la fabrication"
            segments={[
              { label: "Fabrication (~60 %)", value: 60, color: "var(--grass-9)" },
              { label: "Usage (~40 %)", value: 40, color: "var(--brown-9)" },
            ]}
            centerLabel="60 %"
            centerSub="fabrication"
            caption="Extraction des métaux et assemblage : l'essentiel de l'empreinte est déjà « payé » avant le premier allumage."
            ariaLabel="Répartition de l'empreinte carbone du numérique : environ 60 % proviennent de la fabrication des équipements, le reste de l'usage."
          />
        </ContentSection>

        <ContentSection heading="Les data centers : le cœur énergétique">
          <Text as="p" size="3" mb="3">
            En 2024, les data centers ont consommé environ{" "}
            <strong>415 TWh d&apos;électricité</strong> dans le monde, soit{" "}
            <strong>~1,5 % de la demande mondiale</strong> et l&apos;équivalent
            de la consommation annuelle de la France. Leur croissance dépasse{" "}
            <strong>10 % par an</strong>.
          </Text>
          <Text as="p" size="3">
            Selon l&apos;Agence internationale de l&apos;énergie (AIE), cette
            consommation devrait <strong>plus que doubler d&apos;ici 2030</strong>{" "}
            pour atteindre près de <strong>945 TWh</strong> (≈ 3 % de la demande
            mondiale), en croissant environ{" "}
            <strong>quatre fois plus vite</strong> que la consommation
            électrique de tous les autres secteurs réunis.
          </Text>
          <TrendChart
            title="Consommation des data centers : 415 → 945 TWh"
            points={[
              { label: 2024, value: 415 },
              { label: 2026, value: 565 },
              { label: 2030, value: 945 },
            ]}
            yMax={1000}
            yTicks={[0, 250, 500, 750, 1000]}
            highlightLast
            caption="En TWh. Projection AIE : la consommation croît ~4× plus vite que les autres secteurs."
            ariaLabel="Consommation électrique mondiale des data centers : 415 TWh en 2024, environ 565 TWh en 2026, et près de 945 TWh projetés en 2030, soit plus du double en six ans."
          />
        </ContentSection>

        <ContentSection heading="Le facteur accélérateur : l'intelligence artificielle">
          <Text as="p" size="3" mb="3">
            Jusqu&apos;ici, la hausse était tirée par le cloud et le streaming.
            L&apos;<strong>IA générative</strong> change désormais l&apos;échelle
            du problème. Selon Gartner, les serveurs optimisés pour l&apos;IA
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
                  individuellement — de l&apos;ordre de <strong>0,3 Wh</strong>{" "}
                  pour une requête, comparable à une recherche Google — mais se
                  répète des milliards de fois par jour, ce qui en fait le vrai
                  poste de consommation à grande échelle.
                </Text>
              </li>
            </ul>
          </Box>
          <Text as="p" size="3">
            S&apos;ajoute la <strong>consommation d&apos;eau</strong> pour le
            refroidissement des serveurs : on estime qu&apos;une session de
            quelques dizaines de questions « coûte » environ un demi-litre
            d&apos;eau, et une requête IA peut consommer jusqu&apos;à{" "}
            <strong>10× plus d&apos;eau</strong> qu&apos;une recherche web
            classique.
          </Text>
          <CompareBars
            title="Une recherche Google vs une requête ChatGPT"
            groups={[
              {
                heading: "⚡ Énergie par requête",
                max: 0.3,
                bars: [
                  { label: "Recherche Google", display: "~0,3 Wh", value: 0.3 },
                  {
                    label: "Requête ChatGPT (GPT-4o)",
                    display: "~0,3 Wh",
                    value: 0.3,
                  },
                ],
              },
              {
                heading: "💧 Eau pour le refroidissement",
                max: 10,
                bars: [
                  {
                    label: "Recherche Google",
                    display: "référence (×1)",
                    value: 1,
                  },
                  {
                    label: "Requête ChatGPT",
                    display: "jusqu'à ×10",
                    value: 10,
                    color: "var(--tomato-9)",
                  },
                ],
              },
            ]}
            caption="À modèle standard, l'énergie est quasi identique : l'idée que l'IA « consomme 10× plus » concerne surtout l'eau de refroidissement, pas l'électricité par requête."
            ariaLabel="Comparaison entre une recherche Google et une requête ChatGPT : énergie quasi identique (~0,3 Wh chacune), mais la requête IA consomme jusqu'à 10 fois plus d'eau pour le refroidissement."
          />
        </ContentSection>

        <ContentSection>
          <Callout.Root color="grass" size="3">
            <Callout.Icon>
              <InfoCircledIcon />
            </Callout.Icon>
            <Callout.Text>
              <strong>À retenir</strong> — Le numérique n&apos;est pas
              immatériel. L&apos;IA n&apos;est pas le seul coupable, mais elle
              accélère brutalement une trajectoire déjà ascendante. La sobriété
              numérique (allonger la durée de vie des équipements, héberger dans
              des pays à électricité bas-carbone, mutualiser plutôt que
              multiplier) devient un levier aussi décisif que l&apos;efficacité
              technique.
            </Callout.Text>
          </Callout.Root>
        </ContentSection>

        <Sources
          heading="Sources"
          sources={sources}
          note="Chiffres collectés en juin 2026 ; les projections (AIE, Gartner) évoluent rapidement et sont à réactualiser régulièrement."
        />
      </Container>
    </Theme>
  );
}
