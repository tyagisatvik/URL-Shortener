// Central place to resolve the public base URL (domain) used for displaying and copying short links.
// 1. Set VITE_PUBLIC_BASE_URL in your environment (e.g. https://url-shortener.vercel.app or custom domain)
// 2. If not set (local dev), window.location.origin will be used.
// Resolve the public base URL used to display and copy short links.
// Priority:
// 1. Use VITE_PUBLIC_BASE_URL if defined AND not pointing to localhost while we are actually on a different origin.
// 2. Otherwise fall back to the runtime origin (so production deployments work even if the env var was left as a local value).
const envBase = import.meta.env.VITE_PUBLIC_BASE_URL;
const runtimeOrigin = typeof window !== "undefined" ? window.location.origin : "";

// If env var is set and is NOT a localhost value, trust it.
// If it is localhost but runtime origin is different (production), prefer runtime.
let resolvedBase = runtimeOrigin;
if (envBase) {
  const isLocal = /localhost|127\.0\.0\.1/i.test(envBase);
  if (!isLocal) {
    resolvedBase = envBase;
  } else if (isLocal && runtimeOrigin && !/localhost|127\.0\.0\.1/i.test(runtimeOrigin)) {
    // Ignore localhost env in production
    resolvedBase = runtimeOrigin;
  } else {
    resolvedBase = envBase; // Still local dev
  }
}

export const APP_BASE_URL = resolvedBase;
