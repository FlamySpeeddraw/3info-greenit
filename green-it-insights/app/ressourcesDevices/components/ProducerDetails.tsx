import { Producer } from "@/public/data/producers";
import { Badge, Flex, Heading, Text } from "@radix-ui/themes";

type ProducerDetailsProps = {
    producer: Producer | null;
};

export function ProducerDetails({ producer }: ProducerDetailsProps) {
    if (!producer) {
        return (
            <>
                <Heading size="6" className="font-sans text-green-dark dark:text-eco-white">
                    Survolez un pays
                </Heading>
                <Text size="2" color="gray">
                    Les pays en vert sont des producteurs importants.
                </Text>
            </>
        );
    }

    return (
        <>
            <Text size="1" color="gray" className="uppercase tracking-wider font-bold block mb-1">
                Pays producteur
            </Text>

            <Heading size="6" className="font-sans text-green-dark dark:text-eco-white">
                {producer.label}
            </Heading>

            <Badge color="grass">{producer.category}</Badge>

            <Flex direction={'column'}>
                <Text size="2" color="gray" className="mt-10">
                    <strong>Ressource :</strong>
                    <br />
                    {producer.resource}
                </Text>

                <Text size="2" color="gray" className="mt-10">
                    <strong>Production :</strong>
                    <br />
                    {producer.productionLabel}
                </Text>

                <Text size="2" color="gray" className="mt-10">
                    <strong>Utilisation IT :</strong>
                    <br />
                    {producer.usage}
                </Text>
            </Flex>
        </>
    );
}