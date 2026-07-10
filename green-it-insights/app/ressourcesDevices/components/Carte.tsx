"use client";

import { Producer, producers, SelectedCategory } from "@/public/data/producers";
import { useMemo, useState } from "react";
import { WorldProducersMap } from "./WorldProducerMap";
import { ProducerDetails } from "./ProducerDetails";

type CarteProps = {
    selectedCategory: SelectedCategory;
};

export default function Carte({ selectedCategory }: CarteProps) {
    const [hoveredProducer, setHoveredProducer] = useState<Producer | null>(null);

    const filteredProducers = useMemo(() => {
        if (selectedCategory === "Tous") return producers;

        return producers.filter((producer) => producer.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <section
            className="rounded-3xl p-6 md:p-8"
            style={{
                backgroundColor: "var(--grass-2)",
                border: "1px solid var(--grass-4)",
            }}
        >
            <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                        backgroundColor: "var(--eco-gray)",
                        border: "1px solid var(--grass-4)",
                    }}
                >
                    <WorldProducersMap
                        producers={filteredProducers}
                        onHover={setHoveredProducer}
                    />
                </div>

                <aside
                    className="rounded-2xl p-6"
                    style={{
                        backgroundColor: "var(--brown-2)",
                        border: "1px solid var(--brown-4)",
                    }}
                >
                    <ProducerDetails producer={hoveredProducer} />
                </aside>
            </div>
        </section>
    );
}