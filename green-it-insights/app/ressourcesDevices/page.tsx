import type { Metadata } from 'next';
import SectionCarte from './components/SectionCarte';
import { Container } from '@radix-ui/themes';
import Title from './components/Title';
import Sources from './components/Sources';

export const metadata: Metadata = {
    title: 'Production IT : ressources et matériaux',
    description:
        "D'où viennent les métaux et matériaux des équipements numériques ? Carte des pays producteurs et enjeux d'approvisionnement de la fabrication IT.",
    openGraph: {
        title: 'Production IT : ressources et matériaux',
        description:
            "D'où viennent les métaux et matériaux des équipements numériques : carte des pays producteurs.",
        type: 'article',
    },
};

const page = () => {
    return (
        <main className="flex-1 min-h-screen bg-(--background) text-(--foreground) transition-colors duration-500 overflow-x-hidden">
            <Container size="4" className="px-4 py-12 sm:py-20">
                <section className="mb-20 text-center sm:text-left">
                    <Title />
                    <SectionCarte />
                    <Sources />
                </section>
            </Container>
        </main>
    );
};

export default page;