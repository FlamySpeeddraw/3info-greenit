import { Box, Heading, Text } from "@radix-ui/themes";

const Title = () => {
    return (
        <Box className="md:col-span-8 space-y-6">
            <Heading
                size="9"
                weight="bold"
                className="tracking-tight leading-none font-sans text-green-dark dark:text-eco-white"
            >
                Carte des producteurs de ressources IT
            </Heading>
            <Text size="4" className="block max-w-2xl font-light opacity-90 leading-relaxed text-green-dark dark:text-eco-white">
                Explorez les principaux pays producteurs de ressources utilisées
                dans le numérique : métaux, terres rares et semi-conducteurs.
            </Text>
        </Box>
    );
};

export default Title;