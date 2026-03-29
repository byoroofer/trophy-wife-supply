import Link from "next/link";

import { ProductMedia } from "@/components/ProductMedia";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link className="product-card" href={`/products/${product.handle}`}>
      <div className="product-card__media">
        <ProductMedia
          title={product.title}
          palette={product.palette}
          imageUrl={product.imageUrl}
          imageAlt={product.imageAlt}
        />
      </div>
      <div className="product-card__body">
        <div className="product-card__meta">
          <p>{product.subtitle}</p>
          <span>{product.availableForSale ? "Ready to shop" : "Coming soon"}</span>
        </div>
        <h3>{product.title}</h3>
        <div className="product-card__price-row">
          <strong>{formatPrice(product.price)}</strong>
          {product.compareAtPrice ? <span>{formatPrice(product.compareAtPrice)}</span> : null}
        </div>
      </div>
    </Link>
  );
}
