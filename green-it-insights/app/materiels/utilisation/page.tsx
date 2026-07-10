import type { Metadata } from "next";
import { Box, Callout, Container, Text } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Hero } from "@/components/sections/Hero";
import { KeyFigures } from "@/components/sections/KeyFigures";
import { ContentSection } from "@/components/sections/ContentSection";
import { Sources } from "@/components/sections/Sources";
import { Donut } from "@/components/viz/Donut";
import { CompareBars } from "@/components/viz/CompareBars";
import { keyFigures, sources } from "./data";

const PAGE_TITLE =
  "Durée d'utilisation & mutualisation des matériels IT";
const PAGE_DESCRIPTION =
  "Combien de temps garde-t-on réellement nos matériels IT, et pourquoi un serveur dédié tourne à vide ? Durées de vie, gain de l'allongement, self-hosted vs mutualisé.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Green IT",
    "durée de vie matériel",
    "durée d'usage",
    "reconditionné",
    "mutualisation serveur",
    "virtualisation",
    "self-hosted",
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
 * Section B. Matériels & Matériaux > Consommation
 * Temps moyen d'utilisation d'un matériel IT + utilisation mutualisée vs
 * self-hosted. Le contenu vit ici ; les sections et visualisations sont
 * génériques (@/components/sections, @/components/viz).
 */
