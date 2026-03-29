import type { Metadata } from "next";

import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse the current Trophy Wife Supply product assortment across hats, apparel, and accessories."
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="section page-shell">
      <div className="container">
        <SectionHeading
          eyebrow="Products"
          title="The full boutique assortment in one view"
          description="Browse the current Trophy Wife Supply catalog with launch-ready hats today and room for apparel and accessories as the assortment expands."
        />
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
