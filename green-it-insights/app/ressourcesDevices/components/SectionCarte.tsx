"use client";

import { COLORS } from "@/app/color.const";
import { useState } from "react";
import Carte from "./Carte";

type Category = "Métaux" | "Terres rares" | "Semi-conducteurs";

const categories: Array<"Tous" | Category> = [
    "Tous",
    "Métaux",
    "Terres rares",
    "Semi-conducteurs",
];

const SectionCarte = () => {
    const [selectedCategory, setSelectedCategory] = useState<"Tous" | Category>("Tous");
    return (
        <>
            <div className="mb-6 flex flex-wrap gap-3">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setSelectedCategory(category)}
                        className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
                        style={{
                            backgroundColor: selectedCategory === category ? COLORS.green.dark : "var(--grass-2)",
                            color: selectedCategory === category ? COLORS.eco.white : "var(--grass-11)",
                            border: "1px solid var(--grass-5)",
                            cursor: 'pointer'
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>
            <Carte selectedCategory={selectedCategory} />
        </>
    );
};

export default SectionCarte;