import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  title: {
    default: "TrueCollarClub — Klær for de som jobber",
    template: "%s | TrueCollarClub",
  },
  description:
    "TrueCollarClub — avslappende klær med store, tydelige skrifter for de som jobber hardt. Myk kvalitet, sterk identitet.",
  keywords: ["TrueCollarClub", "klær", "t-skjorte", "hoodie", "arbeidsklær", "norsk klær"],
  authors: [{ name: "TrueCollarClub" }],
  creator: "TrueCollarClub",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    alternateLocale: "en_US",
    title: "TrueCollarClub — Klær for de som jobber",
    description:
      "Avslappende plagg med store, tydelige skrifter. For de som jobber hardt og lever fullt.",
    siteName: "TrueCollarClub",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueCollarClub",
    description: "Avslappende klær med stor identitet",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nb" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <GoogleAnalytics />
        <LanguageProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
