import type { Collection, Product } from "@/lib/types";

const storefrontEndpoint = process.env.SHOPIFY_STORE_DOMAIN
  ? `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`
  : null;

export const hasShopifyCredentials = Boolean(
  storefrontEndpoint && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
);

type ShopifyConnection<T> = {
  edges: Array<{ node: T }>;
};

type ShopifyCollectionNode = {
  handle: string;
  title: string;
  description: string;
  image?: {
    url: string;
  } | null;
};

type ShopifyProductNode = {
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  tags: string[];
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  compareAtPriceRange: {
    maxVariantPrice?: {
      amount: string;
    } | null;
  };
  collections: ShopifyConnection<Pick<ShopifyCollectionNode, "handle">>;
};

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!storefrontEndpoint || !process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
    throw new Error("Missing Shopify storefront credentials.");
  }

  const response = await fetch(storefrontEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 900 }
  });

  if (!response.ok) {
    throw new Error(`Shopify request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  if (!payload.data) {
    throw new Error("Shopify returned an empty payload.");
  }

  return payload.data;
}

function titleToEyebrow(title: string): string {
  if (title.toLowerCase().includes("hat")) {
    return "Launch Collection";
  }

  if (title.toLowerCase().includes("accessor")) {
    return "Cross-Sell Edit";
  }

  return "Expansion Ready";
}

function collectionPalette(handle: string): [string, string] {
  switch (handle) {
    case "hats":
      return ["#f6d8d2", "#8f3f4d"];
    case "accessories":
      return ["#edd4c2", "#7a5f4c"];
    default:
      return ["#f1e0d7", "#5b3a30"];
  }
}

function productPalette(handle: string): [string, string] {
  const seed = handle.length % 3;

  if (seed === 0) {
    return ["#f6dbd7", "#7f4150"];
  }

  if (seed === 1) {
    return ["#efe1d8", "#745142"];
  }

  return ["#f2e3db", "#8f5d58"];
}

function mapCollection(node: ShopifyCollectionNode): Collection {
  return {
    handle: node.handle,
    title: node.title,
    description: node.description,
    eyebrow: titleToEyebrow(node.title),
    featured: true,
    palette: collectionPalette(node.handle),
    imageUrl: node.image?.url
  };
}

function mapProduct(node: ShopifyProductNode): Product {
  const collectionHandles = node.collections.edges.map((edge) => edge.node.handle);
  const compareAtAmount = node.compareAtPriceRange.maxVariantPrice?.amount;

  return {
    handle: node.handle,
    title: node.title,
    subtitle: collectionHandles.includes("hats")
      ? "Shopify live product"
      : "Shopify live merchandise",
    description: node.description,
    price: Number(node.priceRange.minVariantPrice.amount),
    compareAtPrice: compareAtAmount ? Number(compareAtAmount) : undefined,
    collectionHandles,
    featured: node.tags.includes("featured"),
    availableForSale: node.availableForSale,
    leadTime: "Live inventory from Shopify",
    highlights: [
      "Sourced directly from the Shopify Storefront API",
      "Built to preserve the product route structure",
      "Ready for merchandising on collection and homepage modules"
    ],
    materials: ["See Shopify product details for complete materials"],
    palette: productPalette(node.handle),
    imageUrl: node.featuredImage?.url,
    imageAlt: node.featuredImage?.altText || node.title
  };
}

export async function fetchShopifyCollections(): Promise<Collection[]> {
  const data = await shopifyFetch<{
    collections: ShopifyConnection<ShopifyCollectionNode>;
  }>(`
    query GetCollections {
      collections(first: 12) {
        edges {
          node {
            handle
            title
            description
            image {
              url
            }
          }
        }
      }
    }
  `);

  return data.collections.edges.map((edge) => mapCollection(edge.node));
}

export async function fetchShopifyProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: ShopifyConnection<ShopifyProductNode>;
  }>(`
    query GetProducts {
      products(first: 24, sortKey: BEST_SELLING) {
        edges {
          node {
            handle
            title
            description
            availableForSale
            tags
            featuredImage {
              url
              altText
            }
            priceRange {
              minVariantPrice {
                amount
              }
            }
            compareAtPriceRange {
              maxVariantPrice {
                amount
              }
            }
            collections(first: 8) {
              edges {
                node {
                  handle
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.products.edges.map((edge) => mapProduct(edge.node));
}
