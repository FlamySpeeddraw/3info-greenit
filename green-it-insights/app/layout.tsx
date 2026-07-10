import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";

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
      <body className="min-h-full flex flex-col bg-(--background) text-(--foreground)" suppressHydrationWarning>
      <ThemeProvider>
        {children}
      </ThemeProvider>
      </body>
      </html>
  );
}