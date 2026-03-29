import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section page-shell">
      <div className="container not-found">
        <p className="section-heading__eyebrow">404</p>
        <h1>That page slipped out of the lineup.</h1>
        <p>Use the collection index to get back to the current storefront edit.</p>
        <Link className="button button--solid" href="/collections">
          Shop collections
        </Link>
      </div>
    </section>
  );
}
