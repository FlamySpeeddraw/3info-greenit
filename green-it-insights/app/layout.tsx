import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
<<<<<<< HEAD
import "@radix-ui/themes/styles.css";
=======
import { Theme } from "@radix-ui/themes";
>>>>>>> fe36678 (Add graphique consommation numérique)
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Green IT Insights"
=======
  title: "Green IT Insights",
  description: "Analyse de l'impact environnemental du numérique",
>>>>>>> fe36678 (Add graphique consommation numérique)
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
      <html
          lang="fr"
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
          style={{ colorScheme: "light dark" }}
          suppressHydrationWarning
      >
      <body className="min-h-full flex flex-col bg-eco-white dark:bg-oled-black text-green-dark dark:text-eco-white" suppressHydrationWarning>
      <ThemeProvider>
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </ThemeProvider>
      </body>
      </html>
=======
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Theme
          accentColor="grass"
          grayColor="sand"
          radius="large"
        >
          {children}
        </Theme>
      </body>
    </html>
>>>>>>> fe36678 (Add graphique consommation numérique)
  );
}