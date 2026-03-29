import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { getCollectionByHandle, getCollections, getProductsByCollection } from "@/lib/catalog";
import { breadcrumbJsonLd, buildCollectionMetadata, collectionPageJsonLd } from "@/lib/seo";

type CollectionPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export async function generateStaticParams() {
  const collections = await getCollections();

  return collections.map((collection) => ({
    handle: collection.handle
  }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return {
      title: "Collection"
    };
  }

  return buildCollectionMetadata(collection);
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const [collection, products] = await Promise.all([
    getCollectionByHandle(handle),
    getProductsByCollection(handle)
  ]);

  if (!collection) {
    notFound();
  }

  return (
    <section className="section page-shell">
      <JsonLd data={collectionPageJsonLd(collection, products.length)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Collections", path: "/collections" },
          { name: collection.title, path: `/collections/${collection.handle}` }
        ])}
      />
      <div className="container">
        <div className="page-intro">
          <p className="section-heading__eyebrow">{collection.eyebrow}</p>
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
          <Link className="button button--ghost" href="/collections">
            View all collections
          </Link>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
