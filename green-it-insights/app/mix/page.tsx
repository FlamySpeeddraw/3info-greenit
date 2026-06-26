// 1. On importe ton composant de carte D3
import { EnergyMap } from "@/components/EnergyMap";
import { Container, Heading } from "@radix-ui/themes";

export default function MixPage() {
  return (
    <main className="min-h-screen bg-eco-white py-10 dark:bg-oled-black">
      <Container size="4">
        
        {}
        <EnergyMap />
        
      </Container>
    </main>
  );
}