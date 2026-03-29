export type Collection = {
  handle: string;
  title: string;
  description: string;
  eyebrow: string;
  featured: boolean;
  palette: [string, string];
  imageUrl?: string;
};

export type Product = {
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  collectionHandles: string[];
  featured: boolean;
  availableForSale: boolean;
  leadTime: string;
  highlights: string[];
  materials: string[];
  palette: [string, string];
  imageUrl?: string;
  imageAlt?: string;
};
