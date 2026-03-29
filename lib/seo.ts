import type { Metadata } from "next";

import pageTemplates from "@/data/seo/page-templates.json";
import siteSeo from "@/data/seo/site-seo.json";
import { siteUrl } from "@/lib/site";
import type { Collection, Product } from "@/lib/types";

const defaultTitle = siteSeo.seoDefaults.defaultTitle;
const defaultDescription = siteSeo.seoDefaults.defaultDescription;

export function buildSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: siteSeo.seoDefaults.titleTemplate
    },
    description: defaultDescription,
    robots: siteSeo.seoDefaults.metaRobots,
    openGraph: {
      title: defaultTitle,
      description: defaultDescription,
      url: siteUrl,
      siteName: siteSeo.brand.name,
      locale: "en_US",
      type: "website"
    },
    twitter: {
      card: siteSeo.seoDefaults.socialCardType as "summary_large_image",
      title: defaultTitle,
      description: defaultDescription
    }
  };
}

export function buildCollectionMetadata(collection: Collection): Metadata {
  return {
    title: pageTemplates.collection.titleTemplate.replace("{collectionName}", collection.title),
    description: pageTemplates.collection.descriptionTemplate.replace("{collectionName}", collection.title)
  };
}

export function buildProductMetadata(product: Product): Metadata {
  return {
    title: pageTemplates.product.titleTemplate.replace("{productName}", product.title),
    description: pageTemplates.product.descriptionTemplate.replace("{productName}", product.title)
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteSeo.brand.name,
    url: siteUrl,
    description: defaultDescription,
    sameAs: []
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteSeo.brand.name,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/collections`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function collectionPageJsonLd(collection: Collection, itemCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: `${siteUrl}/collections/${collection.handle}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: itemCount
    }
  };
}

export function homepageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: siteSeo.brand.name,
    description: pageTemplates.homepage.description,
    url: siteUrl
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`
    }))
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.imageUrl ? [product.imageUrl] : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: `${siteUrl}/products/${product.handle}`
    }
  };
}
