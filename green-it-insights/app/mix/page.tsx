import { EnergyMap } from "@/components/EnergyMap";
import { Header } from "@/components/Header";
import { Container, Heading, Text } from "@radix-ui/themes";

export default function MixPage() {
  return (
    
    
    <main style={{
      backgroundColor: "var(--color-bg)",
      minHeight: "100vh",
      paddingTop: "48px",
      paddingBottom: "48px"
    }}>

      <Container>
                      <Header />



        <div style={{ marginBottom: "48px" }}>
          <Heading
            size={{ initial: "7", sm: "9" }}
            weight="bold"
            style={{
              color: "var(--color-text)",
              marginBottom: "24px",
              lineHeight: "1.2"
            }}
          >
            Intensité carbone de l'énergie mondiale
          </Heading>

          <div style={{ marginBottom: "24px" }}>
            <Text
              size="5"
              style={{
                color: "var(--color-text)",
                lineHeight: "1.7",
                display: "block"
              }}
            >
              Toutes les sources d'énergie n'ont pas le même impact sur le climat.
              L'<strong>intensité carbone</strong> mesure les émissions de CO₂ générées
              pour produire chaque kilowattheure d'électricité — du charbon aux énergies renouvelables.
            </Text>
          </div>

          <Text
            size="3"
            style={{
              color: "var(--color-primary)",
              lineHeight: "1.7"
            }}
          >
            Cliquez sur un pays pour découvrir son mix énergétique et comprendre
            comment ses choix de production façonnent son empreinte carbone.
          </Text>
        </div>

        {/* Map Component */}
        <EnergyMap />

      </Container>
    </main>
  );
}