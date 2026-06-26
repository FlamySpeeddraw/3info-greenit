import { EmissionsParPaysClient } from "./EmissionsParPaysClient";
import { countries } from "./data";
import { getDataYearLabel } from "./country-utils";

export default function EmissionsParPaysPage() {
  const dataYearLabel = getDataYearLabel(countries);

  return (
    <main className="min-h-screen bg-[#FBFBF9] px-5 py-10 text-[#112F1F] sm:px-8 lg:px-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#5C4641]">
            Green IT Insights
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Mix energetique et emissions carbone par pays
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#3D2E2B]">
            Le pays qui heberge un service numerique influence directement son
            empreinte carbone. Une meme consommation electrique ne genere pas le
            meme volume de CO2 selon le mix utilise pour produire
            l&apos;electricite.
          </p>
          <p className="mt-3 text-sm leading-6 text-[#5C4641]">
            Donnees locales issues du dataset Energy d&apos;Our World in Data:
            {countries.length} pays disponibles, derniere annee disponible:
            {dataYearLabel}.
          </p>
        </header>

        <EmissionsParPaysClient countries={countries} />

        <section className="rounded-lg border border-[#3D2E2B]/20 bg-[#F2EFE9] p-5 sm:p-6">
          <h2 className="text-2xl font-bold">Conclusion</h2>
          <p className="mt-3 leading-7 text-[#3D2E2B]">
            A consommation identique, le lieu d&apos;hebergement change
            fortement les emissions de CO2 d&apos;un service numerique. Choisir
            un pays dont l&apos;electricite est moins carbonee permet donc de
            reduire directement l&apos;empreinte carbone liee a l&apos;usage des
            serveurs.
          </p>
          <p className="mt-4 text-xs leading-5 text-[#5C4641]">
            Donnees extraites du fichier local{" "}
            <code>public/data/owid-energy-data.csv</code>, telecharge depuis Our
            World in Data. La categorie autres regroupe le petrole et les autres
            renouvelables du dataset OWID.
          </p>
        </section>
      </section>
    </main>
  );
}
