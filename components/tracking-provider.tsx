"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  pageView,
  trackMetaPageView,
  trackTikTokPageView,
  trackingConfig
} from "@/lib/tracking";

export function TrackingProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const query = searchParams.toString();
    const pageUrl = query ? `${pathname}?${query}` : pathname;

    pageView(pageUrl);
    trackMetaPageView();
    trackTikTokPageView();
  }, [pathname, searchParams]);

  return (
    <>
      {trackingConfig.ga4Id ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${trackingConfig.ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${trackingConfig.ga4Id}');
            `}
          </Script>
        </>
      ) : null}

      {trackingConfig.metaPixelId ? (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${trackingConfig.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}

      {trackingConfig.tikTokPixelId ? (
        <Script id="tiktok-pixel-init" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject = t;
              var ttq = w[t] = w[t] || [];
              ttq.methods = ['page', 'track'];
              ttq.setAndDefer = function (obj, method) {
                obj[method] = function () {
                  obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
                };
              };
              for (var i = 0; i < ttq.methods.length; i += 1) {
                ttq.setAndDefer(ttq, ttq.methods[i]);
              }
              var s = d.createElement('script');
              s.async = true;
              s.src = 'https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${trackingConfig.tikTokPixelId}&lib=ttq';
              var x = d.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s, x);
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      ) : null}
    </>
  );
}
