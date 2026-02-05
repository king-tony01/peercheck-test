/**
 * Forwards an incoming `Request` to an external API `target` and returns the remote `Response`.
 * Preserves method, most headers, and body. Removes hop-by-hop headers.
 */
// Deprecated compatibility re-export.
// Primary implementation moved to `src/lib/proxyToApi.ts`.
export { proxyToApi, default } from "../lib/proxyToApi";
