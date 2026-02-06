/**
 * Server-side helper to proxy requests to an upstream API server.
 * Uses `process.env.API_BASE_URL` as the upstream base URL.
 * Automatically includes the access token from cookies in the Authorization header.
 */
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function proxyToApi(req: Request | NextRequest, path: string) {
  const base = process.env.API_BASE_URL || "";
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // Construct target
  const target = `${base.replace(/\/$/, "")}${normalizedPath}`;

  // Clone headers from incoming request, but avoid overwriting host
  const headers = new Headers();
  try {
    // @ts-ignore - both Request and NextRequest have headers
    for (const [k, v] of req.headers) {
      if (k.toLowerCase() === "host") continue;
      headers.set(k, v as string);
    }
  } catch (e) {
    // ignore header copying issues
  }

  // Add Authorization header with access token from cookies
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("peercheck_access_token")?.value;
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
  } catch (e) {
    // ignore if cookies are not available
  }

  // Preserve body if present
  let body: BodyInit | undefined = undefined;
  try {
    const r = req as Request;
    if (r.method !== "GET" && r.method !== "HEAD") {
      const buf = await r.arrayBuffer();
      if (buf && buf.byteLength > 0) body = buf;
    }
  } catch (e) {
    // ignore
  }

  const targetWithQuery =
    target +
    (typeof (req as Request).url === "string"
      ? new URL((req as Request).url).search
      : "");

  let res: Response;
  try {
    res = await fetch(targetWithQuery, {
      method: (req as Request).method || "GET",
      headers,
      body,
      // keep same credentials behavior; Next.js server fetch uses same-origin by default
    });
  } catch (error) {
    console.error("proxyToApi fetch failed", {
      target: targetWithQuery,
      error,
    });
    return new Response(
      JSON.stringify({
        message: "Upstream API request failed",
        status: "error",
        statusCode: "504",
      }),
      {
        status: 504,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Build a response copying status, headers and body
  const responseHeaders = new Headers();
  res.headers.forEach((value, key) => {
    // Skip content encoding headers as we're passing the body as-is
    if (
      key.toLowerCase() !== "content-encoding" &&
      key.toLowerCase() !== "content-length"
    ) {
      responseHeaders.set(key, value);
    }
  });

  // Get the body - fetch already decompresses gzip/brotli/deflate automatically
  const responseBody = await res.text();
  return new Response(responseBody, {
    status: res.status,
    headers: responseHeaders,
  });
}

export default proxyToApi;
