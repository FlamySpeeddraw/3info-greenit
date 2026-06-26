import { COLORS } from '../color.const';
import './../globals.css';
import SectionCarte from './components/SectionCarte';
import './style.css';

const page = () => {
    return (
        <main className="min-h-screen px-6 py-12">
            <section className="mx-auto max-w-6xl">
                <div className="glassmorphism rounded-3xl p-8 md:p-12 mb-10">
                    <p
                        className="text-sm uppercase tracking-[0.25em] font-semibold"
                        style={{ color: COLORS.green.accent }}
                    >
                        Green IT Insights
                    </p>

                    <h1>Carte des producteurs de ressources IT</h1>

                    <p className="mt-6 max-w-3xl text-lg">
                        Explorez les principaux pays producteurs de ressources utilisées
                        dans le numérique : métaux, terres rares et semi-conducteurs.
                    </p>
                </div>
                <SectionCarte />
                <footer
                    className="mt-10 rounded-2xl p-6"
                    style={{
                        backgroundColor: "var(--brown-2)",
                        border: "1px solid var(--brown-4)",
                    }}
                >
                    <h3 className="m-0 mb-3">Sources</h3>
                    <p className="m-0 text-sm">
                        USGS Mineral Commodity Summaries 2025/2026, IEA Critical Minerals
                        Market Review, Commission européenne — Critical Raw Materials.
                    </p>
                </footer>
            </section>
        </main>
    );
};

export default page;