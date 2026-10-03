// Vite only exposes variables prefixed with VITE_ to the browser bundle.
// The fallback keeps the app working when the API is served from the same
// origin behind a reverse proxy, where no absolute URL is needed.
const BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

/**
 * Thrown for any non-2xx response.
 *
 * `status` and `code` are kept separate on purpose. `status` is the HTTP code,
 * useful for broad decisions such as "retry" or "the server is down". `code` is
 * our own stable identifier from the error body (for example
 * PRODUCT_UNAVAILABLE), so callers can branch on it instead of matching English
 * text that will change the moment the wording is edited or translated.
 */
export class ApiError extends Error {
  constructor(message, { status, code, body } = {}) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.body = body;
  }
}

async function request(path, { method = "GET", body, signal } = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    signal,
  });

  // A gateway timeout or an HTML error page is not JSON. Read the body as text
  // first so a parse failure cannot mask the real status code.
  const text = await response.text();

  let payload = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }
  }

  if (!response.ok) {
    // Errors follow RFC 7807, which Spring Boot 3 produces natively through
    // ProblemDetail: the readable message is in `detail`, with the shorter
    // `title` as a fallback. See docs/api-contract.md.
    throw new ApiError(
      payload?.detail ??
        payload?.title ??
        `Request failed with status ${response.status}`,
      { status: response.status, code: payload?.code, body: payload },
    );
  }

  return payload;
}

export const api = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) =>
    request(path, { ...options, method: "POST", body }),
};
