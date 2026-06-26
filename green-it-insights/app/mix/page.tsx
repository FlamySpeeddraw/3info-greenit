import { EnergyMap } from "@/components/EnergyMap";
import { Container, Heading, Text } from "@radix-ui/themes";
import { COLORS } from "@/app/color.const"; 

export default function MixPage() {
  return (
    <main style={{ 
      backgroundColor: COLORS.oled.black,
      minHeight: "100vh",
      paddingTop: "48px",
      paddingBottom: "48px"
    }}>
      <Container size="4">
        
        {/* Header Section */}
        <div style={{ marginBottom: "48px" }}>
          <Heading 
            size="9" 
            weight="bold"
            style={{ 
              color: COLORS.eco.white,
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
                color: COLORS.dark.foreground,
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
              color: COLORS.dark.grass[7],
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