export type Category = "Métaux" | "Terres rares" | "Semi-conducteurs";
export type SelectedCategory = "Tous" | Category;

export type Producer = {
    country: string;
    label: string;
    category: Category;
    resource: string;
    production: number;
    productionLabel: string;
    usage: string;
};

export const producers: Producer[] = [
    {
        country: "China",
        label: "Chine",
        category: "Terres rares",
        resource: "Terres rares, gallium, silicium",
        production: 70,
        productionLabel: "≈70% des terres rares mondiales",
        usage: "LED, écrans, aimants, semi-conducteurs",
    },
    {
        country: "Chile",
        label: "Chili",
        category: "Métaux",
        resource: "Cuivre",
        production: 23,
        productionLabel: "≈23% du cuivre mondial",
        usage: "Câbles, cartes mères, data centers",
    },
    {
        country: "Australia",
        label: "Australie",
        category: "Métaux",
        resource: "Lithium, terres rares, or",
        production: 45,
        productionLabel: "≈45% du lithium mondial",
        usage: "Batteries, connecteurs, composants",
    },
    {
        country: "Democratic Republic of the Congo",
        label: "RDC",
        category: "Métaux",
        resource: "Cobalt, cuivre",
        production: 70,
        productionLabel: "≈70% du cobalt mondial",
        usage: "Batteries lithium-ion, smartphones, PC portables",
    },
    {
        country: "Mexico",
        label: "Mexique",
        category: "Métaux",
        resource: "Argent",
        production: 24,
        productionLabel: "1er producteur mondial d’argent",
        usage: "Contacts électriques, soudures, composants",
    },
    {
        country: "Brazil",
        label: "Brésil",
        category: "Semi-conducteurs",
        resource: "Silicium",
        production: 10,
        productionLabel: "Producteur important de silicium métal",
        usage: "Puces, processeurs, panneaux solaires",
    },
    {
        country: "United States of America",
        label: "États-Unis",
        category: "Semi-conducteurs",
        resource: "Silicium, terres rares",
        production: 12,
        productionLabel: "Production stratégique",
        usage: "Semi-conducteurs, électronique avancée",
    },
];