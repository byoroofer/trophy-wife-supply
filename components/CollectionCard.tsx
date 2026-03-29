import Link from "next/link";

import type { Collection } from "@/lib/types";

type CollectionCardProps = {
  collection: Collection;
};

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link className="collection-card" href={`/collections/${collection.handle}`}>
      <div
        className="collection-card__media"
        style={{
          backgroundImage: collection.imageUrl
            ? `linear-gradient(rgba(36, 18, 18, 0.2), rgba(36, 18, 18, 0.45)), url(${collection.imageUrl})`
            : `linear-gradient(150deg, ${collection.palette[0]} 0%, ${collection.palette[1]} 100%)`
        }}
      >
        <span>{collection.eyebrow}</span>
      </div>
      <div className="collection-card__body">
        <h3>{collection.title}</h3>
        <p>{collection.description}</p>
      </div>
    </Link>
  );
}
