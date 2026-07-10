import { Box, Heading, Text } from "@radix-ui/themes";

const Sources = () => {
    return (
        <Box className="md:col-span-8 space-y-6">
            <Heading size="6" className="font-sans text-green-dark dark:text-eco-white">
                sources
            </Heading>
            <Text size="2" color="gray">
                USGS Mineral Commodity Summaries 2025/2026, IEA Critical Minerals
                Market Review, Commission européenne — Critical Raw Materials.
            </Text>
        </Box>
    )
}

export default Sources;