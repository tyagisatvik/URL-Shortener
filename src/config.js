// Central place to resolve the public base URL (domain) used for displaying and copying short links.
// 1. Set VITE_PUBLIC_BASE_URL in your environment (e.g. https://url-shortener.vercel.app or custom domain)
// 2. If not set (local dev), window.location.origin will be used.
export const APP_BASE_URL =
  import.meta.env.VITE_PUBLIC_BASE_URL ||
  (typeof window !== "undefined" ? window.location.origin : "");
