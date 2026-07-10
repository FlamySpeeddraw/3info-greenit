"use client";

import { COLORS } from "@/app/color.const";
import { useState } from "react";
import Carte from "./Carte";
import { Button } from "@radix-ui/themes";

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
            <div className="mb-6 flex flex-wrap gap-3 mt-10">
                {categories.map((category) => (
                    <Button
                        key={category}
                        size="3"
                        variant={selectedCategory === category ? "solid" : "outline"}
                        color="grass"
                        className="font-medium px-6 py-3 cursor-pointer"
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </Button>
                ))}
            </div >
            <Carte selectedCategory={selectedCategory} />
        </>
    );
};

export default SectionCarte;