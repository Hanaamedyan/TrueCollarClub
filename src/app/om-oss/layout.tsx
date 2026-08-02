import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://truecollarclub.no";

export const metadata: Metadata = {
  title: "Om oss — Skapt av arbeidere, for arbeidere",
  description:
    "Lær om historien bak TrueCollarClub. Vi lager avslappende klær med tydelige skrifter for folk som jobber hardt. Basert i Bergen, Norge.",
  keywords: [
    "om TrueCollarClub", "norsk klesmerke", "klær bergen",
    "klesmerke for arbeidere", "norsk mote",
  ],
  openGraph: {
    title: "Om oss — TrueCollarClub",
    description: "Skapt av arbeidere, for arbeidere. Les om historien og menneskene bak TrueCollarClub.",
    url: `${BASE_URL}/om-oss`,
  },
  alternates: { canonical: `${BASE_URL}/om-oss` },
};

export default function OmOssLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
