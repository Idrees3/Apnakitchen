export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    // Stop Chrome from forcing broken HTTP/3 (QUIC) sessions → ERR_CONNECTION_RESET
    headers.set("Alt-Svc", "clear");

    // Never let the Cloudflare preview host get indexed — only .com ranks
    if (url.hostname.endsWith(".pages.dev")) {
      headers.set("X-Robots-Tag", "noindex, nofollow");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
