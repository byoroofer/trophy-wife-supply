import type { Metadata } from "next";

import { CollectionCard } from "@/components/CollectionCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getCollections } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse hats, apparel, and accessories from Trophy Wife Supply."
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <section className="section page-shell">
      <div className="container">
        <SectionHeading
          eyebrow="Shop"
          title="Collections designed to grow with the brand"
          description="Launch with custom hats, then scale into apparel and accessories without changing the storefront structure."
        />
        <div className="collection-grid">
          {collections.map((collection) => (
            <CollectionCard key={collection.handle} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}
