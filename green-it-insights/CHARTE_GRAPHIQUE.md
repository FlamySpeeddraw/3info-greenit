# Charte Graphique & Guide du Design System
## Site Web Green IT Insights

Ce document définit les directives d'implémentation de la charte graphique et du design system éco-conçu du site **Green IT Insights**. Il est destiné à tous les développeurs travaillant sur le projet afin de garantir la cohérence visuelle, l'accessibilité (A11y) et le respect des normes d'éco-conception web (RGESN - Référentiel Général d'Éco-conception de Services Numériques).

---

## 1. Principes Fondamentaux de la Charte Green IT

L'éco-conception web implique que le design doit servir l'efficacité. Notre charte repose sur trois piliers :
1. **Sobriété Énergétique :** Choix des couleurs et architectures d'affichage réduisant la charge CPU et la consommation électrique des écrans.
2. **Accessibilité (A11y) :** Respect strict des contrastes WCAG AA (minimum 4.5:1) et AAA (7:1).
3. **Légèreté Technique :** Utilisation de polices systèmes, d'icônes vectorielles légères et d'une librairie de composants optimisée (Radix UI).

---

## 2. La Palette Chromatique

Nous avons sélectionné une palette organique de trois couleurs fondamentales, complétée par un mode sombre optimisé pour les écrans OLED.

| Couleur | Code Hex | Nom | Rôle principal | Impact Green IT |
| :--- | :--- | :--- | :--- | :--- |
| **Vert Foncé** | `#112F1F` | `green-dark` | Couleur de marque primaire, boutons principaux, titres. | Excellente lisibilité sur fond clair. Représentation naturelle de la marque. |
| **Marron Foncé** | `#3D2E2B` | `brown-dark` | Couleur secondaire, bordures, contrastes de cartes, accents. | Ancrage terreux, apporte de la chaleur sans éblouir. |
| **Blanc Éco** | `#FBFBF9` | `eco-white` | Arrière-plan par défaut en mode clair. | Un blanc cassé chaud qui réduit la fatigue oculaire et consomme légèrement moins de rétroéclairage qu'un blanc pur (`#FFFFFF`). |
| **Noir Organique** | `#080E0A` | `oled-black` | Arrière-plan par défaut en mode sombre. | Un vert-noir ultra-sombre. Sur écran OLED, les pixels noirs sont éteints, réduisant la consommation de l'écran de **40%**. |

### Variables CSS & TypeScript (`app/globals.css` / `app/color.const.ts`)
Les couleurs sont disponibles sous forme de variables CSS/classes Tailwind v4, mais aussi sous forme de constantes TypeScript importables :

*   **Tailwind/CSS :** `var(--color-green-dark)` ou `bg-green-dark`
*   **TypeScript :** `import { COLORS } from "@/app/color.const"` (ex: `COLORS.green.dark`)

#### Couleurs principales :
*   `var(--color-green-dark)` / `COLORS.green.dark` / `bg-green-dark`
*   `var(--color-brown-dark)` / `COLORS.brown.dark` / `bg-brown-dark`
*   `var(--color-eco-white)` / `COLORS.eco.white` / `bg-eco-white`
*   `var(--color-oled-black)` / `COLORS.oled.black` / `bg-oled-black`

## 3. Typographie & Cohérence Visuelle

Pour économiser de la bande passante et éviter le téléchargement de fichiers de polices lourds (représentant souvent 100 à 200 Ko de données réseau), nous utilisons des **polices systèmes natives**.

```css
--font-sans: var(--font-geist-sans), system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

*   **Règle d'or :** Ne pas importer de Google Fonts ou polices tierces sans l'accord du lead designer.
*   **Uniformisation (Même style partout) :** Nous avons surchargé les balises HTML globales dans `app/globals.css` afin que le rendu visuel soit strictement identique, que le développeur utilise les balises HTML standard ou les composants typographiques Radix UI.

### Table de Correspondance
| Balise HTML | Composant Radix UI | Style appliqué | Rôle |
| :--- | :--- | :--- | :--- |
| `<h1>` | `<Heading size="8">` | Taille `2.25rem`, Gras (`700`), couleur `var(--foreground)` | Titre de page unique (H1). |
| `<h2>` | `<Heading size="7">` | Taille `1.875rem`, Gras (`700`), couleur `var(--foreground)` | Titres de sections majeures. |
| `<h3>` | `<Heading size="6">` | Taille `1.5rem`, Gras (`700`), couleur `var(--foreground)` | Sous-sections. |
| `<p>` | `<Text size="3">` | Taille `1rem`, Régulier (`400`), interligne `1.625` | Paragraphes de texte. |
| `<a>` | `<Link>` | Couleur `var(--grass-9)`, souligné | Liens hypertextes (effet hover sur `--grass-10`). |
| `<strong>` | `<Strong>` | Gras (`600`), couleur `var(--foreground)` | Mise en valeur de termes. |
| `<code>` | `<Code>` | Police mono, fond `--brown-2`/`--grass-2` | Code en ligne ou données techniques. |

---

## 4. Design System avec Radix UI

Nous utilisons **Radix UI Themes** comme fondation de notre design system. C'est une bibliothèque de composants accessibles, légers et hautement personnalisables.

### Installation
```bash
npm install @radix-ui/themes @radix-ui/react-icons
```

### Configuration globale (`app/layout.tsx`)
Envelopper l'application avec le composant `<Theme>` en le configurant sur nos couleurs :

```tsx
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Theme accentColor="grass" grayColor="sand" radius="large">
          {children}
        </Theme>
      </body>
    </html>
  );
}
```

### Surcharges des couleurs Radix (`app/globals.css`)
Pour que les composants Radix (comme les boutons verts ou marrons) adoptent nos couleurs de charte exactes, nous avons surchargé les variables de palettes Radix :

```css
:root {
  /* Vert Foncé de la charte (#112F1F) appliqué sur l'accent 'grass' */
  --grass-9: #112F1F;
  --grass-10: #224D35; /* Hover */
  
  /* Marron Foncé de la charte (#3D2E2B) appliqué sur l'accent 'brown' */
  --brown-9: #3D2E2B;
  --brown-10: #5C4641; /* Hover */
}
```

---

## 5. Exemples de Composants Prêts à l'Intégration

### A. Boutons (`<Button>`)
Utiliser le bouton `grass` (vert foncé) pour les actions primaires et `brown` pour les secondaires :

```tsx
import { Button } from "@radix-ui/themes";

