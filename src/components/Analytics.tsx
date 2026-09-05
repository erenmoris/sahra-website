"use client";

import { useEffect } from "react";

/**
 * Lightweight client analytics.
 * GA4 + Meta Pixel only load when env vars are set.
 */

declare global {
  interface Window {
    __sahra_ga_loaded?: boolean;
    __sahra_fb_loaded?: boolean;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function injectScript(src: string) {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[data-analytics-src="${src}"]`)) return;
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.dataset.analyticsSrc = src;
  document.head.appendChild(script);
}

function loadGtag(measurementId: string) {
  if (typeof window === "undefined" || window.__sahra_ga_loaded) return;
  window.__sahra_ga_loaded = true;

  injectScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`);

  const g = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  g.dataLayer = g.dataLayer ?? [];
  g.gtag =
    g.gtag ||
    function gtag(...args: unknown[]) {
      g.dataLayer?.push(args);
    };

  g.gtag("js", new Date());
  g.gtag("config", measurementId, {
    page_path: window.location.pathname,
    anonymize_ip: true,
  });
}

function loadMetaPixel(pixelId: string) {
  if (typeof window === "undefined" || window.__sahra_fb_loaded) return;
  window.__sahra_fb_loaded = true;
  injectScript("https://connect.facebook.net/en_US/fbevents.js");

  const w = window as Window & { fbq?: (...args: unknown[]) => void };
  if (!w.fbq) {
    // eslint-disable-next-line prefer-rest-params
    const fbq = function (...args: unknown[]) {
      (fbq as unknown as { q: unknown[] }).q = (fbq as unknown as { q: unknown[] }).q || [];
      // eslint-disable-next-line prefer-rest-params
      (fbq as unknown as { q: unknown[] }).q.push(args);
    };
    // eslint-disable-next-line prefer-rest-params
    (fbq as unknown as { q: unknown[] }).q = [];
    w.fbq = fbq;
  }
  w.fbq("init", pixelId);
  w.fbq("track", "PageView");
}

export default function Analytics({
  gaId,
  fbPixelId,
}: {
  gaId?: string;
  fbPixelId?: string;
}) {
  useEffect(() => {
    if (gaId) loadGtag(gaId);
    if (fbPixelId) loadMetaPixel(fbPixelId);
  }, [gaId, fbPixelId]);

  return null;
}
