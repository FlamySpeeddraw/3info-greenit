import type { Metadata } from "next";
import { Box, Callout, Container, Text } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Hero } from "@/components/sections/Hero";
import { KeyFigures } from "@/components/sections/KeyFigures";
import { ContentSection } from "@/components/sections/ContentSection";
import { Sources } from "@/components/sections/Sources";
import { Waffle } from "@/components/viz/Waffle";
import { TrendChart } from "@/components/viz/TrendChart";
import { CompareBars } from "@/components/viz/CompareBars";
import { keyFigures, sources } from "./data";

const PAGE_TITLE =
  "Fin de vie & recyclage des produits IT";
const PAGE_DESCRIPTION =
  "Combien de déchets électroniques produit-on, et quelle part est réellement recyclée ? Volume mondial, trajectoire 2030, disparités régionales et métaux gaspillés.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "Green IT",
    "déchets électroniques",
    "DEEE",
    "e-waste",
    "recyclage",
    "fin de vie",
    "économie circulaire",
    "terres rares",
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
 * Section B. Matériels & Matériaux > Fin de vie
 * Statistiques sur le recyclage et la fin de vie des produits IT.
 */
export default function MaterielsFinDeViePage() {
  return (
    <Container size="3" px="5">
      <Hero
        badge="B. Matériels — Fin de vie"
        title={<>Fin de vie &amp; recyclage des produits IT</>}
        lead={
          <>
            La fin de vie est le maillon faible du numérique : les déchets
            électroniques <strong>explosent</strong>, le recyclage{" "}
            <strong>stagne</strong>, et on enfouit ou exporte des{" "}
            <strong>métaux précieux</strong> qu&apos;il faudrait récupérer.
          </>
        }
      />

      <KeyFigures heading="Les chiffres clés" figures={keyFigures} />

      <ContentSection heading="Une montagne de déchets qui grossit vite">
        <Text as="p" size="3" mb="3">
          En 2022, le monde a produit <strong>62 millions de tonnes</strong> de
          déchets électroniques (DEEE), soit <strong>+82 % depuis 2010</strong>{" "}
          et environ <strong>+2,6 Mt chaque année</strong>. À ce rythme, le total
          atteindrait <strong>82 Mt en 2030</strong>. C&apos;est le flux de
          déchets qui croît le plus vite au monde.
        </Text>
        <TrendChart
          title="Déchets électroniques mondiaux : 62 → 82 Mt"
          points={[
            { label: 2010, value: 34 },
            { label: 2022, value: 62 },
            { label: 2030, value: 82 },
          ]}
          yMax={100}
          yTicks={[0, 25, 50, 75, 100]}
          highlightLast
          caption="En millions de tonnes. Projection Global E-waste Monitor (UNITAR/ITU)."
          ariaLabel="Déchets électroniques mondiaux : environ 34 Mt en 2010, 62 Mt en 2022, 82 Mt projetés en 2030."
        />
      </ContentSection>

      <ContentSection heading="Le recyclage ne suit pas">
        <Text as="p" size="3" mb="3">
          Face à cette montagne, seuls <strong>22,3 %</strong> des déchets ont
          été <strong>collectés et recyclés correctement</strong> en 2022. Pire :
          le recyclage documenté progresse <strong>5× moins vite</strong> que les
          déchets, si bien que la part recyclée pourrait <strong>tomber à 20 %</strong>{" "}
          d&apos;ici 2030. Le reste finit en décharge, incinéré, stocké ou exporté
          hors des filières.
        </Text>
        <Waffle
          percent={22}
          total={100}
          title="Sur 100 kg de déchets électroniques, ~22 sont recyclés"
          caption="Le reste — près de 4 sur 5 — échappe à un recyclage correct."
          ariaLabel="Environ 22 cases sur 100 sont recyclées correctement, le reste échappe aux filières."
        />
      </ContentSection>

      <ContentSection heading="De fortes disparités régionales">
        <Text as="p" size="3" mb="3">
          Le taux de recyclage dépend énormément de la région. L&apos;
          <strong>Europe</strong> est en tête avec <strong>~42,8 %</strong> (et
          17,6 kg de déchets par habitant), la <strong>France</strong> peine
          autour de <strong>28 %</strong> de collecte réglementée (loin de
          l&apos;objectif de 65 %), tandis que l&apos;<strong>Afrique</strong>{" "}
          recycle <strong>moins de 1 %</strong>.
        </Text>
        <CompareBars
          title="Taux de collecte / recyclage des DEEE"
          groups={[
            {
              heading: "Part correctement recyclée",
              max: 50,
              bars: [
                { label: "Europe", display: "~42,8 %", value: 42.8 },
                {
                  label: "France (collecte réglementée)",
                  display: "~28 %",
                  value: 28,
                  color: "var(--brown-9)",
                },
                {
                  label: "Afrique",
                  display: "< 1 %",
                  value: 0.7,
                  color: "var(--tomato-9)",
                },
              ],
            },
          ]}
          caption="Même les meilleurs élèves restent sous la barre des 50 %."
          ariaLabel="Taux de recyclage des déchets électroniques : Europe environ 42,8 %, France environ 28 %, Afrique moins de 1 %."
        />
      </ContentSection>

      <ContentSection heading="Des métaux précieux gaspillés">
        <Text as="p" size="3">
          Ces déchets contiennent <strong>~91 milliards de dollars</strong> de
          métaux — <strong>or, cuivre, terres rares</strong> — en grande partie
          perdus faute de récupération. Or recycler ces matériaux{" "}
          <strong>évite d&apos;extraire de nouvelles ressources</strong>, dont la
          production est la plus polluante du cycle de vie. Une bonne fin de vie
          ferme la boucle. Le problème : beaucoup d&apos;équipements{" "}
          <strong>échappent aux filières</strong> (stockage « au fond du tiroir »,
          dons non tracés, revente, exportation illégale).
        </Text>
      </ContentSection>

      <ContentSection>
        <Callout.Root color="grass" size="3">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>
            <strong>À retenir</strong> — La fin de vie est le maillon faible : on
            produit toujours plus de déchets électroniques et on en recycle une
            part qui <em>diminue</em>. Mieux <strong>collecter</strong> (apport
            en point de collecte, reprise, réemploi) et{" "}
            <strong>récupérer les métaux</strong> évite l&apos;extraction,
            l&apos;étape la plus lourde du cycle de vie d&apos;un produit IT.
          </Callout.Text>
        </Callout.Root>
      </ContentSection>

      <Box>
        <Sources
          heading="Sources"
          sources={sources}
          note="Chiffres collectés en juin 2026 ; volumes et taux selon le Global E-waste Monitor 2024 et les filières européennes."
        />
      </Box>
    </Container>
  );
}
