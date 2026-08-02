import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://truecollarclub.no";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TrueCollarClub — Klær for de som jobber hardt",
    template: "%s | TrueCollarClub",
  },
  description:
    "Kjøp komfortable t-skjorter, hoodies og caps med tydelige skrifter fra TrueCollarClub. Norske klær laget for folk som jobber hardt. Rask levering fra Bergen.",
  keywords: [
    "TrueCollarClub", "klær", "t-skjorte", "hoodie", "caps",
    "arbeidsklær", "norsk klær", "komfortklær", "klær med trykk",
    "nettbutikk klær", "klær bergen", "norske klær nettbutikk",
    "hettegenser", "oversized t-skjorte", "klær for menn",
    "klær for kvinner", "streetwear norge", "premium klær",
  ],
  authors: [{ name: "TrueCollarClub", url: BASE_URL }],
  creator: "TrueCollarClub",
  publisher: "TrueCollarClub",
  category: "Klær og mote",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    alternateLocale: "en_US",
    url: BASE_URL,
    title: "TrueCollarClub — Klær for de som jobber hardt",
    description:
      "Avslappende t-skjorter, hoodies og caps med tydelige skrifter. For deg som jobber hardt og fortjener klær som sier noe om hvem du er.",
    siteName: "TrueCollarClub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TrueCollarClub — Klær for de som jobber hardt",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueCollarClub — Klær for de som jobber hardt",
    description: "T-skjorter, hoodies og caps med tydelige skrifter. Norske klær av høy kvalitet.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "nb-NO": BASE_URL,
      "en-US": `${BASE_URL}/?lang=en`,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "TrueCollarClub",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "Norsk nettbutikk for komfortable klær med tydelige skrifter. T-skjorter, hoodies og caps for de som jobber hardt.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bergen",
      addressCountry: "NO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hei@truecollarclub.no",
      contactType: "customer service",
      availableLanguage: ["Norwegian", "English"],
    },
    sameAs: ["https://instagram.com/truecollarclub"],
    priceRange: "199 - 799 NOK",
    currenciesAccepted: "NOK",
    paymentAccepted: "Kredittkort, debetkort",
    openingHours: "Mo-Fr 09:00-17:00",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TrueCollarClub",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/butikk?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="nb" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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
