import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/JsonLd";
import { ProductMedia } from "@/components/ProductMedia";
import { getProductByHandle, getProducts } from "@/lib/catalog";
import { breadcrumbJsonLd, buildProductMetadata, productJsonLd } from "@/lib/seo";

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price);
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    handle: product.handle
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product"
    };
  }

  return buildProductMetadata(product);
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const primaryCollection = product.collectionHandles[0] || "collections";

  return (
    <section className="section page-shell">
      <JsonLd data={productJsonLd(product)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.title, path: `/products/${product.handle}` }
        ])}
      />
      <div className="container product-detail">
        <div className="product-detail__media">
          <ProductMedia
            title={product.title}
            palette={product.palette}
            imageUrl={product.imageUrl}
            imageAlt={product.imageAlt}
          />
        </div>
        <div className="product-detail__copy">
          <p className="section-heading__eyebrow">{product.subtitle}</p>
          <h1>{product.title}</h1>
          <div className="product-detail__price-row">
            <strong>{formatPrice(product.price)}</strong>
            {product.compareAtPrice ? <span>{formatPrice(product.compareAtPrice)}</span> : null}
          </div>
          <p className="product-detail__description">{product.description}</p>
          <div className="product-detail__chips">
            <span>{product.availableForSale ? "Available now" : "Coming soon"}</span>
            <span>{product.leadTime}</span>
          </div>
          <div className="product-detail__cta">
            <Link className="button button--solid" href="/products">
              Continue shopping
            </Link>
            <Link className="button button--ghost" href={`/collections/${primaryCollection}`}>
              View collection
            </Link>
          </div>
          <div className="product-detail__meta-grid">
            <article>
              <h2>Highlights</h2>
              <ul>
                {product.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h2>Materials</h2>
              <ul>
                {product.materials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
