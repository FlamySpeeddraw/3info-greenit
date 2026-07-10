import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
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
  title: "Green IT Insights"
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
