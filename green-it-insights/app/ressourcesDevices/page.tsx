import SectionCarte from './components/SectionCarte';
import { Container } from '@radix-ui/themes';
import Title from './components/Title';
import Sources from './components/Sources';

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