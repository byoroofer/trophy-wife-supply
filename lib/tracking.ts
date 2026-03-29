declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      page: () => void;
      track?: (event: string, payload?: Record<string, unknown>) => void;
    };
  }
}

export const trackingConfig = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  tikTokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID
};

export function pageView(path: string) {
  if (!trackingConfig.ga4Id || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: document.title
  });
}

export function trackMetaPageView() {
  if (
    !trackingConfig.metaPixelId ||
    typeof window === "undefined" ||
    !window.fbq
  ) {
    return;
  }

  window.fbq("track", "PageView");
}

export function trackTikTokPageView() {
  if (
    !trackingConfig.tikTokPixelId ||
    typeof window === "undefined" ||
    !window.ttq
  ) {
    return;
  }

  window.ttq.page();
}

export function trackEmailSignup() {
  if (typeof window === "undefined") {
    return;
  }

  if (trackingConfig.ga4Id && window.gtag) {
    window.gtag("event", "generate_lead", {
      method: "email"
    });
  }

  if (trackingConfig.metaPixelId && window.fbq) {
    window.fbq("track", "Lead");
  }

  if (trackingConfig.tikTokPixelId && window.ttq?.track) {
    window.ttq.track("CompleteRegistration", {
      content_type: "email_signup"
    });
  }
}
