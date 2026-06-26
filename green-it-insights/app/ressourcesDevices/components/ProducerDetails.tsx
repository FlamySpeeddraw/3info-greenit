import { Producer } from "@/public/data/producers";

type ProducerDetailsProps = {
    producer: Producer | null;
};

export function ProducerDetails({ producer }: ProducerDetailsProps) {
    if (!producer) {
        return (
            <>
                <h2 className="m-0">Survolez un pays</h2>
                <p className="mt-4">
                    Les pays en vert sont des producteurs importants.
                </p>
            </>
        );
    }

    return (
        <>
            <p className="text-sm uppercase tracking-[0.18em] font-semibold">
                Pays producteur
            </p>

            <h2 className="m-0 mt-2">{producer.label}</h2>

            <span
                className="mt-4 inline-flex rounded-full px-3 py-1 text-sm font-medium"
                style={{
                    backgroundColor: "var(--grass-3)",
                    color: "var(--grass-11)",
                    border: "1px solid var(--grass-5)",
                }}
            >
                {producer.category}
            </span>

            <p className="mt-6">
                <strong>Ressource :</strong>
                <br />
                {producer.resource}
            </p>

            <p>
                <strong>Production :</strong>
                <br />
                {producer.productionLabel}
            </p>

            <p>
                <strong>Utilisation IT :</strong>
                <br />
                {producer.usage}
            </p>
        </>
    );
}