/**
 * Prefijo público (sin barra final) para URL temporal Raiola
 * (`/main/tugestionlegal.es`) o BASE_URL de Vite si no es `/`.
 */
export function getPublicBasePath(): string {
  if (typeof window !== "undefined") {
    const match = window.location.pathname.match(/^(\/main\/[^/]+)/);
    if (match?.[1]) return match[1];
  }
  const fromVite = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  return fromVite && fromVite !== "/" ? fromVite : "";
}

export function withPublicBase(path: string): string {
  const base = getPublicBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
