import Link from "next/link";
import { Button, Text } from "@radix-ui/themes";

export function GeologicalFinalCta() {
  return (
    <aside className="mt-3 flex flex-col items-stretch gap-2 rounded-lg border border-green-dark/15 bg-eco-white/95 p-4 md:mt-5 md:flex-row md:items-center md:justify-between md:gap-4 dark:border-eco-white/10 dark:bg-oled-gray/80">
      <Text as="p" className="uppercase" color="brown" size="1" weight="bold">
        Fin du voyage géologique
      </Text>
      <Button asChild color="grass" size="3">
        <Link className="no-underline" href="/">
          Continuer l&apos;exploration
        </Link>
      </Button>
    </aside>
  );
}
