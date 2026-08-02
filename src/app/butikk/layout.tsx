import type { Metadata } from "next";
import ProductJsonLd from "@/components/ProductJsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://truecollarclub.no";

export const metadata: Metadata = {
  title: "Nettbutikk — T-skjorter, Hoodies & Caps",
  description:
    "Kjøp t-skjorter, hoodies og caps fra TrueCollarClub. Komfortable klær med tydelige skrifter laget for deg som jobber hardt. Rask levering i Norge.",
  keywords: [
    "kjøp klær online", "t-skjorte med trykk", "hettegenser nettbutikk",
    "caps norge", "arbeidsklær nettbutikk", "komfort klær",
    "klær med skrift", "streetwear norge", "oversized t-skjorte",
    "TrueCollarClub butikk", "norsk klær nettbutikk",
  ],
  openGraph: {
    title: "Nettbutikk — TrueCollarClub",
    description: "T-skjorter, hoodies og caps med tydelige skrifter. Kjøp direkte og få rask levering i Norge.",
    url: `${BASE_URL}/butikk`,
  },
  alternates: { canonical: `${BASE_URL}/butikk` },
};

export default function ButikkLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductJsonLd />
      {children}
    </>
  );
}
