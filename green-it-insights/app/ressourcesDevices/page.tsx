import { Header } from '@/components/Header';
import SectionCarte from './components/SectionCarte';
import { Box, Container, Heading, Text } from '@radix-ui/themes';
import Title from './components/Title';
import Sources from './components/Sources';

const page = () => {
    return (
        <main className="flex-1 min-h-screen bg-(--background) text-(--foreground) transition-colors duration-500 overflow-x-hidden">
            <Header />
            <Container size="4" className="px-4 py-12 sm:py-20">
                <section className="mb-20 text-center sm:text-left">
                    <Title />
                    <SectionCarte />
                    <Sources />
                </section>
                <footer className="pt-8 border-t text-center border-brown-dark/10 dark:border-eco-white/5">
                    <Text size="1" color="gray">
                        Green IT Insights &copy; {new Date().getFullYear()} — Média éco-conçu. Moins de 0,1g CO2 par visite en mode sombre OLED.
                    </Text>
                </footer>
            </Container>
        </main>
    );
};

export default page;