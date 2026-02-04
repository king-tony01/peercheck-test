/**
 * Forwards an incoming `Request` to an external API `target` and returns the remote `Response`.
 * Preserves method, most headers, and body. Removes hop-by-hop headers.
 */
export async function proxyToApi(
  req: Request,
  target: string,
): Promise<Response> {
  const hopByHop = [
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
    "host",
  ];

  const outHeaders = new Headers(req.headers as HeadersInit);
  hopByHop.forEach((h) => outHeaders.delete(h));

  const init: RequestInit = {
    method: req.method,
    headers: outHeaders,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    const buf = await req.arrayBuffer();
    init.body = buf;
  }

  const res = await fetch(target, init);

  const resHeaders = new Headers(res.headers);
  hopByHop.forEach((h) => resHeaders.delete(h));

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: resHeaders,
  });
}

export default proxyToApi;
