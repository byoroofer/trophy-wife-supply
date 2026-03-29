# Trophy Wife Supply

Premium boutique ecommerce storefront for Trophy Wife Supply.

## Stack

- Next.js App Router
- Shopify Storefront API ready with curated fallback catalog
- Klaviyo-ready email capture route
- Optional GA4, Meta Pixel, and TikTok Pixel wiring
- Mobile-first CSS with strong text contrast

## Local Development

1. Copy `.env.example` to `.env.local`.
2. Add `NEXT_PUBLIC_SITE_URL` for canonical metadata.
3. Add `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` to switch from curated content to live Shopify data.
4. Add `KLAVIYO_API_KEY` and `KLAVIYO_LIST_ID` to enable email capture.
5. Add pixel IDs only when you are ready to activate tracking.
6. Run `npm install`.
7. Run `npm run dev`.

## Routes

- `/`
- `/collections`
- `/collections/[handle]`
- `/products/[handle]`
- `/story`
- `/api/email/subscribe`

## Notes

- The site launches with hats but the catalog structure already supports apparel and accessories.
- Missing Shopify credentials do not break the build; the app falls back to the local catalog in `data/catalog.ts`.
- Missing Klaviyo credentials do not break the build; the signup endpoint returns a clear configuration error until secrets are added.
- SEO metadata, `robots.txt`, `sitemap.xml`, and JSON-LD are included.

## Dev Rules

See `AGENTS.md`.