export default function MaterielsUtilisationPage() {
  return (
    <Container size="3" px="5">
      <Hero
        badge="B. Matériels — Consommation"
        title={
          <>
            Durée d&apos;utilisation &amp; mutualisation des matériels IT
          </>
        }
        lead={
          <>
            On remplace nos appareils bien avant leur fin de vie réelle, et nos
            serveurs tournent le plus souvent à vide. Or <strong>prolonger</strong>{" "}
            l&apos;usage et <strong>mutualiser</strong> les machines sont deux
            des leviers les plus efficaces pour réduire l&apos;empreinte du
            matériel.
          </>
        }
      />

      <KeyFigures heading="Les chiffres clés" figures={keyFigures} />

      <ContentSection heading="Combien de temps garde-t-on nos matériels ?">
        <Text as="p" size="3" mb="3">
          La durée d&apos;usage réelle de nos équipements est courte : environ{" "}
          <strong>2,5 à 3 ans pour un smartphone</strong>, <strong>4 ans</strong>{" "}
          pour un ordinateur portable, <strong>5 ans</strong> pour un fixe — soit
          souvent <strong>bien avant la panne</strong>. Côté serveurs, l&apos;écart
          est encore plus net : amortis comptablement en{" "}
          <strong>3 à 5 ans</strong>, ils restent techniquement{" "}
          <strong>utilisables 7 à 10 ans</strong> (parfois jusqu&apos;à 15).
        </Text>
        <CompareBars
          title="Durée de vie moyenne par type d'appareil"
          groups={[
            {
              heading: "En années",
              max: 10,
              bars: [
                { label: "Smartphone", display: "~3 ans", value: 3 },
                { label: "Tablette", display: "~3 ans", value: 3 },
                { label: "Ordinateur portable", display: "~4 ans", value: 4 },
                { label: "Ordinateur fixe", display: "~5 ans", value: 5 },
                {
                  label: "Serveur (durée utile)",
                  display: "7–10 ans",
                  value: 9,
                  color: "var(--brown-9)",
                },
              ],
            },
          ]}
          caption="On remplace surtout les terminaux trop tôt ; un serveur, lui, peut servir bien plus longtemps que sa durée d'amortissement."
          ariaLabel="Durées de vie moyennes : smartphone et tablette ~3 ans, ordinateur portable ~4 ans, fixe ~5 ans, serveur 7 à 10 ans de durée utile."
        />
      </ContentSection>

      <ContentSection heading="Prolonger : le geste le plus efficace">
        <Text as="p" size="3" mb="3">
          Comme l&apos;essentiel de l&apos;empreinte d&apos;un équipement vient de
          sa <strong>fabrication</strong>, plus on l&apos;utilise longtemps, plus
          cet impact est « amorti ». Concrètement, passer de{" "}
          <strong>2 à 4 ans d&apos;usage améliore le bilan de ~50 %</strong>. Et
          un appareil <strong>reconditionné</strong> affiche{" "}
          <strong>−55 % à −91 %</strong> d&apos;impact annualisé par rapport au
          neuf — en évitant l&apos;extraction de nouvelles matières.
        </Text>
        <CompareBars
          title="Empreinte annualisée d'un même appareil"
          groups={[
            {
              heading: "Impact ramené à l'année d'usage",
              max: 100,
              bars: [
                {
                  label: "Gardé 2 ans",
                  display: "référence",
                  value: 100,
                  color: "var(--tomato-9)",
                },
                { label: "Gardé 4 ans", display: "−50 %", value: 50 },
              ],
            },
          ]}
          caption="Doubler la durée d'usage divise quasiment par deux l'empreinte « par année »."
          ariaLabel="Empreinte annualisée d'un appareil gardé 2 ans (référence) contre gardé 4 ans (moitié moindre)."
        />
      </ContentSection>

      <ContentSection heading="La sous-utilisation : un serveur seul tourne à vide">
        <Text as="p" size="3" mb="3">
          Un serveur dédié (self-hosted) est en moyenne utilisé à{" "}
          <strong>5 à 10 % de ses capacités</strong> : avant la virtualisation,{" "}
          <strong>80 % des serveurs</strong> tournaient sous 10 % de charge.
          Mutualiser — regrouper plusieurs charges sur une même machine via la
          virtualisation — fait monter le taux d&apos;utilisation à{" "}
          <strong>60–80 %</strong> et réduit le nombre de machines (ratio de
          consolidation moyen <strong>~6,3 VM par serveur</strong>, jusqu&apos;à
          20:1).
        </Text>
        <Donut
          title="Un serveur dédié : ce qui est réellement utilisé"
          segments={[
            {
              label: "Capacité utilisée (~8 %)",
              value: 8,
              color: "var(--grass-9)",
            },
            {
              label: "Capacité gaspillée (~92 %)",
              value: 92,
              color: "var(--gray-6)",
            },
          ]}
          centerLabel="~8 %"
          centerSub="utilisé"
          caption="L'essentiel de la machine — et de l'énergie pour la faire tourner et la refroidir — est gaspillé."
          ariaLabel="Sur un serveur dédié, environ 8 % de la capacité est utilisée et 92 % gaspillée."
        />
        <CompareBars
          title="Self-hosted vs mutualisé"
          groups={[
            {
              heading: "Taux d'utilisation d'un serveur",
              max: 100,
              bars: [
                {
                  label: "Serveur dédié (self-hosted)",
                  display: "5–10 %",
                  value: 8,
                  color: "var(--tomato-9)",
                },
                {
                  label: "Serveur mutualisé / virtualisé",
                  display: "60–80 %",
                  value: 70,
                },
              ],
            },
          ]}
          caption="Mutualiser remplit la machine et évite d'en multiplier : moins de matériel fabriqué, moins d'énergie pour la même charge."
          ariaLabel="Taux d'utilisation : serveur dédié 5 à 10 %, serveur mutualisé ou virtualisé 60 à 80 %."
        />
      </ContentSection>

      <ContentSection>
        <Callout.Root color="grass" size="3">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            <strong>À retenir</strong> — Deux leviers, le même principe : faire
            « plus » avec « moins » de matériel. <strong>Allonger</strong> la
            durée d&apos;usage (réparer, reconditionner) amortit l&apos;impact de
            fabrication ; <strong>mutualiser</strong> les serveurs remplit les
            machines et réduit leur nombre. À l&apos;inverse, multiplier les
            équipements neufs sous-utilisés est le pire scénario.
          </Callout.Text>
        </Callout.Root>
      </ContentSection>

      <Box>
        <Sources
          heading="Sources"
          sources={sources}
          note="Chiffres collectés en juin 2026 ; ordres de grandeur, variables selon les usages et le matériel."
        />
      </Box>
    </Container>
  );
}