// Bouton Primaire (Vert Foncé de la charte)
<Button variant="solid" color="grass">
  Confirmer l'impact
</Button>

// Bouton Secondaire (Marron Foncé de la charte)
<Button variant="outline" color="grass">
  En savoir plus
</Button>

// Bouton Tertiaire / Neutre (Marron Doux)
<Button variant="soft" color="brown">
  Annuler
</Button>
```

### B. Badges d'information (`<Badge>`)
Pour catégoriser les enjeux ou afficher des statuts :

```tsx
import { Badge } from "@radix-ui/themes";

<Badge color="grass">Éco-conçu</Badge>
<Badge color="brown">Avertissement</Badge>
<Badge color="tomato">Hors-limite CO2</Badge>
```

### C. Cartes de Contenu (`<Card>`)
Pour structurer les articles ou données :

```tsx
import { Card, Heading, Text, Box } from "@radix-ui/themes";

<Card variant="surface" className="border border-brown-dark/10">
  <Box p="4">
    <Heading size="3" className="mb-2">Optimisation CPU</Heading>
    <Text size="2" color="gray">
      Réduire la complexité des scripts JavaScript permet de prolonger la durée de vie de la batterie des utilisateurs.
    </Text>
  </Box>
</Card>
```

### D. Interrupteurs d'économie d'énergie (`<Switch>`)
Pour donner le contrôle à l'utilisateur :

```tsx
import { Switch, Flex, Text } from "@radix-ui/themes";

<Flex gap="2" align="center">
  <Switch color="grass" defaultChecked />
  <Text size="2">Activer le mode économie d'énergie</Text>
</Flex>
```

---

## 6. Animations de Scroll avec GSAP

Pour garantir une expérience utilisateur fluide et premium, le site intègre le moteur d'animation **GSAP** ainsi que son module **ScrollTrigger**. Un composant réutilisable `<ScrollReveal>` est disponible pour uniformiser les effets d'apparition lors du défilement.

### Fonctionnement & Configuration
Les animations se déclenchent de manière bidirectionnelle (au défilement vers le bas ET vers le haut) grâce à la configuration des `toggleActions`.

*   **Composant wrapper :** `<ScrollReveal>`
*   **Propriétés animées :** Opacité (`opacity`) et Translation verticale (`y`).
*   **Paramètres techniques du ScrollTrigger :**
    *   `start: "top 88%"` (L'animation commence dès que le haut de l'élément atteint 88% de la hauteur de l'écran).
    *   `duration: 1.2` (Durée de 1,2 seconde pour un glissement naturel).
    *   `ease: "power3.out"` (Courbe de vitesse fluide).
    *   `toggleActions: "play reverse play reverse"` (Joue l'animation à l'apparition, la joue à l'envers lorsque l'élément sort de l'écran, ce qui permet de ré-animer l'élément s'il réapparaît).

### Exemple d'utilisation dans le code
Les développeurs doivent envelopper les blocs de contenu majeurs (comme les cartes, grilles ou sections) dans le composant `<ScrollReveal>` :

```tsx
import { Card, Text } from "@radix-ui/themes";
import { ScrollReveal } from "@/components/ScrollReveal"; // Remplacez par le chemin adéquat

export default function MySection() {
  return (
    <ScrollReveal>
      <Card variant="surface">
        <Text>Ce contenu apparaîtra avec une animation fluide de scroll.</Text>
      </Card>
    </ScrollReveal>
  );
}
```

> [!TIP]
> **Règle de performance :** 
> Pour éviter les saccades (jank), limitez les animations à `opacity` et `transform` (utilisées par `y` de GSAP). N'animez jamais des propriétés de position absolue comme `top`, `left`, `margin` ou `width` car elles forcent le navigateur à recalculer toute la mise en page (reflow).

---

## 7. Checklist Éco-Conception pour les Développeurs

Avant de soumettre une Pull Request, assurez-vous de cocher ces points :
*   [ ] **Poids de la page :** La page d'accueil doit peser moins de **250 Ko** au chargement initial.
*   [ ] **Requêtes réseau :** Limiter le nombre de requêtes HTTP à moins de 15 par page.
*   [ ] **Optimisation d'images :** Toutes les images doivent être au format moderne (WebP ou AVIF), compressées et chargées de manière paresseuse (`loading="lazy"`).
*   [ ] **Contraste :** Les textes passent le test de contraste WCAG AA sur leur fond respectif.
*   [ ] **Mode Sombre OLED :** Le site s'affiche correctement en arrière-plan sombre `#080E0A` pour économiser de la batterie.
*   [ ] **Pas de Web Fonts superflues :** Utilisation exclusive de la stack de police système prédéfinie.
*   [ ] **Animations :** Utiliser exclusivement le composant `<ScrollReveal>` (GSAP) pour les effets de défilement afin d'assurer l'uniformité visuelle et la propreté du cycle de vie de l'animation.



