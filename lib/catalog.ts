import { collections as fallbackCollections, products as fallbackProducts } from "@/data/catalog";
import { fetchShopifyCollections, fetchShopifyProducts, hasShopifyCredentials } from "@/lib/shopify";
import type { Collection, Product } from "@/lib/types";

async function withFallback<T>(loader: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await loader();
  } catch {
    return fallback;
  }
}

export async function getCollections(): Promise<Collection[]> {
  if (!hasShopifyCredentials) {
    return fallbackCollections;
  }

  return withFallback(fetchShopifyCollections, fallbackCollections);
}

export async function getProducts(): Promise<Product[]> {
  if (!hasShopifyCredentials) {
    return fallbackProducts;
  }

  return withFallback(fetchShopifyProducts, fallbackProducts);
}

export async function getFeaturedCollections(): Promise<Collection[]> {
  const collections = await getCollections();
  return collections.filter((collection) => collection.featured);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.featured).slice(0, 4);
}

export async function getCollectionByHandle(handle: string): Promise<Collection | undefined> {
  const collections = await getCollections();
  return collections.find((collection) => collection.handle === handle);
}

export async function getProductsByCollection(handle: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.collectionHandles.includes(handle));
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.handle === handle);
}
