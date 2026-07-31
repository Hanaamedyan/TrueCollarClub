export type Product = {
  id: number;
  nameNO: string;
  nameEN: string;
  price: number;
  category: "tshirts" | "hoodies" | "caps" | "accessories";
  badge?: "new" | "bestseller";
  inStock: boolean;
  colors: string[];
  sizes: string[];
  image: string;
  descNO: string;
  descEN: string;
};

export const products: Product[] = [
  {
    id: 1,
    nameNO: "TCC Classic Tee — Navy",
    nameEN: "TCC Classic Tee — Navy",
    price: 399,
    category: "tshirts",
    badge: "bestseller",
    inStock: true,
    colors: ["#0F1F4B", "#FFFFFF", "#1a1a1a"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/product-1.jpg",
    descNO: "Den klassiske TCC T-skjorten med stort logo-trykk på brystet. Myk bomull, perfekt passform.",
    descEN: "The classic TCC tee with large logo print on the chest. Soft cotton, perfect fit.",
  },
  {
    id: 2,
    nameNO: "TCC Hoodie — Blokk-tekst",
    nameEN: "TCC Hoodie — Block Text",
    price: 699,
    category: "hoodies",
    badge: "bestseller",
    inStock: true,
    colors: ["#0F1F4B", "#FFFFFF", "#374151"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/product-2.jpg",
    descNO: "Tykk og varm hoodie med stor blokk-tekst på ryggen. Perfekt etter en lang dag.",
    descEN: "Thick and warm hoodie with bold block text on the back. Perfect after a long day.",
  },
  {
    id: 3,
    nameNO: "TCC Snapback Cap",
    nameEN: "TCC Snapback Cap",
    price: 299,
    category: "caps",
    badge: "new",
    inStock: true,
    colors: ["#0F1F4B", "#1a1a1a"],
    sizes: ["One size"],
    image: "/images/product-3.jpg",
    descNO: "Justerbar snapback cap med brodert TCC-logo. Klassisk og stilren.",
    descEN: "Adjustable snapback cap with embroidered TCC logo. Classic and stylish.",
  },
  {
    id: 4,
    nameNO: "TCC Oversize Tee — Hvit",
    nameEN: "TCC Oversize Tee — White",
    price: 449,
    category: "tshirts",
    badge: "new",
    inStock: true,
    colors: ["#FFFFFF", "#0F1F4B"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/product-4.jpg",
    descNO: "Hvit oversized T-skjorte med marinblå TCC-print. Avslappet og stilfull.",
    descEN: "White oversized tee with navy TCC print. Relaxed and stylish.",
  },
  {
    id: 5,
    nameNO: "TCC Zip Hoodie",
    nameEN: "TCC Zip Hoodie",
    price: 799,
    category: "hoodies",
    inStock: true,
    colors: ["#0F1F4B", "#374151"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/product-5.jpg",
    descNO: "Glidelås-hoodie med TCC-logo på brystet og ermet. Enkel, praktisk, stilren.",
    descEN: "Zip hoodie with TCC logo on chest and sleeve. Simple, practical, stylish.",
  },
  {
    id: 6,
    nameNO: "TCC Tøypose",
    nameEN: "TCC Tote Bag",
    price: 199,
    category: "accessories",
    badge: "new",
    inStock: true,
    colors: ["#0F1F4B", "#FFFFFF"],
    sizes: ["One size"],
    image: "/images/product-6.jpg",
    descNO: "Robust tøypose med stort TCC-print. For de som bærer litt ekstra.",
    descEN: "Sturdy tote bag with large TCC print. For those who carry a little extra.",
  },
];
