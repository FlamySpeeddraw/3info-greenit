import {
    Badge,
    Card,
    Container,
    Heading,
    Link,
    Popover,
    Separator,
    Strong,
    Text,
} from "@radix-ui/themes";
import { EmissionsBarChart } from "@/components/EmissionsBarChart";
import { ENERGY_DATA } from "./energyData";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
    title: "Types de production d'énergie et impact sur les GES | Green IT Insights",
    description:
        "Infographie comparative des facteurs d'émission (gCO₂e/kWh) par filière de production d'énergie — données ADEME Base Carbone®.",
};

export default function ProductionPage() {
    const sortedData = [...ENERGY_DATA].sort(
        (a, b) => b.emissionFactor - a.emissionFactor
    );

    const highest = sortedData[0];
    const lowest = sortedData[sortedData.length - 1];

    return (
        <main className="min-h-screen bg-eco-white px-4 py-10 text-green-dark transition-colors dark:bg-oled-black dark:text-[var(--foreground)] sm:px-6 lg:px-8">
            <Container size="3" px="5">
                <ScrollReveal>
                    <header className="mb-10 sm:mb-12">
                        <Badge color="brown" variant="soft" size="2" className="mb-4">
                            Infographie · Émissions de GES
                        </Badge>

                        <Heading
                            as="h1"
                            size="8"
                            className="mt-0 max-w-4xl text-green-dark dark:text-[var(--foreground)]"
                        >
                            Quelle filière énergétique <br className="hidden sm:block" />
                            pour le climat ?
                        </Heading>

                        <Text
                            as="p"
                            size="3"
                            className="mt-4 max-w-3xl leading-7 text-brown-light dark:text-[var(--brown-11)]/85"
                        >
                            Toutes les sources d&apos;énergie ne se valent pas. Comparez leur
                            empreinte carbone en{" "}
                            <Popover.Root>
                                <Popover.Trigger>
                                    <button
                                        type="button"
                                        className="inline font-semibold text-inherit underline decoration-dotted underline-offset-4 transition-opacity hover:opacity-80"
                                        aria-label="Afficher l’explication de l’unité gCO₂e par kWh produit"
                                    >
                                        gCO₂e par kWh produit
                                    </button>
                                </Popover.Trigger>

                                <Popover.Content
                                    size="2"
                                    side="top"
                                    align="center"
                                    sideOffset={10}
                                    className="max-w-[320px] rounded-2xl border border-brown-accent/25 bg-eco-white p-4 text-green-dark shadow-[0_12px_30px_rgba(0,0,0,0.18)] dark:bg-eco-white dark:text-green-dark"
                                >
                                    <div className="space-y-2">
                                        <Text as="p" size="2" weight="bold" className="text-green-dark">
                                            Que signifie cette unité ?
                                        </Text>

                                        <Text as="p" size="2" className="leading-6 text-green-dark">
                                            <Strong>gCO₂e/kWh</Strong> indique la quantité de gaz à effet
                                            de serre émise pour produire 1 kilowattheure
                                            d&apos;électricité.
                                        </Text>

                                        <Text as="p" size="2" className="leading-6 text-brown-light">
                                            Plus cette valeur est faible, plus la source d&apos;énergie
                                            est peu carbonée.
                                        </Text>
                                    </div>
                                </Popover.Content>
                            </Popover.Root>
                            , en tenant compte de l&apos;ensemble du cycle de vie — de la
                            construction au démantèlement.
                        </Text>
                    </header>
                </ScrollReveal>

                <ScrollReveal>
                    <section className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <Card className="rounded-2xl border border-brown-dark/10 bg-eco-gray dark:border-brown-accent/20 dark:bg-oled-gray">
                            <div className="p-6">
                                <Heading
                                    as="h2"
                                    size="4"
                                    className="mt-0 text-green-dark dark:text-[var(--foreground)]"
                                >
                                    Ce que montre le graphique
                                </Heading>
                                <Text
                                    as="p"
                                    size="3"
                                    className="mt-4 leading-7 text-brown-light dark:text-[var(--brown-11)]/85"
                                >
                                    Le graphique compare les filières selon leur intensité carbone.
                                    Plus la valeur est élevée, plus produire un kWh d&apos;électricité
                                    génère d&apos;émissions de gaz à effet de serre.
                                </Text>
                                <Text
                                    as="p"
                                    size="2"
                                    className="mt-3 leading-6 text-brown-light dark:text-[var(--brown-11)]/85"
                                >
                                    L&apos;unité <Strong>gCO₂e/kWh</Strong> signifie “grammes de CO₂
                                    équivalent par kilowattheure”. Elle sert à résumer l&apos;impact
                                    climatique d&apos;une source d&apos;énergie dans une unité simple à comparer.
                                </Text>
                            </div>
                        </Card>

                        <Card className="rounded-2xl border border-brown-dark/10 bg-brown-bg dark:border-brown-accent/20 dark:bg-oled-gray">
                            <div className="p-6">
                                <Heading
                                    as="h2"
                                    size="4"
                                    className="mt-0 text-green-dark dark:text-[var(--foreground)]"
                                >
                                    Pourquoi c&apos;est important pour le numérique
                                </Heading>
                                <Text
                                    as="p"
                                    size="3"
                                    className="mt-4 leading-7 text-brown-light dark:text-[var(--brown-11)]/85"
                                >
                                    Le numérique repose sur de l&apos;électricité à chaque étape :
                                    fabrication des équipements, alimentation des centres de
                                    données, fonctionnement des réseaux et usage quotidien des
                                    terminaux.
                                </Text>
                                <Text
                                    as="p"
                                    size="2"
                                    className="mt-3 leading-6 text-brown-light dark:text-[var(--brown-11)]/85"
                                >
                                    Comprendre les émissions par filière permet donc de mieux lire
                                    l&apos;impact climatique d&apos;une infrastructure numérique, selon
                                    l&apos;énergie mobilisée pour produire l&apos;électricité.
                                </Text>
                            </div>
                        </Card>
                    </section>
                </ScrollReveal>

                <ScrollReveal>
                    <section
                        aria-labelledby="chart-heading"
                        className="mb-8 rounded-2xl border border-brown-dark/10 bg-eco-white p-6 dark:border-brown-accent/20 dark:bg-oled-gray sm:p-8 lg:p-10"
                    >
                        <div className="mb-8">
                            <Heading
                                as="h2"
                                id="chart-heading"
                                size="5"
                                className="mt-0 text-green-dark dark:text-[var(--foreground)]"
                            >
                                Facteur d&apos;émission par filière
                            </Heading>
                            <Text
                                as="p"
                                size="2"
                                className="mt-2 text-brown-light dark:text-[var(--brown-11)]/85"
                            >
                                En gCO₂e/kWh · Du plus au moins émetteur · Clique sur une barre pour afficher son détail
                            </Text>
                        </div>

                        <EmissionsBarChart data={sortedData} />
                    </section>
                </ScrollReveal>

                <ScrollReveal>
                    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <Card className="rounded-2xl border border-brown-dark/10 bg-brown-bg dark:border-brown-accent/20 dark:bg-oled-gray">
                            <div className="p-5">
                                <Text
                                    size="1"
                                    weight="bold"
                                    className="block uppercase tracking-wider text-brown-dark dark:text-[var(--brown-11)]"
                                >
                                    Filière la plus émettrice
                                </Text>
                                <Heading
                                    as="h2"
                                    size="4"
                                    className="mt-2 text-green-dark dark:text-[var(--foreground)]"
                                >
                                    {highest.name}
                                </Heading>
                                <Text
                                    as="p"
                                    size="2"
                                    className="mt-1 text-brown-dark dark:text-[var(--brown-11)]"
                                >
                                    {highest.emissionFactor} gCO₂e/kWh
                                </Text>
                            </div>
                        </Card>

                        <Card className="rounded-2xl border border-brown-dark/10 bg-brown-bg dark:border-brown-accent/20 dark:bg-oled-gray">
                            <div className="p-5">
                                <Text
                                    size="1"
                                    weight="bold"
                                    className="block uppercase tracking-wider text-brown-dark dark:text-[var(--brown-11)]"
                                >
                                    Filière la moins émettrice
                                </Text>
                                <Heading
                                    as="h2"
                                    size="4"
                                    className="mt-2 text-green-dark dark:text-[var(--foreground)]"
                                >
                                    {lowest.name}
                                </Heading>
                                <Text
                                    as="p"
                                    size="2"
                                    className="mt-1 text-brown-dark dark:text-[var(--brown-11)]"
                                >
                                    {lowest.emissionFactor} gCO₂e/kWh
                                </Text>
                            </div>
                        </Card>

                        <Card className="rounded-2xl border border-brown-dark/10 bg-eco-gray dark:border-brown-accent/20 dark:bg-oled-gray">
                            <div className="p-5">
                                <Text
                                    size="1"
                                    weight="bold"
                                    className="block uppercase tracking-wider text-brown-dark dark:text-[var(--brown-11)]"
                                >
                                    Idée clé
                                </Text>
                                <Heading
                                    as="h2"
                                    size="4"
                                    className="mt-2 text-green-dark dark:text-[var(--foreground)]"
                                >
                                    Les écarts sont massifs
                                </Heading>
                                <Text
                                    as="p"
                                    size="2"
                                    className="mt-1 text-brown-light dark:text-[var(--brown-11)]/85"
                                >
                                    À quantité d&apos;électricité égale, l&apos;impact climatique
                                    varie fortement selon la filière utilisée.
                                </Text>
                            </div>
                        </Card>
                    </section>
                </ScrollReveal>

                <ScrollReveal>
                    <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {[
                            {
                                title: "Énergies fossiles",
                                range: "> 400 gCO₂e/kWh",
                                text:
                                    "Ces filières émettent beaucoup de gaz à effet de serre pour produire une même quantité d’électricité. Cela s’explique surtout par la combustion directe de charbon, de fioul ou de gaz, qui libère du CO₂ pendant la production.",
                            },
                            {
                                title: "Renouvelables variables",
                                range: "10 – 50 gCO₂e/kWh",
                                text:
                                    "Leur niveau d’émissions reste faible en usage. L’essentiel de l’impact vient surtout de la fabrication, du transport, de l’installation et de la maintenance des équipements comme les panneaux solaires ou les éoliennes.",
                            },
                            {
                                title: "Bas-carbone pilotable",
                                range: "6 – 15 gCO₂e/kWh",
                                text:
                                    "Ces filières produisent une électricité très peu carbonée tout en restant disponibles de manière plus stable. Leur impact existe, mais il provient davantage des infrastructures et du cycle de vie que d’émissions directes lors de la production.",
                            },
                        ].map((item) => (
                            <Card
                                key={item.title}
                                className="rounded-2xl border border-brown-dark/10 bg-brown-bg dark:border-brown-accent/20 dark:bg-oled-gray"
                            >
                                <div className="p-5">
                                    <Text
                                        size="1"
                                        weight="bold"
                                        className="block uppercase tracking-wider text-brown-dark dark:text-[var(--brown-11)]"
                                    >
                                        {item.range}
                                    </Text>
                                    <Heading
                                        as="h3"
                                        size="3"
                                        className="mt-2 text-green-dark dark:text-[var(--foreground)]"
                                    >
                                        {item.title}
                                    </Heading>
                                    <Text
                                        as="p"
                                        size="2"
                                        className="mt-2 leading-6 text-brown-light dark:text-[var(--brown-11)]/85"
                                    >
                                        {item.text}
                                    </Text>
                                </div>
                            </Card>
                        ))}
                    </section>
                </ScrollReveal>

                <ScrollReveal>
                    <section className="mt-8 rounded-2xl border border-brown-dark/10 bg-brown-bg p-6 dark:border-brown-accent/20 dark:bg-oled-gray sm:p-8">
                        <Heading
                            as="h2"
                            size="4"
                            className="mt-0 text-green-dark dark:text-[var(--foreground)]"
                        >
                            Sources et méthodologie
                        </Heading>

                        <Separator my="4" size="4" />

                        <Text
                            as="p"
                            size="2"
                            className="leading-7 text-brown-light dark:text-[var(--brown-11)]/85"
                        >
                            Les valeurs affichées comparent les filières de production selon
                            leur facteur d&apos;émission en gCO₂e/kWh. Cette unité rapporte les
                            émissions de gaz à effet de serre à une quantité donnée
                            d&apos;électricité produite, ce qui permet de comparer des sources
                            très différentes avec une base commune.
                        </Text>

                        <Text
                            as="p"
                            size="2"
                            className="mt-3 leading-7 text-brown-light dark:text-[var(--brown-11)]/85"
                        >
                            Dans ce type d’approche, on prend souvent en compte le cycle de vie
                            complet : extraction des matériaux, construction des installations,
                            production, maintenance et fin de vie.
                        </Text>

                        <Text
                            as="p"
                            size="2"
                            className="mt-3 leading-7 text-brown-light dark:text-[var(--brown-11)]/85"
                        >
                            Source des données :{" "}
                            <Link
                                href="https://ourworldindata.org/energy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brown-dark underline underline-offset-4 hover:text-brown-light dark:text-[var(--brown-11)] dark:hover:text-[var(--brown-12)]"
                            >
                                Our World in Data — Energy
                            </Link>
                        </Text>

                        <Text
                            as="p"
                            size="2"
                            className="mt-3 leading-7 text-brown-light dark:text-[var(--brown-11)]/85"
                        >
                            Référence de facteurs d&apos;émission :{" "}
                            <Link
                                href="https://data.ademe.fr/datasets/base-carboner"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brown-dark underline underline-offset-4 hover:text-brown-light dark:text-[var(--brown-11)] dark:hover:text-[var(--brown-12)]"
                            >
                                ADEME Base Carbone®
                            </Link>
                        </Text>
                    </section>
                </ScrollReveal>
            </Container>
        </main>
    );
}
