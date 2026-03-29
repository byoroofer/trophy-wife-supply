import Link from "next/link";

import { CollectionCard } from "@/components/CollectionCard";
import { EmailSignup } from "@/components/email-signup";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { brandStats } from "@/data/catalog";
import pageTemplates from "@/data/seo/page-templates.json";
import { getFeaturedCollections, getFeaturedProducts } from "@/lib/catalog";
import { homepageJsonLd } from "@/lib/seo";

export default async function HomePage() {
  const [collections, products] = await Promise.all([
    getFeaturedCollections(),
    getFeaturedProducts()
  ]);

  return (
    <>
      <JsonLd data={homepageJsonLd()} />
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="hero__eyebrow">Luxury-flirty boutique</p>
            <h1>{pageTemplates.homepage.primaryH1}</h1>
            <p className="hero__lede">
              Launching with custom hats and built to scale into a full boutique wardrobe, Trophy Wife Supply blends
              polished femininity, bold styling, and giftable glamour.
            </p>
            <div className="hero__actions" id="shop-now">
              <Link className="button button--solid" href="/collections/hats">
                Shop New Arrivals
              </Link>
              <Link className="button button--ghost" href="/collections">
                Explore Collections
              </Link>
            </div>
            <div className="hero__stats" aria-label="Boutique highlights">
              {brandStats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__editorial" aria-hidden="true">
            <div className="hero__panel hero__panel--tall">
              <span>Launch Edit</span>
              <p>Custom hats with couture energy</p>
            </div>
            <div className="hero__panel hero__panel--wide">
              <span>Next Up</span>
              <p>Apparel, accessories, gifting</p>
            </div>
          </div>
        </div>
      </section>

      <section className="editorial-strip" aria-label="Brand pillars">
        <div className="container editorial-strip__inner">
          <p>Shopify-first structure</p>
          <p>Conversion-minded merchandising</p>
          <p>Mobile-ready boutique layout</p>
          <p>Bold luxury contrast</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Collections"
            title="Built for expansion, not a one-category dead end"
            description="The launch merchandises hats first while keeping the catalog structure ready for apparel, accessories, and broader boutique growth."
          />
          <div className="collection-grid">
            {collections.map((collection) => (
              <CollectionCard key={collection.handle} collection={collection} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="new-arrivals">
        <div className="container">
          <SectionHeading
            eyebrow="New arrivals"
            title="The boutique front table"
            description="A homepage merchandising block designed to translate directly into featured Shopify collections, product cards, or seasonal edits."
          />
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container promise">
          <div>
            <p className="section-heading__eyebrow">Signature edit</p>
            <h2>Designed for scroll-stop appeal and fast buying decisions.</h2>
            <p className="section-copy">
              The layout balances editorial storytelling with direct conversion cues: clean hierarchy, oversized
              headings, bold calls to action, and card structures ready for collection feeds, reviews, or social
              proof.
            </p>
          </div>
          <div className="promise__list">
            <article>
              <h3>High-contrast typography</h3>
              <p>Premium readability on small screens without sacrificing the boutique tone.</p>
            </article>
            <article>
              <h3>Shopify-ready modules</h3>
              <p>Collection pathways, feature cards, and product routes can map directly to live catalog data.</p>
            </article>
            <article>
              <h3>Scalable merchandising</h3>
              <p>Supports hats now and a full boutique catalog later without changing the route architecture.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container signup-shell">
          <div className="page-intro signup-intro">
            <p className="section-heading__eyebrow">Launch demand capture</p>
            <h2>Collect interest before the full catalog arrives.</h2>
            <p>
              The signup flow is already wired for Klaviyo through a server route, so list building can go live as soon
              as the private API key and list ID are configured.
            </p>
          </div>
          <EmailSignup />
        </div>
      </section>
    </>
  );
}
