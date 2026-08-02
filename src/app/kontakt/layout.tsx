import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://truecollarclub.no";

export const metadata: Metadata = {
  title: "Kontakt oss — TrueCollarClub Bergen",
  description:
    "Ta kontakt med TrueCollarClub. Spørsmål om produkter, levering eller bestilling? Vi svarer raskt. Basert i Bergen, Norge.",
  keywords: [
    "kontakt TrueCollarClub", "kundeservice klær", "nettbutikk kontakt",
    "klær bergen kontakt", "hjelp bestilling klær",
  ],
  openGraph: {
    title: "Kontakt — TrueCollarClub",
    description: "Spørsmål? Vi hjelper deg gjerne. Send oss en melding så svarer vi raskt.",
    url: `${BASE_URL}/kontakt`,
  },
  alternates: { canonical: `${BASE_URL}/kontakt` },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
