import Link from "next/link";

const links = [
  { href: "/collections", label: "Collections" },
  { href: "/products", label: "Products" },
  { href: "/story", label: "Story" }
];

export function Header() {
  return (
    <header className="site-header">
      <div className="announcement-bar">
        <div className="container">
          <p>Free U.S. shipping on boutique orders over $125</p>
        </div>
      </div>
      <div className="container site-header__inner">
        <Link className="brandmark" href="/">
          <span className="brandmark__kicker">Boutique Goods</span>
          <span className="brandmark__title">Trophy Wife Supply</span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link className="pill-link" href="/collections/hats">
            Shop The Drop
          </Link>
        </nav>
      </div>
    </header>
  );
}
