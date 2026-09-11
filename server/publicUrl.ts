import { ENV } from "./_core/env";

/**
 * URL pública canónica para enlaces en emails y storage.
 * Prioridad: PUBLIC_APP_URL → Origin de request → fallback dominio / localhost.
 */
export function resolvePublicBaseUrl(opts?: {
  originHeader?: string;
}): string {
  if (ENV.publicAppUrl) {
    return ENV.publicAppUrl.replace(/\/+$/, "");
  }

  const origin = (opts?.originHeader || "").replace(/\/+$/, "");
  if (origin.includes("tugestionlegal.es")) {
    return "https://www.tugestionlegal.es";
  }
  if (origin.startsWith("http://") || origin.startsWith("https://")) {
    return origin;
  }

  if (!ENV.isProduction) {
    return `http://localhost:${process.env.PORT || "3000"}`;
  }

  return "https://www.tugestionlegal.es";
}
