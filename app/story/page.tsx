import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Story",
  description: "The merchandising direction behind Trophy Wife Supply."
};

export default function StoryPage() {
  return (
    <section className="section page-shell">
      <div className="container story-grid">
        <div className="page-intro">
          <p className="section-heading__eyebrow">Brand Story</p>
          <h1>Built to feel boutique-first from the first scroll.</h1>
          <p>
            Trophy Wife Supply is positioned as a luxury-flirty brand with clean structure, feminine tone, and enough
            boldness to stand out in a crowded social feed. The launch starts with custom hats, but the catalog and
            merchandising are designed to grow well beyond a single category.
          </p>
        </div>
        <div className="story-panels">
          <article>
            <h2>Merchandising angle</h2>
            <p>
              Strong hero categories, compact mobile discovery, and clear collection segmentation let the site sell a
              focused drop now without creating a future rebuild when apparel and accessories come online.
            </p>
          </article>
          <article>
            <h2>Visual direction</h2>
            <p>
              Soft neutrals, rose-toned accents, crisp typography, and high-contrast calls to action keep the
              storefront premium without drifting into generic boutique templates.
            </p>
          </article>
          <article>
            <h2>Platform stance</h2>
            <p>
              The data layer is prepared for Shopify Storefront API credentials, so merchandising can shift from
              curated fallback content to live catalog data with minimal code change.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
