# Trophy Wife Supply SEO Ultra Architecture

## Objective
Build a Shopify-first SEO system that launches with hats, expands cleanly into apparel and accessories, and keeps every future page aligned with search intent, merchandising goals, and mobile-first conversion.

## Primary Architecture

### 1. Site Hierarchy
- Homepage
  - Purpose: brand authority, merchandising, internal link hub
- Collection pages
  - Purpose: rank for commercial category intent
- Product pages
  - Purpose: capture branded and long-tail product intent
- Editorial pages
  - Purpose: support collections and products with internal links
- Utility pages
  - Purpose: trust, support, and brand legitimacy

### 2. URL Strategy
- `/collections/{handle}`
  - Primary collection and subcollection targets
- `/products/{handle}`
  - Canonical product detail pages
- `/blogs/journal/{handle}`
  - Editorial and buying-guide content
- `/pages/{handle}`
  - Brand and trust pages

### 3. Collection Strategy
The collection layer is the commercial SEO engine. Start with hats, but structure the catalog so expansion does not force URL or taxonomy changes later.

#### Launch Collections
- `/collections/hats`
- `/collections/trucker-hats`
- `/collections/embroidered-hats`
- `/collections/statement-hats`
- `/collections/bridal-hats`
- `/collections/western-hats`

#### Expansion Collections
- `/collections/apparel`
- `/collections/graphic-tops`
- `/collections/sweatshirts`
- `/collections/matching-sets`
- `/collections/dresses`
- `/collections/accessories`
- `/collections/totes`
- `/collections/jewelry`
- `/collections/drinkware`
- `/collections/small-gifts`

### 4. Indexation Rules
Index pages that can rank independently and drive revenue.

#### Index
- Homepage
- Collections
- Products
- Editorial guides
- About
- Contact
- FAQ
- Shipping and returns

#### Do Not Index
- Cart
- Checkout
- Account pages
- Search result pages
- Sort variants
- Filter combinations based only on color, size, price, or inventory state

### 5. Metadata System
Use controlled templates instead of writing every page from scratch.

#### Homepage
- Fixed title and description built around the brand and launch catalog

#### Collection Pages
- Title: `{collectionName} | Trophy Wife Supply`
- Description: lead with the product type, add boutique positioning, then close with styling or gifting value

#### Product Pages
- Title: `{productName} | Trophy Wife Supply`
- Description: lead with the product name, then explain styling value, product quality, and gifting intent

#### Editorial Pages
- Title: `{topic} | Trophy Wife Supply Journal`
- Description: answer the topic and point readers toward the matching collection

### 6. Schema Coverage
Use structured data to reinforce page meaning and improve SERP presentation.

#### Sitewide
- `Organization`
- `WebSite`

#### Homepage
- `CollectionPage`

#### Collection Pages
- `CollectionPage`
- `BreadcrumbList`
- `ItemList`

#### Product Pages
- `Product`
- `Offer`
- `BreadcrumbList`

#### Editorial Pages
- `BlogPosting`
- `BreadcrumbList`

### 7. Internal Linking Framework
Every indexable page should link in at least two directions: upward for hierarchy and sideways for discovery.

#### Homepage Links To
- Launch collection
- Seasonal drop
- Best sellers
- Gift shop
- Editorial guides

#### Collection Links To
- Parent category if applicable
- Adjacent subcollections
- Best sellers or new arrivals
- Supporting editorial guides

#### Product Links To
- Parent collection
- Related products
- Gift shop or matching accessories
- Shipping, returns, and care information

#### Editorial Links To
- Target collection above the fold
- Supporting products in the middle of the article
- Adjacent articles at the end

### 8. Content Cluster Model
Editorial content should not exist as standalone inspiration pieces. It should support a collection or product family.

#### Launch Cluster
- Core authority page: boutique hats for women
- Supporting topics:
  - how to style boutique trucker hats
  - embroidered hat outfit ideas
  - statement hats for casual outfits
  - bride and bachelorette hat ideas

#### Expansion Clusters
- Boutique apparel edit
- Boutique accessories and giftables

### 9. Shopify-First Implementation Rules
- Use Shopify collections as the source of truth for indexable category pages.
- Keep canonical URLs tied to the Shopify primary domain.
- Use product metafields for concise SEO overrides only when a product needs custom copy.
- Use collection descriptions for primary SEO copy and merchandising support.
- Use blog articles to support long-tail terms and route authority into collections.
- Avoid creating filtered collection URLs that compete with primary collection pages.

### 10. Mobile-First SEO Requirements
- Keep above-the-fold copy concise and readable on small screens.
- Place internal links inside real content blocks, not only in nav or footer.
- Keep headings short and high contrast.
- Support fast image delivery and consistent alt text.
- Prioritize crawlable HTML content before carousels or hidden tabs.

## Files Added For Reuse
- [site-seo.json](D:\Trophy Wife Supply\data\seo\site-seo.json)
- [taxonomy.json](D:\Trophy Wife Supply\data\seo\taxonomy.json)
- [page-templates.json](D:\Trophy Wife Supply\data\seo\page-templates.json)
- [editorial-clusters.md](D:\Trophy Wife Supply\content\seo\editorial-clusters.md)

## Recommended Next Build Step
When storefront code is added, wire this architecture into:
- page-level metadata generation
- XML sitemap generation
- canonical URL handling
- JSON-LD output for collection, product, and editorial pages
- collection and blog templates that render the internal-link system by default
