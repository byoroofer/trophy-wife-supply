import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__cta">
        <div>
          <p className="footer-eyebrow">Trophy Wife Supply</p>
          <h2>Premium hats first, scalable boutique commerce from day one.</h2>
          <p className="footer-copy">
            Launch merchandising centers on custom hats now while the storefront structure stays ready for apparel,
            accessories, and future category growth.
          </p>
        </div>
        <div className="footer-links footer-links--cta">
          <Link href="/collections/hats">Shop hats</Link>
          <Link href="/products">Browse products</Link>
          <Link href="/collections">View collections</Link>
        </div>
      </div>
      <div className="container site-footer__grid">
        <div>
          <p className="footer-eyebrow">Shop</p>
          <div className="footer-links">
            <Link href="/collections/hats">Hats</Link>
            <Link href="/products">Products</Link>
            <Link href="/collections">All collections</Link>
          </div>
        </div>
        <div>
          <p className="footer-eyebrow">Growth Ready</p>
          <p className="footer-copy">
            Shopify Storefront data can replace fallback catalog content without changing the route structure.
          </p>
        </div>
        <div>
          <p className="footer-eyebrow">Brand</p>
          <div className="footer-links">
            <Link href="/story">Story</Link>
            <Link href="/collections/apparel">Apparel</Link>
            <Link href="/collections/accessories">Accessories</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
