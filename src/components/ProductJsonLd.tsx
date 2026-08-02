import { products } from "@/lib/products";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://truecollarclub.no";

export default function ProductJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "TrueCollarClub Produkter",
    url: `${BASE_URL}/butikk`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.nameNO,
        description: p.descNO,
        url: `${BASE_URL}/butikk`,
        brand: { "@type": "Brand", name: "TrueCollarClub" },
        offers: {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "NOK",
          availability: p.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          seller: { "@type": "Organization", name: "TrueCollarClub" },
        },
        ...(p.badge === "new" && { releaseDate: "2025" }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
