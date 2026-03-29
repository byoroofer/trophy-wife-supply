import type { Collection, Product } from "@/lib/types";

export const brandStats = [
  { label: "Signature drops", value: "12" },
  { label: "Custom embroidery lead", value: "10 days" },
  { label: "Boutique-ready categories", value: "3" }
] as const;

export const collections: Collection[] = [
  {
    handle: "hats",
    title: "Signature Hats",
    description:
      "Statement truckers, embroidery-first classics, and event-ready silhouettes built to carry the brand.",
    eyebrow: "Launch Collection",
    featured: true,
    palette: ["#f6d8d2", "#8f3f4d"]
  },
  {
    handle: "apparel",
    title: "Apparel",
    description:
      "Soft structure, elevated basics, and feminine layers designed to extend the boutique beyond headwear.",
    eyebrow: "Expansion Ready",
    featured: true,
    palette: ["#f1e0d7", "#5b3a30"]
  },
  {
    handle: "accessories",
    title: "Accessories",
    description:
      "Finishing pieces with boutique margin potential, gift appeal, and strong add-on conversion.",
    eyebrow: "Cross-Sell Edit",
    featured: true,
    palette: ["#edd4c2", "#7a5f4c"]
  }
];

export const products: Product[] = [
  {
    handle: "champagne-cowgirl-trucker",
    title: "Champagne Cowgirl Trucker",
    subtitle: "Foam-front trucker with high-contrast embroidery",
    description:
      "A high-volume hero piece for launches, rodeo edits, and bachelorette gifting. Built with a crisp crown, breathable mesh back, and sharp embroidery that reads clearly on mobile and in person.",
    price: 42,
    compareAtPrice: 48,
    collectionHandles: ["hats"],
    featured: true,
    availableForSale: true,
    leadTime: "Ships in 3-5 business days",
    highlights: [
      "Structured foam front with tonal rope detail",
      "Contrast embroidery designed to photograph well",
      "Adjustable snapback fit"
    ],
    materials: ["Poly foam front", "Mesh back", "Cotton twill brim"],
    palette: ["#f9dad6", "#8d4352"]
  },
  {
    handle: "ring-season-embroidered-cap",
    title: "Ring Season Embroidered Cap",
    subtitle: "Soft-washed dad cap with elevated script",
    description:
      "A feminine staple with a broken-in feel and a polished script logo. Designed to move from casual daily wear to bridal-party edits without feeling novelty.",
    price: 38,
    collectionHandles: ["hats"],
    featured: true,
    availableForSale: true,
    leadTime: "Ships in 3-5 business days",
    highlights: [
      "Soft-washed cotton finish",
      "Low-profile silhouette for easy everyday styling",
      "Premium interior taping"
    ],
    materials: ["100% cotton twill", "Metal buckle closure"],
    palette: ["#f4d8cf", "#6c3643"]
  },
  {
    handle: "main-character-rope-hat",
    title: "Main Character Rope Hat",
    subtitle: "Structured five-panel built for bold drops",
    description:
      "Designed for premium collection moments with a stronger front profile, rope accent, and crisp embroidery placement. It carries the brand voice without leaning costume.",
    price: 44,
    compareAtPrice: 52,
    collectionHandles: ["hats"],
    featured: true,
    availableForSale: true,
    leadTime: "Made to order in 7-10 business days",
    highlights: [
      "Five-panel profile with statement rope trim",
      "Embroidered front lockup with clean edge density",
      "Snapback sizing for event sales"
    ],
    materials: ["Cotton-poly blend shell", "Structured front panel"],
    palette: ["#f1e4db", "#7d5561"]
  },
  {
    handle: "after-party-crewneck",
    title: "After Party Crewneck",
    subtitle: "Premium fleece layer for boutique styling",
    description:
      "A heavy-weight crewneck with a polished drape and tonal chest embroidery. Built as the first apparel bridge beyond hats with giftable appeal and comfortable repeat wear.",
    price: 72,
    collectionHandles: ["apparel"],
    featured: true,
    availableForSale: true,
    leadTime: "Ships in 5-7 business days",
    highlights: [
      "Heavy cotton fleece with clean neckline recovery",
      "Tonal embroidery for elevated brand placement",
      "Relaxed boutique fit"
    ],
    materials: ["80% cotton", "20% recycled polyester"],
    palette: ["#ede1da", "#5d443c"]
  },
  {
    handle: "brunch-club-tote",
    title: "Brunch Club Tote",
    subtitle: "Structured carryall for add-on conversion",
    description:
      "A sturdy canvas tote sized for errands, market days, and gifting. It adds a lower entry price point to the catalog while still carrying the same polished brand attitude.",
    price: 34,
    collectionHandles: ["accessories"],
    featured: false,
    availableForSale: true,
    leadTime: "Ships in 3-5 business days",
    highlights: [
      "Wide gusset for practical carry volume",
      "Reinforced handles",
      "High-contrast front print"
    ],
    materials: ["14 oz cotton canvas"],
    palette: ["#efe3d8", "#73513f"]
  },
  {
    handle: "golden-hour-trucker",
    title: "Golden Hour Trucker",
    subtitle: "Warm neutral trucker with boutique edge",
    description:
      "A versatile neutral trucker created for easy pairing across denim, lounge, and event edits. It broadens the launch assortment without diluting the hero category.",
    price: 40,
    collectionHandles: ["hats"],
    featured: false,
    availableForSale: true,
    leadTime: "Ships in 3-5 business days",
    highlights: [
      "Neutral base for broad outfit compatibility",
      "High-rise crown with breathable mesh",
      "Production-friendly silhouette for future drops"
    ],
    materials: ["Poly foam front", "Mesh back", "Curved brim"],
    palette: ["#edd8cb", "#916047"]
  }
];
