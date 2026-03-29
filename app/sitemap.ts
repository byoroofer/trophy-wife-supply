import type { MetadataRoute } from "next";

import { getCollections, getProducts } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [collections, products] = await Promise.all([getCollections(), getProducts()]);

  const staticRoutes: MetadataRoute.Sitemap = ["", "/collections", "/products", "/story"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date()
  }));

  const collectionRoutes = collections.map((collection) => ({
    url: `${siteUrl}/collections/${collection.handle}`,
    lastModified: new Date()
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/products/${product.handle}`,
    lastModified: new Date()
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
